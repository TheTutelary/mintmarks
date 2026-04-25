import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Camera, ClipboardList, Award, Coins } from "lucide-react";
import Link from 'next/link';

export const metadata = {
  title: "How it Works — MintMarks",
  description: "Submit your coin in minutes and receive a professional expert evaluation.",
};

const steps = [
  { icon: Camera, title: "Photograph your asset", desc: "Capture clear high-resolution front and back photos of your heritage coin." },
  { icon: ClipboardList, title: "Submit Provenance", desc: "Provide all historical details known to you — origin, era, and previous ownership." },
  { icon: Award, title: "Curatorial Review", desc: "A verified platform expert evaluates the authenticity and condition of your submission." },
  { icon: Coins, title: "Secure Valuation", desc: "Receive a professional appraisal report with detailed historical context and value estimation." },
] as const;

export default function HowItWorksPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Header />
      
      <main>
        <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h1 className="font-serif text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl mb-6">
              The Path to Discovery
            </h1>
            <p className="text-xl text-neutral-500 font-serif italic">
              From submission to professional curatorial evaluation in four refined steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="group relative rounded-3xl border border-neutral-200/60 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
                  <s.icon className="h-8 w-8" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Heritage Stage 0{i + 1}</div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4">{s.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{s.desc}</p>
                
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-neutral-100 z-0" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-neutral-900 text-center text-white relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-4">Ready to unlock the secrets of your collection?</h2>
                <p className="text-neutral-400 mb-8 max-w-xl mx-auto italic">Join a community of elite collectors and professional numismatists.</p>
                <Link href={isLoggedIn ? "/submit" : "/auth/register"} className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-10 py-4 rounded-full transition-all shadow-lg active:scale-95">
                  {isLoggedIn ? "Start Your Submission" : "Begin Your First Submission"}
                </Link>
             </div>
             {/* Subtle background decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          </div>
        </section>
      </main>
    </div>
  );
}
