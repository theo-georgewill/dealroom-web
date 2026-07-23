import {
  Download,
  FileImage,
  FileText,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MOCK_DOCUMENTS } from "./constants";

export function DocumentsTable() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Uploaded On</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK_DOCUMENTS.map((document) => {
            const Icon =
              document.type === "pdf"
                ? FileText
                : FileImage;

            return (
              <TableRow key={document.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {document.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {document.filename}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge>
                    {document.category}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={document.uploadedBy.avatar}
                      />
                      <AvatarFallback>
                        TG
                      </AvatarFallback>
                    </Avatar>

                    <span>
                      {document.uploadedBy.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {document.uploadedAt}
                </TableCell>

                <TableCell>{document.size}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}