import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/contexts/TranslationContext"
import TranslationInfo from "@/components/TranslationInfo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "독립유공 아카이브",
  description: "지식그래프를 이용한 독립유공자 판결문",
    generator: '정현성'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TranslationProvider>
            {children}
            <TranslationInfo />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
