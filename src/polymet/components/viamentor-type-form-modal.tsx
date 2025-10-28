/**
 * VIAMENTOR - Type Form Modal
 * Dialog modal création/édition type de cours avec tabs et validation
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircleIcon, PlusIcon, XIcon, InfoIcon } from "lucide-react";
import {
  CourseType,
  CourseTypeFormData,
  CourseTypeLocale,
  courseTypesI18n,
  DayOfWeek,
  CourseSession,
} from "@/polymet/data/viamentor-courses-types-data";

// ============================================================================
// TYPES
// ============================================================================

interface TypeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: CourseType | null;
  categoryName: string;
  categoryPrice: number;
  locale?: CourseTypeLocale;
  onSubmit: (data: CourseTypeFormData) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TypeFormModal({
  open,
  onOpenChange,
  type,
  categoryName,
  categoryPrice,
  locale = "fr",
  onSubmit,
}: TypeFormModalProps) {
  const t = courseTypesI18n[locale];

  // Form state
  const [formData, setFormData] = useState<CourseTypeFormData>(() => ({
    name: type?.name || "",
    description: type?.description || "",
    sessions: type?.sessions.map((s) => ({
      name: s.name,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      duration: s.duration,
      content: s.content,
      order: s.order,
    })) || [
      {
        name: "",
        dayOfWeek: "monday" as DayOfWeek,
        startTime: "18:30",
        duration: 2,
        order: 1,
      },
    ],

    price: type?.price,
    minParticipants: type?.minParticipants || 8,
    maxParticipants: type?.maxParticipants || 24,
    waitingListEnabled: type?.waitingListEnabled ?? true,
    defaultLocation: type?.defaultLocation,
    authorizedInstructors: type?.authorizedInstructors || [],
    visibleOnWebsite: type?.visibleOnWebsite ?? true,
    active: type?.active ?? true,
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useCustomPrice, setUseCustomPrice] = useState(!!type?.price);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired;
    }

    if (formData.sessions.length === 0) {
      newErrors.sessions = t.sessionsRequired;
    }

    formData.sessions.forEach((session, index) => {
      if (!session.name.trim()) {
        newErrors[`session-${index}-name`] = t.sessionNameRequired;
      }
      if (!session.dayOfWeek) {
        newErrors[`session-${index}-day`] = t.sessionDayRequired;
      }
      if (!session.startTime) {
        newErrors[`session-${index}-time`] = t.sessionTimeRequired;
      }
      if (!session.duration || session.duration <= 0) {
        newErrors[`session-${index}-duration`] = t.sessionDurationRequired;
      }
    });

    if (formData.minParticipants >= formData.maxParticipants) {
      newErrors.participants = t.participantsInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...formData,
        price: useCustomPrice ? formData.price : undefined,
      });
      onOpenChange(false);
    }
  };

  const addSession = () => {
    setFormData((prev) => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          name: "",
          dayOfWeek: "monday" as DayOfWeek,
          startTime: "18:30",
          duration: 2,
          order: prev.sessions.length + 1,
        },
      ],
    }));
  };

  const removeSession = (index: number) => {
    if (formData.sessions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        sessions: prev.sessions.filter((_, i) => i !== index),
      }));
    }
  };

  const updateSession = (
    index: number,
    field: keyof Omit<CourseSession, "id">,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      sessions: prev.sessions.map((session, i) =>
        i === index ? { ...session, [field]: value } : session
      ),
    }));
  };

  const daysOfWeek: DayOfWeek[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type ? t.editType : t.newType} - {categoryName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="information" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">{t.tabInformation}</TabsTrigger>
            <TabsTrigger value="sessions">{t.tabSessions}</TabsTrigger>
            <TabsTrigger value="settings">{t.tabSettings}</TabsTrigger>
          </TabsList>

          {/* Tab 1: Information */}
          <TabsContent value="information" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.typeName} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={t.typeNamePlaceholder}
              />

              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />

                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder={t.descriptionPlaceholder}
                rows={3}
                maxLength={300}
              />

              <p className="text-xs text-muted-foreground text-right">
                {formData.description?.length || 0}/300
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="price">{t.priceLabel}</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={useCustomPrice}
                    onCheckedChange={setUseCustomPrice}
                  />

                  <span className="text-sm text-muted-foreground">
                    {useCustomPrice ? "Prix personnalisé" : t.priceInherit}
                  </span>
                </div>
              </div>
              {useCustomPrice ? (
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || undefined,
                    }))
                  }
                  placeholder={t.pricePlaceholder}
                  min="0"
                  step="0.01"
                />
              ) : (
                <div className="p-3 bg-muted rounded-md text-sm">
                  {categoryPrice} CHF ({t.priceInherit})
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <Label htmlFor="active" className="cursor-pointer">
                {t.activeLabel}
              </Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, active: checked }))
                }
              />
            </div>
          </TabsContent>

          {/* Tab 2: Sessions */}
          <TabsContent value="sessions" className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">{t.sessionsTitle}</h4>
              <Alert>
                <InfoIcon className="h-4 w-4" />

                <AlertDescription>{t.sessionsAlert}</AlertDescription>
              </Alert>
            </div>

            {errors.sessions && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />

                <AlertDescription>{errors.sessions}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              {formData.sessions.map((session, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium">
                      Séance {index + 1}
                    </span>
                    {formData.sessions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSession(index)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 space-y-2">
                      <Label>{t.sessionName} *</Label>
                      <Input
                        value={session.name}
                        onChange={(e) =>
                          updateSession(index, "name", e.target.value)
                        }
                        placeholder={t.sessionNamePlaceholder}
                      />

                      {errors[`session-${index}-name`] && (
                        <p className="text-xs text-destructive">
                          {errors[`session-${index}-name`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>{t.sessionDay} *</Label>
                      <Select
                        value={session.dayOfWeek}
                        onValueChange={(value) =>
                          updateSession(index, "dayOfWeek", value as DayOfWeek)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>
                              {t[day]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t.sessionTime} *</Label>
                      <Input
                        type="time"
                        value={session.startTime}
                        onChange={(e) =>
                          updateSession(index, "startTime", e.target.value)
                        }
                        step="900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.sessionDuration} *</Label>
                      <Input
                        type="number"
                        value={session.duration}
                        onChange={(e) =>
                          updateSession(
                            index,
                            "duration",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min="0.25"
                        step="0.25"
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label>{t.sessionContent}</Label>
                      <Textarea
                        value={session.content || ""}
                        onChange={(e) =>
                          updateSession(index, "content", e.target.value)
                        }
                        placeholder={t.sessionContentPlaceholder}
                        rows={2}
                        maxLength={200}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" onClick={addSession} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />

              {t.addSession}
            </Button>
          </TabsContent>

          {/* Tab 3: Settings */}
          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.minParticipants}</Label>
                <Input
                  type="number"
                  value={formData.minParticipants}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      minParticipants: parseInt(e.target.value) || 0,
                    }))
                  }
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label>{t.maxParticipants}</Label>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxParticipants: parseInt(e.target.value) || 0,
                    }))
                  }
                  min="1"
                />
              </div>
            </div>

            {errors.participants && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />

                <AlertDescription>{errors.participants}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div>
                <Label className="cursor-pointer">{t.waitingList}</Label>
                <p className="text-xs text-muted-foreground">
                  {t.waitingListHelp}
                </p>
              </div>
              <Switch
                checked={formData.waitingListEnabled}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    waitingListEnabled: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <Label className="cursor-pointer">{t.visibleWebsite}</Label>
              <Switch
                checked={formData.visibleOnWebsite}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    visibleOnWebsite: checked,
                  }))
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button onClick={handleSubmit}>{t.save}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
