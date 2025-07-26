"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Payer {
  name: string;
  logo: string;
}

interface Policy {
  id: string;
  policyName: string;
  payer: Payer;
  clinicalCategory: string;
  spendUnderManagement: string;
  expDenialValue: string;
  lastUpdated: string;
}

interface ComparisonModalProps {
  selectedPolicies: Policy[];
  isOpen: boolean;
  onClose: () => void;
}

export function ComparisonModal({
  selectedPolicies,
  isOpen,
  onClose,
}: ComparisonModalProps) {
  if (!isOpen) return null;

  const getPayerLogo = (logo: string) => {
    const logos: Record<string, string> = {
      bcbs: "/bcbs-logo.png",
      united: "/united-logo.png",
      aetna: "/aetna-logo.png",
      cigna: "/cigna-logo.png",
      hcsc: "/hcsc-logo.png",
      kaiser: "/generic-insurance-logo.png",
      humana: "/generic-insurance-logo.png",
      elevance: "/generic-insurance-logo.png",
      centene: "/generic-insurance-logo.png",
      molina: "/generic-insurance-logo.png",
    };
    return logos[logo] || "/generic-insurance-logo.png";
  };

  const getClinicalCategoryColor = (category: string) => {
    switch (category) {
      case "Orthopedic":
        return "bg-primary-100 text-primary-800";
      case "Oncology":
        return "bg-red-100 text-red-800";
      case "Cardiology":
        return "bg-blue-100 text-blue-800";
      case "Neurology":
        return "bg-purple-100 text-purple-800";
      case "Endocrinology":
        return "bg-green-100 text-green-800";
      case "Allergy":
        return "bg-yellow-100 text-yellow-800";
      case "Pulmonology":
        return "bg-indigo-100 text-indigo-800";
      case "Rehabilitation":
        return "bg-pink-100 text-pink-800";
      case "Gastroenterology":
        return "bg-orange-100 text-orange-800";
      case "Dermatology":
        return "bg-teal-100 text-teal-800";
      case "Ophthalmology":
        return "bg-cyan-100 text-cyan-800";
      case "Dental":
        return "bg-emerald-100 text-emerald-800";
      case "Psychiatry":
        return "bg-violet-100 text-violet-800";
      case "Vascular":
        return "bg-rose-100 text-rose-800";
      case "Reproductive Medicine":
        return "bg-fuchsia-100 text-fuchsia-800";
      case "Pediatrics":
        return "bg-sky-100 text-sky-800";
      case "Emergency Medicine":
        return "bg-red-100 text-red-800";
      case "Audiology":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Mock comparison data - in real app this would come from API
  const comparisonData = selectedPolicies.map((policy) => ({
    ...policy,
    codesCovered: Math.floor(Math.random() * 100) + 50,
    payoutReimbursed: `$${Math.floor(Math.random() * 50) + 20}m`,
  }));

  // AI Analysis for each comparison row
  const getRowAnalysis = (rowType: string, policies: any[]) => {
    const analysisMap: Record<string, string> = {
      "Clinical Category":
        "Analysis shows diverse coverage across specialties. Orthopedic policies dominate with 40% representation, followed by Cardiology at 25%. This distribution suggests strong musculoskeletal and cardiovascular care coverage across selected payers.",
      "Codes Covered":
        "Code coverage varies significantly from 67 to 142 codes. Higher code counts typically indicate more comprehensive coverage but may also suggest potential over-coding risks. Recommend reviewing utilization patterns for policies with >100 codes.",
      "Payout Reimbursed":
        "Payout ranges from $23M to $68M across policies. Higher payouts correlate with broader coverage but may indicate increased cost exposure. Consider implementing utilization management for policies exceeding $50M threshold.",
      "Spend Under Management":
        "Spend under management varies from 65% to 92%. Policies with >85% managed spend show better cost control. Recommend focusing on policies below 75% for immediate optimization opportunities.",
      "Expected Denial Value":
        "Denial values range from $2.1M to $8.7M. Higher denial values suggest potential coding or documentation issues. Policies with denial rates >15% require immediate attention and provider education.",
      "Last Updated":
        "Update frequency varies from 2 weeks to 8 months. Recent updates (within 30 days) suggest active policy management. Policies not updated in >6 months may have outdated coverage criteria.",
    };
    return (
      analysisMap[rowType] || "Analysis not available for this comparison row."
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-[1400px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Policy Comparison
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Comparing {selectedPolicies.length} policies
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Single Comparison Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {/* Row labels column */}
                    <th className="w-48 px-4 py-3 text-left text-sm font-semibold text-slate-700 border-r border-slate-200">
                      Comparison Metrics
                    </th>
                    
                    {/* Policy columns */}
                    {comparisonData.map((policy) => (
                      <th key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="h-12 w-12 bg-white rounded-full overflow-hidden border border-slate-200 flex items-center justify-center">
                            <Image
                              src={getPayerLogo(policy.payer.logo)}
                              alt={policy.payer.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-800">
                              {policy.policyName}
                            </h3>
                            <p className="text-xs text-slate-500">{policy.payer.name}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                    
                    {/* Nedl Analysis column */}
                    <th className="w-80 px-4 py-3 text-center bg-gradient-to-r from-[#449cfb] to-[#f087fb] text-white">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-sm font-medium">Nedl Analysis</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                
                <tbody>
                  {/* Clinical Category Row */}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Clinical Category
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                            getClinicalCategoryColor(policy.clinicalCategory)
                          )}
                        >
                          {policy.clinicalCategory}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Clinical Category", comparisonData)}
                    </td>
                  </tr>

                  {/* Codes Covered Row */}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Codes Covered
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span className="text-lg font-bold text-[#449cfb]">
                          {policy.codesCovered}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Codes Covered", comparisonData)}
                    </td>
                  </tr>

                  {/* Payout Reimbursed Row */}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Payout Reimbursed
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span className="text-lg font-bold text-[#449cfb]">
                          {policy.payoutReimbursed}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Payout Reimbursed", comparisonData)}
                    </td>
                  </tr>

                  {/* Spend Under Management Row */}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Spend Under Management
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span className="text-sm text-slate-600">
                          {policy.spendUnderManagement}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Spend Under Management", comparisonData)}
                    </td>
                  </tr>

                  {/* Expected Denial Value Row */}
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Expected Denial Value
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span className="text-sm text-slate-600">
                          {policy.expDenialValue}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Expected Denial Value", comparisonData)}
                    </td>
                  </tr>

                  {/* Last Updated Row */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border-r border-slate-200">
                      Last Updated
                    </td>
                    {comparisonData.map((policy) => (
                      <td key={policy.id} className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0">
                        <span className="text-sm text-slate-600">
                          {policy.lastUpdated}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-[#858585] leading-relaxed bg-[#f6f6f6] border-l-2 border-[#449cfb]">
                      {getRowAnalysis("Last Updated", comparisonData)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
