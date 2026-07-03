'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { WizardStepper } from './wizard-stepper';
import { useCreateDealStore } from '@/lib/store/create-deal-store';

interface CreateDealLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  title: string;
  subtitle: string;
}

export function CreateDealLayout({
  children,
  currentStep,
  title,
  subtitle,
}: CreateDealLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/deals" className="hover:text-primary transition-colors">
          Deals
        </Link>
        <ChevronRight size={16} />
        <span className="text-primary font-medium">Create New Deal</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Deal</h1>
        <p className="text-slate-600 text-sm mt-0.5">
          Set up the details of your real estate transaction.
        </p>
      </div>

      {/* Wizard Stepper */}
      <WizardStepper currentStep={currentStep} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Content */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-slate-600 text-sm mb-6">{subtitle}</p>

            {children}
          </div>
        </div>

        {/* Deal Summary Sidebar */}
        <DealSummarySidebar currentStep={currentStep} />
      </div>
    </div>
  );
}

function DealSummarySidebar({ currentStep }: { currentStep: number }) {
  const store = useCreateDealStore();
  const hasPropertyImage = store.property.images && store.property.images.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24 h-fit">
      <h3 className="text-sm font-bold text-foreground mb-4">Deal Summary</h3>

      <div className="space-y-4">
        {/* Property Image */}
        {hasPropertyImage && (
          <img
            src={store.property.images[0]}
            alt={store.property.name || 'Property'}
            className="w-full h-32 rounded-xl object-cover"
          />
        )}

        {/* Deal Info */}
        <div className="space-y-2">
          {store.property.name && (
            <div>
              <p className="text-xs text-slate-600 font-medium">Property</p>
              <p className="text-sm font-semibold text-foreground">{store.property.name}</p>
            </div>
          )}

          {store.property.type && (
            <div>
              <p className="text-xs text-slate-600 font-medium">Type</p>
              <p className="text-sm font-semibold text-foreground">{store.property.type}</p>
            </div>
          )}

          {store.terms?.dealValue && (
            <div>
              <p className="text-xs text-slate-600 font-medium">Deal Value</p>
              <p className="text-sm font-semibold text-foreground">
                ₦{store.terms.dealValue.toLocaleString()}
              </p>
            </div>
          )}

          {store.terms?.closingDate && (
            <div>
              <p className="text-xs text-slate-600 font-medium">Closing Date</p>
              <p className="text-sm font-semibold text-foreground">{store.terms.closingDate}</p>
            </div>
          )}
        </div>

        {/* What's next section */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            What&apos;s next?
          </h4>
          <div className="space-y-2">
            {[
              'Create & fund escrow',
              'Conditions in progress',
              'Release of funds',
            ].map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="text-xs font-bold text-blue-500 flex-shrink-0 mt-0.5 bg-blue-50 w-5 h-5 flex items-center justify-center rounded-full">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
