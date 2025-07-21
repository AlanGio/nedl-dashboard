import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { DistributionCharts } from "@/components/dashboard/distribution-charts";
import { InsightsSection } from "@/components/dashboard/insights-section";
import { HeatmapChart } from "@/components/dashboard/heatmap-chart";
import { CoverageComparisonChart } from "@/components/dashboard/coverage-comparison-chart";
import { HealthcarePayersChart } from "@/components/dashboard/healthcare-payers-chart";
import { PayerCoverageTable } from "@/components/dashboard/payer-coverage-table";
import { PageHeader } from "@/components/ui/page-header";

export function DashboardContent() {
  return (
    <main className="p-8">
      <PageHeader
        title="Dashboard"
        description="Analyze payer policies and coverage metrics across your network"
        className="mb-8"
      />

      <MetricsGrid />

      {/* First row of charts - Replace DistributionCharts with CoverageComparisonChart */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DistributionCharts />
        <CoverageComparisonChart />
      </div>

      {/* Healthcare Payers Chart - Full Width */}
      <div className="mt-8 w-full overflow-hidden">
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
  );
}
