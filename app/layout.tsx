import type { ReactNode } from "react";
import { Geist_Mono, Inter } from "next/font/google";
import { RouteTransition } from "@/components/layout/route-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { defaultMetadata, jsonLd } from "@/lib/metadata";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans text-ink antialiased">
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <RouteTransition>{children}</RouteTransition>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
