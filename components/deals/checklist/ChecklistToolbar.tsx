import { AddTaskButton } from "./AddTaskButton";
import { ChecklistFilter } from "./ChecklistFilter";

export function ChecklistToolbar() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Due Diligence Checklist
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track and complete all required tasks to keep your deal on track.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ChecklistFilter />

        <AddTaskButton />
      </div>
    </div>
  );
}