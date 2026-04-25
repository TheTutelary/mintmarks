import React from 'react';
import { Header } from '@/components/layout/Header';
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — MintMarks",
  description: "Common inquiries regarding professional heritage evaluation and platform security.",
};

const faqs = [
  { q: "How long does a curatorial evaluation take?", a: "Most professional reports are returned within 3 to 5 business days. Our experts take the time necessary to verify historical context and condition." },
  { q: "Is the evaluation report legally certified?", a: "No. MintMarks provides professional curatorial opinions based on photographic evidence. While highly respected, they are not legal appraisals for insurance or tax purposes." },
  { q: "What photography standards are required?", a: "To ensure accuracy, we require high-resolution, well-lit photographs of the obverse (front), reverse (back), and edge. Neutral backgrounds are highly recommended." },
  { q: "Will my collections remain private?", a: "Absolutely. By default, all submissions are private. Only with your explicit permission as the 'Custodian' will an asset be featured in our curated public Showcase." },
  { q: "Do I need to ship my assets to MintMarks?", a: "Never. MintMarks is a remote digital evaluation service. Your heritage piece remains in your possession, ensuring zero transit risk." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Header />
      
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-3xl">
        <div className="flex justify-center mb-10">
          <div className="p-4 bg-brand-50 rounded-full text-brand-700">
            <HelpCircle className="w-10 h-10" />
          </div>
        </div>
        
        <h1 className="font-serif text-5xl font-bold tracking-tight text-neutral-900 text-center mb-16">
          Collector Inquiries
        </h1>
        
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-neutral-100 rounded-[2rem] p-10 shadow-sm hover:shadow-md transition-shadow">
               <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 flex gap-4">
                 <span className="text-brand-300">Q.</span>
                 {f.q}
               </h3>
               <div className="flex gap-4">
                 <span className="text-brand-500 font-bold">A.</span>
                 <p className="text-neutral-500 leading-relaxed italic">
                   {f.a}
                 </p>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">Have another question?</h2>
           <p className="text-neutral-500 mb-8 font-serif italic">Our curators are always available to discuss the history of your collection.</p>
           <a href="mailto:support@mintmarks.in" className="inline-block border-2 border-neutral-900 text-neutral-900 font-bold px-10 py-3 rounded-full hover:bg-neutral-900 hover:text-white transition-all">
             Contact the Curators
           </a>
        </div>
      </main>
    </div>
  );
}
