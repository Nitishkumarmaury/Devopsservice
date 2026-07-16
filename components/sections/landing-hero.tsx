import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  CloudCog,
  Code2,
  GitBranch,
  LockKeyhole,
  MonitorCheck,
  ShieldCheck,
} from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FloatingStatusCard } from "@/components/ui/floating-status-card";
import { GradientBackground } from "@/components/ui/gradient-background";
import { consultationHref } from "@/lib/constants";

const heroSignals = [
  "SLO-driven reliability",
  "Controlled releases",
  "Observable systems",
] as const;

const pipelineNodes = [
  { label: "Code", caption: "Repo", Icon: Code2 },
  { label: "CI/CD", caption: "Gates", Icon: GitBranch },
  { label: "Docker", caption: "Image", Icon: Boxes },
  { label: "Cloud", caption: "Deploy", Icon: CloudCog },
  { label: "Monitoring", caption: "Signals", Icon: Activity },
] as const;

const statusCards = [
  { title: "Build Passed", detail: "Checks complete", Icon: CheckCircle2, className: "lg:left-4 lg:top-8" },
  { title: "Deployment Healthy", detail: "Release verified", Icon: CloudCog, className: "lg:right-4 lg:top-16" },
  { title: "Monitoring Active", detail: "Dashboards live", Icon: MonitorCheck, className: "lg:left-12 lg:bottom-14" },
  { title: "SSL Secured", detail: "TLS enabled", Icon: LockKeyhole, className: "lg:right-12 lg:bottom-8" },
] as const;

export function LandingHero() {
  return (
    <section
      id="hero"
      className="landing-hero relative isolate overflow-hidden bg-[linear-gradient(135deg,#06111f_0%,#0d2134_48%,#162052_100%)] pt-28 text-white sm:pt-32"
    >
      <GradientBackground className="aurora-motion opacity-90" />
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#edf3f6] to-transparent" />

      <Container className="relative z-10">
        <div className="grid min-w-0 gap-12 pb-16 pt-8 sm:pb-20 lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-6">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/8 px-3.5 py-2 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-cyan-100 shadow-[0_18px_46px_rgba(0,0,0,0.18)] backdrop-blur">
              <CloudCog className="h-4 w-4" aria-hidden="true" />
              Evidence-led cloud reliability
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-[76px]">
              DevOps Consulting for Measurable{" "}
              <span className="bg-[linear-gradient(135deg,#ffffff_0%,#67e8f9_40%,#b9a7ff_72%,#ffd0df_100%)] bg-clip-text text-transparent">
                Production Reliability
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Cloud engineering for teams that want production changes backed by observable signals: CI/CD gates,
              AWS deployment checks, Docker and Kubernetes readiness, monitoring baselines, rollback paths, and clear
              handover evidence.
            </p>
            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AnimatedShinyButton url={consultationHref}>Book a Consultation</AnimatedShinyButton>
              <ButtonLink href="/services" variant="secondary" className="border-white/14 bg-white/10 text-white shadow-[0_16px_44px_rgba(0,0,0,0.16)] hover:border-cyan-200/40 hover:bg-white/16 hover:text-white">
                Explore Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="mt-7 flex max-w-2xl flex-wrap gap-3 text-sm text-white/70">
              {heroSignals.map((item) => (
                <span
                  key={item}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur"
                >
                  <ShieldCheck className="h-4 w-4 text-cyan-100" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-white/54">
              Consultation-ready review for deployments, cloud infrastructure, automation, monitoring, and production support.
            </p>
          </div>

          <HeroInfrastructureVisual />
        </div>
      </Container>
    </section>
  );
}

function HeroInfrastructureVisual() {
  return (
    <div className="relative min-w-0">
      <div className="hero-command-center relative min-h-[520px] overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.07] p-4 shadow-[0_34px_120px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6 lg:min-h-[620px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(53,214,237,0.18),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(139,108,255,0.14),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-10" />

        <div className="relative z-10 rounded-[28px] border border-white/10 bg-[#06111f]/58 p-4 sm:p-6 lg:absolute lg:inset-x-8 lg:top-1/2 lg:-translate-y-1/2">
          <div className="mb-5 flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-cyan-100">
                Infrastructure flow
              </p>
              <p className="mt-1 text-sm text-white/54">Code -&gt; CI/CD -&gt; Docker -&gt; Cloud -&gt; Monitoring</p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              Live-ready
            </span>
          </div>

          <div className="hero-flow relative grid gap-3 sm:grid-cols-5">
            <div className="hero-flow-track hidden sm:block" />
            {pipelineNodes.map(({ label, caption, Icon }, index) => (
              <div
                key={label}
                className="hero-flow-node relative z-10 min-w-0 rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-center shadow-[0_18px_54px_rgba(0,0,0,0.18)] backdrop-blur"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/22 bg-cyan-200/10 text-cyan-100 shadow-[0_0_26px_rgba(53,214,237,0.12)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-3 block text-sm font-semibold leading-5 text-white">{label}</span>
                <span className="mt-1 block text-xs font-medium leading-5 text-white/48">{caption}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
          {statusCards.map(({ title, detail, Icon, className }) => (
            <FloatingStatusCard
              key={title}
              title={title}
              detail={detail}
              Icon={Icon}
              className={`lg:absolute ${className}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
