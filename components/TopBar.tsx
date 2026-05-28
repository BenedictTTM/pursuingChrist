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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#F6F4F1]/90 backdrop-blur-sm border-b border-[#E3DED7] pt-4">
      <div className="mx-auto w-full px-6 py-2 md:px-12 md:py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300 block">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={160} 
              height={80} 
              className="h-16 w-auto object-contain" 
            />
          </Link>

          {/* Centered Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="text-[#6B6B6B] hover:text-[#111111] text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side: CTA on Desktop, Menu Button on Mobile */}
          <div className="flex items-center justify-end">
            {/* Start The Journey */}
            <Link href="#start" className="hidden lg:flex flex-col text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] hover:text-[#FF5A1F] transition-colors">
              <span className="leading-tight">START THE</span>
              <span className="leading-tight">JOURNEY</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#111111] hover:text-[#FF5A1F] transition-colors"
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
          <div className="lg:hidden fixed inset-0 top-[80px] z-40 bg-[#F6F4F1] overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex flex-col px-6 py-8 gap-8">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={closeMenu}
                    className="text-[#111111] text-lg font-bold uppercase tracking-[0.2em]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="w-full h-px bg-[#E3DED7]" />

              <div className="flex flex-col gap-6">
                <Link href="#start" onClick={closeMenu} className="text-[#FF5A1F] text-lg font-bold uppercase tracking-[0.2em]">
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
