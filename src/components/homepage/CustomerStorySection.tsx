'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { DollarSign, Home, Heart, TrendingUp } from 'lucide-react'

const customerStory = {
  name: "Sarah M.", 
  age: 72,
  location: "Ontario",
  yearInHome: 35,
  homeValue: "$1.8M",
  monthlyIncome: "$2,100",
  challenge: "Rising living costs were outpacing her fixed pension income, making it difficult to afford home maintenance and unexpected expenses.",
  solution: {
    accessAmount: "$850,000",
    paymentChoice: "Flexible monthly payments of $1,200",
    benefits: [
      "No monthly mortgage payments",
      "Stayed in her beloved family home", 
      "Created emergency fund for healthcare",
      "Maintained financial independence"
    ]
  },
  quote: "I never imagined I could access this much equity while staying in my home. The flexibility to choose how I receive payments has given me complete peace of mind.",
  outcome: "Reduced financial stress while preserving her independence and family inheritance through property appreciation."
}

export function CustomerStorySection() {
  return (
    <Section className="bg-gradient-to-br from-blue-50 to-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Real Story: A Cushion Against Rising Costs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Sarah used a reverse mortgage to maintain her independence while 
              addressing the financial challenges of rising living costs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Customer Profile */}
              <Card className="p-6 bg-white border-l-4 border-l-blue-600">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <Home className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{customerStory.name}</h3>
                    <p className="text-gray-600">Age {customerStory.age} • {customerStory.location}</p>
                    <p className="text-sm text-gray-500">{customerStory.yearInHome} years in her home</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Home Value</div>
                    <div className="text-lg font-bold text-gray-900">{customerStory.homeValue}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
                    <div className="text-lg font-bold text-gray-900">{customerStory.monthlyIncome}</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">The Challenge:</h4>
                  <p className="text-amber-700">{customerStory.challenge}</p>
                </div>
              </Card>

              {/* Solution */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">The Solution</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Total Access Amount</div>
                      <div className="text-2xl font-bold text-green-600">{customerStory.solution.accessAmount}</div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Payment Choice</div>
                    <div className="text-lg font-semibold text-gray-900">{customerStory.solution.paymentChoice}</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {customerStory.solution.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right: Quote & Outcome */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Customer Quote */}
              <Card className="p-8 bg-white border-2 border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Testimonial</h3>
                </div>

                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{customerStory.quote}&rdquo;
                </blockquote>

                <div className="text-center">
                  <div className="font-semibold text-gray-900">{customerStory.name}</div>
                  <div className="text-sm text-gray-600">Reverse Mortgage Client</div>
                </div>
              </Card>

              {/* Outcome */}
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  The Outcome
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {customerStory.outcome}
                </p>
              </Card>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-white">
                  <div className="text-2xl font-bold text-green-600 mb-1">$850K</div>
                  <div className="text-sm text-gray-600">Equity Accessed</div>
                </Card>
                <Card className="p-4 text-center bg-white">
                  <div className="text-2xl font-bold text-blue-600 mb-1">$0</div>
                  <div className="text-sm text-gray-600">Monthly Payments</div>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Could This Work for You?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every situation is unique. Our licensed professionals can help you understand 
              if a reverse mortgage could provide similar benefits for your circumstances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Calculate Your Potential
              </a>
              <a
                href="tel:(416) 555-7378"
                className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Speak with an Expert
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}