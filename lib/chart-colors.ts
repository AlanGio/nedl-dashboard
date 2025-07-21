// Centralized chart color palette
export const CHART_COLORS = {
  primary: "#449CFB", // Blue
  secondary: "#F08C76", // Coral/Orange
  tertiary: "#F5709A", // Pink
  quaternary: "#B782E8", // Purple
  quinary: "#82F09A", // Green
  senary: "#FFB366", // Orange/Yellow
} as const;

// Array format for components that expect an array of colors
export const CHART_COLORS_ARRAY = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.tertiary,
  CHART_COLORS.quaternary,
  CHART_COLORS.quinary,
  CHART_COLORS.senary,
] as const;

// Color mapping for specific data categories
export const CATEGORY_COLORS = {
  // Payer types
  Commercial: CHART_COLORS.primary,
  Medicare: CHART_COLORS.secondary,
  Medicaid: CHART_COLORS.tertiary,

  // Coverage status
  Covered: CHART_COLORS.quinary,
  "Prior Auth": CHART_COLORS.senary,
  "Not Covered": CHART_COLORS.secondary,

  // Policy status
  Approved: CHART_COLORS.quinary,
  Pending: CHART_COLORS.senary,
  Rejected: CHART_COLORS.secondary,

  // Chart series
  Actual: CHART_COLORS.primary,
  Target: CHART_COLORS.tertiary,
  Effectiveness: CHART_COLORS.primary,
  "Adoption Rate": CHART_COLORS.secondary,
  Policies: CHART_COLORS.primary,
  HCPCS: CHART_COLORS.tertiary,
  Modifiers: CHART_COLORS.quaternary,
  Current: CHART_COLORS.primary,
  Benchmark: CHART_COLORS.secondary,

  // Default fallback colors
  default: CHART_COLORS.primary,
} as const;

// Helper function to get color by index (for array-based color usage)
export const getColorByIndex = (index: number): string => {
  return CHART_COLORS_ARRAY[index % CHART_COLORS_ARRAY.length];
};

// Helper function to get color by category name
export const getColorByCategory = (category: string): string => {
  return (
    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    CATEGORY_COLORS.default
  );
};
