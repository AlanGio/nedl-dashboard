"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import mockData from "@/data/mockData.json";

export function TopMissingCodes() {
  const { data } = mockData.codeCoverage.topMissingCodes;

  return (
    <div className="rounded-lg border bg-white p-6 shadow-custom">
      <div className="mb-4">
        <h3 className="text-base font-medium">Unmanaged High-Spend Codes</h3>
        <p className="text-sm text-slate-500">
          High cost codes not managed by policies
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="code" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#F5709A" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
