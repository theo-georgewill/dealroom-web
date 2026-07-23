import { Deal } from "@/lib/services";

import { MOCK_ACTIVITY } from "./constants";
import { ActivityItem } from "./ActivityItem";

interface ActivityTimelineProps {
  deal: Deal;
}

export function ActivityTimeline({
  deal,
}: ActivityTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[110px] top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {MOCK_ACTIVITY.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </div>
  );
}