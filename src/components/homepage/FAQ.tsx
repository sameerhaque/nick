'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { MessageCircle, Phone, Coffee, Heart, CheckCircle, ArrowRight, User } from 'lucide-react'

// Conversational FAQ with natural dialogue
const conversationTopics = [
  {
    id: 'getting-started',
    topic: "I'm curious, but not sure where to start...",
    icon: MessageCircle,
    mood: 'curious',
    conversations: [
      {
        id: 'basics',
        question: "I honestly don't know much about reverse mortgages. Can you explain it like I'm talking to a neighbor?",
        answer: {
          tone: 'friendly',
          response: "Of course! Think of it this way - you've been making mortgage payments for decades, right? Well, with a reverse mortgage, it's like your house starts making payments to YOU instead. You still own your home, you can still live there as long as you want, but now your home helps with your monthly expenses. It's really that simple!"
        },
        followUp: "Thousands of your neighbors have done exactly this. You're definitely not alone in wondering about it."
      },
      {
        id: 'eligibility',
        question: "Am I even eligible? I'm 67 and still owe some money on my house.",
        answer: {
          tone: 'reassuring',
          response: "Great question! At 67, you absolutely qualify age-wise - in Ontario, you only need to be 55 or older. And yes, many people still have some mortgage balance left, that's totally normal. When you get a reverse mortgage, it pays off your existing mortgage first, then any remaining money comes to you. So you'd go from making monthly payments to receiving them instead!"
        },
        followUp: "The key is having enough equity in your home. We can figure that out together in just a few minutes on the phone."
      }
    ]
  },
  {
    id: 'concerns',
    topic: "I have some worries about this...",
    icon: Heart,
    mood: 'concerned',
    conversations: [
      {
        id: 'ownership',
        question: "Will I lose my house? What happens to my kids' inheritance?",
        answer: {
          tone: 'understanding',
          response: "I completely understand this concern - it's the #1 worry I hear from folks. Here's the truth: YOU keep ownership of your home. You can live there as long as you want. When you eventually pass away or decide to move, your kids have options. They can keep the house by paying off the loan balance, or sell it and keep any remaining equity. Many families actually end up with more inheritance because their parents lived more comfortably and didn't drain their savings."
        },
        followUp: "This is exactly why we encourage families to have these conversations together. Knowledge removes fear."
      },
      {
        id: 'complexity',
        question: "This seems complicated. I don't want to make a mistake at my age.",
        answer: {
          tone: 'supportive',
          response: "You know what? Your caution is actually wisdom. Any major financial decision should be thought through carefully. That's why there are built-in protections in Ontario - you're required to get independent legal advice, you have a 10-day cancellation period even after signing, and we'll explain everything as many times as you need. Take your time. Bring your kids or trusted friends to meetings. Ask every question that comes to mind."
        },
        followUp: "The fact that you're being careful tells me you'll make the right decision for your situation."
      }
    ]
  },
  {
    id: 'practical',
    topic: "How does this actually work?",
    icon: Coffee,
    mood: 'practical',
    conversations: [
      {
        id: 'payments',
        question: "How much money would I actually get each month?",
        answer: {
          tone: 'straightforward',
          response: "That depends on three main things: your age, your home's value, and current interest rates. The older you are and the more your home is worth, the more you can receive. Most of our Ontario clients get between $2,000 and $4,000 per month, but I've seen it range from $1,200 to over $5,000. The only way to know for sure is to run the numbers for your specific situation."
        },
        followUp: "I can give you a personalized estimate in about 10 minutes over the phone - no obligation, just information."
      },
      {
        id: 'timeline',
        question: "If I decide to do this, how long does it take?",
        answer: {
          tone: 'informative',
          response: "Usually about 4-8 weeks from start to finish in Ontario. Here's what happens: First, we talk and see if it makes sense (that's today if you want). Then you get independent legal advice (required in Ontario). Next comes the application, home appraisal, and underwriting. Finally, you sign papers and start receiving money. We guide you through each step."
        },
        followUp: "There's no rushing - you control the pace. Some people decide quickly, others take months to think it over."
      }
    ]
  }
]

export function FAQ() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)

  const toggleConversation = (conversationId: string) => {
    setActiveConversation(activeConversation === conversationId ? null : conversationId)
  }

  return (
    <Section className="py-24 bg-gradient-to-b from-blue-50 via-white to-neutral-50">
      <Container>
        {/* Conversational Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6 border border-blue-100">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Let's Have a Real Conversation</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900">
            Questions You're Actually Thinking
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Forget formal FAQs. Here are the real conversations we have with people just like you. 
            These are the questions that matter, answered the way you'd want to hear them.
          </p>
        </motion.div>

        {/* Conversation Topics */}
        <div className="max-w-5xl mx-auto space-y-12">
          {conversationTopics.map((topic, topicIndex) => {
            const Icon = topic.icon
            
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: topicIndex * 0.2 }}
                className="space-y-6"
              >
                {/* Topic Header */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-neutral-200">
                    <Icon className={`w-6 h-6 ${
                      topic.mood === 'curious' ? 'text-blue-600' :
                      topic.mood === 'concerned' ? 'text-amber-600' :
                      'text-green-600'
                    }`} />
                    <span className="text-lg font-medium text-neutral-800">
                      {topic.topic}
                    </span>
                  </div>
                </div>

                {/* Conversations */}
                <div className="space-y-6">
                  {topic.conversations.map((conversation, convIndex) => {
                    const conversationId = `${topic.id}-${conversation.id}`
                    const isOpen = activeConversation === conversationId
                    
                    return (
                      <div
                        key={conversation.id}
                        className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden"
                      >
                        {/* Question - Styled as user message */}
                        <button
                          onClick={() => toggleConversation(conversationId)}
                          className="w-full p-6 text-left hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50 transition-colors duration-200"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-neutral-100 rounded-2xl rounded-tl-sm p-4">
                                <p className="text-lg text-neutral-800 leading-relaxed">
                                  "{conversation.question}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        {/* Answer - Styled as advisor response */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">RH</span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-primary-50 rounded-2xl rounded-tl-sm p-4 border border-primary-100">
                                      <p className="text-lg text-neutral-800 leading-relaxed mb-4">
                                        {conversation.answer.response}
                                      </p>
                                      
                                      {conversation.followUp && (
                                        <div className="pt-3 border-t border-primary-200">
                                          <p className="text-primary-700 font-medium italic">
                                            {conversation.followUp}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Conversation Starter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 text-center border border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-serif font-bold text-neutral-900 mb-6">
              Ready for a Real Conversation?
            </h3>
            
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              These are just the starting points. Every situation is unique, and you probably have 
              questions we haven't covered here. Let's talk about YOUR specific situation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:(855) 555-7378"
                className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Let's Talk: (855) 555-7378
              </a>
              
              <a 
                href="/consultation"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold border border-green-200 transition-all duration-200"
              >
                Schedule a Conversation
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-neutral-600 mt-6">
              Free consultation • No obligation • Licensed professionals • Your questions answered honestly
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}