import React from 'react';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: "About MintMarks — Our Mission",
  description: "MintMarks connects collectors with professional numismatists for trusted, remote coin evaluation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Header />
      
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-neutral-900 mb-12 border-b border-neutral-100 pb-8">
          About MintMarks
        </h1>
        
        <div className="space-y-8 text-xl text-neutral-600 font-serif leading-relaxed">
          <p className="italic text-neutral-900 border-l-4 border-brand-500 pl-6 py-2">
            MintMarks was founded to bridge the gap between ancient heritage and modern accessibility. 
          </p>
          
          <p>
            We believe that you shouldn't have to risk mailing your most valuable heirlooms across the country just to understand their significance. Our platform was built to provide honest, professional numismatic evaluations entirely remotely.
          </p>
          
          <p>
            We connect collectors directly with verified experts who bring decades of historical knowledge to every review. Whether you've inherited a single curious piece or you're meticulously building a legendary collection, our mission is to provide you with the clarity you deserve.
          </p>
          
          <p>
            At MintMarks, every asset is treated as a story worth telling. We help you understand not just the grade or the market value, but the historical era and context that make your collection truly unique.
          </p>
        </div>

        <div className="mt-24 p-12 rounded-[3rem] bg-neutral-50 border border-neutral-200/60 shadow-inner">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-4">Our Integrity Promise</h3>
           <p className="text-neutral-500 font-serif italic text-lg leading-relaxed">
             We do not buy or sell coins. We provide independent, expert curatorial opinions only. This ensures that our experts' evaluations are always unbiased and focused entirely on accuracy and historical truth.
           </p>
        </div>
      </main>
    </div>
  );
}
