import { CheckCircle2, CircleAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { problemItems, resolutionLogs } from "@/data/landing";

export function ProblemsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <FadeIn>
            <SectionHeading title="Infrastructure should accelerate your product, not slow it down." eyebrow="Business Problem">
              <p>
                Deployment friction becomes business friction when every release depends on manual server work, unclear rollback paths, and weak production visibility.
              </p>
            </SectionHeading>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {problemItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-white/10 bg-[#05070b]/84 shadow-glow">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-[#ff7a9a]" />
                <span className="h-3 w-3 rounded-full bg-[#ffb454]" />
                <span className="h-3 w-3 rounded-full bg-[#43d9c5]" />
                <span className="ml-2 font-mono text-xs text-slate-400">production-readiness.log</span>
              </div>
              <div className="space-y-3 p-5">
                {resolutionLogs.map((log, index) => (
                  <div key={log} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">resolved 0{index + 1}</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">{log}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
