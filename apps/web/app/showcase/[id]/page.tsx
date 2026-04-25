"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Loader2, ArrowLeft, ShieldCheck, Award, Info } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  story: string | null;
  coin: {
    country: string | null;
    year: string | null;
    metal: string | null;
    photos: { url: string }[];
    imageUrl: string;
    description: string | null;
    evaluations: any[];
  }
}

export default function ShowcaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<ShowcaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const response = await fetch(`http://${apiHost}:4000/api/showcase/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F3F2EE]"><Loader2 className="w-12 h-12 animate-spin text-amber-600" /></div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center bg-[#F3F2EE]">Showcase Item Not Found</div>;

  const evaluation = item.coin.evaluations[0];

  return (
    <div className="min-h-screen bg-[#F3F2EE]">
      <Header />
      
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-6xl">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-400 hover:text-amber-600 mb-12 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Visual Presentation */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-neutral-900/10 border border-neutral-100 p-8">
              <img 
                src={item.coin.photos?.[activePhoto]?.url || item.coin.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {item.coin.photos?.length > 1 && (
              <div className="flex gap-4">
                {item.coin.photos.map((photo, i) => (
                  <button 
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activePhoto === i ? 'border-amber-500 scale-105 shadow-lg' : 'border-neutral-100 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={photo.url} className="w-full h-full object-cover" alt={`view ${i+1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Curatorial Story */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6 text-amber-600">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Verified Heritage Discovery</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 tracking-tight leading-tight">{item.title}</h1>
              <div className="flex flex-wrap gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-y border-neutral-200/50 py-4">
                 <span>Origins: {item.coin.country}</span>
                 <span>·</span>
                 <span>Period: {item.coin.year}</span>
                 <span>·</span>
                 <span>Composition: {item.coin.metal}</span>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-900/5 relative overflow-hidden">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-8 flex items-center gap-2">
                 <BuildingLibraryIcon className="w-4 h-4" /> Curatorial Board Narrative
               </h3>
               <p className="text-2xl font-serif text-neutral-700 leading-relaxed italic border-l-4 border-amber-100 pl-8">
                 "{item.story || 'Evaluation in progress.'}"
               </p>
               <div className="mt-12 pt-8 border-t border-neutral-50 flex items-center gap-4">
                  <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center text-amber-500 text-2xl font-serif">M</div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">MintMarks Board of Experts</div>
                    <div className="text-xs text-neutral-400 font-serif italic">Final Verification Awarded</div>
                  </div>
               </div>
            </div>

            {/* Assessment Details */}
            {evaluation && (
               <div className="space-y-8 bg-amber-50/30 p-10 rounded-[2.5rem] border border-amber-100/50">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800/60">Expert Analysis Summary</h4>
                  <div className="grid grid-cols-2 gap-10">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Scientific Grade</label>
                        <div className="text-3xl font-serif font-bold text-neutral-900">{evaluation.grade || 'Verified'}</div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Authentication</label>
                        <div className="text-3xl font-serif font-bold text-amber-600">{evaluation.authenticity?.replace('_', ' ')}</div>
                     </div>
                  </div>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function BuildingLibraryIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  )
}
