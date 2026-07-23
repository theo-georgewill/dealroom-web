import { Check } from "lucide-react";

import { ESCROW_TIMELINE } from "./constants";
import { getTimelineClasses } from "./utils";
import { Deal } from "@/lib/services";

interface EscrowTimelineProps {
  deal: Deal;
}

export function EscrowTimeline({
  deal,
}: EscrowTimelineProps) {
  return (
    <div className="rounded-xl border bg-card p-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold">
          Escrow Progress
        </h3>

        <p className="text-sm text-muted-foreground">
          Current transaction stage
        </p>
      </div>

      <div className="flex justify-between">
        {ESCROW_TIMELINE.map((step, index) => {
          const Icon = step.icon;

          const styles = getTimelineClasses(
            step.status,
          );

          return (
            <div
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {index < ESCROW_TIMELINE.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 h-0.5 w-full ${styles.line}`}
                />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${styles.circle}`}
              >
                {step.status === "COMPLETED" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-sm font-medium">
                  {step.title}
                </h4>

                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}