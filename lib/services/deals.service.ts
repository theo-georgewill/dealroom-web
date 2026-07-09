import { apiClient } from '@/lib/api-client';

interface ApiResponse<T,  M = undefined> {
  success: boolean;
  message: string;
  data: T;
  meta?: M;
}

export type DealStatus =
  | 'DRAFT'
  | 'PENDING_PARTICIPANTS'
  | 'PENDING_FUNDING'
  | 'FUNDED'
  | 'DUE_DILIGENCE'
  | 'DISPUTED'
  | 'RELEASE_REQUESTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Deal {
  id: string;
  reference: string;
  title: string;
  status: DealStatus;
  progress: number;

  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null;
  };

  property: {
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    country: string;
    description?: string;
    images: {
      key: string;
    }[];
  };

  terms: {
    dealType:
      | 'PURCHASE'
      | 'LEASE'
      | 'SALE'
      | 'EXCHANGE';
    currency: string;
    dealValue: number;
    earnestMoney?: number;
    closingDate: string;
    longStopDate?: string;
    paymentStructure:
      | 'SINGLE_PAYMENT'
      | 'MILESTONE_PAYMENTS'
      | 'CUSTOM_STRUCTURE';
  };

  escrow: {
    id: string;
    amount: number;
    currency: string;
    fundingSource:
      | 'BUYER_DEPOSIT'
      | 'SPLIT_DEPOSIT'
      | 'THIRD_PARTY';
    holdingPeriod: number;
    releaseConditions: {
      id: string;
      description: string;
      sortOrder: number;
    }[];
  };

  participants: {
    id: string;
    role:
      | 'BUYER'
      | 'SELLER'
      | 'LAWYER'
      | 'AGENT';
    status: string;
    joinedAt: string | null;

    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar?: string | null;
    };
  }[];

  invitations: {
    id: string;
    email: string;
    role: string;
    status: string;
    expiresAt: string;
    createdAt: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateDealRequest {
  property: {
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    country: string;
    description?: string;
    images: string[];
  };

  stakeholders: {
    type: 'buyer' | 'seller' | 'lawyer' | 'agent';
    fullName: string;
    email: string;
    phone?: string;
  }[];

  terms: {
    dealType: 'Purchase' | 'Lease' | 'Sale' | 'Exchange';
    currency: string;
    dealValue: number;
    earnestMoney?: number;
    closingDate: string;
    longStopDate?: string;
    paymentStructure:
      | 'Single Payment'
      | 'Milestone Payments'
      | 'Custom Structure';
  };

  escrow: {
    amount: number;
    fundingSource:
      | 'Buyer Deposit'
      | 'Split Deposit'
      | 'Third Party';
    releaseConditions: string[];
    holdingPeriod: number;
  };
}

export interface CreateDealResponse {
  createdDeal: Deal;
  payment: {
    escrowId: string;
    amount: number;
    currency: string;
  };
}

export interface UpdateDealRequest {
  property?: Partial<CreateDealRequest['property']>;
  terms?: Partial<CreateDealRequest['terms']>;
  escrow?: Partial<CreateDealRequest['escrow']>;
}

export interface ListDealsParams {
  page?: number;
  limit?: number;
  search?: string;
  scope?: string;
  status?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedDealsResponse {
  data: Deal[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

class DealsService {
  async getDeal(id: string): Promise<Deal> {
    const response = await apiClient.get<ApiResponse<Deal>>(
      `/deals/${id}`,
    );

  console.log(response.data);

    return response.data.data;
  }

  async createDeal(data: CreateDealRequest): Promise<CreateDealResponse> {
    const propertyTypeMap = {
      Residential: 'RESIDENTIAL',
      Commercial: 'COMMERCIAL',
      Industrial: 'INDUSTRIAL',
      Land: 'LAND',
      'Mixed Use': 'MIXED_USE',
    } as const;

    const stakeholderRoleMap = {
      buyer: 'BUYER',
      seller: 'SELLER',
      lawyer: 'LAWYER',
      agent: 'AGENT',
    } as const;

    const dealTypeMap = {
      Purchase: 'PURCHASE',
      Lease: 'LEASE',
      Sale: 'SALE',
      Exchange: 'EXCHANGE',
    } as const;

    const paymentStructureMap = {
      'Single Payment': 'SINGLE_PAYMENT',
      'Milestone Payments': 'MILESTONE_PAYMENTS',
      'Custom Structure': 'CUSTOM_STRUCTURE',
    } as const;

    const fundingSourceMap = {
      'Buyer Deposit': 'BUYER_DEPOSIT',
      'Split Deposit': 'SPLIT_DEPOSIT',
      'Third Party': 'THIRD_PARTY',
    } as const;

    const payload = {
      title: data.property.name,

      property: {
        name: data.property.name,
        type: propertyTypeMap[data.property.type as keyof typeof propertyTypeMap],
        address: data.property.address,
        city: data.property.city,
        state: data.property.state,
        country: data.property.country,
        description: data.property.description,
        images: data.property.images.map((key) => ({
          key,
        })),
      },

      stakeholders: data.stakeholders.map((stakeholder) => ({
        role: stakeholderRoleMap[stakeholder.type],
        fullName: stakeholder.fullName,
        email: stakeholder.email,
        phone: stakeholder.phone,
      })),

      terms: {
        dealType: dealTypeMap[data.terms.dealType],
        currency: data.terms.currency,
        dealValue: data.terms.dealValue,
        earnestMoney: data.terms.earnestMoney,
        closingDate: data.terms.closingDate,
        longStopDate: data.terms.longStopDate,
        paymentStructure:
          paymentStructureMap[data.terms.paymentStructure],
      },

      escrow: {
        amount: data.escrow.amount,
        fundingSource: fundingSourceMap[data.escrow.fundingSource],
        holdingPeriod: data.escrow.holdingPeriod,
        releaseConditions: data.escrow.releaseConditions,
      },
    };

    const response =
      await apiClient.post<ApiResponse<CreateDealResponse>>(
        '/deals',
        payload
      );

    return response.data.data;
  }


  async updateDeal(
    id: string,
    data: UpdateDealRequest,
  ): Promise<Deal> {
    const response = await apiClient.patch<ApiResponse<Deal>>(
      `/deals/${id}`,
      data,
    );

    return response.data.data;
  }

  async listDeals(
    params: ListDealsParams = {},
  ): Promise<PaginatedDealsResponse> {
    const response = await apiClient.get<
      ApiResponse<Deal[], PaginatedDealsResponse['meta']>
    >('/deals', {
      params,
    });

    return {
      data: response.data.data,
      meta: response.data.meta!,
    };
  }
}

export const dealsService = new DealsService();
