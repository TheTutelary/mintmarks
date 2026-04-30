"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2, Search, User, Mail, Calendar, ShieldCheck, ChevronRight, ChevronDown } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import { Button, Container, Badge } from '@/components/ui';

interface Coin {
  id: string;
  title: string;
  country: string | null;
  year: string | null;
  metal: string | null;
  status: string;
  createdAt: string;
  owner: { id: string; name: string; email: string };
  assignedExpert: { id: string; name: string } | null;
  showcaseItem?: { id: string };
}

interface Expert {
  id: string;
  name: string;
}

const MOCK_SUBMISSIONS: Coin[] = [
  {
    id: "1",
    title: "1862 Victoria Rupee, Bombay Mint",
    country: "British India",
    year: "1862",
    metal: "Silver",
    status: "APPROVED",
    createdAt: new Date().toISOString(),
    owner: { id: "u1", name: "Vikram Seth", email: "vikram@example.com" },
    assignedExpert: { id: "e1", name: "Dr. Aris" },
    showcaseItem: undefined
  },
  {
    id: "2",
    title: "Mughal Empire Mohur - Akbar the Great",
    country: "Mughal Empire",
    year: "1594",
    metal: "Gold",
    status: "IN_EVALUATION",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    owner: { id: "u2", name: "Sarah Johnson", email: "sarah.j@museum.org" },
    assignedExpert: { id: "e1", name: "Dr. Aris" },
    showcaseItem: undefined
  }
];

const MOCK_EXPERTS: Expert[] = [
  { id: "e1", name: "Dr. Aris (Numismatist)" },
  { id: "e2", name: "Sushil Gulati (Heritage Expert)" }
];

const statusVariants: Record<string, 'brand' | 'accent' | 'neutral' | 'outline'> = {
  SUBMITTED: 'neutral',
  ASSIGNED: 'brand',
  IN_EVALUATION: 'brand',
  APPROVED: 'accent',
};

export default function AdminSubmissions() {
  const [coins, setCoins] = useState<Coin[]>(MOCK_SUBMISSIONS);
  const [experts, setExperts] = useState<Expert[]>(MOCK_EXPERTS);
  const [loading, setLoading] = useState(false); // Set to false for demo

  // Real fetch logic preserved but commented out for demo
  /*
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('mintmarks_token');
      try {
        const response = await fetch(getApiUrl('/api/admin/submissions'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCoins(data.coins);
          setExperts(data.experts);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);
  */

  return (
    <main className="min-h-screen bg-neutral-100 pb-32">
      <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 pt-16 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curation Board Control</span>
              </div>
              <h1 className="font-serif-black text-4xl text-neutral-900 tracking-tight leading-none">Submissions Queue</h1>
              <p className="mt-3 text-neutral-500 font-serif italic text-lg">Managing the flow of world-class numismatic heritage.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="pl-11 pr-6 py-3 bg-white border border-neutral-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all w-64 shadow-sm"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-12">
        <div className="bg-white border border-neutral-200/60 shadow-premium rounded-[3rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Heritage Asset</th>
                  <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Ownership</th>
                  <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Curator Assignment</th>
                  <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Board Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {coins.map(coin => (
                  <tr key={coin.id} className="group hover:bg-neutral-50/50 transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-900 shrink-0 shadow-lg border border-neutral-200 flex items-center justify-center font-serif-black text-brand-500">M</div>
                        <div>
                          <div className="font-serif-black text-xl text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">{coin.title}</div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <Calendar className="w-3 h-3" /> {new Date(coin.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold">
                          {coin.owner.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 text-sm">{coin.owner.name}</div>
                          <div className="text-neutral-400 text-[10px] font-bold tracking-tight">{coin.owner.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="relative">
                        <select
                          value={coin.assignedExpert?.id || ""}
                          className="appearance-none w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-2 text-[13px] font-bold text-neutral-700 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all cursor-pointer pr-10"
                        >
                          <option value="">— Unassigned —</option>
                          {experts.map(ex => (
                             <option key={ex.id} value={ex.id}>{ex.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <Badge variant={statusVariants[coin.status] || 'neutral'} className="py-1.5">
                        {coin.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-8 py-8 text-right">
                      {coin.status === 'APPROVED' ? (
                        <Button size="sm" variant="outline" className="text-[10px] border-brand-200 text-brand-700 bg-brand-50/50">
                          <Sparkles className="w-3 h-3 mr-2" /> Promote to Showcase
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-[10px] text-neutral-400">
                          Review Details <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </main>
  );
}
