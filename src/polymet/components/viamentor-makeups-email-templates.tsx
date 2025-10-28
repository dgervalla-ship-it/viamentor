/**
 * VIAMENTOR - Makeups Email Templates Editor
 * Éditeur templates emails rattrapages
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MailIcon,
  SendIcon,
  RotateCcwIcon,
  EyeIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { MakeupsLocale } from "@/polymet/data/viamentor-makeups-i18n";
import { makeupsTranslations } from "@/polymet/data/viamentor-makeups-i18n";
import type { MakeupEmailTemplate } from "@/polymet/data/viamentor-makeups-data";
import { TEMPLATE_VARIABLES } from "@/polymet/data/viamentor-makeups-data";

/**
 * Props
 */
interface MakeupsEmailTemplatesProps {
  templates: MakeupEmailTemplate[];
  locale?: MakeupsLocale;
  onSave?: (template: MakeupEmailTemplate) => Promise<void>;
  onRestore?: (templateId: string) => Promise<void>;
  onTest?: (templateId: string, email: string) => Promise<void>;
}

/**
 * Composant principal
 */
export function MakeupsEmailTemplates({
  templates,
  locale = "fr",
  onSave,
  onRestore,
  onTest,
}: MakeupsEmailTemplatesProps) {
  const t = makeupsTranslations[locale];
  const [editingTemplates, setEditingTemplates] = useState<
    Record<string, Partial<MakeupEmailTemplate>>
  >({});
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testingTemplateId, setTestingTemplateId] = useState<string | null>(
    null
  );
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);

  /**
   * Update template field
   */
  const updateTemplate = (
    templateId: string,
    field: keyof MakeupEmailTemplate,
    value: any
  ) => {
    setEditingTemplates((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [field]: value,
      },
    }));
  };

  /**
   * Get template data (edited or original)
   */
  const getTemplateData = (template: MakeupEmailTemplate) => {
    return {
      ...template,
      ...editingTemplates[template.id],
    };
  };

  /**
   * Save template
   */
  const handleSave = async (template: MakeupEmailTemplate) => {
    try {
      const updatedTemplate = getTemplateData(template);
      await onSave?.(updatedTemplate as MakeupEmailTemplate);
      toast.success("Template sauvegardé");
      setEditingTemplates((prev) => {
        const { [template.id]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  /**
   * Restore default
   */
  const handleRestore = async (templateId: string) => {
    try {
      await onRestore?.(templateId);
      toast.success("Template restauré");
      setEditingTemplates((prev) => {
        const { [templateId]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      toast.error("Erreur lors de la restauration");
    }
  };

  /**
   * Test email
   */
  const handleTest = async () => {
    if (!testingTemplateId || !testEmail) return;

    try {
      await onTest?.(testingTemplateId, testEmail);
      toast.success(t.templates.actions.testDialog.success);
      setTestDialogOpen(false);
      setTestEmail("");
      setTestingTemplateId(null);
    } catch (error) {
      toast.error(t.templates.actions.testDialog.error);
    }
  };

  /**
   * Copy variable to clipboard
   */
  const copyVariable = (variable: string) => {
    navigator.clipboard.writeText(`{${variable}}`);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  /**
   * Get template type label
   */
  const getTypeLabel = (type: MakeupEmailTemplate["type"]) => {
    return t.templates.types[type];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailIcon className="h-5 w-5" />

            {t.templates.title}
          </CardTitle>
          <CardDescription>{t.templates.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {templates.map((template) => {
              const data = getTemplateData(template);
              const hasChanges = !!editingTemplates[template.id];

              return (
                <AccordionItem key={template.id} value={template.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {getTypeLabel(template.type)}
                        </span>
                        {hasChanges && (
                          <Badge variant="secondary">Modifié</Badge>
                        )}
                        {!data.active && (
                          <Badge variant="outline">Inactif</Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {/* Active toggle */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`active-${template.id}`}>
                          {t.templates.fields.active}
                        </Label>
                        <Switch
                          id={`active-${template.id}`}
                          checked={data.active}
                          onCheckedChange={(checked) =>
                            updateTemplate(template.id, "active", checked)
                          }
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor={`subject-${template.id}`}>
                          {t.templates.fields.subject}
                        </Label>
                        <Input
                          id={`subject-${template.id}`}
                          value={data.subject}
                          onChange={(e) =>
                            updateTemplate(
                              template.id,
                              "subject",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Body */}
                      <div className="space-y-2">
                        <Label htmlFor={`body-${template.id}`}>
                          {t.templates.fields.body}
                        </Label>
                        <Textarea
                          id={`body-${template.id}`}
                          value={data.body}
                          onChange={(e) =>
                            updateTemplate(template.id, "body", e.target.value)
                          }
                          rows={10}
                          className="font-mono text-sm"
                        />
                      </div>

                      {/* Variables */}
                      <div className="space-y-2">
                        <Label>{t.templates.fields.variables}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(TEMPLATE_VARIABLES).map(
                            ([key, label]) => (
                              <Button
                                key={key}
                                variant="outline"
                                size="sm"
                                className="justify-between"
                                onClick={() => copyVariable(key)}
                              >
                                <span className="text-xs">{`{${key}}`}</span>
                                {copiedVariable === key ? (
                                  <CheckIcon className="h-3 w-3 text-green-500" />
                                ) : (
                                  <CopyIcon className="h-3 w-3" />
                                )}
                              </Button>
                            )
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Cliquez pour copier une variable
                        </p>
                      </div>

                      {/* Preview */}
                      <div className="space-y-2">
                        <Label>{t.templates.fields.preview}</Label>
                        <div className="rounded-lg border border-border p-4 bg-muted/50">
                          <div className="space-y-2">
                            <p className="text-sm font-semibold">
                              {data.subject}
                            </p>
                            <div
                              className="text-sm prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: data.body
                                  .replace(/{studentName}/g, "Sophie Martin")
                                  .replace(/{lessonDate}/g, "15 janvier 2025")
                                  .replace(
                                    /{reason}/g,
                                    "maladie avec certificat"
                                  )
                                  .replace(/{expiryDate}/g, "14 février 2025")
                                  .replace(/{daysRemaining}/g, "7")
                                  .replace(
                                    /{bookingLink}/g,
                                    "https://app.viamentor.ch/book"
                                  )
                                  .replace(/{schoolName}/g, "Auto-École Genève")
                                  .replace(/{schoolPhone}/g, "+41 22 123 45 67")
                                  .replace(
                                    /{schoolEmail}/g,
                                    "contact@autoecole.ch"
                                  ),
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSave(template)}
                          disabled={!hasChanges}
                        >
                          <CheckIcon className="mr-2 h-4 w-4" />
                          Enregistrer
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRestore(template.id)}
                          disabled={template.isDefault}
                        >
                          <RotateCcwIcon className="mr-2 h-4 w-4" />

                          {t.templates.actions.restore}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setTestingTemplateId(template.id);
                            setTestDialogOpen(true);
                          }}
                        >
                          <SendIcon className="mr-2 h-4 w-4" />

                          {t.templates.actions.test}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Test Dialog */}
      <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.templates.actions.testDialog.title}</DialogTitle>
            <DialogDescription>
              Entrez une adresse email pour recevoir un email de test
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">
                {t.templates.actions.testDialog.email}
              </Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleTest} disabled={!testEmail}>
              <SendIcon className="mr-2 h-4 w-4" />

              {t.templates.actions.testDialog.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
