"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function TypographicNameplate() {
  return (
    <div
      className="
        relative
        flex
        flex-col
        items-center
        justify-center
        py-4
        px-6
        sm:py-4
        sm:px-12
        rounded-md
        border
        border-white/[0.04]
        bg-white/[0.01]
        backdrop-blur-md
        shadow-[0_15px_45px_rgba(0,0,0,0.6)]
        max-w-[280px]
        sm:max-w-sm
        mx-auto
        overflow-hidden
        transition-all
        duration-700
        hover:border-[var(--color-primary)]/20
        hover:shadow-[0_20px_50px_rgba(197,165,118,0.06)]
      "
    >
      {/* Subtle gold line marker on left edge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-9 bg-[var(--color-primary)] rounded-r" />

      {/* Modern Editorial Name */}
      <span
        className="
          text-[18px]
          sm:text-[22px]
          md:text-[25px]
          tracking-[0.28em]
          leading-none
          whitespace-nowrap
          text-center
          font-serif
          italic
          font-medium
          text-[var(--color-primary)]
          mb-3
          sm:mb-3.5
          select-none
        "
        style={{
          fontFamily: "var(--font-cormorant)",
        }}
      >
        JEFFREY DRAI
      </span>

      {/* Faint luxurious gold horizontal divider */}
      <div className="w-14 h-[1px] bg-[var(--color-primary)]/25 mb-3.5" />

      {/* Editorial Subtitle */}
      <span className="text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase font-bold text-white/45 leading-none whitespace-nowrap select-none font-sans">
        Creative Developer & Scholar
      </span>
    </div>
  );
}

export default function SplitHero() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBtnCoords({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full pt-15 lg:pt-10 overflow-hidden text-white font-sans">
      {/* Visual coordinate markers for premium architectural grid feel */}
      <div className="absolute left-6 top-8 hidden md:block text-[9px] text-white/15 tracking-[0.3em] uppercase select-none pointer-events-none">
        01 // PORTFOLIO HERO
      </div>
      <div className="absolute right-6 top-8 hidden md:block text-[9px] text-white/15 tracking-[0.3em] uppercase select-none pointer-events-none">
        SYS_VER: 2026.05
      </div>

      {/* Main Grid-Aligned Composition */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          w-full
          h-auto
          max-w-[1800px]
          mx-auto
          px-4
          md:px-6
          lg:px-12
          xl:px-20
          gap-6
          lg:gap-8
        "
      >
        {/* LEFT COLUMN - CONTENT */}
        <div
          className="
            w-full
            lg:flex-1
            flex
            flex-col
            justify-start
            items-center
            lg:items-start
            text-center
            lg:text-left
            pt-4
            lg:pt-6
            pb-2
            lg:pb-16
            z-20
            max-w-2xl
            mx-auto
            lg:mx-0
          "
        >


          {/* HERO HEADING - Massive geometric custom Brotheric display text */}
          <div className="relative mb-3">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                flex
                flex-col
                items-center
                lg:items-start
                leading-[0.9]
                uppercase
                font-display
                tracking-tight
                select-none
              "
              style={{
                fontSize: "clamp(36px, 8vw, 90px)",
              }}
            >
              <span className="block text-white font-extrabold tracking-tight text-center lg:text-left">
                Precisi
                <svg
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-[0.8em] h-[0.8em] mx-[0.05em] align-middle -translate-y-[0.1em]"
                >
                  {/* outer arcs */}
                  <path
                    d="M21 6 A15 15 0 0 1 36 21"
                    stroke="#BFA37A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 36 A15 15 0 0 1 6 21"
                    stroke="#BFA37A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  {/* center */}
                  <circle cx="21" cy="21" r="2" fill="#BFA37A" />
                  {/* calibration lines */}
                  <line x1="21" y1="2" x2="21" y2="8" stroke="#BFA37A" strokeWidth="1" />
                  <line x1="21" y1="34" x2="21" y2="40" stroke="#BFA37A" strokeWidth="1" />
                </svg>
                n Engineer
              </span>

              {/* MODERN MINIMALIST TYPOGRAPHIC NAMEPLATE */}
              <div className="relative w-full flex justify-center my-3 md:my-4">
                <TypographicNameplate />
              </div>
            </motion.h1>
          </div>

          {/* HERO SUBTEXT - Clean editorial Inter copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-[12px]
              md:text-[15px]
              leading-relaxed
              text-[var(--color-text-muted)]
              max-w-lg
              tracking-wide
              font-normal
              mb-5
            "
          >
            I&apos;ve earned the trust of over{" "}
            <span className="text-[var(--color-primary)] font-medium">250 clients</span> and{" "}
            <span className="text-[var(--color-primary)] font-medium">40 brands</span>, delivering
            award-winning digital experiences with absolute precision and premium
            polish.
          </motion.p>

          {/* ACTIONS & METRICS SECTION - Swiss Grid alignment */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              sm:items-center
              lg:items-start
              gap-8
              md:gap-12
            "
          >
            {/* Magnetic Glassmorphic Call to Action with Refined Sharp Curves */}
            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
              animate={{ x: btnCoords.x, y: btnCoords.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="
                relative
                group
                px-5
                py-3.5
                sm:px-8
                sm:py-4.5
                w-full
                sm:w-auto
                max-w-[320px]
                sm:max-w-none
                justify-center
                rounded-md
                overflow-hidden
                border
                border-[var(--color-primary)]/35
                bg-white/[0.01]
                text-white
                text-xs
                uppercase
                tracking-[0.2em]
                font-bold
                shadow-[0_10px_35px_rgba(0,0,0,0.5)]
                hover:border-[var(--color-primary)]
                hover:shadow-[0_0_30px_rgba(197,165,118,0.15)]
                transition-all
                duration-500
                flex
                items-center
                gap-3
                cursor-pointer
              "
            >
              <span className="relative z-10 flex items-center gap-2.5 text-white group-hover:text-black transition-colors duration-500">
                <Calendar size={13} className="text-[var(--color-primary)] group-hover:text-black transition-colors duration-500" />
                Schedule a Call
              </span>

              <div
                className="
                  absolute
                  inset-0
                  bg-[var(--color-primary)]
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  -z-10
                "
              />
            </motion.button>

            {/* METRICS - Luxurious editorial block */}
            <div className="flex gap-10 border-l-0 sm:border-l border-white/10 pl-0 sm:pl-8 md:pl-10 py-1 justify-center sm:justify-start">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] leading-none mb-2 select-none font-display">
                  600+
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-bold">
                  Projects
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] leading-none mb-2 select-none font-display">
                  12+
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-bold">
                  Years Exp
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - PORTRAIT & VISUALLY ANCHORED NAVIGATION */}
        <div
          className="
            absolute
            lg:relative
            inset-0
            lg:inset-auto
            w-full
            h-full
            lg:flex-1
            lg:h-auto
            flex
            justify-end
            items-end
            lg:items-start
            lg:pt-12
            overflow-hidden
            lg:overflow-visible
            z-0
            lg:z-10
            pointer-events-none
            lg:pointer-events-auto
          "
        >
          {/* FAINT VERTICAL GRID LINE ANCHOR */}
          <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent pointer-events-none hidden xl:block z-20" />

          {/* EDITORIAL VISUALLY ANCHORED SIDEBAR NAVIGATION */}
          <div
            className="
              absolute
              right-12
              top-1/2
              -translate-y-1/2
              hidden
              xl:flex
              flex-col
              gap-8
              text-right
              z-30
              opacity-75
              hover:opacity-100
              transition-opacity
              duration-500
              mix-blend-difference
            "
          >
            {["ABOUT", "SERVICES", "CONTACT"].map((item, index) => {
              const isActive = item === "ABOUT";
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`
                    group
                    relative
                    ${isActive ? "text-[var(--color-primary)]" : "text-white/75"}
                    hover:text-[var(--color-primary)]
                    text-[10px]
                    font-bold
                    tracking-[0.35em]
                    flex
                    justify-end
                    items-center
                    gap-6
                    transition-colors
                    duration-300
                    py-2
                  `}
                  >
                    {item}
                    {/* Circular node aligned exactly on the vertical anchor line */}
                    <span
                      className={`
                      w-2
                      h-2
                      rounded-full
                      border
                      transition-all
                      duration-300
                      z-30
                      ${isActive
                          ? "bg-[var(--color-primary)] border-[var(--color-primary)] scale-125"
                          : "bg-white/30 border-white/40 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:scale-125"}
                      translate-x-[5px]
                    `}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* HERO PORTRAIT - Cinematic depth & facial lighting clarity */}
          <div
            className="
              absolute
              bottom-[8%]
              lg:bottom-0
              left-1/2
              -translate-x-1/2
              lg:left-auto
              lg:translate-x-0
              lg:right-[-12%]
              w-[115%]
              sm:w-[110%]
              lg:w-[125%]
              max-w-[850px]
              h-[95%]
              sm:h-[95%]
              lg:h-[105%]
              z-10
              pointer-events-none
            "
          >
            {/* Entry reveal motion wrapper */}
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.25,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full h-full"
            >
              {/* Loop floating motion wrapper */}
              <div
                className="relative w-full h-full"
              >
                {/* Cinematic Ambient Backdrop Blur */}
                <div
                  className="
                    absolute
                    bottom-[15%]
                    right-[15%]
                    w-[55%]
                    h-[60%]
                    bg-[var(--color-primary)]/[0.08]
                    blur-[140px]
                    rounded-full
                    -z-10
                  "
                />

                {/* Portrait Image with upgraded saturation/contrast for perfect facial clarity */}
                <Image
                  src="/dry.png"
                  alt="Jeffrey Portrait"
                  fill
                  priority
                  className="
                    object-contain
                    object-bottom
                    opacity-40
                    lg:opacity-95
                    saturate-85
                    contrast-[1.05]
                    drop-shadow-[0_10px_60px_rgba(0,0,0,0.6)]
                    z-10
                  "
                />

                {/* Edge-feathering Gradient Overlays Removed */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}