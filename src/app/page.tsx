import { Metadata } from 'next'
import {
  SeniorHero,
  CalculatorSection,
  WhatIsSection,
  HowItWorks,
  Benefits,
  ClientTestimonials,
  FAQ,
  Contact,
  RiskDisclosure,
  ComparisonSection
} from '@/components/homepage'

export const metadata: Metadata = {
  title: 'Reverse Mortgage for Seniors 55+ | Access Home Equity | Reverse Way Home',
  description: 'Stay in your home and access tax-free income with a provincially-regulated reverse mortgage. No monthly payments required. Free consultation for homeowners 55+.',
  keywords: 'reverse mortgage, seniors, home equity, retirement income, Canadian reverse mortgage, no monthly payments',
  authors: [{ name: 'Reverse Way Home' }],
  openGraph: {
    title: 'Reverse Mortgage for Seniors 55+ | Access Home Equity',
    description: 'Stay in your home and access tax-free income with a provincially-regulated reverse mortgage.',
    url: 'https://reversewayhome.com',
    siteName: 'Reverse Way Home',
    images: [
      {
        url: '/og-image-seniors.jpg',
        width: 1200,
        height: 630,
        alt: 'Senior couple in their home with reverse mortgage information',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Mortgage for Seniors 55+ | Access Home Equity',
    description: 'Stay in your home and access tax-free income with a provincially-regulated reverse mortgage.',
    images: ['/og-image-seniors.jpg'],
  },
}

export default function HomePage() {
  return (
    <main id="main">
      <SeniorHero />
      <CalculatorSection />
      <WhatIsSection />
      <HowItWorks />
      <Benefits />
      <ComparisonSection />
      <RiskDisclosure />
      <ClientTestimonials />
      <FAQ />
      <Contact />
    </main>
  )
}