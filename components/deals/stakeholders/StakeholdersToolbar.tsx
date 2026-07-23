import { AddStakeholderButton } from "./AddStakeholderButton";
import { StakeholderFilter } from "./StakeholderFilter";
import { StakeholderSearch } from "./StakeholderSearch";

export function StakeholdersToolbar() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Stakeholders
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage all parties involved in this transaction.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StakeholderSearch />

          <StakeholderFilter />

          <AddStakeholderButton />
        </div>
      </div>
    </div>
  );
}