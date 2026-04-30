import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'neutral' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'brand', className }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border";
  
  const variants = {
    brand: "bg-brand-500/10 text-brand-700 border-brand-200",
    accent: "bg-accent-500/10 text-accent-950 border-accent-500/20",
    neutral: "bg-neutral-100 text-neutral-600 border-neutral-200",
    outline: "bg-transparent text-neutral-500 border-neutral-200"
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {children}
    </div>
  );
}
