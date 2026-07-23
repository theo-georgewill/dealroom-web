import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface StakeholdersPaginationProps {
  page?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function StakeholdersPagination({
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
}: StakeholdersPaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {total === 0 ? 0 : (page - 1) * 10 + 1}
        </span>{" "}
        -
        <span className="font-medium text-foreground">
          {" "}
          {Math.min(page * 10, total)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">
          {total}
        </span>{" "}
        stakeholders
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={!canGoPrevious}
          onClick={() => onPageChange?.(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={
                pageNumber === page
                  ? "default"
                  : "outline"
              }
              size="icon"
              onClick={() =>
                onPageChange?.(pageNumber)
              }
            >
              {pageNumber}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          disabled={!canGoNext}
          onClick={() => onPageChange?.(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}