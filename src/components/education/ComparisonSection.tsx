'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { Check, X, AlertTriangle, Info, TrendingUp, Home, DollarSign } from 'lucide-react'

const comparisonData = [
  {
    category: 'Monthly Payments',
    reversemortgage: { status: 'positive', text: 'No monthly payments required' },
    heloc: { status: 'negative', text: 'Monthly payments required' },
    selling: { status: 'positive', text: 'No ongoing payments' },
    traditional: { status: 'negative', text: 'Monthly payments required' }
  },
  {
    category: 'Home Ownership',
    reversemortgage: { status: 'positive', text: 'You remain the owner' },
    heloc: { status: 'positive', text: 'You remain the owner' },
    selling: { status: 'negative', text: 'You lose ownership' },
    traditional: { status: 'positive', text: 'You remain the owner' }
  },
  {
    category: 'Age Requirements',
    reversemortgage: { status: 'neutral', text: 'Must be 55+ years old' },
    heloc: { status: 'positive', text: 'No age requirements' },
    selling: { status: 'positive', text: 'No age requirements' },
    traditional: { status: 'positive', text: 'No age requirements' }
  },
  {
    category: 'Income Requirements',
    reversemortgage: { status: 'positive', text: 'No income requirements' },
    heloc: { status: 'negative', text: 'Income verification required' },
    selling: { status: 'positive', text: 'No income requirements' },
    traditional: { status: 'negative', text: 'Income verification required' }
  },
  {
    category: 'Interest Accrual',
    reversemortgage: { status: 'negative', text: 'Interest compounds monthly' },
    heloc: { status: 'neutral', text: 'Interest on amount used' },
    selling: { status: 'positive', text: 'No interest charges' },
    traditional: { status: 'negative', text: 'Interest on full amount' }
  },
  {
    category: 'Access to Funds',
    reversemortgage: { status: 'positive', text: 'Lump sum or monthly payments' },
    heloc: { status: 'positive', text: 'Draw as needed' },
    selling: { status: 'neutral', text: 'One-time lump sum' },
    traditional: { status: 'neutral', text: 'One-time lump sum' }
  },
  {
    category: 'Repayment Timeline',
    reversemortgage: { status: 'positive', text: 'No repayment while living at home' },
    heloc: { status: 'negative', text: 'Repayment required during draw/term period' },
    selling: { status: 'positive', text: 'No repayment required' },
    traditional: { status: 'negative', text: 'Fixed repayment schedule' }
  },
  {
    category: 'Impact on Heirs',
    reversemortgage: { status: 'negative', text: 'Reduces inheritance' },
    heloc: { status: 'negative', text: 'Reduces inheritance' },
    selling: { status: 'neutral', text: 'Immediate impact on inheritance' },
    traditional: { status: 'negative', text: 'Reduces inheritance' }
  }
]

const alternatives = [
  {
    title: 'Reverse Mortgage',
    description: 'Allows you to convert home equity into cash while remaining in your home',
    icon: Home,
    pros: [
      'No monthly payments',
      'Remain in your home',
      'No income requirements',
      'Provincially-regulated options'
    ],
    cons: [
      'Interest compounds over time',
      'Reduces home equity',
      'Age 55+ requirement',
      'Ongoing property obligations'
    ],
    bestFor: 'Seniors who want to stay in their home and need additional income'
  },
  {
    title: 'Home Equity Line of Credit (HELOC)',
    description: 'A revolving credit line secured by your home equity',
    icon: TrendingUp,
    pros: [
      'Draw funds as needed',
      'Interest only on amount used',
      'No age requirements',
      'Potentially lower interest rates'
    ],
    cons: [
      'Monthly payments required',
      'Income verification needed',
      'Variable interest rates',
      'Credit approval required'
    ],
    bestFor: 'Homeowners with steady income who need flexible access to funds'
  },
  {
    title: 'Selling Your Home',
    description: 'Sell your current home and downsize or rent',
    icon: DollarSign,
    pros: [
      'Access to full equity',
      'No ongoing mortgage payments',
      'No interest charges',
      'Complete financial freedom'
    ],
    cons: [
      'Must leave your home',
      'Moving costs and stress',
      'May lose community connections',
      'Rental or downsizing costs'
    ],
    bestFor: 'Homeowners ready to relocate and access maximum equity'
  }
]

export function ComparisonSection() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive':
        return <Check className="w-5 h-5 text-green-600" />
      case 'negative':
        return <X className="w-5 h-5 text-red-600" />
      case 'neutral':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'bg-green-50 text-green-800'
      case 'negative':
        return 'bg-red-50 text-red-800'
      case 'neutral':
        return 'bg-amber-50 text-amber-800'
      default:
        return 'bg-gray-50 text-gray-800'
    }
  }

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

        {/* Comparison Table */}
        <div className="mb-20">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-4 px-6 font-semibold">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold">Reverse Mortgage</th>
                    <th className="text-center py-4 px-6 font-semibold">HELOC</th>
                    <th className="text-center py-4 px-6 font-semibold">Selling Home</th>
                    <th className="text-center py-4 px-6 font-semibold">Traditional Loan</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium">{row.category}</td>
                      <td className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(row.reversemortgage.status)}`}>
                          {getStatusIcon(row.reversemortgage.status)}
                          <span>{row.reversemortgage.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(row.heloc.status)}`}>
                          {getStatusIcon(row.heloc.status)}
                          <span>{row.heloc.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(row.selling.status)}`}>
                          {getStatusIcon(row.selling.status)}
                          <span>{row.selling.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(row.traditional.status)}`}>
                          {getStatusIcon(row.traditional.status)}
                          <span>{row.traditional.text}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alternative Options Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Detailed Option Comparison</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
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
              href="/calculator"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Our Calculator
            </a>
            <a
              href="tel:(416) 555-7378"
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