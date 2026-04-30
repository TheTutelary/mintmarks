"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Loader2, ArrowLeft, ShieldCheck, Award, Info, History, MapPin, Calendar, Microscope } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import { Button, Container, Badge } from '@/components/ui';

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

export default function ShowcaseDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const [item, setItem] = useState<ShowcaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/showcase/${id}`));
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <Container className="py-24 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-600 mb-4" />
          <p className="text-neutral-400 font-serif italic">Retrieving Curatorial Records...</p>
        </Container>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <Container className="py-24 text-center">
          <h1 className="text-4xl font-serif-black text-neutral-900 mb-4">Record Not Found</h1>
          <Button href="/showcase" variant="outline">Back to Collection</Button>
        </Container>
      </div>
    );
  }

  const evaluation = item.coin.evaluations[0];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      <main className="pb-32">
        {/* Back Navigation */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 sticky top-20 z-40">
          <Container size="xl" className="h-16 flex items-center">
            <button 
              onClick={() => router.back()} 
              className="group flex items-center gap-2 text-neutral-400 hover:text-brand-600 transition-all font-black uppercase text-[10px] tracking-[0.2em]"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collection
            </button>
          </Container>
        </div>

        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            
            {/* Visual Presentation (Left) */}
            <div className="space-y-10 sticky top-44">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden bg-neutral-900 shadow-premium border border-neutral-200/50 p-12 flex items-center justify-center">
                <img 
                  src={item.coin.photos?.[activePhoto]?.url || item.coin.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {item.coin.photos?.length > 1 && (
                <div className="flex flex-wrap gap-5 justify-center">
                  {item.coin.photos.map((photo, i) => (
                    <button 
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`relative w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all duration-300 ${activePhoto === i ? 'border-brand-500 scale-110 shadow-lg' : 'border-white bg-white/50 opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={photo.url} className="w-full h-full object-cover" alt={`view ${i+1}`} />
                      {activePhoto === i && <div className="absolute inset-0 bg-brand-500/10" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Curatorial Story (Right) */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 text-brand-600 bg-brand-50/50 px-5 py-2 rounded-full border border-brand-100 backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Heritage Discovery</span>
                </div>
                
                <h1 className="font-serif-black text-5xl md:text-6xl text-neutral-900 tracking-tight leading-[1.05]">
                  {item.title}
                </h1>

                <div className="grid grid-cols-3 gap-4 py-8 border-y border-neutral-200/60">
                   <div className="space-y-1">
                     <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block">Origin</span>
                     <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" /> {item.coin.country}
                     </div>
                   </div>
                   <div className="space-y-1 px-4 border-x border-neutral-200/60">
                     <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block">Period</span>
                     <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                        <Calendar className="w-3.5 h-3.5 text-brand-500" /> {item.coin.year}
                     </div>
                   </div>
                   <div className="space-y-1">
                     <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block">Material</span>
                     <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                        <Microscope className="w-3.5 h-3.5 text-brand-500" /> {item.coin.metal}
                     </div>
                   </div>
                </div>
              </div>

              {/* Narrative Section */}
              <div className="bg-white p-12 md:p-16 rounded-[4.5rem] border border-neutral-200/60 shadow-premium relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Award className="w-64 h-64 text-neutral-900" />
                </div>

                <div className="relative space-y-10">
                  <div className="flex items-center gap-3 text-brand-600">
                    <History className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Historical Narrative</span>
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl font-serif text-neutral-800 leading-relaxed italic border-l-4 border-brand-200 pl-10">
                    "{item.story || 'The curatorial board is finalizing the historical documentation for this asset.'}"
                  </blockquote>

                  <div className="pt-10 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center text-brand-500 text-2xl font-serif-black shadow-lg">M</div>
                      <div>
                        <div className="text-sm font-black text-neutral-900">MintMarks Board of Experts</div>
                        <div className="text-[10px] text-neutral-400 font-serif italic uppercase tracking-widest">Final Curatorial Review Awarded</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Assessment */}
              {evaluation && (
                 <div className="bg-neutral-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-transparent pointer-events-none" />
                    
                    <div className="relative space-y-12">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400">Expert Analysis Report</h4>
                      
                      <div className="grid grid-cols-2 gap-12">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Scientific Grade</label>
                            <div className="text-4xl font-serif-black text-white">{evaluation.grade || 'Verified'}</div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Authentication Status</label>
                            <div className="text-4xl font-serif-black text-brand-500">
                              {evaluation.authenticity?.replace('_', ' ') || 'Authentic'}
                            </div>
                         </div>
                      </div>

                      <div className="pt-10 border-t border-white/10 flex items-center gap-3 text-neutral-400">
                         <Info className="w-4 h-4" />
                         <p className="text-[10px] font-medium leading-relaxed uppercase tracking-widest">
                           This assessment is based on physical property analysis and historical provenance tracking.
                         </p>
                      </div>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
