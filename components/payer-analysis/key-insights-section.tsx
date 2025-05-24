export function KeyInsightsSection() {
  const insights = [
    {
      title: "Market Concentration",
      description: "Top 5 payers control approximately 65% of the market with over 164M covered lives",
      bgColor: "bg-blue-50",
      titleColor: "text-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Policy Coverage",
      description: "UnitedHealthcare leads with 850 medical policies covering 12,500 HCPCS codes",
      bgColor: "bg-green-50",
      titleColor: "text-green-700",
      textColor: "text-green-600",
    },
    {
      title: "Payer Types",
      description: "Commercial insurers dominate with 60% market share, followed by Medicaid and Medicare",
      bgColor: "bg-purple-50",
      titleColor: "text-purple-700",
      textColor: "text-purple-600",
    },
    {
      title: "Regional vs National",
      description: "8 national payers vs 12 regional, with nationals covering 70% of total lives",
      bgColor: "bg-orange-50",
      titleColor: "text-orange-700",
      textColor: "text-orange-600",
    },
  ]

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <div key={index} className={`${insight.bgColor} rounded-lg p-4`}>
            <h3 className={`font-semibold mb-2 ${insight.titleColor}`}>{insight.title}</h3>
            <p className={`text-sm ${insight.textColor}`}>{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
