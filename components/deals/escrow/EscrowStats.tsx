import { Deal } from "@/lib/services";

import { ESCROW_STATS } from "./constants";

interface EscrowStatsProps {
  deal: Deal;
}

export function EscrowStats({
  deal,
}: EscrowStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {ESCROW_STATS(deal).map((stat) => {
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

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <h3 className="text-2xl font-bold text-foreground">
                {stat.value}
              </h3>

              {stat.description && (
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}