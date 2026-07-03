'use client';

import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Users, Building2, User, BadgeCheck } from 'lucide-react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { useCreateDealStore, StakeholderFormData } from '@/lib/store/create-deal-store';

const stakeholderSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  role: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
});

type StakeholderFormInput = z.infer<typeof stakeholderSchema>;

const PARTY_TYPES = [
  { id: 'buyer', label: 'Buyer', icon: Users, color: 'bg-green-50' },
  { id: 'seller', label: 'Seller', icon: Building2, color: 'bg-orange-50' },
  { id: 'lawyer', label: 'Lawyer / Legal Representative', icon: BadgeCheck, color: 'bg-purple-50' },
  { id: 'agent', label: 'Agent (Optional)', icon: User, color: 'bg-blue-50' },
];

function PartiesContent() {
  const router = useRouter();
  const store = useCreateDealStore();
  const [selectedType, setSelectedType] = useState<'buyer' | 'seller' | 'lawyer' | 'agent'>('buyer');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StakeholderFormInput>({
    resolver: zodResolver(stakeholderSchema),
  });

  const onAddStakeholder = (data: StakeholderFormInput) => {
    const stakeholder: StakeholderFormData = {
      id: Date.now().toString(),
      type: selectedType,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      role: data.role,
      idType: data.idType,
      idNumber: data.idNumber,
    };

    store.addStakeholder(stakeholder);
    reset();
    setSelectedType('buyer');
  };

  const onRemoveStakeholder = (id: string) => {
    store.removeStakeholder(id);
  };

  const onProceed = () => {
    if (store.stakeholders.length === 0) {
      alert('Please add at least one stakeholder');
      return;
    }
    router.push('/deals/create/terms');
  };

  const onBack = () => {
    router.push('/deals/create/property');
  };

  const buyers = store.stakeholders.filter((s) => s.type === 'buyer');
  const sellers = store.stakeholders.filter((s) => s.type === 'seller');
  const lawyers = store.stakeholders.filter((s) => s.type === 'lawyer');
  const agents = store.stakeholders.filter((s) => s.type === 'agent');

  return (
    <CreateDealLayout
      currentStep={1}
      title="Parties Involved"
      subtitle="Add the people and organizations involved in this transaction."
    >
      <form onSubmit={handleSubmit(onAddStakeholder)} className="space-y-6">
        {/* Party Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Add New Party
          </label>
          <div className="grid grid-cols-2 gap-3">
            {PARTY_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-primary bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Icon size={20} className="mb-1 text-slate-700" />
                  <p className="text-xs font-semibold text-slate-900">
                    {type.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Full Name / Company <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fullName')}
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+234 801 234 5678"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Company
              </label>
              <input
                {...register('company')}
                type="text"
                placeholder="Company name"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Role / Title
              </label>
              <input
                {...register('role')}
                type="text"
                placeholder="Role"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            Add {PARTY_TYPES.find((t) => t.id === selectedType)?.label}
          </button>
        </div>

        {/* Listed Stakeholders */}
        {store.stakeholders.length > 0 && (
          <div className="space-y-4">
            {[{ type: 'buyer', label: 'Buyers', list: buyers },
              { type: 'seller', label: 'Sellers', list: sellers },
              { type: 'lawyer', label: 'Legal & Advisors', list: lawyers },
              { type: 'agent', label: 'Agents', list: agents }].map(
              (group) =>
                group.list.length > 0 && (
                  <div key={group.type}>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      {group.label}
                    </h4>
                    <div className="space-y-2">
                      {group.list.map((stakeholder) => (
                        <div
                          key={stakeholder.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {stakeholder.fullName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {stakeholder.email}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveStakeholder(stakeholder.id)}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-900">
          <p>
            💡 You can add more parties and set permissions in the Deal Room after
            creating the deal.
          </p>
        </div>

        <WizardNavigation
          onBack={onBack}
          onNext={onProceed}
          canProceed={store.stakeholders.length > 0}
        />
      </form>
    </CreateDealLayout>
  );
}

export default function PartiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartiesContent />
    </Suspense>
  );
}
