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

interface ComparisonBoxProps {
  selectedPolicies: Policy[];
  onRemovePolicy: (policyId: string) => void;
  onCompare: () => void;
  isVisible: boolean;
}

export function ComparisonBox({
  selectedPolicies,
  onRemovePolicy,
  onCompare,
  isVisible,
}: ComparisonBoxProps) {
  if (!isVisible || selectedPolicies.length === 0) {
    return null;
  }

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

  const formatPolicyName = (name: string) => {
    if (name.length > 34) {
      return name.substring(0, 34) + "...";
    }
    return name;
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:left-[calc(50%+128px)] w-[calc(100%-2rem)] md:w-auto md:min-w-[1200px] md:max-w-[1400px]">
      <div className="bg-white rounded-t-[20px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.15)] px-4 md:px-6 py-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {selectedPolicies.slice(0, 4).map((policy, index) => (
              <div
                key={policy.id}
                className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-shrink-0"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="h-6 w-6 md:h-8 md:w-8 bg-white rounded-full overflow-hidden border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getPayerLogo(policy.payer.logo)}
                      alt={policy.payer.name}
                      width={24}
                      height={24}
                      className="object-contain w-4 h-4 md:w-6 md:h-6"
                    />
                  </div>
                  <div className="text-xs text-[#4d4d4d] max-w-[80px] md:max-w-[140px] truncate">
                    {formatPolicyName(policy.policyName)}
                  </div>
                </div>
                <button
                  onClick={() => onRemovePolicy(policy.id)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
                  aria-label="Remove policy from comparison"
                >
                  <X className="h-3 w-3 text-slate-400" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onCompare}
            disabled={selectedPolicies.length < 2}
            className={cn(
              "px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center w-full md:w-auto",
              selectedPolicies.length >= 2
                ? "bg-[#449cfb] text-white hover:bg-[#3a8ce8] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            <span>Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
}
