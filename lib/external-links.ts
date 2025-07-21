// External links configuration for Claim Repricer and Payment Leakage
export const EXTERNAL_LINKS = {
  // Claim Repricer links
  "repricer-dashboard": "https://example.com/repricer-dashboard", // Replace with actual URL
  "claims-process": "https://example.com/claims-process", // Replace with actual URL

  // Payment Leakage links
  "leakage-overview": "https://example.com/leakage-overview", // Replace with actual URL
  "data-ingestion": "https://example.com/data-ingestion", // Replace with actual URL
  "diagnosis-config": "https://example.com/diagnosis-config", // Replace with actual URL
  "file-config-status": "https://example.com/file-config-status", // Replace with actual URL
  "claims-management": "https://example.com/claims-management", // Replace with actual URL
} as const;

// Helper function to get external link by ID
export const getExternalLink = (id: string): string | null => {
  return EXTERNAL_LINKS[id as keyof typeof EXTERNAL_LINKS] || null;
};

// Helper function to check if a link is external
export const isExternalLink = (id: string): boolean => {
  return id in EXTERNAL_LINKS;
};
