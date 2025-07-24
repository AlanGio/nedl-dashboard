import type React from "react";
import type { Metadata } from "next";
import { Open_Sans, Comfortaa } from "next/font/google";
import "./globals.css";

// Define Open Sans as the main font
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Define Comfortaa as the title font
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nedl Labs :: Healthcare Analytics Dashboard",
  description:
    "Modern healthcare analytics dashboard with metrics and insights for payer analysis, policy intelligence, and coverage metrics across your network.",
  keywords: [
    "healthcare",
    "analytics",
    "dashboard",
    "payer analysis",
    "policy intelligence",
    "coverage metrics",
  ],
  authors: [{ name: "Nedl Labs" }],
  creator: "Nedl Labs",
  publisher: "Nedl Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nedl-labs.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nedl Labs :: Healthcare Analytics Dashboard",
    description:
      "Analyze payer policies and coverage metrics across your network with our comprehensive healthcare analytics dashboard.",
    url: "https://nedl-labs.com", // Replace with your actual domain
    siteName: "Nedl Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nedl Labs Healthcare Analytics Dashboard showing payer analysis, policy intelligence, and coverage metrics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nedl Labs :: Healthcare Analytics Dashboard",
    description:
      "Analyze payer policies and coverage metrics across your network with our comprehensive healthcare analytics dashboard.",
    images: ["/og-image.png"],
    creator: "@nedllabs", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${comfortaa.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
