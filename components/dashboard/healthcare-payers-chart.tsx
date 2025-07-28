"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import mockData from "@/data/mockData.json";
import chartConfig from "@/data/healthcare-payers-chart-config.json";

interface HealthcarePayersChartProps {
  selectedPayer?: string;
}

interface ChartConfigType {
  [key: string]: {
    label: string;
    color: string;
  };
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
          .slice(0, chartConfig.chartSettings.maxDisplayedPayers)
          .map((payer) => {
            const isSelected = payer.name === selectedPayer;
            const variation =
              chartConfig.chartSettings.fallbackVariationRange.min +
              Math.random() *
                (chartConfig.chartSettings.fallbackVariationRange.max -
                  chartConfig.chartSettings.fallbackVariationRange.min);
            const adjustedValue = isSelected
              ? payer.coveredLives
              : payer.coveredLives * variation;

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
          return chartConfig.topPayers.includes(payer.name);
        })
        .slice(0, chartConfig.chartSettings.maxDisplayedPayers) // Limit to top 10 for readability
        .map((payer) => {
          const isSelected = payer.name === selectedPayer;
          // Add some variation to make the chart more realistic
          const variation = isSelected
            ? 1
            : chartConfig.chartSettings.variationRange.min +
              Math.random() *
                (chartConfig.chartSettings.variationRange.max -
                  chartConfig.chartSettings.variationRange.min);
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
  const chartConfigData: ChartConfigType = isAllPayers
    ? chartConfig.chartConfigs.allPayers
    : {
        ...chartConfig.chartConfigs.selectedPayer,
        "Selected Payer": {
          ...chartConfig.chartConfigs.selectedPayer["Selected Payer"],
          label: selectedPayer,
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
        <ChartContainer className="w-full h-auto" config={chartConfigData}>
          <BarChart data={chartData} margin={chartConfig.chartMargins}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={chartConfig.xAxisSettings.angle}
              textAnchor={chartConfig.xAxisSettings.textAnchor}
              height={chartConfig.xAxisSettings.height}
              tick={{ fontSize: chartConfig.xAxisSettings.fontSize }}
              interval={chartConfig.xAxisSettings.interval}
            />
            <YAxis
              label={{
                value: chartConfig.chartSettings.yAxisLabel,
                angle: -90,
                position: "insideLeft",
              }}
              domain={chartConfig.chartSettings.yAxisDomain}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value: any, name: string) => [
                typeof value === "number" && value > 0
                  ? `${value.toFixed(1)}M`
                  : null,
                name,
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                name={chartConfigData[key].label}
                fill={chartConfigData[key].color}
                stackId="stack"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
