"use client";

import { motion } from "framer-motion";
import type { Project, MediaItem } from "@/content/projects";
import { GlassPanel } from "@/components/ui/glass";
import { FadeIn } from "@/components/ui/motion";

function SectionTitle({
  label,
  color,
}: {
  label: string;
  color?: string;
}) {
  return (
    <p
      className="text-[11px] font-medium uppercase tracking-[0.14em]"
      style={{ color: color || "var(--accent)" }}
    >
      {label}
    </p>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
      {text}
    </p>
  );
}

function BulletList({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm leading-relaxed text-[var(--muted)]"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** 媒体渲染组件 */
function MediaGallery({
  items,
  accent,
}: {
  items: MediaItem[];
  accent: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6 space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-[var(--glass-border-sm)]"
        >
          {item.type === "video" ? (
            <video
              src={item.url}
              controls
              preload="metadata"
              className="w-full aspect-video bg-black/5"
              playsInline
            />
          ) : (
            <img
              src={item.url}
              alt={item.caption || "项目图片"}
              loading="lazy"
              className="w-full object-cover"
            />
          )}
          {item.caption && (
            <div className="px-4 py-3 bg-[var(--glass-bg-sm)]">
              <p className="text-xs text-[var(--muted)]">
                <span
                  className="inline-block mr-2 h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
                {item.caption}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** 按 section 过滤媒体资源 */
function getMediaBySection(media: MediaItem[] | undefined, section: MediaItem["section"]): MediaItem[] {
  if (!media) return [];
  return media.filter((m) => m.section === section);
}

export function WorkDetailContent({ project }: { project: Project }) {
  const heroMedia = getMediaBySection(project.media, "hero");
  const backgroundMedia = getMediaBySection(project.media, "background");
  const requirementsMedia = getMediaBySection(project.media, "requirements");
  const designMedia = getMediaBySection(project.media, "design");
  const deliveryMedia = getMediaBySection(project.media, "delivery");
  const retrospectiveMedia = getMediaBySection(project.media, "retrospective");

  return (
    <>
      {/* Hero Visual */}
      <FadeIn delay={0.1} className="mt-10">
        {heroMedia.length > 0 ? (
          <div className="space-y-4">
            {heroMedia.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-3xl border border-[var(--glass-border-md)]"
              >
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    controls
                    preload="metadata"
                    className="w-full aspect-video bg-black/5"
                    playsInline
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption || project.title}
                    className="w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[var(--glass-border-md)]"
            style={{
              background: `linear-gradient(135deg, ${project.accent}33, ${project.accent}08)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${project.accent}66, transparent 60%)`,
              }}
            />
          </div>
        )}
      </FadeIn>

      {/* Summary */}
      <FadeIn delay={0.12} className="mt-10">
        <GlassPanel depth="md" className="p-6 sm:p-8">
          <SectionTitle label="项目概述" />
          <TextBlock text={project.summary} />
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: `${project.accent}15`,
                  color: project.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </GlassPanel>
      </FadeIn>

      {/* 一、项目背景 */}
      <FadeIn delay={0.14} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">一、项目背景</h2>
          <p className="text-xs text-[var(--muted)]">
            业务目标 · 用户痛点 · 市场现状 · 竞品分析
          </p>
        </div>
        <div className="grid gap-4">
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="业务目标" color="#10B981" />
            <TextBlock text={project.background.businessGoal} />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="用户痛点" color="#F59E0B" />
            <TextBlock text={project.background.userPain} />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="市场现状" color="#6366F1" />
            <TextBlock text={project.background.marketStatus} />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="竞品分析" color="#EC4899" />
            <TextBlock text={project.background.competitorAnalysis} />
          </GlassPanel>
        </div>
        {backgroundMedia.length > 0 && (
          <MediaGallery items={backgroundMedia} accent={project.accent} />
        )}
      </FadeIn>

      {/* 二、需求拆解 */}
      <FadeIn delay={0.16} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">二、需求拆解</h2>
          <p className="text-xs text-[var(--muted)]">
            用户画像 · 用户旅程 · 核心需求 · 次要需求
          </p>
        </div>
        <div className="grid gap-4">
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="用户画像" color="#8B5CF6" />
            <TextBlock text={project.requirements.userPersona} />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="用户旅程" color="#06B6D4" />
            <TextBlock text={project.requirements.userJourney} />
          </GlassPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassPanel depth="sm" className="p-6">
              <SectionTitle label="核心需求" color="#10B981" />
              <BulletList items={project.requirements.coreNeeds} accent={project.accent} />
            </GlassPanel>
            <GlassPanel depth="sm" className="p-6">
              <SectionTitle label="次要需求" color="#94A3B8" />
              <BulletList items={project.requirements.secondaryNeeds} accent="#94A3B8" />
            </GlassPanel>
          </div>
        </div>
        {requirementsMedia.length > 0 && (
          <MediaGallery items={requirementsMedia} accent={project.accent} />
        )}
      </FadeIn>

      {/* 三、方案设计 */}
      <FadeIn delay={0.18} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">三、方案设计</h2>
          <p className="text-xs text-[var(--muted)]">
            信息架构 · 功能流程 · 原型设计 · 交互规则 · 页面说明
          </p>
        </div>
        <div className="grid gap-4">
          <GlassPanel depth="md" className="p-6 sm:p-8">
            <SectionTitle label="信息架构" color="#6366F1" />
            <TextBlock text={project.designSolution.informationArchitecture} />
          </GlassPanel>
          <GlassPanel depth="md" className="p-6 sm:p-8">
            <SectionTitle label="功能流程" color="#10B981" />
            <TextBlock text={project.designSolution.functionalFlow} />
          </GlassPanel>
          <GlassPanel depth="md" className="p-6 sm:p-8">
            <SectionTitle label="原型设计" color="#F59E0B" />
            <TextBlock text={project.designSolution.prototype} />
          </GlassPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassPanel depth="sm" className="p-6">
              <SectionTitle label="交互规则" color="#EC4899" />
              <TextBlock text={project.designSolution.interactionRules} />
            </GlassPanel>
            <GlassPanel depth="sm" className="p-6">
              <SectionTitle label="页面说明" color="#8B5CF6" />
              <TextBlock text={project.designSolution.pageNotes} />
            </GlassPanel>
          </div>
          {project.designSolution.optimizationOverview && (
            <GlassPanel depth="sm" className="p-6">
              <SectionTitle label="七大模块优化" color="#10B981" />
              <BulletList
                items={project.designSolution.optimizationOverview}
                accent={project.accent}
              />
            </GlassPanel>
          )}
        </div>
        {designMedia.length > 0 && (
          <MediaGallery items={designMedia} accent={project.accent} />
        )}
      </FadeIn>

      {/* 四、落地成果 */}
      <FadeIn delay={0.2} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">四、落地成果</h2>
          <p className="text-xs text-[var(--muted)]">
            版本迭代 · 数据表现 · 用户反馈
          </p>
        </div>
        <div className="grid gap-4">
          {/* 版本迭代 */}
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="版本迭代记录" color="#06B6D4" />
            <div className="mt-4 space-y-3">
              {project.deliveryResults.iterationLog.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: project.accent }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* 数据表现 */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.deliveryResults.dataPerformance.map((metric) => (
              <GlassPanel key={metric.label} depth="sm" className="p-5">
                <p className="text-xs text-[var(--muted)]">{metric.label}</p>
                <p
                  className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                  style={{ color: project.accent }}
                >
                  {metric.value}
                </p>
              </GlassPanel>
            ))}
          </div>

          {/* 用户反馈 */}
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="用户反馈" color="#F59E0B" />
            <TextBlock text={project.deliveryResults.userFeedback} />
          </GlassPanel>
        </div>
        {deliveryMedia.length > 0 && (
          <MediaGallery items={deliveryMedia} accent={project.accent} />
        )}
      </FadeIn>

      {/* 五、复盘总结 */}
      <FadeIn delay={0.22} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">五、复盘总结</h2>
          <p className="text-xs text-[var(--muted)]">
            亮点 · 不足 · 优化思路
          </p>
        </div>
        <div className="grid gap-4">
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="亮点" color="#10B981" />
            <BulletList items={project.retrospective.strengths} accent="#10B981" />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="不足" color="#F59E0B" />
            <BulletList items={project.retrospective.weaknesses} accent="#F59E0B" />
          </GlassPanel>
          <GlassPanel depth="sm" className="p-6">
            <SectionTitle label="优化思路" color="#6366F1" />
            <BulletList items={project.retrospective.optimizationIdeas} accent="#6366F1" />
          </GlassPanel>
        </div>
        {retrospectiveMedia.length > 0 && (
          <MediaGallery items={retrospectiveMedia} accent={project.accent} />
        )}
      </FadeIn>

      {/* 原有的产品洞察 & 设计巧思 */}
      <FadeIn delay={0.24} className="mt-8">
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">设计思考</h2>
        </div>
        <div className="grid gap-4">
          <GlassPanel depth="md" className="p-6 sm:p-8">
            <SectionTitle label="产品洞察" />
            <TextBlock text={project.productInsight} />
          </GlassPanel>
          <GlassPanel depth="md" className="p-6 sm:p-8">
            <SectionTitle label="设计巧思" color="#8764B8" />
            <TextBlock text={project.designCraft} />
          </GlassPanel>
        </div>
      </FadeIn>

      {/* 关键设计决策 */}
      <FadeIn delay={0.26} className="mt-6">
        <GlassPanel depth="sm" className="p-6 sm:p-8">
          <SectionTitle label="关键设计决策" color="var(--muted)" />
          <BulletList items={project.highlights} accent={project.accent} />
        </GlassPanel>
      </FadeIn>

      {/* 核心指标 */}
      {project.metrics && (
        <FadeIn delay={0.28} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.map((metric) => (
              <GlassPanel key={metric.label} depth="sm" className="p-6">
                <p className="text-sm text-[var(--muted)]">{metric.label}</p>
                <p
                  className="mt-2 text-3xl font-semibold tracking-[-0.03em]"
                  style={{ color: project.accent }}
                >
                  {metric.value}
                </p>
              </GlassPanel>
            ))}
          </div>
        </FadeIn>
      )}
    </>
  );
}
