'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, DollarSign, Shield } from 'lucide-react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { useCreateDealStore } from '@/lib/store/create-deal-store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { dealsService } from '@/lib/services/deals.service';
import { paymentService } from '@/lib/services/payment.service';

function ReviewContent() {
  const router = useRouter();
  const store = useCreateDealStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDeal = async () => {
    setIsCreating(true);

    try {
      // 1. Create deal
      const deal = await dealsService.createDeal({
        property: store.property,
        stakeholders: store.stakeholders.map(({ id, ...stakeholder }) => stakeholder),
        terms: store.dealTerms,
        escrow: store.escrow,
      });

      // 2. Initialize Nomba escrow payment
      const payment = await paymentService.initializeEscrow({
        escrowId: deal.payment.escrowId,
        amount: deal.payment.amount,
      });

      // 3. Redirect to Nomba
      window.open(
        payment.checkoutUrl,
        '_blank',
        'noopener,noreferrer'
      );
      router.push(`/deals/${deal.createdDeal.id}`);
    } finally {
      setIsCreating(false);
    }
  };

  const onBack = () => {
    router.push('/deals/create/escrow');
  };

  return (
    <CreateDealLayout
      currentStep={4}
      title="Review & Confirm"
      subtitle="Review all details before creating the deal. You can edit any section if needed."
    >
      <div className="space-y-6">
        {/* Property Details */}
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Property Details</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              Edit
            </button>
          </div>

          {store.property.images[0] && (
            <div className="mb-4">
              <img
                src={store.property.images[0]}
                alt="Property"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Property Name</p>
              <p className="font-medium text-foreground">{store.property.name}</p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Property Type</p>
              <p className="font-medium text-foreground">{store.property.type}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-600 mb-1">Address</p>
              <p className="font-medium text-foreground">{store.property.address}</p>
            </div>
          </div>
        </div>

        {/* Stakeholders */}
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Parties Involved</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              Edit
            </button>
          </div>

          <div className="space-y-3">
            {store.stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {stakeholder.fullName}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {stakeholder.type.charAt(0).toUpperCase() +
                      stakeholder.type.slice(1)}{' '}
                    • {stakeholder.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Terms */}
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Deal Terms</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Deal Type</p>
              <p className="font-medium text-foreground">
                {store.dealTerms.dealType}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Currency</p>
              <p className="font-medium text-foreground">
                {store.dealTerms.currency}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Deal Value</p>
              <p className="font-medium text-foreground">
                {formatCurrency(
                  store.dealTerms.dealValue,
                  store.dealTerms.currency
                )}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Closing Date</p>
              <p className="font-medium text-foreground">
                {formatDate(store.dealTerms.closingDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Escrow Setup */}
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Escrow Setup</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Escrow Amount</p>
              <p className="font-medium text-foreground">
                {formatCurrency(store.escrow.amount, store.dealTerms.currency)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Funding Source</p>
              <p className="font-medium text-foreground">
                {store.escrow.fundingSource}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-600 mb-1">Release Conditions</p>
              <p className="font-medium text-foreground">
                {store.escrow.releaseConditions.length} conditions
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-900">
              Secure & Protected
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              Your transaction is protected with bank-grade security and escrow by
              Nomba.
            </p>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-200">
          <p>
            By creating this deal, you agree to our Terms of Service and
            acknowledge that all information provided is accurate.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
          >
            ← Back
          </button>

          <button
            onClick={handleCreateDeal}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Create Deal →
          </button>
        </div>
      </div>
    </CreateDealLayout>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
