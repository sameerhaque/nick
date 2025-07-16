'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { Send, Headphones, DollarSign } from 'lucide-react'

const steps = [
  {
    icon: Send,
    title: 'Submit a Lead',
    description: 'Use our simple online form to refer qualified clients in minutes.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Headphones,
    title: 'We Handle the Rest',
    description: 'Our expert team provides world-class service and guides your client through the entire process.',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
  {
    icon: DollarSign,
    title: 'Get Rewarded',
    description: 'Earn up to $450 referral fee for every successful reverse mortgage referral on mortgages $200k or more.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600">
            Partner with us in three simple steps and start earning referral income immediately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-neutral-300" />
          
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-flex mb-6">
                    <div className={`${step.bgColor} rounded-full p-6 relative z-10`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-neutral-300 flex items-center justify-center text-sm font-bold text-neutral-700">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-neutral-600 max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            No quotas, no pressure, no complicated contracts. Just a simple partnership 
            that benefits everyone—you, your clients, and our team.
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}