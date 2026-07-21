import type { Metadata } from "next";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { pricingPackages, pricingRules } from "@/data/pricing";
import { createPageMetadata } from "@/lib/route-metadata";

const cardMap = [
  ["Quick Infrastructure Fix", "Small fix", "Fast correction for proxy, SSL, PM2, environment, or config issues."],
  ["Production Deployment", "Full deployment", "Complete application deployment with proxy, SSL, DNS, process management, and validation."],
  ["CI/CD Automation", "CI/CD pipeline", "Repeatable build, deploy, validation, and rollback workflow."],
  ["Monitoring Setup", "Monitoring setup", "Dashboards, alerts, uptime checks, log checks, and a basic runbook."],
  ["Monthly DevOps Care", "Monthly maintenance", "Routine patching, release support, health checks, and basic incidents."],
  ["Emergency Production Support", "Production troubleshooting", "Urgent investigation for logs, crash loops, CPU/RAM pressure, deployment failures, and downtime triage."],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Pricing and Engagement Packages",
  description:
    "Transparent DevOps and cloud infrastructure pricing guidance for fixes, server setup, CI/CD, deployments, monitoring, monthly maintenance, and production troubleshooting.",
  path: "/pricing",
});

export default function PricingPage() {
  const cards = cardMap
    .map(([name, lookup, description]) => {
      const item = pricingPackages.find((entry) => entry.service === lookup);
      return item ? { name, description, item } : undefined;
    })
    .filter(Boolean);

  return (
    <SiteFrame>
      <PageHero
        eyebrow="Pricing"
        title="Clear engagement ranges for practical DevOps work."
        actions={
          <ButtonLink href="/contact?requestType=Pricing%20Request">
            Request a custom quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Pricing depends on access, current infrastructure, risk level, urgency, and validation needs. These ranges keep
        early conversations practical without inventing guarantees.
      </PageHero>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {cards.map((card, index) =>
              card ? (
                <article
                  key={card.name}
                  className={index === 1 ? "rounded-[28px] border border-rose-200 bg-white p-6 shadow-[var(--shadow-medium)] ring-2 ring-rose-100" : "rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]"}
                >
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--rose-dark)]">
                    {index === 1 ? "Most suitable" : "Engagement"}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{card.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{card.description}</p>
                  <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                      <DollarSign className="h-4 w-4 text-[var(--rose-dark)]" aria-hidden="true" />
                      {card.item.target}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Clock className="h-4 w-4 text-[var(--violet)]" aria-hidden="true" />
                      {card.item.hours}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                    <p><strong className="text-[var(--text-primary)]">Included:</strong> {card.item.deliverables}</p>
                    <p><strong className="text-[var(--text-primary)]">May affect price:</strong> access quality, urgency, production risk, and validation depth.</p>
                    <p><strong className="text-[var(--text-primary)]">Support limitations:</strong> {card.item.urgent}</p>
                  </div>
                  <ButtonLink href={`/contact?requestType=Pricing%20Request&projectDetails=${encodeURIComponent(`I would like pricing for ${card.name}.`)}`} variant="secondary" className="mt-6 w-full">
                    Request package quote
                  </ButtonLink>
                </article>
              ) : null,
            )}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <ScrollReveal className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[var(--shadow-soft)]">
            <div className="overflow-x-auto">
              <table className="min-w-[840px] text-left text-sm">
                <thead className="bg-[var(--background-soft)] text-[var(--text-primary)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Service</th>
                    <th className="px-5 py-4 font-semibold">Typical deliverables</th>
                    <th className="px-5 py-4 font-semibold">Est. hours</th>
                    <th className="px-5 py-4 font-semibold">Hourly</th>
                    <th className="px-5 py-4 font-semibold">Target fixed price</th>
                    <th className="px-5 py-4 font-semibold">Urgent / after-hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                  {pricingPackages.map((item) => (
                    <tr key={item.service}>
                      <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">{item.service}</td>
                      <td className="px-5 py-4">{item.deliverables}</td>
                      <td className="px-5 py-4">{item.hours}</td>
                      <td className="px-5 py-4">{item.hourly}</td>
                      <td className="px-5 py-4">{item.target}</td>
                      <td className="px-5 py-4">{item.urgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-2">
            {pricingRules.map((rule) => (
              <div key={rule} className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
                {rule}
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <ContactCta title="Get a quote scoped to your actual infrastructure." />
    </SiteFrame>
  );
}
