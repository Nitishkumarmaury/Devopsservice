import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilityGroups } from "@/data/technologies";

export function CapabilitiesSection() {
  return (
    <section className="border-y border-white/10 bg-[#090d14]/62 py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <FadeIn>
            <SectionHeading title="A practical capability map for modern production platforms." eyebrow="Capabilities">
              <p>
                The stack is selected for dependable web application delivery, infrastructure visibility, and operational handover.
              </p>
            </SectionHeading>
          </FadeIn>

          <div className="relative grid gap-5 sm:grid-cols-2">
            <div className="infra-beam absolute left-8 right-8 top-1/2 hidden h-px bg-white/10 md:block" />
            {capabilityGroups.map((group, index) => (
              <FadeIn key={group.title} delay={index * 0.04} as="article">
                <div className="relative h-full rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-lg border border-white/10 bg-[#05070b]/70 px-3 py-2 text-sm text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
