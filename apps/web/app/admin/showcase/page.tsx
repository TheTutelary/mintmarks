"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Sparkles, Trash2, ExternalLink, Globe, LayoutGrid, Eye, History } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import { Button, Container, Badge } from '@/components/ui';

interface ShowcaseItem {
  id: string;
  coinId: string;
  title: string;
  story: string | null;
  displayMode: string;
  featured: boolean;
  publishedAt: string;
  coin: {
    imageUrl: string;
    photos: { url: string }[];
  }
}

const MOCK_SHOWCASE: ShowcaseItem[] = [
  {
    id: "s1",
    coinId: "c1",
    title: "1862 Victoria Rupee",
    story: "A pristine example of colonial numismatics, verified for its rare Bombay Mint marks.",
    displayMode: "FULL",
    featured: true,
    publishedAt: new Date().toISOString(),
    coin: { imageUrl: "", photos: [] }
  },
  {
    id: "s2",
    coinId: "c2",
    title: "Ancient Roman Denarius",
    story: "Dating back to the reign of Hadrian, this silver denarius shows remarkable preservation of the imperial portrait.",
    displayMode: "FULL",
    featured: false,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    coin: { imageUrl: "", photos: [] }
  }
];

export default function AdminShowcasePage() {
  const [items, setItems] = useState<ShowcaseItem[]>(MOCK_SHOWCASE);
  const [loading, setLoading] = useState(false); // Set to false for demo

  return (
    <main className="min-h-screen bg-neutral-100 pb-32">
      <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 pt-16 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Museum Curation Panel</span>
              </div>
              <h1 className="font-serif-black text-4xl text-neutral-900 tracking-tight leading-none">Public Gallery</h1>
              <p className="mt-3 text-neutral-500 font-serif italic text-lg">Curating the definitive public exhibition of verified assets.</p>
            </div>
            <Button
              leftIcon={<Plus className="w-4 h-4" />}
              className="shadow-premium active:scale-95 transition-transform"
            >
              Add Verified Asset
            </Button>
          </div>
        </Container>
      </div>

      <Container className="mt-12">
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white border border-neutral-200/60 shadow-sm rounded-[2.5rem] p-8 flex flex-col md:flex-row md:items-center gap-10 hover:shadow-premium transition-all duration-500">
              <div className="relative w-32 h-32 shrink-0 rounded-[2rem] overflow-hidden bg-neutral-900 flex items-center justify-center shadow-lg border border-neutral-200">
                <span className="text-brand-500 text-4xl font-serif-black">M</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                {item.featured && (
                  <div className="absolute top-2 right-2">
                    <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-serif-black text-2xl text-neutral-900 group-hover:text-brand-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  {item.featured && <Badge variant="brand">Featured Masterpiece</Badge>}
                </div>
                <p className="text-neutral-500 text-base line-clamp-2 max-w-3xl italic font-serif leading-relaxed border-l-2 border-brand-100 pl-6 py-1">
                  "{item.story || 'The curatorial board has not yet documented the public narrative for this discovery.'}"
                </p>
                <div className="flex items-center gap-6 mt-6">
                   <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                     <History className="w-3.5 h-3.5" /> Published {new Date(item.publishedAt).toLocaleDateString()}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                     <LayoutGrid className="w-3.5 h-3.5" /> Mode: {item.displayMode}
                   </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-3">
                <Button size="sm" variant="outline" className="p-3">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
