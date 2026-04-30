"use client";

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface CoinCardProps {
  coin: {
    id: string;
    title: string;
    metal: string;
    grade: string;
    status: string;
    imageUrl: string;
    expert: string;
    valuation: string;
  };
}

export function CoinCard({ coin }: CoinCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-coin overflow-hidden hover:shadow-premium transition-all duration-500 border border-neutral-100 flex flex-col h-full active:scale-[0.98]">
      {/* Image Container with Velvet background aesthetic */}
      <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={coin.imageUrl} 
          alt={coin.title} 
          className="object-cover w-full h-full rounded-full shadow-[0_0_50px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        
        {/* Status Badge */}
        <div className="absolute top-5 right-5">
          <Badge variant="brand" className="bg-brand-500/90 text-white border-brand-400 backdrop-blur-md px-4 py-2">
            {coin.grade}
          </Badge>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-serif-black text-2xl text-neutral-900 leading-tight group-hover:text-brand-600 transition-colors">
            {coin.title}
          </h3>
          <span className="text-brand-700 font-black text-lg whitespace-nowrap">
            {coin.valuation}
          </span>
        </div>
        
        <div className="mt-auto pt-6 border-t border-neutral-100 grid grid-cols-2 gap-6">
          <div>
            <p className="text-neutral-400 text-[10px] uppercase tracking-widest font-black mb-1">Composition</p>
            <p className="text-neutral-700 font-bold text-sm">{coin.metal}</p>
          </div>
          <div>
            <p className="text-neutral-400 text-[10px] uppercase tracking-widest font-black mb-1">Curator</p>
            <p className="text-neutral-700 font-bold text-sm truncate">{coin.expert}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
