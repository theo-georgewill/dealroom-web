'use client';

import { ShieldCheck, ArrowRight } from "lucide-react";
import { Deal } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export function EscrowStatusCard({ deal }: { deal: Deal }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 h-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Escrow Status
        </h3>

        <button className="text-sm font-medium text-primary hover:underline">
          View Details
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-xl border p-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Escrow Balance
          </p>

          <p className="mt-1 text-3xl font-bold">
            {formatCurrency(deal.escrow.amount, "NGN")}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Funded
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <ShieldCheck className="h-7 w-7 text-green-600" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Provider
          </span>

          <span className="font-medium">
            Nomba
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Account
          </span>

          <span className="font-medium">
            {deal.escrow.accountNumber || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Status
          </span>

          <span className="font-medium text-green-600">
            Funded
          </span>
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 font-medium transition-colors hover:bg-secondary">
        Go to Escrow

        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}