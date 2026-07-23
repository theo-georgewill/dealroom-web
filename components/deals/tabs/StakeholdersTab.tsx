import {
  StakeholdersPagination,
  StakeholdersStats,
  StakeholdersTable,
  StakeholdersToolbar,
} from "@/components/deals/stakeholders";
import { Deal } from "@/lib/services";

interface StakeholdersTabProps {
  deal: Deal;
}

export function StakeholdersTab({ deal }: StakeholdersTabProps) {
  return (
    <div className="space-y-8">
      <StakeholdersToolbar />

      <StakeholdersStats deal={deal} />

      <StakeholdersTable deal={deal} />
      
      <StakeholdersPagination
        total={deal.participants.length}
      />
    </div>
  );
}