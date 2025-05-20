"use client"

import { MapIcon } from "lucide-react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleQuantize } from "d3-scale"
import mockData from "@/data/mockData.json"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// Map regions to states
const regionToStates: Record<string, string[]> = {
  northeast: ["ME", "NH", "VT", "MA", "RI", "CT", "NY", "NJ", "PA"],
  midwest: ["OH", "MI", "IN", "IL", "WI", "MN", "IA", "MO", "ND", "SD", "NE", "KS"],
  southeast: ["DE", "MD", "DC", "VA", "WV", "NC", "SC", "GA", "FL", "KY", "TN", "AL", "MS", "AR", "LA"],
  southwest: ["OK", "TX", "NM", "AZ"],
  west: ["CO", "WY", "MT", "ID", "WA", "OR", "UT", "NV", "CA", "AK", "HI"],
}

// Create a map of state to value
const createStateValueMap = (distribution: Record<string, number>) => {
  const stateValues: Record<string, number> = {}

  Object.entries(distribution).forEach(([region, value]) => {
    const states = regionToStates[region.toLowerCase()]
    if (states) {
      states.forEach((state) => {
        stateValues[state] = value
      })
    }
  })

  return stateValues
}

export function GeographicDistribution() {
  const { title, distribution } = mockData.dashboard.geographicDistribution
  const stateValues = createStateValueMap(distribution)

  const colorScale = scaleQuantize<string>()
    .domain([0, Math.max(...Object.values(distribution))])
    .range(["#E6F0FF", "#99C2FF", "#449CFB", "#0071EA", "#003180"])

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <button className="rounded-md border bg-slate-50 px-3 py-1 text-xs">View Details</button>
      </div>
      <div className="flex h-90 items-center justify-center">
        <div className="h-60 w-[85%]">
          <ComposableMap projection="geoAlbersUsa" width={800} height={360}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateCode = geo.id
                  const region = Object.keys(regionToStates).find((r) => regionToStates[r].includes(stateCode))
                  const value = region ? distribution[region] : 0

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={value ? colorScale(value) : "#EEE"}
                      stroke="#FFF"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#449CFB" },
                        pressed: { outline: "none" },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <MapIcon className="mr-2 h-4 w-4 text-slate-500" />
        <p className="text-xs text-slate-500">Highest concentration in Northeast and West Coast</p>
      </div>
    </div>
  )
}
