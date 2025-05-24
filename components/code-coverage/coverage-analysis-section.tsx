"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const coveragePatterns = [
  { category: "Commercial National Payers", percentage: 72, color: "bg-blue-500" },
  { category: "Regional BCBS Plans", percentage: 65, color: "bg-blue-400" },
  { category: "Medicaid Managed Care", percentage: 58, color: "bg-purple-500" },
  { category: "Integrated/Specialty", percentage: 48, color: "bg-purple-400" },
]

export function CoverageAnalysisSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 mb-6">Key Findings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Findings List */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-slate-700">Highest Similarity (70-85%):</span>
              <span className="text-slate-600 ml-1">
                National commercial payers (UnitedHealthcare, Elevance, Cigna, Aetna) due to similar market segments and
                comprehensive coverage
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-slate-700">Moderate Similarity (55-70%):</span>
              <span className="text-slate-600 ml-1">
                Regional BCBS plans show consistent patterns within the BCBS network
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-slate-700">Lower Similarity (40-55%):</span>
              <span className="text-slate-600 ml-1">
                Kaiser Permanente's integrated model differs significantly from traditional fee-for-service payers
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-slate-700">Specialized Patterns:</span>
              <span className="text-slate-600 ml-1">
                Medicaid (Centene, Molina) and Medicare-focused plans show distinct coverage patterns
              </span>
            </div>
          </div>
        </div>

        {/* Coverage Pattern Analysis */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Coverage Pattern Analysis</h3>
          <div className="space-y-4">
            {coveragePatterns.map((pattern, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{pattern.category}</span>
                  <span className="text-sm text-slate-500">Avg. {pattern.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${pattern.color}`}
                    style={{ width: `${pattern.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
