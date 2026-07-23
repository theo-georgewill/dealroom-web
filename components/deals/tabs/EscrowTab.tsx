import {
  EscrowStats,
  EscrowTimeline,
  EscrowToolbar,
  ReleaseConditionsTable,
} from "@/components/deals/escrow";
import { Deal } from "@/lib/services";

interface EscrowTabProps {
  deal: Deal;
}

export function EscrowTab({ deal }: EscrowTabProps) {
  return (
    <div className="space-y-8">
      <EscrowToolbar />
      <EscrowStats deal={deal} />
      <EscrowTimeline deal={deal} />
      <ReleaseConditionsTable deal={deal} />
    </div>
  );
}