/**
 * VIAMENTOR - Instructor Proposal Form
 * Formulaire proposition moniteur pour prendre en charge élève
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2Icon, SendIcon } from "lucide-react";
import type { AssignmentLocale } from "@/polymet/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorProposalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: string;
    name: string;
    avatar?: string;
    category: string;
    level: string;
    preferredSchedule: string;
  };
  locale?: AssignmentLocale;
  onSubmit: (data: {
    motivation: string;
    proposedSchedule: string[];
    longTermCommitment: boolean;
  }) => Promise<void>;
}

const SCHEDULE_OPTIONS = [
  {
    id: "mon-am",
    label: {
      fr: "Lundi matin",
      de: "Montag Vormittag",
      it: "Lunedì mattina",
      en: "Monday AM",
    },
  },
  {
    id: "mon-pm",
    label: {
      fr: "Lundi après-midi",
      de: "Montag Nachmittag",
      it: "Lunedì pomeriggio",
      en: "Monday PM",
    },
  },
  {
    id: "tue-am",
    label: {
      fr: "Mardi matin",
      de: "Dienstag Vormittag",
      it: "Martedì mattina",
      en: "Tuesday AM",
    },
  },
  {
    id: "tue-pm",
    label: {
      fr: "Mardi après-midi",
      de: "Dienstag Nachmittag",
      it: "Martedì pomeriggio",
      en: "Tuesday PM",
    },
  },
  {
    id: "wed-am",
    label: {
      fr: "Mercredi matin",
      de: "Mittwoch Vormittag",
      it: "Mercoledì mattina",
      en: "Wednesday AM",
    },
  },
  {
    id: "wed-pm",
    label: {
      fr: "Mercredi après-midi",
      de: "Mittwoch Nachmittag",
      it: "Mercoledì pomeriggio",
      en: "Wednesday PM",
    },
  },
  {
    id: "thu-am",
    label: {
      fr: "Jeudi matin",
      de: "Donnerstag Vormittag",
      it: "Giovedì mattina",
      en: "Thursday AM",
    },
  },
  {
    id: "thu-pm",
    label: {
      fr: "Jeudi après-midi",
      de: "Donnerstag Nachmittag",
      it: "Giovedì pomeriggio",
      en: "Thursday PM",
    },
  },
  {
    id: "fri-am",
    label: {
      fr: "Vendredi matin",
      de: "Freitag Vormittag",
      it: "Venerdì mattina",
      en: "Friday AM",
    },
  },
  {
    id: "fri-pm",
    label: {
      fr: "Vendredi après-midi",
      de: "Freitag Nachmittag",
      it: "Venerdì pomeriggio",
      en: "Friday PM",
    },
  },
  {
    id: "sat-am",
    label: {
      fr: "Samedi matin",
      de: "Samstag Vormittag",
      it: "Sabato mattina",
      en: "Saturday AM",
    },
  },
  {
    id: "sat-pm",
    label: {
      fr: "Samedi après-midi",
      de: "Samstag Nachmittag",
      it: "Sabato pomeriggio",
      en: "Saturday PM",
    },
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorProposalForm({
  open,
  onOpenChange,
  student,
  locale = "fr",
  onSubmit,
}: InstructorProposalFormProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];
  const [motivation, setMotivation] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [longTermCommitment, setLongTermCommitment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (motivation.trim().length < 100 || selectedSchedule.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        motivation: motivation.trim(),
        proposedSchedule: selectedSchedule.map(
          (id) =>
            SCHEDULE_OPTIONS.find((opt) => opt.id === id)?.label[locale] || id
        ),
        longTermCommitment,
      });
      // Reset form
      setMotivation("");
      setSelectedSchedule([]);
      setLongTermCommitment(false);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSchedule = (id: string) => {
    setSelectedSchedule((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t.proposals.proposalFor.replace("{student}", student.name)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Avatar className="w-16 h-16">
              <AvatarImage src={student.avatar} />

              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">{student.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{student.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {student.level}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t.proposals.preferredSchedule}: {student.preferredSchedule}
              </p>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <Label htmlFor="motivation">
              {t.proposals.motivation}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder={t.proposals.motivationPlaceholder}
              rows={6}
              maxLength={300}
              className="mt-2"
            />

            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                {locale === "fr"
                  ? "Minimum 100 caractères"
                  : locale === "de"
                    ? "Mindestens 100 Zeichen"
                    : locale === "it"
                      ? "Minimo 100 caratteri"
                      : "Minimum 100 characters"}
              </p>
              <p
                className={`text-xs ${
                  motivation.length >= 100
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground"
                }`}
              >
                {motivation.length}/300
              </p>
            </div>
          </div>

          {/* Proposed Schedule */}
          <div>
            <Label>
              {t.proposals.proposedSchedule}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SCHEDULE_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSchedule.includes(option.id)
                      ? "bg-primary/10 border-primary"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => toggleSchedule(option.id)}
                >
                  <Checkbox
                    checked={selectedSchedule.includes(option.id)}
                    onCheckedChange={() => toggleSchedule(option.id)}
                  />

                  <span className="text-sm">{option.label[locale]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {locale === "fr"
                ? `${selectedSchedule.length} créneaux sélectionnés`
                : locale === "de"
                  ? `${selectedSchedule.length} Zeitfenster ausgewählt`
                  : locale === "it"
                    ? `${selectedSchedule.length} fasce orarie selezionate`
                    : `${selectedSchedule.length} time slots selected`}
            </p>
          </div>

          {/* Long Term Commitment */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="commitment"
              checked={longTermCommitment}
              onCheckedChange={(checked) =>
                setLongTermCommitment(checked === true)
              }
            />

            <div className="flex-1">
              <Label htmlFor="commitment" className="cursor-pointer">
                {t.proposals.longTermCommitment}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {locale === "fr"
                  ? "Je m'engage à assurer un suivi continu jusqu'à l'obtention du permis"
                  : locale === "de"
                    ? "Ich verpflichte mich zu einer kontinuierlichen Betreuung bis zum Führerscheinerwerb"
                    : locale === "it"
                      ? "Mi impegno a garantire un seguito continuo fino all'ottenimento della patente"
                      : "I commit to providing continuous support until license acquisition"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t.cancel}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                motivation.trim().length < 100 ||
                selectedSchedule.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting && (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              )}
              <SendIcon className="w-4 h-4 mr-2" />

              {t.proposals.sendProposal}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
