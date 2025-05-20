import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Comfortaa } from "next/font/google"
import "./globals.css"

// Define Open Sans as the main font
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

// Define Comfortaa as the title font
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nedl Labs :: Healthcare Analytics Dashboard",
  description: "Modern healthcare analytics dashboard with metrics and insights",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${comfortaa.variable} font-sans`}>{children}</body>
    </html>
  )
}
