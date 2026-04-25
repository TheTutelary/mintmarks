"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getApiUrl } from '@/lib/api';
import { ShieldCheck, Award, MapPin } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  story: string | null;
  featured: boolean;
  coin: {
    photos: { url: string }[];
    imageUrl: string;
    year: string | null;
  }
}

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<ShowcaseItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('mintmarks_token');
    setIsLoggedIn(!!token);

    fetch(getApiUrl('/api/showcase'))
      .then(res => res.json())
      .then(data => setFeaturedItems(data.filter((item: any) => item.featured).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#EFEFEA]">
      <Header />
      
      {/* Exact Hero Section from Initial Design */}
      <section className="relative px-4 py-24 md:py-32 w-full flex justify-center">
        <div className="container max-w-5xl relative z-10 text-center flex flex-col items-center">
            
            <div className="mb-10 inline-flex items-center gap-2 border border-[#DBB382] text-[#9A5000] px-4 py-1.5 rounded-full text-sm font-bold bg-transparent">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E58F16]" />
              Showcase Gallery Now Live
            </div>
            
            <h1 
              className="font-serif font-black text-neutral-900 tracking-tight leading-[1.1] mb-2 whitespace-nowrap" 
              style={{ fontWeight: 900, fontSize: 'clamp(24px, 8vw, 82px)' }}
            >
              Every coin has a story.
            </h1>
            <h1 
              className="font-serif italic font-black text-[#DE8618] tracking-tight leading-[1.1] mb-8 whitespace-nowrap" 
              style={{ fontWeight: 900, fontSize: 'clamp(22px, 7vw, 75px)' }}
            >
              We help you discover it.
            </h1>
            
            <p 
              className="max-w-[80vw] md:max-w-[48rem] text-[#7A7A7A] font-medium leading-relaxed mb-12"
              style={{ fontSize: 'clamp(14px, 4vw, 20px)' }}
            >
              The professional standard for numismatic authentication and historical verification. 
              Secure definitive, expert-led appraisals covering provenance, rarity, and 
              market valuation for your most significant assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-[80vw] sm:w-full">
              <Link 
                href={isLoggedIn ? "/submit" : "/auth/register"} 
                className="bg-[#E69123] text-white font-bold rounded-[1.25rem] hover:bg-[#D4811B] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                style={{
                  fontSize: 'clamp(14px, 4vw, 18px)',
                  padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2rem)'
                }}
              >
                Submit a Coin <span>›</span>
              </Link>
              <Link 
                href="/showcase" 
                className="bg-[#F3F3F3] border border-[#E5E5E5] text-neutral-900 font-bold rounded-[1.25rem] hover:bg-[#E5E5E5] transition-colors w-full sm:w-auto flex items-center justify-center"
                style={{
                  fontSize: 'clamp(14px, 4vw, 18px)',
                  padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2rem)'
                }}
              >
                View the Collection
              </Link>
            </div>
            
        </div>
      </section>

      {/* Value Pillars - Restored alignment, kept improved text */}
      <section className="border-y border-neutral-200/50 bg-[#F4F4F0] py-16">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8 max-w-6xl">
            <div className="flex flex-col items-center text-center gap-4 px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFECE5] text-[#D0841E]">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-black text-neutral-900">Uncompromising Integrity</h3>
              <p className="text-neutral-600 text-[1.1rem] leading-relaxed">
                Independent curatorial analysis free from the conflict of interest inherent in trading.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 px-6 border-y md:border-y-0 md:border-x border-neutral-200/50 py-8 md:py-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFECE5] text-[#D0841E]">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-black text-neutral-900">Expert Verification</h3>
              <p className="text-neutral-600 text-[1.1rem] leading-relaxed">
                Direct connection to world-renowned numismatists and heritage experts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFECE5] text-[#D0841E]">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-black text-neutral-900">Global Perspective</h3>
              <p className="text-neutral-600 text-[1.1rem] leading-relaxed">
                Tracking provenance and historical significance across centuries and continents.
              </p>
            </div>
        </div>
      </section>

      {/* Featured Showcase Preview */}
      {featuredItems.length > 0 && (
        <section className="py-24 bg-[#EFEFEA]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="font-serif text-[2.5rem] font-black text-neutral-900">Recently Verified</h2>
                <p className="mt-2 text-neutral-600 text-lg">Discover the latest masterpieces added to our curatorial exhibition.</p>
              </div>
              <Link href="/showcase" className="mt-4 md:mt-0 text-[#E69123] font-bold text-lg hover:text-[#C57A1A] transition-colors">
                Explore Full Gallery →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <Link key={item.id} href={`/showcase/${item.id}`} className="group block rounded-[1.5rem] border border-neutral-200/60 bg-white p-6 hover:border-[#E8B677] hover:shadow-xl transition-all">
                  <div className="relative aspect-square rounded-[1rem] overflow-hidden bg-neutral-100 mb-6">
                    <img 
                      src={item.coin.photos?.[0]?.url || item.coin.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.35rem] font-black text-neutral-900 group-hover:text-[#E69123] transition-colors leading-tight mb-2">{item.title}</h3>
                    <div className="text-sm font-medium text-neutral-500">{item.coin.year || 'Historical'} curatorial review</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Restored Original Footer */}
      <footer className="border-t border-neutral-200/50 bg-[#EFEFEA]">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#E69123] to-[#B65D0A] shadow-md">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-serif text-[1.25rem] font-black italic text-neutral-900 leading-none">MintMarks</span>
            </div>
            <nav className="flex gap-8 text-[1.05rem] font-medium text-neutral-600">
              <Link href="/about" className="hover:text-neutral-900 transition-colors border-r border-neutral-200 pr-8">About</Link>
              <Link href="/showcase" className="hover:text-neutral-900 transition-colors border-r border-neutral-200 pr-8">Showcase</Link>
              <Link href="/faq" className="hover:text-neutral-900 transition-colors">FAQ</Link>
            </nav>
            <div className="text-sm text-neutral-500 italic">
              © {new Date().getFullYear()} MintMarks. Preserving numismatic history.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
