'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { UserCheck, BookOpen, DollarSign, ArrowRight } from 'lucide-react'
import { homepageContent } from '@/data/homepage-content'

const { howItWorks } = homepageContent

// Icon mapping for dynamic rendering
const iconMap = {
  UserCheck,
  BookOpen,
  DollarSign
}

export function HowItWorks() {
  return (
    <Section className="py-24 bg-neutral-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            {howItWorks.title}
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            A straightforward process designed with your comfort and security in mind.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {howItWorks.steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connection line */}
                  {index < howItWorks.steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-neutral-300 z-0" 
                         style={{ transform: 'translateX(-50%)' }} />
                  )}
                  
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 relative z-10 text-center">
                    {/* Step number and icon */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{step.number}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-neutral-900">{step.title}</h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">{step.description}</p>
                    
                    {/* Timeline */}
                    <div className="inline-flex items-center gap-2 bg-neutral-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      <span className="text-sm font-medium text-neutral-700">
                        {index === 0 ? '1-2 days' : index === 1 ? '2-3 weeks' : 'Same day'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Ready to Get Started?</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Take the first step with a free, no-obligation consultation. 
                We'll answer your questions and see if this makes sense for your situation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:(855) 555-7378"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Call (855) 555-7378
                </a>
                <a 
                  href="/free-kit"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-primary-600 border border-primary-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Get Free Kit
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Important note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-sm text-neutral-500 leading-relaxed">
            <strong>Important:</strong> {howItWorks.disclaimer}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}