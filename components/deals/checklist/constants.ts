import {
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { ChecklistSection } from "./types";

export const CHECKLIST_STATS = [
  {
    key: "total",
    title: "Total Tasks",
    icon: ClipboardList,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    key: "completed",
    title: "Completed",
    icon: CheckCircle2,
    iconClassName: "bg-green-100 text-green-600",
  },
  {
    key: "inProgress",
    title: "In Progress",
    icon: CircleDashed,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    key: "pending",
    title: "Pending",
    icon: Clock3,
    iconClassName: "bg-amber-100 text-amber-600",
  },
  {
    key: "overdue",
    title: "Overdue",
    icon: AlertCircle,
    iconClassName: "bg-red-100 text-red-600",
  },
] as const;

export const MOCK_CHECKLIST: ChecklistSection[] = [
  {
    id: "property",
    title: "Property Verification",
    completed: 2,
    total: 4,
    tasks: [],
  },
  {
    id: "legal",
    title: "Legal Documentation",
    completed: 1,
    total: 5,
    tasks: [],
  },
  {
    id: "financial",
    title: "Financial & Escrow",
    completed: 3,
    total: 5,
    tasks: [],
  },
  {
    id: "inspection",
    title: "Property Inspection",
    completed: 0,
    total: 4,
    tasks: [],
  },
];