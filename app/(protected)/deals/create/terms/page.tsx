'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Suspense } from 'react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { useCreateDealStore } from '@/lib/store/create-deal-store';
import { formatCurrency } from '@/lib/utils';

const termsSchema = z.object({
  dealType: z.string().min(1, 'Deal type is required'),
  currency: z.string().min(1, 'Currency is required'),
  dealValue: z.coerce.number().min(1, 'Deal value is required'),
  earnestMoney: z.coerce.number().optional(),
  closingDate: z.string().min(1, 'Closing date is required'),
  longStopDate: z.string().optional(),
  paymentStructure: z.string().min(1, 'Payment structure is required'),
});

type TermsFormData = z.infer<typeof termsSchema>;

function TermsContent() {
  const router = useRouter();
  const store = useCreateDealStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      dealType: store.dealTerms.dealType,
      currency: store.dealTerms.currency,
      dealValue: store.dealTerms.dealValue || undefined,
      earnestMoney: store.dealTerms.earnestMoney || undefined,
      closingDate: store.dealTerms.closingDate,
      longStopDate: store.dealTerms.longStopDate,
      paymentStructure: store.dealTerms.paymentStructure,
    },
  });

  const formData = watch();

  const onSubmit = (data: TermsFormData) => {
    store.setDealTerms(data);
    router.push('/deals/create/escrow');
  };

  const onBack = () => {
    store.setDealTerms(formData);
    router.push('/deals/create/parties');
  };

  return (
    <CreateDealLayout
      currentStep={2}
      title="Deal Terms"
      subtitle="Define the financial details and timeline for this transaction."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Deal Type & Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Deal Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('dealType')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Purchase</option>
              <option>Lease</option>
              <option>Sale</option>
              <option>Exchange</option>
            </select>
            {errors.dealType && (
              <p className="text-red-500 text-xs mt-1">{errors.dealType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              {...register('currency')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="USD">USD - US Dollar</option>
              <option value="GHS">GHS - Ghanaian Cedi</option>
            </select>
          </div>
        </div>

        {/* Deal Value & Earnest Money */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Deal Value <span className="text-red-500">*</span>
            </label>
            <input
              {...register('dealValue')}
              type="number"
              placeholder="85,000,000"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.dealValue && (
              <p className="text-red-500 text-xs mt-1">{errors.dealValue.message}</p>
            )}
            {formData.dealValue && (
              <p className="text-slate-600 text-xs mt-1">
                {formatCurrency(formData.dealValue, formData.currency)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Earnest Money (Optional)
            </label>
            <input
              {...register('earnestMoney')}
              type="number"
              placeholder="5,000,000"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-slate-600 text-xs mt-1">
              Upfront deposit by buyer
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Closing Date <span className="text-red-500">*</span>
            </label>
            <input
              {...register('closingDate')}
              type="date"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.closingDate && (
              <p className="text-red-500 text-xs mt-1">{errors.closingDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Long Stop Date (Optional)
            </label>
            <input
              {...register('longStopDate')}
              type="date"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-slate-600 text-xs mt-1">
              Outside date, either party can cancel
            </p>
          </div>
        </div>

        {/* Payment Structure */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Payment Structure <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {['Single Payment', 'Milestone Payments', 'Custom Structure'].map((option) => (
              <label key={option} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  {...register('paymentStructure')}
                  type="radio"
                  value={option}
                  className="w-4 h-4"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{option}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {option === 'Single Payment' && 'The full amount will be paid at closing'}
                    {option === 'Milestone Payments' && 'Break the payment into milestones'}
                    {option === 'Custom Structure' && 'Define a custom payment schedule'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <WizardNavigation
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={true}
        />
      </form>
    </CreateDealLayout>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsContent />
    </Suspense>
  );
}
