"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "./BlogCard";
import LikeButton from "./LikeButton";
import { MessageSquare, Share2, ArrowRight, Clock, Calendar } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogProps {
    posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
    const [visibleCount, setVisibleCount] = useState(2);
    const targetRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effect bound to the hero image aspect frame
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(heroScrollProgress, [0, 1], ["0%", "15%"]);

    if (!posts || posts.length === 0) return null;

    const latestPost = posts[0];
    const gridPosts = posts.slice(1, visibleCount + 1);

    return (
        <section className="relative overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 px-4 md:px-6 lg:px-12 text-[#111111]" id="blog">
            {/* Ambient matching background overlays for soft, professional depth */}
            <div className="absolute inset-0 -z-10 bg-[#F6F2EC]" />
            <div className="absolute inset-0 -z-10  pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto">


                {/* ── Featured Latest Article Displayed Fully ── */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mb-10 p-4 md:p-8 0 border border-[#E3D9CE]/45 rounded-2xl"
                >
                    {/* ── Cohesive Editorial Header ── */}
                    <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
                        {/* Category */}
                        <div className="inline-block text-[#FF5A1F] text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
                            {latestPost.category || "Reflections"}
                        </div>

                        {/* Elegant Serif Title */}
                        <h1
                            className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.1] tracking-[-0.02em] mb-6 px-4"
                            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                            <Link href={`/blog/${latestPost.id}`} className="hover:text-[#FF5A1F] transition-colors duration-300">
                                {latestPost.title}
                            </Link>
                        </h1>

                        {/* Editorial Subtitle (Excerpt) */}
                        {latestPost.excerpt && (
                            <p 
                                className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#6E6559] leading-relaxed max-w-3xl mx-auto mb-8 px-4"
                                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                                {latestPost.excerpt}
                            </p>
                        )}

                        {/* Refined Meta Details */}
                        <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs text-[#8E8577] uppercase tracking-[0.2em] font-semibold">
                            <span>Jeffrey Drai</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E3D9CE]" />
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#FF5A1F] stroke-[2]" />
                                {new Date(latestPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E3D9CE]" />
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-[#1C5364] stroke-[2]" />
                                {latestPost.readTime || "5 min"} read
                            </span>
                        </div>
                    </div>

                    {/* Parallax Hero Image Container */}
                    <div
                        ref={targetRef}
                        className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-white/70 border border-[#E3D9CE]/60 p-2 group/image shadow-[0_8px_30px_rgba(28,83,100,0.02)] mb-12 md:mb-16"
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                            <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                                <Image
                                    src={latestPost.image || "/dry.png"}
                                    alt={latestPost.title}
                                    fill
                                    className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.02]"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 1200px"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Asymmetric Editorial Dual-Column Reading Structure */}
                    <div className="max-w-[1000px] mx-auto px-0 relative overflow-x-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Sticky Sidebar */}
                            <div className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6 text-[#6E6559] text-left">
                                <div className="space-y-1.5 border-l border-[#1C5364]/30 pl-3 font-sans">
                                    <span className="text-[10px] text-[#6E6559] tracking-wider uppercase block font-bold">Reading Status</span>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#1C5364]">Active Journal</span>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-sans tracking-widest uppercase text-[#6E6559] font-bold">Author</h4>
                                    <p className="text-sm font-serif font-bold text-[#111111]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Jeffrey Drai</p>
                                    <p className="text-[10px] text-[#6E6559] leading-normal font-semibold">Faith & Discipleship</p>
                                </div>

                                <div className="pt-5 border-t border-[#E3D9CE]/50 space-y-5">
                                    <div className="flex items-center gap-2">
                                        <LikeButton postId={latestPost.id} initialLikes={latestPost.likesCount || 0} className="scale-95" />
                                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#6E6559] font-bold">Appreciate</span>
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <h4 className="text-[10px] font-sans tracking-widest uppercase text-[#6E6559] mb-2 font-bold">Share</h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(latestPost.title)}&url=${encodeURIComponent(postUrl)}`, '_blank');
                                                }}
                                                className="group w-10 h-10 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Twitter</span>
                                                <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
                                                }}
                                                className="group w-10 h-10 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Facebook</span>
                                                <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(latestPost.title)}`, '_blank');
                                                }}
                                                className="group w-10 h-10 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Article Body Column */}
                            <div className="col-span-1 lg:col-span-9 w-full min-w-0 overflow-x-hidden text-left">
                                {/* Mobile & Tablet Editorial Meta Bar (Visible only on lg:hidden) */}
                                <div className="lg:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 mb-8 rounded-2xl bg-white/40 border border-[#E3D9CE]/50 font-sans shadow-[0_4px_20px_rgba(28,83,100,0.01)]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#1C5364]/10 flex items-center justify-center font-serif text-[#1C5364] font-bold text-sm border border-[#1C5364]/20 shadow-inner">
                                            JD
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#111111]">Jeffrey Drai</p>
                                            <p className="text-[10px] text-[#6E6559] font-semibold uppercase tracking-wider text-left">Faith & Discipleship</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E3D9CE]/40">
                                        <div className="flex items-center gap-2">
                                            <LikeButton postId={latestPost.id} initialLikes={latestPost.likesCount || 0} className="scale-90" />
                                            <span className="text-[10px] font-sans tracking-widest uppercase text-[#6E6559] font-bold">Appreciate</span>
                                        </div>
                                        <div className="flex items-center gap-2 ml-auto sm:ml-0">
                                            <span className="text-[10px] font-sans tracking-widest uppercase text-[#6E6559] mr-1 font-bold">Share:</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(latestPost.title)}&url=${encodeURIComponent(postUrl)}`, '_blank');
                                                    }}
                                                    className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                                >
                                                    <span className="sr-only">Twitter</span>
                                                    <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
                                                    }}
                                                    className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                                >
                                                    <span className="sr-only">Facebook</span>
                                                    <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(latestPost.title)}`, '_blank');
                                                    }}
                                                    className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                                >
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-3.5 h-3.5 text-[#6E6559] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Prose Body */}
                                {latestPost.content && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className={`
                                            prose prose-neutral
                                            w-full max-w-[680px] mx-auto
                                            break-words
                                            [word-break:break-word]
                                            [overflow-wrap:anywhere]

                                            /* Base Font Override: Premium Cormorant Garamond Serif for ultimate readability */
                                            prose-p:font-serif prose-p:text-[17px] md:prose-p:text-[19px] prose-p:leading-[1.85] prose-p:text-[#2F3335] prose-p:mb-8 md:prose-p:mb-10 prose-p:font-light

                                            /* Headings styling with rich vertical margins */
                                            prose-headings:text-[#111111] prose-headings:tracking-tight prose-headings:font-serif
                                            prose-h2:text-2xl md:prose-h2:text-[2rem] prose-h2:leading-[1.2] prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#E3D9CE]/40
                                            prose-h3:text-xl md:prose-h3:text-[1.5rem] prose-h3:leading-[1.3] prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4

                                            /* Links with micro-interactivity */
                                            prose-a:text-[#1C5364] prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-[#1C5364]/20 hover:prose-a:border-[#1C5364] prose-a:transition-colors prose-a:duration-300

                                            /* Elegant Pull Quotes - Centered, quotes symbols, borderless */
                                            prose-blockquote:border-none prose-blockquote:pl-0 prose-blockquote:my-12 prose-blockquote:mx-auto prose-blockquote:text-center prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-xl md:prose-blockquote:text-[1.65rem] prose-blockquote:leading-relaxed prose-blockquote:text-[#FF5A1F]

                                            prose-strong:font-semibold prose-strong:text-[#111111]

                                            /* List items with matching font and leading */
                                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-ul:space-y-3 prose-ul:text-[#2F3335]
                                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-8 prose-ol:space-y-3 prose-ol:text-[#2F3335]
                                            prose-li:font-serif prose-li:text-[17px] md:prose-li:text-[19px] prose-li:leading-[1.8] prose-li:font-light

                                            prose-code:text-[#111111] prose-code:bg-white/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-code:break-all

                                            prose-pre:bg-white/30 prose-pre:border prose-pre:border-[#E3D9CE]/60 prose-pre:p-3 md:prose-pre:p-4 prose-pre:rounded-lg prose-pre:font-mono prose-pre:text-xs md:prose-pre:text-sm prose-pre:overflow-x-auto prose-pre:max-w-full

                                            prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg

                                            [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full
                                            [&_pre]:max-w-full [&_pre]:overflow-x-auto
                                            [&_img]:max-w-full [&_img]:h-auto
                                            [&_*]:max-w-full
                                        `}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: latestPost.content }} />
                                    </motion.div>
                                )}

                                {/* Premium Discussion & Reflections Callout Card */}
                                <div className="mt-12 p-6 md:p-8 rounded-2xl bg-white/50 border border-[#E3D9CE]/60 shadow-[0_8px_32px_rgba(28,83,100,0.02)]">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2 text-left">
                                            <h4 className="font-serif text-lg md:text-xl font-bold text-[#111111]">
                                                Join the Discussion & Reflections
                                            </h4>
                                            <p className="text-xs md:text-sm text-[#6E6559] leading-relaxed max-w-md font-sans">
                                                Engage with other readers on this article, or subscribe to receive Jeffrey's latest weekly faith and discipleship entries directly in your inbox.
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full md:w-auto min-w-[200px]">
                                            <Link
                                                href={`/blog/${latestPost.id}`}
                                                className="inline-flex items-center justify-center rounded-xl bg-[#1C5364] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#FF5A1F] transition-colors duration-300 shadow-[0_4px_12px_rgba(28,83,100,0.15)] hover:shadow-[0_4px_12px_rgba(255,90,31,0.2)]"
                                            >
                                                View Discussion
                                                <ArrowRight className="ml-2 w-3.5 h-3.5 stroke-[2.5]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Remaining Posts Grid Divider ── */}
                {gridPosts.length > 0 && (
                    <>
                        <div className="w-full h-px bg-[#E3D9CE]/50 my-10" />

                        <div className="mb-6 text-left">
                            <h4
                                className="text-xs font-bold text-[#6E6559] uppercase tracking-[0.25em] mb-1.5"
                            >
                                More Publications
                            </h4>
                            <div className="w-8 h-[1.5px] bg-[#1C5364]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                            {gridPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                {/* ── View All Trigger ── */}
                {visibleCount + 1 < posts.length && (
                    <div className="flex justify-center mt-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center rounded-[8px] border border-[#C8BFB3] bg-white/60 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#3E4F53] shadow-[0_8px_16px_rgba(17,17,17,0.04)] transition-all hover:border-[#AFA59A] hover:bg-white/90 hover:text-[#1C5364] hover:shadow-[0_10px_20px_rgba(17,17,17,0.08)] active:translate-y-[1px] duration-300"
                        >
                            View All Articles
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
