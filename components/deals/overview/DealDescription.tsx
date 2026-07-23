'use client';

import { Deal } from "@/lib/services";

export function DealDescription({
  deal,
}: {
  deal: Deal;
}) {
  if (!deal.property.description) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold text-foreground mb-2">
        Description
      </h4>

      <p className="text-sm text-muted-foreground">
        {deal.property.description}
      </p>
    </div>
  );
}