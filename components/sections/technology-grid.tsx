"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandIcon3D } from "@/components/ui/brand-icon-3d";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { ServiceIcon } from "@/components/services/service-icon";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const toolCategories = [
  {
    title: "Services",
    eyebrow: "Delivery menu",
    summary: "The service box now leads with the actual DevOps offers, then rotates through the supporting tool stack.",
    items: services.map((service) => ({
      label: service.shortTitle,
      detail: service.relatedPackage,
      kind: "service" as const,
      icon: service.icon,
    })),
  },
  {
    title: "Cloud",
    eyebrow: "Infrastructure",
    summary: "Cloud platforms and server foundations used for production deployment and migration work.",
    items: ["AWS", "DigitalOcean", "Google Cloud", "Azure", "Linux", "DNS"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "CI/CD",
    eyebrow: "Release automation",
    summary: "Build, validation, deployment, and rollback tooling for repeatable production releases.",
    items: ["Git", "GitHub Actions", "Bitbucket Pipelines", "SSH", "Health Checks", "Rollback Notes"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Containers",
    eyebrow: "Runtime packaging",
    summary: "Container workflows for stable app packaging, local parity, logs, volumes, and release handover.",
    items: ["Docker", "Docker Compose", "Kubernetes", "Volumes", "Logs", "Health Checks"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Monitoring",
    eyebrow: "Production visibility",
    summary: "Signals for uptime, server health, response behavior, alert routing, and dashboard handover.",
    items: ["Prometheus", "Grafana", "Node Exporter", "Blackbox Exporter", "PM2", "Application Health Checks"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Web Servers",
    eyebrow: "Traffic routing",
    summary: "Reverse proxy, SSL, process management, and web-server support for modern app deployments.",
    items: ["Nginx", "Apache", "Caddy", "PM2", "SSL", "UFW"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Databases",
    eyebrow: "Data services",
    summary: "Practical database and cache support around deployment, connection handling, backups, and runtime setup.",
    items: ["MongoDB", "MySQL", "Redis", "Backups", "Connection Strings", "Migrations"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Application Stack",
    eyebrow: "Modern apps",
    summary: "Production deployment support for JavaScript application runtimes and related server processes.",
    items: ["Next.js", "React", "Node.js", "NestJS", "Environment Variables", "Process Manager"].map((label) => ({ label, kind: "tool" as const })),
  },
  {
    title: "Security",
    eyebrow: "Operational hygiene",
    summary: "Practical hardening, access review, certificates, firewalls, updates, and server maintenance.",
    items: ["Linux", "SSH", "UFW", "SSL", "DNS", "Package Updates"].map((label) => ({ label, kind: "tool" as const })),
  },
] as const;

const ROTATION_MS = 3400;
const MANUAL_PAUSE_MS = 6200;

export function TechnologyGrid() {
  const [active, setActive] = useState<(typeof toolCategories)[number]["title"]>(toolCategories[0].title);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const category = useMemo(() => toolCategories.find((item) => item.title === active) ?? toolCategories[0], [active]);

  useEffect(() => {
    if (reduceMotion || paused) return;

    const interval = window.setInterval(() => {
      setActive((current) => {
        const index = toolCategories.findIndex((item) => item.title === current);
        return toolCategories[(index + 1) % toolCategories.length].title;
      });
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [paused, reduceMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, MANUAL_PAUSE_MS);
  };

  const activate = (title: (typeof toolCategories)[number]["title"]) => {
    setActive(title);
    pauseTemporarily();
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,183,0.08),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(139,108,255,0.08),transparent_28%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader eyebrow="Services and tools" title="An auto-moving service cockpit instead of static tabs.">
            The box rotates through core services and the tool categories behind them, so buyers can scan what you do
            without staring at a long logo wall.
          </SectionHeader>

          <div
            className={cn(
              "relative min-w-0 overflow-hidden rounded-[32px] border border-cyan-200/70 bg-[linear-gradient(135deg,#edf8fb_0%,#f6f4ff_55%,#fff7fb_100%)] p-4 shadow-[0_30px_100px_rgba(15,34,48,0.14)] sm:p-5",
              paused && "is-paused",
            )}
            style={{ "--auto-duration": `${ROTATION_MS}ms` } as CSSProperties}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-pink-200/22 blur-3xl" />

            <div className="relative grid min-w-0 gap-4 lg:grid-cols-[14rem_1fr]">
              <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {toolCategories.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => activate(item.title)}
                    className={cn(
                      "group relative min-w-0 overflow-hidden rounded-2xl border px-3 py-3 text-left text-sm font-semibold leading-snug transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                      active === item.title
                        ? "border-cyan-200 bg-white text-[var(--text-primary)] shadow-[0_14px_34px_rgba(14,165,183,0.14)]"
                        : "border-transparent bg-white/48 text-[var(--text-muted)] hover:bg-white/80 hover:text-[var(--text-primary)]",
                    )}
                  >
                    <span className="relative z-10 flex min-w-0 items-center gap-2">
                      <span className="font-mono text-[11px] text-[var(--rose-dark)]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{item.title}</span>
                    </span>
                    {active === item.title ? <span className="auto-progress absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-200" /> : null}
                  </button>
                ))}
              </div>

              <div className="min-w-0 rounded-[26px] border border-white bg-white/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-6">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={category.title}
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="min-w-0"
                  >
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[var(--rose-dark)]">
                          {category.eyebrow}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-[var(--text-primary)] sm:text-3xl">
                          {category.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{category.summary}</p>
                      </div>
                      <span className="w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-[var(--rose-dark)]">
                        {paused ? "Paused" : "Auto changing"}
                      </span>
                    </div>

                    <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {category.items.map((item, index) => (
                        <motion.div
                          key={`${category.title}-${item.label}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                          className="min-w-0"
                        >
                          {item.kind === "service" ? (
                            <div className="group flex min-h-16 min-w-0 items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/94 p-3 shadow-[0_16px_42px_rgba(15,34,48,0.08)] transition hover:-translate-y-0.5 hover:border-cyan-200">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-[var(--rose-dark)]">
                                <ServiceIcon icon={item.icon} />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
                                <span className="mt-1 block truncate text-xs text-[var(--text-muted)]">{item.detail}</span>
                              </span>
                            </div>
                          ) : (
                            <BrandIcon3D
                              name={item.label}
                              className="min-h-16 w-full justify-start rounded-2xl border-[var(--border)] bg-white/94 px-3 py-3 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_18px_42px_rgba(14,165,183,0.12)]"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-white bg-white/58 py-3">
              <div className="capability-marquee flex w-max items-center gap-3 px-3">
                {[...services, ...services].map((service, index) => (
                  <span
                    key={`${service.slug}-${index}`}
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-cyan-200/70 bg-white px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-[0_10px_26px_rgba(15,34,48,0.08)]"
                  >
                    <ServiceIcon icon={service.icon} />
                    {service.shortTitle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
