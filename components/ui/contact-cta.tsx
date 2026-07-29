import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { consultationHref } from "@/lib/constants";

export function ContactCta({
  title = "Ready to discuss the safest next step?",
  description = "Share your stack, risk level, and delivery goal. You will get a practical scope conversation instead of a generic sales pitch.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-border bg-canvas-soft py-16 sm:py-20">
      <ScrollReveal className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-0 max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">Consultation</p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-ink-secondary">{description}</p>
        </div>
        <ButtonLink href={consultationHref} variant="primary" className="shrink-0 gap-2 px-6 py-3 text-base">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a Consultation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </ScrollReveal>
    </section>
  );
}
