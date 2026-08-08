"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Lightfall = dynamic(() => import("./lightfall"), { ssr: false });

export default function LightfallLoader(props: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia?.("(min-width: 1024px)");
    if (mq && !mq.matches) return; // only on large screens

    if (!ref.current) {
      setShow(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "160px" },
    );

    obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={props.className} style={props.style}>
      {show ? <Lightfall {...props} /> : <div className="lightfall-fallback" aria-hidden="true" />}
    </div>
  );
}
