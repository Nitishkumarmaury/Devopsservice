import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiApache,
  SiBitbucket,
  SiCaddy,
  SiDigitalocean,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPm2,
  SiPrometheus,
  SiReact,
  SiRedis,
  SiTerraform,
} from "react-icons/si";
import { Cloud, Server } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandIconKey =
  | "apache"
  | "aws"
  | "azure"
  | "bitbucket"
  | "caddy"
  | "digitalocean"
  | "docker"
  | "git"
  | "github"
  | "github-actions"
  | "google-cloud"
  | "grafana"
  | "kubernetes"
  | "linux"
  | "mongodb"
  | "mysql"
  | "nestjs"
  | "nextjs"
  | "nginx"
  | "nodejs"
  | "pm2"
  | "prometheus"
  | "react"
  | "redis"
  | "terraform";

type BrandConfig = {
  icon?: IconType;
  label: string;
  shortLabel?: string;
  color: string;
  glow: string;
  kind?: "cloud" | "server";
};

const brandMap: Record<BrandIconKey, BrandConfig> = {
  apache: { icon: SiApache, label: "Apache", color: "#d22128", glow: "rgba(210,33,40,0.2)" },
  aws: { label: "AWS", color: "#ff9900", glow: "rgba(255,153,0,0.24)", kind: "cloud" },
  azure: { label: "Azure", color: "#0078d4", glow: "rgba(0,120,212,0.22)", kind: "cloud" },
  bitbucket: { icon: SiBitbucket, label: "Bitbucket", color: "#2684ff", glow: "rgba(38,132,255,0.2)" },
  caddy: { icon: SiCaddy, label: "Caddy", color: "#1f88c0", glow: "rgba(31,136,192,0.2)" },
  digitalocean: { icon: SiDigitalocean, label: "DigitalOcean", shortLabel: "DO", color: "#0080ff", glow: "rgba(0,128,255,0.22)" },
  docker: { icon: SiDocker, label: "Docker", color: "#2496ed", glow: "rgba(36,150,237,0.22)" },
  git: { icon: SiGit, label: "Git", color: "#f05032", glow: "rgba(240,80,50,0.2)" },
  github: { icon: SiGithub, label: "GitHub", color: "#24292f", glow: "rgba(36,41,47,0.18)" },
  "github-actions": { icon: SiGithubactions, label: "GitHub Actions", shortLabel: "Actions", color: "#2088ff", glow: "rgba(32,136,255,0.22)" },
  "google-cloud": { icon: SiGooglecloud, label: "Google Cloud", shortLabel: "GCP", color: "#4285f4", glow: "rgba(66,133,244,0.22)" },
  grafana: { icon: SiGrafana, label: "Grafana", color: "#f46800", glow: "rgba(244,104,0,0.2)" },
  kubernetes: { icon: SiKubernetes, label: "Kubernetes", shortLabel: "K8s", color: "#326ce5", glow: "rgba(50,108,229,0.22)" },
  linux: { icon: SiLinux, label: "Linux", color: "#f7c843", glow: "rgba(247,200,67,0.22)" },
  mongodb: { icon: SiMongodb, label: "MongoDB", color: "#47a248", glow: "rgba(71,162,72,0.2)" },
  mysql: { icon: SiMysql, label: "MySQL", color: "#4479a1", glow: "rgba(68,121,161,0.2)" },
  nestjs: { icon: SiNestjs, label: "NestJS", color: "#e0234e", glow: "rgba(224,35,78,0.2)" },
  nextjs: { icon: SiNextdotjs, label: "Next.js", color: "#111111", glow: "rgba(17,17,17,0.16)" },
  nginx: { icon: SiNginx, label: "Nginx", color: "#009639", glow: "rgba(0,150,57,0.2)" },
  nodejs: { icon: SiNodedotjs, label: "Node.js", color: "#5fa04e", glow: "rgba(95,160,78,0.2)" },
  pm2: { icon: SiPm2, label: "PM2", color: "#2b037a", glow: "rgba(43,3,122,0.2)" },
  prometheus: { icon: SiPrometheus, label: "Prometheus", color: "#e6522c", glow: "rgba(230,82,44,0.2)" },
  react: { icon: SiReact, label: "React", color: "#149eca", glow: "rgba(20,158,202,0.2)" },
  redis: { icon: SiRedis, label: "Redis", color: "#ff4438", glow: "rgba(255,68,56,0.2)" },
  terraform: { icon: SiTerraform, label: "Terraform", color: "#844fba", glow: "rgba(132,79,186,0.2)" },
};

const nameAliases: Record<string, BrandIconKey> = {
  apache: "apache",
  aws: "aws",
  azure: "azure",
  bitbucket: "bitbucket",
  "bitbucket pipelines": "bitbucket",
  caddy: "caddy",
  digitalocean: "digitalocean",
  docker: "docker",
  "docker compose": "docker",
  git: "git",
  github: "github",
  "github actions": "github-actions",
  "google cloud": "google-cloud",
  grafana: "grafana",
  kubernetes: "kubernetes",
  linux: "linux",
  mongodb: "mongodb",
  mysql: "mysql",
  "nest.js": "nestjs",
  nestjs: "nestjs",
  "next.js": "nextjs",
  nextjs: "nextjs",
  nginx: "nginx",
  "node.js": "nodejs",
  nodejs: "nodejs",
  pm2: "pm2",
  prometheus: "prometheus",
  react: "react",
  redis: "redis",
  terraform: "terraform",
};

export function getBrandIconKey(name: string) {
  return nameAliases[name.trim().toLowerCase()];
}

export function BrandIcon3D({
  name,
  className,
  compact = false,
  label,
  style,
  iconOnly = false,
}: {
  name: string;
  className?: string;
  compact?: boolean;
  label?: string;
  style?: CSSProperties;
  iconOnly?: boolean;
}) {
  const key = getBrandIconKey(name);
  const brand = key ? brandMap[key] : undefined;
  const Icon = brand?.icon;
  const displayLabel = label ?? brand?.shortLabel ?? brand?.label ?? name;
  const color = brand?.color ?? "#4da3ff";
  const glow = brand?.glow ?? "rgba(15,127,145,0.18)";
  const mergedStyle = { "--brand-color": color, "--brand-glow": glow, ...style } as CSSProperties;
  const hasPositionClass =
    typeof className === "string" && /\b(?:absolute|fixed|relative|sticky)\b/.test(className);

  return (
    <span
      className={cn(
        "brand-icon-3d inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/92 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-[0_14px_34px_rgba(15,34,48,0.1)]",
        !hasPositionClass && "relative",
        compact && "gap-1.5 rounded-xl px-2.5 py-1.5 text-xs",
        iconOnly && "brand-icon-3d--icon-only h-12 w-12 justify-center gap-0 rounded-full p-0",
        className,
      )}
      style={mergedStyle}
      aria-label={iconOnly ? brand?.label ?? name : undefined}
    >
      <span className={cn("brand-icon-3d__mark", compact && !iconOnly && "h-7 w-7 rounded-lg", iconOnly && "h-full w-full rounded-full")}>
        {Icon ? (
          <Icon className={cn("h-5 w-5", compact && "h-4 w-4", iconOnly && "h-5 w-5")} aria-hidden="true" />
        ) : brand?.kind === "server" ? (
          <Server className={cn("h-5 w-5", compact && "h-4 w-4", iconOnly && "h-5 w-5")} aria-hidden="true" />
        ) : (
          <Cloud className={cn("h-5 w-5", compact && "h-4 w-4", iconOnly && "h-5 w-5")} aria-hidden="true" />
        )}
      </span>
      {iconOnly ? null : <span>{displayLabel}</span>}
    </span>
  );
}
