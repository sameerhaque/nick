'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Button } from '@/components/ui'
import { Plus, Minus, Home, DollarSign, Users, Shield } from 'lucide-react'

const faqs = [
  {
    question: 'What is a reverse mortgage?',
    answer: 'A reverse mortgage allows homeowners 55+ to convert part of their home equity into tax-free cash without monthly payments. You remain the owner of your home and can live in it for as long as you want.',
    icon: Home
  },
  {
    question: 'How much can I receive?',
    answer: 'The amount depends on your age, home value, and location. Generally, you can receive 20-55% of your home\'s value. The older you are, the more you may qualify for.',
    icon: DollarSign
  },
  {
    question: 'Do I have to make monthly payments?',
    answer: 'No! Unlike a traditional mortgage, you don\'t make monthly payments. The loan is repaid when you sell your home, move permanently, or pass away.',
    icon: Users
  },
  {
    question: 'Will I still own my home?',
    answer: 'Yes, you retain full ownership of your home. You can sell, renovate, or leave it to your heirs. You\'re responsible for property taxes, insurance, and maintenance.',
    icon: Shield
  }
]

const keyFeatures = [
  {
    title: 'No Monthly Payments',
    description: 'Unlike traditional loans, you don\'t need to make monthly payments'
  },
  {
    title: 'Tax-Free Cash',
    description: 'The money you receive is not considered taxable income'
  },
  {
    title: 'Stay in Your Home',
    description: 'Continue living in your home for as long as you want'
  },
  {
    title: 'Flexible Access',
    description: 'Choose lump sum, monthly income, or line of credit'
  }
]

export function WhatIsSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <Section id="what-is" className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            What is a Reverse Mortgage?
          </h2>
          <p className="text-xl text-gray-600">
            A financial solution that allows Canadian homeowners 55+ to unlock the value 
            in their home without selling or moving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">Key Benefits</h3>
            <div className="space-y-6">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold mb-2">Perfect for:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Supplementing retirement income</li>
                <li>• Eliminating existing mortgage payments</li>
                <li>• Funding home improvements</li>
                <li>• Covering healthcare costs</li>
                <li>• Helping family members financially</li>
              </ul>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const Icon = faq.icon
                const isOpen = openFAQ === index
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="font-semibold">{faq.question}</span>
                      </div>
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 leading-relaxed ml-13">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <Button href="https://www.chipadvisor.ca/financial-illustration-calculator/" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                Get Your Free Estimate
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}