export type DocumentCategory =
  | "Survey Plan"
  | "Title Document"
  | "Property Image"
  | "Contract"
  | "Receipt";

export interface DealDocument {
  id: string;
  title: string;
  filename: string;
  category: DocumentCategory;
  uploadedBy: {
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  size: string;
  type: "pdf" | "image";
}