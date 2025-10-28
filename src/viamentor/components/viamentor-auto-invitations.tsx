/**
 * VIAMENTOR - Auto Invitations Component
 * Invitations automatiques après leçon avec workflow et template email
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SendIcon } from "lucide-react";
import type { AutoInvitationConfig } from "@/viamentor/data/viamentor-reviews-data";
import {
  reviewsTranslations,
  type ReviewsLocale,
} from "@/viamentor/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AutoInvitationsProps {
  config: AutoInvitationConfig;
  locale?: ReviewsLocale;
  onSave?: (config: AutoInvitationConfig) => void;
  onTest?: (email: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AutoInvitations({
  config: initialConfig,
  locale = "fr",
  onSave,
  onTest,
}: AutoInvitationsProps) {
  const t = reviewsTranslations[locale];
  const [config, setConfig] = useState(initialConfig);
  const [testEmail, setTestEmail] = useState("");

  const handleSave = () => {
    onSave?.(config);
  };

  const handleTest = () => {
    if (testEmail) {
      onTest?.(testEmail);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Workflow */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.invitations.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toggle Enabled */}
          <div className="flex items-center justify-between">
            <Label
              htmlFor="invitationsEnabled"
              className="text-sm font-medium text-foreground"
            >
              {t.invitations.enabled}
            </Label>
            <Switch
              id="invitationsEnabled"
              checked={config.enabled}
              onCheckedChange={(checked) =>
                setConfig({ ...config, enabled: checked })
              }
            />
          </div>

          {config.enabled && (
            <>
              {/* Delay */}
              <div className="space-y-2">
                <Label
                  htmlFor="delay"
                  className="text-sm font-medium text-foreground"
                >
                  {t.invitations.delay}
                </Label>
                <Select
                  value={config.delay}
                  onValueChange={(value: any) =>
                    setConfig({ ...config, delay: value })
                  }
                >
                  <SelectTrigger className="bg-background border-input text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">
                      {t.invitations.delays.immediate}
                    </SelectItem>
                    <SelectItem value="1day">
                      {t.invitations.delays["1day"]}
                    </SelectItem>
                    <SelectItem value="3days">
                      {t.invitations.delays["3days"]}
                    </SelectItem>
                    <SelectItem value="1week">
                      {t.invitations.delays["1week"]}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditions */}
              <div className="space-y-3 pt-2">
                <Label className="text-sm font-medium text-foreground">
                  {t.invitations.conditions}
                </Label>

                <div className="space-y-3">
                  {/* After Lessons */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="afterLessons"
                      checked={!!config.conditions.afterLessons}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          conditions: {
                            ...config.conditions,
                            afterLessons: checked ? 5 : undefined,
                          },
                        })
                      }
                    />

                    <Label
                      htmlFor="afterLessons"
                      className="text-sm text-foreground flex-1"
                    >
                      {t.invitations.afterLessons}
                    </Label>
                    {config.conditions.afterLessons && (
                      <Input
                        type="number"
                        value={config.conditions.afterLessons}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            conditions: {
                              ...config.conditions,
                              afterLessons: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-20 bg-background border-input text-foreground"
                      />
                    )}
                  </div>

                  {/* After Payment */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="afterPayment"
                      checked={config.conditions.afterPayment}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          conditions: {
                            ...config.conditions,
                            afterPayment: !!checked,
                          },
                        })
                      }
                    />

                    <Label
                      htmlFor="afterPayment"
                      className="text-sm text-foreground"
                    >
                      {t.invitations.afterPayment}
                    </Label>
                  </div>

                  {/* After Exam Success */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="afterExamSuccess"
                      checked={config.conditions.afterExamSuccess}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          conditions: {
                            ...config.conditions,
                            afterExamSuccess: !!checked,
                          },
                        })
                      }
                    />

                    <Label
                      htmlFor="afterExamSuccess"
                      className="text-sm text-foreground"
                    >
                      {t.invitations.afterExamSuccess}
                    </Label>
                  </div>

                  {/* After Rating */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="afterRating"
                      checked={!!config.conditions.afterRatingAbove}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          conditions: {
                            ...config.conditions,
                            afterRatingAbove: checked ? 4 : undefined,
                          },
                        })
                      }
                    />

                    <Label
                      htmlFor="afterRating"
                      className="text-sm text-foreground flex-1"
                    >
                      {t.invitations.afterRating}
                    </Label>
                    {config.conditions.afterRatingAbove && (
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={config.conditions.afterRatingAbove}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            conditions: {
                              ...config.conditions,
                              afterRatingAbove: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-20 bg-background border-input text-foreground"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Reminder */}
              <div className="flex items-center justify-between pt-2">
                <Label
                  htmlFor="reminderEnabled"
                  className="text-sm font-medium text-foreground"
                >
                  {t.invitations.reminder}
                </Label>
                <Switch
                  id="reminderEnabled"
                  checked={config.reminderEnabled}
                  onCheckedChange={(checked) =>
                    setConfig({ ...config, reminderEnabled: checked })
                  }
                />
              </div>

              {config.reminderEnabled && (
                <div className="space-y-2">
                  <Label
                    htmlFor="reminderDelay"
                    className="text-sm font-medium text-foreground"
                  >
                    {t.invitations.reminderDelay}
                  </Label>
                  <Input
                    id="reminderDelay"
                    type="number"
                    value={config.reminderDelayDays}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        reminderDelayDays: parseInt(e.target.value),
                      })
                    }
                    className="bg-background border-input text-foreground"
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Email Template */}
      {config.enabled && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              {t.invitations.template.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t.invitations.template.variables}:{" "}
              {config.emailTemplate.variables.join(", ")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Subject */}
            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                {t.invitations.template.subject}
              </Label>
              <Input
                id="subject"
                value={config.emailTemplate.subject}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    emailTemplate: {
                      ...config.emailTemplate,
                      subject: e.target.value,
                    },
                  })
                }
                className="bg-background border-input text-foreground"
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label
                htmlFor="body"
                className="text-sm font-medium text-foreground"
              >
                {t.invitations.template.body}
              </Label>
              <Textarea
                id="body"
                value={config.emailTemplate.body}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    emailTemplate: {
                      ...config.emailTemplate,
                      body: e.target.value,
                    },
                  })
                }
                rows={8}
                className="bg-background border-input text-foreground"
              />
            </div>

            {/* Test Email */}
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="bg-background border-input text-foreground"
              />

              <Button onClick={handleTest} variant="outline">
                <SendIcon className="h-4 w-4 mr-2" />

                {t.invitations.template.test}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={
            () =>
              console.warn(
                "Prevented function call: `window.history.back()`"
              ) /*TODO: Do not use window.history for navigation. Use react-router instead.*/
          }
        >
          {t.actions.cancel}
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground"
        >
          {t.actions.save}
        </Button>
      </div>
    </div>
  );
}
