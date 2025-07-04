import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'gray' | 'primary-light' | 'secondary-light'
  padding?: 'default' | 'large' | 'small' | 'none'
}

export function Section({ 
  children, 
  className = '', 
  id,
  background = 'white',
  padding = 'default' 
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    'primary-light': 'bg-primary-50',
    'secondary-light': 'bg-secondary-50'
  }

  const paddingClasses = {
    none: '',
    small: 'py-12 md:py-16',
    default: 'py-20 md:py-32',
    large: 'py-32 md:py-48'
  }

  return (
    <section 
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </section>
  )
}