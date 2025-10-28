/**
 * VIAMENTOR - FAQ Accordion Component
 * Accordion FAQ pour traiter objections et questions fréquentes
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title: string;
  items: FAQItem[];
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FAQAccordion({
  title,
  items,
  className = "",
}: FAQAccordionProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Réponses aux questions les plus fréquentes
        </p>
      </div>

      {/* Accordion */}
      <Card className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-foreground pr-4">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
