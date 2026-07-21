"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  delay?: number;
};

export function StaggerReveal({
  children,
  className,
  itemClassName,
  stagger = 0.08,
  delay = 0,
}: Readonly<StaggerRevealProps>) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className={cn(className)}>
      {items.map((child, index) => (
        <motion.div
          key={index}
          className={cn("min-w-0", itemClassName)}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * stagger,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
