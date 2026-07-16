import { FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

type ProcessStep = {
  title: string;
  deliverable: string;
  objective?: string;
  input?: string;
  work?: string;
  next?: string;
};

type ProcessTimelineProps = {
  steps: readonly ProcessStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  dark?: boolean;
  layout?: "compact" | "detailed";
};

export function ProcessTimeline({
  steps,
  eyebrow = "Process",
  title = "A smooth project flow from audit to support.",
  description = "Each stage keeps decisions, validation, and handover visible before changes reach production.",
  dark = false,
  layout = "compact",
}: Readonly<ProcessTimelineProps>) {
  const detailed = layout === "detailed";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32",
        dark
          ? "bg-[linear-gradient(135deg,#071521_0%,#102437_60%,#172351_100%)] text-white"
          : "bg-[var(--background-soft)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[radial-gradient(circle_at_18%_10%,rgba(53,214,237,0.16),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(139,108,255,0.14),transparent_30%)]"
            : "bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,183,0.08),transparent_32%),radial-gradient(circle_at_84%_22%,rgba(139,108,255,0.07),transparent_30%)]",
        )}
      />
      <Container className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} dark={dark}>
          {description}
        </SectionHeader>

        <ol className={cn("relative mt-12 grid gap-5", detailed ? "lg:gap-6" : "lg:grid-cols-6")}>
          <div
            className={cn(
              "pointer-events-none hidden bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-200 lg:block",
              detailed ? "absolute left-6 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b" : "absolute left-[8.33%] right-[8.33%] top-10 h-px",
            )}
          />
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} as="li" delay={index * 0.07} className="relative min-w-0">
              <article
                className={cn(
                  "relative h-full min-w-0 rounded-[24px] border p-5 shadow-[var(--shadow-soft)] [overflow-wrap:anywhere] sm:p-6",
                  detailed && "lg:grid lg:grid-cols-[0.38fr_1fr] lg:gap-6 lg:p-7",
                  dark
                    ? "border-white/10 bg-white/[0.075] text-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
                    : "border-[var(--border)] bg-white",
                )}
              >
                <div className="min-w-0">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl border font-mono text-sm font-semibold",
                      dark
                        ? "border-cyan-200/24 bg-cyan-200/10 text-cyan-100"
                        : "border-cyan-200 bg-cyan-50 text-[var(--rose-dark)]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <FileCheck2
                    className={cn("absolute right-5 top-5 h-5 w-5", dark ? "text-white/32" : "text-[var(--text-muted)]")}
                    aria-hidden="true"
                  />
                  <h3 className={cn("mt-5 text-xl font-semibold leading-7 tracking-normal", dark ? "text-white" : "text-[var(--text-primary)]")}>
                    {step.title}
                  </h3>
                  <p className={cn("mt-3 text-sm leading-6", dark ? "text-white/66" : "text-[var(--text-secondary)]")}>
                    {step.deliverable}
                  </p>
                </div>

                {step.objective || step.input || step.work || step.next ? (
                  <div className={cn("mt-5 grid min-w-0 gap-3", detailed && "lg:mt-0 lg:grid-cols-2")}>
                    <TimelineDetail title="Objective" text={step.objective} dark={dark} />
                    <TimelineDetail title="Client input" text={step.input} dark={dark} />
                    <TimelineDetail title="Work performed" text={step.work} dark={dark} />
                    <TimelineDetail title="Next step" text={step.next} dark={dark} />
                  </div>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TimelineDetail({ title, text, dark }: Readonly<{ title: string; text?: string; dark: boolean }>) {
  if (!text) return null;

  return (
    <div className={cn("min-w-0 rounded-2xl border p-4", dark ? "border-white/10 bg-black/10" : "border-[var(--border)] bg-[var(--background-soft)]")}>
      <p className={cn("text-xs font-semibold uppercase leading-5 tracking-normal", dark ? "text-cyan-100" : "text-[var(--rose-dark)]")}>
        {title}
      </p>
      <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/64" : "text-[var(--text-secondary)]")}>{text}</p>
    </div>
  );
}
