import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  visual: string;
  details: readonly string[];
  Icon: ComponentType<LucideProps>;
  accent: "rose" | "cyan" | "blue" | "violet" | "emerald";
  children?: ReactNode;
};

const accentClass = {
  rose: "from-rose-300/[0.24] to-fuchsia-300/10 border-rose-300/40 text-rose-700",
  cyan: "from-cyan-300/[0.18] to-blue-300/10 border-cyan-300/25 text-cyan-100",
  blue: "from-blue-300/[0.18] to-cyan-300/10 border-blue-300/25 text-blue-100",
  violet: "from-violet-300/[0.18] to-purple-300/10 border-violet-300/25 text-violet-100",
  emerald: "from-emerald-300/[0.16] to-cyan-300/10 border-emerald-300/25 text-emerald-100",
};

export function ServiceCard({ title, description, visual, details, Icon, accent, children }: ServiceCardProps) {
  return (
    <article className="aurora-panel group relative h-full overflow-hidden rounded-[22px] p-6 transition duration-200 hover:-translate-y-1 hover:border-rose-300/50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition group-hover:scale-[1.04]", accentClass[accent])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      <div className="mt-6 rounded-2xl border border-rose-100 bg-white/62 p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">system view</p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{visual}</p>
      </div>
      <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--text-muted)]">
        {details.map((detail) => (
          <li key={detail} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" aria-hidden="true" />
            {detail}
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}
