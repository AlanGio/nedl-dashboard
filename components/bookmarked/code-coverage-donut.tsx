"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface CodeCoverageDonutProps {
  coverage: {
    percentage: number
    details: {
      covered: number
      priorAuth: number
      notCovered: number
    }
  }
}

export function CodeCoverageDonut({ coverage }: CodeCoverageDonutProps) {
  const COLORS = ["#4ade80", "#fbbf24", "#ef4444"]

  const data = [
    { name: "Covered", value: coverage.details.covered },
    { name: "Prior Auth", value: coverage.details.priorAuth },
    { name: "Not Covered", value: coverage.details.notCovered },
  ]

  return (
    <div>
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
          <span className="text-2xl font-bold">{coverage.percentage}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Code Explorer</h3>
        <div className="flex flex-col gap-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
