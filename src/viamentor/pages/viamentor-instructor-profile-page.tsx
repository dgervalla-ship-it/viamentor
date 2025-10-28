/**
 * VIAMENTOR - Instructor Profile Page
 * Page profil moniteur avec sections édition inline
 */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CameraIcon,
  SaveIcon,
  XIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  UploadIcon,
  DownloadIcon,
  TrashIcon,
  PlusIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  CarIcon,
  ShieldIcon,
  LogOutIcon,
  KeyIcon,
  SmartphoneIcon,
  MonitorIcon,
  FileTextIcon,
  BarChart3Icon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react";
import {
  calculateAge,
  hasExpiredCertificates,
  hasExpiringSoonCertificates,
  getDaysUntilExpiry,
} from "@/viamentor/data/viamentor-instructor-profile-data";
import {
  instructorProfileI18n,
  type InstructorProfileLocale,
} from "@/viamentor/data/viamentor-instructor-profile-i18n";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { useInstructor, useUpdateInstructor } from "@/lib/hooks/use-instructors";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorProfilePageProps {
  locale?: InstructorProfileLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorProfilePage({
  locale = "fr",
}: InstructorProfilePageProps) {
  const { id } = useParams<{ id: string }>();
  const t = instructorProfileI18n[locale];

  // Fetch instructor profile
  const { data: profile, isLoading, error } = useInstructor(id || "");
  const updateInstructor = useUpdateInstructor();

  // Loading state
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Error state
  if (error || !profile) {
    return <ErrorMessage error={error || new Error("Profile not found")} fullScreen />;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  const [showAddCertificateDialog, setShowAddCertificateDialog] =
    useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "quarter" | "year" | "all"
  >("month");

  const age = calculateAge(profile.personalInfo.birthDate);
  const hasExpired = hasExpiredCertificates(profile.certificates);
  const hasExpiringSoon = hasExpiringSoonCertificates(profile.certificates);

  const handleSave = () => {
    // Mock save
    console.log("Saving profile...", profile);
    setIsEditing(false);
    setIsDirty(false);
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirm = window.confirm(t.personalInfo.unsavedMessage);
      if (!confirm) return;
    }
    setIsEditing(false);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.breadcrumb}</p>
        </div>
      </div>

      {/* Avatar & Basic Info */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.personalInfo.avatar} />

              <AvatarFallback className="text-2xl">
                {profile.personalInfo.firstName[0]}
                {profile.personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <CameraIcon className="h-6 w-6 text-white" />

              <span className="sr-only">{t.changePhoto}</span>
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {profile.personalInfo.firstName} {profile.personalInfo.lastName}
            </h2>
            <p className="text-muted-foreground">
              {age} {t.personalInfo.age}
            </p>
          </div>

          <div className="flex gap-2">
            {profile.authorizedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-sm">
                {cat}
              </Badge>
            ))}
          </div>

          {profile.stats.averageRating > 0 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(profile.stats.averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
              <span className="text-sm font-medium ml-2">
                {profile.stats.averageRating}/5
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Alerts */}
      {hasExpired && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-5 w-5" />

          <AlertDescription>{t.certifications.expiredAlert}</AlertDescription>
        </Alert>
      )}

      {hasExpiringSoon && !hasExpired && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertTriangleIcon className="h-5 w-5 text-orange-500" />

          <AlertDescription className="text-orange-700 dark:text-orange-300">
            {t.certifications.expiringSoonAlert}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="personal">
            <UserIcon className="h-4 w-4 mr-2" />

            {t.personalInfo.title}
          </TabsTrigger>
          <TabsTrigger value="certifications">
            <AwardIcon className="h-4 w-4 mr-2" />

            {t.certifications.title}
          </TabsTrigger>
          <TabsTrigger value="specialties">
            <StarIcon className="h-4 w-4 mr-2" />

            {t.specialties.title}
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <ClockIcon className="h-4 w-4 mr-2" />

            {t.preferences.title}
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3Icon className="h-4 w-4 mr-2" />

            {t.stats.title}
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="h-4 w-4 mr-2" />

            {t.security.title}
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{t.personalInfo.title}</h3>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  {t.edit}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <SaveIcon className="h-4 w-4 mr-2" />

                    {t.personalInfo.save}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <XIcon className="h-4 w-4 mr-2" />

                    {t.personalInfo.cancel}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>{t.personalInfo.firstName}</Label>
                <Input value={profile.personalInfo.firstName} disabled />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.lastName}</Label>
                <Input value={profile.personalInfo.lastName} disabled />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.birthDate}</Label>
                <Input
                  type="date"
                  value={
                    profile.personalInfo.birthDate.toISOString().split("T")[0]
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.gender}</Label>
                <Select
                  value={profile.personalInfo.gender}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      {t.personalInfo.genderOptions.male}
                    </SelectItem>
                    <SelectItem value="female">
                      {t.personalInfo.genderOptions.female}
                    </SelectItem>
                    <SelectItem value="other">
                      {t.personalInfo.genderOptions.other}
                    </SelectItem>
                    <SelectItem value="not_specified">
                      {t.personalInfo.genderOptions.not_specified}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.email}</Label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={profile.personalInfo.email}
                    disabled={!isEditing}
                    className="flex-1"
                  />

                  <MailIcon className="h-5 w-5 text-muted-foreground mt-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.phone}</Label>
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    value={profile.personalInfo.phone}
                    placeholder={t.personalInfo.phonePlaceholder}
                    disabled={!isEditing}
                    className="flex-1"
                  />

                  <PhoneIcon className="h-5 w-5 text-muted-foreground mt-2" />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>{t.personalInfo.address}</Label>
                <Input
                  value={profile.personalInfo.address}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.postalCode}</Label>
                <Input
                  value={profile.personalInfo.postalCode}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.city}</Label>
                <Input
                  value={profile.personalInfo.city}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.canton}</Label>
                <Input value={profile.personalInfo.canton} disabled />
              </div>

              <div className="space-y-2">
                <Label>{t.personalInfo.locale}</Label>
                <Select
                  value={profile.personalInfo.locale}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">
                      {t.personalInfo.localeOptions.fr}
                    </SelectItem>
                    <SelectItem value="de">
                      {t.personalInfo.localeOptions.de}
                    </SelectItem>
                    <SelectItem value="it">
                      {t.personalInfo.localeOptions.it}
                    </SelectItem>
                    <SelectItem value="en">
                      {t.personalInfo.localeOptions.en}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {t.certifications.authorizations}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t.certifications.authorizationsSubtitle}
            </p>
            <div className="flex gap-3">
              {profile.authorizedCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="text-base px-4 py-2"
                >
                  {
                    t.certifications.categories[
                      cat as keyof typeof t.certifications.categories
                    ]
                  }
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {t.certifications.certificates}
              </h3>
              <Button onClick={() => setShowAddCertificateDialog(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.certifications.addCertificate}
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t.certifications.certificateTypes.teaching_permit}
                  </TableHead>
                  <TableHead>{t.certifications.status.valid}</TableHead>
                  <TableHead>{t.certifications.issueDate}</TableHead>
                  <TableHead>{t.certifications.expirationDate}</TableHead>
                  <TableHead>{t.certifications.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile.certificates.map((cert) => {
                  const daysUntilExpiry = cert.expirationDate
                    ? getDaysUntilExpiry(cert.expirationDate)
                    : null;

                  return (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">
                        {t.certifications.certificateTypes[cert.type]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            cert.status === "valid"
                              ? "default"
                              : cert.status === "expiring_soon"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {t.certifications.status[cert.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {cert.issueDate.toLocaleDateString(locale)}
                      </TableCell>
                      <TableCell>
                        {cert.expirationDate ? (
                          <div>
                            <div>
                              {cert.expirationDate.toLocaleDateString(locale)}
                            </div>
                            {daysUntilExpiry !== null &&
                              daysUntilExpiry > 0 && (
                                <div className="text-xs text-muted-foreground">
                                  {t.certifications.expiresIn} {daysUntilExpiry}{" "}
                                  {t.certifications.days}
                                </div>
                              )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              console.log("Télécharger certificat", cert.id)
                            }
                            title={t.certifications.download}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              console.log("Uploader certificat", cert.id)
                            }
                            title={t.certifications.upload}
                          >
                            <UploadIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (
                                window.confirm(t.certifications.deleteConfirm)
                              ) {
                                console.log("Supprimer certificat", cert.id);
                              }
                            }}
                            title={t.certifications.delete}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Specialties Tab */}
        <TabsContent value="specialties" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">
              {t.specialties.mySpecialties}
            </h3>

            <div className="space-y-4 mb-6">
              {Object.entries(t.specialties.specialtyOptions).map(
                ([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={profile.specialties.specialties.includes(
                        key as any
                      )}
                    />

                    <label htmlFor={key} className="text-sm cursor-pointer">
                      {label}
                    </label>
                  </div>
                )
              )}
            </div>

            <div className="space-y-2">
              <Label>{t.specialties.bio}</Label>
              <Textarea
                value={profile.specialties.bio}
                placeholder={t.specialties.bioPlaceholder}
                rows={6}
                maxLength={500}
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t.specialties.bioHelp}</span>
                <span>
                  {profile.specialties.bio.length}/500 {t.specialties.charCount}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button>
                <SaveIcon className="h-4 w-4 mr-2" />

                {t.specialties.save}
              </Button>
              <Button variant="outline">
                <XIcon className="h-4 w-4 mr-2" />

                {t.specialties.cancel}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">
              {t.preferences.title}
            </h3>

            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">
                  {t.preferences.studentTypes}
                </Label>
                <div className="space-y-2">
                  {Object.entries(t.preferences.studentTypeOptions).map(
                    ([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`student-${key}`}
                          checked={profile.teachingPreferences.preferredStudentTypes?.includes(
                            key as any
                          )}
                        />

                        <label
                          htmlFor={`student-${key}`}
                          className="text-sm cursor-pointer"
                        >
                          {label}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <Label className="text-base mb-3 block">
                  {t.preferences.timeSlots}
                </Label>
                <div className="space-y-2">
                  {Object.entries(t.preferences.timeSlotOptions).map(
                    ([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${key}`}
                          checked={profile.teachingPreferences.preferredTimeSlots.includes(
                            key as any
                          )}
                        />

                        <label
                          htmlFor={`time-${key}`}
                          className="text-sm cursor-pointer"
                        >
                          {label}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.preferences.hourlyRate}</Label>
                  <Input
                    type="number"
                    value={profile.teachingPreferences.hourlyRate}
                    placeholder="CHF"
                    min={50}
                    max={200}
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.preferences.hourlyRateOptional}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>{t.preferences.maxStudentsPerWeek}</Label>
                  <Input
                    type="number"
                    value={profile.teachingPreferences.maxStudentsPerWeek}
                    min={1}
                    max={50}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button>
                <SaveIcon className="h-4 w-4 mr-2" />

                {t.preferences.save}
              </Button>
              <Button variant="outline">
                <XIcon className="h-4 w-4 mr-2" />

                {t.preferences.cancel}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">{t.vehicles.title}</h3>
            <div className="space-y-3">
              {profile.vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CarIcon className="h-5 w-5 text-muted-foreground" />

                    <div>
                      <div className="font-medium">{vehicle.plate}</div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.brand} {vehicle.model}
                      </div>
                    </div>
                    <Badge variant="secondary">{vehicle.category}</Badge>
                  </div>
                  <Checkbox checked={vehicle.isPreferred} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{t.stats.title}</h3>
              <Select
                value={selectedPeriod}
                onValueChange={(v: any) => setSelectedPeriod(v)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t.stats.periods.week}</SelectItem>
                  <SelectItem value="month">{t.stats.periods.month}</SelectItem>
                  <SelectItem value="quarter">
                    {t.stats.periods.quarter}
                  </SelectItem>
                  <SelectItem value="year">{t.stats.periods.year}</SelectItem>
                  <SelectItem value="all">{t.stats.periods.all}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />

                  <div
                    className={`flex items-center gap-1 text-xs ${profile.stats.lessonsTrend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {profile.stats.lessonsTrend >= 0 ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    {Math.abs(profile.stats.lessonsTrend)}%
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {profile.stats.lessonsCompleted}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.lessonsCompleted}
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />

                  <div
                    className={`flex items-center gap-1 text-xs ${profile.stats.hoursTrend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {profile.stats.hoursTrend >= 0 ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    {Math.abs(profile.stats.hoursTrend)}%
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {profile.stats.hoursTeaching}h
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.hoursTeaching}
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />

                  <div
                    className={`flex items-center gap-1 text-xs ${profile.stats.studentsTrend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {profile.stats.studentsTrend >= 0 ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    {Math.abs(profile.stats.studentsTrend)}%
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {profile.stats.studentsTrained}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.studentsTrained}
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <StarIcon className="h-5 w-5 text-muted-foreground" />

                  <div
                    className={`flex items-center gap-1 text-xs ${profile.stats.ratingTrend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {profile.stats.ratingTrend >= 0 ? (
                      <TrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3" />
                    )}
                    {Math.abs(profile.stats.ratingTrend)}%
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {profile.stats.averageRating}/5
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.averageRating}
                </div>
              </Card>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.stats.lessonsPerMonth}</h4>
              <ChartContainer config={{}} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profile.stats.lessonsPerMonth}>
                    <XAxis dataKey="month" />

                    <ChartTooltip />

                    <Line
                      type="monotone"
                      dataKey="lessons"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <Button variant="outline" className="mt-6">
              <BarChart3Icon className="h-4 w-4 mr-2" />

              {t.stats.viewDetailedReports}
            </Button>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">{t.security.title}</h3>

            <div className="space-y-6">
              <div>
                <Button onClick={() => setShowChangePasswordDialog(true)}>
                  <KeyIcon className="h-4 w-4 mr-2" />

                  {t.security.changePassword}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="font-medium">{t.security.twoFactor}</div>
                  <div className="text-sm text-muted-foreground">
                    {profile.security.twoFactorEnabled
                      ? t.security.twoFactorEnabled
                      : t.security.twoFactorDisabled}
                  </div>
                </div>
                <Button variant="outline">
                  {profile.security.twoFactorEnabled
                    ? t.security.disableTwoFactor
                    : t.security.setupTwoFactor}
                </Button>
              </div>

              <div>
                <h4 className="font-semibold mb-4">
                  {t.security.activeSessions}
                </h4>
                <div className="space-y-3">
                  {profile.security.activeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <MonitorIcon className="h-5 w-5 text-muted-foreground" />

                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-muted-foreground">
                            {session.location} •{" "}
                            {session.lastActive.toLocaleString(locale)}
                          </div>
                          {session.isCurrent && (
                            <Badge variant="secondary" className="mt-1">
                              {t.security.currentSession}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <Button variant="ghost" size="sm">
                          {t.security.logout}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <FileTextIcon className="h-4 w-4 mr-2" />

                  {t.security.downloadData}
                </Button>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />

                  {t.security.deleteAccount}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <Card className="p-6">
        <Button
          variant="outline"
          onClick={() => setShowLogoutDialog(true)}
          className="w-full"
        >
          <LogOutIcon className="h-4 w-4 mr-2" />

          {t.logout}
        </Button>
      </Card>

      {/* Change Password Dialog */}
      <Dialog
        open={showChangePasswordDialog}
        onOpenChange={setShowChangePasswordDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.security.changePassword}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.security.currentPassword}</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>{t.security.newPassword}</Label>
              <Input type="password" />

              <p className="text-xs text-muted-foreground">
                {t.security.passwordRequirements}
              </p>
            </div>
            <div className="space-y-2">
              <Label>{t.security.confirmPassword}</Label>
              <Input type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowChangePasswordDialog(false)}
            >
              {t.cancel}
            </Button>
            <Button onClick={() => setShowChangePasswordDialog(false)}>
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.logout}</DialogTitle>
          </DialogHeader>
          <p>{t.logoutConfirm}</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              {t.cancel}
            </Button>
            <Button onClick={() => setShowLogoutDialog(false)}>
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
