"use client"

import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { PolicyCommandCenter } from "@/components/policies/policy-command-center"
import { NeedsReview } from "@/components/needs-review/needs-review"
import { RecentUpdates } from "@/components/recent-updates/recent-updates"
import { Bookmarked } from "@/components/bookmarked/bookmarked"
import { CodeCoverage } from "@/components/code-coverage/code-coverage"

interface DashboardViewsProps {
  activeView: string | null
}

export function DashboardViews({ activeView }: DashboardViewsProps) {
  // Render the appropriate view based on the activeView prop
  if (activeView === "all-policies") {
    return <PolicyCommandCenter />
  }

  if (activeView === "needs-review") {
    return <NeedsReview />
  }

  if (activeView === "recent-updates") {
    return <RecentUpdates />
  }

  if (activeView === "bookmarked") {
    return <Bookmarked />
  }

  if (activeView === "code-coverage") {
    return <CodeCoverage />
  }

  // Default to the dashboard overview
  return <DashboardContent />
}
