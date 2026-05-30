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
        <section className="relative overflow-hidden bg-[#F6F2EC] pt-12 pb-20 md:pt-16 md:pb-20 lg:pt-17 lg:pb-28 xl:pt-20 xl:pb-30 px-4 md:px-6 lg:px-12 xl:px-20 text-[#111111]" id="blog">
            {/* Ambient matching background overlays for soft, professional depth */}
            <div className="absolute inset-0 -z-10 bg-[#F6F2EC]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.7),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(240,230,218,0.5),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
                
                {/* ── Section Title ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C5364]/10 text-[#1C5364] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                        Insights & Faith
                    </div>

                    <h2 
                        className="text-3xl md:text-5xl font-extrabold text-[#111111] uppercase mb-4 tracking-tight"
                        style={{
                            fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                            letterSpacing: "-0.04em",
                        }}
                    >
                        Explore our <span className="text-[#FF5A1F]">Blog</span> & Articles
                    </h2>
                    <div className="w-16 h-[2px] bg-[#E3D9CE] mx-auto mt-6" />
                </motion.div>

                {/* ── Featured Latest Article Displayed Fully ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20 bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl p-6 md:p-12 shadow-[0_12px_40px_rgba(28,83,100,0.03)]"
                >
                    {/* Header Title Section */}
                    <div className="mb-12 md:mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C5364]/10 text-[#1C5364] text-[10px] uppercase tracking-[0.25em] font-bold mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                            {latestPost.category || "Reflections"}
                        </div>

                        <h3 
                            className="font-extrabold text-[clamp(1.75rem,4vw,3rem)] text-[#111111] uppercase tracking-tight leading-[1.1] mb-6 md:mb-8 px-2 md:px-0"
                            style={{
                                fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                                letterSpacing: "-0.04em",
                            }}
                        >
                            <Link href={`/blog/${latestPost.id}`} className="hover:text-[#FF5A1F] transition-colors duration-300">
                                {latestPost.title}
                            </Link>
                        </h3>

                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] text-[#8C8275] uppercase tracking-widest font-semibold">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-[#FF5A1F] stroke-[2]" />
                                {new Date(latestPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#E3D9CE]" />
                            <span className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-[#1C5364] stroke-[2]" />
                                {latestPost.readTime || "5 min"} read
                            </span>
                        </div>
                    </div>

                    {/* Parallax Hero Image Container */}
                    <div
                        ref={targetRef}
                        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 p-3 sm:p-4 group/image shadow-[0_12px_40px_rgba(28,83,100,0.03)] mb-12 md:mb-16"
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                            <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                                <Image
                                    src={latestPost.image || "/dry.png"}
                                    alt={latestPost.title}
                                    fill
                                    className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.03]"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 1200px"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Asymmetric Editorial Dual-Column Reading Structure */}
                    <div className="max-w-[1100px] mx-auto px-0 relative overflow-x-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            {/* Sticky Sidebar */}
                            <div className="hidden lg:block lg:col-span-3 sticky top-32 space-y-8 text-[#4e5355] text-left">
                                <div className="space-y-2 border-l border-[#1C5364]/30 pl-4 font-sans">
                                    <span className="text-[10px] text-[#8C8275] tracking-wider uppercase block font-bold">Reading Status</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#1C5364]">Active Journal</span>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-sans tracking-widest uppercase text-[#8C8275] font-bold">Author</h4>
                                    <p className="text-xs font-serif font-bold text-[#111111]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>Jeffrey Drai</p>
                                    <p className="text-[10px] text-[#8C8275] leading-normal font-semibold">Faith & Discipleship</p>
                                </div>

                                <div className="pt-6 border-t border-[#E3D9CE]/60 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <LikeButton postId={latestPost.id} initialLikes={latestPost.likesCount || 0} className="scale-110" />
                                        <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C8275] font-bold">Appreciate</span>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <h4 className="text-[10px] font-sans tracking-widest uppercase text-[#8C8275] mb-3 font-bold">Share</h4>
                                        <div className="flex gap-2.5">
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(latestPost.title)}&url=${encodeURIComponent(postUrl)}`, '_blank');
                                                }}
                                                className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Twitter</span>
                                                <svg className="w-3.5 h-3.5 text-[#4e5355] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
                                                }}
                                                className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">Facebook</span>
                                                <svg className="w-3.5 h-3.5 text-[#4e5355] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(latestPost.title)}`, '_blank');
                                                }}
                                                className="group w-8 h-8 rounded-full border border-[#C8BFB3]/50 flex items-center justify-center hover:border-[#1C5364] hover:bg-[#1C5364] transition-all duration-300 cursor-pointer"
                                            >
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="w-3.5 h-3.5 text-[#4e5355] group-hover:text-[#F6F2EC] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Article Body Column */}
                            <div className="col-span-1 lg:col-span-9 w-full min-w-0 overflow-x-hidden text-left">
                                {/* Excerpt */}
                                {latestPost.excerpt && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="relative pl-5 md:pl-8 border-l-2 border-[#FF5A1F] mb-10 md:mb-16"
                                    >
                                        <p className="text-[1.25rem] md:text-[1.5rem] leading-relaxed text-[#111111] font-serif italic font-light tracking-wide break-words hyphens-auto" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                                            {latestPost.excerpt}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Main Prose Body */}
                                {latestPost.content && (
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

                                            prose-headings:font-serif prose-headings:text-[#111111] prose-headings:font-light prose-headings:tracking-tight
                                            prose-h2:text-2xl md:prose-h2:text-[2.25rem] prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-[#E3D9CE]/60
                                            prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:mb-4

                                            prose-p:font-sans prose-p:text-[16px] md:prose-p:text-[17px] prose-p:leading-[1.8] md:prose-p:leading-[1.85] prose-p:text-[#4e5355] prose-p:mb-6 md:prose-p:mb-8 prose-p:font-normal

                                            prose-a:text-[#1C5364] prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-[#1C5364]/20 hover:prose-a:border-[#1C5364] prose-a:transition-all prose-a:duration-300

                                            prose-blockquote:border-l-2 prose-blockquote:border-[#FF5A1F] prose-blockquote:pl-5 md:prose-blockquote:pl-6 prose-blockquote:pr-5 md:prose-blockquote:pr-6 prose-blockquote:py-4 md:prose-blockquote:py-6 prose-blockquote:my-8 md:prose-blockquote:my-12 prose-blockquote:italic prose-blockquote:text-lg md:prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-[#111111] prose-blockquote:bg-white/40 prose-blockquote:rounded-r-lg

                                            prose-strong:font-semibold prose-strong:text-[#111111]

                                            prose-ul:list-disc prose-ul:pl-5 md:prose-ul:pl-6 prose-ul:mb-6 md:prose-ul:mb-8 prose-ul:space-y-2 md:prose-ul:space-y-3 prose-ul:text-[#4e5355] prose-ul:font-normal
                                            prose-ol:list-decimal prose-ol:pl-5 md:prose-ol:pl-6 prose-ol:mb-6 md:prose-ol:mb-8 prose-ol:space-y-2 md:prose-ol:space-y-3 prose-ol:text-[#4e5355] prose-ol:font-normal
                                            prose-li:text-[15px] md:prose-li:text-[16px] prose-li:leading-relaxed

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

                                {/* Featured Post Footer Actions */}
                                <div className="border-t border-[#E3D9CE]/50 mt-16 pt-8 flex items-center justify-between">
                                    <Link
                                        href={`/blog/${latestPost.id}`}
                                        className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase text-[#1C5364] hover:text-[#FF5A1F] transition-colors duration-300"
                                    >
                                        View Post Discussion
                                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                    </Link>

                                    <div className="flex items-center gap-5 text-[#8C8275]">
                                        <LikeButton postId={latestPost.id} initialLikes={latestPost.likesCount || 0} />
                                        <button 
                                            onClick={() => {
                                                const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${latestPost.id}` : '';
                                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(latestPost.title)}&url=${encodeURIComponent(postUrl)}`, '_blank');
                                            }}
                                            className="hover:text-[#FF5A1F] transition-colors" 
                                            aria-label="Share on Twitter"
                                        >
                                            <Share2 className="w-5 h-5 stroke-[1.5]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Remaining Posts Grid Divider ── */}
                {gridPosts.length > 0 && (
                    <>
                        <div className="w-full h-px bg-[#E3D9CE]/60 my-16" />
                        
                        <div className="mb-10 text-left">
                            <h4 
                                className="text-xs font-bold text-[#8C8275] uppercase tracking-[0.3em] mb-2"
                            >
                                More Publications
                            </h4>
                            <div className="w-12 h-[2px] bg-[#1C5364]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
                            {gridPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                {/* ── View All Trigger ── */}
                {visibleCount + 1 < posts.length && (
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/blog"
                            className="inline-flex items-center rounded-[10px] border border-[#C8BFB3] bg-white/60 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3E4F53] shadow-[0_10px_20px_rgba(17,17,17,0.06)] transition-all hover:border-[#AFA59A] hover:bg-white/90 hover:text-[#1C5364] hover:shadow-[0_12px_24px_rgba(17,17,17,0.1)] active:translate-y-[1px] duration-300"
                        >
                            View All Articles
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
