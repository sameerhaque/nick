import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
}

export function Logo({ 
  variant = 'horizontal', 
  size = 'md', 
  className = '',
  href = '/'
}: LogoProps) {
  const dimensions = {
    full: {
      sm: { width: 150, height: 45 },
      md: { width: 200, height: 60 },
      lg: { width: 250, height: 75 }
    },
    horizontal: {
      sm: { width: 210, height: 38 },
      md: { width: 280, height: 50 },
      lg: { width: 350, height: 63 }
    },
    icon: {
      sm: { width: 32, height: 32 },
      md: { width: 44, height: 44 },
      lg: { width: 56, height: 56 }
    }
  }

  const logoSrc = {
    full: '/logos/reversewayhome-logo.svg',
    horizontal: '/logos/reversewayhome-horizontal.svg',
    icon: '/logos/reversewayhome-icon.svg'
  }

  const { width, height } = dimensions[variant][size]
  const src = logoSrc[variant]

  const logoElement = (
    <Image
      src={src}
      alt="Reverse Way Home - Access Your Home Equity, Stay in Your Home"
      width={width}
      height={height}
      className={`h-auto ${className}`}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}

// Export component variations for convenience
export const LogoFull = (props: Omit<LogoProps, 'variant'>) => 
  <Logo {...props} variant="full" />

export const LogoHorizontal = (props: Omit<LogoProps, 'variant'>) => 
  <Logo {...props} variant="horizontal" />

export const LogoIcon = (props: Omit<LogoProps, 'variant'>) => 
  <Logo {...props} variant="icon" />