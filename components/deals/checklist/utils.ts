import { ChecklistTaskStatus } from "./types";

export function getChecklistStatusClasses(
  status: ChecklistTaskStatus,
) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-700";

    case "PENDING":
      return "bg-amber-100 text-amber-700";

    case "OVERDUE":
      return "bg-red-100 text-red-700";

    default:
      return "";
  }
}