"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column {
  id: string
  label: string
  sortable: boolean
}

interface Payer {
  name: string
  logo: string
}

interface Policy {
  id: string
  policyName: string
  payer: Payer
  clinicalCategory: string
  spendUnderManagement: string
  expDenialValue: string
  lastUpdated: string
}

interface PolicyTableProps {
  columns: Column[]
  policies: Policy[]
  totalPolicies: number
  currentPage: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  sortColumn?: string
  sortDirection?: "asc" | "desc"
  onSort: (column: string) => void
}

export function PolicyTable({
  columns,
  policies,
  totalPolicies,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  sortColumn,
  sortDirection,
  onSort,
}: PolicyTableProps) {
  const startIndex = (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(startIndex + policies.length - 1, totalPolicies)

  const getPayerLogo = (logo: string) => {
    const logos: Record<string, string> = {
      bcbs: "/bcbs-logo.png",
      united: "/united-logo.png",
      aetna: "/aetna-logo.png",
      cigna: "/cigna-logo.png",
      hcsc: "/hcsc-logo.png",
    }
    return logos[logo] || "/generic-insurance-logo.png"
  }

  // Function to split long text into exactly two lines
  const formatLongText = (text: string, maxLength = 40) => {
    if (text.length <= maxLength) return text

    // Find a space near the middle to split the text
    const middleIndex = Math.floor(text.length / 2)
    let splitIndex = text.lastIndexOf(" ", middleIndex)

    // If no space found, just split at maxLength
    if (splitIndex === -1 || splitIndex < maxLength / 2) {
      splitIndex = maxLength
    }

    const firstLine = text.substring(0, splitIndex)
    const secondLine = text.substring(splitIndex).trim()

    return (
      <>
        <div className="line-clamp-1">{firstLine}</div>
        <div className="line-clamp-1">{secondLine}</div>
      </>
    )
  }

  // Get color for clinical category
  const getClinicalCategoryColor = (category: string) => {
    switch (category) {
      case "Orthopedic":
        return "bg-primary-100 text-primary-800"
      case "Hematologic":
        return "bg-secondary-100 text-secondary-800"
      case "Allergy":
        return "bg-blue-100 text-blue-800"
      case "Medication":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500",
                    column.sortable && "cursor-pointer hover:bg-slate-100",
                  )}
                  onClick={() => column.sortable && onSort(column.id)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable && sortColumn === column.id && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? (
                          <ChevronDown className="h-4 w-4 rotate-180 transform no-shadow" />
                        ) : (
                          <ChevronDown className="h-4 w-4 no-shadow" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {policies.map((policy, index) => (
              <tr key={policy.id} className={cn("hover:bg-blue-50", index % 2 === 0 ? "bg-white" : "bg-[#F6F6F6]")}>
                <td className="whitespace-normal px-6 py-4">
                  <div className="text-sm font-medium text-slate-900 h-12 flex flex-col justify-center">
                    {formatLongText(policy.policyName, 35)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0 bg-white rounded-full overflow-hidden border border-slate-200 flex items-center justify-center no-shadow">
                      <Image
                        src={getPayerLogo(policy.payer.logo) || "/placeholder.svg"}
                        alt={policy.payer.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{policy.payer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-normal px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-medium no-shadow",
                      getClinicalCategoryColor(policy.clinicalCategory),
                    )}
                  >
                    {policy.clinicalCategory}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{policy.spendUnderManagement}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{policy.expDenialValue}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{policy.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <span className="text-sm text-slate-700">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="ml-2 rounded-md border-slate-300 py-1 pl-2 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 no-shadow"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-slate-700">
            {startIndex}–{endIndex} of {totalPolicies}
          </p>
          <nav className="ml-4 flex items-center" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 rounded-md p-1 text-slate-400 hover:text-blue-700 disabled:opacity-50 no-shadow"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5 no-shadow" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={endIndex === totalPolicies}
              className="rounded-md p-1 text-slate-400 hover:text-blue-700 disabled:opacity-50 no-shadow"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5 no-shadow" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
