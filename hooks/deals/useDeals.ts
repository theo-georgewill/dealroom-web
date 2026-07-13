import { useQuery } from '@tanstack/react-query';

import {
  dealsService,
  ListDealsParams,
} from '@/lib/services/deals.service';
import { queryKeys } from '@/lib/query-keys';

export function useDeals(params: ListDealsParams) {
  return useQuery({
    queryKey: queryKeys.deals.list(params),
    queryFn: () => dealsService.listDeals(params),
  });
}