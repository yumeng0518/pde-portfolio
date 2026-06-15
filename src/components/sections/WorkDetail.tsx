"use client";

import { motion } from "framer-motion";
import type { Project, MediaItem } from "@/content/projects";
import { GlassPanel } from "@/components/ui/glass";
import { FadeIn } from "@/components/ui/motion";

const prose =
  "text-[15px] leading-[1.85] text-[var(--foreground)]/75 sm:text-base sm:leading-[1.9]";
const label =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]";
const textPanel =
  "rounded-2xl bg-white px-6 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:px-8 sm:py-9";

function TextPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${textPanel} ${className}`}>{children}</div>;
}

function SectionHeader({
  index,
  title,
  desc,
}: {
  index: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="border-b border-black/[0.06] pb-5">
      <p className={label}>{index}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.65rem]">
        {title}
      </h2>
      {desc && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
      )}
    </div>
  );
}

function SubBlock({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="relative pl-5 sm:pl-6">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-0.5 rounded-full opacity-80"
        style={{ background: accent }}
      />
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--foreground)]">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  return <p className={prose}>{text}</p>;
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${prose}`}>
          <span
            className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MediaGallery({
  items,
  accent,
}: {
  items: MediaItem[];
  accent: string;
}) {
  if (!items?.length) return null;

  return (
    <div className="mt-8 space-y-6">
      {items.map((item, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          {item.type === "video" ? (
            <video
              src={item.url}
              controls
              preload="metadata"
              className="aspect-video w-full bg-black/5"
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
            <figcaption className="px-5 py-3 text-center text-sm text-[var(--muted)]">
              <span
                className="mr-2 inline-block h-1 w-1 rounded-full align-middle"
                style={{ background: accent }}
              />
              {item.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}

function getMediaBySection(
  media: MediaItem[] | undefined,
  section: MediaItem["section"],
) {
  if (!media) return [];
  return media.filter((m) => m.section === section);
}

export function WorkDetailContent({ project }: { project: Project }) {
  const accent = project.accent;
  const heroMedia = getMediaBySection(project.media, "hero");
  const backgroundMedia = getMediaBySection(project.media, "background");
  const requirementsMedia = getMediaBySection(project.media, "requirements");
  const designMedia = getMediaBySection(project.media, "design");
  const deliveryMedia = getMediaBySection(project.media, "delivery");
  const retrospectiveMedia = getMediaBySection(project.media, "retrospective");

  return (
    <article className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
      {/* Hero */}
      <FadeIn delay={0.08}>
        {heroMedia.length > 0 ? (
          <MediaGallery items={heroMedia} accent={accent} />
        ) : (
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            style={{
              background: `linear-gradient(135deg, ${accent}22, ${accent}06)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${accent}44, transparent 62%)`,
              }}
            />
          </div>
        )}
      </FadeIn>

      {/* 概述 */}
      <FadeIn delay={0.1}>
        <TextPanel className="space-y-5">
          <p className={label}>Overview</p>
          <p className="text-lg leading-[1.75] tracking-[-0.01em] text-[var(--foreground)] sm:text-xl sm:leading-[1.8]">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/[0.06] bg-[var(--bg-base)] px-3 py-1 text-xs text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </TextPanel>
      </FadeIn>

      {/* 背景 */}
      <FadeIn delay={0.12}>
        <section className="space-y-6">
          <TextPanel className="space-y-8">
            <SectionHeader
              index="01"
              title="项目背景"
              desc="业务目标 · 用户痛点 · 市场现状 · 竞品分析"
            />
            <div className="grid gap-8 sm:gap-10">
              <SubBlock title="业务目标" accent={accent}>
                <TextBlock text={project.background.businessGoal} />
              </SubBlock>
              <SubBlock title="用户痛点" accent={accent}>
                <TextBlock text={project.background.userPain} />
              </SubBlock>
              <SubBlock title="市场现状" accent={accent}>
                <TextBlock text={project.background.marketStatus} />
              </SubBlock>
              <SubBlock title="竞品分析" accent={accent}>
                <TextBlock text={project.background.competitorAnalysis} />
              </SubBlock>
            </div>
          </TextPanel>
          {backgroundMedia.length > 0 && (
            <MediaGallery items={backgroundMedia} accent={accent} />
          )}
        </section>
      </FadeIn>

      {/* 需求 */}
      <FadeIn delay={0.14}>
        <section className="space-y-6">
          <TextPanel className="space-y-8">
            <SectionHeader
              index="02"
              title="需求拆解"
              desc="用户画像 · 用户旅程 · 核心与次要需求"
            />
            <div className="grid gap-8 sm:gap-10">
              <SubBlock title="用户画像" accent={accent}>
                <TextBlock text={project.requirements.userPersona} />
              </SubBlock>
              <SubBlock title="用户旅程" accent={accent}>
                <TextBlock text={project.requirements.userJourney} />
              </SubBlock>
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                <SubBlock title="核心需求" accent={accent}>
                  <BulletList items={project.requirements.coreNeeds} accent={accent} />
                </SubBlock>
                <SubBlock title="次要需求" accent={accent}>
                  <BulletList
                    items={project.requirements.secondaryNeeds}
                    accent="var(--muted)"
                  />
                </SubBlock>
              </div>
            </div>
          </TextPanel>
          {requirementsMedia.length > 0 && (
            <MediaGallery items={requirementsMedia} accent={accent} />
          )}
        </section>
      </FadeIn>

      {/* 方案 */}
      <FadeIn delay={0.16}>
        <section className="space-y-6">
          <TextPanel className="space-y-8">
            <SectionHeader
              index="03"
              title="方案设计"
              desc="信息架构 · 功能流程 · 原型与交互"
            />
            <div className="grid gap-8 sm:gap-10">
              <SubBlock title="信息架构" accent={accent}>
                <TextBlock text={project.designSolution.informationArchitecture} />
              </SubBlock>
              <SubBlock title="功能流程" accent={accent}>
                <TextBlock text={project.designSolution.functionalFlow} />
              </SubBlock>
              <SubBlock title="原型设计" accent={accent}>
                <TextBlock text={project.designSolution.prototype} />
              </SubBlock>
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                <SubBlock title="交互规则" accent={accent}>
                  <TextBlock text={project.designSolution.interactionRules} />
                </SubBlock>
                <SubBlock title="页面说明" accent={accent}>
                  <TextBlock text={project.designSolution.pageNotes} />
                </SubBlock>
              </div>
              {project.designSolution.optimizationOverview && (
                <SubBlock title="七大模块优化" accent={accent}>
                  <BulletList
                    items={project.designSolution.optimizationOverview}
                    accent={accent}
                  />
                </SubBlock>
              )}
            </div>
          </TextPanel>
          {designMedia.length > 0 && (
            <MediaGallery items={designMedia} accent={accent} />
          )}
        </section>
      </FadeIn>

      {/* 成果 */}
      <FadeIn delay={0.18}>
        <section className="space-y-6">
          <TextPanel className="space-y-8">
            <SectionHeader
              index="04"
              title="落地成果"
              desc="版本迭代 · 数据表现 · 用户反馈"
            />
            <SubBlock title="版本迭代" accent={accent}>
              <ol className="space-y-4">
                {project.deliveryResults.iterationLog.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                      style={{ background: accent }}
                    >
                      {i + 1}
                    </span>
                    <p className={`pt-0.5 ${prose}`}>{item}</p>
                  </li>
                ))}
              </ol>
            </SubBlock>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.deliveryResults.dataPerformance.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-black/[0.05] bg-[var(--bg-base)] px-5 py-6 text-center"
                >
                  <p className="text-xs text-[var(--muted)]">{metric.label}</p>
                  <p
                    className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                    style={{ color: accent }}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <SubBlock title="用户反馈" accent={accent}>
              <TextBlock text={project.deliveryResults.userFeedback} />
            </SubBlock>
          </TextPanel>

          {deliveryMedia.length > 0 && (
            <MediaGallery items={deliveryMedia} accent={accent} />
          )}
        </section>
      </FadeIn>

      {/* 复盘 */}
      <FadeIn delay={0.2}>
        <section className="space-y-6">
          <TextPanel className="space-y-8">
            <SectionHeader index="05" title="复盘总结" desc="亮点 · 不足 · 优化思路" />
            <div className="grid gap-8 sm:gap-10">
              <SubBlock title="亮点" accent={accent}>
                <BulletList items={project.retrospective.strengths} accent={accent} />
              </SubBlock>
              <SubBlock title="不足" accent={accent}>
                <BulletList items={project.retrospective.weaknesses} accent={accent} />
              </SubBlock>
              <SubBlock title="优化思路" accent={accent}>
                <BulletList
                  items={project.retrospective.optimizationIdeas}
                  accent={accent}
                />
              </SubBlock>
            </div>
          </TextPanel>
          {retrospectiveMedia.length > 0 && (
            <MediaGallery items={retrospectiveMedia} accent={accent} />
          )}
        </section>
      </FadeIn>

      {/* 设计思考 */}
      <FadeIn delay={0.22}>
        <TextPanel className="space-y-8">
          <SectionHeader index="Insight" title="设计思考" />
          <div className="grid gap-8 sm:gap-10">
            <SubBlock title="产品洞察" accent={accent}>
              <TextBlock text={project.productInsight} />
            </SubBlock>
            <SubBlock title="设计巧思" accent={accent}>
              <TextBlock text={project.designCraft} />
            </SubBlock>
            <SubBlock title="关键设计决策" accent={accent}>
              <BulletList items={project.highlights} accent={accent} />
            </SubBlock>
          </div>
        </TextPanel>
      </FadeIn>

      {project.metrics && (
        <FadeIn delay={0.24}>
          <div className="grid gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <GlassPanel key={metric.label} depth="sm" className="p-6 text-center">
                <p className="text-sm text-[var(--muted)]">{metric.label}</p>
                <p
                  className="mt-2 text-3xl font-semibold tracking-[-0.03em]"
                  style={{ color: accent }}
                >
                  {metric.value}
                </p>
              </GlassPanel>
            ))}
          </div>
        </FadeIn>
      )}
    </article>
  );
}
