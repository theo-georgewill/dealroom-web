import { LucideIcon } from "lucide-react";

export type ActivityCategory =
  | "DOCUMENTS"
  | "CHECKLIST"
  | "STAKEHOLDERS"
  | "ESCROW"
  | "DEAL"
  | "INVITATIONS";

export interface ActivityDocument {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "IMAGE";
}

export interface Activity {
  id: string;
  date: string;
  time: string;

  title: string;
  description?: string;

  category: ActivityCategory;

  icon: LucideIcon;

  documents?: ActivityDocument[];
}