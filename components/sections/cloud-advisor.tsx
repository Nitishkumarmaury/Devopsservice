import dynamic from "next/dynamic";
import { ArrowRight, Bot, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { SectionGlow } from "@/components/ui/section-glow";
import Strands from "@/components/visuals/strands";

const AdvisorWorkspace = dynamic(
  () => import("@/components/ai/advisor-workspace").then((module) => module.AdvisorWorkspace),
  {
    loading: () => <AdvisorWorkspaceSkeleton />,
  },
);

const useCases = [
  "Design infrastructure for a new SaaS application",
  "Improve an existing deployment process",
  "Investigate scaling and monitoring gaps",
] as const;

function AdvisorWorkspaceSkeleton() {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[20px] border border-rose-100 bg-white/86 p-4 shadow-[0_30px_110px_rgba(15,34,48,0.12)] sm:rounded-lg sm:p-5">
      <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-[140%] -translate-x-1/2 opacity-60 sm:h-72 sm:w-[120%]" aria-hidden="true">
        <Strands
          className="h-full w-full"
          colors={["#0EA5B7", "#7C5CFF", "#F04493", "#D5A645"]}
          count={4}
          speed={0.42}
          amplitude={0.9}
          waviness={0.95}
          thickness={0.72}
          glow={2.4}
          taper={3.1}
          spread={0.95}
          intensity={0.58}
          saturation={1.75}
          opacity={0.86}
          scale={1.28}
          glass={false}
          refraction={1}
          dispersion={1}
          glassSize={1}
          hueShift={0.08}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/46 via-white/74 to-white/94" aria-hidden="true" />
      <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
      <div className="relative space-y-4">
        <div className="h-4 w-36 rounded bg-rose-100" />
        <div className="h-8 w-64 max-w-full rounded bg-rose-100" />
        <div className="grid min-w-0 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-11 rounded-lg border border-rose-100 bg-white/70" />
          ))}
        </div>
        <div className="h-[420px] rounded-lg border border-rose-100 bg-white/70 sm:h-[480px]" />
      </div>
    </div>
  );
}

export function CloudAdvisorSection() {
  return (
    <section
      id="cloud-advisor"
      className="aurora-section relative overflow-hidden border-b border-rose-100 bg-[linear-gradient(180deg,#fff_0%,#edf3f6_100%)] section-rhythm"
    >
      <SectionGlow className="h-[520px] bg-[radial-gradient(ellipse_at_55%_0%,rgba(14,165,183,0.14),transparent_62%)]" />
      <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-white/10 via-white/42 to-[#edf3f6]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" />
      <Container className="relative">
        <div className="grid min-w-0 gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <div className="min-w-0 [overflow-wrap:anywhere] xl:sticky xl:top-24">
            <div className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border border-rose-200 bg-white/72 px-3.5 py-2 text-sm font-semibold leading-snug text-rose-700 shadow-[0_14px_34px_rgba(14,165,183,0.1)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Infrastructure Blueprint Tool
            </div>
            <p className="mt-6 font-mono text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-rose-700 sm:tracking-[0.22em]">
              Cloud Architecture Advisor
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl sm:tracking-[-0.035em]">
              Turn technical uncertainty into a clear implementation plan.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              Describe your application, expected traffic, deployment process, and current challenges. The guided
              advisor creates a practical starting blueprint covering architecture, automation, monitoring, security,
              and scaling.
            </p>

            <div className="mt-6 min-w-0 rounded-lg border border-rose-100 bg-white/68 p-4">
              <div className="flex min-w-0 gap-3">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  This is an initial planning assistant, not a replacement for a professional infrastructure audit.
                  Do not submit credentials, customer data, or private infrastructure addresses.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="flex min-w-0 gap-3 rounded-lg border border-rose-100 bg-white/68 p-4 text-sm text-[var(--text-secondary)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
                  {useCase}
                </div>
              ))}
            </div>

            <a href="#cloud-advisor-workspace" className={buttonClassName("primary", "mt-8")}>
              <Bot className="h-4 w-4" aria-hidden="true" />
              Start Your Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <AdvisorWorkspace />
        </div>
      </Container>
    </section>
  );
}
