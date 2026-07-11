import { Deal } from "@/lib/services";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getDealProgress } from '@/components/deals/utils';

export function OverviewTab({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-foreground mb-2">Deal Progress</h4>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Overall</p>
          <p className="text-sm font-semibold text-foreground">{getDealProgress(deal.status)}%</p>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div className="bg-primary h-full rounded-full" style={{ width: `${getDealProgress(deal.status)}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Deal Value</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(deal.terms.dealValue, 'NGN')}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Earnest Money</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(Number(deal.terms.earnestMoney || 0), 'NGN')}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Closing Date</p>
          <p className="text-lg font-bold text-foreground">{formatDate(deal.terms.closingDate)}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Parties</p>
          <p className="text-lg font-bold text-foreground">{deal.participants.length}</p>
        </div>
      </div>

      {deal.property.description && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{deal.property.description}</p>
        </div>
      )}
    </div>
  );
}