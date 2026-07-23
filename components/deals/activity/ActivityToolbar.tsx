import {
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ActivityToolbar() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Activity Feed
          </h2>

          <p className="mt-2 text-muted-foreground">
            Track all updates and actions across this transaction.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search activity..."
              className="pl-9"
            />
          </div>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button
            variant="outline"
            className="min-w-[170px] justify-between"
          >
            All Activity

            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}