import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type StatProofCardProps = {
  title: string;
  description: string;
  Icon: ComponentType<LucideProps>;
  className?: string;
};

export function StatProofCard({ title, description, Icon, className }: Readonly<StatProofCardProps>) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/8 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-secondary/40 text-secondary">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-mono text-sm font-semibold leading-6">{title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-white/60">{description}</p>
        </div>
      </div>
    </article>
  );
}
