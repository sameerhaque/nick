'use client'

import { motion } from 'framer-motion'
import { Button, Container, Section } from '@/components/ui'
import { ArrowRight, Users } from 'lucide-react'

export function PartnerHero() {
  return (
    <Section 
      padding="large" 
      className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">500+ Active Partners</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Become a Reverse Mortgage<br />Referral Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Help your clients access home equity while earning substantial referral income. 
            Join our network of trusted professionals.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="secondary" 
              size="lg"
              href="#lead-form"
              className="group"
            >
              Get Partner Details
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              href="#how-it-works"
              className="text-white hover:bg-white/10"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">$500+</div>
              <div className="text-primary-100">Per Referral</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">48hr</div>
              <div className="text-primary-100">Lead Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">100%</div>
              <div className="text-primary-100">Commission Guarantee</div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}