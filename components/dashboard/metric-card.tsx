import type React from "react"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: number
  changeUnit?: string
  changeType?: "increase" | "decrease" | "neutral"
  period?: string
  subtitle?: string
  iconBgColor?: string
}

export function MetricCard({
  title,
  value,
  icon,
  change,
  changeUnit = "",
  changeType = "neutral",
  period,
  subtitle,
  iconBgColor = "bg-primary-100",
}: MetricCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-slate-500">{title}</h3>
        <div className={cn("rounded-full p-2", iconBgColor)}>{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
      {change !== undefined && (
        <div className="mt-2 flex items-center text-sm">
          {changeType === "increase" ? (
            <ArrowUpIcon className="mr-1 h-4 w-4 text-primary-500" />
          ) : changeType === "decrease" ? (
            <ArrowDownIcon className="mr-1 h-4 w-4 text-secondary-500" />
          ) : null}
          <span
            className={cn(
              "text-xs",
              changeType === "increase"
                ? "text-primary-600"
                : changeType === "decrease"
                  ? "text-secondary-600"
                  : "text-slate-500",
            )}
          >
            {change}
            {changeUnit} from previous {period}
          </span>
        </div>
      )}
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  )
}
