"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Coins, Calendar, ChevronRight, PenTool, ClipboardCheck, Info, Search } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import Link from 'next/link';
import { Button, Container, Badge } from '@/components/ui';

const MOCK_ASSIGNED: any[] = [
  {
    id: "101",
    title: "Rare Edward VII Gold Sovereign",
    status: "ASSIGNED",
    createdAt: new Date().toISOString(),
    metal: "Gold",
    country: "United Kingdom"
  },
  {
    id: "102",
    title: "Indo-Greek Silver Drachm - Menander I",
    status: "IN_EVALUATION",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    metal: "Silver",
    country: "Indo-Greek Kingdom"
  }
];

export default function ExpertDashboard() {
  const [coins, setCoins] = useState<any[]>(MOCK_ASSIGNED);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-100 pb-32">
      <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 pt-16 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <PenTool className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curatorial Review Board</span>
              </div>
              <h1 className="font-serif-black text-4xl text-neutral-900 tracking-tight leading-none">Expert Workbench</h1>
              <p className="mt-3 text-neutral-500 font-serif italic text-lg">Detailed analysis and heritage verification for assigned assets.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-2xl border border-neutral-200 shadow-sm">
               <Button variant="ghost" size="sm" className="bg-neutral-100 text-neutral-900 px-8">Active Cases</Button>
               <Button variant="ghost" size="sm" className="text-neutral-400 px-8">Completed</Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-12">
        <div className="grid gap-6">
          {coins.map((coin) => (
            <div key={coin.id} className="group bg-white border border-neutral-200/60 shadow-sm rounded-[2.5rem] p-8 flex flex-col md:flex-row md:items-center gap-10 hover:shadow-premium transition-all duration-500">
              <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center shadow-lg border border-neutral-200">
                <span className="text-brand-500 text-3xl font-serif-black">M</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-serif-black text-2xl text-neutral-900 group-hover:text-brand-600 transition-colors leading-tight truncate">
                    {coin.title}
                  </h3>
                  <Badge variant={coin.status === 'IN_EVALUATION' ? 'brand' : 'neutral'} className="shrink-0">
                    {coin.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                   <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest truncate">
                     <Calendar className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Assigned {new Date(coin.createdAt).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest truncate">
                     <PenTool className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Origin: {coin.country}</span>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest truncate">
                     <ClipboardCheck className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Composition: {coin.metal}</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-l border-neutral-100 pl-10 shrink-0 w-[220px]">
                 <Button 
                    href={`/expert/evaluate/${coin.id}`} 
                    className="w-full justify-center shadow-premium active:scale-95 transition-transform"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                 >
                    Begin Analysis
                 </Button>
              </div>
            </div>
          ))}
        </div>

        {coins.length > 0 && (
           <div className="mt-12 bg-brand-50/50 rounded-[2.5rem] p-10 border border-brand-100 flex gap-8 items-start">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-brand-600 shadow-sm shrink-0">
                 <Info className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                 <h4 className="font-serif-black text-xl text-brand-900 tracking-tight">Expert Code of Conduct</h4>
                 <p className="text-brand-800/70 leading-relaxed max-w-4xl text-sm italic">
                    "Every evaluation carries the weight of numismatic history. Ensure all scientific grades and historical narratives 
                    are backed by verifiable provenance and objective physical analysis."
                 </p>
              </div>
           </div>
        )}
      </Container>
    </main>
  );
}
