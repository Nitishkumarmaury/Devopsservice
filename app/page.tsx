import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { LandingHero } from "@/components/sections/landing-hero";
import { EvidenceScrollStack } from "@/components/sections/evidence-scroll-stack";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { ProofStrip } from "@/components/sections/proof-strip";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { CaseStudyShowcase } from "@/components/sections/case-study-showcase";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Evidence-Led DevOps and Cloud Engineering Services",
  description:
    "Evidence-led DevOps and cloud engineering services for CI/CD, AWS deployment, Docker, Kubernetes, monitoring, reliability reviews and production support.",
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

export default function Page() {
  return (
    <SiteFrame>
      <LandingHero />

      <TechnologyStrip />

      {/* Services */}
      <section className="border-b border-border bg-canvas py-16 sm:py-24 lg:py-32">
        <Container>
          <SectionIntro
            eyebrow="Core services"
            title="The highest-impact DevOps work for production teams."
          >
            Start with the interventions that usually reduce the most operational risk: reliability review, controlled
            releases, production deployment, container readiness, monitoring, and managed support.
          </SectionIntro>
          <ServiceShowcase services={services} className="mt-10" />
          <div className="relative mt-8">
            <ButtonLink href="/services" variant="secondary">
              View all services on the services page
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <EvidenceScrollStack />

      <TechnologyGrid />

      <ProofStrip />

      <ProcessTimeline
        steps={processFlow}
        eyebrow="Process preview"
        title="A clear path from audit to support."
        description="A simplified view of the engagement rhythm. The full workflow page explains objectives, client inputs, validation checks, deliverables, and next steps."
      />

      {/* SEO article cards */}
      <section className="border-b border-t border-border bg-canvas-soft py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="DevOps learning hub" title="Educational guides that support the service pages.">
            Clear explanations for buyers researching DevOps, cloud migration, DevSecOps, and automation before they
            choose an implementation partner.
          </SectionIntro>
          <StaggerReveal className="mt-10 grid gap-px border border-border lg:grid-cols-4" itemClassName="h-full flex flex-col" from="left">
            {seoArticles.map((article) => (
              <article key={article.slug} className="flex h-full min-w-0 flex-col border-b border-border bg-canvas-surface p-5 [overflow-wrap:anywhere] last:border-0 sm:p-6 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                  {article.eyebrow}
                </p>
                <h3 className="mt-4 font-mono text-base font-semibold text-ink">{article.h1}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-secondary">{article.metaDescription}</p>
                <ButtonLink href={`/${article.slug}`} variant="ghost" className="mt-auto pt-5 px-0">
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <CaseStudyShowcase studies={caseStudies} />

      {/* AI Advisor section */}
      <section className="border-b border-t border-border bg-ink-navy py-16 text-white section-grid sm:py-24">
        <Container className="relative">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <ScrollReveal from="left" className="min-w-0 [overflow-wrap:anywhere]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                AI-assisted infrastructure planning
              </p>
              <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-5xl">
                <ScrollTextReveal as="span">
                  Turn your requirements into a preliminary cloud blueprint.
                </ScrollTextReveal>
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Use the Cloud Architecture Advisor to explore deployment, monitoring, security, scaling, and
                infrastructure recommendations before your consultation.
              </p>
              <ButtonLink href="/advisor" variant="secondary" className="mt-8 border-white/20 text-white hover:border-white hover:bg-white/10">
                Open Cloud Architecture Advisor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </ScrollReveal>
            <ScrollReveal from="right">
              <AdvisorPreview />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <ContactCta />
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

function AdvisorPreview() {
  const fields = ["Application", "Infrastructure", "Requirements", "Challenges", "Results"];
  return (
    <div className="min-w-0 border border-white/15 bg-white/5 [overflow-wrap:anywhere]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2 w-2 border border-white/20" />
        <span className="h-2 w-2 border border-white/20" />
        <span className="h-2 w-2 border border-white/20" />
        <span className="ml-2 font-mono text-xs text-white/40">cloud-advisor — input</span>
      </div>
      {fields.map((item, index) => (
        <div key={item} className="flex items-center gap-3 border-b border-white/10 px-4 py-3 last:border-0">
          <span className="font-mono text-xs font-bold text-secondary">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-mono text-sm text-white/80">{item}</span>
          <span className="ml-auto font-mono text-xs text-white/30">pending</span>
        </div>
      ))}
    </div>
  );
}
