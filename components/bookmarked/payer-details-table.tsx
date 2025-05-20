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
  tableData: {
    columns: Column[]
    data: RowData[]
  }
}

export function PayerDetailsTable({ tableData }: PayerDetailsTableProps) {
  const { columns, data } = tableData

  return (
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
  )
}
