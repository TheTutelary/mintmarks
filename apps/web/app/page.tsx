"use client";

import { Header } from '@/components/layout/Header';
import { ShowcaseGrid } from '@/components/gallery/ShowcaseGrid';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-brand-500 selection:text-white">
      <Header />

      <main>
        {/* Premium Hero Section — Full Viewport */}
        <section className="relative px-4 min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="relative z-10 max-w-3xl border border-brand-200 bg-brand-50/50 backdrop-blur-sm rounded-full px-6 py-2 mb-8 inline-flex items-center gap-3 text-brand-800 text-sm font-bold tracking-wide shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Platform Now Live for Curators
          </div>

          <h1 className="relative z-10 text-5xl md:text-7xl font-serif font-bold text-neutral-900 tracking-tight leading-[1.1] mb-8">
            Every coin has a story.<br/> 
            <span className="italic text-brand-600">We help you discover it.</span>
          </h1>

          <p className="relative z-10 text-lg md:text-xl text-neutral-500 max-w-2xl mb-12 font-medium">
            A paid coin evaluation platform where collectors upload coin photographs, add details, and receive expert-level evaluations covering origin, era, metal, grade, rarity, market value, and historical narrative.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link 
              href="/auth/register"
              className="bg-brand-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              Submit a Coin
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#gallery"
              className="bg-white text-neutral-900 border border-neutral-200 font-bold text-lg px-8 py-4 rounded-2xl shadow-sm hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center"
            >
              View the Collection
            </a>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="px-4 py-24 bg-white border-t border-neutral-200/50 relative">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Verified Collection</h2>
                <p className="text-neutral-500">Explore recently authenticated heritage assets.</p>
              </div>
            </div>
            
            <ShowcaseGrid />
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 text-neutral-400 py-12 px-4 border-t border-brand-900/50">
        <div className="container mx-auto text-center">
          <p className="font-serif italic text-2xl text-neutral-50 mb-4 opacity-50">MintMarks</p>
          <p className="text-sm">© 2026 MintMarks.in — Heritage Craft Design System.</p>
        </div>
      </footer>
    </div>
  );
}
