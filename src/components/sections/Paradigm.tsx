"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/content/site";
import { GlassPanel } from "@/components/ui/glass";
import { FadeIn } from "@/components/ui/motion";

const serviceSteps = [
  {
    num: "01",
    title: "发现与定义",
    desc: "洞察用户与业务需求，明确问题与价值点，输出 PRD / MVP / 用户旅程",
  },
  {
    num: "02",
    title: "探索与原型",
    desc: "多方案探索与评估，构建低保真原型验证核心假设，形成可落地的设计方向",
  },
  {
    num: "03",
    title: "系统化设计",
    desc: "构建信息架构与交互流程，完成高保真设计与体验规范，输出设计系统",
  },
  {
    num: "04",
    title: "构建与迭代",
    desc: "基于 AI Coding Product 的新范式进行开发与集成，快速迭代并持续优化",
  },
];

function CapabilityRow({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="group border-b border-black/[0.05] py-6 last:border-0"
    >
      <div className="flex items-start gap-5">
        <span className="text-[13px] font-bold tabular-nums text-[var(--accent)]">
          {num}
        </span>
        <div>
          <h4 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h4>
          <p className="mt-2 text-[13px] leading-[1.7] text-[var(--muted)]">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CapabilityColumn({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
      <div className="mt-6 space-y-0">{children}</div>
    </div>
  );
}

export function ParadigmSection() {
  return (
    <section id="services" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[var(--accent)]">•</span>
            <h2 className="text-2xl font-bold tracking-[-0.02em]">我能为你做什么</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <GlassPanel depth="lg" className="relative mt-12 overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,120,212,0.08)_0%,transparent_70%)] blur-3xl"
            />

            <div className="relative">
              <h3 className="text-center text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.35] tracking-[-0.03em]">
                从职能串行到端到端闭环
                <br />
                <span className="text-[var(--accent)]">一个人完成全链路交付</span>
              </h3>
              <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.75] text-[var(--muted)]">
                以产品思维为驱动，结合设计与 AI 辅助开发能力，独立完成从洞察到上线的全链路交付
              </p>

              <div className="mt-12 grid gap-12 border-t border-black/[0.06] pt-12 lg:grid-cols-2 lg:gap-0">
                <CapabilityColumn label="Skills" className="lg:pr-12">
                  {skillGroups.map((group, i) => (
                    <CapabilityRow
                      key={group.category}
                      num={String(i + 1).padStart(2, "0")}
                      title={group.category}
                      desc={group.skills.join(" · ")}
                    />
                  ))}
                </CapabilityColumn>

                <CapabilityColumn label="Delivery" className="lg:border-l lg:border-black/[0.06] lg:pl-12">
                  {serviceSteps.map((step) => (
                    <CapabilityRow
                      key={step.num}
                      num={step.num}
                      title={step.title}
                      desc={step.desc}
                    />
                  ))}
                </CapabilityColumn>
              </div>
            </div>
          </GlassPanel>
        </FadeIn>
      </div>
    </section>
  );
}
