/**
 * VIAMENTOR Student Informations Tab
 *
 * Tab informations avec édition inline
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  CheckIcon,
  XIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import type { StudentDetail } from "@/polymet/data/viamentor-student-detail-data";
import type { StudentDetailLocale } from "@/polymet/data/viamentor-student-detail-i18n";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";
import { MOCK_INSTRUCTORS } from "@/polymet/data/viamentor-students-data";

export interface StudentInformationsTabProps {
  student: StudentDetail;
  locale?: StudentDetailLocale;
  onUpdate?: (field: string, value: any) => Promise<void>;
  onAddCategory?: () => void;
  onAddLessons?: () => void;
  onCollectPayment?: () => void;
}

export function StudentInformationsTab({
  student,
  locale = "fr",
  onUpdate,
  onAddCategory,
  onAddLessons,
  onCollectPayment,
}: StudentInformationsTabProps) {
  const t = useStudentDetailTranslations(locale);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>(null);
  const [transactionsExpanded, setTransactionsExpanded] = useState(false);

  const startEdit = (field: string, currentValue: any) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue(null);
  };

  const saveEdit = async (field: string) => {
    if (onUpdate) {
      await onUpdate(field, editValue);
    }
    setEditingField(null);
    setEditValue(null);
  };

  const renderEditableField = (
    field: string,
    label: string,
    value: any,
    type: "text" | "select" = "text",
    options?: { value: string; label: string }[]
  ) => {
    const isEditing = editingField === field;

    return (
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        {isEditing ? (
          <div className="flex items-center gap-2">
            {type === "select" && options ? (
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1"
                autoFocus
              />
            )}
            <Button size="icon" variant="ghost" onClick={() => saveEdit(field)}>
              <CheckIcon className="h-4 w-4 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={cancelEdit}>
              <XIcon className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ) : (
          <p
            className="font-medium cursor-pointer hover:bg-muted px-2 py-1 rounded"
            onClick={() => startEdit(field, value)}
          >
            {value || "-"}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Coordonnées */}
      <Card>
        <CardHeader>
          <CardTitle>{t.sectionContact}</CardTitle>
          <CardDescription>
            Cliquez sur un champ pour le modifier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderEditableField("firstName", t.firstName, student.firstName)}
            {renderEditableField("lastName", t.lastName, student.lastName)}
            {renderEditableField("email", t.email, student.email)}
            {renderEditableField("phone", t.phone, student.phone)}
            {renderEditableField("address", t.address, student.address)}
            {renderEditableField("zip", t.zip, student.zip)}
            {renderEditableField("city", t.city, student.city)}
            {renderEditableField("canton", t.canton, student.canton)}
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                {t.birthDate}
              </Label>
              <p className="font-medium">
                {new Date(student.birthDate).toLocaleDateString(
                  locale === "en" ? "en-CH" : `${locale}-CH`
                )}{" "}
                ({student.age} ans)
              </p>
            </div>
            {renderEditableField(
              "language",
              t.language,
              student.language,
              "select",
              [
                { value: "fr", label: "Français" },
                { value: "de", label: "Deutsch" },
                { value: "it", label: "Italiano" },
                { value: "en", label: "English" },
              ]
            )}
          </div>
        </CardContent>
      </Card>

      {/* Inscriptions formations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.sectionEnrollments}</CardTitle>
            <Button onClick={onAddCategory} size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />

              {t.addCategory}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.categories.map((cat) => (
              <Card key={cat.category}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {cat.category}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Inscrit le{" "}
                        {new Date(cat.enrollmentDate).toLocaleDateString(
                          locale === "en" ? "en-CH" : `${locale}-CH`
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">{cat.package}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">
                        {t.assignedInstructor}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          {cat.instructor.avatar && (
                            <AvatarImage src={cat.instructor.avatar} />
                          )}
                          <AvatarFallback>
                            {cat.instructor.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <Select
                          value={cat.instructor.id}
                          onValueChange={(value) =>
                            onUpdate?.(
                              `category_${cat.category}_instructor`,
                              value
                            )
                          }
                        >
                          <SelectTrigger className="w-auto border-0 p-0 h-auto focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_INSTRUCTORS.map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>
                                {inst.firstName} {inst.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {cat.examDate && (
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">
                          {t.examDate}
                        </Label>
                        <p className="font-medium">
                          {new Date(cat.examDate).toLocaleDateString(
                            locale === "en" ? "en-CH" : `${locale}-CH`
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">{cat.progression}%</span>
                    </div>
                    <Progress value={cat.progression} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm text-muted-foreground">
                      {t.notes}
                    </Label>
                    <Textarea
                      value={cat.notes}
                      onChange={(e) =>
                        onUpdate?.(
                          `category_${cat.category}_notes`,
                          e.target.value
                        )
                      }
                      rows={2}
                      className="resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      {t.lessonHistory} ({cat.completedLessons})
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Moyenne: {cat.averageRating.toFixed(1)}/5 ⭐
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soldes */}
      <Card>
        <CardHeader>
          <CardTitle>{t.sectionBalance}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>{t.lessonsBalance}</Label>
                <Badge
                  variant={
                    student.lessonsBalance > 5
                      ? "default"
                      : student.lessonsBalance > 0
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-lg px-3 py-1"
                >
                  {student.lessonsBalance}
                </Badge>
              </div>
              <Button onClick={onAddLessons} className="w-full">
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.addLessons}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>{t.financialBalance}</Label>
                <Badge
                  variant={
                    student.financialBalance >= 0 ? "default" : "destructive"
                  }
                  className="text-lg px-3 py-1"
                >
                  CHF {student.financialBalance}
                </Badge>
              </div>
              <Button
                onClick={onCollectPayment}
                className="w-full"
                variant={student.financialBalance < 0 ? "default" : "outline"}
              >
                {t.collectPayment}
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTransactionsExpanded(!transactionsExpanded)}
              className="w-full"
            >
              {t.transactionHistory}
              {transactionsExpanded ? (
                <ChevronUpIcon className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              )}
            </Button>
            {transactionsExpanded && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Historique des transactions à implémenter
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact d'urgence */}
      {student.emergencyContact && (
        <Card>
          <CardHeader>
            <CardTitle>{t.sectionEmergencyContact}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderEditableField(
                "emergencyName",
                t.emergencyName,
                student.emergencyContact.name
              )}
              {renderEditableField(
                "emergencyPhone",
                t.emergencyPhone,
                student.emergencyContact.phone
              )}
              {renderEditableField(
                "emergencyRelation",
                t.emergencyRelation,
                student.emergencyContact.relation
              )}
            </div>
            {student.age < 18 && (
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  id="minorAuth"
                  checked={student.emergencyContact.minorExitAuthorization}
                  onCheckedChange={(checked) =>
                    onUpdate?.("minorExitAuthorization", checked)
                  }
                />

                <label
                  htmlFor="minorAuth"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.minorExitAuth}
                </label>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Préférences */}
      <Card>
        <CardHeader>
          <CardTitle>{t.sectionPreferences}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailNotif"
                checked={student.preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  onUpdate?.("emailNotifications", checked)
                }
              />

              <label htmlFor="emailNotif" className="text-sm">
                {t.emailNotifications}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smsNotif"
                checked={student.preferences.smsReminders}
                onCheckedChange={(checked) =>
                  onUpdate?.("smsReminders", checked)
                }
              />

              <label htmlFor="smsNotif" className="text-sm">
                {t.smsReminders}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whatsappNotif"
                checked={student.preferences.whatsappNotifications}
                onCheckedChange={(checked) =>
                  onUpdate?.("whatsappNotifications", checked)
                }
              />

              <label htmlFor="whatsappNotif" className="text-sm">
                {t.whatsappNotifications}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.preferredTimeSlots}</Label>
            <div className="flex flex-wrap gap-2">
              {["Matin", "Après-midi", "Soir", "Weekend"].map((slot) => (
                <Badge
                  key={slot}
                  variant={
                    student.preferences.preferredTimeSlots.includes(slot as any)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    const current = student.preferences.preferredTimeSlots;
                    const updated = current.includes(slot as any)
                      ? current.filter((s) => s !== slot)
                      : [...current, slot as any];
                    onUpdate?.("preferredTimeSlots", updated);
                  }}
                >
                  {slot}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.instructorNotes}</Label>
            <Textarea
              value={student.preferences.instructorNotes}
              onChange={(e) => onUpdate?.("instructorNotes", e.target.value)}
              rows={3}
              className="resize-none"
              placeholder="Notes visibles par tous les moniteurs..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
