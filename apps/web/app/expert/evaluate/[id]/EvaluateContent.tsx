"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Save, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { getApiUrl } from '@/lib/api';

export default function EvaluateContent({ id }: { id: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchCoin = async () => {
      const token = localStorage.getItem('mintmarks_token');
      try {
        const response = await fetch(getApiUrl('/api/expert/coins'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const coins = await response.json();
          const found = coins.find((c: any) => c.id === id);
          setCoin(found);
          if (found?.evaluations?.[0]) {
            reset(found.evaluations[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    const token = localStorage.getItem('mintmarks_token');
    
    // Ensure numbers are handled
    const payload = {
      ...data,
      estimatedValueMin: data.estimatedValueMin ? parseFloat(data.estimatedValueMin) : null,
      estimatedValueMax: data.estimatedValueMax ? parseFloat(data.estimatedValueMax) : null,
      rarityScore: data.rarityScore ? parseInt(data.rarityScore) : null,
    };

    if (token?.startsWith('mock.')) {
      setTimeout(() => {
        setSubmitting(false);
        alert('Evaluation submitted successfully! (Bypass Mode)');
        router.push('/expert');
      }, 1000);
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/expert/coins/${id}/evaluations`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert('Evaluation submitted successfully!');
        router.push('/expert');
      } else {
        alert('Failed to submit evaluation.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>;

  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Queue
      </button>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-start">
        <div className="space-y-8">
          <section>
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Expert Evaluation</h1>
            <p className="text-neutral-500">Provide a professional assessment for {coin?.title || 'Unknown Asset'}</p>
          </section>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Authenticity & Grade */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-neutral-100 pb-4">Authenticity & Grade</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Authenticity</label>
                  <select {...register('authenticity')} className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all">
                    <option value="AUTHENTIC">Authentic</option>
                    <option value="LIKELY_AUTHENTIC">Likely Authentic</option>
                    <option value="INCONCLUSIVE">Inconclusive</option>
                    <option value="COUNTERFEIT">Counterfeit</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Grade</label>
                  <input {...register('grade')} type="text" placeholder="e.g. MS-65, VF-30" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Composition & Origin */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-neutral-100 pb-4">Composition & Origin</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Metal</label>
                  <input {...register('metal')} type="text" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Purity</label>
                  <input {...register('metalPurity')} type="text" placeholder=".925, 22k" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Mint</label>
                  <input {...register('mint')} type="text" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Era</label>
                  <input {...register('era')} type="text" placeholder="Mughal, Victorian" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Valuation */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-neutral-100 pb-4">Estimated Value</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Min Value</label>
                  <input {...register('estimatedValueMin')} type="number" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Max Value</label>
                  <input {...register('estimatedValueMax')} type="number" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Currency</label>
                  <input {...register('valueCurrency')} defaultValue="INR" className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Historical Analysis */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 border-b border-neutral-100 pb-4">Professional Analysis</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Historical Story</label>
                  <textarea {...register('historicalStory')} rows={5} className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" placeholder="Provide context and provenance..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase ml-1">Scarcity Note</label>
                  <textarea {...register('scarcityNote')} rows={2} className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => router.back()} className="px-8 py-4 font-bold text-neutral-400 hover:text-neutral-900 transition-all">Discard Draft</button>
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-12 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-brand-500/20 active:scale-95 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Submit Final Evaluation
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Mini-Preview */}
        <aside className="sticky top-24 space-y-6">
          <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
            {coin?.photos?.[0] ? (
              <img src={coin.photos[0].url} alt={coin.title} className="aspect-square w-full object-cover" />
            ) : coin?.imageUrl ? (
              <img src={coin.imageUrl} alt={coin.title} className="aspect-square w-full object-cover" />
            ) : (
              <div className="aspect-square w-full flex items-center justify-center text-6xl font-serif text-neutral-700 bg-neutral-800">₹</div>
            )}
            <div className="p-6">
              <h4 className="text-white font-serif font-bold text-xl">{coin?.title}</h4>
              <p className="text-neutral-400 text-sm mt-1">{coin?.metal} · {coin?.country} · {coin?.year}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm">
            <h5 className="text-xs font-bold text-neutral-400 uppercase mb-4 tracking-widest">Collector Notes</h5>
            <p className="text-neutral-600 text-sm italic">"{coin?.description || coin?.userNotes || 'No notes provided by the submitter.'}"</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
