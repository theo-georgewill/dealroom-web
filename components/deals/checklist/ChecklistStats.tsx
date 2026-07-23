import { Deal } from "@/lib/services";

import { CHECKLIST_STATS } from "./constants";

interface ChecklistStatsProps {
  deal: Deal;
}

export function ChecklistStats({
  deal,
}: ChecklistStatsProps) {
  /**
   * Temporary until checklist API exists.
   */
  const values = {
    total: 18,
    completed: 4,
    inProgress: 6,
    pending: 6,
    overdue: 2,
  };

  const percentages = {
    completed: 22,
    inProgress: 33,
    pending: 33,
    overdue: 12,
  };

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
      {CHECKLIST_STATS.map((stat) => {
        const Icon = stat.icon;

        const value =
          values[stat.key as keyof typeof values];

        const percentage =
          percentages[
            stat.key as keyof typeof percentages
          ];

        return (
          <div
            key={stat.key}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconClassName}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">
                    {value}
                  </span>

                  {percentage && (
                    <span className="pb-1 text-sm text-muted-foreground">
                      {percentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}