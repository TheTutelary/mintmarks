"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getApiUrl } from '@/lib/api';
import { ShieldCheck, Award, MapPin, ChevronRight } from 'lucide-react';
import { Button, Container } from '@/components/ui';

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
    const token = localStorage.getItem('mintmarks_token');
    setIsLoggedIn(!!token);

    fetch(getApiUrl('/api/showcase'))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedItems(data.filter((item: any) => item.featured).slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 w-full flex justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-300/10 blur-[120px] rounded-full" />

        <Container size="md" className="relative z-10 text-center flex flex-col items-center">
            <div className="mb-10 inline-flex items-center gap-2 border border-brand-300 text-brand-800 px-4 py-1.5 rounded-full text-sm font-bold bg-brand-50/50 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Showcase Gallery Now Live
            </div>
            
            <h1 
              className="font-serif-black text-neutral-900 tracking-tight leading-[1.1] mb-2" 
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.25rem)' }}
            >
              Every coin has a story.
            </h1>
            <h1 
              className="font-serif italic font-black text-brand-600 tracking-tight leading-[1.1] mb-8" 
              style={{ fontWeight: 900, fontSize: 'clamp(2.25rem, 7vw, 4.75rem)' }}
            >
              We help you discover it.
            </h1>
            
            <p 
              className="max-w-[80vw] md:max-w-2xl text-neutral-500 font-medium leading-relaxed mb-12"
              style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}
            >
              The professional standard for numismatic authentication and historical verification. 
              Secure definitive, expert-led appraisals covering provenance, rarity, and 
              market valuation for your most significant assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
              <Button 
                href={isLoggedIn ? "/submit" : "/auth/register"} 
                size="lg"
                rightIcon={<ChevronRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Submit a Coin
              </Button>
              <Button 
                href="/showcase" 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/50 backdrop-blur-sm"
              >
                View the Collection
              </Button>
            </div>
        </Container>
      </section>

      {/* Value Pillars */}
      <section className="border-y border-neutral-200/50 bg-neutral-50/50 py-20">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center gap-6 px-4 group">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="font-serif-black text-2xl text-neutral-900">Uncompromising Integrity</h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Independent curatorial analysis free from the conflict of interest inherent in trading.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center gap-6 px-4 border-y md:border-y-0 md:border-x border-neutral-200/50 py-12 md:py-0 group">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="font-serif-black text-2xl text-neutral-900">Expert Verification</h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Direct connection to world-renowned numismatists and heritage experts.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center gap-6 px-4 group">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="font-serif-black text-2xl text-neutral-900">Global Perspective</h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Tracking provenance and historical significance across centuries and continents.
              </p>
            </div>
        </Container>
      </section>

      {/* Featured Showcase Preview */}
      {featuredItems.length > 0 && (
        <section className="py-24">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="font-serif-black text-4xl md:text-5xl text-neutral-900">Recently Verified</h2>
                <p className="mt-4 text-neutral-500 text-xl">Discover the latest masterpieces added to our curatorial exhibition.</p>
              </div>
              <Button href="/showcase" variant="ghost" className="text-brand-600 hover:text-brand-700 font-bold text-lg">
                Explore Full Gallery →
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <Link key={item.id} href={`/showcase/${item.id}`} className="group block rounded-3xl border border-neutral-200/60 bg-white p-6 hover:border-brand-300 hover:shadow-premium transition-all duration-300">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 mb-6 flex items-center justify-center">
                    <img 
                      src={item.coin.photos?.[0]?.url || item.coin.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div>
                    <h3 className="font-serif-black text-xl text-neutral-900 group-hover:text-brand-600 transition-colors leading-tight mb-2">
                      {item.title}
                    </h3>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                      {item.coin.year || 'Historical'} Review
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200/50 bg-neutral-50">
        <Container className="py-20">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full heritage-gradient shadow-md">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-serif italic font-black text-2xl text-neutral-900 leading-none">MintMarks</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-base font-bold text-neutral-500">
              <Link href="/about" className="hover:text-neutral-900 transition-colors">About</Link>
              <Link href="/showcase" className="hover:text-neutral-900 transition-colors">Showcase</Link>
              <Link href="/faq" className="hover:text-neutral-900 transition-colors">FAQ</Link>
              <Link href="/how-it-works" className="hover:text-neutral-900 transition-colors">Process</Link>
            </nav>
            
            <div className="text-sm text-neutral-400 font-medium">
              © {new Date().getFullYear()} MintMarks. Preserving numismatic history.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
