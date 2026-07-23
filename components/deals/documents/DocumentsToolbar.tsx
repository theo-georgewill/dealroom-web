import { DocumentCategoryFilter } from "./DocumentCategoryFilter";
import { DocumentSearch } from "./DocumentsSearch";
import { UploadDocumentButton } from "./UploadDocumentButton";

export function DocumentsToolbar() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Documents
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all documents related to this deal.
          </p>
        </div>

        <UploadDocumentButton />
      </div>

      <div className="flex items-center justify-between gap-4">
        <DocumentCategoryFilter />

        <DocumentSearch />
      </div>
    </div>
  );
}