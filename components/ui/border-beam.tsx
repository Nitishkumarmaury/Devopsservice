import { cn } from "@/lib/utils";

type BorderBeamProps = {
  className?: string;
};

export function BorderBeam({ className }: Readonly<BorderBeamProps>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        "before:absolute before:left-[-35%] before:top-0 before:h-px before:w-1/3 before:bg-gradient-to-r before:from-transparent before:via-cyan-200 before:to-transparent before:content-['']",
        "after:absolute after:bottom-0 after:right-[-35%] after:h-px after:w-1/3 after:bg-gradient-to-r after:from-transparent after:via-sky-300 after:to-transparent after:content-['']",
        "before:animate-border-beam after:animate-border-beam-reverse",
        className,
      )}
    />
  );
}
