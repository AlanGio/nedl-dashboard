import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionCharts } from "@/components/dashboard/distribution-charts"
import { CodeCoverageStatus } from "@/components/dashboard/code-coverage-status"
import { InsightsSection } from "@/components/dashboard/insights-section"
import { TrendLineChart } from "@/components/dashboard/trend-line-chart"
import { StackedBarChart } from "@/components/dashboard/stacked-bar-chart"
import { HeatmapChart } from "@/components/dashboard/heatmap-chart"
import { BubbleChart } from "@/components/dashboard/bubble-chart"

export function DashboardContent() {
  return (
    <main className="pt-16 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-md text-gray-600">Analyze payer policies and coverage metrics across your network</p>
      </div>

      <MetricsGrid />

      {/* First row of charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DistributionCharts />
      </div>

      {/* Second row of charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <BubbleChart />
        <CodeCoverageStatus />
      </div>

      {/* New row with trend line and stacked bar charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TrendLineChart />
        <StackedBarChart />
      </div>

      {/* Policy Update Activity - Full Width */}
      <div className="mt-8">
        <HeatmapChart />
      </div>

      <InsightsSection />
    </main>
  )
}
