"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function Backdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  const orbA = useTransform(progress, [0, 1], [0, -180]);
  const orbB = useTransform(progress, [0, 1], [0, 220]);
  const orbC = useTransform(progress, [0, 1], [0, -520]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <div className="absolute inset-0 bg-page" />

      <div
        className="grid-backdrop absolute inset-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, black 0%, black 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, black 0%, black 45%, transparent 85%)",
        }}
      />

      <motion.div
        style={reduced ? undefined : { y: orbA }}
        className="animate-drift absolute -top-[24rem] -left-[16rem] h-[48rem] w-[48rem] rounded-full bg-signal/14 blur-[150px]"
      />
      <motion.div
        style={reduced ? undefined : { y: orbB }}
        className="animate-drift-slow absolute -top-[12rem] right-[-18rem] h-[40rem] w-[40rem] rounded-full bg-ember/12 blur-[150px]"
      />
      <motion.div
        style={reduced ? undefined : { y: orbC }}
        className="absolute top-[130vh] left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent/14 blur-[160px]"
      />

      <div className="noise absolute inset-0 opacity-[0.02] mix-blend-multiply" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-page to-transparent" />
    </div>
  );
}
