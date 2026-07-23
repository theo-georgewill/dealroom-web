'use client';

import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import { Deal } from "@/lib/services";
import { formatDate } from "@/lib/utils";

export function KeyDatesCard({
  deal,
}: {
  deal: Deal;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 h-full">
      <h3 className="mb-6 text-lg font-semibold">
        Key Dates
      </h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
              Deal Created
            </span>
          </div>

          <span className="font-medium">
            {formatDate(deal.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
              Closing Date
            </span>
          </div>

          <span className="font-medium">
            {formatDate(deal.terms.closingDate)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
              Last Updated
            </span>
          </div>

          <span className="font-medium">
            {formatDate(deal.updatedAt)}
          </span>
        </div>
      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 font-medium transition-colors hover:bg-secondary">
        View Timeline

        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}