/**
 * VIAMENTOR - AI Config Form
 * Composant configuration IA école avec personnalisation complète
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, XIcon, KeyIcon, BrainIcon, SaveIcon } from "lucide-react";
import { aiResponsesTranslations } from "@/polymet/data/viamentor-ai-responses-i18n";
import type { AIResponsesLocale } from "@/polymet/data/viamentor-ai-responses-i18n";
import type { SchoolAIConfig } from "@/polymet/data/viamentor-ai-responses-data";

// ============================================================================
// TYPES
// ============================================================================

interface AIConfigFormProps {
  config: SchoolAIConfig;
  locale?: AIResponsesLocale;
  onSave?: (config: SchoolAIConfig) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AIConfigForm({
  config,
  locale = "fr",
  onSave,
}: AIConfigFormProps) {
  const t = aiResponsesTranslations[locale];
  const [formData, setFormData] = useState<SchoolAIConfig>(config);
  const [keywordsInput, setKeywordsInput] = useState(
    config.keywordsToInclude.join(", ")
  );
  const [phrasesInput, setPhrasesInput] = useState(
    config.phrasesToAvoid.join(", ")
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    const updatedConfig: SchoolAIConfig = {
      ...formData,
      keywordsToInclude: keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      phrasesToAvoid: phrasesInput
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      updatedAt: new Date(),
    };

    // Simulation de sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSave?.(updatedConfig);
    setIsSaving(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BrainIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t.schoolConfig.title}</CardTitle>
            <CardDescription>{t.schoolConfig.subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Valeurs école */}
        <div className="space-y-2">
          <Label htmlFor="schoolValues" className="text-sm font-medium">
            {t.schoolConfig.values.label}
          </Label>
          <Textarea
            id="schoolValues"
            placeholder={t.schoolConfig.values.placeholder}
            value={formData.schoolValues}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, schoolValues: e.target.value }))
            }
            className="min-h-[80px] resize-none"
            maxLength={500}
          />

          <p className="text-xs text-muted-foreground">
            {t.schoolConfig.values.help} ({formData.schoolValues.length}/500)
          </p>
        </div>

        {/* Ton souhaité */}
        <div className="space-y-2">
          <Label htmlFor="desiredTone" className="text-sm font-medium">
            {t.schoolConfig.tone.label}
          </Label>
          <Textarea
            id="desiredTone"
            placeholder={t.schoolConfig.tone.placeholder}
            value={formData.desiredTone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, desiredTone: e.target.value }))
            }
            className="min-h-[60px] resize-none"
            maxLength={300}
          />

          <p className="text-xs text-muted-foreground">
            {t.schoolConfig.tone.help} ({formData.desiredTone.length}/300)
          </p>
        </div>

        <Separator />

        {/* Mots-clés à inclure */}
        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-sm font-medium">
            {t.schoolConfig.keywords.label}
          </Label>
          <Input
            id="keywords"
            placeholder={t.schoolConfig.keywords.placeholder}
            value={keywordsInput}
            onChange={(e) => setKeywordsInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {keywordsInput.split(",").map((keyword, index) => {
              const trimmed = keyword.trim();
              return trimmed ? (
                <Badge key={index} variant="secondary" className="text-xs">
                  {trimmed}
                </Badge>
              ) : null;
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {t.schoolConfig.keywords.help}
          </p>
        </div>

        {/* Phrases à éviter */}
        <div className="space-y-2">
          <Label htmlFor="phrasesToAvoid" className="text-sm font-medium">
            {t.schoolConfig.avoid.label}
          </Label>
          <Input
            id="phrasesToAvoid"
            placeholder={t.schoolConfig.avoid.placeholder}
            value={phrasesInput}
            onChange={(e) => setPhrasesInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {phrasesInput.split(",").map((phrase, index) => {
              const trimmed = phrase.trim();
              return trimmed ? (
                <Badge key={index} variant="destructive" className="text-xs">
                  {trimmed}
                </Badge>
              ) : null;
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {t.schoolConfig.avoid.help}
          </p>
        </div>

        <Separator />

        {/* Configuration technique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Langue principale */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t.schoolConfig.language.label}
            </Label>
            <Select
              value={formData.primaryLanguage}
              onValueChange={(value: "fr" | "de" | "it" | "en") =>
                setFormData((prev) => ({ ...prev, primaryLanguage: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">
                  🇫🇷 {t.schoolConfig.language.options.fr}
                </SelectItem>
                <SelectItem value="de">
                  🇩🇪 {t.schoolConfig.language.options.de}
                </SelectItem>
                <SelectItem value="it">
                  🇮🇹 {t.schoolConfig.language.options.it}
                </SelectItem>
                <SelectItem value="en">
                  🇬🇧 {t.schoolConfig.language.options.en}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Claude IA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                {t.schoolConfig.claudeAI.label}
              </Label>
              <Switch
                checked={formData.useClaudeAI}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, useClaudeAI: checked }))
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {t.schoolConfig.claudeAI.description}
            </p>
          </div>
        </div>

        {/* Statut API Key */}
        <Alert
          className={`${
            formData.apiKeyConfigured
              ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
              : "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950"
          }`}
        >
          <div className="flex items-center gap-2">
            <KeyIcon className="h-4 w-4" />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {t.schoolConfig.apiKey.label}
                </span>
                {formData.apiKeyConfigured ? (
                  <Badge variant="default" className="bg-green-600">
                    <CheckIcon className="h-3 w-3 mr-1" />

                    {t.schoolConfig.apiKey.configured}
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XIcon className="h-3 w-3 mr-1" />

                    {t.schoolConfig.apiKey.notConfigured}
                  </Badge>
                )}
              </div>
              <AlertDescription className="text-xs mt-1">
                {formData.apiKeyConfigured
                  ? "Clé API sécurisée dans Supabase Vault. Connexion cryptée et conforme GDPR."
                  : "Configurez votre clé API Claude pour activer les réponses IA avancées."}
              </AlertDescription>
            </div>
          </div>
        </Alert>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-[140px]"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sauvegarde...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SaveIcon className="h-4 w-4" />

                {t.schoolConfig.save}
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
