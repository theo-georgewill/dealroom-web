import { Badge } from "@/components/ui/badge";

import { getDocumentIcon } from "./utils";
import { ActivityDocument } from "./types";

interface ActivityDocumentListProps {
  documents: ActivityDocument[];
}

export function ActivityDocumentList({
  documents,
}: ActivityDocumentListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {documents.map((document) => {
        const Icon = getDocumentIcon(document.type);

        return (
          <Badge
            key={document.id}
            variant="secondary"
            className="flex items-center gap-2 px-3 py-1"
          >
            <Icon className="h-3.5 w-3.5" />

            <span>{document.name}</span>
          </Badge>
        );
      })}
    </div>
  );
}