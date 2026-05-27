'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, Sparkles, Image as ImageIcon, Eye, Clock, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import Editor from '@/components/Editor';
import { createPostSchema, postSchema } from '@/lib/schemas';

export default function CreatePostPage() {
    const router = useRouter();

    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const createPostMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create post');
            }

            return response.json();
        },
        onSuccess: (data, variables) => {
            const isPublished = variables.get('published') === 'true';
            toast.success(isPublished ? 'Post published successfully' : 'Draft saved successfully');
            router.push('/admin');
        },
        onError: (error: Error) => {
            console.error('Error creating post:', error);
            toast.error(error.message || 'Failed to create post');
        },
    });

    const handleSave = async (published: boolean) => {
        setErrors({});

        const form = document.querySelector('form') as HTMLFormElement;
        const formData = new FormData(form);

        const visibility = formData.get('visibility');
        const effectivePublished = visibility === 'private' ? false : published;

        const data = {
            title: formData.get('title'),
            excerpt: formData.get('excerpt'),
            content: content,
            readTime: formData.get('readTime'),
            category: formData.get('category'),
            image: formData.get('image'),
            published: effectivePublished,
        };

        const schema = effectivePublished ? createPostSchema : postSchema;
        const result = schema.safeParse(data);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        formData.set('content', content);
        formData.set('published', String(effectivePublished));
        createPostMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1F2027] font-sans relative overflow-hidden pb-20">
            
            {/* Fine architectural layout grid and lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,165,118,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,165,118,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-10" />
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[#C5A576]/15 to-transparent pointer-events-none" />

            {/* Coordinate Markers & Header Branding */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 pt-8 flex justify-between items-center text-[9px] text-[#888A93] tracking-[0.3em] uppercase select-none pointer-events-none">
                <span>04 // COMPOSER_PORTAL</span>
                <span>SYS_VER: 2026.05</span>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 xl:px-20 pt-10">
                    
                    {/* Editorial Breadcrumb Back Link */}
                    <div className="mb-6">
                        <Link 
                            href="/admin" 
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576] hover:text-[#111116] transition-colors group cursor-pointer"
                        >
                            <ArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform duration-300" />
                            Back to Ledger
                        </Link>
                    </div>

                    {/* Header Page Title Block */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-[#C5A576]/15 pb-8"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2.5">
                                <div className="w-5 h-[1px] bg-[#C5A576]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A576]">Jeffrey Drai Ledger</span>
                            </div>
                            <h1 
                                className="font-display font-extrabold uppercase leading-none tracking-tight select-none text-4xl sm:text-5xl text-[#111116]"
                            >
                                Compose <span className="font-serif italic font-normal tracking-wide text-[#C5A576]">New Resource</span>
                            </h1>
                        </div>

                        {/* Top Action Buttons Panel */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-end gap-3.5 w-full md:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="button"
                                onClick={() => handleSave(false)}
                                disabled={createPostMutation.isPending}
                                className="
                                    px-5 
                                    py-3 
                                    rounded-md 
                                    border 
                                    border-[#C5A576]/30 
                                    text-[#4A4B53] 
                                    bg-white/40
                                    font-bold
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    hover:border-[#C5A576]
                                    hover:bg-white
                                    transition-all 
                                    duration-300
                                    text-center 
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2
                                    shadow-sm
                                    cursor-pointer
                                "
                            >
                                {createPostMutation.isPending && !createPostMutation.variables?.get('published') ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A576]" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    'Save Draft'
                                )}
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="button"
                                onClick={() => handleSave(true)}
                                disabled={createPostMutation.isPending}
                                className="
                                    relative
                                    group
                                    px-6
                                    py-3
                                    rounded-md
                                    overflow-hidden
                                    border
                                    border-[#C5A576]/35
                                    bg-[#111116]
                                    text-white
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
                                    shadow-sm
                                    hover:border-[#C5A576]
                                    hover:shadow-[0_10px_30px_rgba(197,165,118,0.12)]
                                "
                            >
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-500">
                                    {createPostMutation.isPending && createPostMutation.variables?.get('published') === 'true' ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A576]" />
                                    ) : (
                                        <Sparkles size={11} className="text-[#C5A576] group-hover:text-black transition-colors duration-500" />
                                    )}
                                    {createPostMutation.isPending && createPostMutation.variables?.get('published') === 'true' ? 'Processing...' : 'Publish Post'}
                                </span>

                                {/* Sliding gold spring background */}
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
                        </div>
                    </motion.div>

                    {/* Asymmetrical Split Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Main Editorial Form Area (Left 2 Columns) */}
                        <motion.div 
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="bg-white border border-[#C5A576]/15 rounded-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.015)] relative">
                                
                                {/* Precision technical border ticks */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C5A576]/40" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C5A576]/40" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C5A576]/40" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C5A576]/40" />

                                <div className="flex items-center gap-2 mb-6 border-b border-[#C5A576]/10 pb-4">
                                    <Sparkles size={14} className="text-[#C5A576]" />
                                    <h2 className="text-base font-bold text-[#111116] uppercase tracking-wider">Post Details</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Title Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                            Post Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 placeholder-[#888A93]/50 text-base font-serif shadow-inner ${
                                                errors.title ? 'border-red-400' : 'border-[#C5A576]/15'
                                            }`}
                                            placeholder="Enter a catchy editorial title..."
                                        />
                                        {errors.title && <p className="text-red-500 text-xs font-medium font-mono">{errors.title}</p>}
                                    </div>

                                    {/* Excerpt Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="excerpt" className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                            Excerpt
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            id="excerpt"
                                            rows={3}
                                            className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 placeholder-[#888A93]/50 text-sm leading-relaxed resize-none shadow-inner ${
                                                errors.excerpt ? 'border-red-400' : 'border-[#C5A576]/15'
                                            }`}
                                            placeholder="Write a brief luxury synopsis for this story..."
                                        />
                                        {errors.excerpt && <p className="text-red-500 text-xs font-medium font-mono">{errors.excerpt}</p>}
                                    </div>

                                    {/* Content Editor */}
                                    <div className="space-y-2">
                                        <label htmlFor="content" className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                            Content
                                        </label>
                                        <div className={`overflow-hidden rounded-lg border bg-[#FAF9F6] shadow-inner ${
                                            errors.content ? 'border-red-400' : 'border-[#C5A576]/15'
                                        }`}>
                                            <Editor value={content} onChange={setContent} />
                                        </div>
                                        {errors.content && <p className="text-red-500 text-xs font-medium font-mono">{errors.content}</p>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Settings & Asset Meta Sidebar Area (Right 1 Column) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <div className="bg-white border border-[#C5A576]/15 rounded-xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.015)] relative">
                                
                                {/* Precision corner border ticks */}
                                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#C5A576]/45" />
                                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C5A576]/45" />

                                <div className="flex items-center gap-2 mb-4 border-b border-[#C5A576]/10 pb-3">
                                    <Folder size={13} className="text-[#C5A576]" />
                                    <h3 className="text-sm font-bold text-[#111116] uppercase tracking-wider">Post Settings</h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Featured Image Selector */}
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                                Featured Image
                                            </label>
                                            <span className="text-[8px] font-mono text-[#888A93]">ASSET // 01</span>
                                        </div>

                                        <div className={`relative group border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-[#FAF9F6]/50 min-h-[160px] ${
                                            errors.image ? 'border-red-400 bg-red-50/10' : 'border-[#C5A576]/30'
                                        }`}>
                                            {imagePreview ? (
                                                <div className="w-full relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-36 object-cover rounded-md border border-[#C5A576]/15 shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setImagePreview(null)}
                                                        className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white border border-red-100"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 bg-[#FAF9F6] border border-[#C5A576]/15 rounded-full flex items-center justify-center mb-3 text-[#C5A576]">
                                                        <Upload size={16} />
                                                    </div>
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Click to upload image</p>
                                                    <p className="text-[9px] text-[#888A93] mt-1 font-mono">PNG, JPG, WEBP (MAX. 5MB)</p>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        {errors.image && <p className="text-red-500 text-xs font-medium font-mono">{errors.image}</p>}
                                    </div>

                                    {/* Estimated Read Time */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} className="text-[#C5A576]" />
                                            <label htmlFor="readTime" className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                                Estimated Read Time
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="readTime"
                                                id="readTime"
                                                defaultValue="5"
                                                className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#C5A576]/15 rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 text-sm font-medium shadow-inner"
                                                placeholder="e.g. 5"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888A93] text-[9px] uppercase tracking-wider font-bold">mins</span>
                                        </div>
                                    </div>

                                    {/* Category Select */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1.5">
                                            <ImageIcon size={12} className="text-[#C5A576]" />
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                                                Category
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <select 
                                                name="category" 
                                                className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#C5A576]/15 rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 text-sm appearance-none cursor-pointer font-medium shadow-inner"
                                            >
                                                <option value="Uncategorized">Select a category</option>
                                                <option value="Research">Research</option>
                                                <option value="Mentorship">Mentorship</option>
                                                <option value="Bioinformatics">Bioinformatics</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="AI & Health">AI & Health</option>
                                                <option value="Community">Community</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A576]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post Visibility */}
                                    <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#C5A576]/15 space-y-3.5 shadow-inner">
                                        <div className="flex items-center gap-2 text-gray-900 font-bold text-[10px] uppercase tracking-[0.25em] text-[#C5A576]">
                                            <Eye size={13} />
                                            Post Visibility
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input type="radio" name="visibility" value="public" defaultChecked className="peer sr-only" />
                                                    {/* Custom golden accent radio selector */}
                                                    <div className="w-3.5 h-3.5 border border-[#C5A576]/40 rounded-full peer-checked:border-[#C5A576] peer-checked:border-4 transition-all bg-white"></div>
                                                </div>
                                                <span className="text-[#4A4B53] text-xs font-bold uppercase tracking-wider group-hover:text-gray-900 transition-colors">Public</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input type="radio" name="visibility" value="private" className="peer sr-only" />
                                                    <div className="w-3.5 h-3.5 border border-[#C5A576]/40 rounded-full peer-checked:border-[#C5A576] peer-checked:border-4 transition-all bg-white"></div>
                                                </div>
                                                <span className="text-[#4A4B53] text-xs font-bold uppercase tracking-wider group-hover:text-gray-900 transition-colors">Private</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </form>
        </div>
    );
}

