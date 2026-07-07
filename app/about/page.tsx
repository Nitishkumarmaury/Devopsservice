import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
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
  title: "About Nitish Maurya",
  description:
    "About Nitish Maurya, a DevOps and Cloud Engineer focused on Linux, AWS, DigitalOcean, CI/CD, deployment, monitoring, and production troubleshooting.",
  path: "/about",
});

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: "DevOps and Cloud Engineer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    url: siteConfig.url,
  };

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
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
        Nitish Maurya is a DevOps and Cloud Engineer focused on deploying, maintaining, monitoring, and troubleshooting
        modern web applications and production infrastructure.
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">Professional focus</h2>
              <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                His practical work includes Linux server administration, AWS and DigitalOcean deployments, CI/CD
                automation, reverse proxy configuration, SSL, PM2, Docker, infrastructure monitoring, performance
                investigation, and production incident resolution.
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                The working style is direct and implementation-oriented: understand the production risk, choose a
                practical path, validate the outcome, and leave behind clear handover notes.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Panel title="Working principles" items={principles} />
              <Panel title="Clients supported" items={clients} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">Technical experience</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Hands-on infrastructure stack.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechnologyTag key={item}>{item}</TechnologyTag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["Production-first philosophy", "Infrastructure is treated as an operating system for real users, not a decorative diagram. Deployment, rollback, monitoring, access, and handover are considered together."],
              ["Communication approach", "Updates are practical and plain-language: what changed, what risk remains, what access is required, and what should happen next."],
              ["Availability", "Available for remote infrastructure projects, scoped implementation, troubleshooting, production audits, and ongoing DevOps support."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
                <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta title="Talk through your production infrastructure needs." />
    </SiteFrame>
  );
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
