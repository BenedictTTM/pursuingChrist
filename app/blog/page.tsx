
import Link from "next/link";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogRow from "@/components/BlogRow";
import { prisma } from '@/lib/prisma';
import { Sparkles, BookOpen, Clock, Calendar, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        orderBy: {
            date: 'desc',
        },
    });

    // Map Prisma Post to BlogPost (ensure category exists)
    const blogPosts = posts.map(post => ({
        ...post,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: post.image || '',
        category: post.category || 'Uncategorized',
        date: post.date.toISOString(),
    }));

    return (
        <div 
            className="min-h-screen bg-[#FAF9F6] text-[#1C1C21] font-sans relative overflow-hidden"
            style={{
                // Local CSS variables override to scope reused components (BlogCard, BlogRow, Footer) to premium Light Mode dynamically
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
            
            {/* Fine architectural layout grid and lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,165,118,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,165,118,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-10" />
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[#C5A576]/10 to-transparent pointer-events-none" />

            {/* Coordinate Markers & Header Branding */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 pt-28 md:pt-20 flex justify-between items-center text-[9px] text-[#8E919A] tracking-[0.3em] uppercase select-none pointer-events-none font-mono">
                <span>06 // KNOWLEDGE_ARCHIVE</span>
                <span>SYS_VER: 2026.05</span>
            </div>

            <main className="pb-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 mt-6">
                    {/* Back to Home Button */}
                    <div className="mb-6 flex justify-start">
                        <Link
                            href="/"
                            className="inline-flex items-center text-[10px] font-bold tracking-[0.25em] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-all duration-300 uppercase py-2 group"
                        >
                            <span className="relative flex items-center justify-center w-6 h-6 mr-3 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-[var(--color-primary)]" />
                            </span>
                            Back to Home
                        </Link>
                    </div>
                    
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-3 select-none">
                            <div className="w-5 h-[1px] bg-[#C5A576]/30" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A576] font-mono">
                                Jeffrey Drai Publications
                            </span>
                            <div className="w-5 h-[1px] bg-[#C5A576]/30" />
                        </div>

                        <h1 
                            className="font-serif font-light leading-[1.05] tracking-tight select-none text-4xl sm:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-6 text-balance"
                        >
                            Blog & <span className="font-serif italic font-normal tracking-wide text-[#C5A576]">Articles</span>
                        </h1>

                        <p className="text-[14px] md:text-[16px] text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-sans font-normal tracking-wide">
                            Insights on bioengineering, medical innovations, computational technology, and scholarly discovery 
                            from my academic and laboratory journey.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-10">

                        {/* Hero Section: Featured + Sidebar */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                            
                            {/* Featured Post (Left) - Takes 7/12 columns */}
                            <div className="lg:col-span-7">
                                {blogPosts.length > 0 && (
                                    <div className="relative group bg-white border border-[#C5A576]/12 rounded-xl p-6 sm:p-8 shadow-[0_4px_6px_-1px_rgba(197,165,118,0.02),0_20px_40px_-15px_rgba(28,28,33,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 hover:border-[#C5A576]/40 hover:shadow-[0_20px_50px_rgba(197,165,118,0.05)] h-full">
                                        {/* Precision corner decorative ticks */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A576]/35" />
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A576]/35" />
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A576]/35" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A576]/35" />
                                        
                                        <div className="flex items-center gap-2 mb-4 text-[#C5A576] font-mono text-[9px] uppercase tracking-widest font-bold">
                                            <Sparkles size={11} />
                                            Featured Research
                                        </div>
                                        <BlogCard post={blogPosts[0]} />
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Recent Stories (Right) - Takes 5/12 columns */}
                            <div className="lg:col-span-5 bg-white border border-[#C5A576]/12 rounded-xl p-6 sm:p-8 shadow-[0_4px_6px_-1px_rgba(197,165,118,0.02),0_20px_40px_-15px_rgba(28,28,33,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] relative flex flex-col h-fit self-start justify-start">
                                
                                {/* Precision ticks */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A576]/35" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A576]/35" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A576]/35" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A576]/35" />

                                <div>
                                    <h3 className="text-[10px] font-bold text-[#C5A576] mb-6 uppercase tracking-[0.25em] flex items-center gap-2 select-none border-b border-[#C5A576]/10 pb-3 font-mono">
                                        <Sparkles size={12} className="text-[#C5A576]" />
                                        Recent Stories
                                    </h3>
                                    <div className="flex flex-col gap-6">
                                        {blogPosts.slice(1, 4).map((post) => (
                                            <div key={post.id} className="border-b border-[#C5A576]/10 pb-5 last:border-0 last:pb-0">
                                                <BlogRow post={post} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom fine coordinate numbers inside sidebar */}
                                <div className="hidden lg:flex justify-between items-center text-[7px] text-[#8E919A] font-mono tracking-widest uppercase mt-6 pt-4 border-t border-[#C5A576]/10 select-none">
                                    <span>SEQ // RCN_STORIES_03</span>
                                    <span>SYS_VER // 2.6</span>
                                </div>
                            </div>
                        </div>

                        {/* Editorial Grid Separator */}
                        <div className="relative py-4 flex items-center justify-center select-none pointer-events-none">
                            <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A576]/10 to-transparent" />
                            <div className="relative bg-[#FAF9F6] px-4 text-[8px] text-[#C5A576] tracking-[0.4em] uppercase font-mono font-medium">
                                ARCHIVE ledger
                            </div>
                        </div>

                        {/* Remaining Posts Grid */}
                        {blogPosts.length > 4 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                {blogPosts.slice(4).map((post) => (
                                    <div 
                                        key={post.id} 
                                        className="relative group bg-white border border-[#C5A576]/12 rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(197,165,118,0.02),0_20px_40px_-15px_rgba(28,28,33,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 hover:border-[#C5A576]/40 hover:shadow-[0_20px_50px_rgba(197,165,118,0.05)] h-full"
                                    >
                                        {/* Precision corner decorative ticks */}
                                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#C5A576]/35" />
                                        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A576]/35" />
                                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C5A576]/35" />
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#C5A576]/35" />
                                        
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                            </div>
                        ) : blogPosts.length <= 1 ? (
                            <div className="py-12 text-center bg-white border border-[#C5A576]/12 rounded-xl relative shadow-[0_4px_6px_-1px_rgba(197,165,118,0.02),0_20px_40px_-15px_rgba(28,28,33,0.03)]">
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A576]/25" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A576]/25" />
                                <p className="text-[#8E919A] text-sm font-serif italic">More articles will be released soon.</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

