'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Suspense } from 'react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { useCreateDealStore, PaymentScheduleItem } from '@/lib/store/create-deal-store';
import { formatCurrency } from '@/lib/utils';

const termsSchema = z.object({
  dealType: z.enum([
    'Purchase',
    'Lease',
    'Sale',
    'Exchange',
  ]),
  currency: z.string(),
  dealValue: z.number().positive('Deal value is required'),
  earnestMoney: z.number().optional(),
  closingDate: z.string().min(1),
  longStopDate: z.string().optional(),
  paymentStructure: z.enum([
    'Single Payment',
    'Milestone Payments',
    'Custom Structure',
  ]),
});

type TermsFormData = z.infer<typeof termsSchema>;

function TermsContent() {
  const router = useRouter();
  const store = useCreateDealStore();
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[]>(
    store.dealTerms.paymentSchedule
  );

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
      dealValue: store.dealTerms.dealValue ?? undefined,
      earnestMoney: store.dealTerms.earnestMoney ?? undefined,
      closingDate: store.dealTerms.closingDate,
      longStopDate: store.dealTerms.longStopDate,
      paymentStructure: store.dealTerms.paymentStructure,
    },
  });

  const formData = watch();

  const scheduleTotal = paymentSchedule.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0,
  );

  const hasInvalidScheduleItem = paymentSchedule.some(
    (item) =>
      !item.name.trim() ||
      item.amount <= 0 ||
      !item.dueDate,
  );

  const hasPaymentAfterClosing = paymentSchedule.some(
    (item) =>
      formData.closingDate &&
      item.dueDate &&
      item.dueDate > formData.closingDate,
  );

  const hasInvalidLongStopDate =
    !!formData.longStopDate &&
    !!formData.closingDate &&
    formData.longStopDate < formData.closingDate;

  const scheduleValidationMessage = (() => {
    if (formData.paymentStructure === 'Single Payment') {
      return '';
    }

    if (paymentSchedule.length === 0) {
      return 'Add at least one payment to continue.';
    }

    if (hasInvalidScheduleItem) {
      return 'Complete the name, amount, and due date for every payment.';
    }

    if (hasPaymentAfterClosing) {
      return 'Payment dates cannot be after the closing date.';
    }

    if (scheduleTotal !== formData.dealValue) {
      const difference = formData.dealValue - scheduleTotal;

      if (difference > 0) {
        return `Your payment schedule is ${formatCurrency(
          difference,
          formData.currency,
        )} short of the deal value.`;
      }

      return `Your payment schedule exceeds the deal value by ${formatCurrency(
        Math.abs(difference),
        formData.currency,
      )}.`;
    }

    return '';
  })();

  const termsValidationMessage =
    hasInvalidLongStopDate
      ? 'Long stop date cannot be before the closing date.'
      : scheduleValidationMessage;

  const isTermsValid = !termsValidationMessage;

  const onSubmit = (data: TermsFormData) => {
    if (!isTermsValid) {
      return;
    }

    store.setDealTerms({
      ...data,
      paymentSchedule,
    });

    router.push('/deals/create/review');
  };

  const onBack = () => {
    store.setDealTerms({
      ...formData,
      paymentSchedule,
    });
    router.push('/deals/create/parties');
  };

  const addPaymentScheduleItem = () => {
    setPaymentSchedule((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: '',
        amount: 0,
        dueDate: '',
        description: '',
      },
    ]);
  };

  const updatePaymentScheduleItem = (
    id: string,
    updates: Partial<PaymentScheduleItem>
  ) => {
    setPaymentSchedule((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removePaymentScheduleItem = (id: string) => {
    setPaymentSchedule((current) =>
      current.filter((item) => item.id !== id)
    );
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
              {...register('dealValue', {
                valueAsNumber: true,
              })}
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
              {...register('earnestMoney', {
                valueAsNumber: true,
              })}
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
          
          {(formData.paymentStructure === 'Milestone Payments' ||
            formData.paymentStructure === 'Custom Structure') && (
            <div className="mt-4 space-y-4">
              {/* Schedule header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {formData.paymentStructure === 'Milestone Payments'
                      ? 'Payment Milestones'
                      : 'Custom Payment Schedule'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.paymentStructure === 'Milestone Payments'
                      ? 'Define when each portion of the deal value will be paid.'
                      : 'Define how and when payments will be made.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addPaymentScheduleItem}
                  className="px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors"
                >
                  + Add{' '}
                  {formData.paymentStructure === 'Milestone Payments'
                    ? 'Milestone'
                    : 'Payment'}
                </button>
              </div>

              {/* Schedule items */}
              {paymentSchedule.length === 0 ? (
                <div className="p-6 border border-dashed border-slate-300 rounded-lg text-center">
                  <p className="text-sm text-slate-600">
                    No {formData.paymentStructure === 'Milestone Payments'
                      ? 'milestones'
                      : 'payments'} added yet.
                  </p>

                  <button
                    type="button"
                    onClick={addPaymentScheduleItem}
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    Add your first{' '}
                    {formData.paymentStructure === 'Milestone Payments'
                      ? 'milestone'
                      : 'payment'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentSchedule.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-semibold text-foreground">
                          {formData.paymentStructure === 'Milestone Payments'
                            ? `Milestone ${index + 1}`
                            : `Payment ${index + 1}`}
                        </h5>

                        <button
                          type="button"
                          onClick={() => removePaymentScheduleItem(item.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            updatePaymentScheduleItem(item.id, {
                              name: e.target.value,
                            })
                          }
                          placeholder={
                            formData.paymentStructure === 'Milestone Payments'
                              ? 'e.g. Title verification'
                              : 'e.g. Initial payment'
                          }
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Amount
                          </label>
                          <input
                            type="number"
                            value={item.amount || ''}
                            onChange={(e) =>
                              updatePaymentScheduleItem(item.id, {
                                amount: Number(e.target.value),
                              })
                            }
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />

                          {item.amount > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                              {formatCurrency(item.amount, formData.currency)}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={item.dueDate}
                            onChange={(e) =>
                              updatePaymentScheduleItem(item.id, {
                                dueDate: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updatePaymentScheduleItem(item.id, {
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe what this payment is for..."
                          rows={2}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.dealValue > 0 && (
                <div className="p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Deal Value</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        formData.dealValue,
                        formData.currency,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-slate-600">Scheduled</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        scheduleTotal,
                        formData.currency,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Remaining</span>

                    <span
                      className={
                        scheduleTotal === formData.dealValue
                          ? 'font-semibold text-green-600'
                          : 'font-semibold text-red-600'
                      }
                    >
                      {formatCurrency(
                        formData.dealValue - scheduleTotal,
                        formData.currency,
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!isTermsValid && (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <p className="text-sm font-semibold text-red-800">
              Complete the deal terms before continuing
            </p>

            <p className="text-xs text-red-700 mt-1">
              {termsValidationMessage}
            </p>
          </div>
        )}

        <WizardNavigation
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={isTermsValid}
          isLastStep={false}
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
