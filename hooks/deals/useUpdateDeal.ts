import { useMutation } from '@tanstack/react-query';
import {
  dealsService,
  UpdateDealRequest,
} from '@/lib/services/deals.service';

export function useUpdateDeal() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDealRequest;
    }) => dealsService.updateDeal(id, data),
  });
}