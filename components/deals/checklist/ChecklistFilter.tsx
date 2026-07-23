import { Funnel } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ChecklistFilter() {
  return (
    <Button
      variant="outline"
      className="gap-2"
    >
      <Funnel className="h-4 w-4" />

      Filter
    </Button>
  );
}