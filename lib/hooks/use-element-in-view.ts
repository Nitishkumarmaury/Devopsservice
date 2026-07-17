"use client";

import { useEffect, useRef, useState } from "react";

type InViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useElementInView<T extends Element>({ rootMargin = "160px", threshold = 0 }: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView] as const;
}
