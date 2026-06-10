"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-[10%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(0,120,212,0.18)_0%,transparent_70%)] blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-5%] top-[20%] h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(135,100,184,0.14)_0%,transparent_70%)] blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 40, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-5%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(0,183,195,0.12)_0%,transparent_70%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--bg-base)_0%,transparent_30%,transparent_70%,var(--bg-base)_100%)]" />
    </div>
  );
}

export function GridOverlay() {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 opacity-[0.35]",
        "bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]",
        "bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
      )}
    />
  );
}
