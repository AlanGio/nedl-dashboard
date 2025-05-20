import { FileText, Users, BookOpen, FileCheck, Clock } from "lucide-react"
import { MetricCard } from "@/components/dashboard/metric-card"
import mockData from "@/data/mockData.json"

// Map icon names to components
const iconMap: Record<string, JSX.Element> = {
  FileText: <FileText className="h-5 w-5 text-primary-600" />,
  Users: <Users className="h-5 w-5 text-secondary-600" />,
  BookOpen: <BookOpen className="h-5 w-5 text-blue-600" />,
  FileCheck: <FileCheck className="h-5 w-5 text-purple-600" />,
  Clock: <Clock className="h-5 w-5 text-gray-700" />,
}

export function MetricsGrid() {
  const metrics = mockData.dashboard.metrics

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title={metrics.totalPayers.title}
        value={metrics.totalPayers.value}
        icon={iconMap[metrics.totalPayers.icon] || iconMap.FileText}
        change={metrics.totalPayers.change}
        changeType={metrics.totalPayers.changeType}
        period={metrics.totalPayers.period}
        iconBgColor={metrics.totalPayers.iconBgColor}
      />
      <MetricCard
        title={metrics.livesCovered.title}
        value={`${metrics.livesCovered.value}${metrics.livesCovered.unit}`}
        icon={iconMap[metrics.livesCovered.icon] || iconMap.Users}
        change={metrics.livesCovered.change}
        changeUnit={metrics.livesCovered.changeUnit}
        changeType={metrics.livesCovered.changeType}
        period={metrics.livesCovered.period}
        iconBgColor={metrics.livesCovered.iconBgColor}
        subtitle={metrics.livesCovered.subtitle}
      />
      <MetricCard
        title={metrics.totalPolicies.title}
        value={metrics.totalPolicies.value}
        icon={iconMap[metrics.totalPolicies.icon] || iconMap.BookOpen}
        subtitle={metrics.totalPolicies.subtitle}
        iconBgColor={metrics.totalPolicies.iconBgColor}
      />
      <MetricCard
        title={metrics.codeCoverage.title}
        value={`${metrics.codeCoverage.value}${metrics.codeCoverage.unit}`}
        icon={iconMap[metrics.codeCoverage.icon] || iconMap.FileCheck}
        change={metrics.codeCoverage.change}
        changeType={metrics.codeCoverage.changeType}
        period={metrics.codeCoverage.period}
        iconBgColor={metrics.codeCoverage.iconBgColor}
      />
      <MetricCard
        title={metrics.recentChanges.title}
        value={metrics.recentChanges.value}
        icon={iconMap[metrics.recentChanges.icon] || iconMap.Clock}
        change={metrics.recentChanges.change}
        changeType={metrics.recentChanges.changeType}
        period={metrics.recentChanges.period}
        iconBgColor={metrics.recentChanges.iconBgColor}
      />
    </div>
  )
}
