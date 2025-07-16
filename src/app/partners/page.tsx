import { Metadata } from 'next'
import { PartnerHero } from '@/components/partners/PartnerHero'
import { HowItWorks } from '@/components/partners/HowItWorks'
import { IncentiveSection } from '@/components/partners/IncentiveSection'
import { PartnerTypes } from '@/components/partners/PartnerTypes'
import { PartnerTestimonials } from '@/components/partners/PartnerTestimonials'
import { PartnerLeadForm } from '@/components/partners/PartnerLeadForm'

export const metadata: Metadata = {
  title: 'Reverse Mortgage Referral Partner Program | Earn Up to $450 Per Referral',
  description: 'Join our referral network. Help clients access home equity while earning referral income. Training and marketing support included.',
  keywords: 'reverse mortgage partner, referral program, financial advisor partnership, realtor referral program',
}

export default function PartnersPage() {
  return (
    <main id="main">
      <PartnerHero />
      <HowItWorks />
      <IncentiveSection />
      <PartnerTypes />
      <PartnerTestimonials />
      <PartnerLeadForm />
    </main>
  )
}