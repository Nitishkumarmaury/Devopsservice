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
import { consultationHref } from "@/lib/constants";

const heroSignals = [
  "SLO-aware releases",
  "Rollback paths documented",
  "Signals before handover",
  "Handover runbooks included",
] as const;

const pipelineNodes = [
  { label: "Code", caption: "Repository", Icon: Code2 },
  { label: "CI/CD", caption: "Gates", Icon: GitBranch },
  { label: "Docker", caption: "Build", Icon: Boxes },
  { label: "Cloud", caption: "Deploy", Icon: CloudCog },
  { label: "Monitor", caption: "Alerts", Icon: Activity },
] as const;

const statusCards = [
  { title: "Build Passed", detail: "Release checks complete", Icon: CheckCircle2 },
  { title: "Deployment Healthy", detail: "Routes and SSL verified", Icon: CloudCog },
  { title: "Monitoring Active", detail: "Dashboards and probes live", Icon: MonitorCheck },
  { title: "Access Secured", detail: "TLS and server controls checked", Icon: LockKeyhole },
] as const;

const trustStack = ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus", "Grafana"] as const;

export function LandingHero() {
  return (
    <section
      id="hero"
      className="landing-hero relative isolate overflow-hidden border-b border-[#d6ebff]/10 bg-[linear-gradient(135deg,#06111f_0%,#081a2e_55%,#0d2338_100%)] pt-28 text-white sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(77,163,255,0.052)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.036)_1px,transparent_1px),radial-gradient(circle_at_16%_12%,rgba(77,163,255,0.12),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(125,211,252,0.08),transparent_30%)] bg-[size:64px_64px,64px_64px,auto,auto]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/50 to-transparent" />

      <Container className="relative z-10">
        <div className="grid min-w-0 gap-12 pb-16 pt-8 sm:pb-20 lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-6">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3.5 py-2 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#b9ddff] shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur">
              <CloudCog className="h-4 w-4" aria-hidden="true" />
              Cloud and DevOps Engineering
            </p>
            <h1 className="mt-6 max-w-5xl break-normal text-4xl font-semibold leading-[1.04] tracking-normal text-[#f4f7fb] [overflow-wrap:normal] sm:text-6xl lg:text-[64px] xl:text-[68px]">
              Hand production back to your team,{" "}
              <span className="text-[#4da3ff]">not just to a dashboard.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5e6] sm:text-lg">
              CloudOpsync deploys, automates, and monitors AWS and containerized stacks — then signs over runbooks,
              rollback paths, and alert routes your engineers can operate without a call back. Scoped DevOps for
              startups, SaaS teams, and agencies, with clear handover from day one.
            </p>
            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AnimatedShinyButton url={consultationHref}>Book a 15-Minute Scoping Call</AnimatedShinyButton>
              <ButtonLink href="/services" variant="secondary" className="border-[#d6ebff]/14 bg-[#0d2338]/82 text-white shadow-[0_16px_44px_rgba(0,0,0,0.2)] hover:border-[#4da3ff]/36 hover:bg-[#12304b] hover:text-white">
                Explore Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="mt-7 flex max-w-2xl flex-wrap gap-3 text-sm text-[#c7d5e6]">
              {heroSignals.map((item) => (
                <span
                  key={item}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d6ebff]/12 bg-[#0d2338]/72 px-3 py-2 font-semibold shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur"
                >
                  <ShieldCheck className="h-4 w-4 text-[#4da3ff]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl font-mono text-xs leading-6 text-[#8294aa]">
              {trustStack.join("  /  ")}
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
      <div className="hero-command-center relative min-h-[520px] overflow-hidden rounded-[22px] border border-[#d6ebff]/12 bg-[#0d2338]/76 p-4 shadow-[0_34px_120px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-6 lg:min-h-[620px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(77,163,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(77,163,255,0.034)_1px,transparent_1px),radial-gradient(circle_at_50%_26%,rgba(77,163,255,0.12),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(125,211,252,0.08),transparent_34%)] bg-[size:44px_44px,44px_44px,auto,auto]" />

        <div className="relative z-10 rounded-[18px] border border-[#d6ebff]/10 bg-[#06111f]/68 p-4 sm:p-6 lg:absolute lg:inset-x-8 lg:top-1/2 lg:-translate-y-1/2">
          <div className="mb-5 flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#b9ddff]">
                Infrastructure flow
              </p>
              <p className="mt-1 text-sm text-[#8294aa]">Code -&gt; CI/CD -&gt; Docker -&gt; Cloud -&gt; Monitoring</p>
            </div>
            <span className="rounded-lg border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#b9ddff]">
              Live-ready
            </span>
          </div>

          <div className="hero-flow relative grid gap-3 sm:grid-cols-5">
            <div className="hero-flow-track hidden sm:block" />
            {pipelineNodes.map(({ label, caption, Icon }, index) => (
              <div
                key={label}
                className="hero-flow-node relative z-10 min-w-0 rounded-[14px] border border-[#d6ebff]/10 bg-[#0d2338]/88 p-4 text-center shadow-[0_18px_54px_rgba(0,0,0,0.22)] backdrop-blur"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-[#4da3ff]/20 bg-[#4da3ff]/10 text-[#4da3ff] shadow-[0_0_26px_rgba(77,163,255,0.12)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-3 block text-sm font-semibold leading-5 text-white">{label}</span>
                <span className="mt-1 block font-mono text-xs font-medium leading-5 text-[#8294aa]">{caption}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
          {statusCards.map(({ title, detail, Icon }, index) => (
            <div
              key={title}
              className={[
                "rounded-[14px] border border-[#d6ebff]/10 bg-[#0d2338]/82 p-4 shadow-[0_20px_64px_rgba(0,0,0,0.26)] backdrop-blur lg:absolute lg:w-48",
                index === 0 ? "lg:left-4 lg:top-8" : "",
                index === 1 ? "lg:right-4 lg:top-16" : "",
                index === 2 ? "lg:left-12 lg:bottom-14" : "",
                index === 3 ? "lg:right-12 lg:bottom-8" : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/10 text-[#4da3ff]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-5 text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#8294aa]">{detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
