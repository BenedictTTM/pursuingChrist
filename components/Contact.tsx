"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = "jeffrey.drai@yorku.ca";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="contact"
            className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#F6F2EC] overflow-hidden  px-4 md:px-6 lg:px-12 text-[#111111]"
        >
            {/* Ambient background wash & depth matching Blog / SplitHero */}
            <div className="absolute inset-0 -z-10 bg-[#F6F2EC]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(circle_at_15%_85%,rgba(240,230,218,0.6),transparent_55%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">

                {/* ── Pill badge ── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C5364]/10 text-[#1C5364] text-[10px] uppercase tracking-[0.25em] font-bold mb-4"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                    Get In Touch
                </motion.div>

                {/* ── Title / Heading ── */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-extrabold text-[#111111] uppercase tracking-tight text-center mb-6"
                    style={{
                        fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                        letterSpacing: "-0.04em",
                    }}
                >
                    Let's Connect & <span className="text-[#FF5A1F]">Collaborate</span>
                </motion.h2>

                {/* ── Accent Line Divider ── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-16 h-[2px] bg-[#E3D9CE] mb-8 origin-center"
                />

                {/* ── Subtitle / Quote ── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-[#4e5355] font-poppins italic text-center max-w-2xl mb-14 leading-relaxed"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                    "Available for academic collaboration, speaking engagements, and theological consultation."
                </motion.p>

                {/* ── Direct Contact Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl p-8 md:p-14 shadow-[0_12px_40px_rgba(28,83,100,0.03)] text-center relative group mb-5"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1C5364] flex items-center justify-center text-white shadow-md">
                        <Mail className="w-5 h-5" />
                    </div>

                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#FF5A1F] font-bold mb-5 mt-2">
                        Direct Email Address
                    </h3>

                    <div className="relative inline-flex flex-col md:flex-row items-center gap-4 justify-center">
                        <a
                            href={`mailto:${email}`}
                            className="text-2xl sm:text-3xl md:text-4xl font-poppins text-[#1C5364] hover:text-[#FF5A1F] transition-colors duration-300 tracking-tight break-all"
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                            {email}
                        </a>

                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center p-2.5 rounded-lg bg-white/90 border border-[#C8BFB3]/50 text-[#3E4F53] hover:text-[#1C5364] hover:border-[#1C5364] shadow-[0_4px_12px_rgba(17,17,17,0.04)] transition-all active:scale-95 duration-200"
                            title="Copy to clipboard"
                            aria-label="Copy email"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-600 uppercase tracking-widest"
                        >
                            Copied to Clipboard!
                        </motion.span>
                    )}

                    <div className="mt-12 flex justify-center">
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex rounded-[10px] bg-[#1C5364] px-8 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_28px_rgba(12,34,40,0.18),0_4px_0_#0F3845] transition-all hover:-translate-y-[1px] hover:shadow-[0_18px_32px_rgba(12,34,40,0.22),0_5px_0_#0F3845] active:translate-y-[1px] active:shadow-[0_12px_24px_rgba(12,34,40,0.15),0_3px_0_#0F3845]"
                        >
                            Send Email
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
