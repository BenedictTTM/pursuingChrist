import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import LikeButton from "./LikeButton";

import { BlogPost } from "@/types/blog";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group flex flex-col h-full transition-all duration-500">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-6">
                {/* Category Pill */}
                {post.category && (
                    <span className="absolute top-3.5 left-3.5 z-20  text-[#1C5364] rounded-[6px] text-[9px] font-bold uppercase tracking-widest ">
                        {post.category}
                    </span>
                )}

                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-1">
                <h3 className="text-2xl md:text-[1.65rem] leading-[1.3] font-poppins font-medium text-[#111111] mb-3 tracking-tight normal-case group-hover:text-[#FF5A1F] transition-colors duration-300">
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-sm md:text-[14.5px] text-[#4e5355] leading-relaxed mb-4 font-normal line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="text-[10px] text-[#8C8275] mb-5 font-semibold tracking-wider uppercase">
                    <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                </div>

                <div className="mt-auto flex items-center justify-between p-4">
                    <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase text-[#1C5364] hover:text-[#FF5A1F] transition-colors duration-300"
                    >
                        Read More
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-5 text-[#8C8275] ">
                        <LikeButton postId={post.id} initialLikes={post.likesCount || 0} />
                        <button className="hover:text-[#FF5A1F] transition-colors" aria-label="Comment">
                            <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                        </button>
                        <button className="hover:text-[#FF5A1F] transition-colors" aria-label="Share">
                            <Share2 className="w-5 h-5 stroke-[1.5]" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
