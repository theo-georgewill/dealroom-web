import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ChecklistTask } from "./types";
import { getChecklistStatusClasses } from "./utils";

interface ChecklistTaskRowProps {
  task: ChecklistTask;
}

export function ChecklistTaskRow({
  task,
}: ChecklistTaskRowProps) {
  const completed = task.status === "COMPLETED";

  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex gap-4">
        <div className="pt-1">
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-foreground">
              {task.title}
            </h4>

            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {task.assignee}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {task.dueDate}
            </div>

            <Badge
              className={getChecklistStatusClasses(
                task.status
              )}
            >
              {task.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </div>

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
            Mark Complete
          </DropdownMenuItem>

          <DropdownMenuItem>
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem>
            Assign User
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive">
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}