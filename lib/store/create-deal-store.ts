import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DealType = 'Purchase' | 'Lease' | 'Sale' | 'Exchange';
export type PaymentStructure = 'Single Payment' | 'Milestone Payments' | 'Custom Structure';
export type IDType = 'National ID' | 'Passport' | 'Business Registration';

export interface StakeholderFormData {
  id: string;
  type: 'buyer' | 'seller' | 'lawyer' | 'agent';
  fullName: string;
  email: string;
  phone?: string;
  idType?: string;
  idNumber?: string;
  licenseNumber?: string;
}

export interface PropertyData {
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  country: string;
  description: string;
  images: string[];
}

export interface DealTermsData {
  dealType: DealType;
  currency: string;
  dealValue: number;
  earnestMoney?: number;
  closingDate: string;
  longStopDate?: string;
  paymentStructure: PaymentStructure;
}

export interface EscrowData {
  amount: number;
  fundingSource: 'Buyer Deposit' | 'Split Deposit' | 'Third Party';
  releaseConditions: string[];
  holdingPeriod: number;
  provider: string;
}

export interface CreateDealState {
  // Form data
  property: PropertyData;
  stakeholders: StakeholderFormData[];
  dealTerms: DealTermsData;
  escrow: EscrowData;
  
  // UI state
  currentStep: number;
  
  // Actions
  setProperty: (property: Partial<PropertyData>) => void;
  addStakeholder: (stakeholder: StakeholderFormData) => void;
  updateStakeholder: (id: string, stakeholder: Partial<StakeholderFormData>) => void;
  removeStakeholder: (id: string) => void;
  setDealTerms: (terms: Partial<DealTermsData>) => void;
  setEscrow: (escrow: Partial<EscrowData>) => void;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetWizard: () => void;
}

const initialState = {
  property: {
    name: '',
    type: 'Residential',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    description: '',
    images: [],
  },
  stakeholders: [],
  dealTerms: {
    dealType: 'Purchase' as DealType,
    currency: 'NGN',
    dealValue: 0,
    earnestMoney: 0,
    closingDate: '',
    longStopDate: '',
    paymentStructure: 'Single Payment' as PaymentStructure,
  },
  escrow: {
    amount: 0,
    fundingSource: 'Buyer Deposit' as const,
    releaseConditions: [],
    holdingPeriod: 90,
    provider: 'Nomba',
  },
  currentStep: 0,
};

export const useCreateDealStore = create<CreateDealState>()(
  persist(
    (set) => ({
      ...initialState,

      setProperty: (property) =>
        set((state) => ({
          property: { ...state.property, ...property },
        })),

      addStakeholder: (stakeholder) =>
        set((state) => ({
          stakeholders: [...state.stakeholders, stakeholder],
        })),

      updateStakeholder: (id, stakeholder) =>
        set((state) => ({
          stakeholders: state.stakeholders.map((s) =>
            s.id === id ? { ...s, ...stakeholder } : s
          ),
        })),

      removeStakeholder: (id) =>
        set((state) => ({
          stakeholders: state.stakeholders.filter((s) => s.id !== id),
        })),

      setDealTerms: (terms) =>
        set((state) => ({
          dealTerms: { ...state.dealTerms, ...terms },
        })),

      setEscrow: (escrow) =>
        set((state) => ({
          escrow: { ...state.escrow, ...escrow },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      goToNextStep: () =>
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),

      goToPreviousStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

      resetWizard: () => set(initialState),
    }),
    {
      name: 'create-deal-store',
      version: 1,
    }
  )
);
