"use client"

import { PerformanceSnapshot } from "./performance-snapshot"
import { OpportunitiesSection } from "./opportunities-section"
import { SpendUnderManagement } from "./spend-under-management"
import { TopMissingCodes } from "./top-missing-codes"
import mockData from "@/data/mockData.json"

export function CodeCoverage() {
  return (
    <div className="p-8 mt-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Code Coverage</h1>
        <p className="text-sm text-slate-500">Analyze code coverage metrics and identify improvement opportunities.</p>
      </div>

      {/* Performance Snapshot Section */}
      <div className="mt-8">
        <PerformanceSnapshot data={mockData.codeCoverage.performanceSnapshot} />
      </div>

      {/* Opportunities Section */}
      <div className="mt-8">
        <OpportunitiesSection />
      </div>

      {/* Data Visualization Section */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SpendUnderManagement data={mockData.codeCoverage.spendUnderManagement} />
        <TopMissingCodes data={mockData.codeCoverage.topMissingCodes} />
      </div>
    </div>
  )
}
