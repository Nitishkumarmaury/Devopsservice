import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingStatusCardProps = {
  title: string;
  detail?: string;
  Icon: ComponentType<LucideProps>;
  className?: string;
};

export function FloatingStatusCard({ title, detail, Icon, className }: Readonly<FloatingStatusCardProps>) {
  return (
    <div
      className={cn(
        "hero-floating-card inline-flex min-w-0 items-center gap-3 rounded-2xl border border-white/14 bg-white/[0.09] px-4 py-3 text-white shadow-[0_20px_64px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/24 bg-cyan-200/10 text-cyan-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5">{title}</span>
        {detail ? <span className="mt-0.5 block text-xs leading-5 text-white/58">{detail}</span> : null}
      </span>
    </div>
  );
}
