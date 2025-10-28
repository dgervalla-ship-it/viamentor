/**
 * VIAMENTOR - Student Profile Page
 * Page principale profil élève avec tabs navigation
 */

"use client";

import { useState } from "react";
import {
  UserIcon,
  FileTextIcon,
  HistoryIcon,
  SettingsIcon,
  ShieldIcon,
  BuildingIcon,
  HeadphonesIcon,
  LogOutIcon,
  CameraIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";
import {
  mockStudentProfile,
  mockLegalDocuments,
  mockTrainingHistory,
  mockAccountPreferences,
  mockActiveSessions,
  getDocumentStatusColor,
  isDocumentExpiringSoon,
  type StudentProfile,
  type ProfileLocale,
} from "@/polymet/data/viamentor-student-profile-data";
import { getProfileTranslations } from "@/polymet/data/viamentor-student-profile-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StudentProfilePageProps {
  locale?: ProfileLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentProfilePage({ locale = "fr" }: StudentProfilePageProps) {
  const t = getProfileTranslations(locale);
  const [profile] = useState<StudentProfile>(mockStudentProfile);
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header avec Avatar */}
      <div className="flex flex-col items-center gap-4 pb-6 border-b border-border">
        <div className="relative group">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
            />

            <AvatarFallback>
              {profile.firstName[0]}
              {profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <CameraIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-muted-foreground">{profile.email}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {profile.categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
        {profile.assignedInstructor && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Moniteur:</span>
            <Avatar className="w-6 h-6">
              <AvatarImage src={profile.assignedInstructor.avatar} />
            </Avatar>
            <span className="font-medium text-foreground">
              {profile.assignedInstructor.name}
            </span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="personal">
            <UserIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.personalInfo.title}</span>
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileTextIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.legalDocuments.title}</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <HistoryIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.trainingHistory.title}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.preferences.title}</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.security.title}</span>
          </TabsTrigger>
          <TabsTrigger value="school">
            <BuildingIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.schoolInfo.title}</span>
          </TabsTrigger>
          <TabsTrigger value="support">
            <HeadphonesIcon className="w-4 h-4 mr-2" />

            <span className="hidden sm:inline">{t.support.title}</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.personalInfo.title}</CardTitle>
              <CardDescription>
                Informations personnelles et coordonnées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.personalInfo.firstName}</Label>
                  <Input value={profile.firstName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>{t.personalInfo.lastName}</Label>
                  <Input value={profile.lastName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>{t.personalInfo.email}</Label>
                  <Input type="email" value={profile.email} />
                </div>
                <div className="space-y-2">
                  <Label>{t.personalInfo.phone}</Label>
                  <Input type="tel" value={profile.phone} />
                </div>
              </div>
              <Button>{t.personalInfo.save}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.legalDocuments.title}</CardTitle>
              <CardDescription>
                Documents légaux et conformité OAC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Maintiens tes documents à jour pour rester conforme aux
                  exigences OAC
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                {mockLegalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{doc.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.fileName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDocumentStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {isDocumentExpiringSoon(doc.daysUntilExpiration) && (
                        <Badge variant="destructive">⚠️</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button>{t.legalDocuments.addDocument}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.trainingHistory.title}</CardTitle>
              <CardDescription>Ton parcours de formation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.trainingHistory.enrollmentDate}
                </p>
                <p className="font-medium text-foreground">
                  {mockTrainingHistory.enrollmentDate}
                </p>
              </div>
              <Separator />

              <div>
                <h4 className="font-semibold mb-2 text-foreground">
                  Forfaits achetés
                </h4>
                {mockTrainingHistory.packages.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between py-2">
                    <span className="text-foreground">{pkg.name}</span>
                    <span className="text-muted-foreground">
                      CHF {pkg.price}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.preferences.title}</CardTitle>
              <CardDescription>
                Préférences de compte et notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{t.preferences.notifications}</Label>
                <Switch
                  defaultChecked={mockAccountPreferences.notifications.email}
                />
              </div>
              <Separator />

              <div className="space-y-2">
                <Label>Créneaux préférés</Label>
                <div className="flex flex-wrap gap-2">
                  {mockAccountPreferences.preferredTimeSlots.map((slot) => (
                    <Badge key={slot} variant="secondary">
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button>{t.preferences.save}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.security.title}</CardTitle>
              <CardDescription>Sécurité et confidentialité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">{t.security.changePassword}</Button>
              <Separator />

              <div>
                <h4 className="font-semibold mb-2 text-foreground">
                  Sessions actives
                </h4>
                {mockActiveSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex justify-between items-center py-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {session.device}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.location.city}
                      </p>
                    </div>
                    {session.isCurrent && (
                      <Badge variant="secondary">Actuelle</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* School Info Tab */}
        <TabsContent value="school" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.schoolInfo.title}</CardTitle>
              <CardDescription>Informations sur ton auto-école</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profile.school.logo} />
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {profile.school.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.school.address}
                  </p>
                </div>
              </div>
              <Separator />

              {profile.assignedInstructor && (
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">
                    {t.schoolInfo.myInstructor}
                  </h4>
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profile.assignedInstructor.avatar} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {profile.assignedInstructor.name}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                        <span>{profile.assignedInstructor.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <PhoneIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MailIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.support.title}</CardTitle>
              <CardDescription>Aide et support technique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sujet</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionne un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technique</SelectItem>
                    <SelectItem value="billing">Facturation</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Décris ton problème..." rows={5} />
              </div>
              <Button>{t.support.contactSupport}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" size="lg">
          <LogOutIcon className="w-4 h-4 mr-2" />

          {t.logout.button}
        </Button>
      </div>
    </div>
  );
}
