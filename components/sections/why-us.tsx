import { BrainCircuit, Gauge, MessagesSquare, Radar, Repeat2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyUs } from "@/data/landing";

const icons = [Radar, MessagesSquare, Repeat2, Gauge, BrainCircuit] as const;

export function WhyUsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container>
        <FadeIn>
          <SectionHeading title="Engineering decisions built around your business." eyebrow="Why Choose Us">
            <p>
              Production infrastructure is not only a technical surface. It shapes release confidence, customer trust, recovery time, and operating cost.
            </p>
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {whyUs.map((item, index) => {
            const Icon = icons[index];
            return (
              <FadeIn key={item.title} delay={index * 0.04} as="article">
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#05070b] text-cyan-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
