"use client";

import { PerformanceSnapshot } from "./performance-snapshot";
import { OpportunitiesSection } from "./opportunities-section";
import { SpendUnderManagement } from "./spend-under-management";
import { TopMissingCodes } from "./top-missing-codes";
import { HCPCSCoverageComparison } from "./hcpcs-coverage-comparison";
import { CoverageAnalysisSection } from "./coverage-analysis-section";
import { KeyInsightsSection } from "../payer-analysis/key-insights-section";
import { PageHeader } from "@/components/ui/page-header";
import mockData from "@/data/mockData.json";

export function CodeCoverage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Code Coverage"
        description="Analyze code coverage metrics and identify improvement opportunities."
      />

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
        <SpendUnderManagement
          data={mockData.codeCoverage.spendUnderManagement}
        />
        <TopMissingCodes data={mockData.codeCoverage.topMissingCodes} />
      </div>

      {/* HCPCS Code Coverage Comparison */}
      <div className="mt-8">
        <HCPCSCoverageComparison />
      </div>

      {/* Coverage Analysis Section */}
      <div className="mt-8">
        <CoverageAnalysisSection />
      </div>

      {/* Key Insights Section */}
      <div className="mt-8">
        <KeyInsightsSection />
      </div>
    </div>
  );
}
