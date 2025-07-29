"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutWithNav } from "@/app/layout-with-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import policiesData from "@/data/lcd-mcd-policies.json";

interface Policy {
  id: string;
  name: string;
  pmpm: number;
  category: string;
  status: string;
  lastUpdated: string;
}

interface PoliciesData {
  policies: {
    [key: string]: Policy[];
  };
}

export default function LCDMCDCoverage() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [viewMode, setViewMode] = useState<"browse" | "search">("browse");
  const [searchQuery, setSearchQuery] = useState("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setViewMode("browse");
    setSearchQuery("");
  };

  const handleSearchMode = () => {
    setViewMode("search");
    setSelectedLetter("");
  };

  const handleBrowseMode = () => {
    setViewMode("browse");
    setSearchQuery("");
    if (!selectedLetter) setSelectedLetter("A");
  };

  const getFilteredPolicies = (): Policy[] => {
    const typedPoliciesData = policiesData as PoliciesData;

    if (viewMode === "search" && searchQuery.trim()) {
      // Search across all policies
      const allPolicies: Policy[] = Object.values(
        typedPoliciesData.policies
      ).flat();
      return allPolicies.filter((policy) =>
        policy.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (viewMode === "browse" && selectedLetter) {
      // Browse by selected letter
      return typedPoliciesData.policies[selectedLetter] || [];
    }
    return [];
  };

  const filteredPolicies = getFilteredPolicies();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "experimental":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePolicyClick = (policyId: string) => {
    router.push(`/lcd-mcd-coverage/${policyId}`);
  };

  return (
    <LayoutWithNav>
      <div className="p-6">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                LCD / MCD Coverage
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Browse and search Local Coverage Determinations (LCD) and
                Medicare Coverage Determinations (MCD)
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "browse" ? "default" : "outline"}
              onClick={handleBrowseMode}
              className="flex-1 sm:flex-none"
            >
              Browse By Letter
            </Button>
            <Button
              variant={viewMode === "search" ? "default" : "outline"}
              onClick={handleSearchMode}
              className="flex-1 sm:flex-none"
            >
              Search By Policy Name
            </Button>
          </div>
        </div>

        {/* Browse by Letter Section */}
        {viewMode === "browse" && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Browse by Letter
            </h2>
            <div
              className="grid grid-cols-13 gap-2 mb-6"
              style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
            >
              {alphabet.map((letter) => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLetterClick(letter)}
                  className="h-10 w-10 p-0 text-sm font-medium"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Section */}
        {viewMode === "search" && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search By Policy Name
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Enter policy name to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {viewMode === "browse"
                ? `Policies starting with "${selectedLetter}"`
                : searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Policies"}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredPolicies.length} policy
              {filteredPolicies.length !== 1 ? "ies" : "y"}
            </span>
          </div>

          {filteredPolicies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {viewMode === "search"
                  ? "No policies found matching your search criteria."
                  : "No policies available for this letter."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPolicies.map((policy) => (
                <Card
                  key={policy.id}
                  className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handlePolicyClick(policy.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePolicyClick(policy.id);
                    }
                  }}
                  aria-label={`View details for ${policy.name}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
                          {policy.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Total PMPM: ${policy.pmpm.toFixed(2)}
                          </span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getStatusColor(
                              policy.status
                            )}`}
                          >
                            {policy.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{policy.category}</span>
                        <span>Updated: {formatDate(policy.lastUpdated)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Policies:</span>
                  <span className="font-medium">
                    {
                      Object.values(
                        (policiesData as PoliciesData).policies
                      ).flat().length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Policies:</span>
                  <span className="font-medium">
                    {
                      Object.values((policiesData as PoliciesData).policies)
                        .flat()
                        .filter((p) => p.status === "Active").length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span className="font-medium">
                    {
                      new Set(
                        Object.values((policiesData as PoliciesData).policies)
                          .flat()
                          .map((p) => p.category)
                      ).size
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Recent Updates
              </h4>
              <div className="space-y-2 text-sm">
                {Object.values((policiesData as PoliciesData).policies)
                  .flat()
                  .sort(
                    (a, b) =>
                      new Date(b.lastUpdated).getTime() -
                      new Date(a.lastUpdated).getTime()
                  )
                  .slice(0, 3)
                  .map((policy) => (
                    <div
                      key={policy.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600 truncate">
                        {policy.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(policy.lastUpdated)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Top Categories
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(
                  Object.values((policiesData as PoliciesData).policies)
                    .flat()
                    .reduce((acc, policy) => {
                      acc[policy.category] = (acc[policy.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-600">{category}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWithNav>
  );
}
