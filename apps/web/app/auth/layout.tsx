import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 tracking-tight italic">
            MintMarks
          </h1>
          <p className="text-neutral-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Heraldic Heritage & Evaluation
          </p>
        </div>
        <div className="bg-white border border-neutral-200 shadow-coin rounded-3xl p-8">
          {children}
        </div>
        <p className="text-center mt-8 text-neutral-400 text-xs">
          &copy; 2026 MintMarks.in — All evaluation records are cryptographically secured.
        </p>
      </div>
    </div>
  );
}
