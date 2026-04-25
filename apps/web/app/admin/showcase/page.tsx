"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Sparkles, Trash2, ExternalLink } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

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

export default function AdminShowcasePage() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      const token = localStorage.getItem('mintmarks_token');
      try {
        const response = await fetch(getApiUrl('/api/showcase'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
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

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this item from the public showcase?')) return;
    const token = localStorage.getItem('mintmarks_token');
    const response = await fetch(getApiUrl(`/api/admin/showcase/${id}`), {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Gallery Curation</h1>
          <p className="text-neutral-500 mt-1">Manage items featured in the public museum showcase.</p>
        </div>
        <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Add Verified Asset
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-neutral-200 rounded-[3rem] bg-white">
           <Sparkles className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
           <p className="text-neutral-400 font-serif text-lg">The gallery is currently empty.</p>
           <p className="text-neutral-300 text-sm mt-2">Promote evaluated coins to the showcase from the Submissions tab.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-neutral-100 rounded-3xl p-6 flex gap-6 items-center hover:shadow-lg transition-all group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg shrink-0">
                <img 
                  src={item.coin.photos?.[0]?.url || item.coin.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif font-bold text-xl text-neutral-900">{item.title}</h3>
                  {item.featured && <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
                </div>
                <p className="text-neutral-500 text-sm line-clamp-2 max-w-2xl italic font-serif">"{item.story || 'No public story written yet.'}"</p>
                <div className="flex items-center gap-4 mt-3">
                   <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest px-2 py-1 bg-neutral-50 rounded-lg">Mode: {item.displayMode}</span>
                   <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest px-2 py-1 bg-neutral-50 rounded-lg">Published: {new Date(item.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 text-neutral-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all">
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-3 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
