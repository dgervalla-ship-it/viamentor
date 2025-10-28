/**
 * VIAMENTOR - Secretary Registrations Page
 * Page inscriptions secrétariat avec wizard simplifié
 */

"use client";

import { useState } from "react";
import { UserPlusIcon, FilterIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  mockPackages,
  mockInstructors,
  mockRecentRegistrations,
  mockRegistrationStats,
  formatRegistrationStatus,
  type LicenseCategory,
} from "@/polymet/data/viamentor-quick-registration-data";
import {
  getQuickRegistrationTranslation,
  type QuickRegistrationLocale,
} from "@/polymet/data/viamentor-quick-registration-i18n";
import {
  calculateAge,
  isMinor,
} from "@/polymet/data/viamentor-quick-registration-schemas";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryRegistrationsPageProps {
  locale?: QuickRegistrationLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SecretaryRegistrationsPage({
  locale = "fr",
}: SecretaryRegistrationsPageProps) {
  const t = getQuickRegistrationTranslation(locale);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date>();
  const [selectedCategories, setSelectedCategories] = useState<
    LicenseCategory[]
  >(["B"]);
  const [hasLearnerPermit, setHasLearnerPermit] = useState(false);
  const [requiresTheory, setRequiresTheory] = useState(false);

  const age = birthDate ? calculateAge(birthDate) : null;
  const minor = birthDate ? isMinor(birthDate) : false;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Simulation création élève
    console.log("Finalizing registration...");
    setWizardOpen(false);
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <UserPlusIcon className="h-5 w-5" />

              {t.wizard.newRegistration}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{t.wizard.title}</DialogTitle>
            </DialogHeader>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  <div className="ml-3 flex-1">
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= step
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step === 1 && t.wizard.steps.identity}
                      {step === 2 && t.wizard.steps.training}
                      {step === 3 && t.wizard.steps.confirmation}
                    </div>
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-px flex-1 ${
                        currentStep > step ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1 - Identity */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {t.identity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.identity.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {t.identity.fields.firstName} *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder={t.identity.fields.firstNamePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {t.identity.fields.lastName} *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder={t.identity.fields.lastNamePlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.identity.fields.birthDate} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />

                          {birthDate ? (
                            format(birthDate, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          onSelect={setBirthDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {age !== null && (
                      <p className="text-sm text-muted-foreground">
                        {t.identity.fields.age.replace(
                          "{{age}}",
                          age.toString()
                        )}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">{t.identity.fields.gender}</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">
                          {t.identity.fields.genderOptions.male}
                        </SelectItem>
                        <SelectItem value="female">
                          {t.identity.fields.genderOptions.female}
                        </SelectItem>
                        <SelectItem value="other">
                          {t.identity.fields.genderOptions.other}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {minor && (
                  <Card className="border-destructive bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {t.identity.minor.alert}
                      </CardTitle>
                      <CardDescription>
                        {t.identity.minor.alertDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label>{t.identity.minor.guardianName} *</Label>
                        <Input
                          placeholder={t.identity.minor.guardianNamePlaceholder}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.identity.minor.guardianPhone} *</Label>
                        <Input
                          placeholder={
                            t.identity.minor.guardianPhonePlaceholder
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="consent" />

                        <Label htmlFor="consent" className="text-sm">
                          {t.identity.minor.consent} *
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.identity.fields.phone} *</Label>
                    <Input
                      id="phone"
                      placeholder={t.identity.fields.phonePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.identity.fields.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.identity.fields.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learnerPermit"
                    checked={hasLearnerPermit}
                    onCheckedChange={(checked) =>
                      setHasLearnerPermit(checked as boolean)
                    }
                  />

                  <Label htmlFor="learnerPermit">
                    {t.identity.learnerPermit.label}
                  </Label>
                </div>

                {!hasLearnerPermit && (
                  <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {t.identity.learnerPermit.alert}
                      </CardTitle>
                      <CardDescription>
                        {t.identity.learnerPermit.alertDescription}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            )}

            {/* Step 2 - Training */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {t.training.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.training.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>{t.training.categories.label} *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["B", "A", "BE", "A1", "BPT"] as LicenseCategory[]).map(
                      (cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  cat,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter((c) => c !== cat)
                                );
                              }
                            }}
                          />

                          <Label htmlFor={`cat-${cat}`} className="text-sm">
                            {t.training.categories.options[cat]}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.training.instructor.label}</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        {t.training.instructor.auto}
                      </SelectItem>
                      {mockInstructors.map((instructor) => (
                        <SelectItem key={instructor.id} value={instructor.id}>
                          {instructor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {t.training.instructor.autoDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>{t.training.package.label}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t.training.package.none} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPackages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - {pkg.price} CHF
                          {pkg.savings > 0 &&
                            ` (${t.training.package.savings.replace("{{amount}}", pkg.savings.toString())})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="theoryClass"
                    checked={requiresTheory}
                    onCheckedChange={(checked) =>
                      setRequiresTheory(checked as boolean)
                    }
                  />

                  <Label htmlFor="theoryClass">
                    {t.training.theoryClass.label}
                  </Label>
                </div>

                {requiresTheory && (
                  <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {t.training.theoryClass.alert}
                      </CardTitle>
                      <CardDescription>
                        {t.training.theoryClass.alertDescription}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="goals">{t.training.goals.label}</Label>
                  <Textarea
                    id="goals"
                    placeholder={t.training.goals.placeholder}
                    maxLength={300}
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.training.goals.description}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 - Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {t.confirmation.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.confirmation.subtitle}
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {t.confirmation.sections.quickActions}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="scheduleLesson" defaultChecked />

                      <Label htmlFor="scheduleLesson" className="text-sm">
                        {t.confirmation.quickActions.scheduleLesson}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sendWelcome" defaultChecked />

                      <Label htmlFor="sendWelcome" className="text-sm">
                        {t.confirmation.quickActions.sendWelcome}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="createAccount" defaultChecked />

                      <Label htmlFor="createAccount" className="text-sm">
                        {t.confirmation.quickActions.createAccount}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activateNow" defaultChecked />

                      <Label htmlFor="activateNow" className="text-sm">
                        {t.confirmation.quickActions.activateNow}
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.confirmation.sections.payment}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {t.confirmation.payment.total}:
                      </span>
                      <span className="text-2xl font-bold">900 CHF</span>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.confirmation.payment.method}</Label>
                      <Select defaultValue="cash">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">
                            {t.confirmation.payment.methods.cash}
                          </SelectItem>
                          <SelectItem value="card">
                            {t.confirmation.payment.methods.card}
                          </SelectItem>
                          <SelectItem value="twint">
                            {t.confirmation.payment.methods.twint}
                          </SelectItem>
                          <SelectItem value="invoice">
                            {t.confirmation.payment.methods.invoice}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                {t.wizard.buttons.back}
              </Button>
              {currentStep < 3 ? (
                <Button onClick={handleNextStep}>
                  {t.wizard.buttons.next}
                </Button>
              ) : (
                <Button onClick={handleFinish}>
                  {t.wizard.buttons.finish}
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{t.stats.monthRegistrations}</CardDescription>
            <CardTitle className="text-3xl">
              {mockRegistrationStats.monthRegistrations}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{t.stats.conversionRate}</CardDescription>
            <CardTitle className="text-3xl">
              {mockRegistrationStats.conversionRate}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{t.stats.activeStudents}</CardDescription>
            <CardTitle className="text-3xl">
              {mockRegistrationStats.activeStudents}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">{t.tabs.recent}</TabsTrigger>
          <TabsTrigger value="prospects">{t.tabs.prospects}</TabsTrigger>
          <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.recent.title}</CardTitle>
                  <CardDescription>{t.recent.subtitle}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4 mr-2" />

                    {t.recent.filters.all}
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" />

                    {t.recent.export}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reg.student.avatar} />

                      <AvatarFallback>
                        {reg.student.firstName[0]}
                        {reg.student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {reg.student.firstName} {reg.student.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reg.date.toLocaleDateString(locale)}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {reg.categories.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <Badge
                      variant={
                        reg.status === "active"
                          ? "default"
                          : reg.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {formatRegistrationStatus(reg.status, locale)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Aucun prospect pour le moment
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Liste complète des élèves (lecture seule)
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
