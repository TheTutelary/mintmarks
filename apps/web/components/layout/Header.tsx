"use client";

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-neutral-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif italic text-2xl font-bold text-neutral-900">
            MintMarks
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors">
            Showcase Gallery
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/auth/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Sign In
          </Link>
          <Link href="/auth/register" className="text-sm font-bold bg-brand-500 text-white px-4 py-2 rounded-full hover:bg-brand-600 transition-all shadow-sm">
            Begin Membership
          </Link>
        </nav>
      </div>
    </header>
  );
}
