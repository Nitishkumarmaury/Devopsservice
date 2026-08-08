import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  className?: string;
};

export function AuroraBackground({ className }: Readonly<AuroraBackgroundProps>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "aurora-motion pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(79,140,255,0.2),transparent_32%),radial-gradient(circle_at_76%_18%,rgba(139,108,255,0.16),transparent_30%),radial-gradient(circle_at_64%_78%,rgba(53,214,237,0.13),transparent_34%)]",
        className,
      )}
    />
  );
}
