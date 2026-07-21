import type { ReactNode } from "react";
import { RouteTransition } from "@/components/layout/route-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ClickSpark } from "@/components/ui/click-spark";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { defaultMetadata, jsonLd } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] antialiased">
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ClickSpark
          sparkColor="#0ea5b7"
          sparkSize={9}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
          extraScale={1.05}
          className="min-h-screen"
        >
          <div className="relative isolate min-h-screen overflow-hidden">
            <CursorGlow />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(242,247,250,0.42)),radial-gradient(circle_at_14%_10%,rgba(14,165,183,0.08),transparent_32%),radial-gradient(circle_at_84%_8%,rgba(49,92,148,0.06),transparent_30%)] opacity-95" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <RouteTransition>{children}</RouteTransition>
          </div>
        </ClickSpark>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
