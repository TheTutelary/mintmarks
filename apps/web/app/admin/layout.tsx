"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    if (!token) {
      router.replace('/auth/login');
      return;
    }
    
    try {
      const payloadStr = atob(token.split('.')[1]);
      const payload = JSON.parse(payloadStr);
      if (payload.role !== 'ADMIN') {
        alert('Access Denied. Administrator privileges required.');
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
