import { cn } from "@/lib/utils"

interface Column {
  id: string
  label: string
  type: string
}

interface RowData {
  id: string
  [key: string]: any
}

interface CodeExplorerTableProps {
  data: {
    columns: Column[]
    data: RowData[]
  }
}

export function CodeExplorerTable({ data }: CodeExplorerTableProps) {
  const { columns, data: tableData } = data

  const renderCoveredStatus = (status: string) => {
    const statuses = status.split("\n")

    return (
      <div className="flex flex-col gap-1">
        {statuses.map((item, index) => (
          <span key={index} className={cn("text-xs", item === "Covered" ? "text-green-600" : "text-red-600")}>
            {item}
          </span>
        ))}
      </div>
    )
  }

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
          {tableData.map((row) => (
            <tr key={row.id} className="border-b hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.id} className="p-3 text-sm">
                  {column.type === "status" ? renderCoveredStatus(row[column.id]) : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
