"use client"

import { useState } from "react"
import { Search, Users } from "lucide-react"
import mockData from "@/data/mockData.json"
import { PayerDistributionChart } from "./payer-distribution-chart"
import { PolicyDistributionChart } from "./policy-distribution-chart"
import { CodeCoverageDonut } from "./code-coverage-donut"
import { CodeExplorerTable } from "./code-explorer-table"
import { HealthcarePayerProfilesTable } from "./healthcare-payer-profiles-table"
import { KeyInsightsSection } from "./key-insights-section"

export function PayerAnalysis() {
  const [selectedPayer, setSelectedPayer] = useState("All Payers")
  const [searchTerm, setSearchTerm] = useState("")

  // Create a mapping between the new payer names and the existing data keys
  const payerMapping: Record<string, string> = {
    "BCBS North Carolina": "BCBSNC",
    UnitedHealthcare: "United",
    "Elevance Health (Anthem)": "Elevance Health (formerly Anthem)",
    "BCBS Texas (HCSC)": "Health Care Service Corporation (HCSC)",
    "BCBS Florida (GuideWell)": "BCBSNC", // Map to existing data
    "BCBS Michigan": "BCBSNC", // Map to existing data
    "BCBS Illinois (HCSC)": "Health Care Service Corporation (HCSC)",
    "Highmark BCBS": "BCBSNC", // Map to existing data
    "Kaiser Permanente": "Kaiser Permanente",
    Centene: "Centene Corp.",
    Humana: "Humana",
    "CVS Health/Aetna": "CVS Health (including Aetna)",
    Cigna: "Cigna",
    "Molina Healthcare": "Molina Healthcare",
    "BCBS Massachusetts": "BCBSNC", // Map to existing data
    "BCBS Tennessee": "BCBSNC", // Map to existing data
    "CareFirst BCBS": "BCBSNC", // Map to existing data
    "Independence BCBS": "BCBSNC", // Map to existing data
    WellCare: "Centene Corp.", // WellCare is part of Centene
    "Anthem BCBS (Other States)": "Elevance Health (formerly Anthem)",
  }

  const getPayerData = (payerName: string) => {
    if (payerName === "All Payers") {
      // For "All Payers", use aggregated data
      return {
        metrics: {
          totalPayers: { value: 543, label: "Total Payers" },
          livesCovered: { value: "125M+", label: "Lives Covered" },
          totalPolicies: { value: 14750, label: "Total Policies", subtitle: "Across all payers" },
          recentChanges: { value: 421, label: "Recent Changes", subtitle: "Last 30 days" },
        },
        distribution: { commercial: 45, medicare: 30, medicaid: 25 },
        policyDistribution: mockData.payerAnalysis.BCBSNC.policyDistribution,
        codeCoverage: { percentage: 78, details: { covered: 78, priorAuth: 12, notCovered: 10 } },
        codeExplorer: mockData.payerAnalysis.BCBSNC.codeExplorer,
      }
    }

    // Get the mapped key for the selected payer
    const mappedKey = payerMapping[payerName] || "BCBSNC"

    return {
      metrics: mockData.payerAnalysis[mappedKey].metrics,
      distribution: mockData.payerAnalysis[mappedKey].distribution,
      policyDistribution: mockData.payerAnalysis[mappedKey].policyDistribution,
      codeCoverage: mockData.payerAnalysis[mappedKey].codeCoverage,
      codeExplorer: mockData.payerAnalysis[mappedKey].codeExplorer,
    }
  }

  const payerData = getPayerData(selectedPayer)

  const filteredPayers = mockData.payersList.filter((payer) => payer.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payer Analysis</h1>
        <p className="text-sm text-gray-600">Analyze payer policies and coverage metrics across your network</p>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Select Payer:</span>
          </div>

          <div className="flex-1 max-w-lg relative">
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(90deg, #449CFB, #F087FB) border-box",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "transparent",
              }}
            >
              <input
                type="text"
                placeholder="Search payers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-0 py-3 px-6 focus:outline-none bg-white text-sm"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
            </div>

            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b text-sm"
                  onClick={() => {
                    setSelectedPayer("All Payers")
                    setSearchTerm("")
                  }}
                >
                  All Payers
                </button>
                {filteredPayers.map((payer) => (
                  <button
                    key={payer}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b last:border-b-0 text-sm"
                    onClick={() => {
                      setSelectedPayer(payer)
                      setSearchTerm("")
                    }}
                  >
                    {payer}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            Selected: <span className="font-medium text-blue-600">{selectedPayer}</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500">{payerData.metrics.totalPayers.label}</h3>
          <p className="text-2xl font-bold mt-2">{payerData.metrics.totalPayers.value}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500">{payerData.metrics.livesCovered.label}</h3>
          <p className="text-2xl font-bold mt-2">{payerData.metrics.livesCovered.value}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500">{payerData.metrics.totalPolicies.label}</h3>
          <p className="text-2xl font-bold mt-2">{payerData.metrics.totalPolicies.value}</p>
          {payerData.metrics.totalPolicies.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{payerData.metrics.totalPolicies.subtitle}</p>
          )}
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500">{payerData.metrics.recentChanges.label}</h3>
          <p className="text-2xl font-bold mt-2">{payerData.metrics.recentChanges.value}</p>
          {payerData.metrics.recentChanges.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{payerData.metrics.recentChanges.subtitle}</p>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PayerDistributionChart distribution={payerData.distribution} />
        <PolicyDistributionChart data={payerData.policyDistribution} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg border p-6 h-[400px] flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-semibold">Coverage Analysis</h2>
            <p className="text-sm text-gray-600">Code Coverage</p>
          </div>
          <div className="flex-1">
            <CodeCoverageDonut codeCoverage={payerData.codeCoverage} />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6 h-[400px] flex flex-col">
          <h2 className="text-base font-semibold mb-4">Code Explorer</h2>
          <div className="flex-1 overflow-hidden">
            <CodeExplorerTable codeExplorer={payerData.codeExplorer} />
          </div>
        </div>
      </div>

      {/* Healthcare Payer Profiles Table */}
      <HealthcarePayerProfilesTable />

      {/* Key Insights Section */}
      <KeyInsightsSection />
    </div>
  )
}
