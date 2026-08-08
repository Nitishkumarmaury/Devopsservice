"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "aside" | "li";
};

export function FadeIn({ children, className, delay = 0, as = "div" }: Readonly<FadeInProps>) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
