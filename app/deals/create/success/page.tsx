'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCreateDealStore } from '@/lib/store/create-deal-store';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dealId = searchParams.get('dealId') || 'DR-2024-00047';
  const store = useCreateDealStore();

  const handleViewDeal = () => {
    store.resetWizard();
    router.push(`/deals/${dealId.split('-')[3]}`);
  };

  const handleCreateAnother = () => {
    store.resetWizard();
    router.push('/deals/create/property');
  };

  const handleDashboard = () => {
    store.resetWizard();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Animated background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse" />
              </div>
              <div className="relative">
                <CheckCircle
                  size={80}
                  className="text-green-500 animate-bounce"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Deal Created Successfully!
          </h1>
          <p className="text-slate-600 text-lg">
            Your deal has been created and all parties have been invited.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            You can now manage the deal and track progress in the Deal Room.
          </p>
        </div>

        {/* Deal Summary Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                Deal Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Property
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {store.property.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Deal Type
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {store.dealTerms.dealType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Parties
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {store.stakeholders.length} participants
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                Key Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Deal ID
                  </p>
                  <p className="text-sm font-semibold text-primary font-mono">
                    {dealId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Created
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date().toLocaleDateString('en-NG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">
              Your data is secure and encrypted
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              Protected with bank-grade security and escrow by Nomba.
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
            What happens next?
          </h3>
          <div className="space-y-3">
            {[
              {
                title: 'Invitations sent',
                desc: 'All parties have been invited to join the deal room via email.',
              },
              {
                title: 'Set up escrow',
                desc: 'The buyer can fund the escrow account when ready.',
              },
              {
                title: 'Track progress',
                desc: 'Monitor tasks, documents and milestones in real time.',
              },
              {
                title: 'Close the deal',
                desc: 'Once all conditions are met, funds will be released securely.',
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={handleViewDeal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <span>View Deal Room</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleCreateAnother}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-foreground rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <span>Create Another Deal</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleDashboard}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-foreground rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <span>Go to Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
