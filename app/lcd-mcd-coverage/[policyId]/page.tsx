"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { LayoutWithNav } from "@/app/layout-with-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MessageCircle,
  Pin,
  Check,
  X,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  FileText,
  AlertCircle,
  Info,
  Clock,
  TrendingUp,
  Shield,
  Activity,
  Target,
  BarChart3,
  Heart,
  Stethoscope,
  Pill,
  Microscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Wrench,
  Zap,
} from "lucide-react";
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

interface PolicyDetailProps {
  params: {
    policyId: string;
  };
}

// Category icon mapping
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    Cardiology: Heart,
    Oncology: Activity,
    Orthopedics: Bone,
    Neurology: Brain,
    Ophthalmology: Eye,
    Pediatrics: Baby,
    "General Surgery": Wrench,
    "Emergency Medicine": Zap,
    Endocrinology: Pill,
    Pathology: Microscope,
    Radiology: BarChart3,
    Dermatology: Shield,
    Gastroenterology: Stethoscope,
    "Allergy & Immunology": Target,
    Psychiatry: Brain,
    "Physical Therapy": Activity,
    "Reproductive Medicine": Baby,
    "Sleep Medicine": Clock,
    "Sports Medicine": Activity,
    "Transplant Medicine": Heart,
    "Vascular Surgery": Heart,
    Urology: Stethoscope,
    Audiology: Eye,
    Dental: FileText,
    "Plastic Surgery": Shield,
    "Oral Surgery": Wrench,
    Hepatology: Stethoscope,
    Nephrology: Heart,
    "Infectious Disease": Microscope,
    "Child Psychiatry": Brain,
    "Quality Management": Target,
    Telemedicine: Zap,
    "Urgent Care": Zap,
    "Wound Care": Shield,
    "Evaluation & Management": FileText,
    Surgery: Wrench,
    "End of Life Care": Heart,
    Obstetrics: Baby,
    Gynecology: Baby,
    Genetics: Microscope,
    "Preventive Medicine": Shield,
  };
  return iconMap[category] || FileText;
};

export default function PolicyDetail({ params }: PolicyDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "summary" | "services" | "coding" | "analytics"
  >("summary");

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const policyId = unwrappedParams.policyId;

  // Find the policy by ID
  const typedPoliciesData = policiesData as PoliciesData;
  const allPolicies = Object.values(typedPoliciesData.policies).flat();
  const policy = allPolicies.find((p) => p.id === policyId);

  // If policy not found, show error or redirect
  if (!policy) {
    return (
      <LayoutWithNav>
        <div className="p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Policy Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The requested policy could not be found.
            </p>
            <Button onClick={() => router.push("/lcd-mcd-coverage")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Policies
            </Button>
          </div>
        </div>
      </LayoutWithNav>
    );
  }

  const CategoryIcon = getCategoryIcon(policy.category);

  // Enhanced detailed policy data
  const policyDetails = {
    summary: {
      description: `This comprehensive policy establishes medical necessity criteria for ${
        policy.name
      }. The policy covers medically necessary procedures and services for the diagnosis and treatment of ${policy.category.toLowerCase()} conditions. Coverage is determined based on clinical evidence, FDA approval status, and established medical guidelines. This policy ensures appropriate utilization while maintaining quality patient care and cost-effectiveness.`,
      commercialSpend: policy.pmpm > 1 ? `$${policy.pmpm.toFixed(1)}M` : "N/A",
      commercialSavings:
        policy.pmpm > 0.5 ? `$${(policy.pmpm * 0.2).toFixed(1)}M` : "N/A",
      maSpend: `$${policy.pmpm.toFixed(1)} PMPM`,
      maSavings: `$${(policy.pmpm * 0.2).toFixed(1)} PMPM`,
      totalMembers: "2.4M",
      affectedClaims: "45,230",
      approvalRate: "87.3%",
      denialRate: "12.7%",
      avgProcessingTime: "3.2 days",
    },
    coveredServices: [
      `${
        policy.name
      } for diagnosis and treatment of ${policy.category.toLowerCase()} conditions`,
      "Medically necessary diagnostic procedures and tests",
      "FDA-approved devices, equipment, and medications",
      "Follow-up care and monitoring as clinically indicated",
      "Preventive services when medically appropriate",
      "Specialist consultations and referrals",
    ],
    notCoveredServices: [
      "Experimental or investigational procedures not approved by FDA",
      "Non-FDA approved devices, equipment, or medications",
      "Cosmetic or elective procedures without medical necessity",
      "Services not medically necessary for the patient's condition",
      "Duplicate or redundant services within the same episode of care",
      "Services provided outside of the approved network without prior authorization",
    ],
    coding: {
      coveredCodes: [
        {
          code: "CPT 93000",
          description:
            "Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report",
          category: "Diagnostic",
        },
        {
          code: "CPT 93010",
          description:
            "Electrocardiogram, routine ECG with at least 12 leads; interpretation and report only",
          category: "Diagnostic",
        },
        {
          code: "CPT 93040",
          description: "Rhythm ECG, 1-3 leads; with interpretation and report",
          category: "Monitoring",
        },
        {
          code: "CPT 93041",
          description: "Rhythm ECG, 1-3 leads; interpretation and report only",
          category: "Monitoring",
        },
        {
          code: "CPT 93224",
          description:
            "External electrocardiographic recording up to 48 hours by continuous rhythm recording and storage",
          category: "Monitoring",
        },
        {
          code: "CPT 93225",
          description:
            "External electrocardiographic recording up to 48 hours by continuous rhythm recording and storage; review and interpretation",
          category: "Monitoring",
        },
      ],
      notCoveredCodes: [
        {
          code: "CPT 93042",
          description: "Rhythm ECG, 1-3 leads; interpretation and report only",
          category: "Monitoring",
          reason: "Not medically necessary",
        },
        {
          code: "CPT 93226",
          description:
            "External electrocardiographic recording for more than 48 hours up to 21 days",
          category: "Monitoring",
          reason: "Requires prior authorization",
        },
        {
          code: "CPT 93227",
          description:
            "External electrocardiographic recording for more than 48 hours up to 21 days; review and interpretation",
          category: "Monitoring",
          reason: "Requires prior authorization",
        },
      ],
      unknownCodes: [
        {
          code: "CPT 93228",
          description:
            "External electrocardiographic recording for more than 21 days up to 30 days",
          category: "Monitoring",
          reason: "Under review",
        },
        {
          code: "CPT 93229",
          description:
            "External electrocardiographic recording for more than 21 days up to 30 days; review and interpretation",
          category: "Monitoring",
          reason: "Under review",
        },
      ],
    },
    analytics: {
      utilizationTrends: {
        monthlyClaims: [
          1250, 1320, 1180, 1450, 1390, 1520, 1480, 1610, 1580, 1720, 1690,
          1850,
        ],
        approvalTrends: [85, 87, 83, 89, 86, 88, 90, 87, 89, 91, 88, 92],
        costTrends: [
          1.2, 1.3, 1.1, 1.4, 1.3, 1.5, 1.4, 1.6, 1.5, 1.7, 1.6, 1.8,
        ],
      },
      topProviders: [
        { name: "Cardiology Associates", claims: 234, approvalRate: "94.2%" },
        {
          name: "Heart & Vascular Institute",
          claims: 189,
          approvalRate: "91.8%",
        },
        { name: "Regional Medical Center", claims: 156, approvalRate: "88.5%" },
        { name: "Community Hospital", claims: 134, approvalRate: "86.2%" },
      ],
      commonDenialReasons: [
        {
          reason: "Missing clinical documentation",
          count: 45,
          percentage: "23.4%",
        },
        {
          reason: "Service not medically necessary",
          count: 38,
          percentage: "19.8%",
        },
        {
          reason: "Prior authorization required",
          count: 32,
          percentage: "16.7%",
        },
        { reason: "Out-of-network provider", count: 28, percentage: "14.6%" },
        { reason: "Duplicate claim", count: 25, percentage: "13.0%" },
      ],
    },
  };

  // Get related policies (same category)
  const relatedPolicies = allPolicies
    .filter((p) => p.category === policy.category && p.id !== policy.id)
    .slice(0, 8);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/lcd-mcd-coverage")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Policies
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-6">
            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* Policy Header */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {policy.name}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Updated {formatDate(policy.lastUpdated)}
                        </span>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(policy.status)}
                        >
                          {policy.status}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />$
                          {policy.pmpm.toFixed(2)} PMPM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {policyDetails.summary.totalMembers}
                    </div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {policyDetails.summary.approvalRate}
                    </div>
                    <div className="text-sm text-gray-600">Approval Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {policyDetails.summary.affectedClaims}
                    </div>
                    <div className="text-sm text-gray-600">Affected Claims</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {policyDetails.summary.avgProcessingTime}
                    </div>
                    <div className="text-sm text-gray-600">Avg Processing</div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  {[
                    { id: "summary", label: "Summary", icon: FileText },
                    { id: "services", label: "Services", icon: Stethoscope },
                    { id: "coding", label: "Coding", icon: BarChart3 },
                    { id: "analytics", label: "Analytics", icon: TrendingUp },
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 ${
                          activeTab === tab.id
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "summary" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-600" />
                          Policy Overview
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
                          >
                            Original Policy
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {policyDetails.summary.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Financial Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            Commercial Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                              <span className="text-sm text-gray-600">
                                Spend under management:
                              </span>
                              <span className="text-lg font-semibold text-green-700">
                                {policyDetails.summary.commercialSpend}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm text-gray-600">
                                Expected potential savings:
                              </span>
                              <span className="text-lg font-semibold text-blue-700">
                                {policyDetails.summary.commercialSavings}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Medicare Advantage Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                              <span className="text-sm text-gray-600">
                                Spend under management:
                              </span>
                              <span className="text-lg font-semibold text-purple-700">
                                {policyDetails.summary.maSpend}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                              <span className="text-sm text-gray-600">
                                Expected potential savings:
                              </span>
                              <span className="text-lg font-semibold text-orange-700">
                                {policyDetails.summary.maSavings}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          Covered Services
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {policyDetails.coveredServices.map(
                            (service, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                              >
                                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{service}</span>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <X className="w-5 h-5 text-red-600" />
                          Services Not Medically Necessary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {policyDetails.notCoveredServices.map(
                            (service, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
                              >
                                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{service}</span>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "coding" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          Codes with Unknown Coverage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {policyDetails.coding.unknownCodes.map(
                            (code, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                              >
                                <div>
                                  <div className="font-mono text-sm font-semibold text-gray-900">
                                    {code.code}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {code.description}
                                  </div>
                                  <div className="text-xs text-yellow-700 mt-1">
                                    {code.reason}
                                  </div>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="bg-yellow-100 text-yellow-800"
                                >
                                  {code.category}
                                </Badge>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          Covered Codes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {policyDetails.coding.coveredCodes.map(
                            (code, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200"
                              >
                                <div>
                                  <div className="font-mono text-sm font-semibold text-gray-900">
                                    {code.code}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {code.description}
                                  </div>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  {code.category}
                                </Badge>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <X className="w-5 h-5 text-red-600" />
                          Codes Not Medically Necessary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {policyDetails.coding.notCoveredCodes.map(
                            (code, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200"
                              >
                                <div>
                                  <div className="font-mono text-sm font-semibold text-gray-900">
                                    {code.code}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {code.description}
                                  </div>
                                  <div className="text-xs text-red-700 mt-1">
                                    {code.reason}
                                  </div>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="bg-red-100 text-red-800"
                                >
                                  {code.category}
                                </Badge>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Top Providers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {policyDetails.analytics.topProviders.map(
                              (provider, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                >
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {provider.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {provider.claims} claims
                                    </div>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800"
                                  >
                                    {provider.approvalRate}
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            Common Denial Reasons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {policyDetails.analytics.commonDenialReasons.map(
                              (denial, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                                >
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {denial.reason}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {denial.count} denials
                                    </div>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="bg-red-100 text-red-800"
                                  >
                                    {denial.percentage}
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>

                          {/* Right Sidebar - Compare to Related Policies */}
              <div className="w-80 flex-shrink-0">
                <Card className="sticky top-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Compare to Related Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-0">
                      {relatedPolicies.map((relatedPolicy, index) => (
                        <div key={relatedPolicy.id}>
                          <button
                            onClick={() => handlePolicyClick(relatedPolicy.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left group"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {/* Policy Icon */}
                              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                {(() => {
                                  // Generate different colored icons based on policy name
                                  const colors = [
                                    "bg-blue-100 text-blue-600",
                                    "bg-green-100 text-green-600", 
                                    "bg-purple-100 text-purple-600",
                                    "bg-orange-100 text-orange-600",
                                    "bg-red-100 text-red-600",
                                    "bg-indigo-100 text-indigo-600",
                                    "bg-pink-100 text-pink-600",
                                    "bg-teal-100 text-teal-600"
                                  ];
                                  const colorIndex = relatedPolicy.name.length % colors.length;
                                  return (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colors[colorIndex]}`}>
                                      <span className="text-xs font-semibold">
                                        {relatedPolicy.name.charAt(0)}
                                      </span>
                                    </div>
                                  );
                                })()}
                              </div>
                              
                              {/* Policy Name */}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                  {relatedPolicy.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {relatedPolicy.category} • ${relatedPolicy.pmpm.toFixed(2)} PMPM
                                </div>
                              </div>
                            </div>
                            
                            {/* Compare Icon */}
                            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                              <svg 
                                className="w-3 h-3 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M9 5l7 7-7 7" 
                                />
                              </svg>
                            </div>
                          </button>
                          
                          {/* Separator line (except for last item) */}
                          {index < relatedPolicies.length - 1 && (
                            <div className="mx-4 border-t border-gray-100"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Show more policies indicator if there are more */}
                    {relatedPolicies.length >= 8 && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                          View More Related Policies
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      </div>
    </LayoutWithNav>
  );
}
