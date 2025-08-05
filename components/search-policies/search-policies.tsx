"use client";

import type React from "react";

import { useState, useMemo, useEffect, useRef } from "react";
import { LayoutList, Search, ChevronDown, X } from "lucide-react";
import { PolicyTable } from "./policy-table";
import { ComparisonBox } from "./comparison-box";
import { ComparisonModal } from "./comparison-modal";
import { BestInClassModal } from "./best-in-class-modal";
import mockData from "@/data/mockData.json";

interface SearchPoliciesProps {
  selectedPolicies: string[];
  onPolicySelect: (policyId: string) => void;
  onRemovePolicy: (policyId: string) => void;
}

export function SearchPolicies({
  selectedPolicies,
  onPolicySelect,
  onRemovePolicy,
}: SearchPoliciesProps) {
  const { totalPolicies, columns, policies, suggestions } =
    mockData.needsReview;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("policyName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isBestInClassModalOpen, setIsBestInClassModalOpen] = useState(false);
  const [selectedPolicyForComparison, setSelectedPolicyForComparison] =
    useState<any>(null);

  // Filter states
  const [selectedPayers, setSelectedPayers] = useState<string[]>([]);
  const [selectedClinicalCategory, setSelectedClinicalCategory] =
    useState<string>("");
  const [isPayerDropdownOpen, setIsPayerDropdownOpen] = useState(false);
  const [isClinicalCategoryDropdownOpen, setIsClinicalCategoryDropdownOpen] =
    useState(false);

  // Refs for dropdowns
  const payerDropdownRef = useRef<HTMLDivElement>(null);
  const clinicalCategoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        payerDropdownRef.current &&
        !payerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPayerDropdownOpen(false);
      }
      if (
        clinicalCategoryDropdownRef.current &&
        !clinicalCategoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsClinicalCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get unique payers and clinical categories from policies
  const uniquePayers = useMemo(() => {
    const payers = policies.map((policy) => policy.payer.name);
    return [...new Set(payers)].sort();
  }, [policies]);

  const uniqueClinicalCategories = useMemo(() => {
    const categories = policies.map((policy) => policy.clinicalCategory);
    return [...new Set(categories)].sort();
  }, [policies]);

  // Filter policies based on search query, payers, and clinical category
  const filteredPolicies = useMemo(() => {
    let filtered = policies;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((policy) =>
        policy.policyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected payers
    if (selectedPayers.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedPayers.includes(policy.payer.name)
      );
    }

    // Filter by selected clinical category
    if (selectedClinicalCategory) {
      filtered = filtered.filter(
        (policy) => policy.clinicalCategory === selectedClinicalCategory
      );
    }

    return filtered;
  }, [policies, searchQuery, selectedPayers, selectedClinicalCategory]);

  // Sort policies based on sort column and direction
  const sortedPolicies = useMemo(() => {
    return [...filteredPolicies].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      // Handle nested objects like payer
      if (sortColumn === "payer") {
        const aName = (a.payer as any).name;
        const bName = (b.payer as any).name;
        return sortDirection === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [filteredPolicies, sortColumn, sortDirection]);

  // Handle sort column change
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Handle payer selection
  const handlePayerToggle = (payer: string) => {
    setSelectedPayers((prev) =>
      prev.includes(payer) ? prev.filter((p) => p !== payer) : [...prev, payer]
    );
    setCurrentPage(1);
  };

  // Handle clear all payers
  const handleClearPayers = () => {
    setSelectedPayers([]);
    setCurrentPage(1);
  };

  // Handle clinical category selection
  const handleClinicalCategoryChange = (category: string) => {
    setSelectedClinicalCategory(category);
    setCurrentPage(1);
  };

  // Handle clear clinical category
  const handleClearClinicalCategory = () => {
    setSelectedClinicalCategory("");
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Handle compare button click
  const handleCompare = () => {
    setIsComparisonModalOpen(true);
  };

  // Handle close comparison modal
  const handleCloseComparisonModal = () => {
    setIsComparisonModalOpen(false);
  };

  // Handle compare with best in class
  const handleCompareBestInClass = (policy: any) => {
    setSelectedPolicyForComparison(policy);
    setIsBestInClassModalOpen(true);
  };

  // Handle close best in class modal
  const handleCloseBestInClassModal = () => {
    setIsBestInClassModalOpen(false);
    setSelectedPolicyForComparison(null);
  };

  // Get current page of policies
  const currentPolicies = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedPolicies.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedPolicies, currentPage, rowsPerPage]);

  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Search Policies</h1>
        <p className="text-sm text-slate-500">
          Browse all payers policies, and compare them against each other.
        </p>
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

        {/* Search and Filters Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="min-w-[450px] w-full">
              <div
                className="relative rounded-full"
                style={{
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(90deg, #449CFB, #F5709A) border-box",
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
                  className="w-full rounded-full border-0 py-2.5 px-5 focus:outline-none bg-white text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 no-shadow"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-[#449cfb] no-shadow" />
                </div>
              </div>
            </div>

            {/* Payer Filter */}
            <div className="relative" ref={payerDropdownRef}>
              <button
                onClick={() => setIsPayerDropdownOpen(!isPayerDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-3 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-slate-50 min-w-[160px]"
              >
                <span className="text-slate-900">
                  {selectedPayers.length === 0
                    ? "All Payers"
                    : selectedPayers.length === 1
                    ? selectedPayers[0]
                    : `${selectedPayers.length} selected`}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {isPayerDropdownOpen && (
                <div className="absolute z-50 mt-1 w-64 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Select Payers
                      </span>
                      {selectedPayers.length > 0 && (
                        <button
                          onClick={handleClearPayers}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {uniquePayers.map((payer) => (
                      <label
                        key={payer}
                        className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPayers.includes(payer)}
                          onChange={() => handlePayerToggle(payer)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                        <span className="text-sm text-slate-900">{payer}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Category Filter */}
            <div className="relative" ref={clinicalCategoryDropdownRef}>
              <button
                onClick={() =>
                  setIsClinicalCategoryDropdownOpen(
                    !isClinicalCategoryDropdownOpen
                  )
                }
                className="flex items-center space-x-2 px-4 py-3 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-slate-50 min-w-[180px]"
              >
                <span className="text-slate-900">
                  {selectedClinicalCategory || "All Categories"}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {isClinicalCategoryDropdownOpen && (
                <div className="absolute z-50 mt-1 w-64 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Select Category
                      </span>
                      {selectedClinicalCategory && (
                        <button
                          onClick={handleClearClinicalCategory}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handleClinicalCategoryChange("");
                        setIsClinicalCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded text-sm text-slate-900"
                    >
                      All Categories
                    </button>
                    {uniqueClinicalCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          handleClinicalCategoryChange(category);
                          setIsClinicalCategoryDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded text-sm text-slate-900"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedPayers.length > 0 || selectedClinicalCategory) && (
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-sm text-slate-500">Active filters:</span>
              {selectedPayers.map((payer) => (
                <span
                  key={payer}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {payer}
                  <button
                    onClick={() => handlePayerToggle(payer)}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedClinicalCategory && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {selectedClinicalCategory}
                  <button
                    onClick={handleClearClinicalCategory}
                    className="ml-1 hover:text-green-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Comparison Instructions Poster */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">
                Compare Policies
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Select up to 4 policies using the checkboxes to compare them
                side by side. Click the "Compare" button in the floating bar at
                the bottom to view detailed comparisons.
              </p>
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
          selectedPolicies={selectedPolicies}
          onPolicySelect={onPolicySelect}
          maxSelections={4}
          onCompareBestInClass={handleCompareBestInClass}
        />
      </div>

      {/* Get selected policy objects for comparison box */}
      {(() => {
        const selectedPolicyObjects = policies.filter((policy) =>
          selectedPolicies.includes(policy.id)
        );

        return (
          <>
            <ComparisonBox
              selectedPolicies={selectedPolicyObjects}
              onRemovePolicy={onRemovePolicy}
              onCompare={handleCompare}
              isVisible={selectedPolicies.length > 0}
            />

            <ComparisonModal
              selectedPolicies={selectedPolicyObjects}
              isOpen={isComparisonModalOpen}
              onClose={handleCloseComparisonModal}
            />

            <BestInClassModal
              selectedPolicy={selectedPolicyForComparison}
              isOpen={isBestInClassModalOpen}
              onClose={handleCloseBestInClassModal}
            />
          </>
        );
      })()}
    </div>
  );
}
