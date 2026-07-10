"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";

type NumberTickerProps = {
  value: string;
  numericValue: number | null;
  suffix?: string;
};

export function NumberTicker({ value, numericValue, suffix = "+" }: Readonly<NumberTickerProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const formatter = useMemo(() => new Intl.NumberFormat("en", { maximumFractionDigits: 0 }), []);

  useEffect(() => {
    if (!isInView || numericValue === null) return;

    const duration = 900;
    const started = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min(1, (time - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(numericValue * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericValue]);

  if (numericValue === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {formatter.format(current)}
      {suffix}
    </span>
  );
}
