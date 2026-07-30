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
import type { Service } from "@/data/services";

const iconMap = {
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

export function ServiceIcon({ icon }: Readonly<{ icon: Service["icon"] }>) {
  const Icon = iconMap[icon];
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}
