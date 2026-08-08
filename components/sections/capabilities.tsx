import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilityGroups } from "@/data/technologies";

export function CapabilitiesSection() {
  return (
    <section className="border-y border-[#d6ebff]/10 bg-[#06111f] py-14 sm:py-20 lg:py-24">
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
            {capabilityGroups.map((group, index) => (
              <FadeIn key={group.title} delay={index * 0.04} as="article" className="h-full">
                <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-[#d6ebff]/12 bg-[#0d2338]/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur transition hover:border-[#4da3ff]/30">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-lg border border-[#d6ebff]/10 bg-[#06111f]/80 px-3 py-1.5 font-mono text-xs font-medium text-[#b9ddff]">
                          {item}
                        </span>
                      ))}
                    </div>
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
