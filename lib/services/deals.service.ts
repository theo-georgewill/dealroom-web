import { apiClient } from '@/lib/api-client';

export interface Deal {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDealRequest {
  title: string;
  description?: string;
  value: number;
}

export interface UpdateDealRequest {
  title?: string;
  description?: string;
  status?: Deal['status'];
  value?: number;
}

class DealsService {
  async getDeal(id: string): Promise<Deal> {
    const response = await apiClient.get<Deal>(`/deals/${id}`);
    return response.data;
  }

  async createDeal(data: CreateDealRequest): Promise<Deal> {
    const response = await apiClient.post<Deal>('/deals', data);
    return response.data;
  }

  async updateDeal(id: string, data: UpdateDealRequest): Promise<Deal> {
    const response = await apiClient.patch<Deal>(`/deals/${id}`, data);
    return response.data;
  }

  async deleteDeal(id: string): Promise<void> {
    await apiClient.delete(`/deals/${id}`);
  }

  async listDeals(
    page = 1,
    limit = 10,
    status?: Deal['status']
  ): Promise<{ deals: Deal[]; total: number }> {
    const response = await apiClient.get<{ deals: Deal[]; total: number }>('/deals', {
      params: { page, limit, status },
    });
    return response.data;
  }
}

export const dealsService = new DealsService();
