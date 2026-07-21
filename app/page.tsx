import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
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

      <section className="relative overflow-hidden bg-[var(--background-soft)] py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,183,0.08),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(139,108,255,0.07),transparent_28%)]" />
        <Container>
          <div className="relative">
            <SectionIntro eyebrow="Core services" title="The highest-impact DevOps work for production teams.">
              Start with the interventions that usually reduce the most operational risk: reliability review, controlled
              releases, production deployment, container readiness, monitoring, and managed support.
            </SectionIntro>
            <ServiceShowcase services={services} className="mt-10" />
          </div>
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

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="DevOps learning hub" title="Educational guides that support the service pages.">
            Clear explanations for buyers researching DevOps, cloud migration, DevSecOps, and automation before they
            choose an implementation partner.
          </SectionIntro>
          <StaggerReveal className="mt-10 grid gap-5 lg:grid-cols-4">
            {seoArticles.map((article) => (
              <article key={article.slug} className="min-w-0 rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)] [overflow-wrap:anywhere] sm:p-6">
                <p className="font-mono text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-[var(--rose-dark)] sm:tracking-[0.18em]">
                  {article.eyebrow}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{article.h1}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{article.metaDescription}</p>
                <ButtonLink href={`/${article.slug}`} variant="ghost" className="mt-5 px-0">
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <CaseStudyShowcase studies={caseStudies} />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f1f2f_0%,#123846_100%)] py-16 text-white sm:py-24">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <Container className="relative z-10">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="min-w-0 [overflow-wrap:anywhere]">
              <p className="font-mono text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-cyan-100 sm:tracking-[0.22em]">
                AI-assisted infrastructure planning
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl sm:tracking-[-0.035em]">
                Turn your requirements into a preliminary cloud blueprint.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                Use the Cloud Architecture Advisor to explore deployment, monitoring, security, scaling, and
                infrastructure recommendations before your consultation.
              </p>
              <ButtonLink href="/advisor" className="mt-8">
                Open Cloud Architecture Advisor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <AdvisorPreview />
          </div>
        </Container>
      </section>

      <ContactCta />
    </SiteFrame>
  );
}

function SectionIntro({ eyebrow, title, children }: Readonly<{ eyebrow: string; title: string; children: ReactNode }>) {
  return (
    <div className="min-w-0 max-w-3xl [overflow-wrap:anywhere]">
      <p className="font-mono text-xs font-semibold uppercase leading-6 tracking-normal text-[var(--rose-dark)]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

function AdvisorPreview() {
  return (
    <div className="min-w-0 rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] [overflow-wrap:anywhere] sm:rounded-[28px] sm:p-5">
      <div className="grid gap-3">
        {["Application", "Infrastructure", "Requirements", "Challenges", "Results"].map((item, index) => (
          <div key={item} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(66,174,181,0.8)]" />
            <span className="text-sm font-semibold text-white/80">{item}</span>
            <span className="ml-auto font-mono text-xs text-white/40">0{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
