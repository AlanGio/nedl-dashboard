import type React from "react";
import { useState } from "react";
import {
  FileText,
  Clock,
  History,
  CheckCircle,
  Filter,
  Plus,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import mockData from "@/data/mockData.json";
import { SearchPolicies } from "@/components/search-policies/search-policies";
import { WrittenPolicyCoverageTable } from "@/components/policies/written-policy-coverage-table";
import { KeyInsightsSection } from "@/components/payer-analysis/key-insights-section";
import { PageHeader } from "@/components/ui/page-header";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  subtitle?: string;
  iconBgColor?: string;
  iconColor?: string;
}

function MetricCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  subtitle,
  iconBgColor = "bg-primary-100",
  iconColor = "text-primary-600",
}: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-custom">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-slate-500">{title}</h3>
        <div className={cn("rounded-full p-2 no-shadow", iconBgColor)}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p
            className={cn(
              "mt-1 text-xs",
              changeType === "increase"
                ? "text-primary-600"
                : changeType === "decrease"
                ? "text-secondary-600"
                : ""
            )}
          >
            {change}
          </p>
        )}
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

// Helper function to get the icon component based on the icon name from the data
function getIconComponent(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    FileText: <FileText className="h-5 w-5 no-shadow" />,
    Clock: <Clock className="h-5 w-5 no-shadow" />,
    History: <History className="h-5 w-5 no-shadow" />,
    CheckCircle: <CheckCircle className="h-5 w-5 no-shadow" />,
    Eye: <Eye className="h-5 w-5 no-shadow" />,
  };
  return icons[iconName] || <FileText className="h-5 w-5 no-shadow" />;
}

export function PolicyCommandCenter() {
  const { metrics } = mockData.allPolicies;
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  // Handle policy selection from SearchPolicies
  const handlePolicySelect = (policyId: string) => {
    setSelectedPolicies((prev) =>
      prev.includes(policyId)
        ? prev.filter((id) => id !== policyId)
        : [...prev, policyId]
    );
  };

  // Handle remove policy from comparison
  const handleRemovePolicy = (policyId: string) => {
    setSelectedPolicies((prev) => prev.filter((id) => id !== policyId));
  };

  // Update the updatedMetrics colors
  const updatedMetrics = {
    ...metrics,
    activePolicies: {
      ...metrics.activePolicies,
      iconBgColor: "bg-primary-100",
      iconColor: "text-primary-600",
    },
    needReview: {
      ...metrics.needReview,
      iconBgColor: "bg-secondary-100",
      iconColor: "text-secondary-600",
    },
    recentUpdates: {
      ...metrics.recentUpdates,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    complianceScore: {
      ...metrics.complianceScore,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  };

  return (
    <div>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <PageHeader
              title={mockData.allPolicies.title}
              description={mockData.allPolicies.subtitle}
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-xs font-medium shadow-custom hover:bg-slate-50">
              <Filter className="h-4 w-4 no-shadow" />
              Filter View
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-xs font-medium text-white shadow-custom hover:bg-primary-700">
              <Plus className="h-4 w-4 no-shadow" />
              New Policy
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Policies"
            value={updatedMetrics.activePolicies.value}
            icon={getIconComponent(updatedMetrics.activePolicies.icon)}
            change={updatedMetrics.activePolicies.change}
            changeType={
              updatedMetrics.activePolicies.changeType as
                | "increase"
                | "decrease"
                | "neutral"
            }
            iconBgColor={updatedMetrics.activePolicies.iconBgColor}
            iconColor={updatedMetrics.activePolicies.iconColor}
          />
          <MetricCard
            title="Need Review"
            value={updatedMetrics.needReview.value}
            icon={getIconComponent(updatedMetrics.needReview.icon)}
            change={updatedMetrics.needReview.change}
            changeType={
              updatedMetrics.needReview.changeType as
                | "increase"
                | "decrease"
                | "neutral"
            }
            iconBgColor={updatedMetrics.needReview.iconBgColor}
            iconColor={updatedMetrics.needReview.iconColor}
          />
          <MetricCard
            title="Recent Updates"
            value={updatedMetrics.recentUpdates.value}
            icon={getIconComponent(updatedMetrics.recentUpdates.icon)}
            subtitle={updatedMetrics.recentUpdates.subtitle}
            iconBgColor={updatedMetrics.recentUpdates.iconBgColor}
            iconColor={updatedMetrics.recentUpdates.iconColor}
          />
          <MetricCard
            title="Confidence Score"
            value={updatedMetrics.complianceScore.value}
            icon={getIconComponent(updatedMetrics.complianceScore.icon)}
            change={updatedMetrics.complianceScore.change}
            changeType={
              updatedMetrics.complianceScore.changeType as
                | "increase"
                | "decrease"
                | "neutral"
            }
            iconBgColor={updatedMetrics.complianceScore.iconBgColor}
            iconColor={updatedMetrics.complianceScore.iconColor}
          />
        </div>

        {/* Search Policies Component */}
        <div className="mb-8">
          <SearchPolicies
            selectedPolicies={selectedPolicies}
            onPolicySelect={handlePolicySelect}
            onRemovePolicy={handleRemovePolicy}
          />
        </div>

        {/* Written Policy Coverage Table */}
        <div className="mb-8">
          <WrittenPolicyCoverageTable selectedPolicies={selectedPolicies} />
        </div>

        {/* Key Insights Section */}
        <div className="mb-8">
          <KeyInsightsSection />
        </div>
      </div>
    </div>
  );
}
