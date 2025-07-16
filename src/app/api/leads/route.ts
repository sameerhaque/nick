import { NextRequest, NextResponse } from 'next/server'
import { LeadCaptureSchema, logError, AppError } from '@/lib/errors'

// Simple in-memory storage for demo (use database in production)
const leadsStorage: any[] = []

// Rate limiting for lead submissions
const leadRateLimitMap = new Map<string, { count: number; resetTime: number }>()
const LEAD_RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const LEAD_RATE_LIMIT_MAX = 3 // 3 submissions per hour

function checkLeadRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userData = leadRateLimitMap.get(identifier)
  
  if (!userData || now > userData.resetTime) {
    leadRateLimitMap.set(identifier, { count: 1, resetTime: now + LEAD_RATE_LIMIT_WINDOW })
    return true
  }
  
  if (userData.count >= LEAD_RATE_LIMIT_MAX) {
    return false
  }
  
  userData.count++
  return true
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation helper
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/
  return phoneRegex.test(phone)
}

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate input with Zod
    const validatedData = LeadCaptureSchema.parse(body)
    
    // Additional validation
    if (!isValidEmail(validatedData.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    if (!isValidPhone(validatedData.phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      )
    }
    
    // Check rate limiting (by email to prevent spam)
    if (!checkLeadRateLimit(validatedData.email)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait before submitting again.' },
        { status: 429 }
      )
    }
    
    // Check for duplicate recent submissions
    const recentDuplicate = leadsStorage.find(lead => 
      lead.email === validatedData.email && 
      lead.phone === validatedData.phone &&
      Date.now() - lead.timestamp < 24 * 60 * 60 * 1000 // 24 hours
    )
    
    if (recentDuplicate) {
      return NextResponse.json(
        { error: 'We already have your information. A representative will contact you soon.' },
        { status: 400 }
      )
    }
    
    // Create lead record
    const leadRecord = {
      id: crypto.randomUUID(),
      ...validatedData,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
      clientId: clientId.substring(0, 8) + '***', // Partial IP for privacy
      source: 'calculator',
      status: 'new',
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }
    
    // Store lead (in production, save to database)
    leadsStorage.push(leadRecord)
    
    // Log lead capture for analytics
    const leadLog = {
      leadId: leadRecord.id,
      timestamp: leadRecord.createdAt,
      source: leadRecord.source,
      calculationId: validatedData.calculationId,
      contactPreference: validatedData.preferredContact,
      bestTimeToCall: validatedData.bestTimeToCall,
      clientId: leadRecord.clientId
    }
    
    console.log('Lead captured:', leadLog)
    
    // In production, integrate with CRM/email service
    // await sendToTransactionalEmail(leadRecord)
    // await sendToCRM(leadRecord)
    // await scheduleFollowUp(leadRecord)
    
    // Return success response
    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
      message: 'Your information has been received successfully',
      nextSteps: [
        'A licensed mortgage professional will contact you within 24 hours',
        'You will receive a confirmation email shortly',
        'Your personalized illustration will be prepared for your consultation'
      ]
    })
    
  } catch (error) {
    logError(error, 'leads-api')
    
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.userMessage, code: error.code },
        { status: error.statusCode }
      )
    }
    
    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'errors' in error) {
      const zodError = error as any
      const firstError = zodError.errors[0]
      return NextResponse.json(
        { 
          error: firstError.message,
          field: firstError.path?.join('.')
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint for lead management (admin use)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const leadId = searchParams.get('id')
  
  if (leadId) {
    const lead = leadsStorage.find(l => l.id === leadId)
    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(lead)
  }
  
  // Return all leads (in production, add authentication and pagination)
  const leads = leadsStorage
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 100) // Limit to 100 most recent
  
  return NextResponse.json({
    leads,
    total: leadsStorage.length
  })
}