'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { partnersContent } from '@/data/partners-content'

const { testimonials } = partnersContent

export function PartnerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.items.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length)
  }

  return (
    <Section background="gray">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {testimonials.title}
          </h2>
          <p className="text-xl text-neutral-600">
            {testimonials.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Carousel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
              >
                <Quote className="w-12 h-12 text-primary-200 mb-6" />
                
                <p className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed">
                  &ldquo;{testimonials.items[currentIndex].quote}&rdquo;
                </p>

                <div className="flex items-center">
                  <div className="w-16 h-16 bg-neutral-200 rounded-full mr-4" />
                  <div>
                    <div className="font-bold text-lg">{testimonials.items[currentIndex].author}</div>
                    <div className="text-neutral-600">{testimonials.items[currentIndex].title}</div>
                    <div className="text-neutral-500 text-sm">{testimonials.items[currentIndex].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-neutral-600" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-600'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}