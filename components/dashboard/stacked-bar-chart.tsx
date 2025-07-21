"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Filter } from "lucide-react"
import mockData from "@/data/mockData.json"

export function StackedBarChart() {
  const { title, data } = mockData.dashboard.stackedBarChart

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <button className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <Filter className="mr-2 h-4 w-4 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approved" stackId="a" fill="#449CFB" name="Approved" />
            <Bar dataKey="pending" stackId="a" fill="#FFB366" name="Pending" />
            <Bar dataKey="rejected" stackId="a" fill="#F08C76" name="Rejected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
