import Link from "next/link";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] overflow-hidden">
            {/* Ambient luxury glow overlay */}
            <div className="absolute bottom-0 right-[-10%] w-[35%] h-[70%] bg-[var(--color-primary)]/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-0 left-[-10%] w-[35%] h-[70%] bg-[var(--color-primary)]/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Column 1: Editorial Branding & Bio */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                                <Image 
                                    src="/logo-transparent.png" 
                                    alt="Logo" 
                                    width={120} 
                                    height={60} 
                                    className="h-12 w-auto object-contain"
                                />
                            </Link>
                        </div>
                        <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.8] font-serif italic font-light max-w-md" style={{ fontFamily: "var(--font-cormorant)" }}>
                            Ghanaian bioengineering researcher and scholar based at York University. Dedicated to bridging the gap between biological complexity, technological precision, and advanced computational engineering.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/#about"
                                className="inline-flex items-center text-[10px] font-bold tracking-[0.25em] text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors duration-300 uppercase group"
                            >
                                Read Full Biography
                                <span className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div className="lg:col-span-3 lg:col-start-7 space-y-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] font-display">
                            Navigation
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/#about", label: "About" },
                                { href: "/#contact", label: "Contact" },
                                { href: "/blog", label: "Blog" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="inline-flex items-center text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:translate-x-1 transition-all duration-300 tracking-wide font-sans font-light group">
                                        <span className="w-0 group-hover:w-3.5 h-[1px] bg-[var(--color-primary)] mr-0 group-hover:mr-2.5 transition-all duration-300 block"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Inquiries & Socials */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] font-display">
                            Connect
                        </h3>
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-semibold font-sans">For inquiries:</p>
                            <a 
                                href="mailto:jeffrey.drai@yorku.ca" 
                                className="text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-300 inline-block pb-1 border-b border-[var(--color-border)] hover:border-[var(--color-primary)]"
                            >
                                jeffrey.drai@yorku.ca
                            </a>
                        </div>
                        <div className="flex gap-3.5 pt-4">
                            {[
                                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { Icon: Mail, href: "mailto:jeffrey.drai@yorku.ca", label: "Email" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/[0.08] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Divider / Calibration Line */}
                <div className="mt-16 md:mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-6 relative">
                    {/* Precision technical marker */}
                    <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[var(--color-primary)]/40 hidden sm:block" />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[10px] text-[var(--color-text-muted)] tracking-[0.15em] font-mono uppercase">
                        <span>© {currentYear} Jeffrey Drai. All rights reserved.</span>
                        <span className="hidden sm:inline text-[var(--color-border)]">|</span>
                        <span>SYS_COORD_04 // FOOTER</span>
                    </div>
                    
                    <div className="flex gap-6 text-[10px] tracking-[0.2em] font-bold uppercase">
                        <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
