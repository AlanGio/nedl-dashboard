"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingDown } from "lucide-react"
import mockData from "@/data/mockData.json"

export function FunnelChart() {
  const { title, data } = mockData.dashboard.funnelChart

  // Sort data by value in descending order for funnel effect
  const sortedData = [...data].sort((a, b) => b.value - a.value)

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <div className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <TrendingDown className="mr-2 h-4 w-4 text-slate-500" />
          <span>Conversion</span>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={sortedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {sortedData.map((entry, index) => (
                <Bar key={`cell-${index}`} dataKey="value" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between text-xs text-slate-500">
        <div>Start: {sortedData[0]?.value}</div>
        <div>End: {sortedData[sortedData.length - 1]?.value}</div>
      </div>
    </div>
  )
}
