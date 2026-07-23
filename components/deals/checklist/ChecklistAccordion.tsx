import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MOCK_CHECKLIST } from "./constants";
import { ChecklistSection } from "./ChecklistSection";

export function ChecklistAccordion() {
  return (
    <Accordion
      multiple
      className="space-y-4"
    >
      {MOCK_CHECKLIST.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="rounded-xl border bg-card px-5"
        >
          <AccordionTrigger className="py-5">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">
                {section.title}
              </h3>

              <span className="rounded-full bg-secondary px-2 py-1 text-xs">
                {section.completed}/{section.total}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <ChecklistSection
              section={section}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}