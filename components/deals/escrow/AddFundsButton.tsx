import {
  ChevronDown,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AddFundsButton() {
  return (
    <Button>
      <Plus className="mr-2 h-4 w-4" />

      Fund Escrow

      <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  );
}