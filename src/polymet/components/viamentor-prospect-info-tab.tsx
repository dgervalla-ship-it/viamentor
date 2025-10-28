/**
 * VIAMENTOR - Prospect Info Tab
 * Tab Informations avec form éditable inline, score lead et facteurs
 */

"use client";

import * as React from "react";
import { RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Prospect,
  type TeamMember,
  type ProspectStatus,
  type ProspectSource,
  type LicenseCategory,
  getCategoryLabel,
  getLeadScoreColor,
} from "@/polymet/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectInfoTabProps {
  prospect: Prospect;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
  onUpdate?: (prospect: Prospect) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectInfoTab({
  prospect,
  teamMembers,
  locale = "fr",
  onUpdate,
}: ProspectInfoTabProps) {
  const t = getProspectsTranslations(locale);
  const [formData, setFormData] = React.useState(prospect);
  const [isEditing, setIsEditing] = React.useState(false);

  const scoreColor = getLeadScoreColor(formData.leadScore);

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
  };

  const handleRecalculateScore = () => {
    // Simulate score recalculation
    let newScore = 0;
    if (formData.category === "B") newScore += 20;
    if (formData.phone) newScore += 10;
    if (formData.source === "referral") newScore += 25;
    if (formData.status === "appointment") newScore += 30;
    if (formData.status === "hot") newScore += 40;

    setFormData({ ...formData, leadScore: Math.min(newScore, 100) });
  };

  const assignedMember = formData.assignedTo
    ? teamMembers.find((m) => m.id === formData.assignedTo)
    : null;

  return (
    <div className="space-y-6">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.detail.info.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.detail.info.firstName}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t.detail.info.lastName}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <Label htmlFor="email">{t.detail.info.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.detail.info.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              placeholder="+41 XX XXX XX XX"
            />
          </div>

          {/* Category & Source */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{t.detail.info.category}</Label>
              <Select
                value={formData.category}
                onValueChange={(value: LicenseCategory) =>
                  setFormData({ ...formData, category: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B">Permis B</SelectItem>
                  <SelectItem value="A">Permis A</SelectItem>
                  <SelectItem value="BE">Permis BE</SelectItem>
                  <SelectItem value="A1">Permis A1</SelectItem>
                  <SelectItem value="BPT">Permis BPT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">{t.detail.info.source}</Label>
              <Select
                value={formData.source}
                onValueChange={(value: ProspectSource) =>
                  setFormData({ ...formData, source: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger id="source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">{t.sources.google}</SelectItem>
                  <SelectItem value="facebook">{t.sources.facebook}</SelectItem>
                  <SelectItem value="instagram">
                    {t.sources.instagram}
                  </SelectItem>
                  <SelectItem value="tiktok">{t.sources.tiktok}</SelectItem>
                  <SelectItem value="referral">{t.sources.referral}</SelectItem>
                  <SelectItem value="direct">{t.sources.direct}</SelectItem>
                  <SelectItem value="other">{t.sources.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assigned & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">{t.detail.info.assignedTo}</Label>
              <Select
                value={formData.assignedTo || "unassigned"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    assignedTo: value === "unassigned" ? null : value,
                  })
                }
                disabled={!isEditing}
              >
                <SelectTrigger id="assignedTo">
                  <SelectValue>
                    {assignedMember ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {assignedMember.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{assignedMember.name}</span>
                      </div>
                    ) : (
                      t.assignment.notAssigned
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">
                    {t.assignment.notAssigned}
                  </SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t.detail.info.status}</Label>
              <Select
                value={formData.status}
                onValueChange={(value: ProspectStatus) =>
                  setFormData({ ...formData, status: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t.statuses.new}</SelectItem>
                  <SelectItem value="contacted">
                    {t.statuses.contacted}
                  </SelectItem>
                  <SelectItem value="interested">
                    {t.statuses.interested}
                  </SelectItem>
                  <SelectItem value="appointment">
                    {t.statuses.appointment}
                  </SelectItem>
                  <SelectItem value="hot">{t.statuses.hot}</SelectItem>
                  <SelectItem value="converted">
                    {t.statuses.converted}
                  </SelectItem>
                  <SelectItem value="lost">{t.statuses.lost}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Original Message */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t.detail.info.originalMessage}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              disabled={!isEditing}
              rows={3}
              maxLength={500}
              className="resize-none"
            />

            <p className="text-xs text-muted-foreground">
              {formData.notes.length}/500
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                {t.detail.info.edit}
              </Button>
            ) : (
              <>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />

                  {t.detail.info.saveChanges}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(prospect);
                    setIsEditing(false);
                  }}
                >
                  {t.bulk.assignDialog.cancel}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lead Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t.detail.info.leadScore}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRecalculateScore}
            >
              <RefreshCw className="h-4 w-4 mr-2" />

              {t.detail.info.recalculateScore}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Score gauge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t.detail.info.leadScore}
              </span>
              <span className={`text-2xl font-bold ${scoreColor}`}>
                {formData.leadScore}/100
              </span>
            </div>
            <Progress value={formData.leadScore} className="h-3" />
          </div>

          {/* Score factors */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">
              {t.detail.info.scoreFactors}
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{t.detail.scoreFactors.categoryB}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{t.detail.scoreFactors.emailOpened}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{t.detail.scoreFactors.validPhone}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{t.detail.scoreFactors.studentReferral}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>{t.detail.scoreFactors.appointmentScheduled}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
