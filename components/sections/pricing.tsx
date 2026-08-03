import { ArrowRight, Activity, Cloud, GitBranch, LifeBuoy } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { PricingCard } from "@/components/ui/pricing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { pricingPackages, pricingRules } from "@/data/pricing";

const featuredPricing = [
  { title: "Production Issue Fix", item: pricingPackages[0], Icon: Activity, featured: false },
  { title: "Application Deployment", item: pricingPackages[2], Icon: Cloud, featured: true },
  { title: "CI/CD Pipeline", item: pricingPackages[3], Icon: GitBranch, featured: false },
  { title: "DevOps Care", item: pricingPackages[8], Icon: LifeBuoy, featured: false },
] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="aurora-section section-rhythm bg-[var(--background-soft)]">
      <SectionGlow className="opacity-60" />
      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading title="Honest launch prices for focused DevOps outcomes." eyebrow="Investment">
            <p>
              Published starter prices assume one application, one cloud account, and one production environment.
              Extra work is approved in writing before scope expands.
            </p>
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredPricing.map(({ title, item, Icon, featured }, index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <PricingCard
                title={title}
                service={item.service}
                target={item.target}
                hourly={item.hourly}
                deliverables={item.deliverables}
                Icon={Icon}
                featured={featured}
              />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[22px] border border-[var(--border)] bg-[#0d2338]/82 shadow-[var(--shadow-soft)]">
          <div className="border-b border-[var(--border)] px-5 py-4">
            <p className="font-mono text-xs uppercase tracking-normal text-[var(--rose-dark)]">Detailed comparison</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[#06111f]/60 text-[var(--text-secondary)]">
                <tr>
                  <th className="px-5 py-4 font-medium">Service</th>
                  <th className="px-5 py-4 font-medium">Typical deliverables</th>
                  <th className="px-5 py-4 font-medium">Est. hours</th>
                  <th className="px-5 py-4 font-medium">Fixed client price</th>
                  <th className="px-5 py-4 font-medium">Billing</th>
                  <th className="px-5 py-4 font-medium">Scope note</th>
                </tr>
              </thead>
              <tbody>
                {pricingPackages.map((item) => (
                  <tr
                    key={item.service}
                    className="border-b border-[var(--border)] text-[var(--text-secondary)] last:border-b-0"
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text-primary)]">{item.service}</td>
                    <td className="px-5 py-4 text-[var(--text-secondary)]">{item.includes}</td>
                    <td className="px-5 py-4">{item.hours}</td>
                    <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">{item.fixedPrice}</td>
                    <td className="px-5 py-4">{item.billing}</td>
                    <td className="px-5 py-4 text-[var(--text-secondary)]">{item.urgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <FadeIn as="article">
            <div className="aurora-panel rounded-[22px] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-rose-700">How projects are scoped</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                <p className="rounded-2xl border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-4 py-3 font-semibold text-[#b9ddff]">
                  Launch pricing assumes one application, one cloud account, and one production environment.
                </p>
                <p>Production issue fixes start at $199 when the scope is clear and access is ready.</p>
                <p>
                  For production-facing work such as app deployment, CI/CD, Docker, monitoring, cloud foundation,
                  and migration, each package has a published starter price and a narrow deliverable.
                </p>
                <p>Extra work is billed only after written approval at {pricingPackages[0].hourly}.</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#contact">
                  Schedule a Consultation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Send Project Details
                </ButtonLink>
              </div>
            </div>
          </FadeIn>

          <FadeIn as="article" delay={0.08}>
            <div className="aurora-panel rounded-[22px] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-rose-700">Scope protections</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {pricingRules.map((rule) => (
                  <li key={rule} className="rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/56 px-4 py-3">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
