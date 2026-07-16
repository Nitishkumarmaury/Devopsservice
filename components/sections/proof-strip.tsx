import { Activity, GitBranch, LayoutDashboard, ServerCog, TerminalSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StatProofCard } from "@/components/ui/stat-proof-card";

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
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071521_0%,#102437_58%,#172351_100%)] py-16 text-white sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(53,214,237,0.16),transparent_32%),radial-gradient(circle_at_86%_24%,rgba(139,108,255,0.14),transparent_30%),radial-gradient(circle_at_64%_90%,rgba(255,111,145,0.1),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-10" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader eyebrow="Proof signals" title="No inflated metrics. Just the work buyers can verify." dark>
            When verified performance numbers are not available, the site shows practical evidence categories instead
            of inventing claims.
          </SectionHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofItems.map((item, index) => (
              <StatProofCard
                key={item.title}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
                className={index === 0 ? "sm:col-span-2" : undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
