"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import mockData from "@/data/mockData.json"
import { PayerDistributionChart } from "./payer-distribution-chart"
import { PolicyDistributionTable } from "./policy-distribution-table"
import { CodeCoverageDonut } from "./code-coverage-donut"
import { CodeExplorerTable } from "./code-explorer-table"
import { PayerDetailsTable } from "./payer-details-table"
import { PayerMetrics } from "./payer-metrics"

export function PayerAnalysis() {
  const [selectedPayer, setSelectedPayer] = useState("All Payers")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
      // For "All Payers", use BCBSNC data as a fallback
      const fallbackKey = "BCBSNC"
      return {
        metrics: mockData.payerAnalysis[fallbackKey].metrics,
        distribution: mockData.payerAnalysis[fallbackKey].distribution,
        policyDistribution: mockData.payerAnalysis[fallbackKey].policyDistribution,
        codeCoverage: mockData.payerAnalysis[fallbackKey].codeCoverage,
        codeExplorer: mockData.payerAnalysis[fallbackKey].codeExplorer,
      }
    }

    // Get the mapped key for the selected payer
    const mappedKey = payerMapping[payerName] || "BCBSNC" // Default to BCBSNC if no mapping exists

    return {
      metrics: mockData.payerAnalysis[mappedKey].metrics,
      distribution: mockData.payerAnalysis[mappedKey].distribution,
      policyDistribution: mockData.payerAnalysis[mappedKey].policyDistribution,
      codeCoverage: mockData.payerAnalysis[mappedKey].codeCoverage,
      codeExplorer: mockData.payerAnalysis[mappedKey].codeExplorer,
    }
  }

  const payerData = getPayerData(selectedPayer)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payer Analysis</h1>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 shadow-sm"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedPayer}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-64 rounded-md border bg-white shadow-lg">
              <div className="max-h-96 overflow-y-auto p-2">
                <button
                  className={`w-full rounded-md px-4 py-2 text-left hover:bg-gray-100 ${
                    selectedPayer === "All Payers" ? "bg-primary-50 text-primary-600" : ""
                  }`}
                  onClick={() => {
                    setSelectedPayer("All Payers")
                    setIsDropdownOpen(false)
                  }}
                >
                  All Payers
                </button>
                {mockData.payersList.map((payer) => (
                  <button
                    key={payer}
                    className={`w-full rounded-md px-4 py-2 text-left hover:bg-gray-100 ${
                      selectedPayer === payer ? "bg-primary-50 text-primary-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedPayer(payer)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {payer}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <PayerMetrics metrics={payerData.metrics} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PayerDistributionChart distribution={payerData.distribution} />
        <CodeCoverageDonut codeCoverage={payerData.codeCoverage} />
      </div>

      <PolicyDistributionTable policyDistribution={payerData.policyDistribution} />

      <CodeExplorerTable codeExplorer={payerData.codeExplorer} />

      <PayerDetailsTable />
    </div>
  )
}
