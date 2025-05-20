"use client"

import type React from "react"
import { FileBarChart, BookOpen, Users, FileCheck, GitCompare, FileSearch } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationItem {
  id: string | null
  icon: React.ElementType
  label: string
  count?: number
  color?: string
}

interface SidebarNavigationProps {
  className?: string
  onNavigate: (id: string | null) => void
  activeItem?: string | null
}

export function SidebarNavigation({ className, onNavigate, activeItem }: SidebarNavigationProps) {
  const quickNavItems: NavigationItem[] = [
    {
      id: null,
      icon: FileBarChart,
      label: "Overview",
      color: "text-gray-700",
    },
    {
      id: "bookmarked",
      icon: Users,
      label: "Payer Analysis",
      color: "text-purple-500",
    },
    {
      id: "all-policies",
      icon: BookOpen,
      label: "Policy Explorer",
      color: "text-primary-500",
    },
    {
      id: "code-coverage",
      icon: FileCheck,
      label: "Code Coverage",
      color: "text-blue-600",
    },
    {
      id: "recent-updates",
      icon: GitCompare,
      label: "Service Comparison",
      color: "text-blue-500",
    },
    {
      id: "needs-review",
      icon: FileSearch,
      label: "Search Policies",
      color: "text-secondary-500",
    },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-10 font-title",
        "bg-[#F5F5F5] shadow-[3px_0px_25px_0px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      <div className="p-4">
        <nav className="mt-2 space-y-1">
          {quickNavItems.map((item) => {
            const isActive = activeItem === item.id || (activeItem === null && item.id === null)

            return (
              <button
                key={item.id || "overview"}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex w-full items-center rounded-full px-4 py-4 my-1 text-sm font-medium text-left transition-all duration-200 no-shadow",
                  isActive ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white" : "text-gray-700 hover:bg-white",
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5 no-shadow", isActive ? "text-white" : item.color)} />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className={cn("ml-2 rounded-full text-xs", isActive ? "text-white" : "text-slate-500")}>
                    ({item.count})
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
