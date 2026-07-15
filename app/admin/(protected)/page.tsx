'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus, Loader2, BookOpen, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Post {
    id: string;
    title: string;
    date: string;
    image?: string;
    excerpt?: string;
    published: boolean;
}

export default function AdminPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: posts = [], isLoading, isError, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            return data;
        },
    });

    const deletePostMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Post deleted successfully');
        },
        onError: (error: any) => {
            console.error('Error deleting post:', error);
            toast.error(error.message || 'Failed to delete post');
        },
    });

    const handleDelete = (id: string) => {
        toast('Confirm Deletion', {
            description: 'Are you sure you want to delete this post?',
            action: {
                label: 'Delete',
                onClick: () => deletePostMutation.mutate(id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { },
            },
            duration: 8000,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] font-sans">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <Loader2 className="animate-spin h-10 w-10 text-[#C5A576]" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#888A93] font-bold select-none">
                        Loading Ledger Data
                    </span>
                </motion.div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] font-sans px-4 text-center">
                <div className="border border-red-200/50 bg-red-50/30 rounded-xl p-8 max-w-md shadow-sm">
                    <p className="text-red-500 font-poppins italic text-lg mb-2">System Interruption</p>
                    <p className="text-xs text-[#888A93] tracking-wide mb-6">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 border border-red-200 text-red-600 rounded-md text-xs uppercase tracking-wider font-bold hover:bg-red-50 transition-all"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1F2027] font-sans relative overflow-hidden pb-12">

            {/* Fine architectural layout grid and lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,165,118,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,165,118,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-10" />
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[#C5A576]/15 to-transparent pointer-events-none" />

            {/* Coordinate Markers & Header Branding */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 pt-8 flex justify-between items-center text-[9px] text-[#888A93] tracking-[0.3em] uppercase select-none pointer-events-none">
                <span>03 // SYSTEM_ADMIN</span>
                <span>SYS_VER: 2026.05</span>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 mt-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b border-[#C5A576]/15 pb-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2.5">
                            <div className="w-5 h-[1px] bg-[#C5A576]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A576]">Pursuing Christ Ledger</span>
                        </div>
                        <h1
                            className="font-display font-extrabold uppercase leading-none tracking-tight select-none text-4xl sm:text-5xl lg:text-6xl text-[#111116]"
                        >
                            Admin <span className="font-poppins italic font-normal tracking-wide text-[#C5A576]">Dashboard</span>
                        </h1>
                    </div>

                    <Link href="/admin/create" className="w-full lg:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="
                                relative
                                group
                                px-6
                                py-3.5
                                rounded-md
                                overflow-hidden
                                border
                                border-[#C5A576]/35
                                bg-white/20
                                text-[#1F2027]
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                font-bold
                                transition-all
                                duration-500
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                cursor-pointer
                                w-full
                                lg:w-auto
                                shadow-sm
                                hover:border-[#C5A576]
                                hover:shadow-[0_10px_30px_rgba(197,165,118,0.08)]
                            "
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#FAF9F6] transition-colors duration-500">
                                <Plus size={14} className="text-[#C5A576] group-hover:text-white transition-colors duration-500" />
                                Create New Post
                            </span>

                            {/* Sliding spring background fill */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-[#C5A576]
                                    translate-y-full
                                    group-hover:translate-y-0
                                    transition-transform
                                    duration-500
                                    ease-[cubic-bezier(0.16,1,0.3,1)]
                                    -z-10
                                "
                            />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Desktop Editorial Ledger View */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:block bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.02)] overflow-hidden border border-[#C5A576]/15 relative group"
                >
                    {/* Precision corner decorative ticks */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A576]/45" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A576]/45" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A576]/45" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A576]/45" />

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#C5A576]/15 bg-[#FDFDFB]/80 backdrop-blur-sm">
                                <th className="p-8 pb-5 text-[10px] font-bold text-[#C5A576] uppercase tracking-[0.25em] w-32">Resource</th>
                                <th className="p-8 pb-5 text-[10px] font-bold text-[#C5A576] uppercase tracking-[0.25em]">Meta Details</th>
                                <th className="p-8 pb-5 text-[10px] font-bold text-[#C5A576] uppercase tracking-[0.25em] w-36">Status</th>
                                <th className="p-8 pb-5 text-[10px] font-bold text-[#C5A576] uppercase tracking-[0.25em] w-40">Date Released</th>
                                <th className="p-8 pb-5 text-[10px] font-bold text-[#C5A576] uppercase tracking-[0.25em] text-right pr-12 w-44">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#C5A576]/10">
                            {posts.map((post, idx) => (
                                <tr key={post.id} className="hover:bg-[#C5A576]/[0.03] transition-colors group/row">
                                    <td className="p-6 pl-8">
                                        {/* Image frame with gold precision border accent */}
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#C5A576]/15 bg-neutral-50 shadow-sm transition-all duration-500 group-hover/row:border-[#C5A576]/40 group-hover/row:shadow-[0_8px_20px_rgba(197,165,118,0.06)]">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/row:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-[#888A93] bg-[#FAF9F6]">
                                                    <BookOpen size={16} className="text-[#C5A576]/50 mb-1" />
                                                    <span className="text-[7px] uppercase tracking-widest font-bold font-mono">No Img</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <h3 className="font-poppins text-[17px] text-[#111116] font-medium leading-snug group-hover/row:text-[#C5A576] transition-colors duration-300 line-clamp-1">
                                            {post.title}
                                        </h3>
                                        {post.excerpt ? (
                                            <p className="text-[11px] text-[#888A93] line-clamp-1 mt-1 font-sans font-light tracking-wide">
                                                {post.excerpt}
                                            </p>
                                        ) : (
                                            <p className="text-[11px] text-[#888A93]/50 italic line-clamp-1 mt-1 font-sans font-light">
                                                No description provided.
                                            </p>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${post.published
                                            ? 'bg-[#E6F4EA] text-[#137333] border border-[#C1E7C4]'
                                            : 'bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-[12px] text-[#4A4B53] font-medium tracking-wide">
                                        {new Date(post.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="p-6 pr-12 text-right">
                                        <div className="flex justify-end gap-2.5">
                                            <Link
                                                href={`/admin/edit/${post.id}`}
                                                className="p-2 border border-[#C5A576]/15 hover:border-[#C5A576]/40 text-[#C5A576] hover:bg-[#C5A576]/10 hover:text-[#111116] rounded-md transition-all duration-300"
                                                title="Edit Resource"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 border border-red-100 hover:border-red-300 text-[#C5A576] hover:bg-red-50 hover:text-red-600 rounded-md transition-all duration-300"
                                                disabled={deletePostMutation.isPending}
                                                title="Delete Resource"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Mobile Grid/Card View */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden space-y-4"
                >
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-sm border border-[#C5A576]/15 p-5 relative overflow-hidden"
                        >
                            {/* Minor technical border tick */}
                            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#C5A576]/40" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A576]/40" />

                            <div className="flex gap-4 items-start mb-4">
                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-[#C5A576]/15 bg-[#FAF9F6]">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[#888A93]">
                                            <BookOpen size={14} className="text-[#C5A576]/40" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${post.published
                                            ? 'bg-[#E6F4EA] text-[#137333] border border-[#C1E7C4]'
                                            : 'bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                        <span className="text-[10px] text-[#888A93] font-medium font-mono">
                                            {new Date(post.date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="font-poppins text-base text-[#111116] font-semibold leading-tight line-clamp-2">
                                        {post.title}
                                    </h3>
                                </div>
                            </div>

                            {post.excerpt && (
                                <p className="text-xs text-[#888A93] leading-relaxed line-clamp-2 font-sans font-light mb-4">
                                    {post.excerpt}
                                </p>
                            )}

                            <div className="flex items-center justify-between border-t border-[#C5A576]/10 pt-4 mt-1">
                                <Link
                                    href={`/admin/edit/${post.id}`}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A576] py-1 px-3 border border-[#C5A576]/20 hover:border-[#C5A576] rounded-md transition-colors"
                                >
                                    <Edit className="w-3.5 h-3.5" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-600 py-1 px-3 border border-red-100 hover:border-red-200 rounded-md transition-colors"
                                    disabled={deletePostMutation.isPending}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center bg-white rounded-xl border border-[#C5A576]/15 relative"
                    >
                        {/* Decorative ticks */}
                        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#C5A576]/30" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#C5A576]/30" />

                        <p className="text-[#888A93] text-lg font-poppins italic mb-4">No editorial stories compiled yet.</p>
                        <Link
                            href="/admin/create"
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576] hover:text-[#111116] border-b border-[#C5A576]/30 hover:border-[#111116] transition-all pb-1 cursor-pointer"
                        >
                            Compose Your First Resource
                        </Link>
                    </motion.div>
                )}

                {/* System Logout Button */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token');
                            router.push('/admin/auth');
                        }}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#888A93] hover:text-red-500 transition-colors border border-[#C5A576]/15 hover:border-red-200 px-6 py-3 rounded-md shadow-sm bg-white/40 backdrop-blur-sm"
                    >
                        <LogOut size={13} />
                        System Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

