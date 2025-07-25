'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@/components/ui'
import { DollarSign, TrendingUp } from 'lucide-react'
import Image from 'next/image'

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
              Real Impact Stories: When Equity Becomes Freedom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Sarah transformed her home equity into financial independence, 
              creating a secure foundation for her golden years.
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
                  <Image 
                    src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                    alt="Confident senior woman at home, representing Sarah M. who found financial freedom through reverse mortgage"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 shadow-md"
                    priority={false}
                    unoptimized={false}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{customerStory.name}</h3>
                    <p className="text-gray-600">Age {customerStory.age} • {customerStory.location}</p>
                    <p className="text-sm text-gray-500">{customerStory.yearInHome} years in her home</p>
                  </div>
                </div>

                {/* Beautiful home image */}
                <div className="mb-6 relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Beautiful Canadian family home with mature landscaping, representing decades of memories and $1.8M value"
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                    priority={false}
                  />
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
                  <Image 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                    alt="Joyful senior woman with genuine smile, radiating confidence and satisfaction from financial security"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200 shadow-lg"
                  />
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

              {/* Financial Security Image */}
              <Card className="p-4 bg-white">
                <div className="relative mb-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1527788263495-3518893dcbb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                    alt="Senior woman enjoying coffee and reading peacefully at home, representing freedom and independence"
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-700">Freedom to Enjoy Life</div>
                  <div className="text-xs text-gray-500">When equity becomes independence</div>
                </div>
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