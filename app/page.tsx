import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Activity, ArrowRight, GitBranch, LayoutDashboard, RefreshCw } from "lucide-react";
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
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { TestimonialsShowcase } from "@/components/sections/testimonials-showcase";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Consulting & Cloud Infrastructure Services | CI/CD, AWS, Docker, Kubernetes",
  description:
    "CloudOpsync delivers enterprise-grade DevOps consulting, cloud infrastructure, CI/CD pipelines, Docker & Kubernetes deployment, monitoring, and production support for startups, SaaS teams, and agencies worldwide.",
  path: "/",
});

const processFlow = [
  { title: "Discover", deliverable: "Clarify business goal, current stack, risk level, and access constraints." },
  { title: "Audit", deliverable: "Review infrastructure, release flow, monitoring, SSL, backups, and operational gaps." },
  { title: "Design", deliverable: "Prioritize architecture, validation checks, rollback path, and handover scope." },
  { title: "Implement", deliverable: "Configure servers, cloud resources, CI/CD, proxying, SSL, and runtime environments." },
  { title: "Validate", deliverable: "Check deployment health, routes, logs, dashboards, alerts, and recovery notes." },
  { title: "Handover & Support", deliverable: "Document operations, review support needs, and plan the next improvements." },
] as const;

const outcomes = [
  {
    title: "Safer releases",
    text: "Controlled CI/CD workflows, health checks, release notes, and rollback paths reduce avoidable production risk.",
    Icon: GitBranch,
  },
  {
    title: "Better visibility",
    text: "Dashboards, uptime probes, resource metrics, and alert routes make production behavior easier to understand.",
    Icon: LayoutDashboard,
  },
  {
    title: "Repeatable operations",
    text: "Documented infrastructure, automation, and handover notes reduce drift and make maintenance less fragile.",
    Icon: RefreshCw,
  },
  {
    title: "Faster diagnosis",
    text: "Logs, metrics, process health, and web-server signals are reviewed together instead of guessed separately.",
    Icon: Activity,
  },
] as const;

export default function Page() {
  const averageRating =
    testimonials.reduce((total, testimonial) => total + testimonial.rating, 0) / Math.max(testimonials.length, 1);
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(averageRating.toFixed(1)),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      itemReviewed: {
        "@type": "Service",
        name: testimonial.project,
      },
      reviewBody: testimonial.quote,
    })),
  };

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      <LandingHero />

      <TechnologyStrip />

      <section className="relative overflow-hidden border-b border-[#d6ebff]/10 bg-[var(--background-soft)] py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(77,163,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.028)_1px,transparent_1px)] bg-[size:56px_56px]" />
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
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-[#d6ebff]/10 bg-[var(--background)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionIntro eyebrow="Why hire CloudOpsync" title="Turn uncertain infrastructure into visible control.">
              CloudOpsync is built for teams that need production work completed carefully: clear scope, practical
              implementation, validation evidence, and a handover your team can keep using.
            </SectionIntro>
            <StaggerReveal className="grid gap-4 sm:grid-cols-2">
              {outcomes.map(({ title, text, Icon }) => (
                <article key={title} className="min-w-0 rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-5 shadow-[var(--shadow-soft)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#4da3ff]/18 bg-[#4da3ff]/10 text-[#4da3ff]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{text}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <PortfolioShowcase projects={portfolioProjects} />

      <EvidenceScrollStack />

      <TechnologyGrid />

      <TestimonialsShowcase testimonials={testimonials} />

      <ProofStrip />

      <ProcessTimeline
        steps={processFlow}
        eyebrow="Process preview"
        title="A clear path from audit to support."
        description="A simplified view of the engagement rhythm. The full workflow page explains objectives, client inputs, validation checks, deliverables, and next steps."
      />

      <CaseStudyShowcase studies={caseStudies} />

      <section className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_100%)] py-16 text-white sm:py-24">
        <div className="absolute inset-0 soft-grid opacity-30" />
        <Container className="relative z-10">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="min-w-0 [overflow-wrap:anywhere]">
              <p className="font-mono text-xs font-semibold uppercase leading-6 tracking-normal text-[#b9ddff]">
                Cloud Architecture Advisor
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                Turn requirements into a preliminary cloud blueprint.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#c7d5e6]">
                Use the advisor to prepare deployment, monitoring, security, scaling, and infrastructure questions
                before a consultation. Final architecture still requires technical review.
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
      <p className="inline-flex rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#b9ddff]">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

function AdvisorPreview() {
  return (
    <div className="min-w-0 rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] [overflow-wrap:anywhere] sm:p-5">
      <div className="grid gap-3">
        {["Application", "Infrastructure", "Requirements", "Risk", "Recommendations"].map((item, index) => (
          <div key={item} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#d6ebff]/10 bg-[#06111f]/62 p-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4da3ff] shadow-[0_0_18px_rgba(77,163,255,0.6)]" />
            <span className="text-sm font-semibold text-white/82">{item}</span>
            <span className="ml-auto font-mono text-xs text-[#8294aa]">0{index + 1}</span>
          </div>
        ))}
        <div className="rounded-xl border border-[#ff8a7a]/18 bg-[#ff8a7a]/8 p-4 text-sm leading-6 text-[#c7d5e6]">
          Preliminary guidance only. Final production architecture requires a technical review.
        </div>
      </div>
    </div>
  );
}
