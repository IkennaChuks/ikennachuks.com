"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/profile";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-90 print:hidden transition-all duration-500",
        scrolled
          ? "border-b border-line bg-page/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-tint font-display text-sm font-bold tracking-tight text-signal transition-colors duration-300 group-hover:border-signal/50">
            {profile.initials}
            <span className="absolute -right-px -bottom-px h-1.5 w-1.5 rounded-sm bg-signal" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight whitespace-nowrap text-text">
              {profile.name}
            </span>
            <span className="mt-1 font-mono text-[0.6rem] tracking-[0.18em] text-dim uppercase">
              Cloud · Data · AI
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative px-3 py-2 font-mono text-[0.65rem] tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300",
                  isActive ? "text-signal" : "text-muted hover:text-text",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-signal transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-lg border border-line bg-card px-5 py-2.5 font-mono text-[0.7rem] tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-300 hover:border-signal/50 hover:bg-tint hover:text-signal sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-card text-text transition-colors duration-300 hover:border-signal/50 hover:text-signal xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-y border-line bg-page/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="shell flex flex-col py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line/60 py-4 last:border-0"
                >
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {link.label}
                  </span>
                  <span className="font-mono text-[0.65rem] text-dim">
                    0{i + 1}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
