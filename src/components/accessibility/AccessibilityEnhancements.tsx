'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Type, Minus, Plus, Contrast, RotateCcw } from 'lucide-react'

interface AccessibilityControlsProps {
  onFontSizeChange?: (size: number) => void
  onContrastChange?: (highContrast: boolean) => void
}

export function AccessibilityControls({ onFontSizeChange, onContrastChange }: AccessibilityControlsProps) {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Apply font size to document
    document.documentElement.style.fontSize = `${fontSize}px`
    onFontSizeChange?.(fontSize)
  }, [fontSize, onFontSizeChange])

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    onContrastChange?.(highContrast)
  }, [highContrast, onContrastChange])

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12))
  }

  const resetAll = () => {
    setFontSize(16)
    setHighContrast(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border-2 border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Accessibility options"
      >
        <Type className="w-6 h-6" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 right-0 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 w-64"
        >
          <h3 className="font-semibold mb-4 text-lg">Accessibility Options</h3>
          
          {/* Font Size Controls */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text Size</label>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                className="p-2 border rounded hover:bg-gray-50"
                aria-label="Decrease text size"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                {fontSize}px
              </span>
              <button
                onClick={increaseFontSize}
                className="p-2 border rounded hover:bg-gray-50"
                aria-label="Increase text size"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="mr-2"
              />
              <Contrast className="w-4 h-4 mr-2" />
              High Contrast
            </label>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </button>
        </motion.div>
      )}
    </div>
  )
}

// Enhanced form component with senior-friendly features
interface SeniorFriendlyInputProps {
  label: string
  type?: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  helpText?: string
  error?: string
  min?: number
  max?: number
}

export function SeniorFriendlyInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helpText,
  error,
  min,
  max
}: SeniorFriendlyInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2 text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {helpText && (
        <p className="text-sm text-gray-600 mb-2">{helpText}</p>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`
            w-full px-4 py-4 text-lg border-2 rounded-lg transition-all
            ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
            ${error ? 'border-red-500' : ''}
            focus:outline-none
            hover:border-gray-400
          `}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        
        {type === 'number' && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={() => onChange(String(Math.min(Number(value) + 1, max || Infinity)))}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Increase"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(String(Math.max(Number(value) - 1, min || -Infinity)))}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Decrease"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${label}-error`} className="mt-2 text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  )
}

// Large button component optimized for seniors
interface SeniorButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'large' | 'xlarge'
  disabled?: boolean
  loading?: boolean
}

export function SeniorButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false
}: SeniorButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-3 font-semibold rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-4
    ${size === 'large' ? 'px-8 py-4 text-lg' : 'px-10 py-5 text-xl'}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
  `

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-200',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-200'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

// Progress indicator optimized for seniors
interface SeniorProgressProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
}

export function SeniorProgress({ currentStep, totalSteps, stepTitles }: SeniorProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Step {currentStep + 1} of {totalSteps}
        </h2>
        <span className="text-lg text-gray-600">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      
      <p className="text-lg text-gray-700 text-center">
        {stepTitles[currentStep]}
      </p>
    </div>
  )
}