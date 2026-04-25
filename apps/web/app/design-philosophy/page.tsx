import React from 'react';
import { Header } from '@/components/layout/Header';
import { Palette, Layers, Shield, Database, Sparkles } from "lucide-react";

export const metadata = {
  title: "Design Philosophy — MintMarks",
  description: "The curatorial principles and architecture of the MintMarks platform.",
};

export default function DesignPhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Header />
      
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-6">
          <Sparkles className="h-4 w-4" />
          The Curatorial Blueprint
        </div>
        
        <h1 className="font-serif text-5xl font-bold tracking-tight text-neutral-900 mb-8">
          Design Philosophy & Heritage Architecture
        </h1>
        
        <p className="text-xl text-neutral-500 font-serif italic leading-relaxed mb-20 border-l-4 border-brand-200 pl-8">
          MintMarks is built on the conviction that every heritage asset is a portal to history. Our architecture is designed not just to store data, but to preserve provenance.
        </p>

        <section className="space-y-24">
          {/* Visual Language */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-50 rounded-2xl text-brand-700">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold">Visual Language</h2>
            </div>
            
            <div className="grid gap-8">
              <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3 text-neutral-900">Digital Reverence</h3>
                <p className="text-neutral-500 leading-relaxed">
                  We avoid the high-velocity "flash" of modern fintech. Instead, we use a palette of bone-whites, museum creams, and deep charcoals. Whitespace is used as a frame, ensuring the photography of your collection remains the absolute focus.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3 text-neutral-900">One Purpose per Surface</h3>
                <p className="text-neutral-500 leading-relaxed">
                  Our interfaces are designed for deep work. The submission page is a quiet ritual; the expert portal is a focused queue. We resist the urge to clutter the screen with secondary metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Architecture */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-50 rounded-2xl text-brand-700">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold">Security & Integrity</h2>
            </div>

            <div className="bg-neutral-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
               <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-brand-400 font-serif text-lg font-bold mb-2">Native Row-Level Security</h3>
                    <p className="text-neutral-400 leading-relaxed">
                      We do not trust third-party logic alone. Our security is baked into the PostgreSQL engine itself, ensuring that unauthorized cross-user access is impossible at the foundation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-brand-400 font-serif text-lg font-bold mb-2">Agnostic Sovereignty</h3>
                    <p className="text-neutral-400 leading-relaxed">
                      Your data is not locked in a proprietary cloud. The MintMarks stack is designed to be fully portable — from a local private server to a secure global cloud — maintaining 100% control over the media and the ledger.
                    </p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
          </div>

          {/* Stack Summary */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-50 rounded-2xl text-brand-700">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold">The Technical Stack</h2>
            </div>
            
            <div className="border border-neutral-200 rounded-3xl overflow-hidden divide-y divide-neutral-100">
              <div className="grid grid-cols-[160px_1fr] p-6 bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Core</span>
                <span className="font-serif text-neutral-900">Next.js 16 + TypeScript</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] p-6 bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Styling</span>
                <span className="font-serif text-neutral-900">Tailwind CSS v4 (Semantic Tokens)</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] p-6 bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Database</span>
                <span className="font-serif text-neutral-900">PostgreSQL + Prisma ORM</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] p-6 bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">File Storage</span>
                <span className="font-serif text-neutral-900">Local Disk File Streaming (Agnostic)</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-32 text-center border-t border-neutral-100 pt-16">
          <p className="text-neutral-400 font-serif italic">
            MintMarks: Digital preservation for the heritage of the future.
          </p>
        </div>
      </main>
    </div>
  );
}
