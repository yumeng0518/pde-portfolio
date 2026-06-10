"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 24,
  ...props
}: FadeInProps) {
  const offset = {
    up: { y: amount },
    down: { y: -amount },
    left: { x: amount },
    right: { x: -amount },
    none: {},
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: "0.5em", filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
