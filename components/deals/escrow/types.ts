import { LucideIcon } from "lucide-react";

export interface EscrowStat {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  iconClassName: string;
}

export type EscrowTimelineStatus =
  | "COMPLETED"
  | "CURRENT"
  | "PENDING";

export interface EscrowTimelineStep {
  id: string;
  title: string;
  description: string;
  status: EscrowTimelineStatus;
  icon: LucideIcon;
}

export type ReleaseConditionStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "PENDING";

export interface ReleaseCondition {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: ReleaseConditionStatus;
}