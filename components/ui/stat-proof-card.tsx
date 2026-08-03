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
        "group min-w-0 rounded-[18px] border border-[#d6ebff]/10 bg-[#0d2338]/78 p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-1 hover:border-[#4da3ff]/28 hover:bg-[#12304b] sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#4da3ff]/20 bg-[#4da3ff]/10 text-[#4da3ff] shadow-[0_0_28px_rgba(77,163,255,0.12)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-7">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#c7d5e6]">{description}</p>
        </div>
      </div>
    </article>
  );
}
