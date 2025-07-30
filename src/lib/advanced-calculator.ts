export interface AdvancedCalculationInputs {
  province: string
  postalCode: string
  propertyValue: number
  mortgageBalance: number
  primaryAge: number
  secondaryAge?: number
  productType: 'lump-sum' | 'income-advantage'
  interestRateTerm: '1-year' | '3-year' | '5-year' | 'variable'
  homeAppreciationRate: number // Annual percentage (e.g., 3.5 for 3.5%)
  initialAdvance: number // Minimum $20,000
  plannedAdvances: {
    monthlyAmount: number // Minimum $1,000
    startMonth: number
    endMonth?: number // Optional end date
  }[]
}

export interface ProjectionDataPoint {
  year: number
  month: number
  homeValue: number
  loanBalance: number
  availableEquity: number
  monthlyInterest: number
  cumulativeInterest: number
  monthlyAdvance: number
  cumulativeAdvances: number
}

export interface AdvancedCalculationResult {
  estimatedAmount: number
  maxLTV: number
  calculationId: string
  interestRate: number
  projectionTimeline: ProjectionDataPoint[]
  breakdown: {
    initialAdvance: number
    totalPlannedAdvances: number
    totalInterest: number
    finalHomeValue: number
    finalLoanBalance: number
    remainingEquity: number
    fees: number
  }
  compliance?: {
    isEstimateOnly: boolean
    requiresCounseling: boolean
    subjectToApproval: boolean
    interestAccrues: boolean
  }
  warnings?: string[]
}

// Interest rate mapping based on term selection
const INTEREST_RATES: { [key: string]: number } = {
  '1-year': 0.065, // 6.5%
  '3-year': 0.068, // 6.8%
  '5-year': 0.072, // 7.2%
  'variable': 0.063, // 6.3% (prime + margin)
}

// Age-based LTV lookup table (more granular)
const AGE_LTV_TABLE: { [key: number]: number } = {
  55: 0.20, 56: 0.21, 57: 0.22, 58: 0.23, 59: 0.24,
  60: 0.25, 61: 0.26, 62: 0.27, 63: 0.28, 64: 0.29,
  65: 0.30, 66: 0.31, 67: 0.32, 68: 0.33, 69: 0.34,
  70: 0.35, 71: 0.36, 72: 0.37, 73: 0.38, 74: 0.39,
  75: 0.40, 76: 0.41, 77: 0.42, 78: 0.43, 79: 0.44,
  80: 0.45, 81: 0.46, 82: 0.47, 83: 0.48, 84: 0.49,
  85: 0.50, 86: 0.51, 87: 0.52, 88: 0.53, 89: 0.54,
  90: 0.55, 91: 0.56, 92: 0.57, 93: 0.58, 94: 0.59,
  95: 0.60, 96: 0.61, 97: 0.62, 98: 0.63, 99: 0.64,
  100: 0.65
}

// Provincial adjustments
const PROVINCIAL_ADJUSTMENTS: { [key: string]: number } = {
  'BC': 0.95, 'ON': 1.0, 'AB': 1.05, 'SK': 1.05, 'MB': 1.05,
  'QC': 0.98, 'NB': 1.02, 'PE': 1.02, 'NS': 1.02, 'NL': 1.02,
}

// Fee structure
const BASE_FEES = {
  appraisal: 350,
  legal: 1500,
  administration: 1500,
  insuranceRate: 0.035 // 3.5% of property value
}

function getAgeLTV(age: number): number {
  if (AGE_LTV_TABLE[age]) return AGE_LTV_TABLE[age]
  
  // Linear interpolation for ages not in table
  const ages = Object.keys(AGE_LTV_TABLE).map(Number).sort((a, b) => a - b)
  
  if (age <= ages[0]) return AGE_LTV_TABLE[ages[0]]
  if (age >= ages[ages.length - 1]) return AGE_LTV_TABLE[ages[ages.length - 1]]
  
  for (let i = 0; i < ages.length - 1; i++) {
    if (age >= ages[i] && age <= ages[i + 1]) {
      const lowerAge = ages[i]
      const upperAge = ages[i + 1]
      const lowerLTV = AGE_LTV_TABLE[lowerAge]
      const upperLTV = AGE_LTV_TABLE[upperAge]
      
      const ratio = (age - lowerAge) / (upperAge - lowerAge)
      return lowerLTV + (upperLTV - lowerLTV) * ratio
    }
  }
  
  return AGE_LTV_TABLE[65] // Default fallback
}

function calculateFees(propertyValue: number): number {
  const insurance = propertyValue * BASE_FEES.insuranceRate
  return BASE_FEES.appraisal + BASE_FEES.legal + BASE_FEES.administration + insurance
}

function generateCalculationId(): string {
  const uuid = crypto.randomUUID()
  const timestamp = Date.now().toString(36)
  return `adv_calc_${timestamp}_${uuid.split('-')[0]}`
}

export function projectMortgageTimeline(inputs: AdvancedCalculationInputs): ProjectionDataPoint[] {
  const {
    propertyValue,
    mortgageBalance,
    homeAppreciationRate,
    initialAdvance,
    plannedAdvances,
    interestRateTerm
  } = inputs

  const projectionYears = 10 // Project 10 years into the future
  const timeline: ProjectionDataPoint[] = []
  
  const interestRate = INTEREST_RATES[interestRateTerm]
  const monthlyInterestRate = interestRate / 12

  let currentHomeValue = propertyValue
  let currentLoanBalance = mortgageBalance + initialAdvance
  let cumulativeInterest = 0
  let cumulativeAdvances = initialAdvance
  
  for (let year = 0; year <= projectionYears; year++) {
    for (let month = 0; month < 12; month++) {
      const totalMonths = year * 12 + month
      
      // Calculate home appreciation (compound monthly)
      const monthlyAppreciationRate = homeAppreciationRate / 100 / 12
      if (totalMonths > 0) {
        currentHomeValue *= (1 + monthlyAppreciationRate)
      }
      
      // Calculate monthly interest on loan balance
      const monthlyInterest = currentLoanBalance * monthlyInterestRate
      currentLoanBalance += monthlyInterest
      cumulativeInterest += monthlyInterest
      
      // Apply planned advances
      let monthlyAdvance = 0
      for (const advance of plannedAdvances) {
        if (totalMonths >= advance.startMonth && 
            (!advance.endMonth || totalMonths <= advance.endMonth)) {
          monthlyAdvance += advance.monthlyAmount
        }
      }
      
      currentLoanBalance += monthlyAdvance
      cumulativeAdvances += monthlyAdvance
      
      // Calculate available equity
      const availableEquity = Math.max(0, currentHomeValue - currentLoanBalance)
      
      timeline.push({
        year,
        month,
        homeValue: Math.round(currentHomeValue),
        loanBalance: Math.round(currentLoanBalance),
        availableEquity: Math.round(availableEquity),
        monthlyInterest: Math.round(monthlyInterest),
        cumulativeInterest: Math.round(cumulativeInterest),
        monthlyAdvance: Math.round(monthlyAdvance),
        cumulativeAdvances: Math.round(cumulativeAdvances)
      })
    }
  }
  
  return timeline
}

export function calculateAdvancedReverseAmount(inputs: AdvancedCalculationInputs): Promise<AdvancedCalculationResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const {
        province,
        propertyValue,
        mortgageBalance,
        primaryAge,
        secondaryAge,
        productType,
        interestRateTerm,
        initialAdvance,
        plannedAdvances
      } = inputs

      // Use youngest age for joint applicants
      const applicantAge = secondaryAge ? Math.min(primaryAge, secondaryAge) : primaryAge

      // Get base LTV for age
      let baseLTV = getAgeLTV(applicantAge)

      // Apply provincial adjustment
      const provincialAdjustment = PROVINCIAL_ADJUSTMENTS[province] || 1.0
      baseLTV *= provincialAdjustment

      // Product type adjustment
      if (productType === 'income-advantage') {
        baseLTV *= 0.95 // Slightly lower for income advantage
      }

      // Calculate maximum loan amount
      const maxLoanAmount = propertyValue * baseLTV
      
      // Validate initial advance doesn't exceed maximum
      const validatedInitialAdvance = Math.min(initialAdvance, maxLoanAmount - mortgageBalance)
      
      // Generate projection timeline
      const projectionTimeline = projectMortgageTimeline({
        ...inputs,
        initialAdvance: validatedInitialAdvance
      })

      // Calculate fees
      const fees = calculateFees(propertyValue)
      
      // Get final values from timeline (10 years out)
      const finalData = projectionTimeline[projectionTimeline.length - 1]
      
      // Calculate total planned advances over timeline
      const totalPlannedAdvances = plannedAdvances.reduce((total, advance) => {
        const months = advance.endMonth ? (advance.endMonth - advance.startMonth + 1) : (120 - advance.startMonth) // Default to 10 years
        return total + (advance.monthlyAmount * months)
      }, 0)

      const result: AdvancedCalculationResult = {
        estimatedAmount: Math.round(validatedInitialAdvance),
        maxLTV: baseLTV,
        calculationId: generateCalculationId(),
        interestRate: INTEREST_RATES[interestRateTerm],
        projectionTimeline,
        breakdown: {
          initialAdvance: Math.round(validatedInitialAdvance),
          totalPlannedAdvances: Math.round(totalPlannedAdvances),
          totalInterest: finalData.cumulativeInterest,
          finalHomeValue: finalData.homeValue,
          finalLoanBalance: finalData.loanBalance,
          remainingEquity: finalData.availableEquity,
          fees: Math.round(fees)
        },
        compliance: {
          isEstimateOnly: true,
          requiresCounseling: true,
          subjectToApproval: true,
          interestAccrues: true
        },
        warnings: []
      }

      // Add warnings based on projections
      if (finalData.availableEquity < propertyValue * 0.1) {
        result.warnings?.push('Projected equity may be significantly reduced over time due to interest accumulation')
      }
      
      if (validatedInitialAdvance < initialAdvance) {
        result.warnings?.push('Initial advance amount has been reduced to stay within lending limits')
      }

      resolve(result)
    }, 1500) // Simulate more complex calculation time
  })
}

// API endpoint version
export async function calculateAdvancedReverseAmountAPI(inputs: AdvancedCalculationInputs): Promise<AdvancedCalculationResult> {
  const response = await fetch('/api/advanced-calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...inputs,
      source: 'advanced-consumer',
      utm_source: 'website',
      utm_medium: 'advanced-calculator'
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Advanced calculation failed')
  }

  return response.json()
}