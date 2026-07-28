import dynamic from "next/dynamic";
import { ArrowRight, Bot, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionGlow } from "@/components/ui/section-glow";

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
    <div className="relative min-w-0 overflow-hidden rounded-[18px] border border-[#d6ebff]/12 bg-[#0d2338]/86 p-4 shadow-[0_30px_110px_rgba(0,0,0,0.26)] sm:p-5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2338]/46 via-[#0d2338]/74 to-[#06111f]/94" aria-hidden="true" />
      <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
      <div className="relative space-y-4">
        <div className="h-4 w-36 rounded bg-[#4da3ff]/12" />
        <div className="h-8 w-64 max-w-full rounded bg-[#4da3ff]/12" />
        <div className="grid min-w-0 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-11 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/70" />
          ))}
        </div>
        <div className="h-[420px] rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/70 sm:h-[480px]" />
      </div>
    </div>
  );
}

export function CloudAdvisorSection() {
  return (
    <section
      id="cloud-advisor"
      className="aurora-section relative overflow-hidden border-b border-[#d6ebff]/10 bg-[linear-gradient(180deg,#06111f_0%,#081a2e_100%)] section-rhythm"
    >
      <SectionGlow className="h-[520px] bg-[radial-gradient(ellipse_at_55%_0%,rgba(77,163,255,0.12),transparent_62%)]" />
      <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#0d2338]/20 via-[#0d2338]/42 to-[#06111f]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/60 to-transparent" />
      <Container className="relative">
        <div className="grid min-w-0 gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <FadeIn className="min-w-0 [overflow-wrap:anywhere] xl:sticky xl:top-24">
            <div className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3.5 py-2 text-sm font-semibold leading-snug text-[#b9ddff] shadow-[0_14px_34px_rgba(77,163,255,0.08)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Infrastructure Blueprint Tool
            </div>
            <p className="mt-6 font-mono text-xs font-semibold uppercase leading-6 tracking-normal text-rose-700">
              Cloud Architecture Advisor
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.04] tracking-normal text-[var(--text-primary)] sm:text-5xl">
              Turn technical uncertainty into a clear implementation plan.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              Describe your application, expected traffic, deployment process, and current challenges. The guided
              advisor creates a practical starting blueprint covering architecture, automation, monitoring, security,
              and scaling.
            </p>

            <div className="mt-6 min-w-0 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 p-4">
              <div className="flex min-w-0 gap-3">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
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
                  className="flex min-w-0 gap-3 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 p-4 text-sm text-[var(--text-secondary)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4da3ff]" aria-hidden="true" />
                  {useCase}
                </div>
              ))}
            </div>

            <a href="#cloud-advisor-workspace" className={buttonClassName("primary", "mt-8")}>
              <Bot className="h-4 w-4" aria-hidden="true" />
              Start Your Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>

          <FadeIn delay={0.08}>
            <AdvisorWorkspace />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
