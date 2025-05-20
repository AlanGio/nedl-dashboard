"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import mockData from "@/data/mockData.json"

export function PayerDistributionChart() {
  const { distribution } = mockData.bookmarked.payerDistribution
  const COLORS = ["#449CFB", "#8A287F", "#0071EA"]

  const data = [
    { name: "Commercial", value: distribution.commercial },
    { name: "Medicare", value: distribution.medicare },
    { name: "Medicaid", value: distribution.medicaid },
  ]

  return (
    <div className="bg-white rounded-lg border shadow-custom p-6">
      <h2 className="text-base font-semibold mb-4">Payer Distribution by Type</h2>
      <div className="h-60 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-2xl font-bold">50%</span>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2 no-shadow"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
