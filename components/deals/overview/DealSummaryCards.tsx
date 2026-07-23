'use client';

import { Deal } from "@/lib/services";
import { formatCurrency, formatDate } from "@/lib/utils";

export function DealSummaryCards({
  deal,
}: {
  deal: Deal;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-secondary rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-1">
          Deal Value
        </p>

        <p className="text-lg font-bold text-foreground">
          {formatCurrency(
            deal.terms.dealValue,
            "NGN"
          )}
        </p>
      </div>

      <div className="bg-secondary rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-1">
          Earnest Money
        </p>

        <p className="text-lg font-bold text-foreground">
          {formatCurrency(
            Number(deal.terms.earnestMoney || 0),
            "NGN"
          )}
        </p>
      </div>

      <div className="bg-secondary rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-1">
          Closing Date
        </p>

        <p className="text-lg font-bold text-foreground">
          {formatDate(deal.terms.closingDate)}
        </p>
      </div>

      <div className="bg-secondary rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-1">
          Parties
        </p>

        <p className="text-lg font-bold text-foreground">
          {deal.participants.length}
        </p>
      </div>
    </div>
  );
}