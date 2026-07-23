import { Deal } from "@/lib/services";

import { DealProgress } from "../overview/DealProgress";
import { PropertySummaryCard } from "../overview/PropertySummaryCard";
import { DealDescription } from "../overview/DealDescription";
import { EscrowStatusCard } from "../overview/EscrowStatusCard";
import { KeyDatesCard } from "../overview/KeyDatesCard";
import { RecentActivityCard } from "../overview/RecentActivityCard";

import { DealParticipantsCard } from "../overview/ParticipantsCard";
import { QuickActionsCard } from "../overview/QuickActionsCard";
import { SecurityCard } from "../overview/SecurityCard";

export function OverviewTab({ deal }: { deal: Deal }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 space-y-6">
        <DealProgress deal={deal} />

        <div className="grid grid-cols-3 gap-6">
          <PropertySummaryCard deal={deal} />
          <EscrowStatusCard deal={deal} />
          <KeyDatesCard deal={deal} />

        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <RecentActivityCard />
          </div>
          <div className="col-span-4">
            <DealParticipantsCard deal={deal} />
          </div>
        </div>
      </div>
    </div>
  );
}