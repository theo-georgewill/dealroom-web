'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardNavigationProps {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isLastStep: boolean;
  nextLabel?: string;
}

export function WizardNavigation({
  onBack,
  onNext,
  canProceed,
  isLastStep,
  nextLabel = 'Next',
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
      >
        ← Back
      </button>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={cn(
          'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors',
          canProceed
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        )}
      >
        {nextLabel}
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
