"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

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

export default function AdminSubmissions() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('mintmarks_token');
      try {
        const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const response = await fetch(`http://${apiHost}:4000/api/admin/submissions`, {
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

  const handleStatusChange = async (coinId: string, newStatus: string) => {
    const token = localStorage.getItem('mintmarks_token');
    const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    await fetch(`http://${apiHost}:4000/api/admin/coins/${coinId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    setCoins(prev => prev.map(c => c.id === coinId ? { ...c, status: newStatus } : c));
  };

  const handleAssignExpert = async (coinId: string, expertId: string) => {
    const token = localStorage.getItem('mintmarks_token');
    const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    await fetch(`http://${apiHost}:4000/api/admin/coins/${coinId}/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ expertId })
    });
    
    setCoins(prev => prev.map(c => {
      if (c.id === coinId) {
        const newStatus = (expertId && (c.status === 'SUBMITTED' || c.status === 'DRAFT')) ? 'ASSIGNED' : c.status;
        const expert = experts.find(e => e.id === expertId);
        return { ...c, status: newStatus, assignedExpert: expert || null };
      }
      return c;
    }));
  };

  const handlePromoteToShowcase = async (coin: Coin) => {
    const story = prompt(`Enter the public museum story for "${coin.title}":`, "A rare discovery recently verified by our experts...");
    if (!story) return;

    const token = localStorage.getItem('mintmarks_token');
    const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const response = await fetch(`http://${apiHost}:4000/api/admin/showcase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        coinId: coin.id,
        title: coin.title,
        story,
        displayMode: 'FULL',
        featured: true
      })
    });

    if (response.ok) {
      const newItem = await response.json();
      setCoins(prev => prev.map(c => c.id === coin.id ? { ...c, showcaseItem: newItem } : c));
      alert('Promoted to Showcase successfully!');
    } else {
      alert('Failed to promote to showcase.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-neutral-900">Admin Console: Submissions</h1>
          <p className="mt-1 text-neutral-600">Review assets, manage status, and assign evaluation experts.</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>
      ) : coins.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center text-neutral-500">
          No submissions found in the system.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4">Asset Details</th>
                <th className="px-6 py-4">Collector</th>
                <th className="px-6 py-4">Expert Assignment</th>
                <th className="px-6 py-4">Status Action</th>
                <th className="px-6 py-4">Gallery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {coins.map(coin => (
                <tr key={coin.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-neutral-900 font-serif text-lg">{coin.title}</div>
                    <div className="text-neutral-500">{[coin.country, coin.year, coin.metal].filter(Boolean).join(' • ') || '—'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{coin.owner.name}</div>
                    <div className="text-neutral-500 text-xs">{coin.owner.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={coin.assignedExpert?.id || ""}
                      onChange={(e) => handleAssignExpert(coin.id, e.target.value)}
                      className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none w-full max-w-[200px]"
                    >
                      <option value="">— Unassigned —</option>
                      {experts.map(ex => (
                         <option key={ex.id} value={ex.id}>{ex.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={coin.status}
                      onChange={(e) => handleStatusChange(coin.id, e.target.value)}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm font-bold text-brand-700 outline-none tracking-wide"
                    >
                      {['DRAFT', 'SUBMITTED', 'ASSIGNED', 'IN_EVALUATION', 'EVALUATED', 'APPROVED'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {coin.showcaseItem ? (
                      <div className="flex items-center gap-1 text-green-600 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" /> Published
                      </div>
                    ) : (
                      <button 
                        onClick={() => handlePromoteToShowcase(coin)}
                        disabled={coin.status !== 'APPROVED' && coin.status !== 'EVALUATED'}
                        className="flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="w-3 h-3" /> Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
