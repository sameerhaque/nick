'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Info, Shield, X } from 'lucide-react'

interface ComplianceDisclaimerProps {
  type: 'calculator' | 'general' | 'marketing' | 'educational'
  placement: 'modal' | 'inline' | 'footer'
  showRisks?: boolean
}

const disclaimerContent = {
  calculator: {
    title: "Calculator Estimate Disclaimer",
    icon: AlertTriangle,
    content: [
      "This calculator provides estimates only and is not a commitment to lend.",
      "Your actual loan amount will depend on a professional appraisal, credit evaluation, and underwriting review.",
      "Interest rates and fees are not included in this estimate and will significantly impact your total costs.",
      "Reverse mortgages accrue interest over time, which compounds and reduces your home equity.",
      "You must continue to pay property taxes, insurance, and maintain the property.",
      "Failure to meet loan obligations may result in foreclosure.",
      "This is not financial advice. Consult with a licensed financial advisor."
    ],
    risks: [
      "You will owe more money over time as interest compounds",
      "Your home equity will decrease over time",
      "You may not have enough equity left for future needs",
      "Property taxes and insurance costs may increase",
      "You may outlive your proceeds if taking monthly payments"
    ]
  },
  general: {
    title: "Important Legal Disclaimers",
    icon: Shield,
    content: [
      "This material is for informational purposes only and is not an offer to lend.",
      "All loan programs are subject to credit approval and property appraisal.",
      "Interest rates and program terms are subject to change without notice.",
      "Consult with a qualified professional before making financial decisions.",
      "Licensed by the Financial Services Regulatory Authority (FSRA).",
      "All borrowers must receive independent counseling before closing."
    ],
    risks: []
  },
  marketing: {
    title: "Marketing Disclaimer",
    icon: Info,
    content: [
      "This advertisement is not from a government agency.",
      "Loan approval is subject to credit, property, and title review.",
      "Some clients may not qualify for all programs.",
      "Interest rates shown are examples and may not reflect current rates.",
      "Costs and fees apply to all loans.",
      "Licensed mortgage broker/lender."
    ],
    risks: []
  },
  educational: {
    title: "Educational Content Notice",
    icon: Info,
    content: [
      "This content is for educational purposes only.",
      "Individual results may vary based on personal circumstances.",
      "This is not personalized financial advice.",
      "Consult with licensed professionals for your specific situation.",
      "All examples are hypothetical and for illustration only."
    ],
    risks: []
  }
}

export function ComplianceDisclaimer({ type, placement, showRisks = false }: ComplianceDisclaimerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(placement === 'modal')
  
  const disclaimer = disclaimerContent[type]
  const Icon = disclaimer.icon

  if (!isVisible && placement === 'modal') return null

  const content = (
    <div className={`
      ${placement === 'modal' ? 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4' : ''}
      ${placement === 'inline' ? 'w-full' : ''}
      ${placement === 'footer' ? 'w-full border-t border-gray-200 bg-gray-50' : ''}
    `}>
      <div className={`
        ${placement === 'modal' ? 'bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto' : ''}
        ${placement === 'inline' ? 'bg-amber-50 border border-amber-200 rounded-lg' : ''}
        ${placement === 'footer' ? 'bg-gray-50' : ''}
        p-6
      `}>
        <div className="flex items-start gap-3">
          <Icon className={`
            w-5 h-5 mt-1 flex-shrink-0
            ${type === 'calculator' ? 'text-amber-600' : 'text-blue-600'}
          `} />
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-3">{disclaimer.title}</h3>
            
            <div className="space-y-2 text-sm text-gray-700">
              {disclaimer.content.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {showRisks && disclaimer.risks.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Important Risks to Consider
                  <span className="text-xs">({isExpanded ? 'hide' : 'show'})</span>
                </button>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="space-y-2 text-sm text-red-800">
                      {disclaimer.risks.map((risk, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {placement === 'modal' && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {placement === 'modal' && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              I Understand
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return content
}

// Compliance wrapper component
export function ComplianceWrapper({ children, requiresDisclaimer = false }: { 
  children: React.ReactNode
  requiresDisclaimer?: boolean 
}) {
  const [hasAccepted, setHasAccepted] = useState(!requiresDisclaimer)

  if (!hasAccepted) {
    return (
      <div className="relative">
        <div className="opacity-25 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl border max-w-2xl w-full mx-auto"
               style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <ComplianceDisclaimer 
              type="calculator" 
              placement="inline" 
              showRisks={true}
            />
            <button
              onClick={() => setHasAccepted(true)}
              className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              I Understand and Accept
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}