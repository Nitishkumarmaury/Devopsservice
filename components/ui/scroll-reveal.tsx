"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function ScrollReveal({ children, className, delay = 0, as = "div" }: Readonly<ScrollRevealProps>) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-72px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
