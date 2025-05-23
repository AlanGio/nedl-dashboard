import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionCharts } from "@/components/dashboard/distribution-charts"
import { InsightsSection } from "@/components/dashboard/insights-section"
import { HeatmapChart } from "@/components/dashboard/heatmap-chart"
import { CoverageComparisonChart } from "@/components/dashboard/coverage-comparison-chart"
import { HealthcarePayersChart } from "@/components/dashboard/healthcare-payers-chart"
import { PayerCoverageTable } from "@/components/dashboard/payer-coverage-table"

export function DashboardContent() {
  return (
    <main className="pt-16 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-md text-gray-600">Analyze payer policies and coverage metrics across your network</p>
      </div>

      <MetricsGrid />

      {/* First row of charts - Replace DistributionCharts with CoverageComparisonChart */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DistributionCharts />
        <CoverageComparisonChart />
      </div>

      {/* Healthcare Payers Chart - Full Width */}
      <div className="mt-8 w-full h-540">
        <HealthcarePayersChart />
      </div>

      {/* Payer Coverage Table - Full Width */}
      <div className="mt-8 w-full">
        <PayerCoverageTable />
      </div>

      {/* Policy Update Activity - Full Width */}
      <div className="mt-8">
        <HeatmapChart />
      </div>

      <InsightsSection />
    </main>
  )
}
