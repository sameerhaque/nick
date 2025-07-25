'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from '@/components/ui'
import { 
  GraduationCap, 
  Stethoscope, 
  Wrench, 
  Plane,
  Coins,
  ArrowRight,
  Quote
} from 'lucide-react'

const lifeScenarios = [
  {
    id: 'healthcare',
    persona: 'Margaret S.',
    age: 68,
    location: 'Toronto, ON',
    scenario: 'Healthcare Security',
    challenge: 'Rising dental and prescription costs',
    story: "Margaret's dental work and prescriptions were straining her budget. With her reverse mortgage, she can afford the care she needs while staying in her Beaches home.",
    icon: Stethoscope,
    amount: '$2,300',
    outcome: 'Covers all health expenses + emergency fund',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'family',
    persona: 'Robert & Linda M.',
    age: 72,
    location: 'Ottawa, ON',
    scenario: 'Family Support',
    challenge: 'Grandchildren university tuition',
    story: "Their granddaughter Emma is studying medicine at U of T. Robert and Linda can now help with tuition while staying in their family home.",
    icon: GraduationCap,
    amount: '$3,100',
    outcome: 'Supporting education while maintaining independence',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'home',
    persona: 'James R.',
    age: 75,
    location: 'Hamilton, ON',
    scenario: 'Home Improvements',
    challenge: 'Needed roof repairs and accessibility updates',
    story: "James installed grab bars, fixed the roof, and added a walk-in shower. His home of 40 years is now perfect for aging in place.",
    icon: Wrench,
    amount: '$2,100',
    outcome: 'Safe, comfortable home for the long term',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'freedom',
    persona: 'Dorothy K.',
    age: 69,
    location: 'London, ON',
    scenario: 'Retirement Dreams',
    challenge: 'Always wanted to travel Canada',
    story: "Dorothy finally took that Maritime provinces tour and visits her son in Vancouver every holiday. Her home funds her Canadian adventures.",
    icon: Plane,
    amount: '$2,700',
    outcome: 'Living retirement dreams without financial stress',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
]

export function Benefits() {
  return (
    <Section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 mb-6 border border-primary-100">
            <Coins className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Real Impact Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900">
            When Equity Becomes Freedom
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Every home tells a story. Here&apos;s how Ontario families are writing theirs with financial confidence.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            {lifeScenarios.map((scenario, index) => {
              const Icon = scenario.icon
              
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-3xl overflow-hidden h-full shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300 group-hover:border-primary-200">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={scenario.image}
                        alt={`${scenario.persona} - ${scenario.scenario}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                          <span className="text-lg font-bold text-green-600">{scenario.amount}</span>
                          <span className="text-xs text-neutral-600 ml-1">monthly</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1">{scenario.persona}</h3>
                          <p className="text-neutral-500 text-sm">Age {scenario.age} • {scenario.location}</p>
                          <div className="text-xs text-primary-600 font-medium mt-1 uppercase tracking-wide">
                            {scenario.scenario}
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-xl p-4 mb-6 border-l-4 border-amber-400">
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold text-amber-700">Challenge: </span>
                          {scenario.challenge}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 relative">
                        <Quote className="absolute top-3 left-3 w-5 h-5 text-blue-300" />
                        <p className="text-neutral-700 leading-relaxed italic pl-6 text-lg">
                          {scenario.story}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-semibold text-green-800 text-sm mb-1">Success Story</p>
                            <p className="text-green-700 text-sm leading-relaxed">{scenario.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-10 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Ready to Transform Your Story?
                </h3>
                <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of Ontario families who&apos;ve unlocked their home&apos;s potential 
                  for a more secure, fulfilling retirement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:(416) 555-7378"
                    className="inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Call (416) 555-7378
                  </a>
                  <a 
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                  >
                    Calculate Your Amount
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-sm text-neutral-400 mt-6">
                  Free consultation • No obligation • Licensed professionals
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}