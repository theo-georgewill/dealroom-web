import { Deal } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";

export function EscrowTab({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-3">Escrow Balance</h4>
        <p className="text-2xl font-bold text-green-700">{formatCurrency(deal.escrow.amount, 'NGN')}</p>
        <p className="text-sm text-green-700 mt-2">Provider: Nomba</p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Release Conditions</h4>
        <div className="space-y-2">
          {deal.escrow.releaseConditions.map((cond) => (
            <div key={cond.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <input type="checkbox" checked={false} readOnly className="w-4 h-4" />
              <p className={`text-sm ${false ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {cond.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Recent Transactions</h4>
        <div className="space-y-2">
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet.
          </div>
        </div>
      </div>
    </div>
  );
}