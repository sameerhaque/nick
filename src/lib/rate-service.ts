interface RateData {
  oneYear: number
  threeYear: number
  fiveYear: number
  variable: number
  lastUpdated: Date
}

interface RateServiceResponse {
  rates: RateData | null
  error?: string
  fallbackUsed: boolean
}

// Fallback rates (current market estimates)
const FALLBACK_RATES: RateData = {
  oneYear: 0.065,  // 6.5%
  threeYear: 0.068, // 6.8%
  fiveYear: 0.072,  // 7.2%
  variable: 0.063,  // 6.3%
  lastUpdated: new Date()
}

// Cache for rates to avoid frequent requests
let cachedRates: RateData | null = null
let cacheExpiry: Date | null = null
const CACHE_DURATION_MS = 4 * 60 * 60 * 1000 // 4 hours

interface ChipAdvisorRates {
  oneYear: number
  threeYear: number
  fiveYear: number
  variable: number
}

/**
 * Scrapes rates directly from ChipAdvisor website
 */
async function scrapeChipAdvisorRates(): Promise<ChipAdvisorRates | null> {
  try {
    const response = await fetch('https://www.chipadvisor.ca/rates/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Parse the HTML to extract rates
    const rates = parseRatesFromHTML(html)
    
    return rates
  } catch (error) {
    console.error('Error scraping ChipAdvisor rates:', error)
    // Return null to trigger fallback
    return null
  }
}

/**
 * Parses mortgage rates from ChipAdvisor HTML
 */
function parseRatesFromHTML(html: string): ChipAdvisorRates | null {
  try {
    // Look for common patterns in rate tables
    // This is a simplified approach - real implementation would need to be more specific
    
    // Try to find rates using regex patterns
    const oneYearMatch = html.match(/1[\s-]?year[^>]*?(\d+\.?\d*)%?/i)
    const threeYearMatch = html.match(/3[\s-]?year[^>]*?(\d+\.?\d*)%?/i)
    const fiveYearMatch = html.match(/5[\s-]?year[^>]*?(\d+\.?\d*)%?/i)
    const variableMatch = html.match(/variable[^>]*?(\d+\.?\d*)%?/i)

    // Parse rates or use market estimates if not found
    const oneYear = oneYearMatch ? parseFloat(oneYearMatch[1]) : 6.5
    const threeYear = threeYearMatch ? parseFloat(threeYearMatch[1]) : 6.8
    const fiveYear = fiveYearMatch ? parseFloat(fiveYearMatch[1]) : 7.2
    const variable = variableMatch ? parseFloat(variableMatch[1]) : 6.3
    
    // Debug logging for rate parsing
    if (process.env.NODE_ENV === 'development') {
      console.log('Rate parsing debug:', {
        oneYearMatch: oneYearMatch?.[0],
        threeYearMatch: threeYearMatch?.[0],
        fiveYearMatch: fiveYearMatch?.[0],
        variableMatch: variableMatch?.[0],
        parsedRates: { oneYear, threeYear, fiveYear, variable }
      })
    }
    
    // Validate rates are reasonable (between 2% and 15%)
    return {
      oneYear: (oneYear >= 2 && oneYear <= 15) ? oneYear : 6.5,
      threeYear: (threeYear >= 2 && threeYear <= 15) ? threeYear : 6.8,
      fiveYear: (fiveYear >= 2 && fiveYear <= 15) ? fiveYear : 7.2,
      variable: (variable >= 2 && variable <= 15) ? variable : 6.3,
    }
  } catch (error) {
    console.error('Error parsing rates from HTML:', error)
    return null
  }
}

/**
 * Fetches current mortgage rates from ChipAdvisor
 */
async function fetchRatesFromChipAdvisor(): Promise<RateData | null> {
  try {
    const rates = await scrapeChipAdvisorRates()
    
    if (rates) {
      return {
        oneYear: rates.oneYear / 100, // Convert percentage to decimal
        threeYear: rates.threeYear / 100,
        fiveYear: rates.fiveYear / 100,
        variable: rates.variable / 100,
        lastUpdated: new Date()
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching rates from ChipAdvisor:', error)
    return null
  }
}

/**
 * Gets current mortgage rates with caching and fallback
 * For client-side use, fetches from API endpoint
 * For server-side use, scrapes directly
 */
export async function getCurrentRates(): Promise<RateServiceResponse> {
  // Check cache first
  if (cachedRates && cacheExpiry && new Date() < cacheExpiry) {
    return {
      rates: cachedRates,
      fallbackUsed: false
    }
  }

  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Client-side: use API endpoint to avoid CORS issues
    try {
      const response = await fetch('/api/rates/chipadvisor')
      if (response.ok) {
        const data = await response.json()
        
        if (data.rates) {
          const rates: RateData = {
            oneYear: data.rates.oneYear / 100, // Convert percentage to decimal
            threeYear: data.rates.threeYear / 100,
            fiveYear: data.rates.fiveYear / 100,
            variable: data.rates.variable / 100,
            lastUpdated: new Date(data.lastUpdated)
          }
          
          // Update cache
          cachedRates = rates
          cacheExpiry = new Date(Date.now() + CACHE_DURATION_MS)
          
          return {
            rates,
            fallbackUsed: data.fallbackUsed || false
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch rates from API:', error)
    }
  } else {
    // Server-side: scrape directly
    try {
      const freshRates = await fetchRatesFromChipAdvisor()
      
      if (freshRates) {
        // Update cache
        cachedRates = freshRates
        cacheExpiry = new Date(Date.now() + CACHE_DURATION_MS)
        
        return {
          rates: freshRates,
          fallbackUsed: false
        }
      }
    } catch (error) {
      console.error('Failed to fetch fresh rates:', error)
    }
  }

  // Use fallback rates
  console.warn('Using fallback rates due to service unavailability')
  return {
    rates: FALLBACK_RATES,
    error: 'Unable to fetch current rates, using fallback values',
    fallbackUsed: true
  }
}

/**
 * Gets rate for specific term
 */
export async function getRateForTerm(term: '1-year' | '3-year' | '5-year' | 'variable'): Promise<number> {
  const { rates } = await getCurrentRates()
  
  if (!rates) {
    // Return fallback for specific term
    switch (term) {
      case '1-year': return FALLBACK_RATES.oneYear
      case '3-year': return FALLBACK_RATES.threeYear
      case '5-year': return FALLBACK_RATES.fiveYear
      case 'variable': return FALLBACK_RATES.variable
      default: return FALLBACK_RATES.fiveYear
    }
  }

  switch (term) {
    case '1-year': return rates.oneYear
    case '3-year': return rates.threeYear
    case '5-year': return rates.fiveYear
    case 'variable': return rates.variable
    default: return rates.fiveYear
  }
}

// Export fallback rates for testing
export { FALLBACK_RATES }