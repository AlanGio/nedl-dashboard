import { cn } from "@/lib/utils"

interface PolicyDistributionTableProps {
  policyDistribution:
    | {
        categories: string[]
        columns: string[]
        data: {
          category: string
          values: Record<string, string>
          colors: Record<string, string>
        }[]
      }
    | undefined
}

export function PolicyDistributionTable({ policyDistribution }: PolicyDistributionTableProps) {
  // Add default values to prevent destructuring errors
  const { categories = [], columns = [], data: tableData = [] } = policyDistribution || {}

  // If no data is available, show a fallback message
  if (!policyDistribution || !categories.length || !columns.length) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-base font-semibold mb-4">Policy Distribution by Payer Type</h2>
        <p className="text-gray-500 text-center py-8">No policy distribution data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-base font-semibold mb-4">Policy Distribution by Payer Type</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {/* Empty corner cell */}
              <th className="p-2"></th>
              {columns.map((column, index) => (
                <th key={index} className="p-2 text-center text-xs font-medium text-slate-500">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 text-xs font-medium text-slate-700">{row.category}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2">
                    <div
                      className={cn(
                        "flex items-center justify-center p-2 rounded-md text-sm font-medium no-shadow",
                        row.colors[column],
                      )}
                    >
                      {row.values[column]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
