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
] as const;

const ROTATION_MS = 4500;
const MANUAL_PAUSE_MS = 8000;

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
    <section ref={sectionRef} className="border-b border-t border-border bg-canvas py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader eyebrow="Services and tools" title="A clear view of services and delivery tools.">
            Review core services and the supporting tool categories behind production deployment, monitoring,
            security, and infrastructure support.
          </SectionHeader>

          <div
            className={cn(
              "relative min-w-0 border border-border bg-canvas-surface p-4 sm:p-5",
              (rotationHeld || !sectionInView) && "motion-held",
            )}
            style={{ "--auto-duration": `${ROTATION_MS}ms` } as CSSProperties}
            onMouseEnter={() => setRotationHeld(true)}
            onMouseLeave={() => setRotationHeld(false)}
          >
            <div className="relative grid min-w-0 gap-px border border-border bg-border lg:grid-cols-[14rem_1fr]">
              <div className="grid min-w-0 grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-7">
                {toolCategories.map((item, index) => (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => activate(item.title)}
                    initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                    className={cn(
                      "group relative flex min-w-0 flex-1 items-center px-4 py-3 text-left font-mono text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      active === item.title
                        ? "bg-canvas text-secondary font-bold"
                        : "bg-canvas-soft text-ink-secondary hover:bg-canvas hover:text-ink",
                    )}
                  >
                    <span className="relative z-10 flex min-w-0 items-center gap-2">
                      <span className="font-bold text-secondary opacity-70">{String(index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{item.title}</span>
                    </span>
                    {active === item.title ? <span className="absolute inset-y-0 left-0 w-1 bg-secondary" /> : null}
                  </motion.button>
                ))}
              </div>

              <div className="min-w-0 bg-canvas p-5 sm:p-6">
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
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                        {category.eyebrow}
                      </p>
                      <h3 className="mt-3 font-mono text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                        {category.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-secondary">{category.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid min-w-0 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item, index) => (
                      <motion.div
                         key={`${category.title}-${item.label}`}
                         initial={reduceMotion ? false : { opacity: 0 }}
                         animate={reduceMotion ? undefined : { opacity: 1 }}
                         transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1], delay: index * 0.025 }}
                         className="flex h-full flex-col bg-canvas-soft"
                      >
                        {item.kind === "service" ? (
                          <div className="flex h-full min-w-0 items-center gap-3 p-3 transition hover:bg-canvas">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-secondary">
                              <ServiceIcon icon={item.icon} />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-mono text-xs font-bold text-ink">{item.label}</span>
                              <span className="mt-1 block truncate text-xs text-ink-muted">{item.detail}</span>
                            </span>
                          </div>
                        ) : (
                          <BrandIcon3D
                            name={item.label}
                            className="h-full w-full justify-start rounded-none border-0 bg-transparent px-4 py-3 transition hover:bg-canvas"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden border border-border bg-canvas-soft py-3">
              <div className="capability-marquee flex w-max items-center gap-3 px-3">
                {[...services, ...services].map((service, index) => (
                  <span
                    key={`${service.slug}-${index}`}
                    className="inline-flex h-10 shrink-0 items-center gap-2 border border-border bg-canvas px-3 text-xs font-semibold text-ink-secondary"
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
