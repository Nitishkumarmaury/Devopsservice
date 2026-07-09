import { Activity, ArrowRight, Cloud, CloudCog, Container as ContainerIcon, GitBranch, LockKeyhole, ShieldCheck, Workflow } from "lucide-react";
import Lightfall from "@/components/visuals/lightfall";
import { BorderBeam } from "@/components/ui/border-beam";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { StatusBadge } from "@/components/ui/status-badge";

const networkNodes = [
  { label: "Git", Icon: GitBranch, className: "left-[9%] top-[24%] text-violet-700 border-violet-200 bg-white/78" },
  { label: "CI/CD", Icon: Workflow, className: "left-[39%] top-[12%] text-blue-700 border-blue-200 bg-white/78" },
  { label: "Security", Icon: LockKeyhole, className: "right-[8%] top-[28%] text-amber-700 border-amber-200 bg-white/78" },
  { label: "Docker", Icon: ContainerIcon, className: "left-[18%] bottom-[18%] text-cyan-700 border-cyan-200 bg-white/78" },
  { label: "Cloud", Icon: Cloud, className: "left-[50%] bottom-[8%] text-fuchsia-700 border-fuchsia-200 bg-white/78" },
  { label: "Monitor", Icon: Activity, className: "right-[11%] bottom-[20%] text-emerald-700 border-emerald-200 bg-white/78" },
] as const;

function HeroVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <AuroraBackground className="opacity-95" />
      <div className="absolute inset-y-0 right-[-14%] w-[92rem] max-w-[115vw] opacity-60">
        <Lightfall
          colors={["#A6C8FF", "#35D6ED", "#B25CFF"]}
          backgroundColor="#f6f8fa"
          speed={0.42}
          streakCount={3}
          streakWidth={0.75}
          streakLength={0.8}
          glow={0.78}
          density={0.52}
          twinkle={0.55}
          zoom={2.9}
          backgroundGlow={0.35}
          opacity={0.62}
          mouseInteraction
          mouseStrength={0.35}
          mouseRadius={0.85}
        />
      </div>
      <div className="absolute right-[-2%] top-28 hidden h-[440px] w-[44%] max-w-[640px] lg:block">
        <div className="aurora-panel absolute inset-0 rounded-[28px] opacity-[0.82]" />
        <AnimatedBeam className="opacity-80" />
        <div className="absolute inset-7 rounded-[24px] border border-rose-200/60 bg-white/45 soft-grid opacity-80" />
        {networkNodes.map(({ label, Icon, className }, index) => (
          <div
            key={label}
            className={`absolute inline-flex min-w-28 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur ${className}`}
            style={{ animationDelay: `${index * 180}ms` }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </div>
        ))}
        <div className="absolute left-[34%] top-[42%] rounded-2xl border border-rose-200/70 bg-white/82 px-4 py-3 shadow-[0_20px_60px_rgba(15,34,48,0.14)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-700">Release health</p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Pipeline stable</p>
        </div>
        <div className="absolute bottom-8 right-12 rounded-2xl border border-emerald-200/80 bg-white/82 px-4 py-3 shadow-[0_20px_60px_rgba(21,155,113,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-700">Response</p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">142 ms</p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[620px] overflow-hidden pt-24 sm:min-h-[680px] lg:pt-28">
      <HeroVisual />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,253,0.98)_0%,rgba(255,247,251,0.94)_43%,rgba(255,247,251,0.62)_72%,rgba(255,255,255,0.9)_100%)]" />
      <Container className="relative z-10">
        <div className="max-w-[840px] pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-20 lg:pt-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/72 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-rose-700 shadow-[0_14px_34px_rgba(14,165,183,0.1)]">
            <CloudCog className="h-4 w-4" aria-hidden="true" />
            DevOps and Cloud Engineering
          </p>
          <h1 className="mt-6 max-w-[840px] text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.35rem] xl:text-[4.9rem]">
            Reliable cloud infrastructure <GradientText>for growing software teams.</GradientText>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            Production deployment, CI/CD, monitoring, security, and cloud support delivered with clear scope,
            practical architecture, and clean handover.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" className="relative">
              <BorderBeam />
              Request a Production Audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              View Services
            </ButtonLink>
          </div>
          <div className="mt-7 flex max-w-2xl flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
            {["Deployment automation", "Cloud setup", "Monitoring", "Production recovery"].map((item) => (
              <StatusBadge key={item} className="border-rose-200/70 bg-white/70 text-[var(--text-secondary)] shadow-[0_12px_30px_rgba(15,34,48,0.08)]">
                <ShieldCheck className="h-4 w-4 text-rose-600" aria-hidden="true" />
                {item}
              </StatusBadge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
