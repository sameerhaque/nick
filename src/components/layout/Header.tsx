'use client'

import { useState } from 'react'
import { LogoHorizontal, Button, Container } from '@/components/ui'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Calculator', href: '/calculator' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LogoHorizontal size="sm" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:(416) 555-7378"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>(416) 555-7378</span>
            </a>
            <Button href="/calculator" size="sm">
              Calculator
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Phone & CTA */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <a
                  href="tel:(416) 555-7378"
                  className="flex items-center gap-2 px-3 py-2 text-primary-600 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>(416) 555-7378</span>
                </a>
                <div className="px-3">
                  <Button href="/calculator" size="sm" className="w-full">
                    Calculate Your Amount
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}