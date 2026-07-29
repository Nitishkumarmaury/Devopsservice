"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  delay?: number;
  from?: Direction;
  distance?: number;
};

function getInitial(from: Direction, distance: number) {
  switch (from) {
    case "left":  return { opacity: 0, x: -distance, y: 0 };
    case "right": return { opacity: 0, x:  distance, y: 0 };
    case "down":  return { opacity: 0, y:  distance, x: 0 };
    case "up":
    default:      return { opacity: 0, y: distance, x: 0 };
  }
}

export function StaggerReveal({
  children,
  className,
  itemClassName,
  stagger = 0.08,
  delay = 0,
  from = "up",
  distance = 24,
}: Readonly<StaggerRevealProps>) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className={cn(className)}>
      {items.map((child, index) => (
        <motion.div
          key={index}
          className={cn("min-w-0", itemClassName)}
          initial={reduceMotion ? false : getInitial(from, distance)}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
          transition={{
            duration: 0.7,
            ease: [0.61, 1, 0.88, 1],
            delay: delay + index * stagger,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
