import { useMutation } from '@tanstack/react-query';
import { dealsService } from '@/lib/services/deals.service';

export function usePublishDeal() {
  return useMutation({
    mutationFn: (id: string) =>
      dealsService.publish(id),
  });
}