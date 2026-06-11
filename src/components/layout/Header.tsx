"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { navItems, siteConfig } from "@/content/site";
import { HashLink } from "@/components/ui/hash-link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-500",
            scrolled
              ? "border-black/[0.04] bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          {/* Logo */}
          <Link href="/" prefetch={false} className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-white shadow-[0_4px_12px_rgba(0,120,212,0.3)] transition-transform group-hover:scale-105">
              P
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-[-0.02em]">
                {siteConfig.name}
              </p>
              <p className="text-[10px] text-[var(--muted)]">
                产品设计工程师 · PDE
              </p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <HashLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-black/[0.03] hover:text-[var(--foreground)]"
              >
                {item.label}
              </HashLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <HashLink
              href="#contact"
              className="hidden rounded-full bg-[var(--foreground)] px-5 py-2 text-sm font-medium text-white transition-all hover:opacity-90 sm:inline-flex"
            >
              联系我
            </HashLink>
            <button
              type="button"
              aria-label="打开菜单"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-white md:hidden"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 bg-[var(--foreground)]" />
                <span className="block h-0.5 w-4 bg-[var(--foreground)]" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute inset-y-0 right-0 w-[min(100%,300px)] border-l border-black/[0.06] bg-white p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm font-bold">导航</p>
                <button
                  type="button"
                  aria-label="关闭菜单"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06]"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <HashLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-50"
                  >
                    {item.label}
                  </HashLink>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
