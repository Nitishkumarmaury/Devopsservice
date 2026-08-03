import {
  Activity,
  Boxes,
  Cloud,
  Container as ContainerIcon,
  Gauge,
  GitBranch,
  LockKeyhole,
  ServerCog,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/data/services";

const icons = {
  cloud: Cloud,
  pipeline: GitBranch,
  container: ContainerIcon,
  kubernetes: Boxes,
  monitoring: Activity,
  security: LockKeyhole,
  performance: Gauge,
  migration: ServerCog,
};

const accents = ["rose", "blue", "violet", "emerald"] as const;

export function ServicesSection() {
  return (
    <section id="services" className="aurora-section border-y border-rose-100 bg-white/64 section-rhythm">
      <SectionGlow />
      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading
            title="Focused DevOps services for production teams."
            eyebrow="Services"
          >
            <p>
              A compact service set for teams that need dependable deployment, monitoring, security, and cloud operations.
            </p>
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <FadeIn key={service.title} delay={index * 0.03} as="article">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  visual={service.visual}
                  details={service.details}
                  Icon={Icon}
                  accent={accents[index % accents.length]}
                />
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
