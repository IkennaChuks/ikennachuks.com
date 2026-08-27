import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-card/60">
      <div className="shell py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold tracking-tight text-text">
              {profile.name}
              <span className="ml-2 font-mono text-xs text-signal">MSc</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{profile.role}</p>
            <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] text-dim uppercase">
              {profile.company} · {profile.location}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hairline my-10 h-px" />

        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-dim uppercase">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <Link
            href="#top"
            className="group flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-muted uppercase transition-colors duration-300 hover:text-signal"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
