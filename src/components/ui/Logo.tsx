import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ 
  className = '',
  href = '/'
}: LogoProps) {
  const logoElement = (
    <Image
      src="/logos/reversewayhome-logo.png"
      alt="Reverse Way Home - Access Your Home Equity, Stay in Your Home"
      fill
      className="object-contain"
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className={`relative inline-block ${className}`}>
        {logoElement}
      </Link>
    )
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {logoElement}
    </div>
  )
}

// Export component variations for convenience
export const LogoFull = (props: LogoProps) => 
  <Logo {...props} />

export const LogoHorizontal = (props: LogoProps) => 
  <Logo {...props} />

export const LogoIcon = (props: LogoProps) => 
  <Logo {...props} />