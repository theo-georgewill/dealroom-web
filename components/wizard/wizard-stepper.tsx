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
    <div className="mb-8">
      <div className="flex items-start justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1 relative">
            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'absolute top-5 left-1/2 w-full h-1 transition-all -z-10',
                  currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                )}
                style={{
                  width: 'calc(100% + 2rem)',
                  left: '50%',
                  transform: 'translateX(0)',
                }}
              />
            )}

            {/* Step Circle */}
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm mb-3 transition-all relative z-10 flex-shrink-0',
                currentStep > step.id
                  ? 'bg-green-50 text-green-700'
                  : currentStep === step.id
                  ? 'bg-primary text-white'
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
                'text-xs font-semibold text-center whitespace-nowrap',
                currentStep >= step.id ? 'text-foreground' : 'text-slate-500'
              )}
            >
              {step.label}
            </p>
            <p className="text-xs text-slate-500 text-center mt-0.5 whitespace-nowrap">
              {step.sublabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
