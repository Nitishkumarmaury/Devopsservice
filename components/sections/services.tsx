import {
  Activity,
  Boxes,
  Cloud,
  Container as ContainerIcon,
  Gauge,
  GitBranch,
  LockKeyhole,
  ServerCog,
  Code2,
  Monitor,
  Layers,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceCard } from "@/components/ui/service-card";
import type { Service } from "@/data/services";

const icons = {
  cloud: Cloud,
  pipeline: GitBranch,
  container: ContainerIcon,
  kubernetes: Boxes,
  monitoring: Activity,
  security: LockKeyhole,
  performance: Gauge,
  migration: ServerCog,
  code: Code2,
  desktop: Monitor,
  layers: Layers,
};

const accents = ["rose", "blue", "violet", "emerald"] as const;

export function AnimatedServiceGrid({ services: items }: { services: readonly Service[] }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((service, index) => {
        const Icon = icons[service.icon as keyof typeof icons];
        return (
          <FadeIn key={service.title} delay={index * 0.03} as="article" className="h-full">
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
  );
}
