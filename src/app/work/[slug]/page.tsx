import { HashLink } from "@/components/ui/hash-link";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/ui/ambient";
import { WorkDetailContent } from "@/components/sections/WorkDetail";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <AmbientBackground />
      <Header />
      <main className="px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <HashLink
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            ← 返回作品列表
          </HashLink>

          <header className="mt-10 rounded-2xl bg-white px-6 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:px-8 sm:py-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {project.subtitle}
            </p>
          </header>

          <WorkDetailContent project={project} />
        </div>
      </main>
      <div className="relative overflow-hidden border-t border-[var(--glass-border-sm)] bg-[var(--glass-bg-sm)] shadow-[0_-12px_48px_rgba(0,0,0,0.05)] backdrop-blur-[24px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
        <Footer />
      </div>
    </>
  );
}
