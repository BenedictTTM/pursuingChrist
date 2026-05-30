'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/#about", label: "ABOUT" },
    { to: "/#contact", label: "CONTACT" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    // lock body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-[#F4F1EC]/95 shadow-[0_10px_30px_rgba(15,15,15,0.08)] backdrop-blur"
          : "bg-[#F4F1EC]/80 backdrop-blur-sm"
      } border-[#E2DCD5]`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-1 md:px-12 md:py-1">
        <nav className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300 block">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={230} 
              height={110} 
              className="h-20 w-auto object-contain md:h-[84px]" 
            />
          </Link>

          {/* Centered Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="text-[#6E6660] hover:text-[#111111] text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side: CTA on Desktop, Menu Button on Mobile */}
          <div className="flex items-center justify-end">
            {/* Start The Journey */}
            <Link
              href="#start"
              className="hidden lg:inline-flex items-center rounded-full border border-[#D9D2CA] px-6 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#111111] transition-all hover:border-[#F15A24] hover:text-[#F15A24]"
            >
              Start the Journey
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#111111] hover:text-[#F15A24] transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[80px] z-40 bg-[#F4F1EC] overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex flex-col px-6 py-8 gap-8">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={closeMenu}
                    className="text-[#111111] text-lg font-semibold uppercase tracking-[0.28em]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="w-full h-px bg-[#E2DCD5]" />

              <div className="flex flex-col gap-6">
                <Link href="#start" onClick={closeMenu} className="text-[#F15A24] text-lg font-bold uppercase tracking-[0.28em]">
                  Start The Journey
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
