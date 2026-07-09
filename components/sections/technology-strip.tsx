import { Marquee } from "@/components/ui/marquee";
import { technologyStrip } from "@/data/technologies";

export function TechnologyStrip() {
  return (
    <section aria-label="Technology references" className="relative z-10 border-y border-rose-100 bg-white/80 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(14,165,183,0.1),transparent_26%),radial-gradient(circle_at_88%_35%,rgba(213,166,69,0.08),transparent_28%)]" />
      <p className="sr-only">AWS, DigitalOcean, Google Cloud, Azure, Docker, Kubernetes, Terraform, Git, GitHub, GitHub Actions, Bitbucket, Linux, Next.js, React, Node.js, NestJS, MongoDB, MySQL, Redis, Prometheus, Grafana, Apache, Nginx, Caddy, and PM2.</p>
      <div className="relative">
        <Marquee items={technologyStrip} />
      </div>
    </section>
  );
}
