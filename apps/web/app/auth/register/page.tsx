"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterInput, Role } from '@mintmarks/shared';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    if (token) router.push('/dashboard');
  }, [router]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: Role.COLLECTOR,
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Store token (in production, use secure HttpOnly cookies)
      localStorage.setItem('mintmarks_token', result.token);
      alert('Registration successful! Welcome to MintMarks.');
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center mb-4">
        <h2 className="text-2xl font-serif text-neutral-900">Begin Membership</h2>
        <p className="text-neutral-500 text-sm">Join the Heritage Evaluation Network</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Full Name</label>
          <input
            {...register('name')}
            type="text"
            placeholder="John Doe"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name.message}</p>}
        </div>

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

        <div className="space-y-1 pt-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Account Type</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={() => setValue('role', Role.COLLECTOR)}
              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                selectedRole === Role.COLLECTOR 
                  ? 'border-brand-500 bg-brand-50 text-brand-700' 
                  : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300'
              }`}
            >
              Collector
            </button>
            <button
              type="button"
              onClick={() => setValue('role', Role.EXPERT)}
              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                selectedRole === Role.EXPERT 
                  ? 'border-brand-500 bg-brand-50 text-brand-700' 
                  : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300'
              }`}
            >
              Expert
            </button>
          </div>
          {errors.role && <p className="text-red-500 text-xs ml-1 mt-2">{errors.role.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
        >
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
