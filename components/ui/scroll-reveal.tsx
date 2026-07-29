"use client";

import type { ReactNode, ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element enters from. Defaults to "up". */
  from?: Direction;
  /** Override the initial transform distance in pixels. Defaults to 36. */
  distance?: number;
  as?: "div" | "section" | "article" | "aside" | "li" | "header" | "footer";
};

function getInitial(from: Direction, distance: number) {
  switch (from) {
    case "left":  return { opacity: 0, x: -distance, y: 0 };
    case "right": return { opacity: 0, x:  distance, y: 0 };
    case "down":  return { opacity: 0, y:  distance, x: 0 };
    case "up":
    default:      return { opacity: 0, y: -distance < 0 ? distance : -distance, x: 0 };
  }
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  from = "up",
  distance = 36,
  as = "div",
  ...props
}: Readonly<ScrollRevealProps>) {
  const Component = motion[as] as ElementType;
  const reduceMotion = useReducedMotion();

  return (
    <Component
      initial={reduceMotion ? false : getInitial(from, distance)}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease: [0.61, 1, 0.88, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}
