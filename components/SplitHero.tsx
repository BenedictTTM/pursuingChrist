"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// ─── Roc Grotesk Extra Wide 800 via Bunny Fonts ───────────────────────────────
// Add this to your <head> or import in your global CSS:
//   @import url('https://fonts.bunny.net/css?family=roc-grotesk-extra-wide:800');
//
// Or drop this <link> in your layout.tsx <head>:
//   <link rel="preconnect" href="https://fonts.bunny.net" />
//   <link href="https://fonts.bunny.net/css?family=roc-grotesk-extra-wide:800" rel="stylesheet" />
// ─────────────────────────────────────────────────────────────────────────────

export default function SplitHero() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => setBtnCoords({ x: 0, y: 0 });

  return (
    <>
      {/* ── Font import — renders once, injects @font-face via style tag ── */}
      <style>{`
        @import url('https://fonts.bunny.net/css?family=roc-grotesk-extra-wide:800');
      `}</style>

      <div className="relative w-full overflow-hidden bg-[#F6F4F1] text-[#111111]">
        {/* Subtle radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.8),transparent_45%),linear-gradient(180deg,#F6F4F1,rgba(246,244,241,0.92))]" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-12 pt-28 md:px-12 lg:pt-28 lg:pb-24">

          {/* ── Pill badge ── */}
          <div className="inline-flex items-center gap-2 border border-[#E3DED7] bg-white/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            Faith • Purpose • Discipleship
          </div>

          {/* ── Main layout: headline absolutely positioned over content row ── */}
          <div className="relative mt-4 flex min-h-[380px] flex-col lg:flex-row lg:items-stretch">

            {/* ── ABSOLUTELY POSITIONED HEADLINE ──────────────────────────────
                position: absolute  → taken out of flow, spans from left edge
                                      rightward across the image column
                z-index: 30         → above image (z-10) and copy (z-20)
                white-space: nowrap → single line, no wrapping
            ─────────────────────────────────────────────────────────────────── */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 -top-4 z-40 w-max max-w-none overflow-visible whitespace-nowrap "
              style={{
                fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(5rem, 10vw, 8.5rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.07em",
              }}
            >
              <div style={{ transform: 'scale(1.35, 0.8)', transformOrigin: 'top left' }}>
                <span className="block w-max max-w-none text-[#111111]">Pursuing</span>
                <span className="block w-max max-w-none text-[#FF5A1F]">Christ</span>
              </div>
            </motion.h1>

            {/* ── LEFT COPY ──────────────────────────────────────────────────
                pt-[180px] pushes content below the absolute headline.
                Adjust this value if you change the font size.
                z-20 keeps it above the image but below the headline.
            ─────────────────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex w-full flex-col items-start justify-start pb-0 pt-[130px] lg:w-[45%] lg:pr-8 lg:pt-[180px]"
            >
              {/* Tagline */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-[2px] sm:w-[3px] flex-shrink-0 self-stretch bg-[#FF5A1F]" />
                <p className="max-w-[320px] sm:max-w-[400px] text-[14px] sm:text-[16px] leading-[1.6] text-[#6B6B6B]">
                  Transforming the Total Man with the Total Word of God.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
                <motion.button
                  ref={buttonRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  animate={{ x: btnCoords.x, y: btnCoords.y }}
                  transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.12 }}
                  className="rounded-full bg-[#111111] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#FF5A1F]"
                >
                  Start the Journey
                </motion.button>

                <Link
                  href="#"
                  className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:text-[#FF5A1F]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3DED7] bg-white transition-all group-hover:border-[#FF5A1F] group-hover:shadow-sm">
                    <span className="ml-[3px] h-0 w-0 border-b-[5px] border-b-transparent border-l-[7px] border-l-[#111111] border-t-[5px] border-t-transparent transition-colors group-hover:border-l-[#FF5A1F]" />
                  </span>
                  Watch Message
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-8 text-[12px] font-medium tracking-wide text-[#6B6B6B]">
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[#FF5A1F]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                  10k+ Lives Transformed
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[#FF5A1F]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </span>
                  Global Community
                </span>
              </div>
            </motion.div>

            {/* ── IMAGE PANEL ────────────────────────────────────────────────
                z-10 → sits behind the absolutely positioned headline (z-30)
                The headline text visually overlaps the top portion of this frame.
            ─────────────────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex w-full justify-end lg:w-[55%]"
            >
              <div className="relative w-full max-w-[640px] rounded-[2px]   p-[14px] ">
                <div className="relative aspect-[4/3] w-full overflow-hidden   ">
                  <Image
                    src="/hero.png"
                    alt="Pursuing Christ artwork"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Philippians label */}
        <div className="absolute bottom-32 left-4 hidden origin-bottom-left -rotate-90 text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]/60 lg:block">
          Philippians 3:14
        </div>
      </div>
    </>
  );
}