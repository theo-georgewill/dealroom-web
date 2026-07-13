import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { dealsService } from '@/lib/services/deals.service';
import { queryKeys } from '@/lib/query-keys';

export function useDeal() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: queryKeys.deals.detail(id),
    queryFn: () => dealsService.getDeal(id),
    enabled: !!id,
  });
}