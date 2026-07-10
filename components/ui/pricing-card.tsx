import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  title: string;
  service: string;
  target: string;
  hourly: string;
  deliverables: string;
  Icon: ComponentType<LucideProps>;
  featured?: boolean;
};

export function PricingCard({ title, service, target, hourly, deliverables, Icon, featured }: Readonly<PricingCardProps>) {
  return (
    <article
      className={cn(
        "aurora-panel relative flex h-full flex-col overflow-hidden rounded-[22px] p-6 transition duration-200 hover:-translate-y-1",
        featured && "border-rose-300/60 shadow-[0_24px_80px_rgba(14,165,183,0.16),0_20px_70px_rgba(15,34,48,0.1)]",
      )}
    >
      {featured ? (
        <span className="absolute right-5 top-5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          Most suitable
        </span>
      ) : null}
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{service}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] text-[var(--text-primary)]">{title}</h3>
      <p className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">{target}</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Hourly reference: {hourly}</p>
      <p className="mt-5 flex-1 text-sm leading-7 text-[var(--text-secondary)]">{deliverables}</p>
      <ButtonLink href="#contact" variant={featured ? "primary" : "secondary"} className="mt-6 w-full">
        Discuss scope
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </ButtonLink>
    </article>
  );
}
