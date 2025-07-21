import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import mockData from "@/data/mockData.json";
import { CHART_COLORS } from "@/lib/chart-colors";

interface InsightProps {
  type: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

function InsightCard({ insight }: { insight: InsightProps }) {
  const getIconColor = () => {
    switch (insight.type) {
      case "growth":
        return CHART_COLORS.primary;
      case "opportunity":
        return CHART_COLORS.quinary;
      case "warning":
        return CHART_COLORS.secondary;
      default:
        return CHART_COLORS.primary;
    }
  };

  const getBorderColor = () => {
    switch (insight.type) {
      case "growth":
        return CHART_COLORS.primary;
      case "opportunity":
        return CHART_COLORS.quinary;
      case "warning":
        return CHART_COLORS.secondary;
      default:
        return CHART_COLORS.primary;
    }
  };

  const getButtonColor = () => {
    switch (insight.type) {
      case "growth":
        return CHART_COLORS.primary;
      case "opportunity":
        return CHART_COLORS.quinary;
      case "warning":
        return CHART_COLORS.secondary;
      default:
        return CHART_COLORS.primary;
    }
  };

  const getIcon = () => {
    switch (insight.type) {
      case "growth":
        return (
          <TrendingUp className="h-5 w-5" style={{ color: getIconColor() }} />
        );
      case "opportunity":
        return (
          <Lightbulb className="h-5 w-5" style={{ color: getIconColor() }} />
        );
      case "warning":
        return (
          <AlertTriangle
            className="h-5 w-5"
            style={{ color: getIconColor() }}
          />
        );
      default:
        return (
          <Lightbulb className="h-5 w-5" style={{ color: getIconColor() }} />
        );
    }
  };

  return (
    <div
      className="rounded-lg border-l-4 bg-white p-6 shadow-sm"
      style={{ borderLeftColor: getBorderColor() }}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-slate-100 p-2">{getIcon()}</div>
        <h3 className="text-base font-medium">{insight.title}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-600">{insight.description}</p>
      <div className="mt-4">
        <a
          href={insight.actionLink}
          className="inline-block rounded-md px-4 py-2 text-xs font-medium hover:opacity-80"
          style={{
            backgroundColor: `${getButtonColor()}20`,
            color: getButtonColor(),
          }}
        >
          {insight.actionText}
        </a>
      </div>
    </div>
  );
}

export function InsightsSection() {
  const insights = mockData.dashboard.insights;

  return (
    <section className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{insights.title}</h2>
        <div className="rounded-md bg-gradient-to-r from-primary-100 to-secondary-100 px-3 py-1 text-xs font-medium text-primary-700">
          Powered by nedl.ai
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {insights.items.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </div>
    </section>
  );
}
