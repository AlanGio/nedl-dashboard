"use client";

import type React from "react";
import { FileBarChart, BookOpen, Users, FileCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavigationItem {
  id: string | null;
  icon: React.ElementType;
  label: string;
  count?: number;
  color?: string;
  href: string;
}

interface SidebarNavigationProps {
  className?: string;
  onNavigate: (id: string | null) => void;
  activeItem?: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNavigation({
  className,
  onNavigate,
  activeItem,
  isOpen,
  onToggle,
}: SidebarNavigationProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const quickNavItems: NavigationItem[] = [
    {
      id: null,
      icon: FileBarChart,
      label: "Overview",
      color: "text-gray-700",
      href: "/",
    },
    {
      id: "bookmarked",
      icon: Users,
      label: "Payer Analysis",
      color: "text-purple-500",
      href: "/payer-analysis",
    },
    {
      id: "all-policies",
      icon: BookOpen,
      label: "Policy Explorer",
      color: "text-primary-500",
      href: "/policy-explorer",
    },
    {
      id: "code-coverage",
      icon: FileCheck,
      label: "Code Coverage",
      color: "text-blue-600",
      href: "/code-coverage",
    },
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
    if (isMobile) {
      onToggle(); // Close mobile menu after navigation
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onToggle}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-64 z-50 font-title transform transition-transform duration-300 ease-in-out",
            "bg-[#F5F5F5] shadow-[3px_0px_25px_0px_rgba(0,0,0,0.15)]",
            isOpen ? "translate-x-0" : "-translate-x-full",
            className
          )}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="p-4">
            <nav className="mt-2 space-y-1">
              {quickNavItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <button
                    key={item.id || "overview"}
                    onClick={() => handleNavigate(item.href)}
                    className={cn(
                      "flex w-full items-center rounded-full px-4 py-4 my-1 text-sm font-medium text-left transition-all duration-200 no-shadow",
                      active
                        ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                        : "text-gray-700 hover:bg-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 no-shadow",
                        active ? "text-white" : item.color
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.count && (
                      <span
                        className={cn(
                          "ml-2 rounded-full text-xs",
                          active ? "text-white" : "text-slate-500"
                        )}
                      >
                        ({item.count})
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar (unchanged)
  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-5rem)] w-64 z-10 font-title",
        "bg-[#F5F5F5] shadow-[3px_0px_25px_0px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      <div className="p-4">
        <nav className="mt-2 space-y-1">
          {quickNavItems.map((item) => {
            const active = isActive(item.href);

            return (
              <button
                key={item.id || "overview"}
                onClick={() => handleNavigate(item.href)}
                className={cn(
                  "flex w-full items-center rounded-full px-4 py-4 my-1 text-sm font-medium text-left transition-all duration-200 no-shadow",
                  active
                    ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                    : "text-gray-700 hover:bg-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 no-shadow",
                    active ? "text-white" : item.color
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span
                    className={cn(
                      "ml-2 rounded-full text-xs",
                      active ? "text-white" : "text-slate-500"
                    )}
                  >
                    ({item.count})
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
