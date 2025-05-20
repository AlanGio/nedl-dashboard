"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { CalendarIcon } from "lucide-react"
import mockData from "@/data/mockData.json"

export function TrendLineChart() {
  const chartData = mockData.dashboard.trendLineChart
  const { title, timeRange, data } = chartData

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <div className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
          <span>{timeRange}</span>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#449CFB"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#F087FB"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 1 }}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
