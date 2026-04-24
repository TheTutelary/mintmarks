"use client";

import React from 'react';
import Image from 'next/image';

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
    <div className="group relative bg-white rounded-[24px] shadow-coin overflow-hidden hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full active:scale-[0.98]">
      {/* Image Container with Velvet background aesthetic */}
      <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-6">
        {/* We use external images for the mock, so we need config in next.config.ts if strictly using Next/Image. For now, an img tag or unoptimized works */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={coin.imageUrl} 
          alt={coin.title} 
          className="object-cover w-full h-full rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-brand-500/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-400">
          {coin.grade}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif font-bold text-xl text-neutral-900 leading-tight">
            {coin.title}
          </h3>
          <span className="text-brand-700 font-bold whitespace-nowrap">
            {coin.valuation}
          </span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-wider font-bold mb-1">Metal</p>
            <p className="text-neutral-700 font-medium">{coin.metal}</p>
          </div>
          <div>
            <p className="text-neutral-400 text-xs uppercase tracking-wider font-bold mb-1">Expert</p>
            <p className="text-neutral-700 font-medium truncate">{coin.expert}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
