"use client";

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@mintmarks/shared';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    if (token) router.push('/dashboard');
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const [authError, setAuthError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginInput) => {
    setAuthError(null);
    try {
      const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const response = await fetch(`http://${apiHost}:4000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Store token
      localStorage.setItem('mintmarks_token', result.token);
      
      // Force a full reload to update the Header's auth state and redirect
      window.location.href = result.user.role === 'ADMIN' ? '/admin/submissions' : '/dashboard';
    } catch (error: any) {
      setAuthError(error.message || 'Network error connecting to API');
    }
  };

  const safeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center mb-4">
        <h2 className="text-2xl font-serif text-neutral-900">Welcome Back</h2>
        <p className="text-neutral-500 text-sm">Access your heritage collection</p>
      </div>

      {authError && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 text-sm font-medium text-center">
          {authError}
        </div>
      )}

      <form onSubmit={safeSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Email Address</label>
          <input
            {...register('email')}
            type="email"
            placeholder="curator@mintmarks.in"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          {errors.password && <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-neutral-500">
          New to the platform?{' '}
          <Link href="/auth/register" className="text-brand-600 font-bold hover:underline">
            Begin Membership
          </Link>
        </p>
      </div>
    </div>
  );
}
