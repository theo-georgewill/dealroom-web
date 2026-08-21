import { useMutation } from '@tanstack/react-query';
import {
  dealsService,
  CreateDealRequest,
} from '@/lib/services/deals.service';

export function useCreateDeal() {
  return useMutation({
    mutationFn: (data: CreateDealRequest) =>
      dealsService.create(data),
  });
}