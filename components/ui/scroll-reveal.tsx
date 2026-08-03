"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "aside" | "li";
};

export function ScrollReveal({ children, className, delay = 0, as = "div" }: Readonly<ScrollRevealProps>) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -88px 0px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay }}
      style={reduceMotion ? undefined : { transformOrigin: "center bottom" }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
