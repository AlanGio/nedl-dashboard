import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mockData from "@/data/mockData.json";

interface PolicyCoverageData {
  payerName: string;
  totalPolicies: number;
  hcpcsCodes: number;
  modifiersCovered: number;
}

const policyData: PolicyCoverageData[] = [
  {
    payerName: "HCSC",
    totalPolicies: 450,
    hcpcsCodes: 8200,
    modifiersCovered: 320,
  },
  {
    payerName: "UnitedHealthcare",
    totalPolicies: 850,
    hcpcsCodes: 12500,
    modifiersCovered: 450,
  },
  {
    payerName: "Elevance Health",
    totalPolicies: 780,
    hcpcsCodes: 11800,
    modifiersCovered: 420,
  },
  {
    payerName: "Centene",
    totalPolicies: 520,
    hcpcsCodes: 9000,
    modifiersCovered: 340,
  },
  {
    payerName: "BCBS Florida",
    totalPolicies: 480,
    hcpcsCodes: 8500,
    modifiersCovered: 310,
  },
  {
    payerName: "BCBS Michigan",
    totalPolicies: 440,
    hcpcsCodes: 8000,
    modifiersCovered: 300,
  },
  {
    payerName: "Kaiser Permanente",
    totalPolicies: 620,
    hcpcsCodes: 9500,
    modifiersCovered: 380,
  },
  {
    payerName: "CVS Health/Aetna",
    totalPolicies: 720,
    hcpcsCodes: 11000,
    modifiersCovered: 400,
  },
  {
    payerName: "Cigna",
    totalPolicies: 690,
    hcpcsCodes: 10500,
    modifiersCovered: 380,
  },
  {
    payerName: "Other BCBS (Avg)",
    totalPolicies: 420,
    hcpcsCodes: 7800,
    modifiersCovered: 290,
  },
];

interface WrittenPolicyCoverageTableProps {
  selectedPolicies: string[];
}

export function WrittenPolicyCoverageTable({
  selectedPolicies,
}: WrittenPolicyCoverageTableProps) {
  // Filter policy data based on selected policies
  const filteredPolicyData =
    selectedPolicies.length > 0
      ? policyData.filter((payer) => {
          // For demo purposes, we'll filter based on payer names that might match selected policies
          // In a real app, you'd have a mapping between policy IDs and payer data
          const selectedPolicyNames = selectedPolicies.map((id) => {
            // This is a simplified mapping - in reality you'd get the actual policy data
            const policy = mockData.needsReview.policies.find(
              (p: any) => p.id === id
            );
            return policy?.payer?.name || "";
          });

          return selectedPolicyNames.includes(payer.payerName);
        })
      : policyData;

  return (
    <Card className="shadow-custom">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Policy Coverage by Payer
          {selectedPolicies.length > 0 && (
            <span className="ml-2 text-sm font-normal text-blue-600">
              (Filtered by {selectedPolicies.length} selected polic{selectedPolicies.length > 1 ? 'ies' : 'y'})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">
                  Payer Name
                </th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">
                  Total Policies
                </th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">
                  HCPCS Codes Covered
                </th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">
                  Modifiers Covered
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicyData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {row.payerName}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    {row.totalPolicies.toLocaleString("en-US")}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    {row.hcpcsCodes.toLocaleString("en-US")}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    {row.modifiersCovered.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
