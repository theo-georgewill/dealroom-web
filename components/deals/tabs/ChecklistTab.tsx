import {
  ChecklistAccordion,
  ChecklistStats,
  ChecklistToolbar,
} from "@/components/deals/checklist";
import { Deal } from "@/lib/services";

interface ChecklistTabProps {
  deal: Deal;
}

export function ChecklistTab({ deal }: ChecklistTabProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 space-y-6">
        <ChecklistToolbar />

        <ChecklistStats deal={deal} />

        <ChecklistAccordion />
      </div>
    </div>
  );
}