"use client"
import { FileBarChart, Users, BookOpen, FileCheck, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { NedlLogo } from "@/components/ui/nedl-logo"
import mockData from "@/data/mockData.json"

// Map string icon names to actual icon components
const iconMap = {
  FileBarChart: FileBarChart,
  Users: Users,
  BookOpen: BookOpen,
  FileCheck: FileCheck,
}

// Update the props interface to include sidebar controls
interface DashboardHeaderProps {
  onNavigate: (view: string | null) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  toggleChat: () => void
  onToggleSidebar: () => void
}

export function DashboardHeader({
  onNavigate,
  activeTab,
  setActiveTab,
  toggleChat,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const navItems = mockData.siteConfig.navigation.mainNav.map((item) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || FileBarChart,
  }))

  const handleTabClick = (tabId: string) => {
    // Set the active tab
    setActiveTab(tabId)

    // Find the clicked item
    const clickedItem = navItems.find((item) => item.id === tabId)

    if (tabId === "overview") {
      // Navigate to the main dashboard
      onNavigate(null)
    } else if (clickedItem?.linkedView) {
      // Navigate to the linked view if it exists
      onNavigate(clickedItem.linkedView)
    }
  }

  const handleLogoClick = () => {
    // Navigate to the main dashboard
    onNavigate(null)
    setActiveTab("overview")
  }

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="max-w-[1680px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger menu button for mobile */}
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>

            <button onClick={handleLogoClick} className="flex items-center focus:outline-none">
              <NedlLogo className="p-3" />
            </button>
          </div>

          {/* Desktop navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2 font-title">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 no-shadow",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                    : "text-gray-700 hover:bg-white hover:shadow-sm",
                )}
              >
                <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-white" : "text-gray-500")} />
                {item.title}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => toggleChat()} className="rounded-full p-2 no-shadow" aria-label="Open chat">
              <span className="sr-only">Open chat</span>
              <img src="/spark-circle.svg" alt="Chat" className="h-12 w-12 no-shadow" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
