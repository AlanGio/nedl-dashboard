"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PolicyDistributionChartProps {
  data: {
    categories: string[]
    columns: string[]
    data: {
      category: string
      values: Record<string, string>
      colors: Record<string, string>
    }[]
  }
}

export function PolicyDistributionChart({ data }: PolicyDistributionChartProps) {
  // Transform the data for the chart
  const chartData = data.data.map((item) => {
    const result: any = { category: item.category }

    // Add each column value to the result
    data.columns.forEach((column) => {
      result[column] = Number.parseInt(item.values[column], 10)
    })

    return result
  })

  // Define colors for the bars
  const barColors = {
    Commercial: "#449CFB",
    Medicare: "#8A287F",
    Medicaid: "#0071EA",
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-base font-semibold mb-4">Policy Distribution by Payer Type</h2>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} policies`, ""]} labelFormatter={(label) => `${label} Policies`} />
            <Legend />
            {data.columns.map((column, index) => (
              <Bar
                key={column}
                dataKey={column}
                name={column}
                fill={
                  barColors[column as keyof typeof barColors] || `#${Math.floor(Math.random() * 16777215).toString(16)}`
                }
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {data.columns.map((column, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2 no-shadow"
              style={{ backgroundColor: barColors[column as keyof typeof barColors] || "#ccc" }}
            />
            <span className="text-xs">{column}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
