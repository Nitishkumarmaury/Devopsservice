import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LandingHero } from "@/components/sections/landing-hero";
import { EvidenceScrollStack } from "@/components/sections/evidence-scroll-stack";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { AnimatedServiceGrid } from "@/components/sections/services";
import { SectionGlow } from "@/components/ui/section-glow";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { CaseStudyShowcase } from "@/components/sections/case-study-showcase";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps and Development Services",
  description:
    "DevOps and development services for CI/CD automation, AWS cloud infrastructure, application deployment, web development, full-stack app development, and desktop applications.",
  path: "/",
});

const processFlow = [
  { title: "Audit", deliverable: "Review infrastructure, release flow, access, monitoring, SSL, backups, and risks." },
  { title: "Plan", deliverable: "Prioritize the safest implementation path, validation checks, and handover scope." },
  { title: "Implement", deliverable: "Configure servers, cloud resources, proxying, SSL, process management, and environments." },
  { title: "Automate", deliverable: "Create CI/CD workflows, release validation, rollback notes, and repeatable commands." },
  { title: "Monitor", deliverable: "Add dashboards, uptime checks, resource metrics, alert routes, and health signals." },
  { title: "Support", deliverable: "Review releases, incidents, maintenance tasks, and the next operational improvements." },
] as const;

const devopsServices = services.filter((s) => s.category === "devops").slice(0, 4);
const devServices = services.filter((s) => s.category === "development");

export default function Page() {
  return (
    <SiteFrame>
      <LandingHero />

      <TechnologyStrip />

      {/* Services — Two-Pillar Layout */}
      <section className="aurora-section border-y border-rose-100 bg-white/64 py-16 sm:py-24 lg:py-32 section-rhythm">
        <SectionGlow />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Specialized execution blocks.
            </h2>
            <p className="mt-4 text-lg text-ink-secondary">
              Divided into production infrastructure stability and modern frontend/backend development.
            </p>
          </div>

          {/* DevOps Pillar */}
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">DevOps &amp; Infrastructure</p>
              <ButtonLink href="/services" variant="ghost" className="px-0 text-xs">
                View all →
              </ButtonLink>
            </div>
            <AnimatedServiceGrid services={devopsServices} />
          </div>

          {/* Development Pillar */}
          <div className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">Development Services</p>
              <ButtonLink href="/services" variant="ghost" className="px-0 text-xs">
                View all →
              </ButtonLink>
            </div>
            <AnimatedServiceGrid services={devServices} />
          </div>
        </Container>
      </section>

      <EvidenceScrollStack />

      <ProcessTimeline
        steps={processFlow}
        eyebrow="Process preview"
        title="A clear path from audit to support."
        description="A simplified view of the engagement rhythm. The full workflow page explains objectives, client inputs, validation checks, deliverables, and next steps."
      />

      <CaseStudyShowcase studies={caseStudies} />
    </SiteFrame>
  );
}

function SectionIntro({ eyebrow, title, children }: Readonly<{ eyebrow: string; title: string; children: ReactNode }>) {
  return (
    <ScrollReveal from="down" className="min-w-0 max-w-3xl [overflow-wrap:anywhere]">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">{eyebrow}</p>
      <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-ink-secondary">{children}</p>
    </ScrollReveal>
  );
}
