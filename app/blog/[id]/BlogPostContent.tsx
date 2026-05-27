"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { useRef, useState } from "react";
import LikeButton from "@/components/LikeButton";

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effect bound to the hero image aspect frame
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(heroScrollProgress, [0, 1], ["0%", "15%"]);

    // Overall page scroll progress for the elegant satin reading progress timeline
    const { scrollYProgress: pageScrollProgress } = useScroll();

    // Spring physics scroll timeline
    const scaleX = useSpring(pageScrollProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Magnetic back coordinates
    const [backCoords, setBackCoords] = useState({ x: 0, y: 0 });
    const handleBackMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setBackCoords({ x: x * 0.25, y: y * 0.25 });
    };
    const handleBackMouseLeave = () => {
        setBackCoords({ x: 0, y: 0 });
    };

    if (!post) return null;

    const dateObj = new Date(post.date);

    return (
        <div
            className="min-h-screen bg-[#FAF9F6] text-[#1C1C21] font-sans relative overflow-x-hidden antialiased w-full"
            style={{
                ['--color-text-primary' as any]: '#1C1C21',
                ['--color-text-secondary' as any]: '#4E4F5A',
                ['--color-text-muted' as any]: '#8E919A',
                ['--color-border' as any]: 'rgba(197, 165, 118, 0.12)',
                ['--color-border-light' as any]: 'rgba(197, 165, 118, 0.22)',
                ['--color-mba-text-primary' as any]: '#1C1C21',
                ['--color-mba-text-grey' as any]: '#4E4F5A',
                ['--color-mba-border' as any]: 'rgba(197, 165, 118, 0.12)',
                ['--color-mba-gold' as any]: '#C5A576',
                ['--color-mba-background' as any]: '#FAF9F6',
                ['--color-background' as any]: '#FAF9F6',
                ['--color-background-secondary' as any]: '#F4ECE1',
                ['--color-surface' as any]: '#FFFFFF',
                ['--color-primary' as any]: '#C5A576',
            }}
        >
            {/* Satin Reading Progress Line */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[1.5px] bg-[var(--color-primary)] z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Fine architectural layout grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,165,118,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,165,118,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-10" />
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/10 to-transparent pointer-events-none" />

            {/* Scholarly Index Markers */}
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-18 md:pt-28 flex justify-between items-center text-[9px] text-[var(--color-text-muted)] tracking-[0.35em] uppercase select-none pointer-events-none font-mono">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/40 animate-pulse" />
                    Seq. 06 <span className="hidden sm:inline">// Editorial Journal</span>
                </span>
                <span>Index Ledger <span className="hidden sm:inline">// Vol. 2.6</span></span>
            </div>

            <main className="pb-24 relative w-full overflow-x-hidden selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-text-primary)]">
                {/* Back navigation */}
                <nav className="absolute top-0 left-0 w-full z-30 px-4 md:px-12 flex justify-between items-center pointer-events-none py-6">
                    <Link
                        href="/blog"
                        onMouseMove={handleBackMouseMove}
                        onMouseLeave={handleBackMouseLeave}
                        className="group pointer-events-auto inline-flex items-center text-[10px] font-medium tracking-[0.25em] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-all duration-300 uppercase py-2"
                    >
                        <motion.span
                            animate={{ x: backCoords.x, y: backCoords.y }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
                            className="relative flex items-center justify-center w-6 h-6 mr-3 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-[var(--color-primary)]" />
                        </motion.span>
                        Back to Journal
                    </Link>
                </nav>

                <article className="pt-20 md:pt-28 w-full overflow-x-hidden">
                    {/* Header Title Section */}
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 mb-12 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6 select-none font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-[var(--color-primary)] uppercase font-bold">
                                <span>{post.category || "Editorial"}</span>
                            </div>

                            <h1 className="font-serif font-light text-[clamp(2rem,5.5vw,4rem)] text-[var(--color-text-primary)] tracking-tight leading-[1.12] mb-6 md:mb-8 break-words hyphens-auto px-2 md:px-0">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] text-[var(--color-text-secondary)] font-mono uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)] stroke-[1.5]" />
                                    {dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                                <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/30" />
                                <span className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-[var(--color-primary)] stroke-[1.5]" />
                                    {post.readTime || "5 min"} read
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Parallax Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12 md:mb-28"
                    >
                        <div
                            ref={targetRef}
                            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border)] p-1.5 group/image shadow-[0_30px_60px_rgba(28,28,33,0.03)]"
                        >
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--color-primary)]/20 z-20 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--color-primary)]/20 z-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--color-primary)]/20 z-20 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--color-primary)]/20 z-20 pointer-events-none" />

                            <div className="relative w-full h-full overflow-hidden rounded-lg">
                                <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.03]"
                                        priority
                                        sizes="100vw"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Asymmetric Editorial Dual-Column Reading Structure */}
                    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 relative overflow-x-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                            {/* Sticky Sidebar */}
                            <div className="hidden lg:block lg:col-span-3 sticky top-32 space-y-8 text-[var(--color-text-secondary)]">
                                <div className="space-y-2 border-l border-[var(--color-primary)]/35 pl-4 font-mono">
                                    <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase block">Reading Status</span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">In Progress</span>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-text-muted)]">Author</h4>
                                    <p className="text-xs font-serif font-medium text-[var(--color-text-primary)]">Jeffrey Mawusi Drai</p>
                                    <p className="text-[10px] text-[var(--color-text-muted)] leading-normal">Bioengineering Scholar</p>
                                </div>

                                <div className="pt-6 border-t border-[var(--color-border)] space-y-6">
                                    <div className="flex items-center gap-3">
                                        <LikeButton postId={post.id} initialLikes={post.likesCount || 0} className="scale-110" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)]">Appreciate</span>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)] mb-3">Share</h4>
                                        <div className="flex gap-2.5">
                                            <button
                                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`, '_blank')}
                                                className="group w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Twitter</span>
                                                <svg className="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
                                                className="group w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Facebook</span>
                                                <svg className="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`, '_blank')}
                                                className="group w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Article Body Column */}
                            <div className="col-span-1 lg:col-span-9 w-full min-w-0 overflow-x-hidden">

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="relative pl-5 md:pl-8 border-l-2 border-[var(--color-primary)] mb-10 md:mb-16"
                                    >
                                        <p className="text-[1.25rem] md:text-[1.5rem] leading-relaxed text-[var(--color-text-primary)] font-serif italic font-light tracking-wide break-words hyphens-auto">
                                            {post.excerpt}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Main Prose Body */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className={`
                                        prose prose-neutral
                                        w-full max-w-full overflow-x-hidden
                                        break-words
                                        [word-break:break-word]
                                        [overflow-wrap:anywhere]

                                        prose-headings:font-serif prose-headings:text-[var(--color-text-primary)] prose-headings:font-light prose-headings:tracking-tight
                                        prose-h2:text-2xl md:prose-h2:text-[2.25rem] prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-[var(--color-border)]
                                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-4

                                        prose-p:font-sans prose-p:text-[16px] md:prose-p:text-[17px] prose-p:leading-[1.8] md:prose-p:leading-[1.85] prose-p:text-[var(--color-text-secondary)] prose-p:mb-6 md:prose-p:mb-8 prose-p:font-normal

                                        prose-a:text-[var(--color-primary)] prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-[var(--color-primary)]/20 hover:prose-a:border-[var(--color-primary)] prose-a:transition-all prose-a:duration-300

                                        prose-blockquote:border-l-2 prose-blockquote:border-[var(--color-primary)] prose-blockquote:pl-5 md:prose-blockquote:pl-6 prose-blockquote:pr-5 md:prose-blockquote:pr-6 prose-blockquote:py-4 md:prose-blockquote:py-6 prose-blockquote:my-8 md:prose-blockquote:my-12 prose-blockquote:italic prose-blockquote:text-lg md:prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-[var(--color-text-primary)] prose-blockquote:bg-[var(--color-background-secondary)]/20 prose-blockquote:rounded-r-lg

                                        prose-strong:font-semibold prose-strong:text-[var(--color-text-primary)]

                                        prose-ul:list-disc prose-ul:pl-5 md:prose-ul:pl-6 prose-ul:mb-6 md:prose-ul:mb-8 prose-ul:space-y-2 md:prose-ul:space-y-3 prose-ul:text-[var(--color-text-secondary)] prose-ul:font-normal
                                        prose-ol:list-decimal prose-ol:pl-5 md:prose-ol:pl-6 prose-ol:mb-6 md:prose-ol:mb-8 prose-ol:space-y-2 md:prose-ol:space-y-3 prose-ol:text-[var(--color-text-secondary)] prose-ol:font-normal
                                        prose-li:text-[15px] md:prose-li:text-[16px] prose-li:leading-relaxed

                                        prose-code:text-[var(--color-text-primary)] prose-code:bg-[var(--color-background-secondary)]/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-code:break-all

                                        prose-pre:bg-[var(--color-background-secondary)]/40 prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:p-3 md:prose-pre:p-4 prose-pre:rounded-lg prose-pre:font-mono prose-pre:text-xs md:prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:max-w-full

                                        prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg

                                        [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full
                                        [&_pre]:max-w-full [&_pre]:overflow-x-auto
                                        [&_img]:max-w-full [&_img]:h-auto
                                        [&_*]:max-w-full
                                    `}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                                </motion.div>

                                {/* Bottom Sharing Row */}
                                <div className="mt-20 pt-10 border-t border-[var(--color-border)] flex flex-col items-center text-center">
                                    <div className="mb-8 lg:hidden invisible h-0 overflow-hidden">
                                        <LikeButton postId={post.id} initialLikes={post.likesCount || 0} className="scale-125 gap-2" />
                                    </div>

                                    <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--color-text-muted)] uppercase mb-6 select-none">Share this Article</span>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`, '_blank')}
                                            className="group w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 hover:scale-105 cursor-pointer"
                                        >
                                            <span className="sr-only">Twitter</span>
                                            <svg className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                        </button>
                                        <button
                                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
                                            className="group w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 hover:scale-105 cursor-pointer"
                                        >
                                            <span className="sr-only">Facebook</span>
                                            <svg className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                        </button>
                                        <button
                                            onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`, '_blank')}
                                            className="group w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-all duration-300 hover:scale-105 cursor-pointer"
                                        >
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </article>
            </main>

            {/* Mobile Floating Action Dock */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[280px] px-4 py-2.5 bg-[#FAF9F6]/85 backdrop-blur-xl border border-[var(--color-border)] rounded-full shadow-[0_20px_50px_rgba(28,28,33,0.08)] flex justify-between items-center"
            >
                <div className="flex items-center gap-1.5">
                    <LikeButton postId={post.id} initialLikes={post.likesCount || 0} className="scale-105" />
                    <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-secondary)] uppercase">Appreciate</span>
                </div>
                <div className="w-[1px] h-4 bg-[var(--color-border)]" />
                <div className="flex gap-2">
                    <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`, '_blank')}
                        className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] group/tw transition-all duration-300 cursor-pointer"
                    >
                        <svg className="w-3 h-3 text-[var(--color-text-secondary)] group-hover/tw:text-[#FAF9F6] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')}
                        className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] group/link transition-all duration-300 cursor-pointer"
                        title="Copy Link"
                    >
                        <svg className="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover/link:text-[#FAF9F6] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l8.99 4.994m0 0a3 3 0 100-4.992M17.674 15.736a3 3 0 11-4.988-2.736M8.684 10.742a3 3 0 114.988-2.736" /></svg>
                    </button>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}