import { NextRequest, NextResponse } from 'next/server'
import { calculateAdvancedReverseAmount } from '@/lib/advanced-calculator'
import { 
  ValidationError, 
  CalculationError, 
  RateLimitError,
  AppError,
  logError
} from '@/lib/errors'
import { z } from 'zod'

// Enhanced validation schema for advanced calculator
const AdvancedCalculationInputSchema = z.object({
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string()
    .min(6, 'Postal code is required')
    .max(7, 'Invalid postal code format')
    .regex(/^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/i, 'Please enter a valid Canadian postal code (A1A 1A1)'),
  propertyValue: z.number()
    .min(200000, 'Property value must be at least $200,000')
    .max(5000000, 'Property value cannot exceed $5,000,000'),
  mortgageBalance: z.number()
    .min(0, 'Mortgage balance cannot be negative')
    .max(4900000, 'Mortgage balance seems unusually high'),
  primaryAge: z.number()
    .min(55, 'Primary applicant must be at least 55 years old')
    .max(100, 'Age cannot exceed 100 years'),
  secondaryAge: z.number()
    .min(55, 'Secondary applicant must be at least 55 years old')
    .max(100, 'Age cannot exceed 100 years')
    .optional(),
  productType: z.enum(['lump-sum', 'income-advantage']),
  interestRateTerm: z.enum(['1-year', '3-year', '5-year', 'variable']),
  homeAppreciationRate: z.number()
    .min(0, 'Home appreciation rate cannot be negative')
    .max(15, 'Home appreciation rate cannot exceed 15%'),
  initialAdvance: z.number()
    .min(20000, 'Initial advance must be at least $20,000')
    .max(2000000, 'Initial advance amount is too high'),
  plannedAdvances: z.array(z.object({
    monthlyAmount: z.number()
      .min(1000, 'Monthly advance must be at least $1,000')
      .max(50000, 'Monthly advance amount is too high'),
    startMonth: z.number()
      .min(0, 'Start month cannot be negative')
      .max(120, 'Start month cannot exceed 10 years'),
    endMonth: z.number()
      .min(0, 'End month cannot be negative')
      .max(120, 'End month cannot exceed 10 years')
      .optional()
  })).default([]),
}).refine((data) => {
  return data.mortgageBalance < data.propertyValue
}, {
  message: "Mortgage balance must be less than property value",
  path: ["mortgageBalance"]
}).refine((data) => {
  return data.initialAdvance <= (data.propertyValue * 0.55) - data.mortgageBalance
}, {
  message: "Initial advance exceeds maximum allowable amount",
  path: ["initialAdvance"]
})

// Rate limiting (same as basic calculator)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // Reduced for advanced calculator (more resource intensive)

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
    const validatedData = AdvancedCalculationInputSchema.parse(body)

    // Additional business logic validation
    if (validatedData.secondaryAge && validatedData.secondaryAge < validatedData.primaryAge) {
      // Swap ages so youngest is used for calculation
      const temp = validatedData.primaryAge
      validatedData.primaryAge = validatedData.secondaryAge
      validatedData.secondaryAge = temp
    }

    // Validate planned advances don't overlap inappropriately
    for (const advance of validatedData.plannedAdvances) {
      if (advance.endMonth && advance.endMonth <= advance.startMonth) {
        throw new ValidationError('End month must be after start month', 'plannedAdvances')
      }
    }

    // Check if loan would be viable considering all advances
    const totalPlannedAdvances = validatedData.plannedAdvances.reduce((total, advance) => {
      const months = advance.endMonth ? (advance.endMonth - advance.startMonth + 1) : 60 // Default 5 years
      return total + (advance.monthlyAmount * months)
    }, 0)

    const maxLtvEstimate = 0.55 // Maximum possible LTV
    const estimatedMaxAmount = validatedData.propertyValue * maxLtvEstimate - validatedData.mortgageBalance
    const totalAdvanceAmount = validatedData.initialAdvance + totalPlannedAdvances

    if (totalAdvanceAmount > estimatedMaxAmount) {
      throw new CalculationError(
        `Total advance amount (${totalAdvanceAmount.toLocaleString()}) exceeds estimated maximum of ${estimatedMaxAmount.toLocaleString()}`
      )
    }

    // Perform advanced calculation
    const result = await calculateAdvancedReverseAmount(validatedData)

    // Enhanced logging for production analytics
    const calculationLog = {
      calculationId: result.calculationId,
      timestamp: new Date().toISOString(),
      clientId: clientId.substring(0, 8) + '***', // Partial IP for privacy
      type: 'advanced',
      inputs: {
        province: validatedData.province,
        postalCode: validatedData.postalCode,
        propertyValue: validatedData.propertyValue,
        mortgageBalance: validatedData.mortgageBalance,
        primaryAge: validatedData.primaryAge,
        hasSecondaryAge: !!validatedData.secondaryAge,
        productType: validatedData.productType,
        interestRateTerm: validatedData.interestRateTerm,
        homeAppreciationRate: validatedData.homeAppreciationRate,
        initialAdvance: validatedData.initialAdvance,
        plannedAdvancesCount: validatedData.plannedAdvances.length
      },
      result: {
        estimatedAmount: result.estimatedAmount,
        maxLTV: result.maxLTV,
        interestRate: result.interestRate,
        finalEquity: result.breakdown.remainingEquity,
        viable: result.estimatedAmount >= 20000
      }
    }

    console.log('Advanced reverse mortgage calculation:', calculationLog)

    return NextResponse.json(result)

  } catch (error) {
    // Log error for monitoring
    logError(error, 'advanced-calculator-api')

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
      const zodError = error as { errors: Array<{ message: string; path?: string[] }> }
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
        error: 'An unexpected error occurred during advanced calculation. Please try again.',
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}