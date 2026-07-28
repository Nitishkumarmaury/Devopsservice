import { FileCode2, GitBranch, LayoutDashboard, ServerCog, TerminalSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StatProofCard } from "@/components/ui/stat-proof-card";

const proofItems = [
  {
    title: "Production Architecture",
    description: "Reverse proxy, application runtime, TLS, process management, monitoring routes, and handover notes.",
    Icon: ServerCog,
  },
  {
    title: "CI/CD Pipeline",
    description: "Build, deploy, validation, secret handling, and rollback notes for repeatable releases.",
    Icon: GitBranch,
  },
  {
    title: "Monitoring Stack",
    description: "Prometheus, Grafana, exporters, uptime checks, resource signals, and alert routes.",
    Icon: LayoutDashboard,
  },
  {
    title: "Infrastructure as Code",
    description: "Repeatable infrastructure patterns, provisioning notes, validation steps, and drift reduction.",
    Icon: FileCode2,
  },
  {
    title: "Production Troubleshooting",
    description: "Server health, logs, DNS, web-server behavior, resource pressure, and reversible recovery steps.",
    Icon: TerminalSquare,
  },
] as const;

export function ProofStrip() {
  return (
    <section className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_100%)] py-16 text-white sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(77,163,255,0.14),transparent_32%),radial-gradient(circle_at_86%_24%,rgba(125,211,252,0.08),transparent_30%),radial-gradient(circle_at_64%_90%,rgba(255,138,122,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-20" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader eyebrow="Engineering Evidence" title="Sanitized artifacts buyers can reason about." dark>
            Trust comes from concrete delivery evidence: pipelines, monitoring topology, production architecture,
            validation notes, and handover records without fake metrics or exposed customer data.
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
