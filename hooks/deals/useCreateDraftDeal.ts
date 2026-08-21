import { useMutation } from '@tanstack/react-query';
import {
  dealsService,
  CreateDraftDealRequest,
} from '@/lib/services/deals.service';

export function useCreateDraftDeal() {
  return useMutation({
    mutationFn: (data: CreateDraftDealRequest) =>
      dealsService.createDraft(data),
  });
}