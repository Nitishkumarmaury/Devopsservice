import { FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { engagementProcess } from "@/data/landing";

export function ProcessSection() {
  return (
    <section className="border-y border-white/10 bg-[#090d14]/62 py-14 sm:py-20 lg:py-24">
      <Container>
        <FadeIn>
          <SectionHeading title="A clear engagement process from first call to handover." eyebrow="Engagement">
            <p>
              Every stage is designed to produce a practical deliverable, reduce ambiguity, and make production changes easier to understand.
            </p>
          </SectionHeading>
        </FadeIn>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {engagementProcess.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.04} as="article">
              <li className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-cyan-100">{String(index + 1).padStart(2, "0")}</span>
                  <FileCheck2 className="h-5 w-5 text-slate-500" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.deliverable}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </section>
  );
}
