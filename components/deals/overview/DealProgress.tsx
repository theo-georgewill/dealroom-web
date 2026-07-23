import { Check } from "lucide-react";
import { Deal } from "@/lib/services";

enum DealStage {
  CREATED,
  PARTIES_INVITED,
  ESCROW_FUNDED,
  CONDITIONS,
  READY_TO_CLOSE,
  COMPLETED,
}

export function DealProgress({ deal }: { deal: Deal }) {
  // TODO: Replace with deal.stage when the backend supports it
  const currentStage = DealStage.CONDITIONS;

  const steps = [
    {
      title: "Deal Created",
      subtitle: "2 May 2024",
    },
    {
      title: "Parties Invited",
      subtitle: "3 May 2024",
    },
    {
      title: "Escrow Funded",
      subtitle: "7 May 2024",
    },
    {
      title: "Conditions In Progress",
      subtitle: "2/6 completed",
    },
    {
      title: "Ready to Close",
    },
    {
      title: "Completed",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Deal Progress
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Track the overall progress of this transaction
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          On Track
        </span>
      </div>

      <div className="flex">
        {steps.map((step, index) => {
          const completed = index < currentStage;
          const current = index === currentStage;

          return (
            <div key={step.title} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    completed
                      ? "border-green-600 bg-green-600 text-white"
                      : current
                      ? "border-green-600 bg-background"
                      : "border-border bg-background"
                  }`}
                >
                  {completed && <Check className="h-4 w-4" />}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      completed ? "bg-green-600" : "bg-border"
                    }`}
                  />
                )}
              </div>

              <div className="mt-4">
                <p className="font-medium text-foreground">{step.title}</p>

                {step.subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}