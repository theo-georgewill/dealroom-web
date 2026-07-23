import { FileImage, FileText } from "lucide-react";

import { DocumentCategory } from "./types";

export function getDocumentIcon(type: "pdf" | "image") {
  return type === "pdf" ? FileText : FileImage;
}
export function getCategoryVariant(category: DocumentCategory) {
  switch (category) {
    case "Survey Plan":
      return "secondary";

    case "Title Document":
      return "default";

    case "Property Image":
      return "outline";

    case "Contract":
      return "secondary";

    case "Receipt":
      return "destructive";

    default:
      return "secondary";
  }
}