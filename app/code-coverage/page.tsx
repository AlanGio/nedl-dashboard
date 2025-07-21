"use client";

import { CodeCoverage } from "@/components/code-coverage/code-coverage";
import { LayoutWithNav } from "../layout-with-nav";

export default function CodeCoveragePage() {
  return (
    <LayoutWithNav activeTab="code-coverage">
      <CodeCoverage />
    </LayoutWithNav>
  );
}
