import { Marquee } from "@/components/ui/marquee";
import { technologyStrip } from "@/data/technologies";

export function TechnologyStrip() {
  return (
    <section aria-label="Technology references" className="relative z-10 border-y border-[#d6ebff]/10 bg-[#081a2e]/88 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(77,163,255,0.06),transparent_22%,transparent_78%,rgba(125,211,252,0.05))]" />
      <p className="sr-only">AWS, DigitalOcean, Google Cloud, Azure, Docker, Kubernetes, Terraform, Git, GitHub, GitHub Actions, Bitbucket, Linux, Next.js, React, Node.js, NestJS, MongoDB, MySQL, Redis, Prometheus, Grafana, Apache, Nginx, Caddy, and PM2.</p>
      <div className="relative">
        <Marquee items={technologyStrip} />
      </div>
    </section>
  );
}
