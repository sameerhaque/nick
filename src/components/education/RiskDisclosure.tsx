'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { AlertTriangle, Info, TrendingDown, Clock, DollarSign, Home, Scale } from 'lucide-react'

const risks = [
  {
    id: 'compound-interest',
    title: 'Interest Compounds Over Time',
    description: 'Interest on your reverse mortgage compounds monthly, meaning you will owe more money over time.',
    icon: TrendingDown,
    severity: 'high',
    example: 'If you borrow $100,000 at 6% interest, after 10 years you would owe approximately $181,000.',
    mitigation: 'Consider making voluntary payments to reduce interest accumulation.'
  },
  {
    id: 'reduced-equity',
    title: 'Reduced Home Equity',
    description: 'As interest compounds, your home equity decreases, leaving less value for you or your heirs.',
    icon: Home,
    severity: 'high',
    example: 'A $400,000 home with a $150,000 reverse mortgage balance leaves $250,000 in equity, which decreases as interest accrues.',
    mitigation: 'Monitor your loan balance and consider downsizing if equity becomes too low.'
  },
  {
    id: 'outlive-proceeds',
    title: 'Risk of Outliving Proceeds',
    description: 'If you choose monthly payments, you may outlive the payment period or exhaust your available credit.',
    icon: Clock,
    severity: 'medium',
    example: 'Monthly payments of $1,500 from a $200,000 limit would last about 11 years without interest.',
    mitigation: 'Choose a tenure payment option or maintain a line of credit for emergencies.'
  },
  {
    id: 'foreclosure-risk',
    title: 'Foreclosure Risk',
    description: 'Failure to pay property taxes, insurance, or maintain the property can result in foreclosure.',
    icon: AlertTriangle,
    severity: 'high',
    example: 'Missing property tax payments for 2+ years can trigger foreclosure even with no mortgage payments.',
    mitigation: 'Set up automatic payments for taxes and insurance, maintain regular property upkeep.'
  },
  {
    id: 'rising-costs',
    title: 'Rising Property Costs',
    description: 'Property taxes, insurance, and maintenance costs typically increase over time.',
    icon: DollarSign,
    severity: 'medium',
    example: 'Property taxes may increase 3-5% annually, insurance costs can rise dramatically due to climate events.',
    mitigation: 'Budget for increasing costs and consider a property tax escrow account.'
  },
  {
    id: 'heirs-impact',
    title: 'Impact on Heirs',
    description: 'Your heirs will inherit less value and must repay the loan or sell the home.',
    icon: Scale,
    severity: 'medium',
    example: 'If loan balance exceeds home value, heirs can deed the property to the lender with no additional obligation.',
    mitigation: 'Discuss plans with family and consider life insurance to offset the loan balance.'
  }
]

export function RiskDisclosure() {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Important Risk Information</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Understand the Risks
          </h2>
          <p className="text-xl text-gray-600">
            While reverse mortgages can provide valuable financial flexibility, it's important to understand 
            the potential risks and costs involved. This information is required by law.
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {risks.map((risk, index) => {
            const Icon = risk.icon
            const isExpanded = expandedRisk === risk.id
            
            return (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 ${getSeverityColor(risk.severity)} border-2`}>
                  <button
                    onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold mb-2">{risk.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                              risk.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">
                              {isExpanded ? 'Click to collapse' : 'Click to expand'}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {risk.description}
                        </p>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-current border-opacity-20"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Example
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {risk.example}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Scale className="w-4 h-4" />
                            Mitigation Strategy
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {risk.mitigation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-blue-900 mb-4">Required Counseling</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              Before obtaining a reverse mortgage, you must receive counseling from a HUD-approved 
              counseling agency. This free service helps ensure you understand all aspects of the loan.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}