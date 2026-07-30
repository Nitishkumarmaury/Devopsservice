import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import { capabilityGroups } from "@/data/technologies";
import { consultationHref, siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/route-metadata";

const principles = [
  "Production-first decisions",
  "Clear communication before changes",
  "Automation over repeated manual steps",
  "Monitoring before handover",
  "Practical architecture over unnecessary complexity",
] as const;

const clients = [
  "SaaS companies preparing or improving production environments",
  "Startups that need reliable deployment foundations",
  "Software agencies delivering client applications",
  "Teams without internal DevOps support",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "About CloudOpsync",
  description:
    "About CloudOpsync, a service-based DevOps and cloud engineering company focused on reliable deployments, CI/CD, monitoring, cloud infrastructure, and production support.",
  path: "/about",
});

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
  };
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    mainEntity: organizationJsonLd,
  };

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />
      <PageHero
        eyebrow="About"
        title="Practical DevOps and cloud engineering for production systems."
        actions={
          <ButtonLink href={consultationHref}>
            Book a Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        CloudOpsync is a service-based DevOps and cloud engineering company focused on deploying, maintaining,
        monitoring, and troubleshooting modern web applications and production infrastructure. Founded by{" "}
        {siteConfig.founder}, the company is built for teams that need reliable delivery without infrastructure guesswork.
      </PageHero>

      <section className="border-b border-border bg-canvas py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal className="border border-border bg-canvas-soft p-6 h-full">
              <h2 className="font-mono text-3xl font-bold tracking-tight text-ink">Company focus</h2>
              <p className="mt-5 text-base leading-8 text-ink-secondary">
                Our practical work includes Linux server administration, AWS and DigitalOcean deployments, CI/CD
                automation, reverse proxy configuration, SSL, PM2, Docker, infrastructure monitoring, performance
                investigation, and production incident resolution.
              </p>
              <p className="mt-5 text-base leading-8 text-ink-secondary">
                The delivery style is direct and implementation-oriented: understand the production risk, choose a
                practical path, validate the outcome, and leave behind clear handover notes.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid gap-5 sm:grid-cols-2">
              <Panel title="Working principles" items={principles} />
              <Panel title="Clients supported" items={clients} />
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-canvas-soft py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand">Technical experience</p>
            <h2 className="mt-4 font-mono text-4xl font-bold tracking-tight text-ink">Hands-on infrastructure stack.</h2>
          </div>
          <StaggerReveal className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="flex flex-col border border-border bg-canvas-surface p-6 h-full">
                <h3 className="font-mono text-xl font-bold text-ink">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechnologyTag key={item}>{item}</TechnologyTag>
                  ))}
                </div>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="border-b border-border bg-canvas py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid items-stretch gap-5 lg:grid-cols-3">
            {[
              ["Production-first philosophy", "Infrastructure is treated as an operating system for real users, not a decorative diagram. Deployment, rollback, monitoring, access, and handover are considered together."],
              ["Communication approach", "Updates are practical and plain-language: what changed, what risk remains, what access is required, and what should happen next."],
              ["Availability", "Available for remote infrastructure projects, scoped implementation, troubleshooting, production audits, and ongoing DevOps support."],
            ].map(([title, text]) => (
              <article key={title} className="flex flex-col border border-border bg-canvas-soft p-6 h-full">
                <h2 className="font-mono text-2xl font-bold tracking-tight text-ink">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-ink-secondary">{text}</p>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </SiteFrame>
  );
}

function Panel({ title, items }: Readonly<{ title: string; items: readonly string[] }>) {
  return (
    <article className="flex flex-col border border-border bg-canvas-surface p-6 h-full">
      <h2 className="font-mono text-xl font-bold text-ink">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-secondary">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
