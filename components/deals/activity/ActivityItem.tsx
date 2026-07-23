import { ActivityBadge } from "./ActivityBadge";
import { ActivityDocumentList } from "./ActivityDocumentList";

import { Activity } from "./types";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({
  activity,
}: ActivityItemProps) {
  const Icon = activity.icon;

  return (
    <div className="relative flex gap-8">
      {/* Time */}
      <div className="w-24 shrink-0 text-right">
        <p className="font-medium">
          {activity.date}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {activity.time}
        </p>
      </div>

      {/* Timeline Icon */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background">
        <Icon className="h-5 w-5" />
      </div>

      {/* Activity Card */}
      <div className="flex-1 rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-3">
            <h3 className="font-medium leading-6">
              {activity.title}
            </h3>

            {activity.description && (
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
            )}

            {activity.documents && (
              <ActivityDocumentList
                documents={activity.documents}
              />
            )}
          </div>

          <ActivityBadge
            category={activity.category}
          />
        </div>
      </div>
    </div>
  );
}