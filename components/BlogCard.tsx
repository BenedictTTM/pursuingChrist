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
        <article className="group flex flex-col h-full bg-transparent">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg mb-6">
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
                <h2 className="text-[1.85rem] md:text-[2rem] leading-[1.2] font-serif font-light text-[var(--color-text-primary)] mb-4 tracking-tight normal-case group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </h2>

                <p className="text-[0.925rem] text-[var(--color-text-secondary)] leading-[1.7] mb-3 font-normal line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="text-[0.725rem] text-[var(--color-text-muted)] mb-6 font-normal tracking-wide uppercase">
                    <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors"
                    >
                        Read More
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-5 text-[var(--color-text-muted)]">
                        <LikeButton postId={post.id} initialLikes={post.likesCount || 0} />
                        <button className="hover:text-[var(--color-primary)] transition-colors" aria-label="Comment">
                            <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                        </button>
                        <button className="hover:text-[var(--color-primary)] transition-colors" aria-label="Share">
                            <Share2 className="w-5 h-5 stroke-[1.5]" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
