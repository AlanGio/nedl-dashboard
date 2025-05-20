"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface PayerDistributionChartProps {
  distribution: {
    commercial: number
    medicare: number
    medicaid: number
  }
}

export function PayerDistributionChart({ distribution }: PayerDistributionChartProps) {
  const COLORS = ["#449CFB", "#8A287F", "#0071EA"]

  const data = [
    { name: "Commercial", value: distribution.commercial },
    { name: "Medicare", value: distribution.medicare },
    { name: "Medicaid", value: distribution.medicaid },
  ]

  // Calculate total to ensure percentages add up to 100%
  const total = data.reduce((acc, item) => acc + item.value, 0)

  // Normalize data if total is not 100
  const normalizedData = data.map((item) => ({
    ...item,
    value: total === 0 ? 0 : Math.round((item.value / total) * 100),
  }))

  return (
    <div className="bg-white rounded-lg border shadow-custom p-6">
      <h2 className="text-base font-semibold mb-4">Payer Distribution by Type</h2>
      <div className="h-60 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={normalizedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={false}
            >
              {normalizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-2xl font-bold">{normalizedData[0].value}%</span>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {normalizedData.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2 no-shadow"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
