import { CalendarCheck } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { consultationHref } from "@/lib/constants";

export function ContactCta({
  title = "Ready to discuss the safest next step?",
  description = "Share your stack, risk level, and delivery goal. You will get a practical scope conversation instead of a generic sales pitch.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#102437_0%,#0f6f7d_58%,#d5a645_100%)] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_86%_30%,rgba(255,255,255,0.1),transparent_32%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/76">Consultation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-white/80">{description}</p>
        </div>
        <AnimatedShinyButton url={consultationHref} tone="soft" className="shrink-0">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a Consultation
        </AnimatedShinyButton>
      </div>
    </section>
  );
}
