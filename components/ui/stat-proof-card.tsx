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
        "group min-w-0 rounded-[24px] border border-white/10 bg-white/[0.07] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-1 hover:border-cyan-200/36 hover:bg-white/[0.095] sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100 shadow-[0_0_28px_rgba(53,214,237,0.12)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-7">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/66">{description}</p>
        </div>
      </div>
    </article>
  );
}
