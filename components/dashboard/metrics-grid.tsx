"use client"

import { Users, FileText, Globe } from "lucide-react"
import { MetricCard } from "./metric-card"

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <MetricCard
        title="Total Payers Analyzed"
        value="20"
        icon={<FileText className="h-5 w-5" />}
        iconBgColor="bg-secondary-100"
        subtitle="Top US healthcare payers"
      />
      <MetricCard
        title="Total Covered Lives"
        value="270.1M"
        icon={<Users className="h-5 w-5" />}
        iconBgColor="bg-primary-100"
        subtitle="Across all payers"
      />
      <MetricCard
        title="National vs Regional"
        value="8 / 12"
        icon={<Globe className="h-5 w-5" />}
        iconBgColor="bg-blue-100"
        subtitle="Distribution of payer types"
      />
    </div>
  )
}
