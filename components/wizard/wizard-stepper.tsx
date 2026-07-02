'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 0, label: 'Property', sublabel: 'Property Details' },
  { id: 1, label: 'Parties', sublabel: 'Buyers, sellers & others' },
  { id: 2, label: 'Terms', sublabel: 'Financial & timeline' },
  { id: 3, label: 'Escrow', sublabel: 'Amount & settings' },
  { id: 4, label: 'Review', sublabel: 'Confirm & create' },
];

export function WizardStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm mb-2 transition-all',
                currentStep > step.id
                  ? 'bg-green-50 text-green-700'
                  : currentStep === step.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600'
              )}
            >
              {currentStep > step.id ? (
                <Check size={20} />
              ) : (
                <span>{step.id + 1}</span>
              )}
            </div>

            {/* Step Label */}
            <p
              className={cn(
                'text-xs font-semibold text-center',
                currentStep >= step.id ? 'text-foreground' : 'text-slate-500'
              )}
            >
              {step.label}
            </p>
            <p className="text-xs text-slate-500 text-center mt-0.5">
              {step.sublabel}
            </p>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div className="absolute w-full mt-5 flex justify-end">
                <div
                  className={cn(
                    'h-1 flex-1 transition-all',
                    currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                  )}
                  style={{
                    marginLeft: '2rem',
                    marginRight: '-2rem',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
