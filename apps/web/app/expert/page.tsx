"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Coins } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import Link from 'next/link';

export default function ExpertDashboard() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigned = async () => {
      const token = localStorage.getItem('mintmarks_token');
      try {
        const response = await fetch(getApiUrl('/api/expert/coins'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCoins(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAssigned();
  }, []);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-neutral-900">Expert Portal</h1>
        <p className="text-neutral-500 mt-1">Review and evaluate your assigned heritage items.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
      ) : coins.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-3xl bg-white">
          <Coins className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="font-bold text-neutral-500">No coins assigned</p>
          <p className="text-sm text-neutral-400 mt-1">Check back later when an administrator assigns items to you.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold font-serif text-lg">{coin.title}</h3>
                <p className="text-sm text-neutral-500">Status: {coin.status} | Submitted: {new Date(coin.createdAt).toLocaleDateString()}</p>
              </div>
              <Link href={`/expert/evaluate/${coin.id}`} className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50">
                Evaluate
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
