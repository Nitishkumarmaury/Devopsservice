# CloudOpsync — Reorganization & Polish

**Project path**: `/home/guri/projects/site`

The site is a Next.js 15 app using a clean **light-theme monospace design** (Inter + Geist Mono, canvas/ink palette, 48px grid, sharp corners — no shadows, no glassmorphism). The layout and CSS are lean and clean. The problems to fix are:

1. Services are DevOps-only — need to add **Full-Stack Dev, Web Dev, Desktop App Dev**
2. Navigation has **8 links + Login + Sign up + Consultation** — too many items
3. Homepage has **10 sections** including redundant ones (both a TechStrip and TechGrid, plus a full SEO-article hub section)
4. Services dropdown pulls from `seoMoneyPages` (SEO landing pages) — should pull from actual `services` data, split by pillar
5. Mobile nav: header background is already `bg-canvas` when open ✅ (already fixed)
6. SEO: `sitemap.ts` references `seoArticles` and `seoMoneyPages` — need to add dev services; `metadata.ts` only mentions DevOps service types
7. Footer description only mentions DevOps, not development
8. `services.ts` has no `category` field — navbar already coded to expect it (broken at runtime)
9. `constants.ts` `navItems` has 8 items and `projectTypes` are DevOps-only

---

## Proposed Changes

### Phase 1 — Data Layer (enables everything else)

#### [MODIFY] [services.ts](file:///home/guri/projects/site/data/services.ts)

Add `category: "devops" | "development"` to the `Service` type. Tag all 8 existing services as `"devops"`. Add 3 new `"development"` services:

| Slug | Short Title | Title |
|------|------------|-------|
| `web-development` | Web Development | Web Development (Next.js & React) |
| `application-development` | App Development | Full-Stack Application Development |
| `desktop-application` | Desktop Apps | Desktop Application Development |

Each new service gets a full data object (description, problems, includes, approach, faq, etc.) matching the existing shape.

#### [MODIFY] [constants.ts](file:///home/guri/projects/site/lib/constants.ts)

**navItems** — trim from 8 to 5 primary links:
```ts
// Current (8 items):
Services | Solutions | Advisor | Process | Case Studies | Pricing | About | Contact

// Proposed (5 items):
Services | Solutions | Process | About | Contact
```
`Advisor`, `Case Studies`, and `Pricing` move to the footer — they are not primary conversion paths.

**projectTypes** — add development project types, remove duplicates:
```
+ "Full-Stack Web Application Development"
+ "Web Development (Next.js / React)"
+ "Desktop Application Development"
```

**siteConfig** — update `tagline` and `description` to reflect both pillars:
```ts
tagline: "DevOps & Development Services"
description: "...DevOps, CI/CD, cloud infrastructure, web development, full-stack application development, and desktop application development..."
```

#### [MODIFY] [solutions.ts](file:///home/guri/projects/site/data/solutions.ts)

Add 2 development-focused solution groups:
- **"Teams building a web product"** — references Web Dev + App Dev + CI/CD
- **"Businesses needing a desktop tool"** — references Desktop App Dev + App Dev

#### [MODIFY] [metadata.ts](file:///home/guri/projects/site/lib/metadata.ts)

Update `jsonLd` `serviceType` array to include development types. Update the default title template:
```ts
title: `${siteConfig.name} | DevOps and Development Services`
```

Update the `ProfessionalService` `serviceType` to include:
```
"Full-stack web application development"
"Next.js and React web development"
"Desktop application development"
```

#### [MODIFY] [sitemap.ts](file:///home/guri/projects/site/app/sitemap.ts)

Add `/services/web-development`, `/services/application-development`, `/services/desktop-application` to sitemap. Also add proper `changeFrequency` and `priority` fields to all routes for better crawl budget allocation:
```ts
// High priority pages
{ url: "...", priority: 1.0, changeFrequency: "weekly" }   // homepage
{ url: "/services", priority: 0.9 }                         // services index
// Medium
{ url: "/services/[slug]", priority: 0.8 }                  // each service
// Lower
{ url: "/blog", priority: 0.6 }                             // blog/resources
```

---

### Phase 2 — Navigation Cleanup

#### [MODIFY] [navbar.tsx](file:///home/guri/projects/site/components/layout/navbar.tsx)

**Current issues:**
- Pulls from `seoMoneyPages` for dropdown — causes a huge list of SEO pages, not real services
- 8 nav links + Login + Sign up + Consultation = 11 interactive items
- Services mega-menu doesn't show the two-pillar split

**Changes:**
1. Replace `seoMoneyPages` dropdown with `services` data split by `category`:
   ```ts
   import { services } from "@/data/services";
   const devopsServices = services.filter(s => s.category === "devops");
   const devServices = services.filter(s => s.category === "development");
   ```
2. Dropdown becomes a two-column layout: **DevOps** (blue accent) | **Development** (violet accent)
3. Remove `Login` and `Sign up` from desktop nav — move to footer as subtle text links
4. Trim `navItems` to 5 in constants (Services, Solutions, Process, About, Contact)
5. Mobile nav: keep single Consultation CTA, remove Login/Signup buttons from mobile menu
6. The mobile menu panel already has `bg-canvas` when open ✅ — keep this

**Result:** `Logo | Services▾ Solutions Process About Contact [Book Consultation]`

#### [MODIFY] [footer.tsx](file:///home/guri/projects/site/components/layout/footer.tsx)

- Update description copy to include development services
- Add a **Development** column to the footer links (currently only has DevOps services)
- Add `Login` / `Sign up` as small text links in the Legal column or a new Account column
- Add `Advisor`, `Case Studies`, `Pricing` back to Resources column
- Update tagline in logo area

---

### Phase 3 — Homepage Declutter

The homepage currently has **10 sections**. Reduce to **7** with clear flow.

#### [MODIFY] [page.tsx](file:///home/guri/projects/site/app/page.tsx)

**Current flow (10 sections):**
1. LandingHero
2. TechnologyStrip
3. Services showcase (DevOps only, "Core services")
4. EvidenceScrollStack
5. TechnologyGrid ← *redundant with TechnologyStrip*
6. ProofStrip
7. ProcessTimeline
8. SEO Article Hub ← *4-column grid of guides, low-value on homepage*
9. CaseStudyShowcase
10. AI Advisor Section
11. ContactCta

**Proposed flow (7 sections):**
1. **LandingHero** — update copy to reflect both DevOps and Development
2. **TechnologyStrip** — keep (lightweight)
3. **Services — Two-Pillar Layout** — replace single `<ServiceShowcase>` with a tabbed or two-column layout showing DevOps (3 featured) + Development (3 featured) with "View all →" link
4. **EvidenceScrollStack** — keep (strong trust signal)
5. **ProcessTimeline** — keep (important for conversions)
6. **CaseStudyShowcase** — keep
7. **ContactCta** — keep

**Removed from homepage:**
- `TechnologyGrid` (redundant)
- `ProofStrip` (merge key metric into hero or remove)
- `SEO Article Hub` (4-col article grid — blog accessible from footer)
- `AI Advisor Section` (surface as a CTA card inside Services section instead)

**Hero copy update:**
```
// Current eyebrow:
"Evidence-Led DevOps and Cloud Engineering Services"

// Proposed:
"DevOps · Web Development · Desktop Apps"
// Or two-line: "Infrastructure That Ships. Software That Scales."
```

#### [MODIFY] [landing-hero.tsx](file:///home/guri/projects/site/components/sections/landing-hero.tsx)

Update hero headline and subtext to reflect the dual DevOps + Development positioning. Keep only **2 CTAs**: primary "Book Consultation" + secondary "View Services".

---

### Phase 4 — Services Page (Pillar Layout)

#### [MODIFY] [app/services/page.tsx](file:///home/guri/projects/site/app/services/page.tsx)

Update page metadata description to include development services. Update the hero copy. If `ServiceShowcase` supports a `category` filter, render two sections with headings:
- **DevOps & Infrastructure** (section intro + service cards)
- **Development Services** (section intro + service cards)

Remove the second `ButtonLink` "Compare services" — redundant, the page already shows everything.

#### [MODIFY] [service-showcase.tsx](file:///home/guri/projects/site/components/sections/service-showcase.tsx)

Add optional `category` prop filter so it can render either all services or a specific pillar. Make each card link to `/services/[slug]` as a clickable card — remove any CTA button on each card (the card itself is the CTA).

---

### Phase 5 — SEO Improvements

#### [MODIFY] [opengraph-image.tsx](file:///home/guri/projects/site/app/opengraph-image.tsx)

Update the subtitle copy from DevOps-only to reflect both pillars:
```
"DevOps, CI/CD, monitoring, cloud architecture, web development, and application engineering."
```

#### [MODIFY] [robots.ts](file:///home/guri/projects/site/app/robots.ts)

Add `disallow` for auth pages to avoid crawling login/signup/reset-password:
```ts
rules: [
  { userAgent: "*", allow: "/", disallow: ["/login", "/signup", "/forgot-password", "/reset-password", "/api/"] }
]
```

#### [MODIFY] [sitemap.ts](file:///home/guri/projects/site/app/sitemap.ts)

- Add 3 new development service slugs
- Add `changeFrequency` and `priority` per route type
- Remove auth routes from sitemap

#### Schema.org in [metadata.ts](file:///home/guri/projects/site/lib/metadata.ts)

Add development `serviceType` entries to the `ProfessionalService` JSON-LD schema.

---

### Phase 6 — Design Consistency (All Pages Match Homepage)

The homepage uses the monospace grid aesthetic cleanly. Several inner pages (like `services/[slug]/page.tsx`) use `bg-rose-*` Tailwind colors (leftover from the old dark theme) instead of the new canvas/ink/brand palette. 

#### [MODIFY] [app/services/[slug]/page.tsx](file:///home/guri/projects/site/app/services/[slug]/page.tsx)

Replace all `bg-rose-*`, `text-rose-*`, `border-rose-*` classes with the current design tokens:
- `text-rose-dark` → `text-brand`  
- `border-rose-200` → `border-border`
- `bg-rose-50` → `bg-canvas-soft`
- `bg-rose-100` → `bg-canvas-soft`

Ensure section backgrounds alternate consistently: `bg-canvas` → `bg-canvas-soft` → `bg-canvas`.

#### [MODIFY] Other pages using old dark-theme styles

Check and update any remaining pages that reference old `--text-primary`, `--background`, dark CSS variables — ensure they all use the new `canvas`/`ink`/`brand` palette.

---

## Verification Plan

### Build Check
```bash
cd /home/guri/projects/site && npm run build
```

### Manual Checks
- [ ] `services.ts` has `category` field on all 11 services (8 devops + 3 development)
- [ ] Nav dropdown shows DevOps and Development columns correctly
- [ ] Mobile menu: header is opaque when open, no transparency bleed
- [ ] Homepage has 7 sections in clean order
- [ ] Services page shows both pillars
- [ ] No `bg-rose-*` / old dark-theme tokens on any page
- [ ] Sitemap includes all 11 service slugs + changeFrequency
- [ ] robots.ts disallows auth/api routes
- [ ] Footer includes Development links and Advisor/Pricing/Case Studies in resources
- [ ] Build compiles without TypeScript errors
