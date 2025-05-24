"use client"

import { cn } from "@/lib/utils"
import mockData from "@/data/mockData.json"

export function HealthcarePayerProfilesTable() {
  const payersData = mockData.payersData

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Commercial":
        return "bg-blue-100 text-blue-800"
      case "Medicare":
        return "bg-green-100 text-green-800"
      case "Medicaid":
        return "bg-purple-100 text-purple-800"
      case "Integrated":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case "National":
        return "text-blue-600"
      case "Regional":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const formatCoveredLives = (lives: number) => {
    if (lives >= 1000000) {
      return `${(lives / 1000000).toFixed(1)}M`
    }
    return `${lives.toLocaleString()}`
  }

  const getCoverage = (payer: any) => {
    return payer.national === 1 ? "National" : "Regional"
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-6">Healthcare Payer Profiles</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Payer Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Covered Lives</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Coverage</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Specialty Coverage</th>
            </tr>
          </thead>
          <tbody>
            {payersData.map((payer, index) => (
              <tr
                key={payer.rank}
                className={cn("border-b border-gray-100", index % 2 === 0 ? "bg-white" : "bg-gray-50")}
              >
                <td className="py-3 px-4 text-sm text-gray-900">{payer.rank}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{payer.name}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{formatCoveredLives(payer.coveredLives)}</td>
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      "inline-flex px-2 py-1 text-xs font-medium rounded-full no-shadow",
                      getTypeColor(payer.type),
                    )}
                  >
                    {payer.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={cn("text-sm font-medium", getCoverageColor(getCoverage(payer)))}>
                    {getCoverage(payer)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">{payer.specialties || "General Medical"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
