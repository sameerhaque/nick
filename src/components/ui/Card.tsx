import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'default' | 'large' | 'small'
  onClick?: () => void
  ariaLabel?: string
}

export function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'default',
  onClick,
  ariaLabel
}: CardProps) {
  const paddingClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  }

  const baseClasses = `bg-white rounded-lg shadow-sm border border-neutral-200 transition-shadow duration-200 ${paddingClasses[padding]}`
  const hoverClasses = hover ? 'hover:shadow-lg cursor-pointer' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick && ariaLabel ? ariaLabel : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {children}
    </div>
  )
}