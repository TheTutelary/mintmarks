"use client";

import React, { useEffect, useState } from 'react';
import { CoinCard } from './CoinCard';
import { Loader2 } from 'lucide-react';

export function ShowcaseGrid() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/showcase');
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setCoins(data.coins);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-brand-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-neutral-500 font-medium">Curating Collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 bg-red-50 rounded-3xl">
        <p className="font-bold">Gallery unavailable</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
