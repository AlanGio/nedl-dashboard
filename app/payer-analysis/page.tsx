"use client";

import { PayerAnalysis } from "@/components/payer-analysis/payer-analysis";
import { LayoutWithNav } from "../layout-with-nav";

export default function PayerAnalysisPage() {
  return (
    <LayoutWithNav activeTab="payer-analysis">
      <PayerAnalysis />
    </LayoutWithNav>
  );
}
