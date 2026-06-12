"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredProjects } from "@/content/projects";
import { HashLink } from "@/components/ui/hash-link";
import { FadeIn } from "@/components/ui/motion";

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-[var(--accent)]">•</span>
              <h2 className="text-2xl font-bold tracking-[-0.02em]">作品案例</h2>
            </div>
            <HashLink
              href="#work"
              className="text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-70"
            >
              查看全部作品 →
            </HashLink>
          </div>
        </FadeIn>

        {/* Scrollable cards */}
        <div className="relative mt-8">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-md transition-all hover:shadow-lg"
            >
              ‹
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-md transition-all hover:shadow-lg"
            >
              ›
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="w-[260px] flex-shrink-0 snap-start"
              >
                <Link href={`/work/${project.slug}`} prefetch={false} className="group block">
                  <article className="overflow-hidden rounded-2xl border border-black/[0.04] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    {/* Cover */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cover}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="mt-3 px-1 pb-1">
                      <h3 className="text-sm font-bold tracking-[-0.01em]">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">
                        {project.subtitle}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
