import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export function GradientText({ children, className }: Readonly<GradientTextProps>) {
  return <span className={cn("aurora-text", className)}>{children}</span>;
}
