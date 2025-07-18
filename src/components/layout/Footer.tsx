import { LogoFull, Container } from '@/components/ui'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <LogoFull size="sm" href="/" />
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Helping Ontario seniors access their home equity safely and securely for over 20 years. 
                FSRA licensed with A+ BBB rating.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-secondary-400" />
                  <a 
                    href="tel:(416) 555-7378"
                    className="text-white hover:text-secondary-400 transition-colors"
                  >
                    (416) 555-7378
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary-400" />
                  <a 
                    href="mailto:info@reversewayhome.com"
                    className="text-white hover:text-secondary-400 transition-colors"
                  >
                    info@reversewayhome.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary-400 mt-1" />
                  <div className="text-neutral-300">
                    <div>123 Bay Street, Suite 1200</div>
                    <div>Toronto, ON M5K 1A1</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="text-neutral-300 hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-neutral-300 hover:text-white transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-neutral-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/calculator" className="text-neutral-300 hover:text-white transition-colors">
                    Calculator
                  </a>
                </li>
                <li>
                  <a href="/partners" className="text-neutral-300 hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/calculator" className="text-neutral-300 hover:text-white transition-colors">
                    Loan Calculator
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-neutral-300 hover:text-white transition-colors">
                    Educational Blog
                  </a>
                </li>
                <li>
                  <a href="/testimonials" className="text-neutral-300 hover:text-white transition-colors">
                    Client Stories
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-neutral-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal */}
            <div className="text-sm text-neutral-400">
              <p className="mb-2">
                FSRA Licensed | Equal Housing Lender | Licensed by the Financial Services Regulatory Authority of Ontario
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/disclosures" className="hover:text-white transition-colors">
                  Disclosures
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-neutral-400 md:text-right">
              <p>&copy; {currentYear} Reverse Way Home. All rights reserved.</p>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-6 pt-6 border-t border-neutral-800 text-xs text-neutral-500 leading-relaxed">
            <p>
              <strong>Important:</strong> This material has not been reviewed, approved or issued by FSRA or any government agency. 
              The company is not affiliated with or acting on behalf of or at the direction of FSRA or any other government agency. 
              Not all borrowers will qualify for a reverse mortgage. Borrower must occupy home as primary residence and remain current on property taxes, 
              homeowner&apos;s insurance, and home maintenance. Credit subject to age, minimum income guidelines, creditworthiness, and property eligibility. 
              Program rates, fees, terms and conditions are subject to change and provincial regulations.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}