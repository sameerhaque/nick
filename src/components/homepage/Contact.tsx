'use client'

import { motion } from 'framer-motion'
import { Container, Section, Button } from '@/components/ui'
import { Phone, Mail, Calendar, CheckCircle, Calculator } from 'lucide-react'
import { homepageContent } from '@/data/homepage-content'

const { contact } = homepageContent

// Icon mapping for dynamic rendering
const iconMap = {
  Phone,
  Mail,
  Calendar,
  Calculator
}

export function Contact() {
  return (
    <Section id="contact" className="bg-gradient-to-br from-primary-900 to-primary-700 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {contact.title}
          </h2>
          <p className="text-xl text-primary-100">
            {contact.subtitle}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main phone number - very prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <a 
              href={`tel:${contact.phoneNumber.replace(/\D/g, '')}`}
              className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold">{contact.phoneNumber}</div>
                  <div className="text-sm opacity-90">{contact.phoneHours}</div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Contact options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contact.options.map((option, index) => {
              const Icon = iconMap[option.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/20 ${
                    option.primary ? 'border-2 border-secondary-400' : 'border border-white/20'
                  }`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-primary-100 mb-6">{option.description}</p>
                    
                    <Button
                      variant={option.primary ? "secondary" : "ghost"}
                      size="md"
                      className={option.primary ? "" : "text-white border-white/20 hover:bg-white/10"}
                    >
                      {option.action}
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contact.guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center gap-3 text-primary-100">
                <CheckCircle className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <span className="text-sm">{guarantee}</span>
              </div>
            ))}
          </motion.div>

          {/* Additional trust messaging */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12 max-w-2xl mx-auto"
          >
            <p className="text-primary-200 text-sm leading-relaxed">
              All consultations are provided by licensed mortgage professionals. 
              We are committed to helping you understand all your options with no pressure to proceed.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}