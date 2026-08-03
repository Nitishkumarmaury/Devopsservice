import { CalendarCheck } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { consultationHref, siteConfig } from "@/lib/constants";

export function ContactCta({
  title = "Ready to discuss the safest next step?",
  description = "Share your stack, risk level, and delivery goal. You will get a practical scope conversation instead of a generic sales pitch.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0b1117] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_26%,transparent_52%),linear-gradient(180deg,#121b25_0%,#0b1117_56%,#080d12_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/35 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(77,163,255,0.08))]" />
      <ScrollReveal className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-normal text-[#b9ddff]">Consultation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#f8fafc] sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-[#cbd5e1]">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <AnimatedShinyButton url={consultationHref} tone="soft">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Consultation
          </AnimatedShinyButton>
          <a
            href={siteConfig.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 px-4 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
          >
            Join WhatsApp Group
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
