"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Loader2 } from 'lucide-react';

export default function ExpertLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    if (!token) {
      router.replace('/auth/login');
      return;
    }
    
    try {
      // Basic client-side decode to check role (secure check still happens on API)
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'EXPERT' && payload.role !== 'ADMIN') {
        alert('Insufficient permissions to access the Expert Portal.');
        router.replace('/dashboard');
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace('/auth/login');
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
