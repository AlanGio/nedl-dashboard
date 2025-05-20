"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ArrowUpDown } from "lucide-react"
import mockData from "@/data/mockData.json"

export function PolicyEffectivenessChart() {
  const { title, data } = mockData.dashboard.policyEffectivenessChart

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <button className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <ArrowUpDown className="mr-2 h-4 w-4 text-slate-500" />
          <span>Sort</span>
        </button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="effectiveness" name="Effectiveness" fill="#449CFB" />
            <Bar dataKey="adoption" name="Adoption Rate" fill="#F087FB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Policy effectiveness and adoption rates by clinical category
      </p>
    </div>
  )
}
