"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

export function OpportunitiesSection() {
  const [selectedView, setSelectedView] = useState("Spend under management")
  const [showRxResults, setShowRxResults] = useState(true)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Opportunities</h2>
          <p className="text-sm text-slate-500">Discover potential savings and coverage improvements.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center">
            <span className="text-sm mr-2">Opportunity view:</span>
            <div className="relative">
              <button className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm shadow-custom">
                {selectedView}
                <ChevronDown className="h-4 w-4 no-shadow" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded border flex items-center justify-center cursor-pointer no-shadow"
              onClick={() => setShowRxResults(!showRxResults)}
            >
              {showRxResults && <Check className="h-4 w-4 text-primary-500 no-shadow" />}
            </div>
            <span className="text-sm">Show Rx results</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 my-4"></div>
    </div>
  )
}
