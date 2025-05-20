"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { LayoutList, Search } from "lucide-react"
import { PolicyTable } from "./policy-table"
import mockData from "@/data/mockData.json"

export function NeedsReview() {
  const { totalPolicies, columns, policies, suggestions } = mockData.needsReview

  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState("policyName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter policies based on search query
  const filteredPolicies = useMemo(() => {
    if (!searchQuery) return policies

    return policies.filter((policy) => policy.policyName.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [policies, searchQuery])

  // Sort policies based on sort column and direction
  const sortedPolicies = useMemo(() => {
    return [...filteredPolicies].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      // Handle nested objects like payer
      if (sortColumn === "payer") {
        const aName = (a.payer as any).name
        const bName = (b.payer as any).name
        return sortDirection === "asc" ? aName.localeCompare(bName) : bName.localeCompare(aName)
      }

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })
  }, [filteredPolicies, sortColumn, sortDirection])

  // Handle sort column change
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column)
      setSortDirection("asc")
    }
    // Reset to first page when sorting changes
    setCurrentPage(1)
  }

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when search changes
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle rows per page change
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    setCurrentPage(1) // Reset to first page when rows per page changes
  }

  // Get current page of policies
  const currentPolicies = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return sortedPolicies.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedPolicies, currentPage, rowsPerPage])

  return (
    <div className="p-8 mt-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Search Policies</h1>
        <p className="text-sm text-slate-500">Browse all payers policies, and compare them against each other.</p>
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <LayoutList className="mr-2 h-5 w-5 text-blue-500" />
            <h2 className="text-base font-medium">Policy Results</h2>
            <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 no-shadow">
              {filteredPolicies.length} policies
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(90deg, #449CFB, #F087FB) border-box",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "transparent",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter a keyword, policy name, policy provider, or code"
              className="w-full rounded-full border-0 py-3 px-6 focus:outline-none bg-white"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-14 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 no-shadow"
              >
                <span className="sr-only">Clear search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-[#449cfb] no-shadow" />
            </div>
          </div>
        </div>

        <PolicyTable
          columns={columns}
          policies={currentPolicies}
          totalPolicies={filteredPolicies.length}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
    </div>
  )
}
