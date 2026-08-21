import { apiClient } from '@/lib/api-client';
import { AxiosRequestConfig } from 'axios';

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
  } | null;

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
  } | null;

  escrow: {
    id: string;
    amount: number;
    currency: string;
    status:
      | 'PENDING'
      | 'FUNDED'
      | 'RELEASE_REQUESTED'
      | 'RELEASED';
    accountNumber?: string;
    fundedAt?: string;
    releasedAt?: string;
    fundingSource:
      | 'BUYER_DEPOSIT'
      | 'SPLIT_DEPOSIT'
      | 'THIRD_PARTY';
    holdingPeriod: number;
    releaseConditions: {
      id: string;
      description: string;
      completed: boolean;
      completedAt?: string;
      sortOrder: number;
    }[];
  } | null;

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

export type ParticipantRole =
  | 'BUYER'
  | 'SELLER'
  | 'LAWYER'
  | 'AGENT';

export type DealType =
  | 'PURCHASE'
  | 'LEASE'
  | 'SALE'
  | 'EXCHANGE';

export type PaymentStructure =
  | 'SINGLE_PAYMENT'
  | 'MILESTONE_PAYMENTS'
  | 'CUSTOM_STRUCTURE';

export type FundingSource =
  | 'BUYER_DEPOSIT'
  | 'SPLIT_DEPOSIT'
  | 'THIRD_PARTY';

export type PropertyType =
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'INDUSTRIAL'
  | 'LAND'
  | 'MIXED_USE';

export interface CreateDraftDealRequest {
  title?: string;
  propertyId?: string;
  creatorRole?: ParticipantRole;
}


export interface CreateDealRequest {
  title: string;
  propertyId: string;
  creatorRole: ParticipantRole;

  terms: {
    dealType: DealType;
    currency: string;
    dealValue: number;
    earnestMoney?: number;
    closingDate: string;
    longStopDate?: string;
    paymentStructure: PaymentStructure;
  };

  escrow?: {
    amount: number;
    fundingSource: FundingSource;
    releaseConditions: string[];
    holdingPeriod: number;
  };

  stakeholders: {
    role: ParticipantRole;
    fullName: string;
    email: string;
    phone?: string;
  }[];
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
  title?: string;
  propertyId?: string;
  creatorRole?: ParticipantRole;
  terms?: Partial<CreateDealRequest['terms']>;
  escrow?: Partial<CreateDealRequest['escrow']>;
  stakeholders?: CreateDealRequest['stakeholders'];
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

    return response.data.data;
  }

  async createDraft(
    data: CreateDraftDealRequest,
  ): Promise<Deal> {
    const response = await apiClient.post<ApiResponse<Deal>>(
      '/deals/drafts',
      data,
    );

    return response.data.data;
  }

  async create(
    data: CreateDealRequest,
  ): Promise<CreateDealResponse> {
    const response = await apiClient.post<
      ApiResponse<CreateDealResponse>
    >('/deals', data);

    return response.data.data;
  }

  async publish(id: string): Promise<Deal> {
    const response = await apiClient.post<ApiResponse<Deal>>(
      `/deals/${id}/publish`,
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

  async deleteDeal(id: string): Promise<void> {
    await apiClient.delete(`/deals/${id}`);
  }

  async listDeals(
    params: ListDealsParams = {},
    config?: AxiosRequestConfig,
  ): Promise<PaginatedDealsResponse> {
    const response = await apiClient.get<
      ApiResponse<Deal[], PaginatedDealsResponse['meta']>
    >('/deals', {
      params,
      ...config,
    });

    return {
      data: response.data.data,
      meta: response.data.meta!,
    };
  }

}

export const dealsService = new DealsService();
