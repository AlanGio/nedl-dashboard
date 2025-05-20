"use client"

import { BookmarkMetrics } from "./bookmark-metrics"
import { PayerDistributionChart } from "./payer-distribution-chart"
import { PolicyDistributionTable } from "./policy-distribution-table"
import { PayerDetailsTable } from "./payer-details-table"
import { CodeCoverageDonut } from "./code-coverage-donut"
import { CodeExplorerTable } from "./code-explorer-table"
import mockData from "@/data/mockData.json"

export function Bookmarked() {
  const { metrics, payerDistribution, policyDistributionTable, payerDetails, codeCoverage, codeExplorer } =
    mockData.bookmarked

  return (
    <div className="p-8 mt-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Payer Analysis</h1>
        <p className="text-sm text-slate-500 mb-6">Analyze payer policies and coverage metrics across your network.</p>
      </div>

      {/* Metrics Cards */}
      <div className="mb-8">
        <BookmarkMetrics metrics={metrics} />
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        <PayerDistributionChart distribution={payerDistribution} />
        <PolicyDistributionTable data={policyDistributionTable} />
      </div>

      {/* Payer Details */}
      <div className="mb-8">
        <h2 className="text-base font-semibold mb-4">Payer Details</h2>
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-8">
          <PayerDetailsTable tableData={payerDetails[0]} />
        </div>
      </div>

      {/* Second Payer Details */}
      <div className="mb-8">
        <h2 className="text-base font-semibold mb-4">Payer Details</h2>
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-8">
          <PayerDetailsTable tableData={payerDetails[1]} />
        </div>
      </div>

      {/* Code Coverage and Explorer */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-base font-semibold">Donut Chart</h2>
            <span className="mx-2">›</span>
            <h2 className="text-base font-semibold text-slate-600">Code Coverage</h2>
          </div>
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <CodeCoverageDonut coverage={codeCoverage} />
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold mb-4">Code Explorer</h2>
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <CodeExplorerTable data={codeExplorer} />
          </div>
        </div>
      </div>
    </div>
  )
}
