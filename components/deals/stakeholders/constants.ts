import {
  CheckCircle2,
  Clock3,
  Users,
  XCircle,
} from "lucide-react";

import { Deal } from "@/lib/services";

export const STAKEHOLDER_STATS = [
  {
    title: "Total Stakeholders",
    icon: Users,
    iconClassName: "bg-blue-100 text-blue-600",
    getValue: (deal: Deal) => deal.participants.length,
  },
  {
    title: "Active",
    icon: CheckCircle2,
    iconClassName: "bg-green-100 text-green-600",
    getValue: (deal: Deal) =>
      deal.participants.filter((p) => p.status === "ACCEPTED").length,
  },
  {
    title: "Pending Invitation",
    icon: Clock3,
    iconClassName: "bg-amber-100 text-amber-600",
    getValue: (deal: Deal) =>
      deal.participants.filter((p) => p.status === "PENDING").length,
  },
  {
    title: "Declined",
    icon: XCircle,
    iconClassName: "bg-red-100 text-red-600",
    getValue: (deal: Deal) =>
      deal.participants.filter((p) => p.status === "DECLINED").length,
  },
];