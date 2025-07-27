"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import mockData from "@/data/mockData.json";

interface HealthcarePayersChartProps {
  selectedPayer?: string;
}

export function HealthcarePayersChart({
  selectedPayer = "All Payers",
}: HealthcarePayersChartProps) {
  // Function to generate chart data based on selected payer
  const getChartData = () => {
    if (selectedPayer === "All Payers") {
      // Show all payers with original data
      return mockData.payersData
        .map((payer) => {
          let category = "Other Payers";
          if (payer.name === "HCSC") {
            category = "HCSC";
          }

          return {
            name: payer.name,
            coveredLives: payer.coveredLives / 1000000,
            category: category,
            HCSC: category === "HCSC" ? payer.coveredLives / 1000000 : 0,
            "Other Payers":
              category === "Other Payers" ? payer.coveredLives / 1000000 : 0,
          };
        })
        .sort((a, b) => b.coveredLives - a.coveredLives);
    } else {
      // Show comparison data when a specific payer is selected
      const selectedPayerData = mockData.payersData.find(
        (p) => p.name === selectedPayer
      );

      if (!selectedPayerData) {
        // Fallback if payer not found
        return mockData.payersData
          .slice(0, 10)
          .map((payer) => {
            const isSelected = payer.name === selectedPayer;
            const adjustedValue = isSelected
              ? payer.coveredLives
              : payer.coveredLives * (0.8 + Math.random() * 0.4);

            return {
              name: payer.name,
              coveredLives: adjustedValue / 1000000,
              category: isSelected ? "Selected Payer" : "Other Payers",
              "Selected Payer": isSelected ? adjustedValue / 1000000 : 0,
              "Other Payers": !isSelected ? adjustedValue / 1000000 : 0,
            };
          })
          .sort((a, b) => b.coveredLives - a.coveredLives);
      }

      // Create comparison data with the selected payer highlighted
      const comparisonData = mockData.payersData
        .filter((payer) => {
          // Always include the selected payer and top competitors
          if (payer.name === selectedPayer) return true;

          // Include top payers for comparison
          const topPayers = [
            "UnitedHealthcare",
            "Elevance Health (Anthem)",
            "CVS Health/Aetna",
            "Cigna",
            "Kaiser Permanente",
            "Humana",
            "Centene",
          ];
          return topPayers.includes(payer.name);
        })
        .slice(0, 10) // Limit to top 10 for readability
        .map((payer) => {
          const isSelected = payer.name === selectedPayer;
          // Add some variation to make the chart more realistic
          const variation = isSelected ? 1 : 0.85 + Math.random() * 0.3;
          const adjustedValue = payer.coveredLives * variation;

          return {
            name: payer.name,
            coveredLives: adjustedValue / 1000000,
            category: isSelected ? "Selected Payer" : "Competitors",
            "Selected Payer": isSelected ? adjustedValue / 1000000 : 0,
            Competitors: !isSelected ? adjustedValue / 1000000 : 0,
          };
        })
        .sort((a, b) => b.coveredLives - a.coveredLives);

      return comparisonData;
    }
  };

  const chartData = getChartData();

  // Determine chart configuration based on selected payer
  const isAllPayers = selectedPayer === "All Payers";
  const chartConfig = isAllPayers
    ? {
        HCSC: {
          label: "HCSC",
          color: "#F5709A", // Pink for HCSC
        },
        "Other Payers": {
          label: "Other Payers",
          color: "#449CFB", // Blue for all other payers
        },
      }
    : {
        "Selected Payer": {
          label: selectedPayer,
          color: "#F5709A", // Pink for selected payer
        },
        Competitors: {
          label: "Competitors",
          color: "#449CFB", // Blue for competitors
        },
      };

  const dataKeys = isAllPayers
    ? ["HCSC", "Other Payers"]
    : ["Selected Payer", "Competitors"];

  return (
    <Card className="w-full h-auto">
      <CardHeader>
        <CardTitle>
          {isAllPayers
            ? "Healthcare Payers by Covered Lives"
            : `${selectedPayer} vs Competitors - Covered Lives`}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-auto">
        <ChartContainer className="w-full h-auto" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 120,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={140}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis
              label={{
                value: "Covered Lives (Millions)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={[0, 60]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value, name) => [
                value > 0 ? `${value.toFixed(1)}M` : null,
                name,
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                name={chartConfig[key].label}
                fill={chartConfig[key].color}
                stackId="stack"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
