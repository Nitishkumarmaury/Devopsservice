import { cn } from "@/lib/utils";

type AnimatedBeamProps = {
  className?: string;
};

export function AnimatedBeam({ className }: Readonly<AnimatedBeamProps>) {
  return (
    <svg className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} aria-hidden="true" viewBox="0 0 600 240" preserveAspectRatio="none">
      <path
        d="M40 160 C130 40 210 40 300 132 S470 222 560 70"
        fill="none"
        stroke="url(#aurora-beam)"
        strokeDasharray="18 18"
        strokeLinecap="round"
        strokeWidth="2"
        style={{ animation: "beam-pulse 7s linear infinite" }}
      />
      <defs>
        <linearGradient id="aurora-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8B6CFF" stopOpacity="0.1" />
          <stop offset="42%" stopColor="#35D6ED" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B25CFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
