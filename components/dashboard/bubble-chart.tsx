"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Filter } from "lucide-react"
import mockData from "@/data/mockData.json"

export function BubbleChart() {
  const { title, data } = mockData.dashboard.bubbleChart

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <button className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-[10px]">
          <Filter className="mr-2 h-3 w-3 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="adoptionRate"
              name="Adoption Rate"
              unit="%"
              domain={[0, 100]}
              label={{ value: "Adoption Rate (%)", position: "insideBottom", offset: -10, fontSize: 10 }}
              tick={{ fontSize: 9 }}
            />
            <YAxis
              type="number"
              dataKey="coverageRate"
              name="Coverage Rate"
              unit="%"
              domain={[0, 100]}
              label={{ value: "Coverage Rate (%)", angle: -90, position: "insideLeft", fontSize: 10 }}
              tick={{ fontSize: 9 }}
            />
            <ZAxis type="number" dataKey="policyCount" range={[40, 300]} name="Policy Count" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => {
                if (name === "Policy Count") return [`${value}`, "Policies"]
                return [`${value}%`, name]
              }}
              contentStyle={{ fontSize: "11px" }}
              itemStyle={{ fontSize: "11px" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "11px",
                paddingTop: "16px", // Move the legend down by 16px
              }}
            />
            {data.map((entry, index) => (
              <Scatter key={`scatter-${index}`} name={entry.name} data={[entry]} fill={entry.color} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-500">
        Bubble size represents the number of policies in each specialty
      </p>
    </div>
  )
}
