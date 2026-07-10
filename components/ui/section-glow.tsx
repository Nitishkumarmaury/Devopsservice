import { cn } from "@/lib/utils";

type SectionGlowProps = {
  className?: string;
};

export function SectionGlow({ className }: Readonly<SectionGlowProps>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(53,214,237,0.14),transparent_62%)]",
        className,
      )}
    />
  );
}
