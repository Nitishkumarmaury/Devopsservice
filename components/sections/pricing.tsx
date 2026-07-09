import { ArrowRight, Activity, Cloud, GitBranch, LifeBuoy } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { PricingCard } from "@/components/ui/pricing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { pricingPackages, pricingRules } from "@/data/pricing";

const featuredPricing = [
  { title: "Quick Infrastructure Fix", item: pricingPackages[0], Icon: Activity, featured: false },
  { title: "Production Setup", item: pricingPackages[1], Icon: Cloud, featured: true },
  { title: "CI/CD and Automation", item: pricingPackages[2], Icon: GitBranch, featured: false },
  { title: "Ongoing DevOps Support", item: pricingPackages[6], Icon: LifeBuoy, featured: false },
] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="aurora-section bg-white section-rhythm">
      <SectionGlow className="opacity-60" />
      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading title="Clear pricing ranges for focused DevOps outcomes." eyebrow="Investment">
            <p>
              Every quote is tied to deliverables, risk, urgency, and handover quality so clients know exactly what will improve before implementation begins.
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

        <div className="mt-10 overflow-hidden rounded-[22px] border border-rose-100 bg-white/80 shadow-[0_20px_70px_rgba(15,34,48,0.1)]">
          <div className="border-b border-rose-100 px-5 py-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-rose-700">Detailed comparison</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="border-b border-rose-100 bg-rose-50/60 text-[var(--text-secondary)]">
                <tr>
                  <th className="px-5 py-4 font-medium">Service</th>
                  <th className="px-5 py-4 font-medium">Typical deliverables</th>
                  <th className="px-5 py-4 font-medium">Est. hours</th>
                  <th className="px-5 py-4 font-medium">Suggested hourly</th>
                  <th className="px-5 py-4 font-medium">Fixed-price floor</th>
                  <th className="px-5 py-4 font-medium">Target fixed price</th>
                  <th className="px-5 py-4 font-medium">Urgent / after-hours</th>
                </tr>
              </thead>
              <tbody>
                {pricingPackages.map((item) => (
                  <tr key={item.service} className="border-b border-rose-100/70 text-[var(--text-secondary)] last:border-b-0">
                    <td className="px-5 py-4 font-medium text-[var(--text-primary)]">{item.service}</td>
                    <td className="px-5 py-4 text-[var(--text-secondary)]">{item.deliverables}</td>
                    <td className="px-5 py-4">{item.hours}</td>
                    <td className="px-5 py-4">{item.hourly}</td>
                    <td className="px-5 py-4">{item.floor}</td>
                    <td className="px-5 py-4">{item.target}</td>
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
                <p className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 font-semibold text-rose-800">
                  Free first scope review for serious production, deployment, CI/CD, or monitoring inquiries.
                </p>
                <p>Focused production fixes start at $100 when the scope is clear and access is ready.</p>
                <p>
                  For production-facing work such as AWS EC2 setup, Nginx or Apache reverse proxy, PM2, SSL, deployment pipelines, and live troubleshooting, most projects fall in the $150-$500 range depending on scope and urgency.
                </p>
                <p>Standard work can be billed hourly or fixed-price. Urgent incident work is scoped with a clear response window and higher availability premium.</p>
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
                  <li key={rule} className="rounded-xl border border-rose-100 bg-white/70 px-4 py-3">
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
