import {
  BadgeCheck,
  CircleDollarSign,
  Lock,
  ShieldCheck,
  Banknote,
  ClipboardCheck,
  FileCheck2,
  Wallet,
} from "lucide-react";
import { EscrowStat } from "./types";
import { ReleaseCondition } from "./types";
import { Deal } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { EscrowTimelineStep } from "./types";

export function ESCROW_STATS(
  deal: Deal,
): EscrowStat[] {
  const completedConditions =
    deal.escrow.releaseConditions.filter(
      (condition) => condition.completed,
    ).length;

  return [
    {
      title: "Escrow Amount",
      value: `${formatCurrency(
        deal.escrow.amount,
        deal.escrow.currency,
      )}`,
      description: deal.escrow.currency,
      icon: CircleDollarSign,
      iconClassName:
        "bg-violet-100 text-violet-600",
    },
    {
      title: "Funds Held",
      value: `${formatCurrency(
        deal.escrow.amount,
        deal.escrow.currency,
      )}`,
      description: "100% funded",
      icon: Lock,
      iconClassName:
        "bg-green-100 text-green-600",
    },
    {
      title: "Release Conditions",
      value: `${completedConditions} of ${deal.escrow.releaseConditions.length}`,
      description: `${Math.round(
        (completedConditions /
          Math.max(
            deal.escrow.releaseConditions.length,
            1,
          )) *
          100,
      )}% completed`,
      icon: BadgeCheck,
      iconClassName:
        "bg-amber-100 text-amber-600",
    },
    {
      title: "Escrow Status",
      value: deal.escrow.status,
      description: deal.escrow.fundedAt
        ? `Since ${new Date(
            deal.escrow.fundedAt,
          ).toLocaleDateString()}`
        : undefined,
      icon: ShieldCheck,
      iconClassName:
        "bg-emerald-100 text-emerald-600",
    },
  ];
}


export const ESCROW_TIMELINE: EscrowTimelineStep[] = [
  {
    id: "funded",
    title: "Escrow Funded",
    description: "Buyer deposits funds",
    status: "COMPLETED",
    icon: Banknote,
  },
  {
    id: "due-diligence",
    title: "Due Diligence",
    description: "Property verification",
    status: "CURRENT",
    icon: ClipboardCheck,
  },
  {
    id: "verification",
    title: "Document Verification",
    description: "Legal review",
    status: "PENDING",
    icon: FileCheck2,
  },
  {
    id: "approval",
    title: "Buyer Approval",
    description: "Approve completion",
    status: "PENDING",
    icon: ShieldCheck,
  },
  {
    id: "released",
    title: "Release Funds",
    description: "Transfer to seller",
    status: "PENDING",
    icon: Wallet,
  },
];

export const MOCK_RELEASE_CONDITIONS: ReleaseCondition[] = [
  {
    id: "1",
    title: "Property inspection completed",
    assignedTo: "John Doe",
    dueDate: "20 Jul 2026",
    status: "COMPLETED",
  },
  {
    id: "2",
    title: "Legal documents verified",
    assignedTo: "Jane Smith",
    dueDate: "22 Jul 2026",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "Buyer approval received",
    assignedTo: "Buyer",
    dueDate: "25 Jul 2026",
    status: "PENDING",
  },
  {
    id: "4",
    title: "Seller confirms transfer",
    assignedTo: "Seller",
    dueDate: "28 Jul 2026",
    status: "PENDING",
  },
];