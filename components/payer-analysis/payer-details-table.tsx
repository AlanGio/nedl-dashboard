import { Check } from "lucide-react"

interface Column {
  id: string
  label: string
  type: string
}

interface RowData {
  id: string
  [key: string]: any
}

interface PayerDetailsTableProps {
  tableData?: {
    columns: Column[]
    data: RowData[]
  }
}

export function PayerDetailsTable({ tableData }: PayerDetailsTableProps) {
  // Provide default values to prevent destructuring errors
  const { columns = [], data = [] } = tableData || {}

  // If no data is provided, show a placeholder message
  if (!tableData || columns.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payer Details</h3>
        <p className="text-gray-500">No payer details data available at this time.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Payer Details</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column, index) => (
                <th key={index} className="p-3 text-left text-xs font-medium text-slate-500 uppercase">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.id} className="p-3 text-sm">
                    {column.type === "checkbox" ? (
                      row[column.id] ? (
                        <div className="flex items-center justify-center">
                          <Check className="h-5 w-5 text-primary-500" />
                        </div>
                      ) : null
                    ) : (
                      row[column.id]
                    )}
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
