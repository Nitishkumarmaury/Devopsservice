import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GradientBackground({ className, ...props }: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(53,214,237,0.18),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(139,108,255,0.14),transparent_30%),radial-gradient(circle_at_68%_82%,rgba(255,111,145,0.1),transparent_34%)]",
        className,
      )}
      {...props}
    />
  );
}
