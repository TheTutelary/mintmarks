"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getApiUrl } from '@/lib/api';
import { Sparkles, History, ChevronRight, Search } from 'lucide-react';
import { Button, Container, Badge } from '@/components/ui';

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
        const response = await fetch(getApiUrl('/api/showcase'));
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setItems(data);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchShowcase();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      <main>
        {/* Gallery Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px]">
            <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-brand-200/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-brand-300/10 blur-[100px] rounded-full" />
          </div>

          <Container size="md" className="relative z-10 text-center">
             <div className="flex justify-center mb-8">
                <Badge variant="brand" className="bg-brand-50/50 backdrop-blur-sm px-6 py-2">
                   <Sparkles className="w-3.5 h-3.5 mr-2" /> Curated Heritage
                </Badge>
             </div>
             <h1 className="font-serif-black text-5xl md:text-7xl text-neutral-900 tracking-tight mb-8">
                The Museum Showcase
             </h1>
             <p className="text-neutral-500 max-w-2xl mx-auto text-xl font-serif italic leading-relaxed">
                A definitive collection of historically significant discoveries, 
                verified and narrated by our board of experts.
             </p>
          </Container>
        </section>

        <Container className="pb-32">
          {loading ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse space-y-6">
                  <div className="aspect-square bg-neutral-200 rounded-[3rem]" />
                  <div className="space-y-3 px-2">
                    <div className="h-4 bg-neutral-200 rounded-full w-1/3" />
                    <div className="h-8 bg-neutral-200 rounded-full w-3/4" />
                    <div className="h-16 bg-neutral-200 rounded-2xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[4rem] border border-neutral-200/60 shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-50 text-neutral-300 mx-auto mb-8">
                <History className="h-10 w-10" />
              </div>
              <h3 className="font-serif-black text-3xl text-neutral-900 mb-4">Awaiting New Discoveries</h3>
              <p className="text-neutral-400 max-w-md mx-auto text-lg italic">
                Our board is currently verifying new heritage assets. Check back shortly for the next exhibition.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link key={item.id} href={`/showcase/${item.id}`} className="group block space-y-8">
                  <div className="relative aspect-square rounded-[3.5rem] overflow-hidden bg-neutral-900 shadow-premium border border-neutral-100 flex items-center justify-center p-8">
                    <img 
                      src={item.coin.photos?.[0]?.url || item.coin.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {item.featured && (
                      <div className="absolute top-8 left-8">
                        <Badge variant="brand" className="bg-brand-500 text-white border-brand-400 shadow-lg px-4 py-2">
                          Masterpiece
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Search className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-3">
                       {item.coin.year || 'Era Undisclosed'} · {item.coin.country || 'Global Origin'}
                    </div>
                    <h3 className="font-serif-black text-3xl text-neutral-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight">
                       {item.title}
                    </h3>
                    <p className="text-neutral-500 line-clamp-2 text-base leading-relaxed italic border-l-4 border-brand-100 pl-6 py-1">
                       {item.story}
                    </p>
                    
                    <div className="mt-10 flex items-center justify-between border-t border-neutral-200/60 pt-8">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                          Verified Asset {item.coin.metal}
                       </span>
                       <span className="text-sm font-black text-brand-600 flex items-center gap-1 group-hover:gap-3 transition-all">
                          Read Narrative <ChevronRight className="w-4 h-4" />
                       </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
