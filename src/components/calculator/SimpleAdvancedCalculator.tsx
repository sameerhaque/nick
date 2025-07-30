'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button, Card, Container, Section } from '@/components/ui'
import { 
  Calculator, 
  Download,
  Info,
  DollarSign
} from 'lucide-react'
import { 
  calculateAdvancedReverseAmountAPI, 
  type AdvancedCalculationInputs, 
  type AdvancedCalculationResult 
} from '@/lib/advanced-calculator'
import { ComplianceDisclaimer, ComplianceWrapper } from '@/components/compliance/ComplianceDisclaimer'
import { LeadCaptureForm } from '@/components/leads/LeadCaptureForm'

interface FormData {
  // Homeowner 1
  primaryAge: number
  primaryGender: 'Male' | 'Female' | 'Other'
  
  // Homeowner 2 (Optional)
  hasSecondary: boolean
  secondaryAge?: number
  secondaryGender?: 'Male' | 'Female' | 'Other'
  
  // Property Information
  estimatedHomeValue: number
  homeType: 'Detached' | 'Semi-Detached' | 'Townhouse' | 'Condominium' | 'Other'
  postalCode: string
  city: string
  
  // Advanced Options (Optional)
  currentMortgage: number
  interestRateTerm: '1-year' | '3-year' | '5-year' | 'variable'
  homeAppreciationRate: number
}

const homeTypes = [
  { value: 'Detached', label: 'Detached' },
  { value: 'Semi-Detached', label: 'Semi-Detached' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Condominium', label: 'Condominium' },
  { value: 'Other', label: 'Other' }
]

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
]

const interestRateOptions = [
  { value: '1-year', label: '1 Year Fixed (6.5%)', rate: 6.5 },
  { value: '3-year', label: '3 Year Fixed (6.8%)', rate: 6.8 },
  { value: '5-year', label: '5 Year Fixed (7.2%)', rate: 7.2 },
  { value: 'variable', label: 'Variable Rate (6.3%)', rate: 6.3 }
]

export function SimpleAdvancedCalculator() {
  const [result, setResult] = useState<AdvancedCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      primaryAge: 62,
      primaryGender: 'Male',
      hasSecondary: false,
      secondaryAge: 62,
      secondaryGender: 'Male',
      estimatedHomeValue: 500000,
      homeType: 'Semi-Detached',
      postalCode: 'M4M 0A6',
      city: 'Toronto',
      currentMortgage: 0,
      interestRateTerm: '5-year',
      homeAppreciationRate: 3.5
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form
  const watchedValues = watch()

  // Auto-fill city based on postal code (simplified)
  const handlePostalCodeChange = (value: string) => {
    setValue('postalCode', value.toUpperCase())
    
    // Simple city mapping - in real app would use postal code API
    const postalCode = value.replace(/\s/g, '').toUpperCase()
    if (postalCode.startsWith('M')) {
      setValue('city', 'Toronto')
    } else if (postalCode.startsWith('K')) {
      setValue('city', 'Ottawa')
    } else if (postalCode.startsWith('V')) {
      setValue('city', 'Vancouver')
    } else if (postalCode.startsWith('T')) {
      setValue('city', 'Calgary')
    } else {
      // Keep existing city value
    }
  }

  const formatCurrency = (value: string): number => {
    const numericValue = value.replace(/[^\d.]/g, '')
    return parseFloat(numericValue) || 0
  }

  const getProvinceFromPostal = (postalCode: string): string => {
    const code = postalCode.replace(/\s/g, '').toUpperCase()
    if (code.startsWith('M') || code.startsWith('L') || code.startsWith('N') || code.startsWith('P')) return 'ON'
    if (code.startsWith('V')) return 'BC'
    if (code.startsWith('T')) return 'AB'
    if (code.startsWith('K')) return 'ON'
    if (code.startsWith('R')) return 'MB'
    if (code.startsWith('S')) return 'SK'
    if (code.startsWith('G') || code.startsWith('H') || code.startsWith('J')) return 'QC'
    if (code.startsWith('E')) return 'NB'
    if (code.startsWith('B') || code.startsWith('C')) return 'NS'
    if (code.startsWith('A')) return 'NL'
    return 'ON' // Default to Ontario
  }

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true)
    setError(null)
    
    try {
      const province = getProvinceFromPostal(data.postalCode)
      
      const inputs: AdvancedCalculationInputs = {
        province,
        postalCode: data.postalCode,
        propertyValue: data.estimatedHomeValue,
        mortgageBalance: data.currentMortgage,
        primaryAge: data.primaryAge,
        secondaryAge: data.hasSecondary ? data.secondaryAge : undefined,
        productType: 'lump-sum',
        interestRateTerm: data.interestRateTerm,
        homeAppreciationRate: data.homeAppreciationRate,
        initialAdvance: Math.min(50000, data.estimatedHomeValue * 0.3), // Default initial advance
        plannedAdvances: []
      }

      const calculationResult = await calculateAdvancedReverseAmountAPI(inputs)
      setResult(calculationResult)
    } catch (error: unknown) {
      console.error('Calculation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during calculation'
      setError(errorMessage)
    } finally {
      setIsCalculating(false)
    }
  }

  const downloadQuote = () => {
    if (!result) return
    
    // Create a simple text summary for download
    const quote = `
REVERSE MORTGAGE ESTIMATE
========================

Property Information:
- Estimated Home Value: $${watchedValues.estimatedHomeValue.toLocaleString()}
- Home Type: ${watchedValues.homeType}
- Location: ${watchedValues.city}, ${watchedValues.postalCode}

Applicant Information:
- Primary Applicant: Age ${watchedValues.primaryAge}, ${watchedValues.primaryGender}
${watchedValues.hasSecondary ? `- Secondary Applicant: Age ${watchedValues.secondaryAge}, ${watchedValues.secondaryGender}` : ''}

ESTIMATED AMOUNT: $${result.estimatedAmount.toLocaleString()}

Interest Rate: ${(result.interestRate * 100).toFixed(1)}%
Maximum LTV: ${(result.maxLTV * 100).toFixed(1)}%

IMPORTANT: This quote is an estimate only. Actual approved amounts will vary based on a detailed review and may be subject to different rates than posted. For a more detailed assessment, please speak with a licensed mortgage professional.

Generated on: ${new Date().toLocaleDateString()}
Calculation ID: ${result.calculationId}
    `
    
    const blob = new Blob([quote], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reverse-mortgage-quote-${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (result) {
    if (showLeadForm) {
      return (
        <Section className="bg-gray-50">
          <Container>
            <LeadCaptureForm
              calculationId={result.calculationId}
              estimatedAmount={result.estimatedAmount}
              onSubmit={() => {
                console.log('Lead submitted successfully')
              }}
            />
          </Container>
        </Section>
      )
    }

    const minAmount = Math.floor(result.estimatedAmount * 0.9)
    const maxAmount = Math.floor(result.estimatedAmount * 1.1)

    return (
      <Section className="bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-3xl font-bold mb-6 text-gray-900">
                  Your Reverse Mortgage Estimate
                </h3>
                
                <div className="text-5xl font-bold text-green-600 mb-4">
                  ${minAmount.toLocaleString()} - ${maxAmount.toLocaleString()}*
                </div>
                
                <p className="text-lg text-gray-700 mb-2">
                  is the amount you may be eligible for in tax-free cash.
                </p>
                
                <p className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
                  *This quote is an estimate only. Actual approved amounts will vary based on a detailed review 
                  and may be subject to different rates than posted. For a more detailed assessment, please speak 
                  with a licensed mortgage professional.
                </p>
              </div>

              {/* Summary Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4 text-blue-900">Property Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Value:</span>
                      <span className="font-semibold">${watchedValues.estimatedHomeValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Type:</span>
                      <span className="font-semibold">{watchedValues.homeType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{watchedValues.city}, {watchedValues.postalCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Mortgage:</span>
                      <span className="font-semibold">${watchedValues.currentMortgage.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg mb-4 text-green-900">Loan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-semibold">{(result.interestRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum LTV:</span>
                      <span className="font-semibold">{(result.maxLTV * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary Age:</span>
                      <span className="font-semibold">{watchedValues.primaryAge} years</span>
                    </div>
                    {watchedValues.hasSecondary && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Secondary Age:</span>
                        <span className="font-semibold">{watchedValues.secondaryAge} years</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  onClick={downloadQuote}
                  variant="outline"
                  size="lg"
                  className="group"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Quote
                </Button>
                
                <Button 
                  onClick={() => setShowLeadForm(true)}
                  size="lg"
                  className="group"
                >
                  Get Detailed Assessment
                  <Calculator className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setResult(null)
                    setError(null)
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Calculate Another Estimate
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>
    )
  }

  return (
    <ComplianceWrapper requiresDisclaimer={true}>
      <Section className="bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Reverse Mortgage Calculator</h2>
              <p className="text-gray-600 text-lg">
                Get an instant estimate of how much tax-free cash you could access from your home
              </p>
            </div>

            <Card className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Homeowner 1 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Homeowner 1</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Age</label>
                      <input
                        type="number"
                        {...register('primaryAge', { 
                          required: 'Age is required',
                          min: { value: 55, message: 'Must be 55 or older' },
                          max: { value: 100, message: 'Age cannot exceed 100' }
                        })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        min="55"
                        max="100"
                      />
                      {errors.primaryAge && (
                        <p className="text-red-600 text-sm mt-1">{errors.primaryAge.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
                      <select
                        {...register('primaryGender')}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {genderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Homeowner 2 (Optional) */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mr-3">Homeowner 2 (Optional)</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('hasSecondary')}
                        className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-600">Include second homeowner</span>
                    </label>
                  </div>
                  
                  {watchedValues.hasSecondary && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Age</label>
                        <input
                          type="number"
                          {...register('secondaryAge', { 
                            min: { value: 55, message: 'Must be 55 or older' },
                            max: { value: 100, message: 'Age cannot exceed 100' }
                          })}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          min="55"
                          max="100"
                        />
                        {errors.secondaryAge && (
                          <p className="text-red-600 text-sm mt-1">{errors.secondaryAge.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
                        <select
                          {...register('secondaryGender')}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {genderOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Property Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Estimated Home Value
                        <button
                          type="button"
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          title="Enter your home's current market value. You can find this through recent comparable sales or a professional appraisal."
                        >
                          <Info className="w-4 h-4 inline" />
                        </button>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="text"
                          value={watchedValues.estimatedHomeValue ? watchedValues.estimatedHomeValue.toLocaleString() : ''}
                          onChange={(e) => {
                            const value = formatCurrency(e.target.value)
                            setValue('estimatedHomeValue', value)
                          }}
                          className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="500,000"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Home Type</label>
                        <select
                          {...register('homeType')}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {homeTypes.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Postal Code</label>
                        <input
                          type="text"
                          {...register('postalCode', { 
                            required: 'Postal code is required',
                            pattern: {
                              value: /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/i,
                              message: 'Invalid Canadian postal code format'
                            }
                          })}
                          onChange={(e) => handlePostalCodeChange(e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="A1A 1A1"
                          maxLength={7}
                        />
                        {errors.postalCode && (
                          <p className="text-red-600 text-sm mt-1">{errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">City/Town/Village</label>
                      <input
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Toronto"
                      />
                      {errors.city && (
                        <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    {showAdvancedOptions ? '− Hide' : '+ Show'} Advanced Options
                  </button>
                  
                  {showAdvancedOptions && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Current Mortgage Balance</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">$</span>
                          <input
                            type="text"
                            value={watchedValues.currentMortgage ? watchedValues.currentMortgage.toLocaleString() : ''}
                            onChange={(e) => {
                              const value = formatCurrency(e.target.value)
                              setValue('currentMortgage', value)
                            }}
                            className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Interest Rate Term</label>
                        <select
                          {...register('interestRateTerm')}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {interestRateOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Home Appreciation Rate: {watchedValues.homeAppreciationRate}% annually
                        </label>
                        <input
                          type="range"
                          {...register('homeAppreciationRate', { valueAsNumber: true })}
                          min="0"
                          max="10"
                          step="0.1"
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>5%</span>
                          <span>10%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isCalculating}
                    disabled={isCalculating}
                    className="px-12 py-4 text-lg"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate My Estimate'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </Container>
      </Section>
      
      <ComplianceDisclaimer 
        type="calculator" 
        placement="footer" 
        showRisks={true} 
      />
    </ComplianceWrapper>
  )
}