"use client";

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Loader2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Coin {
  id: string;
  title: string;
  metal: string | null;
  imageUrl: string | null;
  status: string;
  grade: string | null;
  valuation: string | null;
  createdAt: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  DRAFT: { icon: <Clock className="w-4 h-4" />, color: 'text-neutral-500 bg-neutral-100', label: 'Draft' },
  SUBMITTED: { icon: <Clock className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50', label: 'Submitted' },
  PAYMENT_PENDING: { icon: <AlertCircle className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50', label: 'Payment Pending' },
  ASSIGNED: { icon: <Clock className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50', label: 'Assigned' },
  IN_EVALUATION: { icon: <Loader2 className="w-4 h-4 animate-spin" />, color: 'text-brand-600 bg-brand-50', label: 'In Evaluation' },
  COMPLETED: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600 bg-green-50', label: 'Completed' },
};

export default function DashboardPage() {
  const router = useRouter();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCoins = async () => {
      const token = localStorage.getItem('mintmarks_token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const response = await fetch(`http://${apiHost}:4000/api/coins/my-collection`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to load your collection');
        const data = await response.json();
        setCoins(data.coins);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCoins();
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">My Collection</h1>
            <p className="text-neutral-500 mt-1">Track your submissions and evaluation results</p>
          </div>
          <Link
            href="/submit"
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            + Submit New Coin
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-neutral-500 font-medium">Loading your collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-50 rounded-3xl">
            <p className="font-bold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : coins.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-3xl">
            <p className="text-neutral-400 text-lg font-medium">No coins submitted yet</p>
            <p className="text-neutral-300 text-sm mt-2">Start by submitting your first heritage piece for evaluation.</p>
            <Link
              href="/submit"
              className="inline-block mt-6 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Submit Your First Coin
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {coins.map((coin) => {
              const config = statusConfig[coin.status] || statusConfig.DRAFT;
              return (
                <div key={coin.id} className="bg-white border border-neutral-200/60 shadow-sm rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
                  {coin.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coin.imageUrl} alt={coin.title} className="w-16 h-16 rounded-xl object-cover bg-neutral-900" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-300 text-2xl font-serif">₹</div>
                  )}

                  <div className="flex-grow min-w-0">
                    <h3 className="font-serif font-bold text-lg text-neutral-900 truncate">{coin.title}</h3>
                    <p className="text-neutral-400 text-sm">{coin.metal || 'Unknown metal'} · Submitted {new Date(coin.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${config.color}`}>
                    {config.icon}
                    {config.label}
                  </div>

                  {coin.valuation && (
                    <div className="text-right">
                      <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Valuation</p>
                      <p className="text-brand-700 font-bold text-lg">{coin.valuation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
