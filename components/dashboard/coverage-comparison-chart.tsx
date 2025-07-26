"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CalendarIcon } from "lucide-react";
import mockData from "@/data/mockData.json";

export function CoverageComparisonChart() {
  // Get the top 5 payers including BCBS NC specifically
  const bcbsNC = mockData.dashboard.policyCoverageData.find(
    (p) => p.payer === "HCSC"
  );
  const otherTop4 = [...mockData.dashboard.policyCoverageData]
    .filter((p) => p.payer !== "HCSC")
    .sort((a, b) => b.totalPolicies - a.totalPolicies)
    .slice(0, 4);

  const top5Payers = bcbsNC
    ? [bcbsNC, ...otherTop4]
    : [...mockData.dashboard.policyCoverageData]
        .sort((a, b) => b.totalPolicies - a.totalPolicies)
        .slice(0, 5);

  // Find the maximum values for each metric to normalize the data
  const maxPolicies = Math.max(...top5Payers.map((p) => p.totalPolicies));
  const maxHCPCS = Math.max(...top5Payers.map((p) => p.hcpcsCodes));
  const maxModifiers = Math.max(...top5Payers.map((p) => p.modifiers));

  // Prepare data for the radar chart
  const radarData = [
    {
      category: "Policies",
      ...Object.fromEntries(
        top5Payers.map((p) => [p.payer, (p.totalPolicies / maxPolicies) * 100])
      ),
      fill: "#449CFB",
      stroke: "#449CFB",
    },
    {
      category: "HCPCS",
      ...Object.fromEntries(
        top5Payers.map((p) => [p.payer, (p.hcpcsCodes / maxHCPCS) * 100])
      ),
      fill: "#F5709A",
      stroke: "#F5709A",
    },
    {
      category: "Modifiers",
      ...Object.fromEntries(
        top5Payers.map((p) => [p.payer, (p.modifiers / maxModifiers) * 100])
      ),
      fill: "#0071EA",
      stroke: "#0071EA",
    },
  ];

  // Transform data for Recharts radar chart
  const transformedData = top5Payers.map((payer) => ({
    subject: payer.payer,
    Policies: (payer.totalPolicies / maxPolicies) * 100,
    HCPCS: (payer.hcpcsCodes / maxHCPCS) * 100,
    Modifiers: (payer.modifiers / maxModifiers) * 100,
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">Coverage Comparison</h3>
        <div className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs">
          <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
          <span>Current Quarter</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={transformedData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Policies"
              dataKey="Policies"
              stroke="#449CFB"
              fill="#449CFB"
              fillOpacity={0.3}
            />
            <Radar
              name="HCPCS"
              dataKey="HCPCS"
              stroke="#F5709A"
              fill="#F5709A"
              fillOpacity={0.3}
            />
            <Radar
              name="Modifiers"
              dataKey="Modifiers"
              stroke="#B782E8"
              fill="#B782E8"
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Values shown as percentage of maximum across payers
      </p>
    </div>
  );
}
