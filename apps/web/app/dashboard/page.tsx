"use client";

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Loader2, Clock, CheckCircle, AlertCircle, Plus, LayoutGrid } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import { Button, Container, Badge } from '@/components/ui';

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

const statusConfig: Record<string, { variant: 'brand' | 'accent' | 'neutral' | 'outline'; icon: React.ReactNode; label: string }> = {
  DRAFT: { variant: 'neutral', icon: <Clock className="w-3 h-3" />, label: 'Draft' },
  SUBMITTED: { variant: 'brand', icon: <Clock className="w-3 h-3" />, label: 'Submitted' },
  PAYMENT_PENDING: { variant: 'outline', icon: <AlertCircle className="w-3 h-3" />, label: 'Payment Pending' },
  ASSIGNED: { variant: 'brand', icon: <Clock className="w-3 h-3" />, label: 'Assigned' },
  IN_EVALUATION: { variant: 'brand', icon: <Loader2 className="w-3 h-3 animate-spin" />, label: 'In Evaluation' },
  COMPLETED: { variant: 'accent', icon: <CheckCircle className="w-3 h-3" />, label: 'Verified' },
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
        const response = await fetch(getApiUrl('/api/coins/my-collection'), {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to load your collection');
        const data = await response.json();
        setCoins(data.coins || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCoins();
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="pb-32">
        <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 pt-16 pb-12">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif-black text-4xl text-neutral-900 tracking-tight">My Collection</h1>
                <p className="text-neutral-500 font-serif italic text-lg mt-2">Track your heritage assets and expert evaluations.</p>
              </div>
              <Button
                href="/submit"
                leftIcon={<Plus className="w-5 h-5" />}
                className="shadow-premium active:scale-95 transition-transform"
              >
                Submit New Coin
              </Button>
            </div>
          </Container>
        </div>

        <Container className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 animate-spin text-brand-600 mb-6" />
              <p className="text-neutral-400 font-serif italic text-lg">Retrieving your digital vault...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-red-100 shadow-sm px-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif-black text-2xl text-neutral-900 mb-2">Vault Access Error</h3>
              <p className="text-neutral-500 max-w-sm mx-auto">{error}</p>
              <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>Retry Access</Button>
            </div>
          ) : coins.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-neutral-200/60 shadow-premium px-6">
              <div className="w-20 h-20 bg-neutral-50 text-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <LayoutGrid className="w-10 h-10" />
              </div>
              <h3 className="font-serif-black text-3xl text-neutral-900 mb-4">Empty Digital Vault</h3>
              <p className="text-neutral-500 max-w-md mx-auto text-lg italic leading-relaxed">
                You haven't submitted any assets for professional evaluation yet. 
                Begin your curatorial journey today.
              </p>
              <Button href="/submit" size="lg" className="mt-10" leftIcon={<Plus className="w-5 h-5" />}>
                Submit Your First Coin
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {coins.map((coin) => {
                const config = statusConfig[coin.status] || statusConfig.DRAFT;
                return (
                  <div key={coin.id} className="group bg-white border border-neutral-200/60 shadow-sm rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8 hover:shadow-premium transition-all duration-300">
                    <div className="relative h-24 w-24 md:h-20 md:w-20 shrink-0 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center shadow-lg border border-neutral-200">
                      {coin.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={coin.imageUrl} alt={coin.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                      ) : (
                        <span className="text-brand-500 text-3xl font-serif-black">M</span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-serif-black text-2xl text-neutral-900 truncate group-hover:text-brand-600 transition-colors">{coin.title}</h3>
                        <Badge variant={config.variant} className="shrink-0 flex items-center gap-1.5 py-1">
                          {config.icon}
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        {coin.metal || 'Unknown Composition'} 
                        <span className="text-neutral-200">|</span> 
                        Designated {new Date(coin.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-10 md:pl-8 md:border-l border-neutral-100">
                      {coin.grade && (
                        <div>
                          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Grade</p>
                          <p className="text-neutral-900 font-serif-black text-xl">{coin.grade}</p>
                        </div>
                      )}
                      {coin.valuation ? (
                        <div className="text-right md:text-left">
                          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Assessment</p>
                          <p className="text-brand-700 font-serif-black text-2xl">{coin.valuation}</p>
                        </div>
                      ) : (
                        <div className="hidden md:block">
                           <p className="text-[10px] font-black text-neutral-200 uppercase tracking-widest mb-1">Assessment</p>
                           <p className="text-neutral-100 font-serif-black text-2xl">Pending</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
