export interface CalculationInputs {
  province: string
  postalCode: string
  propertyValue: number
  mortgageBalance: number
  primaryAge: number
  secondaryAge?: number
  productType: 'lump-sum' | 'income-advantage'
}

export interface CalculationResult {
  estimatedAmount: number
  maxLTV: number
  calculationId: string
  breakdown: {
    availableEquity: number
    fees: number
    netAmount: number
  }
  compliance?: {
    isEstimateOnly: boolean
    requiresCounseling: boolean
    subjectToApproval: boolean
    interestAccrues: boolean
  }
  warnings?: string[]
}

// Age-based LTV lookup table (simplified version)
const AGE_LTV_TABLE: { [key: number]: number } = {
  55: 0.20,
  60: 0.25,
  65: 0.30,
  70: 0.35,
  75: 0.40,
  80: 0.45,
  85: 0.50,
  90: 0.55,
  95: 0.60,
  100: 0.65
}

// Provincial adjustments (simplified)
const PROVINCIAL_ADJUSTMENTS: { [key: string]: number } = {
  'BC': 0.95, // High property values, slight reduction
  'ON': 1.0,  // Baseline
  'AB': 1.05, // Lower property values, slight increase
  'SK': 1.05,
  'MB': 1.05,
  'QC': 0.98,
  'NB': 1.02,
  'PE': 1.02,
  'NS': 1.02,
  'NL': 1.02,
}

// Fee structure
const BASE_FEES = {
  appraisal: 350,
  legal: 1500,
  administration: 1500,
  insuranceRate: 0.035 // 3.5% of property value
}

function getAgeLTV(age: number): number {
  // Find the closest age in the table
  const ages = Object.keys(AGE_LTV_TABLE).map(Number).sort((a, b) => a - b)
  
  if (age <= ages[0]) return AGE_LTV_TABLE[ages[0]]
  if (age >= ages[ages.length - 1]) return AGE_LTV_TABLE[ages[ages.length - 1]]
  
  // Linear interpolation between ages
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
  // Use crypto.randomUUID for secure ID generation
  const uuid = crypto.randomUUID()
  const timestamp = Date.now().toString(36)
  return `calc_${timestamp}_${uuid.split('-')[0]}`
}

export function calculateReverseAmount(inputs: CalculationInputs): Promise<CalculationResult> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const {
        province,
        propertyValue,
        mortgageBalance,
        primaryAge,
        secondaryAge,
        productType
      } = inputs

      // Use the youngest age for joint applicants (industry standard)
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

      // Calculate fees
      const fees = calculateFees(propertyValue)

      // Calculate available equity after paying off existing mortgage
      const availableEquity = maxLoanAmount - mortgageBalance

      // Calculate net amount after fees
      const netAmount = Math.max(0, availableEquity - fees)

      const result: CalculationResult = {
        estimatedAmount: Math.round(netAmount),
        maxLTV: baseLTV,
        calculationId: generateCalculationId(),
        breakdown: {
          availableEquity: Math.round(availableEquity),
          fees: Math.round(fees),
          netAmount: Math.round(netAmount)
        }
      }

      resolve(result)
    }, 1000) // Simulate 1 second calculation time
  })
}

// Direct-to-consumer API endpoint
export async function calculateReverseAmountAPI(inputs: CalculationInputs): Promise<CalculationResult> {
  const response = await fetch('/api/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...inputs,
      source: 'direct-consumer',
      utm_source: 'website',
      utm_medium: 'calculator'
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Calculation failed')
  }

  return response.json()
}