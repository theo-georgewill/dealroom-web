import { ChecklistTaskRow } from "./ChecklistTaskRow";
import { ChecklistSection as Section } from "./types";

interface ChecklistSectionProps {
  section: Section;
}

export function ChecklistSection({
  section,
}: ChecklistSectionProps) {
  return (
    <div className="space-y-3 pb-4">
      {section.tasks.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No tasks in this section.
        </div>
      ) : (
        section.tasks.map((task) => (
          <ChecklistTaskRow
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  );
}