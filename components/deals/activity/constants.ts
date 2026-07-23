import {
  CheckCircle2,
  FileUp,
  Mail,
  Pencil,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Activity } from "./types";

export const MOCK_ACTIVITY: Activity[] = [
  {
    id: "1",
    date: "Today",
    time: "10:30 AM",
    title: "Jane Cooper uploaded 3 documents",
    category: "DOCUMENTS",
    icon: FileUp,
    documents: [
      {
        id: "1",
        name: "Contract Agreement.pdf",
        type: "PDF",
      },
      {
        id: "2",
        name: "Title Deed.docx",
        type: "DOCX",
      },
      {
        id: "3",
        name: "Property Image.jpg",
        type: "IMAGE",
      },
    ],
  },
  {
    id: "2",
    date: "Today",
    time: "10:15 AM",
    title:
      'Legal Counsel completed "Verify Certificate of Occupancy"',
    category: "CHECKLIST",
    icon: CheckCircle2,
  },
  {
    id: "3",
    date: "Yesterday",
    time: "4:45 PM",
    title:
      "Theodore Georgewill added Legal Counsel as a Legal Advisor",
    category: "STAKEHOLDERS",
    icon: Users,
  },
  {
    id: "4",
    date: "Yesterday",
    time: "2:20 PM",
    title: "Escrow funded successfully",
    description: "Amount: ₦1,000,000.00",
    category: "ESCROW",
    icon: ShieldCheck,
  },
  {
    id: "5",
    date: "14 Jun 2026",
    time: "11:05 AM",
    title: "James Cooper updated deal information",
    description:
      "Deal closing date changed from 30 Jun 2026 to 7 Jul 2026",
    category: "DEAL",
    icon: Pencil,
  },
  {
    id: "6",
    date: "12 Jun 2026",
    time: "9:12 AM",
    title: "Invitation sent to Prudential Escrow",
    description: "Email: escrow@prudential.com",
    category: "INVITATIONS",
    icon: Mail,
  },
];