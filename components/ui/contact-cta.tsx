import { CalendarCheck } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
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
    <section className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_58%,#12385c_100%)] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(77,163,255,0.16),transparent_30%),radial-gradient(circle_at_84%_32%,rgba(125,211,252,0.1),transparent_32%),linear-gradient(rgba(77,163,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.032)_1px,transparent_1px)] bg-[size:auto,auto,56px_56px,56px_56px]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4da3ff]/12" />
      <div className="absolute left-1/2 top-1/2 h-44 w-96 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#7dd3fc]/10" />
      <ScrollReveal className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[#b9ddff]">Consultation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-[#c7d5e6]">{description}</p>
        </div>
        <AnimatedShinyButton url={consultationHref} tone="soft" className="shrink-0">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book a Consultation
        </AnimatedShinyButton>
      </ScrollReveal>
    </section>
  );
}
