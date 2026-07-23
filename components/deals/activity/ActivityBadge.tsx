import { Badge } from "@/components/ui/badge";

import { getActivityBadgeClasses } from "./utils";
import { ActivityCategory } from "./types";

interface ActivityBadgeProps {
  category: ActivityCategory;
}

export function ActivityBadge({
  category,
}: ActivityBadgeProps) {
  return (
    <Badge
      className={getActivityBadgeClasses(category)}
    >
      {category.replace("_", " ")}
    </Badge>
  );
}