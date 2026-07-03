'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Suspense } from 'react';
import { Check, Shield } from 'lucide-react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { useCreateDealStore } from '@/lib/store/create-deal-store';

const escrowSchema = z.object({
  amount: z.coerce.number().min(1, 'Escrow amount is required'),
  fundingSource: z.string().min(1, 'Funding source is required'),
  releaseConditions: z.array(z.string()).min(1, 'Select at least one release condition'),
  holdingPeriod: z.coerce.number().min(1, 'Holding period is required'),
});

type EscrowFormData = z.infer<typeof escrowSchema>;

const RELEASE_CONDITIONS = [
  'Title documents verified and approved by buyer\'s lawyer',
  'Property inspection completed and approved',
  'All agreed payments and fees settled',
  'Final walkthrough completed',
  'Other (custom condition)',
];

function EscrowContent() {
  const router = useRouter();
  const store = useCreateDealStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EscrowFormData>({
    resolver: zodResolver(escrowSchema),
    defaultValues: {
      amount: store.escrow.amount || undefined,
      fundingSource: store.escrow.fundingSource,
      releaseConditions: store.escrow.releaseConditions,
      holdingPeriod: store.escrow.holdingPeriod,
    },
  });

  const formData = watch();

  const onSubmit = (data: EscrowFormData) => {
    store.setEscrow(data);
    router.push('/deals/create/review');
  };

  const onBack = () => {
    store.setEscrow(formData);
    router.push('/deals/create/terms');
  };

  return (
    <CreateDealLayout
      currentStep={3}
      title="Escrow Setup"
      subtitle="Configure how funds will be held and released securely."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Escrow Amount */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Escrow Amount <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                {...register('amount')}
                type="number"
                placeholder="85,000,000"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
              <p className="text-slate-600 text-xs mt-1">
                This is the amount that will be held in escrow by Nomba.
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-900">
              Secure with Nomba
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              Your funds are protected in a Nomba escrow account.
            </p>
          </div>
        </div>

        {/* Funding Source */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Funding Source <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {['Buyer Deposit', 'Split Deposit', 'Third Party'].map((option) => (
              <label key={option} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  {...register('fundingSource')}
                  type="radio"
                  value={option}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{option}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {option === 'Buyer Deposit' && 'Buyer will deposit the full escrow amount'}
                    {option === 'Split Deposit' && 'Buyer and seller will deposit agreed amounts'}
                    {option === 'Third Party' && 'A third party will fund the escrow account'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Release Conditions */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Escrow Release Conditions <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {RELEASE_CONDITIONS.map((condition) => (
              <label key={condition} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  {...register('releaseConditions')}
                  type="checkbox"
                  value={condition}
                  className="w-4 h-4 mt-1"
                />
                <p className="text-sm text-foreground">{condition}</p>
              </label>
            ))}
          </div>
          {errors.releaseConditions && (
            <p className="text-red-500 text-xs mt-1">
              {errors.releaseConditions.message}
            </p>
          )}
        </div>

        {/* Holding Period */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Escrow Holding Period (Est.) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              {...register('holdingPeriod')}
              type="number"
              min="1"
              className="w-20 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm font-medium text-slate-700">days</span>
          </div>
          <p className="text-slate-600 text-xs mt-1">
            Estimated time funds will be held in escrow.
          </p>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-900 border border-blue-200">
          <p className="font-medium mb-2">What happens next?</p>
          <ol className="space-y-1 text-xs list-decimal list-inside">
            <li>Create & fund escrow - Buyer funds the escrow account with Nomba</li>
            <li>Conditions in progress - All conditions are tracked and updated</li>
            <li>Release of funds - Once all conditions met, funds released to seller</li>
          </ol>
        </div>

        <WizardNavigation
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={formData.releaseConditions && formData.releaseConditions.length > 0}
        />
      </form>
    </CreateDealLayout>
  );
}

export default function EscrowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EscrowContent />
    </Suspense>
  );
}
