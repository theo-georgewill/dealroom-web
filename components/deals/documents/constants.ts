import { DealDocument } from "./types";

export const DOCUMENT_CATEGORIES = [
  "All Categories",
  "Survey Plan",
  "Title Document",
  "Property Image",
  "Contract",
  "Receipt",
] as const;

export const MOCK_DOCUMENTS: DealDocument[] = [
  {
    id: "1",
    title: "Survey Plan.pdf",
    filename: "survey-plan.pdf",
    category: "Survey Plan",
    uploadedBy: {
      name: "Theodore Georgewill",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    uploadedAt: "10 Jul 2026 10:43 AM",
    size: "2.1 MB",
    type: "pdf",
  },
  {
    id: "2",
    title: "Certificate of Occupancy.pdf",
    filename: "coo.pdf",
    category: "Title Document",
    uploadedBy: {
      name: "Theodore Georgewill",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    uploadedAt: "10 Jul 2026 10:35 AM",
    size: "5.8 MB",
    type: "pdf",
  },
  {
    id: "3",
    title: "Front View.jpg",
    filename: "front-view.jpg",
    category: "Property Image",
    uploadedBy: {
      name: "Theodore Georgewill",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    uploadedAt: "10 Jul 2026 10:20 AM",
    size: "1.4 MB",
    type: "image",
  },
  {
    id: "4",
    title: "Contract Draft.pdf",
    filename: "contract-draft.pdf",
    category: "Contract",
    uploadedBy: {
      name: "Theodore Georgewill",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    uploadedAt: "9 Jul 2026 4:15 PM",
    size: "3.2 MB",
    type: "pdf",
  },
  {
    id: "5",
    title: "Receipt - Initial Deposit.pdf",
    filename: "receipt.pdf",
    category: "Receipt",
    uploadedBy: {
      name: "Theodore Georgewill",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    uploadedAt: "9 Jul 2026 3:05 PM",
    size: "620 KB",
    type: "pdf",
  },
];