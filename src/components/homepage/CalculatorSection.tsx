'use client'

import { motion } from 'framer-motion'
import { Container, Section, Button } from '@/components/ui'
import { Calculator, ArrowRight, TrendingUp, Shield, Home } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Access Tax-Free Cash',
    description: 'Convert your home equity into cash without monthly payments'
  },
  {
    icon: Shield,
    title: 'Keep Your Home',
    description: 'Maintain full ownership and control of your property'
  },
  {
    icon: Home,
    title: 'Age in Place',
    description: 'Stay in the home you love throughout retirement'
  }
]

export function CalculatorSection() {
  return (
    <Section className="bg-gradient-to-br from-primary-50 to-secondary-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Calculator className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Free Calculator</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 lg:mb-6">
            Discover Your Home&apos;s Hidden Value
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-10 max-w-2xl mx-auto">
            Find out how much you could receive from a reverse mortgage in just a few minutes. 
            No commitment, no personal information required.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-6 border border-white/20"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary-100 rounded-lg lg:rounded-xl flex items-center justify-center mb-3 lg:mb-4 mx-auto">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />
                  </div>
                  <h3 className="text-sm lg:text-base font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center"
          >
            <Button 
              size="lg" 
              href="/calculator"
              className="group bg-primary-600 text-white hover:bg-primary-700 border-2 border-primary-600 shadow-lg"
            >
              Calculate Your Amount
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              href="#how-it-works"
              className="bg-white/20 hover:bg-white/30 border-white/30"
            >
              Learn How It Works
            </Button>
          </motion.div>

          <div className="mt-8 text-sm text-gray-500">
            <p>✓ No obligation • ✓ Instant results • ✓ Completely confidential</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}