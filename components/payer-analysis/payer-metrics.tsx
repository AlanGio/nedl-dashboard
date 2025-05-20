interface MetricCardProps {
  label: string
  value: string | number
  subtitle?: string
}

function MetricCard({ label, value, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border shadow-custom p-6">
      <h3 className="text-xs font-medium text-slate-500">{label}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  )
}

interface PayerMetricsProps {
  metrics: {
    totalPayers: {
      value: number
      label: string
    }
    livesCovered: {
      value: string
      label: string
    }
    totalPolicies: {
      value: number
      label: string
      subtitle?: string
    }
    recentChanges: {
      value: number
      label: string
      subtitle?: string
    }
  }
}

export function PayerMetrics({ metrics }: PayerMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard label={metrics.totalPayers.label} value={metrics.totalPayers.value} />
      <MetricCard label={metrics.livesCovered.label} value={metrics.livesCovered.value} />
      <MetricCard
        label={metrics.totalPolicies.label}
        value={metrics.totalPolicies.value}
        subtitle={metrics.totalPolicies.subtitle}
      />
      <MetricCard
        label={metrics.recentChanges.label}
        value={metrics.recentChanges.value}
        subtitle={metrics.recentChanges.subtitle}
      />
    </div>
  )
}
