import { apiClient } from '@/lib/api-client';

export interface EscrowAccount {
  id: string;
  dealId: string;
  balance: number;
  status: 'pending' | 'active' | 'released' | 'cancelled';
  createdAt: string;
  releasedAt?: string;
}

export interface CreateEscrowRequest {
  dealId: string;
  amount: number;
}

export interface ReleaseEscrowRequest {
  escrowId: string;
  recipientId: string;
}

class EscrowService {
  async getEscrow(id: string): Promise<EscrowAccount> {
    const response = await apiClient.get<EscrowAccount>(`/escrow/${id}`);
    return response.data;
  }

  async createEscrow(data: CreateEscrowRequest): Promise<EscrowAccount> {
    const response = await apiClient.post<EscrowAccount>('/escrow', data);
    return response.data;
  }

  async fundEscrow(id: string, amount: number): Promise<EscrowAccount> {
    const response = await apiClient.patch<EscrowAccount>(`/escrow/${id}/fund`, {
      amount,
    });
    return response.data;
  }

  async releaseEscrow(data: ReleaseEscrowRequest): Promise<EscrowAccount> {
    const response = await apiClient.post<EscrowAccount>('/escrow/release', data);
    return response.data;
  }

  async listEscrowAccounts(dealId?: string): Promise<EscrowAccount[]> {
    const response = await apiClient.get<EscrowAccount[]>('/escrow', {
      params: { dealId },
    });
    return response.data;
  }
}

export const escrowService = new EscrowService();
