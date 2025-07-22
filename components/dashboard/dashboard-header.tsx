"use client";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NedlLogo } from "@/components/ui/nedl-logo";
import { useRouter } from "next/navigation";

// Update the props interface to remove navigation-related props
interface DashboardHeaderProps {
  toggleChat: () => void;
  onToggleSidebar: () => void;
}

export function DashboardHeader({
  toggleChat,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    // Navigate to the main dashboard
    router.push("/summary");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]/50 px-4 lg:px-6 sticky w-full top-0 z-50 shadow-sm">
      <div className="flex justify-between mx-auto">
        <div className="flex items-center gap-2">
          {/* Hamburger menu button for mobile */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none"
          >
            <NedlLogo className="p-3" />
          </button>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleChat()}
            className="rounded-full p-2 no-shadow"
            aria-label="Open chat"
          >
            <span className="sr-only">Open chat</span>
            <img
              src="/spark-circle.svg"
              alt="Chat"
              className="h-12 w-12 no-shadow"
            />
          </button>
          <button className="relative p-2 lg:p-3 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 group">
            <Bell className="w-5 h-5 lg:w-5 lg:h-5 text-[#6b7280] group-hover:text-[#374151]" />
            <div
              className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-[#FA1717] rounded-full shadow-xs animate-pulse"
              style={{ animationDuration: "1s" }}
            ></div>
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3 bg-white/70 backdrop-blur-xs rounded-xl lg:rounded-2xl px-2 lg:px-4 py-1.5 lg:py-2 hover:bg-white/90 transition-all duration-200 cursor-pointer border border-[#e5e7eb]/50 shadow-xs">
            <span className="text-xs lg:text-sm font-medium text-[#374151] hidden sm:inline">
              Ashish
            </span>
            <div className="w-7 h-7 lg:w-9 lg:h-9 bg-gradient-to-r from-[#449CFB] to-[#f087fb] text-white rounded-lg lg:rounded-xl flex items-center justify-center text-xs lg:text-sm font-bold shadow-md">
              A
            </div>
            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-[#6b7280] hidden sm:inline" />
          </div>
        </div>
      </div>
    </header>
  );
}
