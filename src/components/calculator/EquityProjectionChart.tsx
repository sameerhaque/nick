'use client'

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { type ProjectionDataPoint } from '@/lib/advanced-calculator'

interface EquityProjectionChartProps {
  data: ProjectionDataPoint[]
}

// Transform data for chart display (yearly data points)
function transformDataForChart(data: ProjectionDataPoint[]) {
  // Filter to show only December of each year for cleaner display
  return data
    .filter((point, index) => point.month === 11 || index === 0) // December or first data point
    .map(point => ({
      year: point.year,
      homeValue: Math.round(point.homeValue / 1000), // Convert to thousands for better display
      loanBalance: Math.round(point.loanBalance / 1000),
      availableEquity: Math.round(point.availableEquity / 1000),
      cumulativeInterest: Math.round(point.cumulativeInterest / 1000),
      cumulativeAdvances: Math.round(point.cumulativeAdvances / 1000)
    }))
}

// Custom tooltip formatter
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{`Year ${label}`}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: $${(entry.value * 1000).toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function EquityProjectionChart({ data }: EquityProjectionChartProps) {
  const chartData = transformDataForChart(data)

  return (
    <div className="space-y-6">
      {/* Primary Chart: Home Value vs Loan Balance */}
      <div className="bg-white rounded-lg border p-6">
        <h5 className="text-lg font-medium mb-4">Home Value vs Loan Balance Over Time</h5>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="homeValueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="loanBalanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Area
                type="monotone"
                dataKey="homeValue"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#homeValueGradient)"
                name="Home Value"
              />
              <Area
                type="monotone"
                dataKey="loanBalance"
                stroke="#ef4444"
                strokeWidth={3}
                fill="url(#loanBalanceGradient)"
                name="Loan Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Home Value Growth</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>Loan Balance Growth</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded mr-2"></div>
            <span>Available Equity (Difference)</span>
          </div>
        </div>
      </div>

      {/* Secondary Chart: Available Equity Trend */}
      <div className="bg-white rounded-lg border p-6">
        <h5 className="text-lg font-medium mb-4">Available Equity Projection</h5>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="availableEquity"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                name="Available Equity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Available equity represents the difference between your home&apos;s projected value and the outstanding loan balance
        </p>
      </div>

      {/* Cumulative Summary Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h5 className="text-lg font-medium mb-4">Cumulative Interest vs Advances</h5>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `Year ${value}`}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeAdvances"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                name="Total Advances Received"
              />
              <Line
                type="monotone"
                dataKey="cumulativeInterest"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                name="Accumulated Interest"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="font-medium">Total Advances</span>
            </div>
            <p className="text-xs text-gray-600">
              Cash you receive from your reverse mortgage over time
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
              <span className="font-medium">Accumulated Interest</span>
            </div>
            <p className="text-xs text-gray-600">
              Interest that compounds on your loan balance over time
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h5 className="text-lg font-medium mb-3 text-blue-900">Key Projection Insights</h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-blue-800 mb-1">
              Starting Equity: ${chartData[0]?.availableEquity ? (chartData[0].availableEquity * 1000).toLocaleString() : '0'}
            </div>
            <p className="text-blue-700">Your initial available equity</p>
          </div>
          <div>
            <div className="font-medium text-blue-800 mb-1">
              10-Year Equity: ${chartData[chartData.length - 1]?.availableEquity ? (chartData[chartData.length - 1].availableEquity * 1000).toLocaleString() : '0'}
            </div>
            <p className="text-blue-700">Projected equity after 10 years</p>
          </div>
          <div>
            <div className="font-medium text-blue-800 mb-1">
              Interest Impact: ${chartData[chartData.length - 1]?.cumulativeInterest ? (chartData[chartData.length - 1].cumulativeInterest * 1000).toLocaleString() : '0'}
            </div>
            <p className="text-blue-700">Total interest accumulated</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white bg-opacity-50 rounded border border-blue-300">
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Important:</strong> These projections are estimates based on your inputs. 
            Actual home appreciation, interest rates, and market conditions may vary significantly. 
            This illustration is for planning purposes only and does not guarantee future performance.
          </p>
        </div>
      </div>
    </div>
  )
}