// lib/services/payment.service.ts

import { apiClient } from '@/lib/api-client';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface InitializeEscrowRequest {
  escrowId: string;
  amount: number;
}

export interface InitializeEscrowResponse {
  checkoutUrl: string;
  orderReference: string;
}

class PaymentService {
  async initializeEscrow(
    data: InitializeEscrowRequest
  ): Promise<InitializeEscrowResponse> {
    const response = await apiClient.post<
      ApiResponse<InitializeEscrowResponse>
    >(
      '/payments/initialize',
      data
    );

    return response.data.data;
  }

  async verifyPayment(reference: string) {
    const response = await apiClient.get(
      `/payments/verify/${reference}`
    );

    return response.data;
  }
}

export const paymentService = new PaymentService();