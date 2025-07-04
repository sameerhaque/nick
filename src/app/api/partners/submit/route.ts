import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const partnerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.enum(['advisor', 'realtor', 'cpa', 'attorney', 'other'], {
    errorMap: () => ({ message: 'Please select your role' }),
  }),
  clientBaseSize: z.enum(['1-50', '51-200', '201-500', '500+'], {
    errorMap: () => ({ message: 'Please select your client base size' }),
  }),
  workingWithSeniors: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Please select an option' }),
  }),
  phone: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = partnerFormSchema.parse(body)
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Add to CRM system
    // 4. Send confirmation email to user
    
    console.log('Partner form submission:', {
      timestamp: new Date().toISOString(),
      data: validatedData,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent')
    })
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Send notification email (placeholder - replace with real email service)
    await sendNotificationEmail(validatedData)
    
    // Send confirmation email to user (placeholder)
    await sendConfirmationEmail(validatedData.email, validatedData.name)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Partner application submitted successfully',
        id: generateSubmissionId()
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Partner form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: error.errors
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again or contact support.' 
      },
      { status: 500 }
    )
  }
}

// Placeholder functions - replace with real implementations
async function sendNotificationEmail(data: any) {
  // TODO: Implement actual email sending
  // Example: Send to partners@reversewayhome.com
  console.log('Would send notification email:', data)
}

async function sendConfirmationEmail(email: string, name: string) {
  // TODO: Implement actual confirmation email
  console.log(`Would send confirmation email to ${email} for ${name}`)
}

function generateSubmissionId(): string {
  return `partner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Rate limiting helper (basic implementation)
const submissions = new Map()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxSubmissions = 3
  
  const userSubmissions = submissions.get(ip) || []
  const recentSubmissions = userSubmissions.filter((time: number) => now - time < windowMs)
  
  if (recentSubmissions.length >= maxSubmissions) {
    return true
  }
  
  recentSubmissions.push(now)
  submissions.set(ip, recentSubmissions)
  return false
}