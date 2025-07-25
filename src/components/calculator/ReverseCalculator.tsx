'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Container, Section } from '@/components/ui'
import { Calculator, ArrowRight, Home, Users, DollarSign } from 'lucide-react'
import { calculateReverseAmountAPI, type CalculationInputs, type CalculationResult } from '@/lib/calculator'
import { ComplianceDisclaimer, ComplianceWrapper } from '@/components/compliance/ComplianceDisclaimer'
import { LeadCaptureForm } from '@/components/leads/LeadCaptureForm'

interface FormData {
  province: string
  postalCode: string
  propertyValue: number
  mortgageBalance: number
  primaryAge: number
  secondaryAge?: number
  productType: 'lump-sum' | 'income-advantage'
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
  { id: 'product', title: 'Product', icon: Calculator },
]

export function ReverseCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    province: '',
    postalCode: '',
    propertyValue: 0,
    mortgageBalance: 0,
    primaryAge: 0,
    secondaryAge: undefined,
    productType: 'lump-sum'
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateField = (field: keyof FormData, value: string | number | undefined): string => {
    switch (field) {
      case 'province':
        return !value ? 'Province is required' : ''
      case 'postalCode':
        if (!value) return 'Postal code is required'
        const postalRegex = /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/i
        return !postalRegex.test(value as string) ? 'Please enter a valid Canadian postal code (A1A 1A1)' : ''
      case 'primaryAge':
        if (!value || value === 0) return 'Age is required'
        return (value as number) < 55 ? 'Must be 55 or older to qualify' : ''
      case 'propertyValue':
        if (!value || value === 0) return 'Property value is required'
        return (value as number) < 200000 ? 'Property value must be at least $200,000' : ''
      case 'mortgageBalance':
        if ((value as number) < 0) return 'Mortgage balance cannot be negative'
        if (formData.propertyValue && (value as number) >= formData.propertyValue) {
          return 'Mortgage balance must be less than property value'
        }
        return ''
      case 'secondaryAge':
        if (showSecondary && (!value || value === 0)) return 'Spouse age is required'
        if (showSecondary && (value as number) < 55) return 'Must be 55 or older to qualify'
        return ''
      default:
        return ''
    }
  }

  const formatCurrency = (value: string): number => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '')
    return parseFloat(numericValue) || 0
  }


  const formatPostalCode = (value: string): string => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
    
    // Add space after 3rd character if length > 3
    if (cleaned.length > 3) {
      return cleaned.substring(0, 3) + ' ' + cleaned.substring(3, 6)
    }
    return cleaned
  }

  const handleInputChange = (field: keyof FormData, value: string | number | undefined) => {
    let processedValue = value
    
    // Format postal code
    if (field === 'postalCode' && typeof value === 'string') {
      processedValue = formatPostalCode(value)
    }
    
    // Format currency fields
    if ((field === 'propertyValue' || field === 'mortgageBalance') && typeof value === 'string') {
      processedValue = formatCurrency(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }))
    
    // Real-time validation
    const error = validateField(field, processedValue)
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }))
    
    // Also validate mortgage balance when property value changes
    if (field === 'propertyValue' && formData.mortgageBalance) {
      const mortgageError = validateField('mortgageBalance', formData.mortgageBalance)
      setFieldErrors(prev => ({
        ...prev,
        mortgageBalance: mortgageError
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleCalculate()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    // Only allow navigation to completed steps or current step
    if (stepIndex <= currentStep || isStepCompleted(stepIndex - 1)) {
      setCurrentStep(stepIndex)
    }
  }

  const isStepCompleted = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Location & Age
        return formData.province && formData.postalCode && formData.primaryAge >= 55
      case 1: // Property
        return formData.propertyValue > 0
      case 2: // Spouse/Partner
        return !showSecondary || (formData.secondaryAge && formData.secondaryAge >= 55)
      case 3: // Product
        return formData.productType
      default:
        return false
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    setError(null)
    
    try {
      const inputs: CalculationInputs = {
        province: formData.province,
        postalCode: formData.postalCode,
        propertyValue: formData.propertyValue,
        mortgageBalance: formData.mortgageBalance,
        primaryAge: formData.primaryAge,
        secondaryAge: formData.secondaryAge,
        productType: formData.productType
      }

      const calculationResult = await calculateReverseAmountAPI(inputs)
      setResult(calculationResult)
    } catch (error: unknown) {
      console.error('Calculation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during calculation. Please try again.'
      setError(errorMessage)
    } finally {
      setIsCalculating(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Location & Age
        return formData.province && formData.postalCode && formData.primaryAge >= 55
      case 1: // Property
        return formData.propertyValue > 0
      case 2: // Spouse/Partner
        return !showSecondary || (formData.secondaryAge && formData.secondaryAge >= 55)
      case 3: // Product
        return formData.productType
      default:
        return false
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
                // Handle successful lead submission
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
            className="max-w-2xl mx-auto"
          >
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Your Estimated Amount</h3>
              
              <div className="text-5xl font-bold text-primary-600 mb-2">
                ${result.estimatedAmount.toLocaleString()}
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Initial estimate • Subject to approval • Interest will accrue
              </p>

              {result.warnings && result.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Important Considerations:</h4>
                  {result.warnings.map((warning, index) => (
                    <p key={index} className="text-sm text-amber-700">{warning}</p>
                  ))}
                </div>
              )}
              
              <p className="text-gray-600 mb-8">
                This is an estimate only. Your actual amount will depend on a professional appraisal, 
                current interest rates, and underwriting approval. <strong>Interest will accrue over time, 
                reducing your available equity.</strong>
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Calculation Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Property Value:</span>
                    <div className="font-semibold">${formData.propertyValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Mortgage Balance:</span>
                    <div className="font-semibold">${formData.mortgageBalance.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Primary Age:</span>
                    <div className="font-semibold">{formData.primaryAge} years</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Max LTV:</span>
                    <div className="font-semibold">{(result.maxLTV * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Reverse Mortgage Calculator</h2>
            <p className="text-gray-600">
              Get an estimate of how much you could receive from a reverse mortgage
            </p>
          </div>

          {/* Enhanced Interactive Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep || isStepCompleted(index)
                const isClickable = index <= currentStep || isStepCompleted(index - 1)
                
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => goToStep(index)}
                      disabled={!isClickable}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 relative group ${
                        isActive 
                          ? 'bg-primary-600 text-white ring-4 ring-primary-100 scale-110' 
                          : isCompleted
                          ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                          : isClickable
                          ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      } ${isClickable ? 'hover:scale-105' : ''}`}
                    >
                      {isCompleted && !isActive ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {step.title}
                      </div>
                    </button>
                    
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
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

          <Card className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              {/* Step 1: Location & Age */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Property Location & Your Age</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Province</label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                        fieldErrors.province 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : formData.province
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                      } focus:ring-2 focus:outline-none`}
                      required
                    >
                      <option value="">Select a province</option>
                      {provinces.map(province => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.province && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.province}
                      </div>
                    )}
                    {formData.province && !fieldErrors.province && (
                      <div className="flex items-center mt-1 text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Province selected
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value.toUpperCase())}
                      className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                        fieldErrors.postalCode 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : formData.postalCode && !fieldErrors.postalCode
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                      } focus:ring-2 focus:outline-none`}
                      placeholder="A1A 1A1"
                      pattern="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
                      maxLength={7}
                      required
                    />
                    {fieldErrors.postalCode ? (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.postalCode}
                      </div>
                    ) : formData.postalCode ? (
                      <div className="flex items-center mt-1 text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Valid postal code
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Canadian postal code format: A1A 1A1</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Age</label>
                    <input
                      type="number"
                      value={formData.primaryAge || ''}
                      onChange={(e) => handleInputChange('primaryAge', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="65"
                      min="55"
                      max="100"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be 55 or older to qualify</p>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Property */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Property Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Estimated Property Value</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                      <input
                        type="text"
                        value={formData.propertyValue ? formData.propertyValue.toLocaleString() : ''}
                        onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                        className={`w-full p-3 pl-8 border rounded-lg transition-all duration-200 ${
                          fieldErrors.propertyValue 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : formData.propertyValue && !fieldErrors.propertyValue
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                        } focus:ring-2 focus:outline-none`}
                        placeholder="500,000"
                        required
                      />
                    </div>
                    {fieldErrors.propertyValue ? (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.propertyValue}
                      </div>
                    ) : formData.propertyValue ? (
                      <div className="flex items-center mt-1 text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Property value entered
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Minimum $200,000</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Current Mortgage Balance</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                      <input
                        type="text"
                        value={formData.mortgageBalance ? formData.mortgageBalance.toLocaleString() : ''}
                        onChange={(e) => handleInputChange('mortgageBalance', e.target.value)}
                        className={`w-full p-3 pl-8 border rounded-lg transition-all duration-200 ${
                          fieldErrors.mortgageBalance 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : formData.mortgageBalance && !fieldErrors.mortgageBalance
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                        } focus:ring-2 focus:outline-none`}
                        placeholder="0 (if no mortgage)"
                      />
                    </div>
                    {fieldErrors.mortgageBalance ? (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.mortgageBalance}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Enter 0 if your home is paid off</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Spouse/Partner */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Spouse or Partner Information</h3>
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
                          value={formData.secondaryAge || ''}
                          onChange={(e) => handleInputChange('secondaryAge', parseInt(e.target.value) || undefined)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="62"
                          min="55"
                          max="100"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be 55 or older to qualify</p>
                      </div>
                    )}
                    
                    {!showSecondary && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                          ✓ Single applicant - we&apos;ll use your age ({formData.primaryAge}) for the calculation
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Product */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Product Type</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="productType"
                        value="lump-sum"
                        checked={formData.productType === 'lump-sum'}
                        onChange={(e) => handleInputChange('productType', e.target.value)}
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
                        name="productType"
                        value="income-advantage"
                        checked={formData.productType === 'income-advantage'}
                        onChange={(e) => handleInputChange('productType', e.target.value)}
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
                  type="submit"
                  isLoading={isCalculating}
                  disabled={!isStepValid() || isCalculating}
                  className="min-w-32"
                >
                  {currentStep === steps.length - 1 ? 'Calculate' : 'Next'}
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
      showRisks={false} 
    />
  </ComplianceWrapper>
  )
}