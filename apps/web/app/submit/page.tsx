"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { METALS } from '@mintmarks/shared';
import { ChevronRight, ChevronLeft, Upload, Check, Loader2 } from 'lucide-react';

const STEPS = ['Details', 'Photography', 'Review'];

export default function SubmitCoinPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    metal: '',
    imageUrl: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('mintmarks_token');
      if (!token) {
        alert('Please sign in first.');
        router.push('/auth/login');
        return;
      }

      const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const response = await fetch(`http://${apiHost}:4000/api/coins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      alert('Your coin has been submitted for evaluation!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Submit a Coin</h1>
          <p className="text-neutral-500 mt-2">Heritage evaluation in three simple steps</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i <= step ? 'bg-brand-500 text-white' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${
                  i <= step ? 'text-brand-700' : 'text-neutral-400'
                }`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 ${i < step ? 'bg-brand-500' : 'bg-neutral-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white border border-neutral-200/60 shadow-coin rounded-3xl p-8">
          {/* Step 1: Details */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Coin Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., 1862 Victoria Rupee"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Metal Type</label>
                <select
                  value={formData.metal}
                  onChange={(e) => updateField('metal', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                >
                  <option value="">Select a metal</option>
                  {METALS.map((metal) => (
                    <option key={metal} value={metal}>{metal}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Description & Historical Context</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Provide provenance, era, mint marks, and any known history..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Photography */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-12 text-center hover:border-brand-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500 font-medium">Drop high-res photos here</p>
                <p className="text-neutral-400 text-sm mt-1">or paste an image URL below</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => updateField('imageUrl', e.target.value)}
                  placeholder="https://example.com/coin-photo.jpg"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              {formData.imageUrl && (
                <div className="mt-4 rounded-2xl overflow-hidden bg-neutral-900 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.imageUrl} alt="Preview" className="w-full max-h-64 object-contain rounded-xl" />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Review Your Submission</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Title</p>
                  <p className="text-neutral-900 font-medium mt-1">{formData.title || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Metal</p>
                  <p className="text-neutral-900 font-medium mt-1">{formData.metal || '—'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Description</p>
                <p className="text-neutral-700 mt-1 text-sm leading-relaxed">{formData.description || 'No description provided.'}</p>
              </div>

              {formData.imageUrl && (
                <div className="rounded-2xl overflow-hidden bg-neutral-900 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.imageUrl} alt="Preview" className="w-full max-h-48 object-contain rounded-xl" />
                </div>
              )}

              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
                <p className="font-bold">What happens next?</p>
                <p className="mt-1 opacity-80">Your coin will be reviewed by a certified numismatic expert. You&apos;ll receive a detailed evaluation report including grade, valuation, and historical significance.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-neutral-100">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 0 && (!formData.title || !formData.metal)}
                className="bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit for Evaluation'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
