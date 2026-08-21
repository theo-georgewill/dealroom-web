import { useMutation } from '@tanstack/react-query';
import { dealsService } from '@/lib/services/deals.service';

export function useDeleteDeal() {
  return useMutation({
    mutationFn: (id: string) =>
      dealsService.deleteDeal(id),
  });
}