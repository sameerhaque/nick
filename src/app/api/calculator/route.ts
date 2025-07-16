import { NextRequest, NextResponse } from 'next/server'
import { calculateReverseAmount } from '@/lib/calculator'
import { 
  CalculationInputSchema, 
  ValidationError, 
  CalculationError, 
  RateLimitError,
  AppError,
  logError,
  getErrorMessage
} from '@/lib/errors'

// Rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10 // 10 requests per minute

function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const clientData = rateLimitMap.get(clientId)
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (clientData.count >= RATE_LIMIT_MAX) {
    return false
  }
  
  clientData.count++
  return true
}

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  try {
    // Rate limiting
    if (!checkRateLimit(clientId)) {
      throw new RateLimitError()
    }

    // Parse and validate input
    const body = await request.json()
    const validatedData = CalculationInputSchema.parse(body)

    // Additional business logic validation
    if (validatedData.secondaryAge && validatedData.secondaryAge < validatedData.primaryAge) {
      // Swap ages so youngest is used for calculation
      const temp = validatedData.primaryAge
      validatedData.primaryAge = validatedData.secondaryAge
      validatedData.secondaryAge = temp
    }

    // Check if loan would be viable
    const minViableAmount = 50000 // Minimum viable loan amount
    const maxLtvEstimate = 0.55 // Maximum possible LTV
    const estimatedMaxAmount = validatedData.propertyValue * maxLtvEstimate - validatedData.mortgageBalance
    
    if (estimatedMaxAmount < minViableAmount) {
      throw new CalculationError(
        `Based on your property value and mortgage balance, you may not qualify for a reverse mortgage. Minimum available amount would be insufficient.`
      )
    }

    // Perform calculation
    const result = await calculateReverseAmount(validatedData)

    // Enhanced logging for production analytics
    const calculationLog = {
      calculationId: result.calculationId,
      timestamp: new Date().toISOString(),
      clientId: clientId.substring(0, 8) + '***', // Partial IP for privacy
      inputs: {
        province: validatedData.province,
        city: validatedData.city,
        propertyValue: validatedData.propertyValue,
        mortgageBalance: validatedData.mortgageBalance,
        primaryAge: validatedData.primaryAge,
        hasSecondaryAge: !!validatedData.secondaryAge,
        productType: validatedData.productType
      },
      result: {
        estimatedAmount: result.estimatedAmount,
        maxLTV: result.maxLTV,
        viable: result.estimatedAmount >= minViableAmount
      }
    }

    console.log('Reverse mortgage calculation:', calculationLog)

    // Add compliance warnings to response
    return NextResponse.json({
      ...result,
      compliance: {
        isEstimateOnly: true,
        requiresCounseling: true,
        subjectToApproval: true,
        interestAccrues: true
      },
      warnings: result.estimatedAmount < 100000 ? [
        'Low loan amount may not be cost-effective given fees and interest'
      ] : []
    })

  } catch (error) {
    // Log error for monitoring
    logError(error, 'calculator-api')

    // Handle different error types
    if (error instanceof AppError) {
      return NextResponse.json(
        { 
          error: error.userMessage,
          code: error.code,
          field: error instanceof ValidationError ? error.field : undefined
        },
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
          code: 'VALIDATION_ERROR',
          field: firstError.path?.join('.')
        },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again.',
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}