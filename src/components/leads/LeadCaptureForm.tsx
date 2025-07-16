'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card } from '@/components/ui'
import { Shield, Check } from 'lucide-react'
import { LeadCaptureSchema, type LeadCaptureData } from '@/lib/errors'
import { ComplianceDisclaimer } from '@/components/compliance/ComplianceDisclaimer'

interface LeadCaptureFormProps {
  calculationId: string
  estimatedAmount: number
  onSubmit?: (data: LeadCaptureData) => void
}

export function LeadCaptureForm({ calculationId, estimatedAmount, onSubmit }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LeadCaptureData>({
    resolver: zodResolver(LeadCaptureSchema),
    defaultValues: {
      calculationId,
      preferredContact: 'phone',
      bestTimeToCall: 'afternoon',
      hasConsented: false
    }
  })

  const watchedFields = watch()

  const handleFormSubmit = async (data: LeadCaptureData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit information')
      }

      setIsSubmitted(true)
      onSubmit?.(data)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.'
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your information and will contact you within 24 hours to discuss your 
            personalized reverse mortgage illustration.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What&apos;s next:</strong> A licensed mortgage professional will call you to verify 
              your information and schedule a consultation at your convenience.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>Reference: {calculationId}</p>
            <p>Estimated Amount: ${estimatedAmount.toLocaleString()}</p>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Get Your Personalized Illustration</h2>
        <p className="text-xl text-gray-600">
          Based on your estimate of <strong>${estimatedAmount.toLocaleString()}</strong>, 
          let&apos;s get you detailed information about your reverse mortgage options.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('firstName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('lastName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Smith"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Contact Method
              </label>
              <select
                {...register('preferredContact')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="both">Both Phone and Email</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Best Time to Call
              </label>
              <select
                {...register('bestTimeToCall')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 7 PM)</option>
              </select>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <label className="flex items-start gap-3">
              <input
                {...register('hasConsented')}
                type="checkbox"
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-sm">
                <p className="font-medium mb-2">
                  I consent to be contacted about reverse mortgage products and services.
                </p>
                <p className="text-gray-600">
                  By providing my contact information, I agree to receive calls, texts, and emails 
                  about reverse mortgage products and services. I understand I can opt out at any time.
                </p>
              </div>
            </label>
            {errors.hasConsented && (
              <p className="mt-2 text-sm text-red-600">{errors.hasConsented.message}</p>
            )}
          </div>

          {/* Security Features */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">Your Information is Protected</p>
                <p className="text-blue-700">
                  We use bank-level encryption and never sell your personal information. 
                  All communications are from licensed professionals only.
                </p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !watchedFields.hasConsented}
            className="w-full text-lg py-4"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Personalized Illustration'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              No obligation • Free consultation • Licensed professionals only
            </p>
          </div>
        </form>
      </Card>

      {/* Compliance Footer */}
      <div className="mt-8">
        <ComplianceDisclaimer 
          type="marketing" 
          placement="inline"
        />
      </div>
    </motion.div>
  )
}

// API endpoint for lead capture
export async function submitLead(data: LeadCaptureData) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to submit lead')
  }

  return response.json()
}