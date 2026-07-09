import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CloudCog,
  GitBranch,
  LockKeyhole,
  Network,
  Server,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BrandIcon3D } from "@/components/ui/brand-icon-3d";
import { ButtonLink } from "@/components/ui/button";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { ServiceIcon } from "@/components/services/service-icon";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { caseStudies } from "@/data/case-studies";
import { seoArticles } from "@/data/seo-articles";
import { seoMoneyPages } from "@/data/seo-pages";
import { consultationHref } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Consultant for Startups, SaaS and SMBs",
  description:
    "Freelance DevOps consultant offering CI/CD, AWS EC2 deployment, Docker, Kubernetes, monitoring and production support for startups, SaaS teams and agencies.",
  path: "/",
});

const outcomes = [
  "Safer deployments",
  "Reduced manual work",
  "Faster incident detection",
  "Clearer infrastructure visibility",
  "Better production reliability",
  "Controlled cloud resources",
] as const;

const processPreview = [
  { title: "Discover", text: "Clarify goals, risks, current infrastructure, and delivery constraints." },
  { title: "Design", text: "Select the practical architecture, deployment path, monitoring, and security baseline." },
  { title: "Implement", text: "Configure infrastructure, automate releases, validate health, and document handover." },
  { title: "Support", text: "Review monitoring, releases, incidents, and next improvements after launch." },
] as const;

const infrastructureNodes = [
  {
    label: "CI/CD",
    Icon: GitBranch,
    className: "left-6 top-[40%]",
    accent: "border-cyan-200 bg-cyan-50 text-cyan-800",
  },
  {
    label: "Security",
    Icon: LockKeyhole,
    className: "right-6 top-[40%]",
    accent: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    label: "Monitor",
    Icon: Activity,
    className: "left-8 bottom-[22%]",
    accent: "border-blue-200 bg-blue-50 text-blue-800",
  },
  {
    label: "Backup",
    Icon: ServerCog,
    className: "right-8 bottom-[22%]",
    accent: "border-amber-200 bg-amber-50 text-amber-800",
  },
] as const;

export default function Page() {
  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,183,0.1),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(38,84,124,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(242,247,250,0.6))]" />
        <Container className="relative z-10">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.78fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
                DEVOPS • CLOUD • AUTOMATION • OBSERVABILITY
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                DevOps Consulting for Fast, Reliable <GradientText>Production Delivery</GradientText>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                Freelance DevOps consultant for startups, SaaS teams, SMBs, and agencies that need CI/CD, AWS EC2
                deployment, Docker, Kubernetes, monitoring, and production support.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AnimatedShinyButton url={consultationHref}>Book a Consultation</AnimatedShinyButton>
                <ButtonLink href="/services" variant="secondary">
                  Explore Services
                </ButtonLink>
              </div>
              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                {["AWS and DigitalOcean", "Next.js and NestJS", "CI/CD and monitoring"].map((item) => (
                  <TechnologyTag key={item}>{item}</TechnologyTag>
                ))}
              </div>
            </div>
            <InfrastructureVisual />
          </div>
        </Container>
      </section>

      <TechnologyStrip />

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="DevOps service pages" title="High-intent DevOps consulting services for buyers ready to move.">
            Start with the service that matches your current production bottleneck, then use the contact form to get a
            practical scope for implementation, audit, or support.
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {seoMoneyPages.map((page, index) => (
              <article
                key={page.slug}
                className="group rounded-[22px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[var(--shadow-medium)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700">
                  <ServiceIcon icon={page.icon} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {page.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{page.metaDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {page.primaryKeywords.slice(0, 3).map((tag) => (
                    <TechnologyTag key={tag} className={index % 2 === 1 ? "bg-[var(--violet-soft)]" : undefined}>
                      {tag}
                    </TechnologyTag>
                  ))}
                </div>
                <ButtonLink href={`/${page.slug}`} variant="ghost" className="mt-5 px-0">
                  Explore service
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/services" variant="secondary">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f1f2f_0%,#123846_100%)] py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(61,184,197,0.16),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(213,166,69,0.12),transparent_32%)]" />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">Business outcomes</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Infrastructure decisions connected to business outcomes.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                The work is scoped around practical production improvements: fewer fragile releases, clearer
                visibility, and cleaner ownership of servers, domains, processes, and monitoring.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span className="text-sm font-medium text-white/80">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Process preview" title="A clear path from discovery to support.">
            A simplified view of the engagement rhythm. The full workflow page explains objectives, client inputs,
            work performed, deliverables, and next steps.
          </SectionIntro>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {processPreview.map((step, index) => (
              <article key={step.title} className="relative rounded-[22px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                <span className="font-mono text-xs font-semibold text-[var(--rose-dark)]">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/process" variant="secondary">
              View complete process
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="DevOps learning hub" title="Educational guides that support the service pages.">
            Clear explanations for buyers researching DevOps, cloud migration, DevSecOps, and automation before they
            choose an implementation partner.
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {seoArticles.map((article) => (
              <article key={article.slug} className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
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
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface-alt)] py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Featured case studies" title="Project patterns built for measurable production improvement.">
            Realistic engagement patterns without invented client identities, fake metrics, or unsupported claims.
          </SectionIntro>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((study) => (
              <article key={study.slug} className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                  {study.category}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{study.problem}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.technologies.slice(0, 4).map((tag) => (
                    <TechnologyTag key={tag}>{tag}</TechnologyTag>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">{study.outcome}</p>
                <ButtonLink href={`/case-studies/${study.slug}`} variant="ghost" className="mt-5 px-0">
                  Read case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f1f2f_0%,#123846_100%)] py-16 text-white sm:py-24">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                AI-assisted infrastructure planning
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
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

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

function InfrastructureVisual() {
  return (
    <div className="cloud-hero-visual relative min-h-[440px] overflow-hidden rounded-[28px] border border-[rgba(15,34,48,0.14)] bg-white p-5 shadow-[var(--shadow-medium)]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#ffffff_0%,#f5f8fb_48%,#eaf3f5_100%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_16%,rgba(14,165,183,0.12),transparent_28%),radial-gradient(circle_at_84%_76%,rgba(213,166,69,0.1),transparent_30%)]" />
      <div className="absolute inset-0 z-0 soft-grid opacity-55" />

      <div className="absolute left-5 top-5 z-20 rounded-xl border border-[var(--border)] bg-white/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,34,48,0.08)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Cloud ops</p>
        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Ready for production</p>
      </div>

      <div className="absolute right-5 top-5 z-20 hidden rounded-xl border border-[var(--border)] bg-white/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,34,48,0.08)] sm:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">SLA target</p>
        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">99.9% uptime</p>
      </div>

      <div className="pointer-events-none absolute left-[18%] right-[18%] top-[49%] z-[1] hidden h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent sm:block" />
      <div className="pointer-events-none absolute bottom-[20%] top-[28%] left-1/2 z-[1] hidden w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent sm:block" />
      <div className="pointer-events-none absolute left-[18%] top-[28%] z-[1] hidden h-[50%] w-[64%] rounded-[28px] border border-slate-300/55 sm:block" />

      <div className="absolute left-1/2 top-[49%] z-20 w-[13.25rem] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-slate-200 bg-white/96 p-4 text-center shadow-[0_26px_70px_rgba(15,34,48,0.16)]">
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-[22px] border border-cyan-200/70 bg-[linear-gradient(145deg,#102437,#0f6f7d)] text-white shadow-[0_18px_38px_rgba(15,111,125,0.24),inset_0_1px_0_rgba(255,255,255,0.22)]">
          <CloudCog className="h-9 w-9" aria-hidden="true" />
          <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-white bg-emerald-50 text-emerald-700 shadow-[0_8px_18px_rgba(21,128,61,0.16)]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">Cloud operations</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">Release • secure • monitor</p>
      </div>

      {infrastructureNodes.map(({ label, Icon, className, accent }) => (
        <div
          key={label}
          className={`absolute z-20 hidden items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold shadow-[0_14px_34px_rgba(15,34,48,0.1)] sm:flex ${className} ${accent}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </div>
      ))}

      <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-white/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,34,48,0.08)] sm:flex">
        <Network className="h-4 w-4 text-[var(--cyan)]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[var(--text-primary)]">Secure handover</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-white/92 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_32px_rgba(15,34,48,0.08)] sm:inline-flex">
        <Server className="h-4 w-4 text-[var(--rose-dark)]" aria-hidden="true" />
        CI/CD, monitoring, backup
      </div>

      <div className="absolute right-8 top-28 z-30 hidden gap-3 sm:flex">
        <BrandIcon3D name="Google Cloud" compact iconOnly className="brand-orbit" />
        <BrandIcon3D name="AWS" compact iconOnly className="brand-orbit" style={{ animationDelay: "0.6s" }} />
      </div>
      <BrandIcon3D name="Docker" compact iconOnly className="brand-orbit absolute left-8 top-52 z-30 hidden sm:inline-flex" style={{ animationDelay: "1.1s" }} />
      <BrandIcon3D name="Git" compact iconOnly className="brand-orbit absolute right-8 top-52 z-30 hidden sm:inline-flex" style={{ animationDelay: "1.6s" }} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white/80 to-transparent" />
    </div>
  );
}

function AdvisorPreview() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="grid gap-3">
        {["Application", "Infrastructure", "Requirements", "Challenges", "Results"].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(66,174,181,0.8)]" />
            <span className="text-sm font-semibold text-white/80">{item}</span>
            <span className="ml-auto font-mono text-xs text-white/40">0{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
