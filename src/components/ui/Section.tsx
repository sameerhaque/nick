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
    small: 'py-12 lg:py-16',
    default: 'py-16 lg:py-24',
    large: 'py-24 lg:py-32'
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