import type React from "react"
import { FileText, Clock, History, CheckCircle, Filter, Plus, MoreHorizontal, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import mockData from "@/data/mockData.json"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: string
  changeType?: "increase" | "decrease" | "neutral"
  subtitle?: string
  iconBgColor?: string
  iconColor?: string
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
              changeType === "increase" ? "text-primary-600" : changeType === "decrease" ? "text-secondary-600" : "",
            )}
          >
            {change}
          </p>
        )}
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}

interface TimelineItemProps {
  title: string
  description: string
  status: string
  statusColor: string
  icon: React.ReactNode
  iconBg: string
  author: {
    initials: string
    name: string
    color: string
  }
  time: string
}

function TimelineItem({ title, description, status, statusColor, icon, iconBg, author, time }: TimelineItemProps) {
  return (
    <div className="flex gap-4 py-4 pl-4">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full no-shadow", iconBg)}>{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium no-shadow", statusColor)}>{status}</span>
        </div>
        <p className="text-xs text-slate-600">{description}</p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white no-shadow",
              author.color,
            )}
          >
            {author.initials}
          </span>
          <span className="text-[10px] text-slate-500">
            {author.name} • {time}
          </span>
        </div>
      </div>
    </div>
  )
}

interface AlertProps {
  title: string
  description: string
  time: string
  color: string
  actions: {
    primary: {
      label: string
      color: string
    }
    secondary?: {
      label: string
    }
  }
}

function Alert({ title, description, time, color, actions }: AlertProps) {
  return (
    <div className="mb-4 border-l-4 bg-white p-4 shadow-custom" style={{ borderLeftColor: color }}>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-slate-500">{time}</span>
      </div>
      <p className="mb-3 text-xs text-slate-600">{description}</p>
      <div className="flex gap-2">
        {actions.secondary && (
          <button className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 no-shadow">
            {actions.secondary.label}
          </button>
        )}
        <button
          className="rounded-md px-3 py-1.5 text-xs font-medium text-white no-shadow"
          style={{ backgroundColor: actions.primary.color }}
        >
          {actions.primary.label}
        </button>
      </div>
    </div>
  )
}

// Helper function to get the icon component based on the icon name from the data
function getIconComponent(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    FileText: <FileText className="h-5 w-5 no-shadow" />,
    Clock: <Clock className="h-5 w-5 no-shadow" />,
    History: <History className="h-5 w-5 no-shadow" />,
    CheckCircle: <CheckCircle className="h-5 w-5 no-shadow" />,
    Eye: <Eye className="h-5 w-5 no-shadow" />,
  }
  return icons[iconName] || <FileText className="h-5 w-5 no-shadow" />
}

export function PolicyCommandCenter() {
  const { metrics, timeline, alerts } = mockData.allPolicies

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
  }

  // Update the updatedTimeline colors
  const updatedTimeline = timeline.map((item) => ({
    ...item,
    iconBg: item.iconBg
      .replace("bg-emerald-100", "bg-primary-100")
      .replace("bg-amber-100", "bg-secondary-100")
      .replace("bg-blue-100", "bg-blue-100")
      .replace("bg-purple-100", "bg-purple-100"),
    iconColor: item.iconColor
      .replace("text-emerald-500", "text-primary-600")
      .replace("text-amber-500", "text-secondary-600")
      .replace("text-blue-500", "text-blue-600")
      .replace("text-purple-500", "text-purple-600"),
    statusColor: item.statusColor
      .replace("bg-emerald-100 text-emerald-800", "bg-primary-100 text-primary-800")
      .replace("bg-amber-100 text-amber-800", "bg-secondary-100 text-secondary-800")
      .replace("bg-blue-100 text-blue-800", "bg-blue-100 text-blue-800")
      .replace("bg-purple-100 text-purple-800", "bg-purple-100 text-purple-800"),
  }))

  // Update the updatedAlerts colors
  const updatedAlerts = alerts.map((alert) => ({
    ...alert,
    color:
      alert.color === "#ef4444"
        ? "#F087FB"
        : alert.color === "#f97316"
          ? "#0071EA"
          : alert.color === "#eab308"
            ? "#8A287F"
            : alert.color === "#3b82f6"
              ? "#449CFB"
              : alert.color,
    actions: {
      ...alert.actions,
      primary: {
        ...alert.actions.primary,
        color:
          alert.actions.primary.color === "#ef4444"
            ? "#F087FB"
            : alert.actions.primary.color === "#f97316"
              ? "#0071EA"
              : alert.actions.primary.color === "#ca8a04"
                ? "#8A287F"
                : alert.actions.primary.color === "#3b82f6"
                  ? "#449CFB"
                  : alert.actions.primary.color,
      },
    },
  }))

  return (
    <div className="p-8 mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{mockData.allPolicies.title}</h1>
          <p className="text-sm text-slate-500">{mockData.allPolicies.subtitle}</p>
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
          changeType={updatedMetrics.activePolicies.changeType as "increase" | "decrease" | "neutral"}
          iconBgColor={updatedMetrics.activePolicies.iconBgColor}
          iconColor={updatedMetrics.activePolicies.iconColor}
        />
        <MetricCard
          title="Need Review"
          value={updatedMetrics.needReview.value}
          icon={getIconComponent(updatedMetrics.needReview.icon)}
          change={updatedMetrics.needReview.change}
          changeType={updatedMetrics.needReview.changeType as "increase" | "decrease" | "neutral"}
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
          title="Compliance Score"
          value={updatedMetrics.complianceScore.value}
          icon={getIconComponent(updatedMetrics.complianceScore.icon)}
          change={updatedMetrics.complianceScore.change}
          changeType={updatedMetrics.complianceScore.changeType as "increase" | "decrease" | "neutral"}
          iconBgColor={updatedMetrics.complianceScore.iconBgColor}
          iconColor={updatedMetrics.complianceScore.iconColor}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-white shadow-custom">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-base font-medium">Policy Activity Timeline</h3>
              <div className="flex items-center gap-2">
                <button className="rounded-md p-1 hover:bg-slate-100 no-shadow">
                  <Filter className="h-5 w-5 text-slate-500 no-shadow" />
                </button>
                <button className="rounded-md p-1 hover:bg-slate-100 no-shadow">
                  <MoreHorizontal className="h-5 w-5 text-slate-500 no-shadow" />
                </button>
              </div>
            </div>
            <div className="divide-y">
              {updatedTimeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  statusColor={item.statusColor}
                  icon={getIconComponent(item.icon)}
                  iconBg={item.iconBg}
                  author={item.author}
                  time={item.time}
                />
              ))}
            </div>
            <div className="border-t p-4">
              <button className="text-xs font-medium text-primary-600 hover:text-primary-800">View All Activity</button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium">Priority Alerts</h3>
            <button className="text-xs font-medium text-primary-600 hover:text-primary-800">View All</button>
          </div>

          {updatedAlerts.map((alert, index) => (
            <Alert
              key={index}
              title={alert.title}
              description={alert.description}
              time={alert.time}
              color={alert.color}
              actions={alert.actions}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
