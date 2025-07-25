import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header, Footer } from '@/components/layout'

export const metadata: Metadata = {
  metadataBase: new URL('https://reversewayhome.com'),
  title: 'Reverse Way Home | Unlock Your Home Equity',
  description: 'Discover how a reverse mortgage can provide tax-free retirement income. Provincially-regulated program. No monthly payments. Free consultation.',
  keywords: 'reverse mortgage, home equity, retirement income, senior financing, Canadian reverse mortgage',
  authors: [{ name: 'Nick Tavernese' }],
  openGraph: {
    title: 'Reverse Way Home | Unlock Your Home Equity',
    description: 'Discover how a reverse mortgage can provide tax-free retirement income.',
    url: 'https://reversewayhome.com',
    siteName: 'Reverse Way Home',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reverse Way Home - Secure Your Retirement',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Way Home | Unlock Your Home Equity',
    description: 'Discover how a reverse mortgage can provide tax-free retirement income.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased bg-white text-neutral-900">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}