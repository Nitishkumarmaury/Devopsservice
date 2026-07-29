import { Activity, GitBranch, LayoutDashboard, ServerCog, TerminalSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StatProofCard } from "@/components/ui/stat-proof-card";
import { StaggerReveal } from "@/components/ui/stagger-reveal";

const proofItems = [
  {
    title: "Production deployment experience",
    description: "Deployment paths, proxy configuration, SSL, process management, and release handover.",
    Icon: ServerCog,
  },
  {
    title: "CI/CD workflow implementation",
    description: "Build, deploy, validation, secret handling, and rollback notes for repeatable releases.",
    Icon: GitBranch,
  },
  {
    title: "Monitoring dashboard setup",
    description: "Prometheus, Grafana, uptime checks, resource signals, and alert routes.",
    Icon: LayoutDashboard,
  },
  {
    title: "Linux and cloud troubleshooting",
    description: "Server health, logs, DNS, web-server behavior, resource pressure, and recovery steps.",
    Icon: TerminalSquare,
  },
  {
    title: "Next.js and NestJS support",
    description: "Production builds, runtime configuration, PM2, reverse proxy, and environment setup.",
    Icon: Activity,
  },
] as const;

export function ProofStrip() {
  return (
    <section className="relative bg-ink-navy py-16 text-white section-grid sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader eyebrow="Proof signals" title="No inflated metrics. Just the work buyers can verify." dark>
            When verified performance numbers are not available, the site shows practical evidence categories instead
            of inventing claims.
          </SectionHeader>
          <StaggerReveal className="grid gap-px border border-border/20 sm:grid-cols-2" itemClassName="h-full" from="right">
            {proofItems.map((item, index) => (
              <div key={item.title} className={index === 0 ? "h-full sm:col-span-2" : "h-full"}>
                <StatProofCard
                  title={item.title}
                  description={item.description}
                  Icon={item.Icon}
                />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
