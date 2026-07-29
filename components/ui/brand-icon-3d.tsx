import type { CSSProperties } from "react";
import { Cloud, Server, Box, Database, Code2, Terminal, Shield, GitBranch } from "lucide-react";
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
  label: string;
  shortLabel?: string;
  color: string;
  kind?: "cloud" | "server" | "database" | "code" | "terminal" | "security" | "repo";
};

const brandMap: Record<BrandIconKey, BrandConfig> = {
  apache: { label: "Apache", color: "#d22128", kind: "server" },
  aws: { label: "AWS", color: "#ff9900", kind: "cloud" },
  azure: { label: "Azure", color: "#0078d4", kind: "cloud" },
  bitbucket: { label: "Bitbucket", color: "#2684ff", kind: "repo" },
  caddy: { label: "Caddy", color: "#1f88c0", kind: "server" },
  digitalocean: { label: "DigitalOcean", shortLabel: "DO", color: "#0080ff", kind: "cloud" },
  docker: { label: "Docker", color: "#2496ed", kind: "server" },
  git: { label: "Git", color: "#f05032", kind: "repo" },
  github: { label: "GitHub", color: "#24292f", kind: "repo" },
  "github-actions": { label: "GitHub Actions", shortLabel: "Actions", color: "#2088ff", kind: "code" },
  "google-cloud": { label: "Google Cloud", shortLabel: "GCP", color: "#4285f4", kind: "cloud" },
  grafana: { label: "Grafana", color: "#f46800", kind: "terminal" },
  kubernetes: { label: "Kubernetes", shortLabel: "K8s", color: "#326ce5", kind: "server" },
  linux: { label: "Linux", color: "#f7c843", kind: "terminal" },
  mongodb: { label: "MongoDB", color: "#47a248", kind: "database" },
  mysql: { label: "MySQL", color: "#4479a1", kind: "database" },
  nestjs: { label: "NestJS", color: "#e0234e", kind: "code" },
  nextjs: { label: "Next.js", color: "#111111", kind: "code" },
  nginx: { label: "Nginx", color: "#009639", kind: "server" },
  nodejs: { label: "Node.js", color: "#5fa04e", kind: "code" },
  pm2: { label: "PM2", color: "#2b037a", kind: "terminal" },
  prometheus: { label: "Prometheus", color: "#e6522c", kind: "terminal" },
  react: { label: "React", color: "#149eca", kind: "code" },
  redis: { label: "Redis", color: "#ff4438", kind: "database" },
  terraform: { label: "Terraform", color: "#844fba", kind: "code" },
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

function getIcon(kind?: string) {
  switch (kind) {
    case "cloud": return Cloud;
    case "server": return Server;
    case "database": return Database;
    case "repo": return GitBranch;
    case "code": return Code2;
    case "terminal": return Terminal;
    case "security": return Shield;
    default: return Box;
  }
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
  const displayLabel = label ?? brand?.shortLabel ?? brand?.label ?? name;
  const color = brand?.color ?? "#0ea5b7";
  const mergedStyle = { "--brand-color": color, ...style } as CSSProperties;
  const hasPositionClass =
    typeof className === "string" && /\b(?:absolute|fixed|relative|sticky)\b/.test(className);

  const Icon = getIcon(brand?.kind);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-border bg-canvas px-3 py-2 font-mono text-xs font-semibold text-ink transition",
        !hasPositionClass && "relative",
        compact && "gap-1.5 px-2.5 py-1.5 text-xs",
        iconOnly && "h-10 w-10 justify-center gap-0 p-0",
        className,
      )}
      style={mergedStyle}
      aria-label={iconOnly ? brand?.label ?? name : undefined}
    >
      <span 
        className={cn("flex items-center justify-center")} 
        style={{ color: "var(--brand-color)" }}
      >
        <Icon className={cn("h-4 w-4", compact && "h-3.5 w-3.5", iconOnly && "h-4 w-4")} aria-hidden="true" />
      </span>
      {iconOnly ? null : <span>{displayLabel}</span>}
    </span>
  );
}
