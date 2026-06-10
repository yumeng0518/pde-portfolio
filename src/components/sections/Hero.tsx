"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { HashLink } from "@/components/ui/hash-link";
import { FadeIn } from "@/components/ui/motion";

const capabilities = [
  { icon: "🧠", label: "PRODUCT THINKING", sub: "产品思维" },
  { icon: "✏️", label: "INTERACTION DESIGN", sub: "交互设计" },
  { icon: "</>", label: "AI-ASSISTED DEV", sub: "AI 辅助开发" },
];

export function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left content */}
          <div>
            {/* Badge */}
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-[var(--muted)]">
                <span className="h-px w-5 bg-[var(--accent)]" />
                产品设计工程师 · PDE
                <span className="h-px w-5 bg-[var(--accent)]" />
              </span>
            </FadeIn>

            {/* Main headline */}
            <FadeIn delay={0.06}>
              <h1 className="mt-6 text-[clamp(2.2rem,4.8vw,3.6rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                用户产品洞察与设计巧思
                <br />
                <span className="text-[var(--accent)]">端到端</span>
                交付可上线的产品
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.12}>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--muted)]">
                我的使命在于，在 AI Coding Product 的新范式下，将「洞察 → 设计 → 实现」的
                串行链路能力一体化交付落地的可行闭环。
              </p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <HashLink
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-black/[0.1]"
                >
                  查看作品 →
                </HashLink>
                <HashLink
                  href="#process"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-6 py-3 text-sm font-medium transition-all hover:bg-black/[0.02] hover:shadow-sm"
                >
                  了解流程
                </HashLink>
              </div>
            </FadeIn>

            {/* Capability tags */}
            <FadeIn delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-8">
                {capabilities.map((cap) => (
                  <div key={cap.label} className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/[0.08] text-sm">
                      {cap.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
                        {cap.label}
                      </p>
                      <p className="text-[11px] text-[var(--muted)]">{cap.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right decorative element */}
          <FadeIn delay={0.2} direction="left">
            <div className="relative hidden h-[400px] w-[400px] overflow-visible lg:block">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center translate-y-5"
              >
                <img
                  src="/pde-hero.png"
                  alt="PDE - Product Design Engineer"
                  className="h-[750px] w-[750px] max-w-none object-contain"
                  style={{
                    maskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)",
                  }}
                />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
