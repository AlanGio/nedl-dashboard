"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutWithNav } from "@/app/layout-with-nav";
import {
  FileCheck,
  FileBarChart,
  ChevronRight,
  Users,
  BookOpen,
} from "lucide-react";

import { FloatingChat } from "@/components/chat/floating-chat";
import { ExpandedChat } from "@/components/chat/expanded-chat";
import { ModernPieChart } from "@/components/modern-pie-chart";
import mockData from "@/data/mockData.json";

interface ModuleData {
  id: string;
  title: string;
  icon: React.ElementType;
  hasGradient: boolean;
  disabled?: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  buttonLinks: {
    addClaim: string;
    detailedView: string;
  };
}

interface ActivityItem {
  id: string;
  date: string;
  description: string;
  link?: string;
  linkText?: string;
  user: string;
  time: string;
  actionType: "view" | "download";
}

const moduleData: ModuleData[] = [
  {
    id: "claims-repricer",
    title: "Claims Repricer",
    icon: FileCheck,
    hasGradient: true,
    metrics: [
      { label: "Total Claims", value: "145M" },
      { label: "Total Allowed Amount", value: "$236.3B" },
      { label: "Total Medicare Reference Price", value: "$197.2B" },
      { label: "Avg. Medicare Rate Relativity", value: "120%" },
    ],
    buttonLinks: {
      addClaim: "https://payment-leakage.vercel.app/claims-management",
      detailedView: "https://reprice-dashboard.vercel.app/",
    },
  },
  {
    id: "policy-intelligence",
    title: "Policy Intelligence",
    icon: FileBarChart,
    hasGradient: false,
    metrics: [
      { label: "Active Policies", value: "14,750" },
      { label: "Total Covered Lives", value: "270.1M" },
      { label: "Policy Updates", value: "42" },
      { label: "Compliance Rate", value: "92%" },
    ],
    buttonLinks: {
      addClaim: "https://payment-leakage.vercel.app/claims-management",
      detailedView: "https://nedl-dashboard.vercel.app/dashboard",
    },
  },
  {
    id: "contract-intelligence",
    title: "Contract Intelligence",
    icon: BookOpen,
    hasGradient: false,
    disabled: true,
    metrics: [
      { label: "Active Contracts", value: "892" },
      { label: "Contract Value", value: "$1.2B" },
      { label: "Renewal Rate", value: "94.2%" },
      { label: "Accuracy", value: "98.1%" },
    ],
    buttonLinks: {
      addClaim: "https://payment-leakage.vercel.app/claims-management",
      detailedView: "/code-coverage",
    },
  },
  {
    id: "payment-leakage",
    title: "Payment Leakage Analysis",
    icon: Users,
    hasGradient: false,
    metrics: [
      { label: "Leakage Detected", value: "$5.05M" },
      { label: "Recovery Rate", value: "39.1%" },
      { label: "Claims Reviewed", value: "8,923" },
      { label: "Accuracy Rate", value: "91.7%" },
    ],
    buttonLinks: {
      addClaim: "https://payment-leakage.vercel.app/claims-management",
      detailedView: "https://payment-leakage.vercel.app/",
    },
  },
];

const claimVolumePieChart = {
  title: "Claim Volume across Claim Types",
  data: [
    {
      name: "PFS",
      value: 45.2,
      claimVolume: "65.5M",
      color: "#449CFB",
    },
    {
      name: "OPPS",
      value: 32.8,
      claimVolume: "47.6M",
      color: "#F08C76",
    },
    {
      name: "IPPS",
      value: 17.0,
      claimVolume: "24.7M",
      color: "#F5709A",
    },
    {
      name: "ASC",
      value: 2.8,
      claimVolume: "4.1M",
      color: "#B782E8",
    },
    {
      name: "SNF",
      value: 1.2,
      claimVolume: "1.7M",
      color: "#82F09A",
    },
    {
      name: "Other",
      value: 1.0,
      claimVolume: "1.5M",
      color: "#FFB366",
    },
  ],
};

const activityData: ActivityItem[] = [
  {
    id: "1",
    date: "July 5, 2025",
    description: "Repricing Complete for",
    link: "#",
    linkText: "d3f33607-e01e-006c-0e75-d527c206ccf2",
    user: "admin",
    time: "11:40 AM",
    actionType: "view",
  },
  {
    id: "2",
    date: "July 5, 2025",
    description: "There was an error in file",
    link: "#",
    linkText: "Claims_2025_Q2-2.zip",
    user: "admin",
    time: "10:20 AM",
    actionType: "view",
  },
  {
    id: "3",
    date: "June 4, 2025",
    description:
      "Repriced File for Claims 2025 Q2 - 1 is now ready to download",
    user: "admin",
    time: "10:20 AM",
    actionType: "download",
  },
];

export default function Summary() {
  const [selectedModule, setSelectedModule] = useState<ModuleData>(
    moduleData[0]
  );

  // Chat state management
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      content: string;
      sender: "user" | "bot";
      timestamp: Date;
    }>
  >([]);
  const [answerIndex, setAnswerIndex] = useState(0);

  const router = useRouter();

  const suggestedQueries = [
    "show me the 10 ten drg codes that could be displayed in a tabular format",
    "can you show the rate relativity per health system",
  ];

  const toggleChat = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setIsChatOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && !isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: input,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);

      const answer =
        mockData.chatAnswers[answerIndex % mockData.chatAnswers.length];
      const thinkingTime = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setAnswerIndex((prev) => prev + 1);
      }, thinkingTime);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    if (!isTyping) {
      const newMessage = {
        id: Date.now().toString(),
        content: query,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);

      const answer =
        mockData.chatAnswers[answerIndex % mockData.chatAnswers.length];
      const thinkingTime = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setAnswerIndex((prev) => prev + 1);
      }, thinkingTime);

      // Open the chat
      setIsChatOpen(true);
    }
  };

  const handleModuleClick = (module: ModuleData) => {
    if (!module.disabled) {
      setSelectedModule(module);
    }
  };

  const handleButtonClick = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  const handleAIAgentClick = () => {
    // If there's text in the input field, send it as a message
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: input,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsTyping(true);

      const answer =
        mockData.chatAnswers[answerIndex % mockData.chatAnswers.length];
      const thinkingTime = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: answer,
          sender: "bot" as const,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setAnswerIndex((prev) => prev + 1);
      }, thinkingTime);
    }

    // Open the chat
    setIsChatOpen(true);
  };

  return (
    <LayoutWithNav>
      <div>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, Ashish
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Here's an overview of your healthcare analytics dashboard
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex flex-col w-full xl:w-1/2 gap-6">
              <div className="flex flex-col lue Crossgap-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - Module Cards */}
                  <section className="w-full lg:w-1/2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {moduleData.map((module) => {
                        const IconComponent = module.icon;
                        const isSelected = selectedModule?.id === module.id;

                        return (
                          <button
                            key={module.id}
                            onClick={() =>
                              !module.disabled && handleModuleClick(module)
                            }
                            disabled={module.disabled}
                            className={`p-6 rounded-xl transition-all duration-200 ${
                              module.disabled
                                ? "bg-gray-100 cursor-not-allowed opacity-80"
                                : isSelected
                                ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white hover:shadow-lg"
                                : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
                            }`}
                            tabIndex={module.disabled ? -1 : 0}
                            aria-label={`Select ${module.title} module${
                              module.disabled ? " (disabled)" : ""
                            }`}
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
                          <div className="flex flex-col gap-4 sm:gap-6 mb-6">
                            {selectedModule.metrics.map((metric, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <span className="text-gray-400 text-xs sm:text-sm">
                                  {metric.label}
                                </span>
                                <span className="text-[#49A0FB] text-lg sm:text-xl font-semibold font-comfortaa">
                                  {metric.value}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
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

                {/* Latest Activity */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                    Latest Activity
                  </h2>
                  <div className="bg-white rounded-2xl shadow p-6">
                    {(() => {
                      const groupedActivities = activityData.reduce(
                        (groups, activity) => {
                          if (!groups[activity.date]) {
                            groups[activity.date] = [];
                          }
                          groups[activity.date].push(activity);
                          return groups;
                        },
                        {} as Record<string, ActivityItem[]>
                      );

                      return Object.entries(groupedActivities).map(
                        ([date, activities]) => (
                          <div key={date} className="mb-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                              <span className="text-xs text-gray-400 font-medium">
                                {date}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2">
                              {activities.map((activity) => (
                                <div key={activity.id}>
                                  <div className="flex items-start justify-between group">
                                    <div>
                                      <span className="text-gray-700 text-sm">
                                        {activity.description}
                                        {activity.link && activity.linkText && (
                                          <>
                                            {" "}
                                            <a
                                              href={activity.link}
                                              className="text-[#49A0FB] underline hover:text-[#318ce7] focus:outline-none focus:ring-2 focus:ring-blue-400"
                                              tabIndex={0}
                                              aria-label={`Open ${activity.actionType} for ${activity.linkText}`}
                                            >
                                              {activity.linkText}
                                            </a>
                                          </>
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-400">
                                        {activity.time}
                                      </span>
                                      <button
                                        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        tabIndex={0}
                                        aria-label={
                                          activity.actionType === "view"
                                            ? "View details"
                                            : "Download file"
                                        }
                                        onClick={() => {}}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                          )
                                            e.preventDefault();
                                        }}
                                      >
                                        {activity.actionType === "view" ? (
                                          <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                        ) : (
                                          <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7,10 12,15 17,10" />
                                            <line
                                              x1="12"
                                              y1="15"
                                              x2="12"
                                              y2="3"
                                            />
                                          </svg>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      );
                    })()}

                    {/* View More Button */}
                    <div className="flex justify-end">
                      <button
                        className="flex items-center gap-2 bg-[#49A0FB] hover:bg-[#318ce7] text-white font-medium rounded-full px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        tabIndex={0}
                        aria-label="View more activity"
                        onClick={() => {}}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            e.preventDefault();
                        }}
                      >
                        View More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full xl:w-1/2">
              <section className="w-full">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Data at glance
                </h2>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Pie Chart Card */}
                  <div className="flex flex-col gap-2 flex-1 lg:flex-[2]">
                    <ModernPieChart
                      title={claimVolumePieChart.title}
                      data={claimVolumePieChart.data}
                      layout="vertical"
                    />
                  </div>

                  {/* Right: Top Metrics Cards */}
                  <div className="flex flex-col gap-4 flex-1 lg:flex-[0.6]">
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
                </div>

                <div className="mt-8">
                  <section className="bg-white rounded-2xl p-6 mt-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                      Ask Spark Anything
                    </h2>
                    <div className="rounded-2xl p-[2.5px] bg-[#f9fafb] relative bg-gradient-to-r from-[#449CFB] to-[#E85DF9]">
                      <div className="rounded-2xl bg-[#f9fafb] p-4 w-full h-full">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="w-full bg-transparent outline-none text-gray-500 text-base sm:text-lg placeholder-gray-400 font-light py-3 px-4 rounded-2xl"
                          placeholder="Have a question about the app? Ask our AI agent"
                          aria-label="Ask Spark Anything"
                          tabIndex={0}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-[80px] flex items-center justify-center">
                          <button
                            onClick={handleAIAgentClick}
                            tabIndex={0}
                            aria-label="AI agent"
                            className="cursor-pointer hover:scale-105 transition-transform"
                          >
                            <img
                              src="/spark-circle.svg"
                              alt="AI agent"
                              width={48}
                              height={48}
                              className="w-12 h-12"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() =>
                              handleSuggestedQuery(
                                "Which Prospective Payment Systems are supported?"
                              )
                            }
                            tabIndex={0}
                            aria-label="Which Prospective Payment Systems are supported?"
                            className="w-full border border-[#49A0FB] rounded-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white hover:bg-[#f3f8fd] transition-colors focus:outline-none"
                          >
                            Which Prospective Payment Systems are supported?
                          </button>
                          <button
                            onClick={() =>
                              handleSuggestedQuery(
                                "What is Policy Intelligence?"
                              )
                            }
                            tabIndex={0}
                            aria-label="What is Policy Intelligence?"
                            className="w-full border border-[#49A0FB] rounded-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white hover:bg-[#f3f8fd] transition-colors focus:outline-none"
                          >
                            What is Policy Intelligence?
                          </button>
                          <button
                            onClick={() =>
                              handleSuggestedQuery(
                                "How do I view the analytics dashboards?"
                              )
                            }
                            tabIndex={0}
                            aria-label="How do I view the analytics dashboards?"
                            className="w-full border border-[#49A0FB] rounded-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white hover:bg-[#f3f8fd] transition-colors focus:outline-none"
                          >
                            How do I view the analytics dashboards?
                          </button>
                          <button
                            onClick={() =>
                              handleSuggestedQuery(
                                "What is Payment Leakage Analysis?"
                              )
                            }
                            tabIndex={0}
                            aria-label="What is Payment Leakage Analysis?"
                            className="w-full border border-[#49A0FB] rounded-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white hover:bg-[#f3f8fd] transition-colors focus:outline-none"
                          >
                            What is Payment Leakage Analysis?
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Components */}
      {isExpanded ? (
        <ExpandedChat
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          handleSuggestedQuery={handleSuggestedQuery}
          suggestedQueries={suggestedQueries}
          toggleExpand={toggleExpand}
          isTyping={isTyping}
        />
      ) : (
        <FloatingChat
          isOpen={isChatOpen}
          toggleChat={toggleChat}
          toggleExpand={toggleExpand}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          handleSuggestedQuery={handleSuggestedQuery}
          suggestedQueries={suggestedQueries}
          isTyping={isTyping}
        />
      )}
    </LayoutWithNav>
  );
}
