import { Metadata } from 'next'
import { Container, Section, Button } from '@/components/ui'
import { CheckCircle, Calendar, FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You - Partner Application Received | Reverse Way Home',
  description: 'Your partner application has been received. We will contact you within 48 hours.',
}

export default function ThankYouPartnerPage() {
  return (
    <main id="main">
      <Section padding="large" className="min-h-screen flex items-center">
        <Container size="narrow">
          <div className="text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full mb-8">
              <CheckCircle className="w-10 h-10 text-success-600" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Thank You for Your Interest!
            </h1>

            {/* Subheading */}
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
              We've received your partner application and are excited to explore 
              how we can work together to help seniors access their home equity.
            </p>

            {/* What's Next */}
            <div className="bg-neutral-50 rounded-2xl p-8 mb-12 text-left max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-4 mt-1">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Application Review</h3>
                    <p className="text-neutral-600">
                      Our partnership team will review your application within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-4 mt-1">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Schedule a Call</h3>
                    <p className="text-neutral-600">
                      We'll reach out within 48 hours to schedule a brief introductory call 
                      to discuss your practice and our partnership program.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Get Started</h3>
                    <p className="text-neutral-600">
                      Once approved, you'll receive access to our partner portal, training 
                      materials, and marketing resources.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-primary-50 rounded-xl p-6 mb-12 max-w-md mx-auto">
              <p className="text-sm text-neutral-700 mb-2">
                Have questions? Contact our partnership team:
              </p>
              <a 
                href="mailto:partners@reversewayhome.com" 
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                partners@reversewayhome.com
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/" variant="ghost">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Home
              </Button>
              <Button 
                href="https://calendly.com/reversewayhome" 
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule a Call Now
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}