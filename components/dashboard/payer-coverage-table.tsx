"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import mockData from "@/data/mockData.json"

export function PayerCoverageTable() {
  // Use the policy coverage data from mockData
  const payerData = mockData.dashboard.policyCoverageData

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payer Coverage Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-slate-500">Payer Name</th>
                <th className="text-right p-3 text-sm font-medium text-slate-500">Total Policies</th>
                <th className="text-right p-3 text-sm font-medium text-slate-500">HCPCS Codes Covered</th>
                <th className="text-right p-3 text-sm font-medium text-slate-500">Modifiers Covered</th>
              </tr>
            </thead>
            <tbody>
              {payerData.map((payer, index) => (
                <tr
                  key={payer.payer}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#F6F6F6]"} hover:bg-blue-50`}
                >
                  <td className="p-3 text-sm font-medium text-slate-700">{payer.payer}</td>
                  <td className="p-3 text-sm text-right text-slate-700">{payer.totalPolicies.toLocaleString()}</td>
                  <td className="p-3 text-sm text-right text-slate-700">{payer.hcpcsCodes.toLocaleString()}</td>
                  <td className="p-3 text-sm text-right text-slate-700">{payer.modifiers.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <p>* Data represents current policy coverage metrics across major healthcare payers</p>
        </div>
      </CardContent>
    </Card>
  )
}
