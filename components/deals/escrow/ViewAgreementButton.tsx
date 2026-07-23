import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ViewAgreementButton() {
  return (
    <Button variant="outline">
      <FileText className="mr-2 h-4 w-4" />

      View Escrow Agreement
    </Button>
  );
}