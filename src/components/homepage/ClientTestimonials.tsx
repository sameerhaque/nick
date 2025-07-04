'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { Star, Phone, ArrowRight } from 'lucide-react'

const colorMappings = {
  rose: {
    borderAvatar: 'border-rose-200'
  },
  blue: {
    borderAvatar: 'border-blue-200'
  },
  green: {
    borderAvatar: 'border-green-200'
  }
} as const

const testimonials = [
  {
    id: 'helen',
    name: 'Helen R.',
    age: 73,
    location: 'Mississauga, ON',
    quote: "Now I sleep peacefully knowing I can stay in the home where I raised my children. I even started volunteering at the local library again!",
    impact: "$2,500/month",
    accentColor: 'rose' as const,
    image: 'https://images.unsplash.com/photo-1594824388574-75c802da5cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'frank',
    name: 'Frank & Susan M.',
    age: 69,
    location: 'Kingston, ON',
    quote: "We bought a new trailer and have visited every Canadian national park! Frank is healthier than ever, and we&apos;re living the retirement we always dreamed of.",
    impact: "$3,650/month",
    accentColor: 'blue' as const,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'maria',
    name: 'Maria G.',
    age: 71,
    location: 'Windsor, ON',
    quote: "Miguel graduated debt-free and is now a resident at Toronto General! He calls me his &apos;guardian angel,&apos; but really, my home was the angel.",
    impact: "$2,800/month",
    accentColor: 'green' as const,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
  }
]

export function ClientTestimonials() {
  return (
    <Section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 mb-6 border border-primary-100">
            <Star className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Trusted by Thousands</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900">
            Stories of Financial Freedom
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Real families, real results. See how reverse mortgages have transformed retirement for Ontario seniors.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name}, satisfied client`}
                  className={`w-14 h-14 rounded-full object-cover shadow-md border-4 ${colorMappings[testimonial.accentColor].borderAvatar}`}
                />
                <div>
                  <h3 className="font-serif font-bold text-neutral-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    Age {testimonial.age} • {testimonial.location}
                  </p>
                </div>
              </div>

              <blockquote className="text-neutral-700 leading-relaxed text-lg mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Monthly Support</span>
                  <span className="text-2xl font-bold text-green-600">{testimonial.impact}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-10 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Join the Conversation
              </h3>
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to discover how your home equity can enhance your retirement? 
                Let&apos;s start with a free, no-obligation conversation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:(416) 555-7378"
                  className="inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  Call (416) 555-7378
                </a>
                
                <a 
                  href="/free-kit"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Get Free Information Kit
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <p className="text-sm text-neutral-400 mt-6">
                Licensed professionals • BBB A+ rated • Free consultation
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}