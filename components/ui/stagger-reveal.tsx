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

function getRevealKey(child: ReactNode) {
  if (typeof child === "string" || typeof child === "number") {
    return String(child);
  }

  if (child && typeof child === "object" && "key" in child && child.key != null) {
    return String(child.key);
  }

  return "reveal-item";
}

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
          key={getRevealKey(child)}
          className={cn("min-w-0", itemClassName)}
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.16, margin: "0px 0px -88px 0px" }}
          transition={{
            duration: 0.58,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * stagger,
          }}
          style={reduceMotion ? undefined : { transformOrigin: "center bottom" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
