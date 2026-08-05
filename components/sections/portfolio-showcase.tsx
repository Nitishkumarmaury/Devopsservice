"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Globe, Layers, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechnologyTag } from "@/components/ui/technology-tag";
import type { PortfolioProject } from "@/data/portfolio";

type PortfolioShowcaseProps = {
  projects: PortfolioProject[];
  title?: string;
  description?: string;
};

export function PortfolioShowcase({
  projects,
  title = "Live Projects Deployed and Managed by CloudOpsync.",
  description = "Production applications designed, deployed, monitored, and supported across food delivery, transportation, gaming, and infrastructure monitoring platforms.",
}: Readonly<PortfolioShowcaseProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[linear-gradient(180deg,#06111f_0%,#081a2e_50%,#06111f_100%)] py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(77,163,255,0.1),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(125,211,252,0.07),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(184,165,255,0.06),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(77,163,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#b9ddff]">
            Live Portfolio
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">{description}</p>
        </div>

        {/* Project Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                activeIndex === index
                  ? "border border-[#4da3ff]/40 bg-[#4da3ff]/14 text-[#e5f2ff] shadow-[0_0_32px_rgba(77,163,255,0.16)]"
                  : "border border-[#d6ebff]/12 bg-[#0d2338]/72 text-[var(--text-secondary)] hover:border-[#4da3ff]/24 hover:bg-[#12304b] hover:text-[var(--text-primary)]",
              ].join(" ")}
            >
              {project.name}
              {activeIndex === index && (
                <motion.div
                  layoutId="portfolio-indicator"
                  className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#4da3ff] to-transparent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Project Display */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                {/* Screenshot Card */}
                <div className="group relative overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[#0d2338]/82 shadow-[0_34px_120px_rgba(0,0,0,0.36)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-60`} />
                    <Image
                      src={active.screenshot}
                      alt={`${active.name} - ${active.tagline}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 55vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/90 via-transparent to-transparent" />

                    {/* Floating Labels */}
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#4da3ff]/30 bg-[#06111f]/80 px-3 py-1.5 text-xs font-semibold text-[#b9ddff] backdrop-blur-md">
                        <Globe className="h-3 w-3" aria-hidden="true" />
                        Live Project
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-2xl font-semibold text-white">{active.name}</p>
                      <p className="mt-1 text-sm text-white/70">{active.tagline}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="border-t border-[#d6ebff]/10 px-5 py-4">
                    <p className="mb-3 font-mono text-xs font-semibold uppercase text-[#8294aa]">Technologies Used</p>
                    <div className="flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <TechnologyTag key={tech}>{tech}</TechnologyTag>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-5">
                  {/* Industry Badge */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 px-3 py-1.5 text-xs font-semibold text-[#b9ddff]">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      {active.clientIndustry}
                    </span>
                  </div>

                  {/* Overview */}
                  <div className="rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-5 shadow-[var(--shadow-soft)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">DevOps Work Delivered</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{active.overview}</p>
                  </div>

                  {/* Delivered Improvements */}
                  <div className="rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/82 p-5 shadow-[var(--shadow-soft)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">What We Improved</h3>
                    <ul className="mt-3 grid gap-2">
                      {active.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                          <Star className="mt-1 h-3.5 w-3.5 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4da3ff]/50 bg-[#4da3ff] px-5 py-3.5 text-sm font-semibold text-[#06111f] shadow-[0_16px_44px_rgba(77,163,255,0.2)] transition hover:-translate-y-0.5 hover:bg-[#b9ddff]"
                  >
                    Visit {active.name} Live
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Projects Grid (smaller cards below) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "group relative overflow-hidden rounded-[16px] border text-left transition-all duration-300",
                activeIndex === index
                  ? "border-[#4da3ff]/30 bg-[#0d2338] shadow-[0_0_40px_rgba(77,163,255,0.12)]"
                  : "border-[#d6ebff]/10 bg-[#0d2338]/60 hover:border-[#4da3ff]/20 hover:bg-[#12304b]",
              ].join(" ")}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.screenshot}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{project.name}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{project.industry}</p>
              </div>
              {activeIndex === index && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#4da3ff] via-[#7dd3fc] to-[#4da3ff]" />
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
