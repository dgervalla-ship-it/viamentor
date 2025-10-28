/**
 * VIAMENTOR - Request Demo Form Component
 * Formulaire demande démo personnalisée
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, CheckIcon } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RequestDemoFormProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RequestDemoForm({
  locale = "fr",
  className,
}: RequestDemoFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const t = getMarketingTranslations(locale);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className={`p-8 text-center ${className || ""}`}>
        <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
        <p className="text-muted-foreground mb-6">
          Notre équipe vous contactera dans les 24h pour planifier votre démo
          personnalisée.
        </p>
        <Button onClick={() => setSubmitted(false)}>
          Envoyer une autre demande
        </Button>
      </Card>
    );
  }

  return (
    <Card className={`p-8 ${className || ""}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <CalendarIcon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">{t.demo.requestDemo.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{t.demo.requestDemo.name}</Label>
          <Input id="name" required placeholder="Jean Dupont" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{t.demo.requestDemo.email}</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="jean@auto-ecole.ch"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">{t.demo.requestDemo.phone}</Label>
          <Input id="phone" type="tel" placeholder="+41 79 123 45 67" />
        </div>

        {/* School Size */}
        <div className="space-y-2">
          <Label htmlFor="size">{t.demo.requestDemo.schoolSize}</Label>
          <Select required>
            <SelectTrigger id="size">
              <SelectValue placeholder="Sélectionnez..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 moniteurs</SelectItem>
              <SelectItem value="6-10">6-10 moniteurs</SelectItem>
              <SelectItem value="11-20">11-20 moniteurs</SelectItem>
              <SelectItem value="20+">20+ moniteurs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Needs */}
        <div className="space-y-2">
          <Label htmlFor="needs">{t.demo.requestDemo.needs}</Label>
          <Textarea
            id="needs"
            placeholder="Décrivez vos besoins spécifiques..."
            rows={4}
            maxLength={300}
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked as boolean)}
            required
          />

          <Label htmlFor="consent" className="text-sm leading-relaxed">
            {t.demo.requestDemo.consent}
          </Label>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={!consent}>
          {t.demo.requestDemo.submit}
        </Button>
      </form>
    </Card>
  );
}
