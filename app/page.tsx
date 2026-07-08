import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, CloudUpload, Server, ShieldCheck } from "lucide-react";
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
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                Reliable cloud infrastructure for products <GradientText>built to grow.</GradientText>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                We help SaaS companies, startups, and software agencies deploy applications, automate releases,
                monitor infrastructure, and operate production systems with confidence.
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
  return (
    <div className="cloud-hero-visual relative min-h-[430px] overflow-hidden rounded-[32px] border border-[var(--border)] bg-white/78 p-5 shadow-[var(--shadow-medium)] backdrop-blur">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_18%,rgba(66,174,181,0.2),transparent_32%),radial-gradient(circle_at_82%_82%,rgba(118,103,216,0.2),transparent_34%),linear-gradient(135deg,#ffffff_0%,#fff0f7_48%,#eaf9fb_100%)]" />
      <div className="absolute inset-0 z-0 soft-grid opacity-70" />

      <div className="cloud-hero-core absolute left-1/2 top-1/2 z-10 h-52 w-64 -translate-x-1/2 -translate-y-1/2 sm:h-60 sm:w-80">
        <div className="absolute left-1/2 top-2 h-28 w-44 -translate-x-1/2 rounded-[999px] bg-white shadow-[0_28px_70px_rgba(66,174,181,0.18),inset_0_-24px_38px_rgba(214,107,154,0.12)] sm:h-36 sm:w-56" />
        <div className="absolute left-5 top-16 h-28 w-32 rounded-[999px] bg-white shadow-[0_26px_60px_rgba(118,103,216,0.16),inset_0_-20px_34px_rgba(66,174,181,0.12)] sm:h-36 sm:w-40" />
        <div className="absolute right-5 top-16 h-28 w-32 rounded-[999px] bg-white shadow-[0_26px_60px_rgba(118,103,216,0.16),inset_0_-20px_34px_rgba(66,174,181,0.12)] sm:h-36 sm:w-40" />
        <div className="absolute bottom-7 left-1/2 h-24 w-64 -translate-x-1/2 rounded-[999px] bg-white shadow-[0_30px_75px_rgba(65,39,71,0.14),inset_0_-20px_38px_rgba(118,103,216,0.12)] sm:w-80" />

        <div className="absolute bottom-4 left-1/2 w-36 -translate-x-1/2 rounded-[22px] border border-white/80 bg-[linear-gradient(145deg,#172033,#412747)] p-3 shadow-[0_28px_70px_rgba(23,32,51,0.32)]">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
          </div>
          <div className="grid gap-1.5">
            <span className="h-2 rounded-full bg-white/22" />
            <span className="h-2 w-4/5 rounded-full bg-cyan-200/55" />
            <span className="h-2 w-3/5 rounded-full bg-violet-200/45" />
          </div>
        </div>

        <div className="absolute left-1/2 top-[47%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[linear-gradient(145deg,#42aeb5,#7667d8)] text-white shadow-[0_22px_42px_rgba(66,174,181,0.32),inset_0_1px_0_rgba(255,255,255,0.45)]">
          <CloudUpload className="h-8 w-8" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute left-5 top-5 z-20 hidden rounded-2xl border border-white/80 bg-white/78 px-4 py-3 shadow-[0_18px_42px_rgba(65,39,71,0.1)] sm:block">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Cloud stack</p>
        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Ready for production</p>
      </div>

      <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/78 px-4 py-3 shadow-[0_18px_42px_rgba(65,39,71,0.1)] sm:flex">
        <ShieldCheck className="h-4 w-4 text-[var(--success)]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[var(--text-primary)]">Secure handover</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/78 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-[0_18px_42px_rgba(65,39,71,0.1)] sm:inline-flex">
        <Server className="h-4 w-4 text-[var(--rose-dark)]" aria-hidden="true" />
        CI/CD, monitoring, backup
      </div>

      <div className="absolute right-8 top-28 z-30 flex gap-3">
        <BrandIcon3D name="Google Cloud" compact iconOnly className="brand-orbit" />
        <BrandIcon3D name="AWS" compact iconOnly className="brand-orbit" style={{ animationDelay: "0.6s" }} />
      </div>
      <BrandIcon3D name="Docker" compact iconOnly className="brand-orbit absolute left-8 top-52 z-30" style={{ animationDelay: "1.1s" }} />
      <BrandIcon3D name="Git" compact iconOnly className="brand-orbit absolute right-8 top-52 z-30" style={{ animationDelay: "1.6s" }} />

      <div className="pointer-events-none absolute inset-x-10 top-1/2 z-[1] h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-16 left-1/2 z-[1] w-px bg-gradient-to-b from-transparent via-rose-300/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-white/70 to-transparent" />
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
