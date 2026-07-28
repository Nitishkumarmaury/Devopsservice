import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { caseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const accents = [
  "border-rose-200 bg-rose-50 text-rose-700",
  "border-blue-200 bg-blue-50 text-blue-700",
  "border-violet-200 bg-violet-50 text-violet-700",
  "border-emerald-200 bg-emerald-50 text-emerald-700",
] as const;

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="aurora-section border-y border-rose-100 bg-[linear-gradient(180deg,#f6f8fa_0%,#fff_100%)] section-rhythm">
      <SectionGlow className="bg-[radial-gradient(ellipse_at_35%_0%,rgba(77,163,255,0.12),transparent_62%)]" />
      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading title="Project patterns built for measurable production improvement." eyebrow="Project Examples">
            <p>
              Common engagement types for teams that need safer releases, clearer monitoring, and reliable cloud operations.
            </p>
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((item, index) => (
            <FadeIn key={item.category} delay={index * 0.04}>
              <article
                className={cn(
                  "aurora-panel group relative h-full overflow-hidden rounded-[22px] p-6 transition duration-200 hover:-translate-y-1 hover:border-rose-300/50",
                  index === 0 && "lg:col-span-2",
                )}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-full bg-gradient-to-l from-rose-200/50 to-transparent opacity-80" />
                <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-rose-700">Project category</p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{item.category}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="min-h-36 rounded-2xl border border-rose-100 bg-white/68 p-4 soft-grid">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 3 }).map((_, nodeIndex) => (
                          <span
                            key={nodeIndex}
                            className={cn(
                              "h-3 w-3 rounded-full",
                              nodeIndex === 0 && "bg-cyan-300/80",
                              nodeIndex === 1 && "bg-violet-300/80",
                              nodeIndex === 2 && "bg-emerald-300/80",
                            )}
                          />
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="h-px bg-gradient-to-r from-cyan-300/70 via-violet-300/60 to-transparent" />
                        <div className="h-px w-4/5 bg-gradient-to-r from-blue-300/50 via-emerald-300/50 to-transparent" />
                        <div className="h-px w-2/3 bg-gradient-to-r from-violet-300/50 to-transparent" />
                      </div>
                    </div>
                  </div>
                  <dl className="space-y-4 text-sm leading-7">
                    <div>
                      <dt className="font-semibold text-[var(--text-primary)]">Problem</dt>
                      <dd className="mt-1 text-[var(--text-secondary)]">{item.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[var(--text-primary)]">Engineering approach</dt>
                      <dd className="mt-1 text-[var(--text-secondary)]">{item.approach}</dd>
                    </div>
                  </dl>
                </div>
                <dl className="mt-5 space-y-4 text-sm leading-7">
                  <div>
                    <dt className="font-semibold text-[var(--text-primary)]">Technologies</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <span key={tech} className={cn("rounded-full border px-2.5 py-1 font-mono text-xs", accents[techIndex % accents.length])}>
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[var(--text-primary)]">Client value</dt>
                    <dd className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">{item.outcome}</dd>
                  </div>
                </dl>
                <ButtonLink href="#contact" variant="secondary" className="mt-6 w-full">
                  Discuss this type of work
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
