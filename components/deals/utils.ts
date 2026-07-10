import { Deal } from "@/lib/services";

export function getDealProgress(status: Deal['status']) {
  switch (status) {
    case 'DRAFT':
      return 10;

    case 'PENDING_PARTICIPANTS':
      return 20;

    case 'PENDING_FUNDING':
      return 40;

    case 'FUNDED':
      return 60;

    case 'DUE_DILIGENCE':
      return 75;

    case 'RELEASE_REQUESTED':
      return 90;

    case 'COMPLETED':
      return 100;

    case 'CANCELLED':
      return 0;

    default:
      return 0;
  }
}