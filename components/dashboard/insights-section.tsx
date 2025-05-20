import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import mockData from "@/data/mockData.json"

interface InsightProps {
  type: string
  title: string
  description: string
  actionText: string
  actionLink: string
}

function InsightCard({ insight }: { insight: InsightProps }) {
  const getIcon = () => {
    switch (insight.type) {
      case "growth":
        return <TrendingUp className="h-5 w-5 text-primary-500" />
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-purple-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-primary-500" />
    }
  }

  const getBorderColor = () => {
    switch (insight.type) {
      case "growth":
        return "border-l-primary-500"
      case "opportunity":
        return "border-l-blue-500"
      case "warning":
        return "border-l-purple-500"
      default:
        return "border-l-primary-500"
    }
  }

  const getButtonColor = () => {
    switch (insight.type) {
      case "growth":
        return "bg-primary-50 text-primary-700 hover:bg-primary-100"
      case "opportunity":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100"
      case "warning":
        return "bg-purple-50 text-purple-700 hover:bg-purple-100"
      default:
        return "bg-primary-50 text-primary-700 hover:bg-primary-100"
    }
  }

  return (
    <div className={`rounded-lg border-l-4 bg-white p-6 shadow-sm ${getBorderColor()}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-slate-100 p-2">{getIcon()}</div>
        <h3 className="text-base font-medium">{insight.title}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-600">{insight.description}</p>
      <div className="mt-4">
        <a
          href={insight.actionLink}
          className={`inline-block rounded-md px-4 py-2 text-xs font-medium ${getButtonColor()}`}
        >
          {insight.actionText}
        </a>
      </div>
    </div>
  )
}

export function InsightsSection() {
  const insights = mockData.dashboard.insights

  return (
    <section className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{insights.title}</h2>
        <div className="rounded-md bg-gradient-to-r from-primary-100 to-secondary-100 px-3 py-1 text-xs font-medium text-primary-700">
          Powered by nedl.ia
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {insights.items.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </div>
    </section>
  )
}
