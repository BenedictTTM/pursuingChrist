"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";


interface LikeButtonProps {
    postId: string;
    initialLikes: number;
    className?: string;
}

export default function LikeButton({ postId, initialLikes, className }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        // 1. Get or create userId
        let storedUserId = localStorage.getItem("mba_userId");
        if (!storedUserId) {
            storedUserId = `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
            localStorage.setItem("mba_userId", storedUserId);
        }
        setUserId(storedUserId);

        // 2. Check if this user already liked this post (locally)
        // ideally we'd check with the server, but for now local is faster/easier for simple logic
        // or we could fetch current status.
        const likedPosts = JSON.parse(localStorage.getItem("mba_liked_posts") || "[]");
        if (likedPosts.includes(postId)) {
            setIsLiked(true);
        }
    }, [postId]);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a link
        e.stopPropagation();

        if (isLoading || !userId) return;

        setIsLoading(true);

        // Optimistic update
        const previousLikes = likes;
        const previousIsLiked = isLiked;

        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);

        try {
            const res = await fetch(`/api/posts/${postId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (!res.ok) {
                throw new Error("Failed to toggle like");
            }

            const data = await res.json();

            // Update local storage tracking
            const likedPosts = JSON.parse(localStorage.getItem("mba_liked_posts") || "[]");
            if (data.liked) {
                if (!likedPosts.includes(postId)) {
                    likedPosts.push(postId);
                }
            } else {
                const index = likedPosts.indexOf(postId);
                if (index > -1) {
                    likedPosts.splice(index, 1);
                }
            }
            localStorage.setItem("mba_liked_posts", JSON.stringify(likedPosts));

            // Sync with server count just in case other people liked it in between
            setLikes(data.likesCount);
            setIsLiked(data.liked);

        } catch (error) {
            console.error("Error liking post:", error);
            // Revert on error
            setLikes(previousLikes);
            setIsLiked(previousIsLiked);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex flex-col items-center group transition-colors ${className}`}
            aria-label={isLiked ? "Unlike" : "Like"}
        >
            <ThumbsUp
                className={`w-5 h-5 stroke-[1.5] transition-all duration-300 ${isLiked
                    ? "fill-[#FF5A1F] text-[#FF5A1F]"
                    : "text-[#8C8275] group-hover:text-[#FF5A1F]"
                    }`}
            />
            {likes > 0 && (
                <span className={`mt-1 text-[10px] font-medium transition-colors ${isLiked ? "text-[#FF5A1F]" : "text-[#8C8275] group-hover:text-[#FF5A1F]"
                    }`}>
                    {likes}
                </span>
            )}
        </button>
    );
}
