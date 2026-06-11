import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16 sm:px-6 sm:pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Contact info line */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-[var(--muted)]">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-lg px-2 py-1 transition-colors hover:text-[var(--foreground)]"
          >
            {siteConfig.email}
          </a>
          <span className="hidden sm:inline text-black/[0.1]">|</span>
          <span>{siteConfig.location}</span>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Link href="/" prefetch={false} className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.04] bg-white text-xs font-bold text-[var(--accent)] shadow-sm transition-transform group-hover:scale-105">
              P
            </span>
            <div>
              <p className="text-sm font-semibold">{siteConfig.name}</p>
              <p className="text-[11px] text-[var(--muted)]">
                产品设计工程师 / PDE · 洞察 / 设计 / 交付
              </p>
            </div>
          </Link>
          <p className="text-xs text-[var(--muted)]">
            © 2026 · Built with PDE mindset
          </p>
        </div>
      </div>
    </footer>
  );
}
