import { ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden border-y border-rose-100 bg-[linear-gradient(180deg,#fff3f8_0%,#ffffff_100%)] section-rhythm">
      <AuroraBackground className="opacity-60" />
      <div className="soft-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="infra-beam pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-rose-100" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">Ready for the next release</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">Build infrastructure your team can <GradientText>depend on.</GradientText></h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            Tell us what you are deploying, scaling, migrating, or troubleshooting. We will help you define the safest and most practical next step.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#contact" className="relative">
              <BorderBeam />
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Send Project Details
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
