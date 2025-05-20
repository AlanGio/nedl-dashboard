"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { ArrowUpDown } from "lucide-react"
import mockData from "@/data/mockData.json"

export function RadarChartComponent() {
  const { title, data } = mockData.dashboard.radarChart

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <button className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <ArrowUpDown className="mr-2 h-4 w-4 text-slate-500" />
          <span>Compare</span>
        </button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Current" dataKey="current" stroke="#449CFB" fill="#449CFB" fillOpacity={0.6} />
            <Radar name="Benchmark" dataKey="benchmark" stroke="#F087FB" fill="#F087FB" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
