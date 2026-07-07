import { Marquee } from "@/components/ui/marquee";
import { technologyStrip } from "@/data/technologies";

export function TechnologyStrip() {
  return (
    <section aria-label="Technology references" className="relative z-10 border-y border-rose-100 bg-white/76 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <p className="sr-only">AWS, DigitalOcean, Google Cloud, Azure, Docker, Kubernetes, Terraform, GitHub, Bitbucket, Linux, Next.js, NestJS, Prometheus, Grafana, Apache, Nginx, Caddy, and PM2.</p>
      <Marquee items={technologyStrip} />
    </section>
  );
}
