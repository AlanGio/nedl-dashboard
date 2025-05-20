"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { CalendarIcon } from "lucide-react"
import mockData from "@/data/mockData.json"

const COLORS = ["#449CFB", "#F087FB", "#0071EA", "#8A287F", "#4D4D4D"]

export function DistributionCharts() {
  const [timeRange, setTimeRange] = useState("Last 12 Months")
  const { payerDistribution, policyDistribution } = mockData.dashboard.distributionCharts

  const payerData = Object.entries(payerDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  const policyData = Object.entries(policyDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-custom">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium">Payers by Type</h3>
          <div className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
            <span>{timeRange}</span>
          </div>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={payerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {payerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          {Object.entries(payerDistribution)
            .map(([key, value]) => `${value}% ${key.charAt(0).toUpperCase() + key.slice(1)}`)
            .join(", ")}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-custom">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-medium">Policies by Type</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary-500"></span>
              <span className="text-[10px]">Medical</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-secondary-500"></span>
              <span className="text-[10px]">Pharmacy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary-300"></span>
              <span className="text-[10px]">Provider</span>
            </div>
          </div>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={policyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} policies`, "Count"]} />
              <Bar dataKey="value" fill="#449CFB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          Commercial payers have highest policy count ({policyDistribution.commercial})
        </p>
      </div>
    </>
  )
}
