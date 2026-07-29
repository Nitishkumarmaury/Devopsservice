"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/services/service-icon";
import { TechnologyTag } from "@/components/ui/technology-tag";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type ServiceShowcaseProps = {
  services: readonly Service[];
  className?: string;
};

export function ServiceShowcase({ services, className }: Readonly<ServiceShowcaseProps>) {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug ?? "");
  const [openSlug, setOpenSlug] = useState(services[0]?.slug ?? "");
  const reduceMotion = useReducedMotion();
  const activeService = useMemo(
    () => services.find((service) => service.slug === activeSlug) ?? services[0],
    [activeSlug, services],
  );

  if (!activeService) return null;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="hidden min-w-0 gap-px border border-border bg-border lg:grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-canvas-soft p-4 sm:p-5">
          <div className="grid gap-1">
            {services.map((service, index) => {
              const active = activeService.slug === service.slug;
              return (
                <motion.button
                  key={service.slug}
                  type="button"
                  onClick={() => setActiveSlug(service.slug)}
                  initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
                  className={cn(
                    "group grid min-w-0 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border px-4 py-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    active
                      ? "border-secondary bg-canvas"
                      : "border-transparent bg-transparent text-ink-secondary hover:border-border hover:bg-canvas",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm font-bold",
                      active ? "text-secondary" : "text-ink-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-bold leading-6 text-ink">{service.shortTitle}</span>
                    <span className="mt-1 block truncate text-xs leading-5 text-ink-muted">{service.relatedPackage}</span>
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center border transition",
                      active
                        ? "border-secondary bg-canvas text-secondary"
                        : "border-border bg-canvas-soft text-ink-muted group-hover:text-secondary",
                    )}
                  >
                    <ServiceIcon icon={service.icon} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative min-w-0 bg-ink-navy p-8 text-white section-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full min-w-0 flex-col"
            >
              <div className="flex min-w-0 items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                    {services.findIndex((service) => service.slug === activeService.slug) + 1 < 10 ? "0" : ""}
                    {services.findIndex((service) => service.slug === activeService.slug) + 1}
                  </p>
                  <h3 className="mt-3 max-w-2xl font-mono text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {activeService.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">{activeService.description}</p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-secondary/40 bg-white/5 text-secondary">
                  <ServiceIcon icon={activeService.icon} />
                </span>
              </div>

              <div className="mt-8 grid min-w-0 flex-1 gap-px border border-border/20 bg-border/20 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="flex h-full flex-col bg-ink-navy p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">Selected deliverables</p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/70">
                    {activeService.details.concat(activeService.includes).slice(0, 6).map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex h-full flex-col bg-ink-navy p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">Related technologies</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeService.technologies.map((tag) => (
                      <span key={tag} className="border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto border border-white/10 bg-black/10 p-4 font-mono text-xs leading-6 text-white/60">
                    {activeService.visual}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/services/${activeService.slug}`} variant="secondary" className="border-white/20 text-white hover:border-white hover:bg-white/10">
                  View service details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={`/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(activeService.title)}`}
                  variant="primary"
                >
                  Discuss this service
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-px border border-border bg-border lg:hidden">
        {services.map((service, index) => {
          const open = openSlug === service.slug;
          return (
            <ScrollReveal
              key={service.slug}
              from="left"
              delay={index * 0.07}
              className="bg-canvas-surface"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenSlug(open ? "" : service.slug)}
                className="flex w-full min-w-0 items-center gap-4 px-5 py-5 text-left transition hover:bg-canvas"
              >
                <span className="font-mono text-sm font-bold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-secondary">
                  <ServiceIcon icon={service.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-sm font-bold leading-6 text-ink">{service.shortTitle}</span>
                  <span className="mt-1 block truncate text-xs leading-5 text-ink-muted">{service.relatedPackage}</span>
                </span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-ink-muted transition", open && "rotate-180")} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-canvas-soft"
                  >
                    <div className="border-t border-border px-5 pb-5 pt-4">
                      <p className="text-sm leading-7 text-ink-secondary">{service.description}</p>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink-secondary">
                        {service.details.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.technologies.slice(0, 5).map((tag) => (
                          <TechnologyTag key={tag}>{tag}</TechnologyTag>
                        ))}
                      </div>
                      <ButtonLink href={`/services/${service.slug}`} variant="ghost" className="mt-4 px-0">
                        View service details
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </ButtonLink>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
