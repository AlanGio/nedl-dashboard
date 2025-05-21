"use client"

import { useState, useRef, useEffect } from "react"
import { Users, Search, X } from "lucide-react"
import { PayerMetrics } from "./payer-metrics"
import { PayerDistributionChart } from "./payer-distribution-chart"
import { PolicyDistributionChart } from "./policy-distribution-chart"
import { CodeCoverageDonut } from "./code-coverage-donut"
import { CodeExplorerTable } from "./code-explorer-table"
import { useClickOutside } from "@/hooks/use-click-outside"
import mockData from "@/data/mockData.json"
import { cn } from "@/lib/utils"

export function PayerAnalysis() {
  // Add "All Payers" as the first option
  const allPayersList = ["All Payers", ...mockData.payersList]

  // State for autocomplete
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedPayer, setSelectedPayer] = useState(allPayersList[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPayers, setFilteredPayers] = useState(allPayersList)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false)
  })

  // Filter payers based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = allPayersList.filter((payer) => payer.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredPayers(filtered)
    } else {
      setFilteredPayers(allPayersList)
    }
  }, [searchQuery]) // Removed allPayersList from dependencies

  // Get data for the selected payer from mockData
  const getPayerData = () => {
    if (selectedPayer === "All Payers") {
      // Create aggregated data for all payers
      const allPayersData = {
        metrics: {
          totalPayers: {
            value: 543,
            label: "Total Payers",
          },
          livesCovered: {
            value: "125M+",
            label: "Lives Covered",
          },
          totalPolicies: {
            value: Object.values(mockData.payerAnalysis).reduce(
              (sum, payer: any) => sum + payer.metrics.totalPolicies.value,
              0,
            ),
            label: "Total Policies",
            subtitle: "Across all payers",
          },
          recentChanges: {
            value: Object.values(mockData.payerAnalysis).reduce(
              (sum, payer: any) => sum + payer.metrics.recentChanges.value,
              0,
            ),
            label: "Recent Changes",
            subtitle: "Last 30 days",
          },
        },
        distribution: {
          commercial: 45,
          medicare: 30,
          medicaid: 25,
        },
        policyDistribution:
          mockData.payerAnalysis[mockData.payersList[0] as keyof typeof mockData.payerAnalysis].policyDistribution,
        codeCoverage: {
          percentage: 78,
          details: {
            covered: 78,
            priorAuth: 12,
            notCovered: 10,
          },
        },
        codeExplorer:
          mockData.payerAnalysis[mockData.payersList[0] as keyof typeof mockData.payerAnalysis].codeExplorer,
      }
      return allPayersData
    }

    return (
      mockData.payerAnalysis[selectedPayer as keyof typeof mockData.payerAnalysis] ||
      mockData.payerAnalysis[mockData.payersList[0] as keyof typeof mockData.payerAnalysis]
    )
  }

  const payerData = getPayerData()

  return (
    <div className="p-8 mt-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Payer Analysis</h1>
        <p className="text-sm text-slate-500 mb-6">Analyze payer policies and coverage metrics across your network.</p>

        {/* Autocomplete Payer Selector */}
        <div className="bg-white border rounded-lg p-4 shadow-custom mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium text-slate-700">Select Payer:</span>
            </div>


            <div className="relative" ref={dropdownRef}>
              <div className="relative w-auto sm:max-w-md">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search payers..."
                  className="w-full rounded-lg border py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#449cfb] no-shadow" />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      inputRef.current?.focus()
                    }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 no-shadow"
                  >
                    <X className="h-4 w-4 text-slate-400 no-shadow" />
                  </button>
                )}
              </div>


              {isDropdownOpen && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {filteredPayers.length > 0 ? (
                    filteredPayers.map((payer) => (
                      <button
                        key={payer}
                        className={cn(
                          "w-full text-left px-4 py-3 hover:bg-slate-100 transition-colors",
                          selectedPayer === payer && "bg-primary-50 text-primary-600 font-medium",
                        )}
                        onClick={() => {
                          setSelectedPayer(payer)
                          setSearchQuery("")
                          setIsDropdownOpen(false)
                        }}
                      >
                        {payer}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-500">No payers found</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center mt-2">
              <span className="text-sm text-slate-600 mr-2">Selected:</span>
              <span className="font-medium text-primary-700">{selectedPayer}</span>
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
