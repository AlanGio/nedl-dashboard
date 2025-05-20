"use client"

import { useState, useRef } from "react"
import { ChevronDown, Users } from "lucide-react"
import { PayerMetrics } from "./payer-metrics"
import { PayerDistributionChart } from "./payer-distribution-chart"
import { PolicyDistributionChart } from "./policy-distribution-chart"
import { CodeCoverageDonut } from "./code-coverage-donut"
import { CodeExplorerTable } from "./code-explorer-table"
import { useClickOutside } from "@/hooks/use-click-outside"
import mockData from "@/data/mockData.json"
import { cn } from "@/lib/utils"

export function PayerAnalysis() {
  const payersList = mockData.payersList

  // State for dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedPayer, setSelectedPayer] = useState(payersList[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false)
  })

  // Get data for the selected payer from mockData
  const payerData =
    mockData.payerAnalysis[selectedPayer as keyof typeof mockData.payerAnalysis] ||
    mockData.payerAnalysis[payersList[0] as keyof typeof mockData.payerAnalysis]

  return (
    <div className="p-8 mt-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Payer Analysis</h1>
        <p className="text-sm text-slate-500 mb-6">Analyze payer policies and coverage metrics across your network.</p>

        {/* Prominent Payer Selector */}
        <div className="bg-white border rounded-lg p-4 shadow-custom mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium text-slate-700">Select Payer:</span>
            </div>

            <div className="relative flex-grow" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full sm:max-w-md gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-primary-700">{selectedPayer}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-500 transition-transform",
                    isDropdownOpen && "transform rotate-180",
                  )}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {payersList.map((payer) => (
                    <button
                      key={payer}
                      className={cn(
                        "w-full text-left px-4 py-3 hover:bg-slate-100 transition-colors",
                        selectedPayer === payer && "bg-primary-50 text-primary-600 font-medium",
                      )}
                      onClick={() => {
                        setSelectedPayer(payer)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {payer}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mb-8">
        <PayerMetrics metrics={payerData.metrics} />
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        <PayerDistributionChart distribution={payerData.distribution} />
        <PolicyDistributionChart data={payerData.policyDistribution} />
      </div>

      {/* Code Coverage and Explorer */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-base font-semibold">Coverage Analysis</h2>
            <span className="mx-2">›</span>
            <h2 className="text-base font-semibold text-slate-600">Code Coverage</h2>
          </div>
          <div className="bg-white rounded-lg border shadow-sm p-6 h-[400px] flex flex-col">
            <CodeCoverageDonut coverage={payerData.codeCoverage} />
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold mb-4">Code Explorer</h2>
          <div className="bg-white rounded-lg border shadow-sm p-6 h-[400px] flex flex-col">
            <div className="overflow-y-auto flex-grow">
              <CodeExplorerTable data={payerData.codeExplorer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
