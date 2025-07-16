// Error types for the application
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  COMPLIANCE_ERROR = 'COMPLIANCE_ERROR'
}

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly userMessage: string
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message)
    this.code = code
    this.userMessage = userMessage
    this.statusCode = statusCode
    this.isOperational = isOperational
    
    Object.setPrototypeOf(this, AppError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  public readonly field?: string

  constructor(message: string, field?: string) {
    super(
      ErrorCode.VALIDATION_ERROR,
      message,
      `Please check your ${field || 'information'} and try again.`,
      400
    )
    this.field = field
  }
}

export class CalculationError extends AppError {
  constructor(message: string) {
    super(
      ErrorCode.CALCULATION_ERROR,
      message,
      'Unable to calculate estimate. Please verify your information and try again.',
      422
    )
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(
      ErrorCode.RATE_LIMIT_ERROR,
      'Rate limit exceeded',
      'Too many requests. Please wait a moment and try again.',
      429
    )
  }
}

export class NetworkError extends AppError {
  constructor() {
    super(
      ErrorCode.NETWORK_ERROR,
      'Network request failed',
      'Connection issue. Please check your internet connection and try again.',
      503
    )
  }
}

// Error handling utilities
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.userMessage
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred. Please try again.'
}

export function logError(error: unknown, context: string) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    code: isAppError(error) ? error.code : ErrorCode.UNKNOWN_ERROR,
    isOperational: isAppError(error) ? error.isOperational : false
  }
  
  console.error('Application Error:', errorInfo)
  
  // In production, send to logging service
  // await sendToLoggingService(errorInfo)
}

// Validation schema using Zod
import { z } from 'zod'

export const CalculationInputSchema = z.object({
  province: z.string().min(2, 'Province is required'),
  city: z.string().min(1, 'City is required'),
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
}).refine((data) => {
  return data.mortgageBalance < data.propertyValue
}, {
  message: "Mortgage balance must be less than property value",
  path: ["mortgageBalance"]
})

export const LeadCaptureSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  calculationId: z.string().min(1, 'Calculation ID is required'),
  preferredContact: z.enum(['email', 'phone', 'both']).optional(),
  bestTimeToCall: z.enum(['morning', 'afternoon', 'evening']).optional(),
  hasConsented: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
})

export type CalculationInputs = z.infer<typeof CalculationInputSchema>
export type LeadCaptureData = z.infer<typeof LeadCaptureSchema>