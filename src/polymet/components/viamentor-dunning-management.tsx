/**
 * VIAMENTOR Dunning Management
 *
 * Gestion des relances automatiques:
 * - Config workflow: J+3, J+7, J+14, J+30
 * - Email templates avec tons (soft/strong/final)
 * - Actions: suspend trial, cancel subscription, archive data
 * - Enable/disable par step
 */

import { useState } from "react";
import {
  DunningConfig,
  DunningStep,
  EmailTemplate,
} from "@/polymet/data/viamentor-invoices-data";
import {
  useInvoiceTranslations,
  InvoiceLocale,
} from "@/polymet/data/viamentor-invoices-i18n";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ClockIcon,
  MailIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";

interface DunningManagementProps {
  config: DunningConfig;
  templates: EmailTemplate[];
  locale?: InvoiceLocale;
  onSave?: (config: DunningConfig) => void;
  onEditTemplate?: (templateId: string) => void;
}

export function DunningManagement({
  config: initialConfig,
  templates,
  locale = "fr",
  onSave,
  onEditTemplate,
}: DunningManagementProps) {
  const t = useInvoiceTranslations(locale);
  const [config, setConfig] = useState(initialConfig);

  const handleToggleEnabled = (enabled: boolean) => {
    setConfig({ ...config, enabled });
  };

  const handleStepChange = (stepId: string, updates: Partial<DunningStep>) => {
    setConfig({
      ...config,
      steps: config.steps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    });
  };

  const getToneBadge = (tone: "soft" | "strong" | "final") => {
    const variants = {
      soft: "secondary" as const,
      strong: "default" as const,
      final: "destructive" as const,
    };

    const labels = {
      soft: "Doux",
      strong: "Ferme",
      final: "Final",
    };

    return <Badge variant={variants[tone]}>{labels[tone]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.dunningManagement}</CardTitle>
              <CardDescription>
                Configuration des relances automatiques pour factures impayées
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="dunning-enabled" className="text-sm font-medium">
                {config.enabled ? t.enabled : t.disabled}
              </Label>
              <Switch
                id="dunning-enabled"
                checked={config.enabled}
                onCheckedChange={handleToggleEnabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!config.enabled && (
            <Alert>
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                Les relances automatiques sont désactivées. Aucun email ne sera
                envoyé automatiquement.
              </AlertDescription>
            </Alert>
          )}

          {/* Dunning Steps */}
          <div className="space-y-4">
            {config.steps.map((step, index) => {
              const template = templates.find((t) => t.id === step.templateId);

              return (
                <Card
                  key={step.id}
                  className={!step.enabled ? "opacity-60" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            Étape {index + 1} - J+{step.days}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {step.days} jours après échéance
                          </CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={step.enabled}
                        onCheckedChange={(enabled) =>
                          handleStepChange(step.id, { enabled })
                        }
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`days-${step.id}`}>
                          Jours de retard
                        </Label>
                        <Input
                          id={`days-${step.id}`}
                          type="number"
                          min="1"
                          value={step.days}
                          onChange={(e) =>
                            handleStepChange(step.id, {
                              days: parseInt(e.target.value),
                            })
                          }
                          disabled={!step.enabled}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`template-${step.id}`}>
                          Modèle d'email
                        </Label>
                        <div className="flex gap-2">
                          <Select
                            value={step.templateId}
                            onValueChange={(templateId) => {
                              const newTemplate = templates.find(
                                (t) => t.id === templateId
                              );
                              handleStepChange(step.id, {
                                templateId,
                                templateName: newTemplate?.name || "",
                              });
                            }}
                            disabled={!step.enabled}
                          >
                            <SelectTrigger id={`template-${step.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {templates.map((tpl) => (
                                <SelectItem key={tpl.id} value={tpl.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{tpl.name}</span>
                                    {getToneBadge(tpl.tone)}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditTemplate?.(step.templateId)}
                            disabled={!step.enabled}
                          >
                            <MailIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {template && (
                      <div className="p-3 bg-muted rounded-md space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium">
                            Aperçu du template
                          </p>
                          {getToneBadge(template.tone)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <strong>Sujet:</strong> {template.subject}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.body}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {Object.keys(step.actions).length > 0 && (
                      <>
                        <Separator />

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Actions automatiques
                          </Label>

                          {step.actions.suspendTrial !== undefined && (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`suspend-${step.id}`}
                                checked={step.actions.suspendTrial}
                                onCheckedChange={(checked) =>
                                  handleStepChange(step.id, {
                                    actions: {
                                      ...step.actions,
                                      suspendTrial: checked as boolean,
                                    },
                                  })
                                }
                                disabled={!step.enabled}
                              />

                              <label
                                htmlFor={`suspend-${step.id}`}
                                className="text-sm cursor-pointer"
                              >
                                Suspendre les tenants en période d'essai
                              </label>
                            </div>
                          )}

                          {step.actions.cancelSubscription !== undefined && (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`cancel-${step.id}`}
                                checked={step.actions.cancelSubscription}
                                onCheckedChange={(checked) =>
                                  handleStepChange(step.id, {
                                    actions: {
                                      ...step.actions,
                                      cancelSubscription: checked as boolean,
                                    },
                                  })
                                }
                                disabled={!step.enabled}
                              />

                              <label
                                htmlFor={`cancel-${step.id}`}
                                className="text-sm cursor-pointer text-destructive"
                              >
                                Annuler automatiquement l'abonnement
                              </label>
                            </div>
                          )}

                          {step.actions.archiveData !== undefined && (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`archive-${step.id}`}
                                checked={step.actions.archiveData}
                                onCheckedChange={(checked) =>
                                  handleStepChange(step.id, {
                                    actions: {
                                      ...step.actions,
                                      archiveData: checked as boolean,
                                    },
                                  })
                                }
                                disabled={!step.enabled}
                              />

                              <label
                                htmlFor={`archive-${step.id}`}
                                className="text-sm cursor-pointer text-destructive"
                              >
                                Archiver les données du tenant
                              </label>
                            </div>
                          )}

                          {(step.actions.cancelSubscription ||
                            step.actions.archiveData) && (
                            <Alert variant="destructive" className="mt-2">
                              <AlertTriangleIcon className="h-4 w-4" />

                              <AlertDescription className="text-xs">
                                <strong>Attention:</strong> Ces actions sont
                                irréversibles et peuvent avoir un impact
                                important sur les tenants.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Les modifications seront appliquées aux nouvelles factures
              impayées
            </p>
            <Button onClick={() => onSave?.(config)}>
              <CheckCircle2Icon className="h-4 w-4 mr-2" />
              Enregistrer la configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles d'emails ({templates.length})</CardTitle>
          <CardDescription>
            Gérez les templates utilisés pour les relances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-start gap-4 p-4 bg-muted rounded-lg"
              >
                <MailIcon className="h-5 w-5 text-muted-foreground mt-1" />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{template.name}</p>
                    {getToneBadge(template.tone)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Sujet:</strong> {template.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.body}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditTemplate?.(template.id)}
                >
                  Modifier
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
