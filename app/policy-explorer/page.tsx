"use client";

import { PolicyCommandCenter } from "@/components/policies/policy-command-center";
import { LayoutWithNav } from "../layout-with-nav";

export default function PolicyExplorerPage() {
  return (
    <LayoutWithNav activeTab="policy-explorer">
      <PolicyCommandCenter />
    </LayoutWithNav>
  );
}
