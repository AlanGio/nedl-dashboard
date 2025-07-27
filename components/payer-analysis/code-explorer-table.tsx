import { cn } from "@/lib/utils";

interface Column {
  id: string;
  label: string;
  type: string;
}

interface RowData {
  id: string;
  [key: string]: any;
}

interface CodeExplorerTableProps {
  codeExplorer:
    | {
        columns: Column[];
        data: RowData[];
      }
    | undefined;
}

export function CodeExplorerTable({ codeExplorer }: CodeExplorerTableProps) {
  // Provide default values to prevent destructuring errors
  const { columns = [], data: tableData = [] } = codeExplorer || {};

  // Show fallback UI when no data is available
  if (!codeExplorer || !columns.length) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        <p>No code explorer data available</p>
      </div>
    );
  }

  const renderCoveredStatus = (status: string) => {
    const statuses = status.split("\n");

    return (
      <div className="flex flex-col gap-1">
        {statuses.map((item, index) => (
          <span
            key={index}
            className={cn(
              "text-xs",
              item === "Covered" ? "text-green-600" : "text-red-600"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  // Filter out the "Code" column and update "Status" to "Policy Count"
  const filteredColumns = columns
    .filter((column) => column.id !== "code")
    .map((column) => ({
      ...column,
      label: column.id === "status" ? "Policy Count" : column.label,
    }));

  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="w-full">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b">
            {filteredColumns.map((column, index) => (
              <th
                key={index}
                className="p-3 text-left text-xs font-medium text-slate-500 uppercase"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="border-b hover:bg-slate-50">
              {filteredColumns.map((column) => (
                <td key={column.id} className="p-3 text-sm">
                  {column.id === "status"
                    ? Math.floor(Math.random() * 171) + 10 // Random number between 10 and 180
                    : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
