import { MapPin, ArrowRight } from "lucide-react";
import { Deal } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export function PropertySummaryCard({ deal }: { deal: Deal }) {
  const image =
    deal.property.images?.[0]?.key ??
    "/images/property-placeholder.jpg";

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Property Summary
      </h3>

      <img
        src={image}
        alt={deal.property.name}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />

      <div className="mb-4 flex items-start gap-2">
        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />

        <p className="text-sm text-muted-foreground">
          {deal.property.address}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Property Type
          </span>

          <span className="font-medium text-foreground">
            {deal.property.type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Deal Value
          </span>

          <span className="font-semibold text-foreground">
            {formatCurrency(deal.terms.dealValue, "NGN")}
          </span>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
        View Property Details

        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}