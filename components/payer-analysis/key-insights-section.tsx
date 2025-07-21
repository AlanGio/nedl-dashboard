import { CHART_COLORS } from "@/lib/chart-colors";

export function KeyInsightsSection() {
  const insights = [
    {
      title: "Market Concentration",
      description:
        "Top 5 payers control approximately 65% of the market with over 164M covered lives",
      bgColor: CHART_COLORS.primary,
      titleColor: CHART_COLORS.primary,
      textColor: CHART_COLORS.primary,
    },
    {
      title: "Policy Coverage",
      description:
        "UnitedHealthcare leads with 850 medical policies covering 12,500 HCPCS codes",
      bgColor: CHART_COLORS.quinary,
      titleColor: CHART_COLORS.quinary,
      textColor: CHART_COLORS.quinary,
    },
    {
      title: "Payer Types",
      description:
        "Commercial insurers dominate with 60% market share, followed by Medicaid and Medicare",
      bgColor: CHART_COLORS.quaternary,
      titleColor: CHART_COLORS.quaternary,
      textColor: CHART_COLORS.quaternary,
    },
    {
      title: "Regional vs National",
      description:
        "8 national payers vs 12 regional, with nationals covering 70% of total lives",
      bgColor: CHART_COLORS.senary,
      titleColor: CHART_COLORS.senary,
      textColor: CHART_COLORS.senary,
    },
  ];

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="rounded-lg p-4"
            style={{ 
              backgroundColor: `${insight.bgColor}20`, // 20% opacity for background
            }}
          >
            <h3 
              className="font-semibold mb-2"
              style={{ color: insight.titleColor }}
            >
              {insight.title}
            </h3>
            <p 
              className="text-sm"
              style={{ color: insight.textColor }}
            >
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
