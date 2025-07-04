'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { DollarSign, BookOpen, HeadphonesIcon, Megaphone } from 'lucide-react'
import { partnersContent } from '@/data/partners-content'

const { incentives } = partnersContent

// Icon mapping for dynamic icon rendering
const iconMap = {
  BookOpen,
  HeadphonesIcon,
  Megaphone
}

export function IncentiveSection() {
  return (
    <Section background="primary-light" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-300 rounded-full opacity-20 blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            {incentives.title}
          </h2>
          
          {/* Main Incentive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-secondary-200">
              <DollarSign className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-bold text-secondary-600 mb-2">
                {incentives.mainIncentive.amount}
              </div>
              <div className="text-xl text-neutral-700 font-medium mb-4">
                {incentives.mainIncentive.description}
              </div>
              <div className="text-neutral-600">
                {incentives.mainIncentive.subtitle}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {incentives.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-neutral-700 font-medium">
            {incentives.cta.text}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}