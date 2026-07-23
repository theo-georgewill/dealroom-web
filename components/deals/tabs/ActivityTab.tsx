import {
  ActivityTimeline,
  ActivityToolbar,
  LoadMoreButton,
} from "@/components/deals/activity";
import { Deal } from "@/lib/services";

interface ActivityTabProps {
  deal: Deal;
}

export function ActivityTab({
  deal,
}: ActivityTabProps) {
  return (
    <div className="space-y-8">
      <ActivityToolbar />

      <ActivityTimeline deal={deal} />

      <LoadMoreButton />
    </div>
  );
}