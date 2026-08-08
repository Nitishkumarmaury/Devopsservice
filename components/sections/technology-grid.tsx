"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandIcon3D } from "@/components/ui/brand-icon-3d";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { ServiceIcon } from "@/components/services/service-icon";
import { useElementInView } from "@/lib/hooks/use-element-in-view";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const toolCategories = [
  {
    title: "Services",
    eyebrow: "Delivery menu",
    summary: "Core DevOps offers supported by the tool stack used in production delivery.",
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
  const [rotationHeld, setRotationHeld] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const [sectionRef, sectionInView] = useElementInView<HTMLElement>();
  const category = useMemo(() => toolCategories.find((item) => item.title === active) ?? toolCategories[0], [active]);

  useEffect(() => {
    if (reduceMotion || rotationHeld || !sectionInView) return;

    const interval = window.setInterval(() => {
      setActive((current) => {
        const index = toolCategories.findIndex((item) => item.title === current);
        return toolCategories[(index + 1) % toolCategories.length].title;
      });
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [rotationHeld, reduceMotion, sectionInView]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const holdRotationTemporarily = () => {
    setRotationHeld(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setRotationHeld(false);
      resumeTimer.current = null;
    }, MANUAL_PAUSE_MS);
  };

  const activate = (title: (typeof toolCategories)[number]["title"]) => {
    setActive(title);
    holdRotationTemporarily();
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[var(--background-soft)] py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(77,163,255,0.08),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(125,211,252,0.06),transparent_28%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader eyebrow="Services and tools" title="A clear view of services and delivery tools.">
            Review core services and the supporting tool categories behind production deployment, monitoring,
            security, and infrastructure support.
          </SectionHeader>

          <div
            className={cn(
              "relative min-w-0 overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[linear-gradient(135deg,#081a2e_0%,#0d2338_100%)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:p-5",
              (rotationHeld || !sectionInView) && "motion-held",
            )}
            style={{ "--auto-duration": `${ROTATION_MS}ms` } as CSSProperties}
            onMouseEnter={() => setRotationHeld(true)}
            onMouseLeave={() => setRotationHeld(false)}
          >
            <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />

            <div className="relative grid min-w-0 gap-4 lg:grid-cols-[14rem_1fr]">
              <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {toolCategories.map((item, index) => (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => activate(item.title)}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                    className={cn(
                      "group relative min-w-0 overflow-hidden rounded-xl border px-3 py-3 text-left text-sm font-semibold leading-snug transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4da3ff]",
                      active === item.title
                        ? "border-[#4da3ff]/24 bg-[#4da3ff]/10 text-[var(--text-primary)] shadow-[0_14px_34px_rgba(77,163,255,0.12)]"
                        : "border-transparent bg-[#06111f]/46 text-[var(--text-muted)] hover:bg-[#12304b] hover:text-[var(--text-primary)]",
                    )}
                  >
                    <span className="relative z-10 flex min-w-0 items-center gap-2">
                      <span className="font-mono text-[11px] text-[var(--rose-dark)]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{item.title}</span>
                    </span>
                    {active === item.title ? <span className="auto-progress absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#4da3ff] via-[#7dd3fc] to-[#ff8a7a]" /> : null}
                  </motion.button>
                ))}
              </div>

              <div className="min-w-0 rounded-[18px] border border-[#d6ebff]/10 bg-[#06111f]/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
                <motion.div
                  key={category.title}
                  aria-live="polite"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[23rem] min-w-0 flex-col"
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
                  </div>

                  <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={`${category.title}-${item.label}`}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={reduceMotion ? undefined : { opacity: 1 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1], delay: index * 0.025 }}
                        className="min-w-0"
                      >
                        {item.kind === "service" ? (
                          <div className="group flex min-h-16 min-w-0 items-center gap-3 rounded-xl border border-[var(--border)] bg-[#0d2338]/88 p-3 shadow-[0_16px_42px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-[#4da3ff]/24">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#4da3ff]/18 bg-[#4da3ff]/10 text-[var(--rose-dark)]">
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
                            className="min-h-16 w-full justify-start rounded-xl border-[var(--border)] bg-[#0d2338]/88 px-3 py-3 transition hover:-translate-y-0.5 hover:border-[#4da3ff]/24 hover:shadow-[0_18px_42px_rgba(77,163,255,0.1)]"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-xl border border-[#d6ebff]/10 bg-[#06111f]/46 py-3">
              <div className="capability-marquee flex w-max items-center gap-3 px-3">
                {[...services, ...services].map((service, index) => (
                  <span
                    key={`${service.slug}-${index}`}
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-[#4da3ff]/16 bg-[#0d2338]/82 px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-[0_10px_26px_rgba(0,0,0,0.18)]"
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
