"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";

const steps = [
  { num: "01", title: "发现与定义", desc: "洞察用户与业务需求" },
  { num: "02", title: "探索与原型", desc: "验证想法与方案" },
  { num: "03", title: "系统化设计", desc: "交互与视觉设计" },
  { num: "04", title: "构建与迭代", desc: "开发与集成" },
  { num: "05", title: "上线与优化", desc: "持续迭代与优化" },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[var(--accent)]">•</span>
            <h2 className="text-2xl font-bold tracking-[-0.02em]">交付流程</h2>
          </div>
        </FadeIn>

        {/* Horizontal step bar */}
        <FadeIn delay={0.1}>
          <div className="relative mt-12">
            {/* Connector line */}
            <div className="absolute left-0 right-0 top-5 z-0 mx-auto hidden h-[2px] max-w-[calc(100%-80px)] bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/40 to-[var(--accent)]/20 sm:block" />

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 sm:gap-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--accent)]/30 bg-white text-xs font-bold text-[var(--accent)] shadow-[0_2px_8px_rgba(0,120,212,0.12)]">
                    {step.num}
                  </div>
                  {/* Title */}
                  <p className="mt-3 text-sm font-semibold">{step.title}</p>
                  {/* Desc */}
                  <p className="mt-1 text-[11px] text-[var(--muted)]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
