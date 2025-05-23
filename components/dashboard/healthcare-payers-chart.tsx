"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import mockData from "@/data/mockData.json"

export function HealthcarePayersChart() {
  // Transform the payers data to match the chart format
  const chartData = mockData.payersData.map((payer) => {
    // Replace the category determination logic with:
    let category = "Other Payers"

    if (payer.name === "BCBS North Carolina") {
      category = "BCBS NC"
    }

    return {
      name: payer.name,
      coveredLives: payer.coveredLives / 1000000, // Convert to millions
      category: category,
      // Set the value for the appropriate category, others will be 0
      "BCBS NC": category === "BCBS NC" ? payer.coveredLives / 1000000 : 0,
      "Other Payers": category === "Other Payers" ? payer.coveredLives / 1000000 : 0,
    }
  })

  // Sort by covered lives descending to match the original chart
  const sortedData = chartData.sort((a, b) => b.coveredLives - a.coveredLives)

  return (
    <Card className="w-full h-600">
      <CardHeader>
        <CardTitle>Healthcare Payers by Covered Lives</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[590px]">
        <ChartContainer
          className="w-full h-auto"
          config={{
            "BCBS NC": {
              label: "BCBS NC",
              color: "#F087FB", // Pink for BCBS NC
            },
            "Other Payers": {
              label: "Other Payers",
              color: "#449CFB", // Blue for all other payers
            },
          }}
        >
          <BarChart
            data={sortedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 120,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={140} tick={{ fontSize: 10 }} interval={0} />
            <YAxis label={{ value: "Covered Lives (Millions)", angle: -90, position: "insideLeft" }} domain={[0, 60]} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value, name) => [value > 0 ? `${value.toFixed(1)}M` : null, name]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            <Bar dataKey="BCBS NC" name="BCBS NC" fill="#F087FB" stackId="stack" />
            <Bar dataKey="Other Payers" name="Other Payers" fill="#449CFB" stackId="stack" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
