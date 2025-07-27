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
  if (!isOpen || selectedPolicies.length === 0) return null;

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

  // Mock data for Codes Covered and Annual Claim Amount - in real app this would come from API
  const getPolicyMetrics = (policy: Policy) => {
    // Generate consistent values based on policy ID for demo purposes
    const policyIdNum = parseInt(policy.id.replace(/\D/g, "")) || 1;
    return {
      codesCovered: Math.floor((policyIdNum * 7) % 100) + 50, // 50-149 range
      annualClaimAmount: `$${Math.floor((policyIdNum * 5) % 80) + 15}m`, // $15m-$94m range
      claimPaidPMPM: `$${Math.floor((policyIdNum * 2) % 40) + 25}`, // $25-$64 range
    };
  };

  const comparisonMetrics = [
    "Codes Covered",
    "Annual Claim Amount",
    "Claim Paid PMPM",
    "Addressable Policy Impact",
    "Last Updated",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Policy Comparison
            </h2>
            <p className="text-sm text-gray-600">
              Comparing {selectedPolicies.length} selected policies
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
            <div
              className="grid border-b border-gray-200 bg-gray-50"
              style={{
                gridTemplateColumns: `200px repeat(${selectedPolicies.length}, 1fr) 300px`,
              }}
            >
              <div className="p-4 font-semibold text-gray-900 border-r border-gray-200">
                Comparison Metrics
              </div>
              {selectedPolicies.map((policy, index) => (
                <div
                  key={policy.id}
                  className="p-4 font-semibold text-gray-900 border-r border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                      <Image
                        src={getPayerLogo(policy.payer.logo)}
                        alt={policy.payer.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {policy.payer.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {policy.policyName}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 font-semibold text-gray-900 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="text-xl text-blue-600 font-medium">
                    Nedl Analysis
                  </div>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {comparisonMetrics.map((metric, metricIndex) => (
                <div
                  key={metric}
                  className="grid border-b border-gray-200"
                  style={{
                    gridTemplateColumns: `200px repeat(${selectedPolicies.length}, 1fr) 300px`,
                  }}
                >
                  <div className="p-4 font-medium text-gray-700 border-r border-gray-200">
                    {metric}
                  </div>
                  {selectedPolicies.map((policy, policyIndex) => (
                    <div
                      key={policy.id}
                      className="p-4 border-r border-gray-200"
                    >
                      <div className="text-sm">
                        {metric === "Codes Covered" && (
                          <span className="text-lg font-bold text-blue-600">
                            {getPolicyMetrics(policy).codesCovered}
                          </span>
                        )}
                        {metric === "Annual Claim Amount" && (
                          <span className="text-lg font-bold text-blue-600">
                            {getPolicyMetrics(policy).annualClaimAmount}
                          </span>
                        )}
                        {metric === "Claim Paid PMPM" && (
                          <span className="text-lg font-bold text-blue-600">
                            {getPolicyMetrics(policy).claimPaidPMPM}
                          </span>
                        )}
                        {metric === "Addressable Policy Impact" && (
                          <span className="font-semibold text-gray-900">
                            {policy.expDenialValue}
                          </span>
                        )}
                        {metric === "Last Updated" && (
                          <span className="text-gray-600">
                            {policy.lastUpdated}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {metric === "Codes Covered" &&
                        "Code coverage varies significantly across payers. Higher counts indicate more comprehensive coverage but may suggest potential over-coding risks."}
                      {metric === "Annual Claim Amount" &&
                        "Annual claim amounts reflect total financial exposure. Higher amounts indicate greater cost burden but may suggest more comprehensive coverage."}
                      {metric === "Claim Paid PMPM" &&
                        "Per Member Per Month (PMPM) claims indicate cost efficiency. Lower PMPM suggests better cost management and utilization control."}
                      {metric === "Addressable Policy Impact" &&
                        "Addressable policy impact measures potential areas for improvement and optimization opportunities within each policy framework."}
                      {metric === "Last Updated" &&
                        "Recent updates indicate active policy management and current regulatory compliance."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comparison Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Key Differences
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • {selectedPolicies.length} policies compared across{" "}
                    {new Set(selectedPolicies.map((p) => p.payer.name)).size}{" "}
                    different payers
                  </li>
                  <li>
                    • Clinical categories:{" "}
                    {
                      new Set(selectedPolicies.map((p) => p.clinicalCategory))
                        .size
                    }{" "}
                    unique categories
                  </li>
                  <li>
                    • Spend range: $
                    {Math.min(
                      ...selectedPolicies.map((p) =>
                        parseInt(p.spendUnderManagement.replace(/[^0-9]/g, ""))
                      )
                    )}
                    K - $
                    {Math.max(
                      ...selectedPolicies.map((p) =>
                        parseInt(p.spendUnderManagement.replace(/[^0-9]/g, ""))
                      )
                    )}
                    M
                  </li>
                  <li>• Denial values vary significantly across payers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • Consider payer-specific requirements for each policy
                  </li>
                  <li>
                    • Evaluate clinical category alignment with your needs
                  </li>
                  <li>• Review spend management and denial patterns</li>
                  <li>• Monitor policy update frequencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
