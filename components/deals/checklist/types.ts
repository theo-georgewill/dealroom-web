export type ChecklistTaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "OVERDUE";

export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: ChecklistTaskStatus;
}

export interface ChecklistSection {
  id: string;
  title: string;
  completed: number;
  total: number;
  tasks: ChecklistTask[];
}