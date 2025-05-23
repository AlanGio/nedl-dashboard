"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Define the data structure
interface PolicyCoverageData {
  payer: string
  totalPolicies: number
  hcpcsCodes: number
  modifiers: number
}

// Data from the table
const policyData: PolicyCoverageData[] = [
  { payer: "BCBS North Carolina", totalPolicies: 450, hcpcsCodes: 8200, modifiers: 320 },
  { payer: "UnitedHealthcare", totalPolicies: 850, hcpcsCodes: 12500, modifiers: 450 },
  { payer: "Elevance Health", totalPolicies: 780, hcpcsCodes: 11800, modifiers: 420 },
  { payer: "BCBS Texas (HCSC)", totalPolicies: 520, hcpcsCodes: 9000, modifiers: 340 },
  { payer: "BCBS Florida", totalPolicies: 480, hcpcsCodes: 8500, modifiers: 310 },
  { payer: "BCBS Michigan", totalPolicies: 440, hcpcsCodes: 8000, modifiers: 300 },
  { payer: "Kaiser Permanente", totalPolicies: 620, hcpcsCodes: 9500, modifiers: 380 },
  { payer: "CVS Health/Aetna", totalPolicies: 720, hcpcsCodes: 11000, modifiers: 400 },
  { payer: "Cigna", totalPolicies: 690, hcpcsCodes: 10500, modifiers: 380 },
  { payer: "Other BCBS (Avg)", totalPolicies: 420, hcpcsCodes: 7800, modifiers: 290 },
]

// Normalize the data for better visualization
const normalizedData = policyData.map((item) => ({
  payer: item.payer,
  totalPolicies: item.totalPolicies,
  hcpcsCodes: Math.round(item.hcpcsCodes / 100), // Divide by 100 to make it comparable on the same scale
  modifiers: item.modifiers,
}))

export function PolicyCoverageChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payer Policy Coverage Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            totalPolicies: {
              label: "Total Policies",
              color: "hsl(var(--chart-1))",
            },
            hcpcsCodes: {
              label: "HCPCS Codes (÷100)",
              color: "hsl(var(--chart-2))",
            },
            modifiers: {
              label: "Modifiers",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={normalizedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 120,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="payer" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="totalPolicies" name="Total Policies" fill="var(--color-totalPolicies)" />
              <Bar dataKey="hcpcsCodes" name="HCPCS Codes (÷100)" fill="var(--color-hcpcsCodes)" />
              <Bar dataKey="modifiers" name="Modifiers" fill="var(--color-modifiers)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-xs text-muted-foreground">
          <p>* HCPCS Codes values are divided by 100 for better visualization on the same scale</p>
        </div>
      </CardContent>
    </Card>
  )
}
