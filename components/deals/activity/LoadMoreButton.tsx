import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export function LoadMoreButton({
  hasMore = true,
  isLoading = false,
  onLoadMore,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        You've reached the end of the activity feed.
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6">
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        {isLoading ? "Loading..." : "Load More Activity"}
      </Button>
    </div>
  );
}