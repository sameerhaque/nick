'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { Check, X, TrendingUp, Home } from 'lucide-react'


const alternatives = [
  {
    title: 'Reverse Mortgage',
    description: 'Convert up to 55% of your home equity into cash while staying in your home',
    icon: Home,
    realExample: {
      homeValue: '$1.8M',
      potentialAccess: '~$850K',
      monthlyOption: '$1,200/month'
    },
    pros: [
      'No monthly payments required',
      'Access up to $850K+ on $1.8M home',
      'Choose lump sum, monthly, or as-needed payments',
      'Remain homeowner for life',
      'No income requirements',
      'Provincially-regulated protection'
    ],
    cons: [
      'Interest compounds over time',
      'Reduces available equity',
      'Age 55+ requirement',
      'Ongoing property obligations'
    ],
    bestFor: 'Seniors who want to stay in their home and need a cushion against rising living costs'
  },
  {
    title: 'Home Equity Line of Credit (HELOC)',
    description: 'A revolving credit line secured by your home equity',
    icon: TrendingUp,
    realExample: {
      homeValue: '$1.8M',
      potentialAccess: '~$900K',
      monthlyOption: 'Variable payments required'
    },
    pros: [
      'Draw funds as needed',
      'Interest only on amount used',
      'No age requirements',
      'Potentially lower initial rates'
    ],
    cons: [
      'Monthly payments required',
      'Income verification needed',
      'Variable interest rates',
      'Credit approval required',
      'Payment obligations regardless of income'
    ],
    bestFor: 'Homeowners with steady income who need flexible access and can handle monthly payments'
  }
]

export function ComparisonSection() {

  return (
    <Section className="bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Compare Your Options
          </h2>
          <p className="text-xl text-gray-600">
            Understanding how reverse mortgages compare to other financial options 
            helps you make an informed decision that&apos;s right for your situation.
          </p>
        </motion.div>


        {/* Alternative Options Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Detailed Option Comparison</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {alternatives.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                      <h4 className="text-xl font-bold">{option.title}</h4>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{option.description}</p>
                    
                    {/* Real World Example */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h5 className="font-semibold text-blue-800 mb-3">Real Example:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Home Value:</span>
                          <span className="font-semibold text-blue-900">{option.realExample.homeValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Potential Access:</span>
                          <span className="font-semibold text-blue-900">{option.realExample.potentialAccess}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Payment Option:</span>
                          <span className="font-semibold text-blue-900">{option.realExample.monthlyOption}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-green-800 mb-3">Advantages</h5>
                        <ul className="space-y-2">
                          {option.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-red-800 mb-3">Disadvantages</h5>
                        <ul className="space-y-2">
                          {option.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">Best For:</h5>
                        <p className="text-sm text-blue-700">{option.bestFor}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-lg p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Need Help Deciding?</h3>
          <p className="text-gray-600 mb-6">
            Our licensed professionals can help you understand which option might be best for your unique situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.chipadvisor.ca/financial-illustration-calculator/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Our Calculator
            </a>
            <a
              href="tel:416-573-2641"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Speak with an Expert
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}