'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Container, Section } from '@/components/ui'
import { Calculator, TrendingUp, Clock, BarChart3 } from 'lucide-react'
import { ReverseCalculator } from '@/components/calculator/ReverseCalculator'
import { AdvancedReverseCalculator } from '@/components/calculator/AdvancedReverseCalculator'
import { SimpleAdvancedCalculator } from '@/components/calculator/SimpleAdvancedCalculator'

type CalculatorType = 'selection' | 'basic' | 'advanced' | 'simple'

export default function CalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('simple')

  if (calculatorType === 'basic') {
    return (
      <main id="main">
        <ReverseCalculator />
      </main>
    )
  }

  if (calculatorType === 'advanced') {
    return (
      <main id="main">
        <AdvancedReverseCalculator />
      </main>
    )
  }

  if (calculatorType === 'simple') {
    return (
      <main id="main">
        <SimpleAdvancedCalculator />
      </main>
    )
  }

  return (
    <main id="main">
      <Section className="bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 mb-6 border border-primary-100">
                <Calculator className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Free Calculator Tools</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900">
                Choose Your Calculator
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                Get a personalized reverse mortgage estimate with our free calculator tools. 
                Choose the option that best fits your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Basic Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group-hover:border-primary-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-4 text-neutral-900">
                      Quick Estimate
                    </h3>
                    
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      Get a fast, simple estimate in under 2 minutes. Perfect for getting 
                      a basic understanding of your potential reverse mortgage amount.
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Simple 4-step process
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Basic property and age inputs
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Instant estimate calculation
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        No detailed projections
                      </div>
                    </div>

                    <Button 
                      onClick={() => setCalculatorType('basic')}
                      className="w-full group-hover:shadow-lg transition-shadow duration-300"
                      size="lg"
                    >
                      Start Quick Estimate
                    </Button>

                    <div className="mt-4 text-center">
                      <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                        ~2 minutes
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Advanced Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group-hover:border-secondary-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex items-center mb-4">
                      <h3 className="text-2xl font-serif font-bold text-neutral-900">
                        Financial Illustration
                      </h3>
                      <span className="ml-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        RECOMMENDED
                      </span>
                    </div>
                    
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      Get detailed financial projections with customizable terms, planned advances, 
                      and visual charts showing how your equity changes over time.
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                        10-year equity projections
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                        Home appreciation rate slider
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                        Planned monthly advances
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                        Interactive charts & graphs
                      </div>
                      <div className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                        Multiple interest rate terms
                      </div>
                    </div>

                    <Button 
                      onClick={() => setCalculatorType('advanced')}
                      variant="secondary"
                      className="w-full group-hover:shadow-lg transition-shadow duration-300"
                      size="lg"
                    >
                      Create Financial Illustration
                    </Button>

                    <div className="mt-4 text-center">
                      <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                        ~5-7 minutes
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 px-6 py-4 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900">Feature Comparison</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left p-4 font-medium text-neutral-700">Feature</th>
                        <th className="text-center p-4 font-medium text-neutral-700">Quick Estimate</th>
                        <th className="text-center p-4 font-medium text-neutral-700">Financial Illustration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr>
                        <td className="p-4 text-neutral-600">Time to complete</td>
                        <td className="p-4 text-center text-sm">~2 minutes</td>
                        <td className="p-4 text-center text-sm">~5-7 minutes</td>
                      </tr>
                      <tr className="bg-neutral-50">
                        <td className="p-4 text-neutral-600">Basic estimate</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-neutral-600">10-year projections</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                      <tr className="bg-neutral-50">
                        <td className="p-4 text-neutral-600">Visual charts</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-neutral-600">Planned advances</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                      <tr className="bg-neutral-50">
                        <td className="p-4 text-neutral-600">Home appreciation modeling</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-neutral-600">Interest rate options</td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-gray-300 rounded-full mx-auto"></div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  Not sure which to choose?
                </h3>
                <p className="text-blue-700 mb-6 leading-relaxed">
                  We recommend starting with the <strong>Financial Illustration</strong> for comprehensive 
                  insights into how your reverse mortgage will perform over time. You can always 
                  switch to the quick estimate if you prefer a simpler approach.
                </p>
                <Button 
                  onClick={() => setCalculatorType('advanced')}
                  variant="secondary"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                >
                  Start with Financial Illustration
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </main>
  )
}