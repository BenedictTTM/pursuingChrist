"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedBlob from "./Animatedblob";

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

      <div className="relative w-full overflow-hidden bg-[#F6F2EC] bg-[url('/bg1.png')] bg-cover bg-center text-[#111111]">
        {/* <AnimatedBlob /> */}
        {/* Background image with soft wash for legibility */}
        <div className="absolute inset-0 -z-20 bg-[#F7F3ED]/80 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_8%,rgba(255,255,255,0.85),transparent_60%),radial-gradient(circle_at_75%_0%,rgba(255,255,255,0.7),transparent_55%),radial-gradient(circle_at_10%_85%,rgba(245,238,228,0.45),transparent_60%),linear-gradient(180deg,rgba(246,243,238,0.94),rgba(246,243,238,0.9))]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 pb-14 pt-20 md:px-12 lg:pb-28 lg:pt-28">

          {/* ── Pill badge ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex w-full max-w-3xl items-center justify-between"
          >
            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="group inline-flex items-center gap-1 sm:gap-1.5 text-[#1C5364] text-[7px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-300 hover:text-[#FF5A1F] cursor-pointer"
            >
              <span className="w-1 h-1 rounded-full bg-[#FF5A1F] animate-pulse" />
              Faith
            </span>

            <div className="mx-2 sm:mx-6 flex flex-1 items-center justify-center gap-1.5 sm:gap-2.5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E3D9CE]/80" />
              <span className="text-[7px] sm:text-[9px] text-[#C5A576] select-none opacity-80">✦</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E3D9CE]/80" />
            </div>

            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="group inline-flex items-center gap-1 sm:gap-1.5 text-[#1C5364] text-[7px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-300 hover:text-[#FF5A1F] cursor-pointer"
            >
              <span className="w-1 h-1 rounded-full bg-[#FF5A1F] animate-pulse" />
              Purpose
            </span>

            <div className="mx-2 sm:mx-6 flex flex-1 items-center justify-center gap-1.5 sm:gap-2.5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E3D9CE]/80" />
              <span className="text-[7px] sm:text-[9px] text-[#C5A576] select-none opacity-80">✦</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E3D9CE]/80" />
            </div>

            <span
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="group inline-flex items-center gap-1 sm:gap-1.5 text-[#1C5364] text-[7px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-300 hover:text-[#FF5A1F] cursor-pointer"
            >
              <span className="w-1 h-1 rounded-full bg-[#FF5A1F] animate-pulse" />
              Discipleship
            </span>
          </motion.div>

          {/* ── Main layout: headline absolutely positioned over content row ── */}
          <div className="relative mt-8 grid min-h-[380px] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10">

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
              className="absolute left-0 -top-4 z-40 w-max max-w-none overflow-visible whitespace-nowrap text-left"
              style={{
                fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(4.75rem, 9.5vw, 8rem)",
                lineHeight: 0.78,
                letterSpacing: "-0.08em",
              }}
            >
              <div style={{ transform: 'scale(1.25, 0.82)', transformOrigin: 'top left' }}>
                <span
                  className="block w-max max-w-none text-[#111111]"
                  style={{ fontSize: "0.78em", letterSpacing: "-0.05em" }}
                >
                  Pursuing
                </span>
                <span
                  className="relative block w-max max-w-none text-[#FF5A1F] drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                  style={{ fontSize: "1.06em", letterSpacing: "-0.1em" }}
                >
                  <span className="relative z-20">Chris</span>
                  <img
                    src="/t2.png"
                    alt="t"
                    className="relative z-10 inline-block h-[1.12em] -ml-[0.45em] -top-[0.12em]"
                  />
                </span>
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
              className="relative z-20 flex w-full flex-col items-start justify-start pb-2 pt-[140px] lg:col-span-6 lg:pt-[190px]"
            >
              <div className="flex w-full flex-col items-start gap-8 sm:gap-9">
                {/* Scripture Focus Promise */}
                <div className="flex flex-col gap-1.5 max-w-[340px] sm:max-w-[440px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#C5A576] select-none">✦</span>
                    <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#C5A576] font-extrabold" style={{ fontFamily: "var(--font-poppins)" }}>Jeremiah 29:13</span>
                    <span className="text-[7.5px] font-bold text-[#1C5364]/65 tracking-[0.1em] uppercase select-none">(NIV)</span>
                  </div>
                  <p className="text-[15px] sm:text-[17.5px] italic leading-[1.6] text-[#1C5364] font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                    "You will seek me and find me when you seek me with all your heart."
                  </p>
                </div>


                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-10">
                  <button
                    className="rounded-[10px] bg-[#1C5364] px-9 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_28px_rgba(12,34,40,0.22),0_4px_0_#0F3845] transition-all hover:-translate-y-[1px] hover:shadow-[0_18px_32px_rgba(12,34,40,0.26),0_5px_0_#0F3845] active:translate-y-[1px] active:shadow-[0_12px_24px_rgba(12,34,40,0.2),0_3px_0_#0F3845]"
                  >
                    Start The Journey
                  </button>

                  <Link
                    href="#"
                    className="group inline-flex items-center gap-3 rounded-[10px] border border-[#C8BFB3] bg-white/60 px-7 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3E4F53] shadow-[0_10px_20px_rgba(17,17,17,0.08)] transition-all hover:border-[#AFA59A] hover:bg-white/80 hover:text-[#2B3B3F]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5A1F] text-white transition-transform group-hover:scale-102">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-2.5 w-3.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    Watch Message
                  </Link>
                </div>

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
              className="relative z-10 flex w-full justify-end lg:col-span-6 lg:translate-x-10"
            >
              <div className="relative w-full max-w-[600px] -translate-x-10 -translate-y-8 rounded-[2px] p-[14px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px]">
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-[2px] bg-[radial-gradient(circle_at_15%_0%,rgba(246,244,241,0.7),rgba(246,244,241,0.35),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-[2px] " />
                  <Image
                    src="/hero2.png"
                    alt="Pursuing Christ artwork"
                    fill
                    className="object-cover object-[50%_20%]"
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    priority
                  />
                </div>

                {/* Floating Mission Notification */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-6 -right-4 sm:top-8 sm:-right-8 z-30 overflow-hidden rounded-[8px] border border-[#C5A576]/20 bg-white/55 p-2 px-3 shadow-[0_15px_30px_rgba(28,83,100,0.06)] backdrop-blur-[4px] max-w-[200px] sm:max-w-[220px]"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-[#C5A576]/80" />
                  <div className="flex items-start gap-1.5 pl-0.5">
                    <span className="text-[7.5px] text-[#C5A576] mt-0.5 select-none animate-pulse">✦</span>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[5.5px] sm:text-[6px] uppercase tracking-[0.2em] text-[#C5A576]/90 font-bold mb-0.5" style={{ fontFamily: "var(--font-poppins)" }}>
                        Our Sacred Mandate
                      </p>
                      <p className="text-[10px] sm:text-[11px] leading-[1.25] text-[#2C3B3E]/90 font-medium" style={{ fontFamily: "var(--font-cormorant)" }}>
                        Transforming the <span className="italic font-bold text-[#FF5A1F]">Total Man</span> with the Total Word of God.
                      </p>
                    </div>
                  </div>
                </motion.div>
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