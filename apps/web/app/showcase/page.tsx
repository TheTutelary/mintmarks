"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Loader2, Sparkles, Building2 } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  story: string | null;
  displayMode: string;
  featured: boolean;
  coin: {
    country: string | null;
    year: string | null;
    metal: string | null;
    photos: { url: string }[];
    imageUrl: string;
    evaluations: { grade: string | null; authenticity: string | null }[];
  }
}

export default function ShowcaseGallery() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const response = await fetch(`http://${apiHost}:4000/api/showcase`);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchShowcase();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F2EE]">
      <Header />
      
      <main>
        <section className="bg-white/40 border-b border-neutral-200 py-24 md:py-32 text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
             <div className="flex justify-center mb-6">
                <span className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-amber-700">
                   <Sparkles className="w-3 h-3" /> Curated Heritage
                </span>
             </div>
             <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-neutral-900">
                The Museum Showcase
             </h1>
             <p className="text-neutral-500 max-w-2xl mx-auto text-lg md:text-xl font-serif italic">
                A selection of the most notable and historically significant assets recently verified by our curators.
             </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="flex justify-center py-24"><Loader2 className="w-12 h-12 animate-spin text-amber-600" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-32">
              <Building2 className="w-16 h-16 text-neutral-200 mx-auto mb-6" />
              <p className="text-neutral-500 font-serif italic text-xl">The gallery is being curated for a new exhibition.</p>
              <p className="text-neutral-400 mt-2">Check back shortly to discover new heritage discoveries.</p>
            </div>
          ) : (
            <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link key={item.id} href={`/showcase/${item.id}`} className="group block space-y-6">
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-xl shadow-neutral-900/5 border border-neutral-100">
                    <img 
                      src={item.coin.photos?.[0]?.url || item.coin.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    {item.featured && (
                      <div className="absolute top-6 left-6 bg-amber-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Masterpiece
                      </div>
                    )}
                  </div>
                  
                  <div className="px-2">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-2">
                       {item.coin.year || 'Era Undisclosed'} · {item.coin.country || 'Global'}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                       {item.title}
                    </h3>
                    <p className="text-neutral-500 line-clamp-2 text-sm leading-relaxed italic border-l-2 border-amber-100 pl-4 py-1">
                       {item.story}
                    </p>
                    
                    <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {item.coin.metal} Verification
                       </span>
                       <span className="text-xs font-bold text-amber-600 group-hover:translate-x-2 transition-transform">
                          Explore Analysis →
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
