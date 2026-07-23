import { EscrowTimelineStatus } from "./types";
import { ReleaseConditionStatus } from "./types";


export function getTimelineClasses(
  status: EscrowTimelineStatus,
) {
  switch (status) {
    case "COMPLETED":
      return {
        circle:
          "bg-green-600 text-white border-green-600",
        line: "bg-green-600",
      };

    case "CURRENT":
      return {
        circle:
          "border-primary text-primary bg-primary/10",
        line: "bg-border",
      };

    default:
      return {
        circle:
          "border-muted-foreground/30 text-muted-foreground",
        line: "bg-border",
      };
  }
}

export function getReleaseConditionBadge(
  status: ReleaseConditionStatus,
) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-700";

    case "PENDING":
      return "bg-amber-100 text-amber-700";

    default:
      return "";
  }
}