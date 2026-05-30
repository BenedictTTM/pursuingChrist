
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
            className="min-h-screen bg-[#F6F2EC] text-[#111111] font-sans relative overflow-hidden"
            style={{
                // Local CSS variables override to scope reused components (BlogCard, BlogRow, Footer) to premium Light Mode dynamically
                ['--color-text-primary' as any]: '#111111',
                ['--color-text-secondary' as any]: '#4e5355',
                ['--color-text-muted' as any]: '#8C8275',
                ['--color-border' as any]: 'rgba(227, 217, 206, 0.6)',
                ['--color-border-light' as any]: 'rgba(227, 217, 206, 0.4)',
                ['--color-mba-text-primary' as any]: '#111111',
                ['--color-mba-text-grey' as any]: '#4e5355',
                ['--color-mba-border' as any]: 'rgba(227, 217, 206, 0.6)',
                ['--color-mba-gold' as any]: '#FF5A1F', // Orange accent for category pills and hover text
                ['--color-mba-background' as any]: '#F6F2EC',
                ['--color-background' as any]: '#F6F2EC',
                ['--color-background-secondary' as any]: '#F7F3ED',
                ['--color-surface' as any]: 'rgba(255, 255, 255, 0.7)',
                ['--color-primary' as any]: '#1C5364', // Deep teal for primary UI buttons & elements
            }}
        >
            
            {/* Ambient background wash & depth matching main pages */}
            <div className="absolute inset-0 bg-[#F6F2EC] -z-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(240,230,218,0.5),transparent_60%)] pointer-events-none -z-10" />

            {/* Archive Branding Header */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 pt-28 md:pt-20 flex justify-between items-center text-[10px] text-[#8C8275] tracking-[0.25em] uppercase select-none pointer-events-none font-sans font-semibold">
                <span>Jeffrey Drai Archive</span>
                <span>Faith & Purpose</span>
            </div>

            <main className="pb-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 mt-6">
                    {/* Back to Home Button */}
                    <div className="mb-8 flex justify-start">
                        <Link
                            href="/"
                            className="inline-flex items-center text-[10px] font-bold tracking-[0.25em] text-[#1C5364] hover:text-[#FF5A1F] transition-all duration-300 uppercase py-2 group"
                        >
                            <span className="relative flex items-center justify-center w-7 h-7 mr-3 rounded-full border border-[#C8BFB3] group-hover:border-[#FF5A1F] bg-white/60 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-[#1C5364] group-hover:text-[#FF5A1F]" />
                            </span>
                            Back to Home
                        </Link>
                    </div>
                    
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C5364]/10 text-[#1C5364] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                            Insights & Faith
                        </div>

                        <h1 
                            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#111111] uppercase tracking-tight text-center mb-6"
                            style={{
                                fontFamily: '"roc-grotesk-extra-wide", "Arial Black", sans-serif',
                                letterSpacing: "-0.04em",
                            }}
                        >
                            Blog & <span className="text-[#FF5A1F]">Articles</span>
                        </h1>

                        <p className="text-[15px] md:text-[17px] text-[#4e5355] max-w-2xl mx-auto leading-relaxed font-sans font-normal tracking-wide">
                            Theological reflections, teachings, and insights on pursuing Christ, living in purpose, and growing in active discipleship.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-10">

                        {/* Hero Section: Featured + Sidebar */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            
                            {/* Featured Post (Left) - Takes 7/12 columns */}
                            <div className="lg:col-span-7">
                                {blogPosts.length > 0 && (
                                    <div className="relative group bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,83,100,0.03)] transition-all duration-500 hover:border-[#C8BFB3] hover:shadow-[0_20px_50px_rgba(28,83,100,0.08)] h-full">
                                        <div className="flex items-center gap-2 mb-6 text-[#FF5A1F] font-bold text-[10px] uppercase tracking-widest">
                                            <Sparkles size={11} className="animate-pulse" />
                                            Featured Publication
                                        </div>
                                        <BlogCard post={blogPosts[0]} />
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Recent Stories (Right) - Takes 5/12 columns */}
                            <div className="lg:col-span-5 bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,83,100,0.03)] transition-all duration-500 hover:border-[#C8BFB3] hover:shadow-[0_20px_50px_rgba(28,83,100,0.08)] relative flex flex-col h-fit self-start justify-start">
                                <div>
                                    <h3 className="text-[10px] font-bold text-[#1C5364] mb-6 uppercase tracking-[0.25em] flex items-center gap-2 select-none border-b border-[#E3D9CE]/50 pb-4">
                                        <BookOpen size={12} className="text-[#FF5A1F]" />
                                        Recent Stories
                                    </h3>
                                    <div className="flex flex-col gap-6">
                                        {blogPosts.slice(1, 4).map((post) => (
                                            <div key={post.id} className="border-b border-[#E3D9CE]/40 pb-5 last:border-0 last:pb-0">
                                                <BlogRow post={post} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom fine coordinate numbers inside sidebar */}
                                <div className="hidden lg:flex justify-between items-center text-[8px] text-[#8C8275] font-sans tracking-widest uppercase mt-6 pt-4 border-t border-[#E3D9CE]/40 select-none font-semibold">
                                    <span>Seq // Recent Publications</span>
                                    <span>Archive</span>
                                </div>
                            </div>
                        </div>

                        {/* Editorial Grid Separator */}
                        <div className="relative py-8 flex items-center justify-center select-none pointer-events-none">
                            <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E3D9CE] to-transparent" />
                            <div className="relative bg-[#F6F2EC] px-6 text-[10px] text-[#8C8275] tracking-[0.3em] uppercase font-bold">
                                Publications Archive
                            </div>
                        </div>

                        {/* Remaining Posts Grid */}
                        {blogPosts.length > 4 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                {blogPosts.slice(4).map((post) => (
                                    <div 
                                        key={post.id} 
                                        className="relative group bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl p-6 shadow-[0_12px_40px_rgba(28,83,100,0.03)] transition-all duration-500 hover:border-[#C8BFB3] hover:shadow-[0_20px_50px_rgba(28,83,100,0.08)] hover:-translate-y-1 h-full"
                                    >
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                            </div>
                        ) : blogPosts.length <= 1 ? (
                            <div className="py-16 text-center bg-white/70 backdrop-blur-md border border-[#E3D9CE]/60 rounded-3xl relative shadow-[0_12px_40px_rgba(28,83,100,0.03)] max-w-xl mx-auto w-full">
                                <p className="text-[#8C8275] text-sm font-serif italic">More articles will be released soon.</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

