import {
  Eye,
  Download,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

import { Deal } from "@/lib/services";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StakeholdersTableProps {
  deal: Deal;
}

export function StakeholdersTable({
  deal,
}: StakeholdersTableProps) {
  if (deal.participants.length === 0) {
    return (
      <div className="rounded-xl border py-16 text-center text-muted-foreground">
        No stakeholders have been added yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stakeholder</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[70px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {deal.participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={participant.user.avatar || undefined} />

                    <AvatarFallback>
                      {participant.user.firstName[0]}
                      {participant.user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">
                      {participant.user.firstName}{" "}
                      {participant.user.lastName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {participant.user.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                {participant.role}
              </TableCell>

              <TableCell>
                <Badge>
                  {participant.status}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <Download className="h-4 w-4" />
                  <MessageSquare className="h-4 w-4" />
                </div>
              </TableCell>

              <TableCell>
                —
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>

                    <DropdownMenuItem>Resend Invitation</DropdownMenuItem>

                    <DropdownMenuItem>Change Role</DropdownMenuItem>

                    <DropdownMenuItem variant="destructive">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}