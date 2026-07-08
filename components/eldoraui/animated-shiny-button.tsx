"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimatedShinyButtonProps = {
  children: ReactNode;
  className?: string;
  url?: string;
  showArrow?: boolean;
  tone?: "primary" | "soft";
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export function AnimatedShinyButton({
  children,
  className,
  url,
  showArrow = true,
  tone = "primary",
  external = false,
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: AnimatedShinyButtonProps) {
  const content = (
    <span className="animated-shiny-button__content">
      {children}
      {showArrow ? <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5" aria-hidden="true" /> : null}
    </span>
  );

  const buttonClassName = cn("animated-shiny-button group", tone === "soft" && "animated-shiny-button--soft", className);

  if (url) {
    if (external || url.startsWith("http") || url.startsWith("mailto:")) {
      return (
        <a href={url} className={buttonClassName} onClick={onClick} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }

    return (
      <Link href={url} className={buttonClassName} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
