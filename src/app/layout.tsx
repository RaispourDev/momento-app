import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'گالری عکس',
  description: 'برنامه گالری عکس',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}