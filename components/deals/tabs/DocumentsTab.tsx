import {
  DocumentsToolbar,
  DocumentsTable,
  DocumentsPagination,
} from "@/components/deals/documents";

export function DocumentsTab() {
  return (
    <div className="space-y-6">
      <DocumentsToolbar />
      <DocumentsTable />
      <DocumentsPagination />
    </div>
  );
}