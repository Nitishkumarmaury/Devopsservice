import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, CreditCard, FileCheck2, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import {
  extraWorkRate,
  pricingAssumption,
  pricingAssumptionItems,
  pricingPackages,
  pricingRules,
} from "@/data/pricing";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Pricing and Launch Packages",
  description:
    "Honest CloudOpsync starter pricing in USD for production fixes, reliability audits, app deployment, CI/CD, Docker, monitoring, cloud foundation, migration, and DevOps Care.",
  path: "/pricing",
});

const featuredServices = new Set(["Reliability audit", "Application deployment", "CI/CD pipeline"]);

function pricingHref(service: string) {
  const projectDetails = `I would like to request scope for the ${service} launch package.`;
  return `/contact?requestType=Pricing%20Request&projectDetails=${encodeURIComponent(projectDetails)}`;
}

export default function PricingPage() {
  const oneTimePackages = pricingPackages.filter((item) => item.billing === "Fixed price");
  const monthlyPackages = pricingPackages.filter((item) => item.billing === "Monthly retainer");

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PageHero
        eyebrow="Launch Pricing"
        title="Honest starter prices for focused production DevOps work."
        actions={
          <ButtonLink href="/contact?requestType=Pricing%20Request">
            Request Scope
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Published USD prices for clearly scoped work. These are CloudOpsync launch prices, not fake market averages,
        and they assume {pricingAssumption.toLowerCase()}
      </PageHero>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <ScrollReveal className="rounded-[24px] border border-[var(--border)] bg-[#0d2338]/82 p-6 shadow-[var(--shadow-soft)] lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">
                  Clear assumption
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)]">
                  One app. One cloud account. One production environment.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {pricingAssumptionItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/56 p-4 text-sm font-semibold text-[var(--text-primary)]"
                  >
                    <CheckCircle2 className="mb-3 h-4 w-4 text-[#4da3ff]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-[var(--background)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">Fixed-price work</p>
            <h2 className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">Starter packages for practical outcomes.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
              Each package has a defined client price and a narrow operational promise. Wider scope, extra environments,
              additional applications, or urgent coverage are approved before work expands.
            </p>
          </div>

          <StaggerReveal className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {oneTimePackages.map((item) => {
              const featured = featuredServices.has(item.service);
              return (
                <article
                  key={item.service}
                  className={[
                    "relative flex min-w-0 flex-col rounded-[22px] border bg-[#0d2338]/82 p-5 shadow-[var(--shadow-soft)] [overflow-wrap:anywhere] sm:p-6",
                    featured ? "border-[#4da3ff]/36 ring-1 ring-[#4da3ff]/16" : "border-[var(--border)]",
                  ].join(" ")}
                >
                  {featured ? (
                    <span className="absolute right-4 top-4 rounded-lg border border-[#4da3ff]/24 bg-[#4da3ff]/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase text-[#b9ddff]">
                      Common
                    </span>
                  ) : null}
                  <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">{item.category}</p>
                  <h3
                    className={[
                      "mt-4 text-xl font-semibold text-[var(--text-primary)]",
                      featured ? "pr-16" : "",
                    ].join(" ")}
                  >
                    {item.service}
                  </h3>
                  <p className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">{item.fixedPrice}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-[var(--text-secondary)]">{item.includes}</p>
                  <ButtonLink href={pricingHref(item.service)} variant={featured ? "primary" : "secondary"} className="mt-6 w-full">
                    Request Scope
                  </ButtonLink>
                </article>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">Monthly care</p>
            <h2 className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">Retainers for teams that need release support.</h2>
          </div>
          <StaggerReveal className="mt-10 grid gap-5 lg:grid-cols-2">
            {monthlyPackages.map((item) => (
              <article key={item.service} className="rounded-[24px] border border-[var(--border)] bg-[#0d2338]/82 p-6 shadow-[var(--shadow-soft)] lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">{item.category}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{item.service}</h3>
                  </div>
                  <p className="text-4xl font-semibold text-[var(--text-primary)]">{item.fixedPrice}</p>
                </div>
                <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">{item.includes}</p>
                <ButtonLink href={pricingHref(item.service)} variant="secondary" className="mt-6">
                  Request Monthly Scope
                </ButtonLink>
              </article>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <section className="bg-[var(--background)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <ScrollReveal className="rounded-[24px] border border-[var(--border)] bg-[#0d2338]/82 p-6 shadow-[var(--shadow-soft)] lg:p-8">
              <CreditCard className="h-5 w-5 text-[#4da3ff]" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Trust rules</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                These rules protect both sides: the client knows what is included, and CloudOpsync only expands scope
                after written approval.
              </p>
              <div className="mt-6 rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/56 p-4 text-sm leading-7 text-[var(--text-secondary)]">
                Extra approved work: <strong className="text-[var(--text-primary)]">{extraWorkRate}</strong>
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid gap-4 sm:grid-cols-2">
              {pricingRules.map((rule, index) => (
                <article key={rule} className="rounded-[18px] border border-[var(--border)] bg-[#0d2338]/82 p-5 shadow-[var(--shadow-soft)]">
                  {index < 3 ? (
                    <ShieldCheck className="h-4 w-4 text-[#4da3ff]" aria-hidden="true" />
                  ) : (
                    <FileCheck2 className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
                  )}
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{rule}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <ScrollReveal className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[#0d2338]/82 shadow-[var(--shadow-soft)]">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[var(--rose-dark)]">Complete starter price list</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[900px] text-left text-sm">
                <thead className="bg-[#06111f]/60 text-[var(--text-primary)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Service</th>
                    <th className="px-5 py-4 font-semibold">Fixed client price</th>
                    <th className="px-5 py-4 font-semibold">Includes</th>
                    <th className="px-5 py-4 font-semibold">Billing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                  {pricingPackages.map((item) => (
                    <tr key={item.service}>
                      <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">{item.service}</td>
                      <td className="px-5 py-4 text-base font-semibold text-[var(--text-primary)]">{item.fixedPrice}</td>
                      <td className="px-5 py-4">{item.includes}</td>
                      <td className="px-5 py-4">{item.billing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <ContactCta title="Request a scope tied to your actual production environment." />
    </SiteFrame>
  );
}
