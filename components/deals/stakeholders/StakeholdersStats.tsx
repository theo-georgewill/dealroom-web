import { Deal } from "@/lib/services";

import { STAKEHOLDER_STATS } from "./constants";

interface StakeholdersStatsProps {
  deal: Deal;
}

export function StakeholdersStats({
  deal,
}: StakeholdersStatsProps) {
  const stats = STAKEHOLDER_STATS.map((stat) => ({
    ...stat,
    value: stat.getValue(deal),
  }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="flex items-center gap-4 rounded-xl border bg-card p-6"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconClassName}`}
            >
              <Icon className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-foreground">
                {stat.value}
              </h3>

              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}