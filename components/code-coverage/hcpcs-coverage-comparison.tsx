"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "HCSC", value: 7500 },
  { name: "UnitedHealthcare", value: 12000 },
  { name: "Elevance Health", value: 11500 },
  { name: "Cigna", value: 8500 },
  { name: "BCBS Florida", value: 8000 },
  { name: "BCBS Michigan", value: 7500 },
  { name: "Kaiser Permanente", value: 9500 },
  { name: "CVS Health/Aetna", value: 10500 },
];

export function HCPCSCoverageComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          HCPCS Code Coverage Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
                stroke="#64748b"
              />
              <YAxis domain={[0, 14000]} fontSize={12} stroke="#64748b" />
              <Bar dataKey="value" fill="#B782E8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
