import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/layout/google-analytics";
import { RouteTransition } from "@/components/layout/route-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { StickyActions } from "@/components/ui/sticky-actions";
import { ClickSpark } from "@/components/ui/click-spark";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { OrbitField } from "@/components/visuals/orbit-field";
import { defaultMetadata, jsonLd } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/brand/CloudOpsync-removebg-preview.png" />
        <GoogleAnalytics />
      </head>
      <body className="command-shell min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] antialiased">
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ClickSpark
          sparkColor="#4da3ff"
          sparkSize={9}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
          extraScale={1.05}
          className="min-h-screen"
        >
          <div className="relative isolate min-h-screen overflow-hidden">
            <CursorGlow />
            <OrbitField />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,31,0.42),rgba(6,17,31,0.72)),linear-gradient(rgba(77,163,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.032)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px] opacity-95" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/60 to-transparent" />
            <RouteTransition>{children}</RouteTransition>
            <StickyActions />
          </div>
        </ClickSpark>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url,
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
