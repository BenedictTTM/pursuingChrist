"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhoAmI() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 xl:py-40 px-4 md:px-6 lg:px-12 xl:px-20 bg-transparent overflow-hidden">

      {/* SECTION COORDINATES - Subtle brand-consistent absolute positioning anchor */}
      <div className="absolute left-6 top-12 hidden md:block text-[9px] text-white/15 tracking-[0.3em] uppercase select-none pointer-events-none">
        02 // ABOUT
      </div>

      {/* AMBIENT BACKGROUND SYSTEM: Grid + Radials + Scientific Geometry */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40 -z-10" />

      {/* Luxury soft gold glowing ambient orbs */}
      <div className="absolute top-[15%] left-[-8%] w-[45%] h-[45%] bg-[var(--color-primary)]/[0.03] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] right-[-8%] w-[45%] h-[45%] bg-[var(--color-primary)]/[0.03] blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Scientific precision engineering overlay vector */}
      <div className="absolute right-[5%] top-[10%] opacity-[0.08] pointer-events-none hidden lg:block -z-10">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-primary)]">
          <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="150" cy="150" r="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="3" fill="currentColor" />
          <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          {/* Scientific coordinate pointers */}
          <line x1="80" y1="80" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="220" y1="80" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <circle cx="80" cy="80" r="5" stroke="currentColor" strokeWidth="1" fill="black" />
          <circle cx="220" cy="80" r="5" stroke="currentColor" strokeWidth="1" fill="black" />
          {/* Calibration text overlay */}
          <text x="160" y="30" fill="currentColor" fontSize="8" letterSpacing="0.1em" opacity="0.4" className="font-mono">R: 130mm</text>
          <text x="160" y="145" fill="currentColor" fontSize="8" letterSpacing="0.1em" opacity="0.4" className="font-mono">SYS_COORD_02</text>
        </svg>
      </div>

      {/* MAIN TWO-COLUMN ELEGANT COMPOSITION */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20">

        {/* COLUMN 1 - LUXURY PORTRAIT FRAMING WITH PRECISION MARKINGS */}
        <div className="w-full lg:w-[42%] flex justify-center lg:justify-start relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] group"
          >
            {/* Elegant glassmorphic background container with shadow glow */}
            <div className="absolute inset-0 bg-white/[0.01] border border-white/5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-3xl transition-all duration-700 group-hover:border-[var(--color-primary)]/15 group-hover:shadow-[var(--shadow-glow)]"></div>

            {/* Precision corner ticks (Luxury gold accents) */}
            <div className="absolute -top-4 -left-4 w-5 h-5 border-t border-l border-[var(--color-primary)]/35 transition-all duration-500 group-hover:border-[var(--color-primary)]" />
            <div className="absolute -top-4 -right-4 w-5 h-5 border-t border-r border-[var(--color-primary)]/35 transition-all duration-500 group-hover:border-[var(--color-primary)]" />
            <div className="absolute -bottom-4 -left-4 w-5 h-5 border-b border-l border-[var(--color-primary)]/35 transition-all duration-500 group-hover:border-[var(--color-primary)]" />
            <div className="absolute -bottom-4 -right-4 w-5 h-5 border-b border-r border-[var(--color-primary)]/35 transition-all duration-500 group-hover:border-[var(--color-primary)]" />

            {/* Architectural calibration lines */}
            <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[var(--color-primary)]/20" />
            <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[var(--color-primary)]/20" />
            <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 h-4 w-[1px] bg-[var(--color-primary)]/20" />
            <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 h-4 w-[1px] bg-[var(--color-primary)]/20" />

            {/* Premium editorial image layout with smooth zoom and grayscale transition */}
            <div className="absolute inset-4 rounded-xl overflow-hidden border border-white/10 bg-neutral-950 transition-all duration-700 group-hover:border-white/20">
              <Image
                src="/mba-headshot.jpg"
                alt="Pursuing Christ Editorial Portrait"
                fill
                priority
                className="w-full h-full object-cover grayscale contrast-[1.05] saturate-[0.8] hover:grayscale-0 hover:scale-105 hover:saturate-[0.95] hover:contrast-[1.1] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {/* Elegant cinema vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 mix-blend-multiply pointer-events-none z-10" />
            </div>

            {/* Faint gold floating dots grid layout */}
            <div className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 flex gap-1.5 opacity-20 pointer-events-none">
              {[...Array(12)].map((_, row) => (
                <div key={row} className="flex flex-col gap-1.5">
                  {[...Array(4)].map((_, col) => (
                    <div key={col} className="w-[3px] h-[3px] bg-[var(--color-primary)] rounded-full"></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Fine coordinate numbers on bottom boundary */}
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center z-20 select-none opacity-40 group-hover:opacity-75 transition-opacity duration-500">
              <span className="text-[8px] tracking-[0.25em] text-white/60 font-mono uppercase">POS: 43.6532° N, 79.3832° W</span>
              <span className="text-[8px] tracking-[0.25em] text-[var(--color-primary)] font-mono uppercase">SEQ // WHO_AM_I_02</span>
            </div>

            {/* Floating gold element accents */}
            <div className="absolute -top-6 -right-6 w-3 h-3 bg-[var(--color-primary)]/20 rounded-full blur-[1px]"></div>
            <div className="absolute -top-5 -right-5 w-1.5 h-1.5 bg-[var(--color-primary)]/45 rounded-full"></div>
          </motion.div>
        </div>

        {/* COLUMN 2 - HIGH-END DISPLAY TYPOGRAPHY, BIOGRAPHY AND AUTHORITY METRICS */}
        <div className="flex-1 w-full relative z-10 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Elegant Section Label */}
            <div className="flex items-center gap-3 mb-4 select-none">
              <div className="w-6 h-[1px] bg-[var(--color-primary)]/40" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Who I Am
              </span>
            </div>

            {/* High-Impact Display Headline */}
            <h2
              className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white mb-6 text-balance select-none"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
              }}
            >
              Bioengineering <br />
              <span
                className="block text-[var(--color-primary)] font-poppins italic font-normal tracking-wide mt-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                Researcher
              </span>
            </h2>

            {/* Premium, Digestible Editorial Content Blocks */}
            <div className="flex flex-col gap-4 max-w-[700px] mb-8">
              <p className="text-[14px] md:text-[15px] text-[var(--color-text-secondary)] leading-[1.8] font-sans font-light tracking-wide">
                I am a{" "}
                <span className="text-[var(--color-primary)] font-semibold transition-all duration-300 hover:text-[var(--color-primary-light)]">
                  Ghanaian Bioengineering Researcher
                </span>
                , scholar, and innovator based at{" "}
                <span className="text-[var(--color-primary)] font-semibold transition-all duration-300 hover:text-[var(--color-primary-light)]">
                  York University
                </span>
                . Driven by a passion for medical discovery and technological precision, my work bridges the gap between biological complexity and advanced computational engineering.
              </p>

              <p className="text-[13px] md:text-[14px] text-[var(--color-text-muted)] leading-[1.8] font-sans font-light tracking-wide">
                Through rigorous computational analysis and state-of-the-art laboratory experimentation, my research drives major leaps in{" "}
                <span className="text-[var(--color-primary)]/90 font-medium hover:text-[var(--color-primary-light)] transition-colors duration-300">
                  Medical Discovery
                </span>{" "}
                and{" "}
                <span className="text-[var(--color-primary)]/90 font-medium hover:text-[var(--color-primary-light)] transition-colors duration-300">
                  Computational Engineering
                </span>
                , designing new modalities for high-precision diagnostic and therapeutic systems.
              </p>
            </div>

            {/* Inspirational Quote Block */}
            <div className="mt-2 relative pl-6 md:pl-8 py-1 md:py-2 border-l-[3px] border-[var(--color-primary)] bg-gradient-to-r from-[#1A1A1A]/60 to-transparent rounded-r-lg max-w-[650px]">
              <p
                className="text-[15px] md:text-[17px] text-white/90 italic leading-[1.7] tracking-wide mb-3 font-poppins"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                "Engineering is the disciplined art of turning ideas into reality with precision, purpose, and relentless curiosity."
              </p>
              <div className="text-[12px] md:text-[14px] font-medium text-[var(--color-primary)] tracking-wide">
                — Pursuing Christ
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
