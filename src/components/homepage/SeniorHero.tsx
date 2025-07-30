'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button, Container, Section } from '@/components/ui'
import { Phone, ArrowRight, CheckCircle } from 'lucide-react'
import { homepageContent } from '@/data/homepage-content'

const { hero } = homepageContent

export function SeniorHero() {
  return (
    <Section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-neutral-50 to-white" padding="none">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
          alt="Beautiful modern family home with well-maintained garden"
          fill
          className="object-cover opacity-10"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/50" />
      </div>

      <Container className="relative z-10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Main Content */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 lg:space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[0.9] tracking-tight">
                  Your home.
                  <br />
                  <span className="text-primary-600">Your equity.</span>
                  <br />
                  Your future.
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed">
                  A flexible cushion against rising living costs. Access the wealth you&apos;ve built in your home while continuing to live in it. 
                  No monthly payments. No moving. Just financial freedom.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <a 
                  href={`tel:${hero.phoneNumber.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  {hero.phoneNumber}
                </a>
                
                <Button 
                  href={hero.ctaPrimary.href}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2"
                >
                  {hero.ctaPrimary.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Trust indicators - clean and minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 lg:gap-6 pt-4"
              >
                {hero.trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-neutral-600 font-medium">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Hero Image & Stats */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
                  <Image 
                    src="/images/hero_image.jpg"
                    alt="Multi-generational family gathered together on porch"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay with stats */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {hero.stats.map((stat, index) => (
                          <div key={index}>
                            <div className="text-2xl font-bold text-primary-600 mb-1">
                              {stat.number}
                            </div>
                            <div className="text-xs text-neutral-600 font-medium leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured testimonial with photo */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-neutral-900">Sarah M.</div>
                        <div className="text-sm text-neutral-600">Age 72 • Ontario</div>
                      </div>
                    </div>
                    
                    <blockquote className="text-neutral-700 leading-relaxed">
                      &ldquo;I can finally afford the home repairs and still have money for my grandchildren. 
                      Best financial decision I&apos;ve made.&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm" />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-green-600">$2,350/month</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer - clean and unobtrusive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20 pt-6 lg:pt-8 border-t border-neutral-200"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-neutral-500 leading-relaxed">
              <strong>Important:</strong> This material has not been reviewed by OSFI or FSRA. 
              Consult with an independent licensed financial counselor before proceeding. 
              <a href="#disclosures" className="text-primary-600 hover:text-primary-700 underline">
                View disclosures
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}