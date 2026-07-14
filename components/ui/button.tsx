import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary:
    "aurora-gradient relative overflow-hidden border border-white/50 bg-[length:160%_160%] text-white shadow-[0_18px_46px_rgba(15,111,125,0.22)] hover:-translate-y-0.5 hover:bg-[position:100%_50%] active:scale-[0.97] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)] before:translate-x-[-120%] before:transition before:duration-500 hover:before:translate-x-[120%] [&_svg:last-child]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
  secondary:
    "border border-[var(--border-soft)] bg-white/84 text-[var(--text-primary)] shadow-[0_16px_45px_rgba(15,34,48,0.08)] hover:-translate-y-0.5 hover:border-rose-300/70 hover:bg-[var(--surface-hover)] active:scale-[0.97]",
  ghost:
    "border border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-rose-50 hover:text-[var(--text-primary)] active:scale-[0.97] [&_svg:last-child]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
};

export function buttonClassName(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 max-w-full min-w-0 items-center justify-center gap-2 whitespace-normal rounded-lg px-4 py-2.5 text-center text-sm font-semibold leading-snug [overflow-wrap:anywhere] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400 disabled:pointer-events-none disabled:opacity-60 sm:whitespace-nowrap [&_svg]:shrink-0",
    variantClass[variant],
    className,
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({ href, variant = "primary", className, children, ...props }: Readonly<ButtonLinkProps>) {
  return (
    <Link href={href} className={buttonClassName(variant, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className, children, ...props }: Readonly<ButtonProps>) {
  return (
    <button className={buttonClassName(variant, className)} {...props}>
      {children}
    </button>
  );
}
