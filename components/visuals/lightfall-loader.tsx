"use client";

import dynamic from "next/dynamic";
import { CloudCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LightfallProps } from "./lightfall";

const Lightfall = dynamic(() => import("./lightfall"), { ssr: false });

const AUTO_HIDE_MS = 5000;

function isDesktopViewport() {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia?.("(min-width: 1024px)");
  return mq?.matches ?? true;
}

export default function LightfallLoader(props: LightfallProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [expired, setExpired] = useState(false);
  const [desktop] = useState(isDesktopViewport);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = ref.current;
    if (!target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "160px" },
    );

    obs.observe(target);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setExpired(true), AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [inView]);

  const show = desktop && inView && !expired;

  if (!show) {
    return (
      <div aria-hidden="true" className="pointer-events-none flex h-full w-full items-center justify-center opacity-50">
        <CloudCog className="h-10 w-10 text-[#4da3ff]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div ref={ref} className={props.className} style={props.style}>
      <Lightfall {...props} />
    </div>
  );
}
