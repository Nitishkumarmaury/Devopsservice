import type { ReactNode } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Cloud, GitBranch, LineChart, MonitorCheck } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { ServiceIcon } from "@/components/services/service-icon";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { consultationHref } from "@/lib/constants";

const featuredServiceSlugs = [
  "cloud-infrastructure",
  "cicd-automation",
  "application-deployment",
  "monitoring-observability",
] as const;

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

export default function Page() {
  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean);

  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(214,107,154,0.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(118,103,216,0.12),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(66,174,181,0.08),transparent_34%)]" />
        <Container className="relative z-10">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.78fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
                DEVOPS • CLOUD • AUTOMATION • OBSERVABILITY
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                Reliable cloud infrastructure for products <GradientText>built to grow.</GradientText>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                We help SaaS companies, startups, and software agencies deploy applications, automate releases,
                monitor infrastructure, and operate production systems with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={consultationHref}>
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
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
          <SectionIntro eyebrow="Featured services" title="Focused infrastructure services without page overload.">
            Four core services cover the most common production needs. The complete service library lives on the
            dedicated services page.
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service, index) =>
              service ? (
                <article
                  key={service.slug}
                  className="group rounded-[22px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[var(--shadow-medium)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tag) => (
                      <TechnologyTag key={tag} className={index === 1 ? "bg-[var(--violet-soft)]" : undefined}>{tag}</TechnologyTag>
                    ))}
                  </div>
                  <ButtonLink href={`/services/${service.slug}`} variant="ghost" className="mt-5 px-0">
                    Explore service
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                </article>
              ) : null,
            )}
          </div>
          <div className="mt-8">
            <ButtonLink href="/services" variant="secondary">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#172033_0%,#412747_100%)] py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,107,154,0.24),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(66,174,181,0.16),transparent_32%)]" />
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

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#172033_0%,#412747_100%)] py-16 text-white sm:py-24">
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
  const nodes = [
    { label: "Code", icon: GitBranch },
    { label: "Build", icon: BarChart3 },
    { label: "Deploy", icon: Cloud },
    { label: "Monitor", icon: MonitorCheck },
    { label: "Scale", icon: LineChart },
  ];

  return (
    <div className="rounded-[30px] border border-[var(--border)] bg-white/76 p-5 shadow-[var(--shadow-medium)] backdrop-blur">
      <div className="soft-grid rounded-[24px] border border-rose-100 bg-[linear-gradient(135deg,#fff_0%,#fff0f7_100%)] p-5">
        <div className="grid gap-4">
          {nodes.map(({ label, icon: Icon }, index) => (
            <div key={label} className="relative flex items-center gap-4">
              {index < nodes.length - 1 ? <span className="absolute left-6 top-12 h-8 w-px bg-gradient-to-b from-rose-300 to-violet-300" /> : null}
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white bg-[var(--rose-soft)] text-[var(--rose-dark)] shadow-[var(--shadow-soft)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1 rounded-2xl border border-[var(--border)] bg-white/78 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Step {index + 1}</p>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
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
