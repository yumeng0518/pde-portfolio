"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { HashLink } from "@/components/ui/hash-link";
import { FadeIn } from "@/components/ui/motion";

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-28 px-4 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            <span className="h-px w-6 bg-[var(--accent)]" />
            联系我
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            期待与你协作共创
          </h2>
          <p className="mt-3 mx-auto max-w-md text-sm leading-relaxed text-[var(--muted)]">
            如果你正在寻找可落地的产品设计、设计系统与 AI 辅助交付的合作伙伴，欢迎联系我。
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,120,212,0.3)] transition-shadow hover:shadow-[0_6px_24px_rgba(0,120,212,0.4)]"
            >
              发送消息
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <HashLink
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-6 py-3 text-sm font-medium transition-all hover:border-[var(--accent)]/30 hover:shadow-[0_4px_16px_rgba(0,120,212,0.1)]"
              >
                作品集
              </HashLink>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
