"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

function track(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  return (
    <article
      onMouseMove={track}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl bg-card transition-colors duration-500 hover:bg-tint",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-signal) 13%, transparent), transparent 68%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-signal to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="relative h-full">{children}</div>
    </article>
  );
}
