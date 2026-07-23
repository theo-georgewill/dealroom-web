import {
  MoreHorizontal,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Deal } from "@/lib/services";

import { MOCK_RELEASE_CONDITIONS } from "./constants";
import { getReleaseConditionBadge } from "./utils";

interface ReleaseConditionsTableProps {
  deal: Deal;
}

export function ReleaseConditionsTable({
  deal,
}: ReleaseConditionsTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b px-6 py-4">
        <h3 className="font-semibold">
          Release Conditions
        </h3>

        <p className="text-sm text-muted-foreground">
          Conditions that must be satisfied before
          funds can be released.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Condition</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_RELEASE_CONDITIONS.map(
            (condition) => (
              <TableRow key={condition.id}>
                <TableCell className="font-medium">
                  {condition.title}
                </TableCell>

                <TableCell>
                  {condition.assignedTo}
                </TableCell>

                <TableCell>
                  {condition.dueDate}
                </TableCell>

                <TableCell>
                  <Badge
                    className={getReleaseConditionBadge(
                      condition.status,
                    )}
                  >
                    {condition.status.replace(
                      "_",
                      " ",
                    )}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Mark Complete
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}