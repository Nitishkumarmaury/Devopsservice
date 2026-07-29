import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-ink-navy bg-ink-navy text-white hover:bg-secondary hover:border-secondary active:scale-[0.97] [&_svg:last-child]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
  secondary:
    "border border-border-strong bg-transparent text-ink hover:bg-canvas-soft hover:border-ink active:scale-[0.97] [&_svg:last-child]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
  ghost:
    "border border-transparent bg-transparent text-ink-secondary hover:text-ink hover:border-border active:scale-[0.97] [&_svg:last-child]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
};

// All buttons: flat (no radius, no shadow), monospace font for labels
export function buttonClassName(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 max-w-full min-w-0 items-center justify-center gap-2",
    "px-4 py-2.5 text-sm font-mono font-semibold tracking-tight",
    "whitespace-normal text-center leading-snug [overflow-wrap:anywhere]",
    "transition-[background-color,border-color,color,transform] duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-3",
    "disabled:pointer-events-none disabled:opacity-50",
    "sm:whitespace-nowrap [&_svg]:shrink-0",
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
