import { Metadata } from 'next'
import { ReverseCalculator } from '@/components/calculator/ReverseCalculator'

export const metadata: Metadata = {
  title: 'Reverse Mortgage Calculator | Free Estimate Tool',
  description: 'Calculate how much you could receive from a reverse mortgage. Get your free estimate based on your age, property value, and location.',
  keywords: 'reverse mortgage calculator, home equity calculator, retirement income calculator, mortgage estimate',
}

export default function CalculatorPage() {
  return (
    <main id="main">
      <ReverseCalculator />
    </main>
  )
}