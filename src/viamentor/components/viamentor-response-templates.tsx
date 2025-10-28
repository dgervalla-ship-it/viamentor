/**
 * VIAMENTOR - Response Templates
 * Composant gestion templates réponses IA avec CRUD complet
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  EditIcon,
  CopyIcon,
  TestTubeIcon,
  TrashIcon,
  MoreHorizontalIcon,
  InfoIcon,
  StarIcon,
  TagIcon,
} from "lucide-react";
import { aiResponsesTranslations } from "@/viamentor/data/viamentor-ai-responses-i18n";
import type { AIResponsesLocale } from "@/viamentor/data/viamentor-ai-responses-i18n";
import type {
  ResponseTemplate,
  TemplateTrigger,
} from "@/viamentor/data/viamentor-ai-responses-data";

// ============================================================================
// TYPES
// ============================================================================

interface ResponseTemplatesProps {
  templates: ResponseTemplate[];
  locale?: AIResponsesLocale;
  onSave?: (template: ResponseTemplate) => void;
  onDelete?: (templateId: string) => void;
  onTest?: (template: ResponseTemplate) => void;
}

interface TemplateFormData {
  name: string;
  trigger: TemplateTrigger;
  baseTemplate: string;
  targetLength: "short" | "medium" | "long";
  isActive: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ResponseTemplates({
  templates,
  locale = "fr",
  onSave,
  onDelete,
  onTest,
}: ResponseTemplatesProps) {
  const t = aiResponsesTranslations[locale];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] =
    useState<ResponseTemplate | null>(null);
  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    trigger: {
      ratingRange: { min: 5, max: 5 },
      sentiment: "positive",
    },
    baseTemplate: "",
    targetLength: "medium",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      trigger: {
        ratingRange: { min: 5, max: 5 },
        sentiment: "positive",
      },
      baseTemplate: "",
      targetLength: "medium",
      isActive: true,
    });
    setEditingTemplate(null);
  };

  const handleEdit = (template: ResponseTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      trigger: template.trigger,
      baseTemplate: template.baseTemplate,
      targetLength: template.targetLength,
      isActive: template.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const template: ResponseTemplate = {
      id: editingTemplate?.id || `template-${Date.now()}`,
      name: formData.name,
      trigger: formData.trigger,
      baseTemplate: formData.baseTemplate,
      targetLength: formData.targetLength,
      isActive: formData.isActive,
      createdAt: editingTemplate?.createdAt || new Date(),
      updatedAt: new Date(),
      usageCount: editingTemplate?.usageCount || 0,
    };

    onSave?.(template);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDuplicate = (template: ResponseTemplate) => {
    const duplicated: ResponseTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copie)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
    };
    onSave?.(duplicated);
  };

  const getTriggerDisplay = (trigger: TemplateTrigger) => {
    const parts: string[] = [];

    if (trigger.ratingRange.min === trigger.ratingRange.max) {
      parts.push(`${trigger.ratingRange.min} ⭐`);
    } else {
      parts.push(`${trigger.ratingRange.min}-${trigger.ratingRange.max} ⭐`);
    }

    if (trigger.keywords && trigger.keywords.length > 0) {
      parts.push(`Mots-clés: ${trigger.keywords.join(", ")}`);
    }

    return parts.join(" • ");
  };

  const getLengthBadge = (length: "short" | "medium" | "long") => {
    const variants = {
      short: "secondary",
      medium: "default",
      long: "outline",
    } as const;

    return (
      <Badge variant={variants[length]} className="text-xs">
        {t.templates.lengths[length]}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TagIcon className="h-5 w-5" />

              {t.templates.title}
            </CardTitle>
            <CardDescription>{t.templates.subtitle}</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.templates.addNew}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? "Modifier template" : "Nouveau template"}
                </DialogTitle>
                <DialogDescription>
                  Configurez un template de réponse adaptatif selon le contexte
                  des avis.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Nom du template */}
                <div className="space-y-2">
                  <Label htmlFor="templateName">{t.templates.table.name}</Label>
                  <Input
                    id="templateName"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Ex: Avis 5 étoiles - Remerciement"
                  />
                </div>

                {/* Configuration déclencheur */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    Conditions de déclenchement
                  </Label>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Note minimum</Label>
                      <Select
                        value={formData.trigger.ratingRange.min.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              ratingRange: {
                                ...prev.trigger.ratingRange,
                                min: parseInt(value),
                              },
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              {rating} ⭐
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Note maximum</Label>
                      <Select
                        value={formData.trigger.ratingRange.max.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              ratingRange: {
                                ...prev.trigger.ratingRange,
                                max: parseInt(value),
                              },
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              {rating} ⭐
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">
                      Mots-clés déclencheurs (optionnel)
                    </Label>
                    <Input
                      placeholder="excellent moniteur, prix élevé, réussite examen"
                      value={formData.trigger.keywords?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          trigger: {
                            ...prev.trigger,
                            keywords: e.target.value
                              ? e.target.value.split(",").map((k) => k.trim())
                              : undefined,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Template de base */}
                <div className="space-y-2">
                  <Label htmlFor="baseTemplate">
                    {t.templates.table.template}
                  </Label>
                  <Textarea
                    id="baseTemplate"
                    value={formData.baseTemplate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        baseTemplate: e.target.value,
                      }))
                    }
                    placeholder="Merci {studentName} pour votre confiance ! Nous sommes ravis que votre expérience avec {schoolName} ait été excellente..."
                    className="min-h-[120px]"
                  />

                  {/* Variables disponibles */}
                  <Alert className="mt-3">
                    <InfoIcon className="h-4 w-4" />

                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium text-sm">
                          {t.templates.variables.title}:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {"{studentName}"}
                          </code>
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {"{schoolName}"}
                          </code>
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {"{rating}"}
                          </code>
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {"{reviewText}"}
                          </code>
                          <code className="px-2 py-1 bg-muted rounded text-xs">
                            {"{specificPoint}"}
                          </code>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Configuration longueur et statut */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.templates.table.length}</Label>
                    <Select
                      value={formData.targetLength}
                      onValueChange={(value: "short" | "medium" | "long") =>
                        setFormData((prev) => ({
                          ...prev,
                          targetLength: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          {t.templates.lengths.short}
                        </SelectItem>
                        <SelectItem value="medium">
                          {t.templates.lengths.medium}
                        </SelectItem>
                        <SelectItem value="long">
                          {t.templates.lengths.long}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.templates.table.active}</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: checked,
                          }))
                        }
                      />

                      <span className="text-sm text-muted-foreground">
                        {formData.isActive ? "Activé" : "Désactivé"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!formData.name || !formData.baseTemplate}
                  >
                    {editingTemplate ? "Modifier" : "Créer"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table des templates */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.templates.table.name}</TableHead>
                <TableHead>{t.templates.table.trigger}</TableHead>
                <TableHead>{t.templates.table.length}</TableHead>
                <TableHead>{t.templates.table.active}</TableHead>
                <TableHead>{t.templates.table.usage}</TableHead>
                <TableHead className="w-[100px]">
                  {t.templates.table.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {template.baseTemplate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getTriggerDisplay(template.trigger)}
                    </div>
                  </TableCell>
                  <TableCell>{getLengthBadge(template.targetLength)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={template.isActive ? "default" : "secondary"}
                    >
                      {template.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {template.usageCount} fois
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(template)}>
                          <EditIcon className="h-4 w-4 mr-2" />

                          {t.templates.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicate(template)}
                        >
                          <CopyIcon className="h-4 w-4 mr-2" />

                          {t.templates.actions.duplicate}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onTest?.(template)}>
                          <TestTubeIcon className="h-4 w-4 mr-2" />

                          {t.templates.actions.test}
                        </DropdownMenuItem>
                        <Separator />

                        <DropdownMenuItem
                          onClick={() => onDelete?.(template.id)}
                          className="text-destructive"
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />

                          {t.templates.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {templates.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TagIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />

            <p>Aucun template configuré</p>
            <p className="text-sm">
              Créez votre premier template pour automatiser les réponses aux
              avis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
