import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xl: "22px", // Override text-xl to be 22px
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        title: ["var(--font-comfortaa)"],
        menu: ["var(--font-comfortaa)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        sidebar: {
          bg: "#f5f5f5",
          text: "#4d4d4d",
          muted: "#858585",
          border: "#d9d9d9",
        },
        primary: {
          DEFAULT: "#449CFB",
          50: "#EBF5FF",
          100: "#D6EAFF",
          200: "#ADD5FF",
          300: "#85C0FF",
          400: "#5CABFF",
          500: "#449CFB",
          600: "#1A7DF7",
          700: "#0A66D3",
          800: "#0850A8",
          900: "#063A7E",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#F087FB",
          50: "#FDF5FF",
          100: "#FAEBFE",
          200: "#F6D6FD",
          300: "#F3C2FC",
          400: "#F087FB",
          500: "#E85DF9",
          600: "#D934F7",
          700: "#C010E4",
          800: "#9A0CB5",
          900: "#730886",
          foreground: "hsl(var(--secondary-foreground))",
        },
        blue: {
          DEFAULT: "#0071EA",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0071EA",
          600: "#005BC7",
          700: "#0046A3",
          800: "#003180",
          900: "#001D5C",
        },
        purple: {
          DEFAULT: "#8A287F",
          50: "#F9E6F7",
          100: "#F3CCEF",
          200: "#E799DF",
          300: "#DB66CF",
          400: "#CF33BF",
          500: "#8A287F",
          600: "#6F2066",
          700: "#54194C",
          800: "#3A1133",
          900: "#1F0819",
        },
        gray: {
          DEFAULT: "#4D4D4D",
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
