import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { BlogPost } from "@/types/blog";

interface BlogRowProps {
    post: BlogPost;
}

export default function BlogRow({ post }: BlogRowProps) {
    return (
        <article className="group flex flex-col sm:flex-row items-start gap-4 mb-6 last:mb-0">
            {/* Image (Left) */}
            <div className="relative w-full sm:w-1/3 aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 150px"
                    loading="lazy"
                />
            </div>

            {/* Content (Right) */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="text-[0.65rem] text-[var(--color-mba-gold)] font-bold uppercase tracking-[0.2em] mb-1 font-mono">
                    {post.category || "Article"}
                </div>

                <h3 className="text-base md:text-lg font-poppins font-light text-[var(--color-mba-text-primary)] mb-2 leading-snug tracking-tight group-hover:text-[var(--color-mba-gold)] transition-colors duration-300 line-clamp-2">
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </h3>

                <div className="text-[0.65rem] text-[var(--color-text-muted)] mt-auto font-normal uppercase tracking-wider">
                    <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                </div>
            </div>
        </article>
    );
}
