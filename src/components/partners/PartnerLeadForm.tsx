'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container, Section, Button } from '@/components/ui'
import { Send, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

type PartnerFormData = z.infer<typeof partnerFormSchema>

export function PartnerLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
  })

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    
    try {
      const response = await fetch('/api/partners/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        if (response.status === 400 && result.errors) {
          // Validation errors
          setSubmitError('Please check your form data and try again.')
        } else if (response.status === 429) {
          // Rate limiting
          setSubmitError('Too many submissions. Please wait 15 minutes before trying again.')
        } else {
          // Other errors
          setSubmitError(result.message || 'Submission failed. Please try again.')
        }
        return
      }
      
      // Success
      setSubmitSuccess(true)
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push('/thank-you-partner')
      }, 2000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="lead-form" className="relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join our network of successful referral partners and start earning 
              competitive commissions while helping your clients access their home equity.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Quick Response Time</h3>
                  <p className="text-neutral-600">We contact all referrals within 48 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Transparent Process</h3>
                  <p className="text-neutral-600">Track your referrals through our partner portal</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Guaranteed Commissions</h3>
                  <p className="text-neutral-600">Get paid within 30 days of closing</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-500">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200"
            >
              <h3 className="text-2xl font-bold mb-6">Get Partner Details</h3>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                    <p className="text-success-800 font-medium">
                      Application submitted successfully! Redirecting you to confirmation page...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-5 h-5 text-red-600 mr-2 mt-0.5">⚠️</div>
                    <div>
                      <p className="text-red-800 font-medium mb-1">Submission Error</p>
                      <p className="text-red-700 text-sm">{submitError}</p>
                      <button
                        type="button"
                        onClick={() => setSubmitError(null)}
                        className="text-red-600 text-sm underline hover:no-underline mt-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="input-base"
                  placeholder="John Smith"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="input-base"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="input-base"
                  placeholder="(416) 573-2641"
                />
              </div>

              {/* Role Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Role *
                </label>
                <select {...register('role')} className="input-base">
                  <option value="">Select your role</option>
                  <option value="advisor">Financial Advisor</option>
                  <option value="realtor">Realtor</option>
                  <option value="cpa">CPA/Accountant</option>
                  <option value="attorney">Elder Law Attorney</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* Client Base Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Size of Client Base *
                </label>
                <select {...register('clientBaseSize')} className="input-base">
                  <option value="">Select size</option>
                  <option value="1-50">1-50 clients</option>
                  <option value="51-200">51-200 clients</option>
                  <option value="201-500">201-500 clients</option>
                  <option value="500+">500+ clients</option>
                </select>
                {errors.clientBaseSize && (
                  <p className="mt-1 text-sm text-red-600">{errors.clientBaseSize.message}</p>
                )}
              </div>

              {/* Working with Seniors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Are you currently working with seniors (62+)? *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      {...register('workingWithSeniors')}
                      type="radio"
                      value="yes"
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('workingWithSeniors')}
                      type="radio"
                      value="no"
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.workingWithSeniors && (
                  <p className="mt-1 text-sm text-red-600">{errors.workingWithSeniors.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="input-base resize-none"
                  placeholder="Tell us about your practice..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting || submitSuccess}
              >
                {submitSuccess ? 'Submitted Successfully!' : 
                 isSubmitting ? 'Sending...' : (
                  <>
                    Send Me Partner Details
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}