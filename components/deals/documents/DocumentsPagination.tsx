import { CircleCheck } from "lucide-react";

export function DocumentsPagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
      <CircleCheck className="h-4 w-4" />
      <span>No more documents</span>
    </div>
  );
}