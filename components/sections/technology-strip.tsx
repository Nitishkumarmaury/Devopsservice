import { Marquee } from "@/components/ui/marquee";
import { technologyStrip } from "@/data/technologies";

export function TechnologyStrip() {
  return (
    <section aria-label="Technology references" className="relative z-10 border-b border-border bg-canvas-surface py-5">
      <p className="sr-only">
        AWS, DigitalOcean, Google Cloud, Azure, Docker, Kubernetes, Terraform, Git, GitHub, GitHub Actions, Bitbucket,
        Linux, Next.js, React, Node.js, NestJS, MongoDB, MySQL, Redis, Prometheus, Grafana, Apache, Nginx, Caddy, and PM2.
      </p>
      <div className="relative overflow-hidden">
        <Marquee items={technologyStrip} />
      </div>
    </section>
  );
}
