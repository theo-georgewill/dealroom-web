import { ChevronDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AddTaskButton() {
  return (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />

      Add Task

      <ChevronDown className="h-4 w-4 opacity-70" />
    </Button>
  );
}