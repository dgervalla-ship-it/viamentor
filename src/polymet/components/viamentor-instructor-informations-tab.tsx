import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EditIcon, CheckIcon, XIcon } from "lucide-react";
import type {
  InstructorDetail,
  DayOfWeek,
} from "@/polymet/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { useInstructorDetailTranslations } from "@/polymet/data/viamentor-instructor-detail-i18n";

interface InformationsTabProps {
  instructor: InstructorDetail;
  locale?: InstructorDetailLocale;
  onUpdate?: (field: string, value: any) => Promise<void>;
}

export function ViamentorInstructorInformationsTab({
  instructor,
  locale = "fr",
  onUpdate,
}: InformationsTabProps) {
  const t = useInstructorDetailTranslations(locale);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  const startEdit = (field: string, value: any) => {
    setEditingField(field);
    setEditValue(value);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue(null);
  };

  const saveEdit = async (field: string) => {
    await onUpdate?.(field, editValue);
    setEditingField(null);
    setEditValue(null);
  };

  const EditableField = ({
    field,
    value,
    label,
    type = "text",
  }: {
    field: string;
    value: string;
    label: string;
    type?: string;
  }) => {
    const isEditing = editingField === field;

    return (
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm font-medium text-muted-foreground w-1/3">
          {label}
        </span>
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
            />

            <Button size="sm" variant="ghost" onClick={() => saveEdit(field)}>
              <CheckIcon className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="sm" variant="ghost" onClick={cancelEdit}>
              <XIcon className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 justify-between">
            <span className="text-sm">{value}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => startEdit(field, value)}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const dayLabels: Record<DayOfWeek, string> = {
    monday: t.dayMonday,
    tuesday: t.dayTuesday,
    wednesday: t.dayWednesday,
    thursday: t.dayThursday,
    friday: t.dayFriday,
    saturday: t.daySaturday,
    sunday: t.daySunday,
  };

  return (
    <div className="space-y-6">
      {/* Coordonnées */}
      <Card>
        <CardHeader>
          <CardTitle>{t.infoCoordinates}</CardTitle>
          <CardDescription>Cliquez sur l'icône pour modifier</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <EditableField
            field="firstName"
            value={instructor.firstName}
            label={t.infoFirstName}
          />

          <EditableField
            field="lastName"
            value={instructor.lastName}
            label={t.infoLastName}
          />

          <EditableField
            field="email"
            value={instructor.email}
            label={t.infoEmail}
            type="email"
          />

          <EditableField
            field="phone"
            value={instructor.phone}
            label={t.infoPhone}
            type="tel"
          />

          <EditableField
            field="street"
            value={instructor.address.street}
            label={t.infoStreet}
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <EditableField
                field="zipCode"
                value={instructor.address.zipCode}
                label={t.infoZipCode}
              />
            </div>
            <div className="flex-1">
              <EditableField
                field="city"
                value={instructor.address.city}
                label={t.infoCity}
              />
            </div>
          </div>
          <EditableField
            field="nationality"
            value={instructor.nationality}
            label={t.infoNationality}
          />

          <div className="py-2 border-b">
            <span className="text-sm font-medium text-muted-foreground">
              {t.infoLanguages}
            </span>
            <div className="flex flex-wrap gap-1 mt-2">
              {instructor.languages.map((lang) => (
                <Badge key={lang} variant="outline">
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle>{t.infoQualifications}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoFederalLicense}</h4>
            <div className="space-y-1">
              <EditableField
                field="licenseNumber"
                value={instructor.federalLicense.number}
                label={t.infoLicenseNumber}
              />

              <EditableField
                field="licenseDate"
                value={instructor.federalLicense.date}
                label={t.infoLicenseDate}
                type="date"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoCategories}</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
              <Button size="sm" variant="outline">
                <EditIcon className="h-3 w-3 mr-1" />

                {t.edit}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoSpecialties}</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.specialties.map((spec) => (
                <Badge key={spec} variant="outline">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disponibilités */}
      <Card>
        <CardHeader>
          <CardTitle>{t.infoAvailability}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoDays}</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.availability.days.map((day) => (
                <Badge key={day} variant="secondary">
                  {dayLabels[day]}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoTimeSlots}</h4>
            {instructor.availability.timeSlots.map((slot, idx) => (
              <div key={idx} className="text-sm">
                {slot.start} - {slot.end}
              </div>
            ))}
          </div>

          <EditableField
            field="maxHours"
            value={instructor.availability.maxHoursPerWeek.toString()}
            label={t.infoMaxHours}
            type="number"
          />

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoVacations}</h4>
            {instructor.availability.vacations.map((vacation, idx) => (
              <div key={idx} className="text-sm py-1">
                {vacation.start} → {vacation.end} - {vacation.reason}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact urgence */}
      <Card>
        <CardHeader>
          <CardTitle>{t.infoEmergencyContact}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <EditableField
            field="emergencyName"
            value={instructor.emergencyContact.name}
            label={t.infoContactName}
          />

          <EditableField
            field="emergencyRelationship"
            value={instructor.emergencyContact.relationship}
            label={t.infoContactRelationship}
          />

          <EditableField
            field="emergencyPhone"
            value={instructor.emergencyContact.phone}
            label={t.infoContactPhone}
            type="tel"
          />
        </CardContent>
      </Card>

      {/* Préférences */}
      <Card>
        <CardHeader>
          <CardTitle>{t.infoPreferences}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">{t.infoNotifications}</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-email">{t.infoNotifEmail}</Label>
                <Switch
                  id="notif-email"
                  checked={instructor.preferences.notifications.email}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-sms">{t.infoNotifSMS}</Label>
                <Switch
                  id="notif-sms"
                  checked={instructor.preferences.notifications.sms}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-push">{t.infoNotifPush}</Label>
                <Switch
                  id="notif-push"
                  checked={instructor.preferences.notifications.push}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoVehicles}</h4>
            <div className="flex flex-wrap gap-2">
              {instructor.preferences.vehicles.map((vehicle) => (
                <Badge key={vehicle} variant="outline">
                  {vehicle}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{t.infoNotes}</h4>
            {editingField === "notes" ? (
              <div className="space-y-2">
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={3}
                />

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit("notes")}>
                    <CheckIcon className="h-4 w-4 mr-2" />

                    {t.save}
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    {t.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className="text-sm flex-1">{instructor.preferences.notes}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    startEdit("notes", instructor.preferences.notes)
                  }
                >
                  <EditIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
