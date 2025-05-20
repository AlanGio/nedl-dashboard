"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarNavigation } from "@/components/sidebar/sidebar-navigation"
import { DashboardViews } from "@/components/dashboard/dashboard-views"
import { FloatingChat } from "@/components/chat/floating-chat"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Add state for chat visibility
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const handleNavigate = (viewId: string | null) => {
    setActiveView(viewId)

    // Update the active tab based on the view
    if (viewId === null) {
      setActiveTab("overview")
    } else if (viewId === "all-policies") {
      setActiveTab("policy-explorer")
    } else if (viewId === "bookmarked") {
      setActiveTab("payer-analysis")
    } else if (viewId === "code-coverage") {
      setActiveTab("code-coverage")
    }
    // Add more mappings as needed for other views
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader
        onNavigate={handleNavigate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleChat={toggleChat}
      />
      <div className="max-w-[1680px] mx-auto px-4 relative">
        <div className="flex mt-10">
          <SidebarNavigation onNavigate={handleNavigate} activeItem={activeView} />
          <div className="ml-64 flex-1">
            <DashboardViews activeView={activeView} />
          </div>
        </div>
      </div>
      <FloatingChat isOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  )
}
