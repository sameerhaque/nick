'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button, Card, Container, Section } from '@/components/ui'
import { 
  Calculator, 
  ArrowRight, 
  Home, 
  Users, 
  DollarSign, 
  Calendar,
  Percent,
  Plus,
  Trash2
} from 'lucide-react'
import { 
  calculateAdvancedReverseAmountAPI, 
  type AdvancedCalculationInputs, 
  type AdvancedCalculationResult 
} from '@/lib/advanced-calculator'
import { ComplianceDisclaimer, ComplianceWrapper } from '@/components/compliance/ComplianceDisclaimer'
import { LeadCaptureForm } from '@/components/leads/LeadCaptureForm'
import { EquityProjectionChart } from '@/components/calculator/EquityProjectionChart'

interface FormData {
  province: string
  postalCode: string
  propertyValue: number
  mortgageBalance: number
  primaryAge: number
  secondaryAge?: number
  productType: 'lump-sum' | 'income-advantage'
  interestRateTerm: '1-year' | '3-year' | '5-year' | 'variable'
  homeAppreciationRate: number
  initialAdvance: number
  plannedAdvances: Array<{
    monthlyAmount: number
    startMonth: number
    endMonth?: number
  }>
}

const provinces = [
  { code: 'BC', name: 'British Columbia' },
  { code: 'AB', name: 'Alberta' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'ON', name: 'Ontario' },
  { code: 'QC', name: 'Quebec' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
]

const steps = [
  { id: 'location', title: 'Location & Age', icon: Home },
  { id: 'property', title: 'Property', icon: DollarSign },
  { id: 'personal', title: 'Spouse/Partner', icon: Users },
  { id: 'rates', title: 'Rates & Terms', icon: Percent },
  { id: 'advances', title: 'Advances', icon: Calendar },
  { id: 'product', title: 'Product', icon: Calculator },
]

const interestRateOptions = [
  { value: '1-year', label: '1 Year Fixed', rate: '6.5%' },
  { value: '3-year', label: '3 Year Fixed', rate: '6.8%' },
  { value: '5-year', label: '5 Year Fixed', rate: '7.2%' },
  { value: 'variable', label: 'Variable Rate', rate: '6.3%' },
]

export function AdvancedReverseCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<AdvancedCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    defaultValues: {
      province: '',
      postalCode: '',
      propertyValue: 500000,
      mortgageBalance: 0,
      primaryAge: 65,
      secondaryAge: undefined,
      productType: 'lump-sum',
      interestRateTerm: '5-year',
      homeAppreciationRate: 3.5,
      initialAdvance: 50000,
      plannedAdvances: []
    }
  })

  const { register, handleSubmit, formState: { errors }, setValue, watch, getValues } = form

  const watchedValues = watch()

  const formatCurrency = (value: string): number => {
    const numericValue = value.replace(/[^\d.]/g, '')
    return parseFloat(numericValue) || 0
  }

  const formatPostalCode = (value: string): string => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
    if (cleaned.length > 3) {
      return cleaned.substring(0, 3) + ' ' + cleaned.substring(3, 6)
    }
    return cleaned
  }

  const handleNext = () => {
    setError(null) // Clear any previous errors
    
    if (!validateCurrentStep()) {
      setError('Please fill in all required fields correctly before continuing.')
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleCalculate()
    }
  }

  const handleBack = () => {
    setError(null) // Clear errors when navigating
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    setError(null) // Clear errors when navigating
    setCurrentStep(stepIndex)
  }

  const addPlannedAdvance = () => {
    const currentAdvances = getValues('plannedAdvances')
    setValue('plannedAdvances', [
      ...currentAdvances,
      { monthlyAmount: 1000, startMonth: 12, endMonth: undefined }
    ])
  }

  const removePlannedAdvance = (index: number) => {
    const currentAdvances = getValues('plannedAdvances')
    setValue('plannedAdvances', currentAdvances.filter((_, i) => i !== index))
  }

  const validateCurrentStep = (): boolean => {
    const values = getValues()
    
    switch (currentStep) {
      case 0: // Location & Age
        if (!values.province || !values.postalCode || !values.primaryAge || values.primaryAge < 55) {
          return false
        }
        break
      case 1: // Property
        if (!values.propertyValue || values.propertyValue < 200000 || values.mortgageBalance < 0) {
          return false
        }
        break
      case 2: // Spouse/Partner
        if (showSecondary && (!values.secondaryAge || values.secondaryAge < 55)) {
          return false
        }
        break
      case 3: // Rates & Terms
        if (!values.interestRateTerm || values.homeAppreciationRate < 0 || values.homeAppreciationRate > 15) {
          return false
        }
        break
      case 4: // Advances
        if (!values.initialAdvance || values.initialAdvance < 20000) {
          return false
        }
        break
      case 5: // Product
        if (!values.productType) {
          return false
        }
        break
    }
    return true
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    
    try {
      const formData = form.getValues()
      
      // Basic validation
      if (!formData.province) {
        throw new Error('Province is required')
      }
      if (!formData.postalCode) {
        throw new Error('Postal code is required')
      }
      if (!formData.primaryAge || formData.primaryAge < 55) {
        throw new Error('Age must be 55 or older')
      }
      if (!formData.propertyValue || formData.propertyValue < 200000) {
        throw new Error('Property value must be at least $200,000')
      }
      if (formData.mortgageBalance < 0) {
        throw new Error('Mortgage balance cannot be negative')
      }
      if (!formData.initialAdvance || formData.initialAdvance < 20000) {
        throw new Error('Initial advance must be at least $20,000')
      }
      
      const inputs: AdvancedCalculationInputs = {
        ...formData,
        secondaryAge: showSecondary ? formData.secondaryAge : undefined,
      }

      const calculationResult = await calculateAdvancedReverseAmountAPI(inputs)
      setResult(calculationResult)
    } catch (error: unknown) {
      console.error('Advanced calculation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during calculation'
      setError(errorMessage)
    } finally {
      setIsCalculating(false)
    }
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

    return (
      <Section className="bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-3xl font-bold mb-3">Your Financial Illustration</h3>
                
                <div className="text-5xl font-bold text-primary-600 mb-3">
                  ${result.estimatedAmount.toLocaleString()}
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  Initial Advance Amount • Subject to approval
                </p>

                {result.warnings && result.warnings.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    {result.warnings.map((warning, index) => (
                      <p key={index} className="text-sm text-amber-700">{warning}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Projection Chart */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">10-Year Equity Projection</h4>
                <EquityProjectionChart data={result.projectionTimeline} />
              </div>

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4">Advance Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Initial Advance:</span>
                      <span className="font-semibold">${result.breakdown.initialAdvance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Planned Advances:</span>
                      <span className="font-semibold">${result.breakdown.totalPlannedAdvances.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-semibold">{(result.interestRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4">10-Year Projection</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Final Home Value:</span>
                      <span className="font-semibold">${result.breakdown.finalHomeValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold">${result.breakdown.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining Equity:</span>
                      <span className="font-semibold text-green-600">${result.breakdown.remainingEquity.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => setShowLeadForm(true)}
                >
                  Get Your Personalized Illustration
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    setResult(null)
                    setCurrentStep(0)
                    setShowLeadForm(false)
                  }}
                >
                  Start Over
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                This advanced illustration includes projections based on your inputs. 
                Actual results depend on professional appraisal, current interest rates, and underwriting approval. 
                <strong> Interest will compound over time.</strong> Home appreciation rates are estimates and may vary.
              </p>
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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Advanced Reverse Mortgage Calculator</h2>
              <p className="text-gray-600 text-lg">
                Get detailed financial projections with customizable terms and advance scheduling
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 overflow-x-auto">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  
                  return (
                    <div key={step.id} className="flex items-center min-w-0">
                      <button
                        onClick={() => goToStep(index)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary-600 text-white ring-4 ring-primary-100 scale-110' 
                            : isCompleted
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </button>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                          index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  Step {currentStep + 1} of {steps.length}: <span className="font-semibold">{steps[currentStep].title}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <Card className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit(handleCalculate)}>
                {/* Step 0: Location & Age */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Property Location & Your Age</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Province</label>
                      <select
                        {...register('province')}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select a province</option>
                        {provinces.map(province => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {errors.province && (
                        <p className="text-red-600 text-sm mt-1">{errors.province.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        {...register('postalCode')}
                        onChange={(e) => {
                          const formatted = formatPostalCode(e.target.value)
                          setValue('postalCode', formatted)
                        }}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="A1A 1A1"
                        maxLength={7}
                      />
                      {errors.postalCode && (
                        <p className="text-red-600 text-sm mt-1">{errors.postalCode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Your Age</label>
                      <input
                        type="number"
                        {...register('primaryAge', { valueAsNumber: true })}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="65"
                        min="55"
                        max="100"
                      />
                      {errors.primaryAge && (
                        <p className="text-red-600 text-sm mt-1">{errors.primaryAge.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Property */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Property Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Estimated Property Value</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="text"
                          value={watchedValues.propertyValue ? watchedValues.propertyValue.toLocaleString() : ''}
                          onChange={(e) => {
                            const value = formatCurrency(e.target.value)
                            setValue('propertyValue', value)
                          }}
                          className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="500,000"
                        />
                      </div>
                      {errors.propertyValue && (
                        <p className="text-red-600 text-sm mt-1">{errors.propertyValue.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Current Mortgage Balance</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="text"
                          value={watchedValues.mortgageBalance ? watchedValues.mortgageBalance.toLocaleString() : ''}
                          onChange={(e) => {
                            const value = formatCurrency(e.target.value)
                            setValue('mortgageBalance', value)
                          }}
                          className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="0 (if no mortgage)"
                        />
                      </div>
                      {errors.mortgageBalance && (
                        <p className="text-red-600 text-sm mt-1">{errors.mortgageBalance.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Spouse/Partner */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Spouse or Partner Information</h3>
                    <p className="text-gray-600">For joint applications, we use the younger age to calculate your maximum amount.</p>
                    
                    <div>
                      <label className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          checked={showSecondary}
                          onChange={(e) => setShowSecondary(e.target.checked)}
                          className="mr-3 h-4 w-4"
                        />
                        <span className="text-sm font-medium">I have a spouse/partner who will also be on the mortgage</span>
                      </label>
                      
                      {showSecondary && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Spouse/Partner Age</label>
                          <input
                            type="number"
                            {...register('secondaryAge', { valueAsNumber: true })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="62"
                            min="55"
                            max="100"
                          />
                          {errors.secondaryAge && (
                            <p className="text-red-600 text-sm mt-1">{errors.secondaryAge.message}</p>
                          )}
                        </div>
                      )}
                      
                      {!showSecondary && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-700">
                            ✓ Single applicant - we&apos;ll use your age ({watchedValues.primaryAge}) for the calculation
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Rates & Terms */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Interest Rates & Terms</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3">Interest Rate Term</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {interestRateOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              {...register('interestRateTerm')}
                              value={option.value}
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600">Current rate: {option.rate}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
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
                      <p className="text-xs text-gray-600 mt-2">
                        Historical average home appreciation in Canada is approximately 3.5% annually
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Advances */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Advance Planning</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Initial Advance Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="text"
                          value={watchedValues.initialAdvance ? watchedValues.initialAdvance.toLocaleString() : ''}
                          onChange={(e) => {
                            const value = formatCurrency(e.target.value)
                            setValue('initialAdvance', value)
                          }}
                          className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="50,000"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Minimum $20,000</p>
                      {errors.initialAdvance && (
                        <p className="text-red-600 text-sm mt-1">{errors.initialAdvance.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Planned Monthly Advances</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addPlannedAdvance}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Advance
                        </Button>
                      </div>
                      
                      {watchedValues.plannedAdvances?.map((advance, index) => (
                        <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-50">
                          <div className="grid md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-xs font-medium mb-1">Monthly Amount</label>
                              <div className="relative">
                                <span className="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                                <input
                                  type="number"
                                  {...register(`plannedAdvances.${index}.monthlyAmount`, { valueAsNumber: true })}
                                  className="w-full p-2 pl-6 border rounded text-sm focus:ring-2 focus:ring-primary-500"
                                  min="1000"
                                  placeholder="1,000"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Start Month</label>
                              <input
                                type="number"
                                {...register(`plannedAdvances.${index}.startMonth`, { valueAsNumber: true })}
                                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-primary-500"
                                min="0"
                                max="120"
                                placeholder="12"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">End Month (Optional)</label>
                              <input
                                type="number"
                                {...register(`plannedAdvances.${index}.endMonth`, { valueAsNumber: true })}
                                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-primary-500"
                                min="0"
                                max="120"
                                placeholder="60"
                              />
                            </div>
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removePlannedAdvance(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {(!watchedValues.plannedAdvances || watchedValues.plannedAdvances.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>No planned advances added</p>
                          <p className="text-sm">Add monthly advances to see their impact over time</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Product */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold">Product Type</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          {...register('productType')}
                          value="lump-sum"
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium">Lump Sum</div>
                          <div className="text-sm text-gray-600">
                            Receive the full amount upfront as a one-time payment
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          {...register('productType')}
                          value="income-advantage"
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium">Income Advantage</div>
                          <div className="text-sm text-gray-600">
                            Receive regular monthly payments for ongoing income
                          </div>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleNext}
                    isLoading={isCalculating}
                    disabled={isCalculating}
                    className="min-w-32"
                  >
                    {currentStep === steps.length - 1 ? 'Calculate Projection' : 'Next'}
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