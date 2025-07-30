import { NextResponse } from 'next/server'
import { getCurrentRates } from '@/lib/rate-service'

export async function GET() {
  try {
    const { rates, error, fallbackUsed } = await getCurrentRates()
    
    if (!rates) {
      return NextResponse.json(
        { 
          error: error || 'Unable to fetch rates from ChipAdvisor',
          fallback: true
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      rates: {
        oneYear: rates.oneYear * 100, // Convert back to percentage for API
        threeYear: rates.threeYear * 100,
        fiveYear: rates.fiveYear * 100,
        variable: rates.variable * 100,
      },
      lastUpdated: rates.lastUpdated.toISOString(),
      source: 'chipadvisor.ca',
      fallbackUsed
    })

  } catch (error) {
    console.error('ChipAdvisor rates API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error while fetching rates',
        fallback: true
      },
      { status: 500 }
    )
  }
}

// Add CORS headers for local development
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}