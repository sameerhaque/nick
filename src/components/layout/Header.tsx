'use client'

import { useState, useEffect, useRef } from 'react'
import { LogoHorizontal, Button, Container } from '@/components/ui'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const navigation = [ 
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus management - focus first menu item when opened
      setTimeout(() => {
        const firstMenuItem = menuRef.current?.querySelector('a')
        firstMenuItem?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LogoHorizontal className="h-14 w-[123px]" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 font-medium rounded-sm px-1 py-1"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:416-573-2641"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-medium rounded-sm px-2 py-1"
            >
              <Phone className="w-4 h-4" />
              <span>416-573-2641</span>
            </a>
            <Button href="/calculator" size="sm">
              Calculator
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
          >
            <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" ref={menuRef}>
            <nav 
              id="mobile-menu"
              className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 focus:bg-neutral-50 focus:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-md font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Phone & CTA */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <a
                  href="tel:416-573-2641"
                  className="flex items-center gap-2 px-3 py-2 text-primary-600 hover:text-primary-700 focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset font-medium rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>416-573-2641</span>
                </a>
                <div className="px-3">
                  <Button href="/calculator" size="sm" className="w-full">
                    Calculate Your Amount
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}