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
    { to: "/#blog", label: "BLOG" },
    { to: "/#about", label: "ABOUT" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`container mx-auto px-4 transition-all duration-300 ${
          isScrolled ? "max-w-4xl" : "max-w-7xl"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-2 transition-all duration-300 ${
            isScrolled
              ? "bg-[#F6F2EC]/90 backdrop-blur-md rounded-full shadow-[0_12px_40px_rgba(28,83,100,0.06)] border border-[#E3D9CE]/60"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-95 transition-opacity">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              width={160}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-300 ${
            !isScrolled 
              ? "px-6 py-1.5 bg-[#F6F2EC]/50 backdrop-blur-md rounded-full border border-[#E3D9CE]/30 shadow-[0_2px_12px_rgba(28,83,100,0.03)]" 
              : ""
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="group relative py-2 text-[#6E6660] hover:text-[#FF5A1F] text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#FF5A1F] transition-all duration-300 group-hover:w-[80%]" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="#start" className="inline-block">
              <button
                type="button"
                className="bg-[#1C5364] text-white hover:bg-[#FF5A1F] text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(28,83,100,0.15)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.25)] hover:-translate-y-[1px]"
              >
                Start the Journey
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#111111] hover:text-[#FF5A1F] transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
            {/* backdrop - clicking closes */}
            <div
              className="absolute inset-0 bg-black/15 backdrop-blur-xs"
              onClick={closeMenu}
            />

            {/* panel */}
            <div className="absolute top-[80px] left-4 right-4 mx-auto max-w-md">
              <div
                className="bg-[#F6F2EC]/95 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-[#E3D9CE]/80 transform transition duration-250"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-2">
                  <button onClick={closeMenu} aria-label="Close menu" className="p-2 text-[#111111] hover:text-[#FF5A1F] transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      href={item.to}
                      onClick={closeMenu}
                      className="block text-[#4E5355] hover:text-[#FF5A1F] text-center font-bold text-[12px] uppercase tracking-[0.25em] py-3.5 px-3 rounded-lg hover:bg-[#E3D9CE]/30 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link href="#start" onClick={closeMenu} className="pt-4 block">
                    <button
                      type="button"
                      className="w-full bg-[#1C5364] text-white font-bold uppercase tracking-[0.15em] text-[11px] py-3.5 rounded-lg shadow-md hover:bg-[#FF5A1F] transition-colors duration-200"
                    >
                      Start the Journey
                    </button>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
