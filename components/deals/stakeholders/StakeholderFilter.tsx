import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StakeholderFilter() {
  return (
    <Button
      variant="outline"
      className="gap-2"
    >
      <SlidersHorizontal className="h-4 w-4" />

      Filter
    </Button>
  );
}