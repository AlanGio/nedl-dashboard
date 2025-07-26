"use client";

import { X } from "lucide-react";
import Image from "next/image";

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

interface BestInClassModalProps {
  selectedPolicy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BestInClassModal({
  selectedPolicy,
  isOpen,
  onClose,
}: BestInClassModalProps) {
  if (!isOpen || !selectedPolicy) return null;

  const getPayerLogo = (logo: string) => {
    const logos: Record<string, string> = {
      bcbs: "/bcbs-logo.png",
      united: "/united-logo.png",
      aetna: "/aetna-logo.png",
      cigna: "/cigna-logo.png",
      hcsc: "/hcsc-logo.png",
    };
    return logos[logo] || "/generic-insurance-logo.png";
  };

  // Mock best-in-class data - in real app this would come from API
  const bestInClassPolicy = {
    payer: {
      name: "BlueCross BlueShield",
      logo: "bcbs",
    },
    policyName: selectedPolicy.policyName,
    codesCovered: 85,
    payoutReimbursed: "$42m",
    clinicalCategory: selectedPolicy.clinicalCategory,
    spendUnderManagement: "$1.8M",
    expDenialValue: "$280K",
  };

  const selectedPolicyData = {
    codesCovered: 75,
    payoutReimbursed: "$85m",
  };

  const comparisonMetrics = [
    {
      metric: "Codes Covered",
      selectedValue: selectedPolicyData.codesCovered,
      bestInClassValue: bestInClassPolicy.codesCovered,
      reasoning:
        "BlueCross BlueShield covers 10 additional codes compared to the selected policy, providing more comprehensive coverage for this clinical category.",
    },
    {
      metric: "Payout Reimbursed",
      selectedValue: selectedPolicyData.payoutReimbursed,
      bestInClassValue: bestInClassPolicy.payoutReimbursed,
      reasoning:
        "The selected policy has higher payout reimbursement, indicating better financial coverage for providers and patients.",
    },
    {
      metric: "Spend Under Management",
      selectedValue: selectedPolicy.spendUnderManagement,
      bestInClassValue: bestInClassPolicy.spendUnderManagement,
      reasoning:
        "Best-in-class policy manages higher spend, suggesting more comprehensive cost management and oversight.",
    },
    {
      metric: "Expected Denial Value",
      selectedValue: selectedPolicy.expDenialValue,
      bestInClassValue: bestInClassPolicy.expDenialValue,
      reasoning:
        "Lower expected denial value in best-in-class policy indicates more favorable approval rates and reduced administrative burden.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Comparison of {selectedPolicy.policyName} with Best In Class
            </h2>
            <p className="text-sm text-gray-600">
              Detailed analysis comparing your selected policy against industry
              best practices
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors ml-2 flex-shrink-0"
            tabIndex={0}
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4 font-semibold text-gray-900">
                Comparison Metrics
              </div>
              <div className="p-4 font-semibold text-gray-900">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                    <Image
                      src={getPayerLogo(selectedPolicy.payer.logo)}
                      alt={selectedPolicy.payer.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {selectedPolicy.payer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedPolicy.policyName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 font-semibold text-gray-900 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-blue-600 font-medium mb-1">
                    Nedl Analyzed best in class
                  </div>
                  <div className="h-8 w-8 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                    <Image
                      src={getPayerLogo(bestInClassPolicy.payer.logo)}
                      alt={bestInClassPolicy.payer.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {bestInClassPolicy.payer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {bestInClassPolicy.policyName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 font-semibold text-gray-900">
                Reasoning of analysis
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {comparisonMetrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-4">
                  <div className="p-4 font-medium text-gray-700 border-r border-gray-200">
                    {metric.metric}
                  </div>
                  <div className="p-4 border-r border-gray-200">
                    <span
                      className={`text-sm font-semibold ${
                        metric.metric === "Codes Covered" &&
                        metric.selectedValue > metric.bestInClassValue
                          ? "text-blue-600"
                          : metric.metric === "Payout Reimbursed" &&
                            metric.selectedValue > metric.bestInClassValue
                          ? "text-blue-600"
                          : metric.metric === "Spend Under Management" &&
                            metric.selectedValue > metric.bestInClassValue
                          ? "text-blue-600"
                          : metric.metric === "Expected Denial Value" &&
                            metric.selectedValue < metric.bestInClassValue
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {metric.selectedValue}
                    </span>
                  </div>
                  <div className="p-4 border-r border-gray-200 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
                    <span
                      className={`text-sm font-semibold ${
                        metric.metric === "Codes Covered" &&
                        metric.bestInClassValue > metric.selectedValue
                          ? "text-blue-600"
                          : metric.metric === "Payout Reimbursed" &&
                            metric.bestInClassValue > metric.selectedValue
                          ? "text-blue-600"
                          : metric.metric === "Spend Under Management" &&
                            metric.bestInClassValue > metric.selectedValue
                          ? "text-blue-600"
                          : metric.metric === "Expected Denial Value" &&
                            metric.bestInClassValue < metric.selectedValue
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {metric.bestInClassValue}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {metric.reasoning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Summary Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • {selectedPolicy.payer.name} shows competitive performance
                    in payout reimbursement
                  </li>
                  <li>• Best-in-class policy offers broader code coverage</li>
                  <li>
                    • Both policies demonstrate strong clinical category
                    alignment
                  </li>
                  <li>• Consider hybrid approach for optimal coverage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Evaluate additional code coverage needs</li>
                  <li>• Review reimbursement rate optimization</li>
                  <li>• Consider policy enhancement opportunities</li>
                  <li>• Monitor industry best practices regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
