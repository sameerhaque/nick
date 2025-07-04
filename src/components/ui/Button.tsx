import React from 'react'
import Link from 'next/link'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  isLoading?: boolean
  children: React.ReactNode
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'lg', 
    href, 
    isLoading = false, 
    children, 
    className = '',
    disabled,
    target,
    rel,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500',
      ghost: 'bg-transparent text-primary hover:bg-primary-50 focus:ring-primary-500',
      success: 'bg-success text-white hover:bg-success-600 focus:ring-success-500',
      outline: 'bg-transparent text-primary border border-primary hover:bg-primary-50 focus:ring-primary-500'
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[42px]',
      lg: 'px-6 py-3 text-base min-h-[48px]'
    }

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    if (href && !disabled && !isLoading) {
      return (
        <Link href={href} className={classes} target={target} rel={rel}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'