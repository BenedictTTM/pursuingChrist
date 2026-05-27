'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Loader2, Sparkles, Lock } from 'lucide-react';
import { toast } from 'sonner';

const LogInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LogInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = LogInSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the authentication API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed');
      }
      
      // Store token in local storage
      localStorage.setItem('admin_token', result.token);

      toast.success('Authentication Successful', {
          description: 'Welcome back to the Ledger.',
      });

      const redirect = searchParams?.get('redirect');
      router.push(redirect ? decodeURIComponent(redirect) : '/admin');

    } catch (error) {
      toast.error('Authentication Failed', {
        description: error instanceof Error ? error.message : 'Invalid credentials or access denied.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9F6] font-sans">
      {/* 🖼️ Premium Branding Section (Left) */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-[#111116] overflow-hidden flex-col justify-between p-12 lg:p-20">
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,165,118,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,165,118,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        {/* Glow effect */}
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#C5A576]/15 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header Branding */}
        <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#C5A576]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A576]">Jeffrey Drai</span>
        </div>

        {/* Center Copy */}
        <div className="relative z-10 max-w-lg">
            <h1 className="font-display font-extrabold uppercase leading-none tracking-tight select-none text-5xl lg:text-7xl text-white mb-6">
                System <br/>
                <span className="font-serif italic font-normal tracking-wide text-[#C5A576]">Access</span>
            </h1>
            <p className="text-[#888A93]/90 text-[1.1rem] md:text-[1.2rem] leading-relaxed tracking-wide font-serif italic font-light">
                Secure portal for content management, ledger revisions, and system administration. Authorized personnel only.
            </p>
        </div>
        
        {/* Footer Coordinate Markers */}
        <div className="relative z-10 flex justify-between items-center text-[9px] text-[#C5A576]/60 tracking-[0.3em] uppercase select-none font-mono">
            <span>01 // AUTH_PORTAL</span>
            <span>SYS_VER: 2026.05</span>
        </div>
      </div>

      {/* 🧾 Form Section (Right) */}
      <div className="flex w-full md:w-1/2 lg:w-2/5 items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 bg-[#FAF9F6] relative">
        
        {/* Mobile Header Branding */}
        <div className="absolute top-6 left-6 md:hidden flex items-center gap-3">
            <div className="w-5 h-[1px] bg-[#C5A576]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C5A576]">JD Ledger</span>
        </div>

        <div className="w-full max-w-sm space-y-10 relative z-10 mt-12 md:mt-0">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
                <Lock size={14} className="text-[#C5A576]" />
                <h2 className="text-sm font-bold text-[#111116] uppercase tracking-widest">Authentication</h2>
            </div>
            <p className="text-xs text-[#888A93] uppercase tracking-wider font-bold">
              Enter your credentials to proceed
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`w-full px-4 py-3.5 bg-white border rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 placeholder-[#888A93]/50 text-sm shadow-xs ${
                        errors.email ? 'border-red-400' : 'border-[#C5A576]/15'
                    }`}
                    placeholder="admin@jeffreydrai.com"
                />
                {errors.email && <p className="text-red-500 text-[10px] font-medium font-mono uppercase tracking-wider mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#C5A576]">
                        Password
                    </label>
                    <a href="#" className="text-[9px] font-bold uppercase tracking-wider text-[#888A93] hover:text-[#C5A576] transition-colors">
                        Forgot?
                    </a>
                </div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={`w-full px-4 py-3.5 bg-white border rounded-lg focus:ring-2 focus:ring-[#C5A576]/10 focus:border-[#C5A576] outline-none transition-all duration-300 text-gray-900 placeholder-[#888A93]/50 text-sm shadow-xs ${
                        errors.password ? 'border-red-400' : 'border-[#C5A576]/15'
                    }`}
                    placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-[10px] font-medium font-mono uppercase tracking-wider mt-1">{errors.password}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="
                    relative
                    group
                    w-full
                    py-4
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
                    shadow-xs
                    hover:border-[#C5A576]
                    hover:shadow-[0_10px_30px_rgba(197,165,118,0.12)]
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                "
            >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-500">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A576] group-hover:text-black" />
                            Authenticating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={11} className="text-[#C5A576] group-hover:text-black transition-colors duration-500" />
                            Initialize Session
                        </>
                    )}
                </span>
                
                {/* Gold Spring Background */}
                <div className="absolute inset-0 bg-[#C5A576] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#C5A576]/15"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.2em] font-bold">
              <span className="px-4 bg-[#FAF9F6] text-[#888A93]">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast('comming soon 🌚')}
            className="w-full py-3.5 px-4 bg-white border border-[#C5A576]/20 rounded-md flex items-center justify-center gap-3 text-[10px] uppercase tracking-wider font-bold text-[#111116] hover:bg-[#FAF9F6] hover:border-[#C5A576]/40 transition-all shadow-xs"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
