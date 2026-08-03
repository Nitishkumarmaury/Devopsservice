"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/services/service-icon";
import { TechnologyTag } from "@/components/ui/technology-tag";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

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
      <div className="hidden min-w-0 gap-6 lg:grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-3 shadow-[var(--shadow-soft)]">
          <div className="grid gap-2">
            {services.map((service, index) => {
              const active = activeService.slug === service.slug;
              return (
                <motion.button
                  key={service.slug}
                  type="button"
                  onClick={() => setActiveSlug(service.slug)}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
                  className={cn(
                    "group grid min-w-0 grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-[14px] border px-4 py-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4da3ff]",
                    active
                      ? "border-[#4da3ff]/28 bg-[#4da3ff]/10 shadow-[0_18px_46px_rgba(77,163,255,0.12)]"
                      : "border-transparent bg-[#081a2e]/62 text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[#12304b]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm font-semibold",
                      active ? "text-[var(--rose-dark)]" : "text-[var(--text-muted)]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-semibold leading-6 text-[var(--text-primary)]">{service.shortTitle}</span>
                    <span className="mt-1 block truncate text-xs leading-5 text-[var(--text-muted)]">{service.relatedPackage}</span>
                  </span>
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-2xl border transition",
                      active
                        ? "border-[#4da3ff]/28 bg-[#0d2338] text-[#4da3ff] shadow-[0_12px_26px_rgba(77,163,255,0.12)]"
                        : "border-[var(--border)] bg-[#0d2338] text-[var(--text-muted)] group-hover:text-[var(--rose-dark)]",
                    )}
                  >
                    <ServiceIcon icon={service.icon} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_100%)] p-8 text-white shadow-[0_34px_120px_rgba(0,0,0,0.32)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(77,163,255,0.12),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(125,211,252,0.08),transparent_32%),radial-gradient(circle_at_72%_82%,rgba(255,138,122,0.08),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 soft-grid opacity-20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-w-0"
            >
              <div className="flex min-w-0 items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-sm font-semibold text-cyan-100">{services.findIndex((service) => service.slug === activeService.slug) + 1 < 10 ? "0" : ""}{services.findIndex((service) => service.slug === activeService.slug) + 1}</p>
                  <h3 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-normal">{activeService.title}</h3>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-[#c7d5e6]">{activeService.description}</p>
                </div>
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] border border-[#4da3ff]/24 bg-[#4da3ff]/10 text-[#4da3ff] shadow-[0_0_38px_rgba(77,163,255,0.14)]">
                  <ServiceIcon icon={activeService.icon} />
                </span>
              </div>

              <div className="mt-8 grid min-w-0 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[16px] border border-[#d6ebff]/10 bg-[#0d2338]/72 p-5">
                  <p className="text-sm font-semibold text-white">Selected deliverables</p>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#c7d5e6]">
                    {activeService.details.concat(activeService.includes).slice(0, 6).map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[16px] border border-[#d6ebff]/10 bg-[#0d2338]/72 p-5">
                  <p className="text-sm font-semibold text-white">Related technologies</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeService.technologies.map((tag) => (
                      <span key={tag} className="rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/62 px-3 py-1.5 font-mono text-xs font-semibold text-[#c7d5e6]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 rounded-xl border border-[#d6ebff]/10 bg-black/20 p-4 text-sm leading-6 text-[#c7d5e6]">
                    {activeService.visual}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/services/${activeService.slug}`}>
                  View service details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={`/contact?requestType=Book%20Consultation&projectType=${encodeURIComponent(activeService.title)}`}
                  variant="secondary"
                >
                  Discuss this service
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {services.map((service, index) => {
          const open = openSlug === service.slug;
          return (
            <motion.article
              key={service.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
              className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[#0d2338]/82 shadow-[var(--shadow-soft)]"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenSlug(open ? "" : service.slug)}
                className="flex w-full min-w-0 items-center gap-4 px-5 py-5 text-left"
              >
                <span className="font-mono text-sm font-semibold text-[var(--rose-dark)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#4da3ff]/18 bg-[#4da3ff]/10 text-[var(--rose-dark)]">
                  <ServiceIcon icon={service.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-6 text-[var(--text-primary)]">{service.shortTitle}</span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">{service.relatedPackage}</span>
                </span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-[var(--text-muted)] transition", open && "rotate-180")} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
                      <p className="text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {service.details.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--rose)]" />
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
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
