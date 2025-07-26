"use client";

import { useState, useMemo } from "react";
import { LayoutWithNav } from "@/app/layout-with-nav";
import {
  X,
  Search,
  Filter,
  Download,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Share2,
} from "lucide-react";

interface ServiceData {
  id: string;
  description: string;
  condition: string;
  confidenceMatch?: string;
  payer1Status: "established" | "not-in-policy";
  payer2Status: "established" | "not-in-policy";
  payer1Criteria?: string[];
  payer2Criteria?: string[];
  payer1Name?: string;
  payer2Name?: string;
}

// Available payers for comparison
const availablePayers = [
  "BCBSNC",
  "United Healthcare",
  "Cigna",
  "Aetna",
  "Humana",
  "Kaiser Permanente",
  "Elevance Health",
  "CVS Health",
  "Molina Healthcare",
  "Centene",
];

const serviceData: ServiceData[] = [
  {
    id: "1",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "systemic juvenile idiopathic arthritis",
    confidenceMatch: "85% confidence match",
    payer1Status: "established",
    payer2Status: "established",
    payer1Criteria: [
      "Diagnosis of systemic juvenile idiopathic arthritis",
      "Dosed according to FDA labeled dosing",
      "Not receiving Actemra with a targeted immunomodulator",
      "Prescribed by a rheumatologist",
      "Authorization for no more than 12 months",
    ],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 2 years of age and older",
      "Active systemic juvenile idiopathic arthritis",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "2",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "giant cell arteritis",
    confidenceMatch: "82% confidence match",
    payer1Status: "established",
    payer2Status: "established",
    payer1Criteria: [
      "Diagnosis of giant cell arteritis",
      "Dosed according to FDA labeled dosing",
      "Prescribed by a rheumatologist",
      "Authorization for no more than 12 months",
    ],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 18 years of age and older",
      "Active giant cell arteritis",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "3",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "polyarticular juvenile idiopathic arthritis",
    confidenceMatch: "76% confidence match",
    payer1Status: "established",
    payer2Status: "established",
    payer1Criteria: [
      "Diagnosis of polyarticular juvenile idiopathic arthritis",
      "Dosed according to FDA labeled dosing",
      "Prescribed by a rheumatologist",
      "Authorization for no more than 12 months",
    ],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 2 years of age and older",
      "Active polyarticular juvenile idiopathic arthritis",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "4",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "rheumatoid arthritis",
    confidenceMatch: "79% confidence match",
    payer1Status: "established",
    payer2Status: "established",
    payer1Criteria: [
      "Diagnosis of rheumatoid arthritis",
      "Dosed according to FDA labeled dosing",
      "Prescribed by a rheumatologist",
      "Authorization for no more than 12 months",
    ],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 18 years of age and older",
      "Active rheumatoid arthritis",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "5",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "cytokine release syndrome",
    confidenceMatch: "81% confidence match",
    payer1Status: "established",
    payer2Status: "established",
    payer1Criteria: [
      "Diagnosis of cytokine release syndrome",
      "Dosed according to FDA labeled dosing",
      "Prescribed by an oncologist",
      "Authorization for no more than 6 months",
    ],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 18 years of age and older",
      "Active cytokine release syndrome",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "6",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "acute graft-versus-host disease",
    confidenceMatch: "73% confidence match",
    payer1Status: "established",
    payer2Status: "not-in-policy",
    payer1Criteria: [
      "Diagnosis of acute graft-versus-host disease",
      "Dosed according to FDA labeled dosing",
      "Prescribed by a hematologist",
      "Authorization for no more than 6 months",
    ],
    payer2Criteria: [],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "7",
    description: "Actemra (tocilizumab) injection for intravenous infusion",
    condition: "immune checkpoint inhibitor-related toxicities",
    confidenceMatch: "77% confidence match",
    payer1Status: "established",
    payer2Status: "not-in-policy",
    payer1Criteria: [
      "Diagnosis of immune checkpoint inhibitor-related toxicities",
      "Dosed according to FDA labeled dosing",
      "Prescribed by an oncologist",
      "Authorization for no more than 6 months",
    ],
    payer2Criteria: [],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
  {
    id: "8",
    description:
      "Intravenous administration of Tocilizumab (Actemra) for any other indications (including outpatient COVID-19)",
    condition: "",
    payer1Status: "not-in-policy",
    payer2Status: "established",
    payer1Criteria: [],
    payer2Criteria: [
      "Administered intravenously",
      "Individuals 18 years of age and older",
      "Any other indications including outpatient COVID-19",
    ],
    payer1Name: "BCBSNC",
    payer2Name: "United Healthcare",
  },
];

export default function ServiceComparison() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Payer selection state
  const [selectedPayer1, setSelectedPayer1] = useState<string>("BCBSNC");
  const [selectedPayer2, setSelectedPayer2] =
    useState<string>("United Healthcare");

  // Handle payer selection changes
  const handlePayer1Change = (payer: string) => {
    setSelectedPayer1(payer);
    // If the second payer is the same as the new first payer, reset it
    if (payer === selectedPayer2) {
      const availablePayersForPayer2 = availablePayers.filter(
        (p) => p !== payer
      );
      setSelectedPayer2(availablePayersForPayer2[0] || "");
    }
  };

  const handlePayer2Change = (payer: string) => {
    setSelectedPayer2(payer);
  };

  // Advanced filtering and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const handleCompareCriteria = (serviceId: string) => {
    const service = serviceData.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRowClick = (service: ServiceData) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Filtered and sorted data
  const filteredServices = useMemo(() => {
    let filtered = serviceData.filter((service) => {
      const matchesSearch =
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.condition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "established" &&
          service.payer1Status === "established" &&
          service.payer2Status === "established") ||
        (statusFilter === "partial" &&
          ((service.payer1Status === "established" &&
            service.payer2Status === "not-in-policy") ||
            (service.payer1Status === "not-in-policy" &&
              service.payer2Status === "established"))) ||
        (statusFilter === "none" &&
          service.payer1Status === "not-in-policy" &&
          service.payer2Status === "not-in-policy");

      const matchesConfidence =
        confidenceFilter === "all" ||
        (confidenceFilter === "high" &&
          service.confidenceMatch &&
          parseInt(service.confidenceMatch) >= 80) ||
        (confidenceFilter === "medium" &&
          service.confidenceMatch &&
          parseInt(service.confidenceMatch) >= 70 &&
          parseInt(service.confidenceMatch) < 80) ||
        (confidenceFilter === "low" &&
          service.confidenceMatch &&
          parseInt(service.confidenceMatch) < 70);

      return matchesSearch && matchesStatus && matchesConfidence;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.description.localeCompare(b.description);
        case "confidence":
          const aConfidence = a.confidenceMatch
            ? parseInt(a.confidenceMatch)
            : 0;
          const bConfidence = b.confidenceMatch
            ? parseInt(b.confidenceMatch)
            : 0;
          return bConfidence - aConfidence;
        case "criteria":
          const aCriteria =
            (a.payer1Criteria?.length || 0) + (a.payer2Criteria?.length || 0);
          const bCriteria =
            (b.payer1Criteria?.length || 0) + (b.payer2Criteria?.length || 0);
          return bCriteria - aCriteria;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, confidenceFilter, sortBy]);

  // Analytics data
  const analyticsData = useMemo(() => {
    const total = serviceData.length;
    const established = serviceData.filter(
      (s) =>
        s.payer1Status === "established" && s.payer2Status === "established"
    ).length;
    const partial = serviceData.filter(
      (s) =>
        (s.payer1Status === "established" &&
          s.payer2Status === "not-in-policy") ||
        (s.payer1Status === "not-in-policy" && s.payer2Status === "established")
    ).length;
    const none = serviceData.filter(
      (s) =>
        s.payer1Status === "not-in-policy" && s.payer2Status === "not-in-policy"
    ).length;

    const avgConfidence =
      serviceData.reduce((sum, s) => {
        const confidence = s.confidenceMatch ? parseInt(s.confidenceMatch) : 0;
        return sum + confidence;
      }, 0) / total;

    return { total, established, partial, none, avgConfidence };
  }, []);

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `Service,Condition,${selectedPayer1} Status,${selectedPayer2} Status,Confidence Match\n` +
      filteredServices
        .map(
          (s) =>
            `"${s.description}","${s.condition}","${s.payer1Status}","${
              s.payer2Status
            }","${s.confidenceMatch || "N/A"}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "service_comparison.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Smart insights and recommendations
  const insights = useMemo(() => {
    const insights = [];

    // Coverage insights
    const coverageRate =
      (analyticsData.established / analyticsData.total) * 100;
    if (coverageRate < 50) {
      insights.push({
        type: "warning",
        title: "Low Coverage Rate",
        description: `Only ${coverageRate.toFixed(
          1
        )}% of services have full policy coverage. Consider reviewing policy gaps.`,
        action: "Review Policy Gaps",
      });
    }

    // Confidence insights
    if (analyticsData.avgConfidence < 75) {
      insights.push({
        type: "info",
        title: "Low Confidence Scores",
        description: `Average confidence is ${analyticsData.avgConfidence.toFixed(
          1
        )}%. Consider updating service mappings.`,
        action: "Update Mappings",
      });
    }

    // Criteria complexity insights
    const highComplexityServices = serviceData.filter(
      (s) =>
        (s.payer1Criteria?.length || 0) + (s.payer2Criteria?.length || 0) > 8
    );
    if (highComplexityServices.length > 0) {
      insights.push({
        type: "success",
        title: "Complex Services Identified",
        description: `${highComplexityServices.length} services have high criteria complexity. These may need special attention.`,
        action: "Review Complex Services",
      });
    }

    return insights;
  }, [analyticsData, serviceData]);

  // Policy trends and patterns
  const trends = useMemo(() => {
    const trends = [];

    // Most common conditions
    const conditionCounts = serviceData.reduce((acc, service) => {
      acc[service.condition] = (acc[service.condition] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topConditions = Object.entries(conditionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    trends.push({
      title: "Top Conditions",
      data: topConditions.map(([condition, count]) => ({
        label: condition,
        value: count,
      })),
    });

    // Policy preference analysis
    const payer1Preferred = serviceData.filter(
      (s) =>
        s.payer1Status === "established" && s.payer2Status === "not-in-policy"
    ).length;

    const payer2Preferred = serviceData.filter(
      (s) =>
        s.payer1Status === "not-in-policy" && s.payer2Status === "established"
    ).length;

    trends.push({
      title: "Policy Preferences",
      data: [
        { label: `${selectedPayer1} Only`, value: payer1Preferred },
        { label: `${selectedPayer2} Only`, value: payer2Preferred },
        { label: "Both Policies", value: analyticsData.established },
      ],
    });

    return trends;
  }, [serviceData, analyticsData]);

  // Risk assessment for services
  const getRiskLevel = (service: ServiceData) => {
    const confidence = service.confidenceMatch
      ? parseInt(service.confidenceMatch)
      : 0;
    const criteriaCount =
      (service.payer1Criteria?.length || 0) +
      (service.payer2Criteria?.length || 0);

    if (confidence < 70 || criteriaCount > 10) return "high";
    if (confidence < 80 || criteriaCount > 6) return "medium";
    return "low";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      case "success":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <LayoutWithNav>
      <div className="p-6">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Services comparison
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Compare different services and their policy criteria
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm"
                tabIndex={0}
                aria-label="Export data to CSV"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={() => setShowInsights(!showInsights)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                  showInsights
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                tabIndex={0}
                aria-label="Toggle smart insights"
              >
                <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Insights</span>
              </button>

              <button
                onClick={() => setShowTrends(!showTrends)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                  showTrends
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                tabIndex={0}
                aria-label="Toggle trends analysis"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Trends</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Overview - Always Visible */}
        <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Analytics Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
                {analyticsData.total}
              </div>
              <div className="text-xs sm:text-sm text-blue-700">
                Total Services
              </div>
            </div>

            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
                {analyticsData.established}
              </div>
              <div className="text-xs sm:text-sm text-green-700">
                Fully Established
              </div>
            </div>

            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
              <div className="text-lg sm:text-2xl font-bold text-yellow-600 mb-1">
                {analyticsData.partial}
              </div>
              <div className="text-xs sm:text-sm text-yellow-700">
                Partially Established
              </div>
            </div>

            <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
              <div className="text-lg sm:text-2xl font-bold text-red-600 mb-1">
                {analyticsData.none}
              </div>
              <div className="text-xs sm:text-sm text-red-700">
                Not Established
              </div>
            </div>

            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200 col-span-2 sm:col-span-1">
              <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
                {analyticsData.avgConfidence.toFixed(0)}%
              </div>
              <div className="text-xs sm:text-sm text-purple-700">
                Avg Confidence
              </div>
            </div>
          </div>
        </div>

        {/* Smart Insights Panel */}
        {showInsights && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Smart Insights & Recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  AI-Powered Insights
                </h3>
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getInsightColor(
                      insight.type
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {insight.description}
                        </p>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          {insight.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk Assessment */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Risk Assessment
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-sm font-medium text-red-700">
                      High Risk Services
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {
                        serviceData.filter((s) => getRiskLevel(s) === "high")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="text-sm font-medium text-yellow-700">
                      Medium Risk Services
                    </span>
                    <span className="text-sm font-bold text-yellow-600">
                      {
                        serviceData.filter((s) => getRiskLevel(s) === "medium")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-700">
                      Low Risk Services
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {
                        serviceData.filter((s) => getRiskLevel(s) === "low")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends Analysis */}
        {showTrends && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Trends & Patterns Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Conditions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Most Common Conditions
                </h3>
                <div className="space-y-3">
                  {trends[0]?.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <span className="text-sm font-medium text-blue-700">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {item.value} services
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy Preferences */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Policy Coverage Preferences
                </h3>
                <div className="space-y-3">
                  {trends[1]?.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                      <span className="text-sm font-medium text-purple-700">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {item.value} services
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payer Selection */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Select Payers to Compare
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Payer 1 Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Payer
              </label>
              <select
                value={selectedPayer1}
                onChange={(e) => handlePayer1Change(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {availablePayers.map((payer) => (
                  <option key={payer} value={payer}>
                    {payer}
                  </option>
                ))}
              </select>
            </div>

            {/* Payer 2 Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Payer
              </label>
              <select
                value={selectedPayer2}
                onChange={(e) => handlePayer2Change(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                {availablePayers
                  .filter((payer) => payer !== selectedPayer1)
                  .map((payer) => (
                    <option key={payer} value={payer}>
                      {payer}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Comparison Status */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Comparing:{" "}
                <span className="text-blue-600">{selectedPayer1}</span> vs{" "}
                <span className="text-purple-600">{selectedPayer2}</span>
              </span>
              <span className="text-xs text-gray-500">
                {filteredServices.length} services available
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Mobile: Card Layout */}
          <div className="block lg:hidden">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={`p-4 border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Service Description */}
                <div
                  className="mb-4 cursor-pointer"
                  onClick={() => handleRowClick(service)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRowClick(service);
                    }
                  }}
                  aria-label={`View detailed comparison for ${service.description}`}
                >
                  <p className="text-sm font-medium text-gray-900 leading-relaxed mb-2">
                    {service.description}
                  </p>
                  {service.condition && (
                    <p className="text-xs text-gray-600 font-medium mb-2">
                      {service.condition}
                    </p>
                  )}
                  {service.confidenceMatch && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-xs text-gray-500 font-medium">
                        {service.confidenceMatch}
                      </p>
                    </div>
                  )}
                  {/* Risk Indicator */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(
                        getRiskLevel(service)
                      )}`}
                    >
                      {getRiskLevel(service).toUpperCase()} RISK
                    </span>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs font-medium text-blue-700 mb-2">
                      {selectedPayer1}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg shadow-sm ${
                        service.payer1Status === "established"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      }`}
                    >
                      {service.payer1Status === "established"
                        ? "Established"
                        : "Not in policy"}
                    </span>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-xs font-medium text-purple-700 mb-2">
                      {selectedPayer2}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg shadow-sm ${
                        service.payer2Status === "established"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      }`}
                    >
                      {service.payer2Status === "established"
                        ? "Established"
                        : "Not in policy"}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {service.confidenceMatch && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleCompareCriteria(service.id)}
                      className={`w-full px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                        selectedServices.includes(service.id)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      }`}
                      tabIndex={0}
                      aria-label={`Compare criteria for ${service.description}`}
                    >
                      COMPARE CRITERIA
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden lg:block">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
              <div className="p-6 font-semibold text-gray-900 text-lg">
                Service
              </div>
              <div className="p-6 font-semibold text-gray-900 text-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border-l border-blue-200">
                {selectedPayer1}
              </div>
              <div className="p-6 font-semibold text-gray-900 text-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border-l border-purple-200">
                {selectedPayer2}
              </div>
              <div className="p-6 font-semibold text-gray-900 text-lg bg-gradient-to-r from-gray-50 to-gray-100/50 border-l border-gray-200">
                Actions
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`grid grid-cols-4 hover:bg-gray-50/50 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  {/* Service Description Column */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => handleRowClick(service)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRowClick(service);
                      }
                    }}
                    aria-label={`View detailed comparison for ${service.description}`}
                  >
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">
                        {service.description}
                      </p>
                      {service.condition && (
                        <p className="text-sm text-gray-600 font-medium">
                          {service.condition}
                        </p>
                      )}
                      {service.confidenceMatch && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-xs text-gray-500 font-medium">
                            {service.confidenceMatch}
                          </p>
                        </div>
                      )}

                      {/* Risk Indicator */}
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(
                            getRiskLevel(service)
                          )}`}
                        >
                          {getRiskLevel(service).toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payer 1 Status Column */}
                  <div className="p-6 bg-gradient-to-r from-blue-50/50 to-blue-100/30 border-l border-blue-200/50">
                    <div className="flex items-center justify-center h-full">
                      <span
                        className={`inline-flex px-4 py-2 text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 ${
                          service.payer1Status === "established"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                            : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                        }`}
                      >
                        {service.payer1Status === "established"
                          ? "Criteria established"
                          : "Not in policy"}
                      </span>
                    </div>
                  </div>

                  {/* Payer 2 Status Column */}
                  <div className="p-6 bg-gradient-to-r from-purple-50/50 to-purple-100/30 border-l border-purple-200/50">
                    <div className="flex items-center justify-center h-full">
                      <span
                        className={`inline-flex px-4 py-2 text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 ${
                          service.payer2Status === "established"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                            : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                        }`}
                      >
                        {service.payer2Status === "established"
                          ? "Criteria established"
                          : "Not in policy"}
                      </span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="p-6 bg-gradient-to-r from-gray-50/50 to-gray-100/30 border-l border-gray-200/50">
                    <div className="flex items-center justify-center h-full">
                      {service.confidenceMatch && (
                        <button
                          onClick={() => handleCompareCriteria(service.id)}
                          className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                            selectedServices.includes(service.id)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                          }`}
                          tabIndex={0}
                          aria-label={`Compare criteria for ${service.description}`}
                        >
                          COMPARE CRITERIA
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comprehensive Service Comparison Modal */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                    {selectedPayer1} vs {selectedPayer2} Policy Comparison
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    Comprehensive analysis for {selectedService.description}
                    {selectedService.condition &&
                      ` - ${selectedService.condition}`}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors ml-2 flex-shrink-0"
                  tabIndex={0}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
                {/* Executive Summary */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Executive Summary
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                      <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
                        {selectedService.payer1Criteria?.length || 0}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-700">
                        {selectedPayer1} Criteria
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                      <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
                        {selectedService.payer2Criteria?.length || 0}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-700">
                        {selectedPayer2} Criteria
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                      <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
                        {selectedService.confidenceMatch}
                      </div>
                      <div className="text-xs sm:text-sm text-green-700">
                        Confidence Match
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparison Summary */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Policy Comparison Summary
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Policy Status Comparison */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Policy Status
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedPayer1}:
                          </span>
                          <span
                            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                              selectedService.payer1Status === "established"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedService.payer1Status === "established"
                              ? "Established"
                              : "Not in Policy"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedPayer2}:
                          </span>
                          <span
                            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                              selectedService.payer2Status === "established"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedService.payer2Status === "established"
                              ? "Established"
                              : "Not in Policy"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Criteria Complexity Comparison */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Criteria Complexity
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedPayer1}:
                          </span>
                          <span className="text-sm font-bold text-blue-600">
                            {selectedService.payer1Criteria?.length || 0}{" "}
                            criteria
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedPayer2}:
                          </span>
                          <span className="text-sm font-bold text-purple-600">
                            {selectedService.payer2Criteria?.length || 0}{" "}
                            criteria
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-xs text-gray-600">
                            {(selectedService.payer1Criteria?.length || 0) >
                            (selectedService.payer2Criteria?.length || 0)
                              ? `${selectedPayer1} has more complex requirements`
                              : (selectedService.payer2Criteria?.length || 0) >
                                (selectedService.payer1Criteria?.length || 0)
                              ? `${selectedPayer2} has more complex requirements`
                              : "Both policies have similar complexity"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Necessity Comparison */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Medical Necessity Comparison
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Policy 1 Column */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-3 sm:p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-lg">
                          {selectedPayer1} service:{" "}
                          {selectedService.description} for{" "}
                          {selectedService.condition}
                        </h4>
                      </div>

                      {selectedService.payer1Criteria &&
                      selectedService.payer1Criteria.length > 0 ? (
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                            All of the following need to be true:
                          </p>
                          <ul className="space-y-2">
                            {selectedService.payer1Criteria.map(
                              (criteria: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-xs sm:text-sm text-gray-700">
                                    {criteria}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-500 italic">
                            No criteria established for this policy
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Policy 2 Column */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-3 sm:p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-lg">
                          {selectedPayer2} service:{" "}
                          {selectedService.description} for{" "}
                          {selectedService.condition}
                        </h4>
                      </div>

                      {selectedService.payer2Criteria &&
                      selectedService.payer2Criteria.length > 0 ? (
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                            All of the following need to be true:
                          </p>
                          <ul className="space-y-2">
                            {selectedService.payer2Criteria.map(
                              (criteria: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-xs sm:text-sm text-gray-700">
                                    {criteria}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-500 italic">
                            No criteria established for this policy
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Side-by-Side Criteria Matrix */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Criteria Matrix Comparison
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                      <div className="p-4 font-semibold text-gray-900">
                        Criteria
                      </div>
                      <div className="p-4 font-semibold text-gray-900 bg-blue-50">
                        {selectedPayer1} Policy
                      </div>
                      <div className="p-4 font-semibold text-gray-900 bg-purple-50">
                        {selectedPayer2} Policy
                      </div>
                    </div>

                    {/* Common criteria comparison */}
                    <div className="divide-y divide-gray-100">
                      {[
                        "Diagnosis Requirement",
                        "Age Requirement",
                        "Administration Method",
                        "Prescriber Type",
                        "Authorization Period",
                      ].map((criteria) => (
                        <div key={criteria} className="grid grid-cols-3">
                          <div className="p-4 font-medium text-gray-700">
                            {criteria}
                          </div>
                          <div className="p-4 bg-blue-50/30">
                            {selectedService.payer1Criteria?.some((c: string) =>
                              c
                                .toLowerCase()
                                .includes(criteria.toLowerCase().split(" ")[0])
                            ) ? (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                ✓ Required
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                Not specified
                              </span>
                            )}
                          </div>
                          <div className="p-4 bg-purple-50/30">
                            {selectedService.payer2Criteria?.some((c: string) =>
                              c
                                .toLowerCase()
                                .includes(criteria.toLowerCase().split(" ")[0])
                            ) ? (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                ✓ Required
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                Not specified
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Criteria Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Actemra Criteria Cards */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {selectedPayer1} Policy Criteria
                    </h3>
                    <div className="space-y-3">
                      {selectedService.payer1Criteria &&
                      selectedService.payer1Criteria.length > 0 ? (
                        selectedService.payer1Criteria.map(
                          (criteria: string, index: number) => (
                            <div
                              key={index}
                              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-2">
                                    {criteria}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                      FDA Approved
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded">
                                      High Priority
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 italic">
                            No criteria established for this policy
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tocilizumab Criteria Cards */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {selectedPayer2} Policy Criteria
                    </h3>
                    <div className="space-y-3">
                      {selectedService.payer2Criteria &&
                      selectedService.payer2Criteria.length > 0 ? (
                        selectedService.payer2Criteria.map(
                          (criteria: string, index: number) => (
                            <div
                              key={index}
                              className="bg-purple-50 border border-purple-200 rounded-lg p-4"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 mb-2">
                                    {criteria}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                      Clinical Evidence
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded">
                                      Standard Care
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 italic">
                            No criteria established for this policy
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Strategic Recommendations
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Optimal Submission Strategy
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          • Submit under{" "}
                          {(selectedService.payer1Criteria?.length || 0) >
                          (selectedService.payer2Criteria?.length || 0)
                            ? selectedPayer1
                            : selectedPayer2}{" "}
                          policy for better coverage
                        </li>
                        <li>• Include all required documentation upfront</li>
                        <li>
                          • Request authorization for maximum allowed period
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Policy Differences
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          • {selectedPayer1}:{" "}
                          {selectedService.payer1Status === "established"
                            ? "Policy established"
                            : "Not covered"}
                        </li>
                        <li>
                          • {selectedPayer2}:{" "}
                          {selectedService.payer2Status === "established"
                            ? "Policy established"
                            : "Not covered"}
                        </li>
                        <li>
                          • Complexity:{" "}
                          {(selectedService.payer1Criteria?.length || 0) >
                          (selectedService.payer2Criteria?.length || 0)
                            ? `${selectedPayer1} has more requirements`
                            : (selectedService.payer2Criteria?.length || 0) >
                              (selectedService.payer1Criteria?.length || 0)
                            ? `${selectedPayer2} has more requirements`
                            : "Similar complexity"}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Common Pitfalls to Avoid
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Missing prescriber specialty requirements</li>
                        <li>• Incomplete diagnosis documentation</li>
                        <li>• Exceeding authorization timeframes</li>
                        <li>• Submitting to wrong payer policy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWithNav>
  );
}
