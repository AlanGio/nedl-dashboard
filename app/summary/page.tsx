"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutWithNav } from "@/app/layout-with-nav";
import {
  FileCheck,
  FileBarChart,
  FileText,
  BarChart3,
  MoreVertical,
  ChevronRight,
  Receipt,
  ChartLine,
  FileCheck2,
  BadgePoundSterling,
} from "lucide-react";

interface ModuleData {
  id: string;
  title: string;
  icon: React.ElementType;
  hasGradient: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  buttonLinks: {
    addClaim: string;
    detailedView: string;
  };
}

const moduleData: ModuleData[] = [
  {
    id: "claims-repricer",
    title: "Claims Repricer",
    icon: Receipt,
    hasGradient: true,
    metrics: [
      { label: "Total Claims", value: "145M" },
      { label: "Total Allowed Amount", value: "$472.5B" },
      { label: "Total Medicare Reference Price", value: "$197.2B" },
      { label: "Avg. Medicare Rate Relativity", value: "120%" },
    ],
    buttonLinks: {
      addClaim: "https://reprice-dashboard.vercel.app/",
      detailedView: "https://reprice-dashboard.vercel.app/claims-process",
    },
  },
  {
    id: "policy-intelligence",
    title: "Policy Intelligence",
    icon: ChartLine,
    hasGradient: false,
    metrics: [
      { label: "Active Policies", value: "1,234" },
      { label: "Coverage Score", value: "87.3%" },
      { label: "Policy Updates", value: "156" },
      { label: "Compliance Rate", value: "96.8%" },
    ],
    buttonLinks: {
      addClaim: "/policy-explorer",
      detailedView: "/payer-analysis",
    },
  },
  {
    id: "contract-intelligence",
    title: "Contract Intelligence",
    icon: FileCheck2,
    hasGradient: false,
    metrics: [
      { label: "Active Contracts", value: "892" },
      { label: "Contract Value", value: "$1.2B" },
      { label: "Renewal Rate", value: "94.2%" },
      { label: "Compliance Score", value: "98.1%" },
    ],
    buttonLinks: {
      addClaim: "/policy-explorer",
      detailedView: "/code-coverage",
    },
  },
  {
    id: "payment-leakage",
    title: "Payment Leakage Analysis",
    icon: BadgePoundSterling,
    hasGradient: false,
    metrics: [
      { label: "Leakage Detected", value: "$847K" },
      { label: "Recovery Rate", value: "73.4%" },
      { label: "Claims Reviewed", value: "8,923" },
      { label: "Accuracy Rate", value: "91.7%" },
    ],
    buttonLinks: {
      addClaim: "https://payment-leakage.vercel.app/",
      detailedView: "https://payment-leakage.vercel.app/claims-management",
    },
  },
];

export default function Summary() {
  const [selectedModule, setSelectedModule] = useState<ModuleData>(
    moduleData[0]
  );
  const router = useRouter();

  const handleModuleClick = (module: ModuleData) => {
    setSelectedModule(module);
  };

  const handleButtonClick = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  return (
    <LayoutWithNav>
      <div>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Ashish
            </h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your healthcare analytics dashboard
            </p>
          </div>

          <div className="flex flex-row gap-16">
            <div className="flex flex-col lg:flex-row w-full sm:w-1/2 gap-6">
              {/* Left Column - Module Cards */}
              <section className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleData.map((module) => {
                    const IconComponent = module.icon;
                    const isSelected = selectedModule?.id === module.id;

                    return (
                      <button
                        key={module.id}
                        onClick={() => handleModuleClick(module)}
                        className={`p-6 rounded-xl transition-all duration-200 hover:shadow-lg ${
                          isSelected
                            ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                            : "bg-white border border-gray-200 hover:border-gray-300"
                        }`}
                        tabIndex={0}
                        aria-label={`Select ${module.title} module`}
                      >
                        <div className="flex flex-col gap-4">
                          <IconComponent
                            className={`w-6 h-6 ${
                              isSelected ? "text-white" : "text-gray-600"
                            }`}
                          />
                          <div className="flex-1 text-left">
                            <h3
                              className={`font-semibold mb-1 ${
                                isSelected
                                  ? "text-white"
                                  : "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] bg-clip-text text-transparent"
                              }`}
                            >
                              {module.title}
                            </h3>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Right Column - Service Comparison */}
              <section className="w-full lg:w-1/2">
                <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#449CFB] to-[#E85DF9]">
                  <div className="bg-white rounded-xl p-5 h-full flex flex-col">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex flex-col gap-6 mb-6">
                        {selectedModule.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-400 text-sm">
                              {metric.label}
                            </span>
                            <span className="text-[#49A0FB] text-xl font-semibold font-comfortaa">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="flex items-center justify-center gap-1 bg-[#49A0FB] hover:bg-[#318ce7] text-white font-medium rounded-full px-3 py-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                          tabIndex={0}
                          aria-label="Add a claim"
                          onClick={() =>
                            handleButtonClick(
                              selectedModule.buttonLinks.addClaim
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleButtonClick(
                                selectedModule.buttonLinks.addClaim
                              );
                            }
                          }}
                        >
                          Add a claim
                          <span aria-hidden="true" className="ml-1">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </button>
                        <button
                          className="flex items-center justify-center gap-1 bg-[#49A0FB] hover:bg-[#318ce7] text-white font-medium rounded-full px-3 py-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                          tabIndex={0}
                          aria-label="Detailed view"
                          onClick={() =>
                            handleButtonClick(
                              selectedModule.buttonLinks.detailedView
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleButtonClick(
                                selectedModule.buttonLinks.detailedView
                              );
                            }
                          }}
                        >
                          Detailed view
                          <span aria-hidden="true" className="ml-1">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col lg:flex-row w-full sm:w-1/2">
              <section className="w-full ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Data at glance
                </h2>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Pie Chart Card */}
                  <div className="bg-white rounded-2xl shadow p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">
                        Claim volume by Claim Type
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      {/* Pie Chart */}
                      <div className="flex-shrink-0">
                        {/* Static Pie Chart SVG */}
                        <svg
                          width="240"
                          height="240"
                          viewBox="0 0 120 120"
                          aria-label="Claim volume pie chart"
                          role="img"
                        >
                          <circle r="48" cx="60" cy="60" fill="#e5e7eb" />
                          {/* PFS - Blue (largest) */}
                          <path
                            d="M60 60 L60 12 A48 48 0 0 1 110.6 80.6 Z"
                            fill="#49A0FB"
                          />
                          {/* OPPS - Pink */}
                          <path
                            d="M60 60 L110.6 80.6 A48 48 0 0 1 60 108 Z"
                            fill="#F087FB"
                          />
                          {/* IPPS - Red */}
                          <path
                            d="M60 60 L60 108 A48 48 0 0 1 24.6 95.4 Z"
                            fill="#F87171"
                          />
                          {/* SNFPPS - Green */}
                          <path
                            d="M60 60 L24.6 95.4 A48 48 0 0 1 19.4 39.4 Z"
                            fill="#4ADE80"
                          />
                          {/* ASC - Orange */}
                          <path
                            d="M60 60 L19.4 39.4 A48 48 0 0 1 60 12 Z"
                            fill="#FBBF24"
                          />
                        </svg>
                      </div>
                      {/* Legend */}
                      <div className="flex flex-col gap-2 ml-10">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full bg-[#49A0FB]"
                            aria-hidden="true"
                          ></span>
                          <span className="text-xs text-gray-700 font-medium">
                            PFS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full bg-[#F087FB]"
                            aria-hidden="true"
                          ></span>
                          <span className="text-xs text-gray-700 font-medium">
                            OPPS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full bg-[#F87171]"
                            aria-hidden="true"
                          ></span>
                          <span className="text-xs text-gray-700 font-medium">
                            IPPS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full bg-[#4ADE80]"
                            aria-hidden="true"
                          ></span>
                          <span className="text-xs text-gray-700 font-medium">
                            SNFPPS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full bg-[#FBBF24]"
                            aria-hidden="true"
                          ></span>
                          <span className="text-xs text-gray-700 font-medium">
                            ASC
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Top Metrics Cards */}
                  <div className="flex flex-col gap-4 flex-2">
                    {/* Total Claims Card */}
                    <div className="bg-white rounded-2xl shadow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">
                          Total Claims
                        </span>
                      </div>
                      <div className="text-2xl text-[#49A0FB] font-comfortaa">
                        145M
                      </div>
                    </div>

                    {/* Total Claim Lines Card */}
                    <div className="bg-white rounded-2xl shadow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">
                          Total Claim Lines
                        </span>
                      </div>
                      <div className="text-2xl text-[#49A0FB] font-comfortaa">
                        2.15B
                      </div>
                    </div>

                    {/* Total Repriced Card */}
                    <div className="bg-white rounded-2xl shadow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">
                          Total Repriced
                        </span>
                      </div>
                      <div className="text-2xl text-[#49A0FB] font-comfortaa">
                        137.75M
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Additional Metrics Cards */}
                <div className="flex flex-col lg:flex-row gap-4 mt-6">
                  {/* Total Exclusions Card */}
                  <div className="bg-white rounded-2xl shadow p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">
                        Total Exclusions
                      </span>
                    </div>
                    <div className="text-2xl text-[#49A0FB] font-comfortaa">
                      9.25M
                    </div>
                  </div>

                  {/* Total Duplicates Card */}
                  <div className="bg-white rounded-2xl shadow p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">
                        Total Duplicates
                      </span>
                    </div>
                    <div className="text-2xl text-[#49A0FB] font-comfortaa">
                      1.5M
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithNav>
  );
}
