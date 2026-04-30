"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { METALS } from '@mintmarks/shared';
import { ChevronRight, ChevronLeft, Upload, Check, Loader2, Info, Camera, PenTool, ClipboardCheck } from 'lucide-react';
import { getApiUrl } from '@/lib/api';
import { Button, Container, Badge } from '@/components/ui';

const STEPS = [
  { label: 'Details', icon: PenTool },
  { label: 'Photography', icon: Camera },
  { label: 'Review', icon: ClipboardCheck }
];

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

      if (token?.startsWith('mock.')) {
        setTimeout(() => {
          setSubmitting(false);
          alert('Your coin has been submitted for evaluation! (Bypass Mode)');
          router.push('/dashboard');
        }, 1000);
        return;
      }

      const response = await fetch(getApiUrl('/api/coins'), {
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
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="pb-32">
        {/* Header & Progress */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-neutral-200/60 pt-16 pb-12">
          <Container size="sm" className="text-center">
            <h1 className="font-serif-black text-4xl text-neutral-900 mb-4 tracking-tight">Submit for Evaluation</h1>
            <p className="text-neutral-500 font-serif italic text-lg mb-12">Heritage discovery begins with professional curatorial review.</p>

            {/* Step Indicator - Constrained and Dynamic */}
            <div className="flex items-center justify-between relative px-2 w-[75%] max-w-sm mx-auto">
              {/* Progress Line */}
              <div className="absolute top-5 left-6 right-6 h-0.5 bg-neutral-200 -z-10">
                <div 
                  className="h-full bg-brand-500 transition-all duration-500" 
                  style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} 
                />
              </div>

              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i <= step;
                const isCurrent = i === step;
                const isPast = i < step;
                const canClick = isPast || (i === step + 1 && formData.title && formData.metal);
                
                return (
                  <button 
                    key={s.label} 
                    onClick={() => canClick && setStep(i)}
                    disabled={!canClick && i > step}
                    className={`flex flex-col items-center gap-2 group transition-all ${!canClick && i > step ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                      isCurrent ? 'bg-brand-600 text-white border-brand-400 shadow-lg scale-110' :
                      isActive ? 'bg-brand-50 text-brand-600 border-brand-200 group-hover:bg-brand-100' : 
                      'bg-white text-neutral-300 border-neutral-100 group-hover:border-neutral-200'
                    }`}>
                      {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${
                      isActive ? 'text-brand-700' : 'text-neutral-400'
                    }`}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Container>
        </div>

        <Container size="sm" className="mt-8">
          <div className="bg-white border border-neutral-200/60 shadow-premium rounded-[2.5rem] overflow-hidden">
            <div className="p-8 md:p-10">
              {/* Step 1: Details */}
              {step === 0 && (
                <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Historical Designation</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="e.g., 1862 Victoria Rupee"
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 text-neutral-900 font-bold placeholder:text-neutral-300 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Primary Material</label>
                      <select
                        value={formData.metal}
                        onChange={(e) => updateField('metal', e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 text-neutral-900 font-bold focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="font-medium text-neutral-400">Select Composition...</option>
                        {METALS.map((metal) => (
                          <option key={metal} value={metal}>{metal}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Narrative & Context</label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      placeholder="Describe provenance, era, markings, and known history..."
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 text-neutral-900 font-bold placeholder:text-neutral-300 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Photography */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="group border-2 border-dashed border-neutral-100 rounded-2xl p-8 text-center hover:border-brand-300 hover:bg-brand-50/10 transition-all duration-300 cursor-pointer h-full flex flex-col justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 text-neutral-300 mx-auto mb-4 group-hover:scale-110 group-hover:bg-brand-50 group-hover:text-brand-500 transition-all duration-300">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-serif-black text-neutral-900 mb-1">High-Res Capture</h3>
                      <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Drop assets here</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Digital Asset URL</label>
                        <input
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) => updateField('imageUrl', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-5 py-3 text-neutral-900 font-bold placeholder:text-neutral-300 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                        />
                      </div>
                      
                      {formData.imageUrl && (
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center shadow-lg border border-neutral-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Designation</p>
                          <p className="text-neutral-900 font-bold text-sm truncate">{formData.title || 'Awaiting Title'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Composition</p>
                          <p className="text-brand-700 font-bold text-sm">{formData.metal || 'Not Specified'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2">Context</p>
                        <p className="text-neutral-700 text-sm font-serif italic leading-relaxed border-l-2 border-brand-100 pl-4 py-0.5 line-clamp-3">
                          {formData.description || 'No narrative provided.'}
                        </p>
                      </div>

                      <div className="bg-brand-50 rounded-2xl p-4 border border-brand-100 flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                          <Info className="w-4 h-4" />
                        </div>
                        <p className="text-brand-800/80 text-[11px] leading-relaxed">
                          Your asset will be cataloged and assigned to a specialist for formal board evaluation.
                        </p>
                      </div>
                    </div>

                    {formData.imageUrl && (
                      <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 p-6 flex items-center justify-center shadow-lg border border-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain drop-shadow-xl" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                {step > 0 ? (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="ghost"
                    size="sm"
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 0 && (!formData.title || !formData.metal)}
                    size="md"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    isLoading={submitting}
                    size="md"
                    className="px-8"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
