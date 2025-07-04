'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { TrendingUp, Home, Calculator, Scale } from 'lucide-react'
import { partnersContent } from '@/data/partners-content'

const { partnerTypes } = partnersContent

// Icon mapping for dynamic icon rendering
const iconMap = {
  TrendingUp,
  Home,
  Calculator,
  Scale
}

export function PartnerTypes() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {partnerTypes.title}
          </h2>
          <p className="text-xl text-neutral-600">
            {partnerTypes.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerTypes.items.map((type, index) => {
            const Icon = iconMap[type.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`${type.bgColor} ${type.borderColor} border-2 rounded-xl p-8 text-center h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                  <div className={`${type.bgColor} rounded-full p-4 inline-flex mb-6`}>
                    <Icon className={`w-8 h-8 ${type.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                  <p className="text-neutral-600">{type.description}</p>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-neutral-600 mb-4">
            {partnerTypes.footer.title}
          </p>
          <p className="text-neutral-500">
            {partnerTypes.footer.subtitle}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}