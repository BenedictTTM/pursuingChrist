'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';

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
    { to: "/", label: "Home" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "" : ""}`}>
      <div
        className={`container mx-auto transition-all duration-300 ${isScrolled ? "max-w-4xl" : "max-w-7xl"}`}>
        <nav
          className={`flex items-center justify-between px-6 py-2 md:py-2.5 transition-all duration-300 ${
            isScrolled
              ? "bg-[var(--color-surface)]/80 backdrop-blur-md rounded-full border border-[var(--color-border)]/30 shadow-2xl shadow-black/80"
              : "bg-transparent border-b border-transparent"
          }`}>
          {/* Logo */}
          <div className="flex-1 md:flex-initial md:w-[150px]">
            <Link href="/" className="text-xl font-serif italic tracking-wide hover:text-[var(--color-primary)] transition-colors duration-300">
              Drai <span className="not-italic text-lg">ッ</span>
            </Link>
          </div>

          {/* Centered Desktop Nav Items */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-12">
            {navItems
              .filter(item => item.label !== "Contact")
              .map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className="relative text-xs uppercase tracking-[0.2em] font-bold text-white/80 hover:text-[var(--color-primary)] transition-colors duration-300 group py-1.5"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
          </div>

          {/* Right Side: Contact Button/Link on Desktop, Menu Button on Mobile */}
          <div className="flex items-center justify-end md:w-[150px]">
            {navItems
              .filter(item => item.label === "Contact")
              .map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className="hidden md:inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-black font-bold tracking-widest uppercase text-[10px] px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-[1.03]"
                >
                  {item.label}
                </Link>
              ))}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-[var(--color-primary)] transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
            {/* backdrop - clicking closes */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* panel */}
            <div className="absolute top-[20px] left-4 right-4 mx-auto max-w-md">
              <div
                className="bg-[var(--color-surface)]/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/90 p-6 border border-[var(--color-border)]/30 transform transition duration-250"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <Link href="/" onClick={closeMenu} className="text-xl font-serif italic tracking-wide text-white hover:text-[var(--color-primary)] transition-colors duration-300">
                    Drai <span className="not-italic text-lg">ッ</span>
                  </Link>
                  <button onClick={closeMenu} aria-label="Close menu" className="p-2 text-white/60 hover:text-[var(--color-primary)] hover:bg-white/5 rounded-full transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      href={item.to}
                      onClick={closeMenu}
                      className="block text-white/80 hover:text-[var(--color-primary)] text-sm uppercase tracking-[0.2em] py-4 px-4 rounded-xl text-center font-bold hover:bg-white/5 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  ))}
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
