import { ActivityCategory } from "./types";

import {
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import { ActivityDocument } from "./types";


export function getActivityBadgeClasses(
  category: ActivityCategory,
) {
  switch (category) {
    case "DOCUMENTS":
      return "bg-blue-100 text-blue-700";

    case "CHECKLIST":
      return "bg-green-100 text-green-700";

    case "STAKEHOLDERS":
      return "bg-purple-100 text-purple-700";

    case "ESCROW":
      return "bg-amber-100 text-amber-700";

    case "DEAL":
      return "bg-slate-100 text-slate-700";

    case "INVITATIONS":
      return "bg-pink-100 text-pink-700";

    default:
      return "";
  }
}

export function getDocumentIcon(
  type: ActivityDocument["type"],
) {
  switch (type) {
    case "PDF":
      return FileText;

    case "DOCX":
      return FileText;

    case "IMAGE":
      return FileImage;

    default:
      return FileSpreadsheet;
  }
}