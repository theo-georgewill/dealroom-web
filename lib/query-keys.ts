import { ListDealsParams } from '@/lib/services/deals.service';

export const queryKeys = {
  dashboard: {
    all: ['dashboard'] as const,
  },

  deals: {
    all: ['deals'] as const,

    lists: () => [...queryKeys.deals.all, 'list'] as const,

    list: (params: ListDealsParams) =>
      [...queryKeys.deals.lists(), params] as const,

    details: () => [...queryKeys.deals.all, 'detail'] as const,

    detail: (id: string) =>
      [...queryKeys.deals.details(), id] as const,
  },

  documents: {
    all: ['documents'] as const,

    lists: () => [...queryKeys.documents.all, 'list'] as const,

    list: (dealId: string) =>
      [...queryKeys.documents.lists(), dealId] as const,
  },

  properties: {
    all: ['properties'] as const,

    details: () => [...queryKeys.properties.all, 'detail'] as const,

    detail: (id: string) =>
      [...queryKeys.properties.details(), id] as const,
  },

  escrow: {
    list: (dealId: string) =>
      ['escrow', dealId] as const,
  },

  participants: {
    list: (dealId: string) =>
      ['participants', dealId] as const,
  },

  checklist: {
    list: (dealId: string) =>
      ['checklist', dealId] as const,
  },

  notifications: {
    all: ['notifications'] as const,
  },
} as const;