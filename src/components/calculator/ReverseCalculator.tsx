'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Container, Section } from '@/components/ui'
import { Calculator, ArrowRight, Home, Users, DollarSign } from 'lucide-react'
import { calculateReverseAmountAPI, type CalculationInputs, type CalculationResult } from '@/lib/calculator'
import { ComplianceDisclaimer, ComplianceWrapper } from '@/components/compliance/ComplianceDisclaimer'
import { LeadCaptureForm } from '@/components/leads/LeadCaptureForm'

interface FormData {
  province: string
  city: string
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
  { id: 'location', title: 'Location', icon: Home },
  { id: 'property', title: 'Property', icon: DollarSign },
  { id: 'personal', title: 'Personal', icon: Users },
  { id: 'product', title: 'Product', icon: Calculator },
]

export function ReverseCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    province: '',
    city: '',
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

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const handleCalculate = async () => {
    setIsCalculating(true)
    setError(null)
    
    try {
      const inputs: CalculationInputs = {
        province: formData.province,
        city: formData.city,
        propertyValue: formData.propertyValue,
        mortgageBalance: formData.mortgageBalance,
        primaryAge: formData.primaryAge,
        secondaryAge: formData.secondaryAge,
        productType: formData.productType
      }

      const calculationResult = await calculateReverseAmountAPI(inputs)
      setResult(calculationResult)
    } catch (error: any) {
      console.error('Calculation error:', error)
      setError(error.message || 'An error occurred during calculation. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Location
        return formData.province && formData.city
      case 1: // Property
        return formData.propertyValue > 0
      case 2: // Personal
        return formData.primaryAge >= 55 && (!showSecondary || (formData.secondaryAge && formData.secondaryAge >= 55))
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

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </span>
            </div>
          </div>

          <Card className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              {/* Step 1: Location */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Where is your property located?</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Province</label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select a province</option>
                      {provinces.map(province => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your city"
                      required
                    />
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
                    <label className="block text-sm font-medium mb-2">Estimated Property Value</label>
                    <input
                      type="number"
                      value={formData.propertyValue || ''}
                      onChange={(e) => handleInputChange('propertyValue', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="500000"
                      min="200000"
                      max="5000000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Current Mortgage Balance</label>
                    <input
                      type="number"
                      value={formData.mortgageBalance || ''}
                      onChange={(e) => handleInputChange('mortgageBalance', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Personal */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  
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
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={showSecondary}
                        onChange={(e) => setShowSecondary(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">Add spouse/partner age</span>
                    </label>
                    
                    {showSecondary && (
                      <input
                        type="number"
                        value={formData.secondaryAge || ''}
                        onChange={(e) => handleInputChange('secondaryAge', parseInt(e.target.value) || undefined)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="62"
                        min="55"
                        max="100"
                      />
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
                  disabled={!isStepValid() || isCalculating}
                  className="min-w-32"
                >
                  {isCalculating ? 'Calculating...' : currentStep === steps.length - 1 ? 'Calculate' : 'Next'}
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