import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function DocumentSearch() {
  return (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search documents..."
        className="pl-9"
      />
    </div>
  );
}