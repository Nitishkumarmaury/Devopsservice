import type { ReactNode } from "react";
import { ClickSpark } from "@/components/ui/click-spark";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { defaultMetadata, jsonLd } from "@/lib/metadata";
import "./globals.css";

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ClickSpark
          sparkColor="#d66b9a"
          sparkSize={9}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
          extraScale={1.05}
          className="min-h-screen"
        >
          <div className="relative isolate min-h-screen overflow-hidden">
            <CursorGlow />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(240,68,147,0.12),transparent_32%),radial-gradient(circle_at_84%_8%,rgba(128,87,255,0.09),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,247,251,0.45))] opacity-95" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" />
            {children}
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
