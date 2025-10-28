/**
 * VIAMENTOR - Lesson Evaluation Page
 * Page évaluation leçon moniteur avec formulaire complet
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEvaluationTranslations,
  type EvaluationLocale,
} from "@/polymet/data/viamentor-lesson-evaluation-i18n";
import {
  LessonEvaluationSchema,
  type LessonEvaluation,
  LDriveThemes,
  getRatingLabel,
  getRatingColor,
} from "@/polymet/data/viamentor-lesson-evaluation-schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  CarIcon,
  MapPinIcon,
  StarIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  Loader2Icon,
  DownloadIcon,
  SendIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface LessonEvaluationPageProps {
  locale?: EvaluationLocale;
  lessonId?: string;
}

// Mock lesson data
const mockLesson = {
  id: "lesson-001",
  student: {
    id: "student-001",
    name: "Sophie Martin",
    avatar: "https://github.com/shoaibux1.png",
  },
  instructor: {
    id: "instructor-001",
    name: "Marc Müller",
  },
  date: "2025-01-15T14:00:00",
  duration: 90,
  category: "B" as const,
  vehicle: {
    id: "vehicle-001",
    plate: "VD 123456",
    model: "VW Golf",
  },
  meetingPoint: "Place de la Gare, Lausanne",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function LessonEvaluationPage({
  locale = "fr",
  lessonId = "lesson-001",
}: LessonEvaluationPageProps) {
  const t = useEvaluationTranslations(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEvaluationSaved, setIsEvaluationSaved] = useState(false);
  const [pendingEvaluationsCount, setPendingEvaluationsCount] = useState(3); // Mock
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [globalRating, setGlobalRating] = useState<string>("");
  const [commentLength, setCommentLength] = useState(0);
  const [progressValue, setProgressValue] = useState([50]);
  const [safetyConcerns, setSafetyConcerns] = useState<string[]>([]);
  const [instructorSignature, setInstructorSignature] = useState<string>("");
  const [studentSignature, setStudentSignature] = useState<string>("");
  const [studentAbsent, setStudentAbsent] = useState(false);
  const [themeEvaluations, setThemeEvaluations] = useState<
    Record<string, { rating: string; comment: string }>
  >({});
  const [showDetailedEval, setShowDetailedEval] = useState(false);

  // Mock metadata for signatures
  const signatureMetadata = {
    timestamp: new Date().toLocaleString(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-US"
            : "fr-CH"
    ),
    location: { city: "Lausanne", canton: "VD" },
    ipAddress: "192.168.1.100",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LessonEvaluation>({
    resolver: zodResolver(LessonEvaluationSchema),
    defaultValues: {
      lessonId: mockLesson.id,
      studentId: mockLesson.student.id,
      instructorId: mockLesson.instructor.id,
      date: mockLesson.date,
      duration: mockLesson.duration,
      category: mockLesson.category,
      vehicleId: mockLesson.vehicle.id,
      meetingPoint: mockLesson.meetingPoint,
      themes: [],
      studentAbsent: false,
    },
  });

  const generalComment = watch("generalComment");

  const handleThemeToggle = (themeId: string) => {
    const newThemes = selectedThemes.includes(themeId)
      ? selectedThemes.filter((t) => t !== themeId)
      : [...selectedThemes, themeId];
    setSelectedThemes(newThemes);
    setValue("themes", newThemes);
  };

  const handleRatingSelect = (rating: string) => {
    setGlobalRating(rating);
    setValue("globalRating", rating as any);
  };

  const handleSafetyConcernToggle = (concern: string) => {
    const newConcerns = safetyConcerns.includes(concern)
      ? safetyConcerns.filter((c) => c !== concern)
      : [...safetyConcerns, concern];
    setSafetyConcerns(newConcerns);
    setValue("safetyConcerns", newConcerns);
  };

  const onSubmit = async (data: LessonEvaluation) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Evaluation submitted:", data);
      setIsEvaluationSaved(true);
      setPendingEvaluationsCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      alert(
        locale === "fr"
          ? "Erreur lors de l'enregistrement"
          : locale === "de"
            ? "Fehler beim Speichern"
            : locale === "it"
              ? "Errore durante il salvataggio"
              : "Error saving"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    selectedThemes.length > 0 &&
    globalRating &&
    commentLength >= 50 &&
    commentLength <= 500 &&
    instructorSignature &&
    (studentSignature || studentAbsent);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
              <p className="text-muted-foreground mt-1">
                {t.lessonContext.title}
              </p>
            </div>
            {isEvaluationSaved && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />

                  {t.actions.downloadPDF}
                </Button>
                <Button variant="outline" size="sm">
                  <SendIcon className="h-4 w-4 mr-2" />

                  {t.actions.sendToStudent}
                </Button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {isEvaluationSaved && (
            <Alert className="mt-4 border-green-600 bg-green-50 dark:bg-green-950">
              <CheckCircle2Icon className="h-4 w-4 text-green-600" />

              <AlertDescription className="text-green-800 dark:text-green-200">
                {t.success.saved} {t.success.thankYou}
              </AlertDescription>
            </Alert>
          )}

          {/* Pending Evaluations Alert */}
          {isEvaluationSaved && pendingEvaluationsCount > 0 && (
            <Alert className="mt-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
              <AlertTriangleIcon className="h-4 w-4 text-orange-600" />

              <AlertDescription className="flex items-center justify-between">
                <span className="text-orange-800 dark:text-orange-200">
                  {pendingEvaluationsCount} {t.pending.alert}
                </span>
                <Button variant="outline" size="sm" className="ml-4">
                  {t.pending.evaluateNext}
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Lesson Context Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.lessonContext.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={mockLesson.student.avatar}
                  alt={mockLesson.student.name}
                />

                <AvatarFallback>
                  {mockLesson.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-lg">
                  {mockLesson.student.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.lessonContext.student}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  {t.lessonContext.date}:
                </span>
                <span className="font-medium">15.01.2025 14:00</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  {t.lessonContext.duration}:
                </span>
                <Badge variant="secondary">{mockLesson.duration} min</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {t.lessonContext.category}:
                </span>
                <Badge>{mockLesson.category}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CarIcon className="h-4 w-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  {t.lessonContext.vehicle}:
                </span>
                <span className="font-medium">
                  {mockLesson.vehicle.plate} - {mockLesson.vehicle.model}
                </span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                <span className="text-muted-foreground">
                  {t.lessonContext.meetingPoint}:
                </span>
                <span className="font-medium">{mockLesson.meetingPoint}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Themes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.themes.title}
                <Badge variant="destructive" className="text-xs">
                  {t.themes.required}
                </Badge>
              </CardTitle>
              <CardDescription>{t.themes.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {Object.entries(LDriveThemes).map(([category, themes]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-sm font-medium">
                      {
                        t.themes.categories[
                          category as keyof typeof t.themes.categories
                        ]
                      }
                      {selectedThemes.some((st) =>
                        themes.includes(st as any)
                      ) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {
                            selectedThemes.filter((st) =>
                              themes.includes(st as any)
                            ).length
                          }
                        </Badge>
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {themes.map((theme) => (
                          <div
                            key={theme}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={theme}
                              checked={selectedThemes.includes(theme)}
                              onCheckedChange={() => handleThemeToggle(theme)}
                            />

                            <label
                              htmlFor={theme}
                              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {
                                t.themes.items[
                                  theme as keyof typeof t.themes.items
                                ]
                              }
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {selectedThemes.includes("other_custom") && (
                <div className="mt-4">
                  <Input
                    placeholder={t.themes.customPlaceholder}
                    {...register("customTheme")}
                    maxLength={100}
                  />
                </div>
              )}

              {selectedThemes.length === 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>{t.errors.themesRequired}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Selected Themes Display */}
          {selectedThemes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.themes.title} - {selectedThemes.length}{" "}
                  {locale === "fr"
                    ? "sélectionné(s)"
                    : locale === "de"
                      ? "ausgewählt"
                      : locale === "it"
                        ? "selezionato/i"
                        : "selected"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedThemes.map((theme) => (
                    <Badge key={theme} variant="secondary" className="text-sm">
                      {t.themes.items[theme as keyof typeof t.themes.items]}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Global Rating Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.globalRating.title}
                <Badge variant="destructive" className="text-xs">
                  {t.globalRating.required}
                </Badge>
              </CardTitle>
              <CardDescription>{t.globalRating.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.globalRating.explanation}
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                {(["1", "2", "3", "4", "5"] as const).map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingSelect(rating)}
                    className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                      globalRating === rating
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: parseInt(rating) }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            globalRating === rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">
                        {t.globalRating.ratings[rating]}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {t.globalRating.descriptions[rating]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {!globalRating && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>{t.errors.ratingRequired}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Detailed Theme Evaluation Section */}
          {selectedThemes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {t.detailedEvaluation.title}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetailedEval(!showDetailedEval)}
                  >
                    {showDetailedEval
                      ? locale === "fr"
                        ? "Masquer"
                        : locale === "de"
                          ? "Verbergen"
                          : locale === "it"
                            ? "Nascondere"
                            : "Hide"
                      : locale === "fr"
                        ? "Afficher"
                        : locale === "de"
                          ? "Anzeigen"
                          : locale === "it"
                            ? "Mostrare"
                            : "Show"}
                  </Button>
                </CardTitle>
                <CardDescription>
                  {t.detailedEvaluation.subtitle}
                </CardDescription>
              </CardHeader>
              {showDetailedEval && (
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {selectedThemes.map((themeId) => (
                      <AccordionItem key={themeId} value={themeId}>
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center gap-2">
                            <span>
                              {
                                t.themes.items[
                                  themeId as keyof typeof t.themes.items
                                ]
                              }
                            </span>
                            {themeEvaluations[themeId]?.rating && (
                              <Badge variant="secondary" className="text-xs">
                                {themeEvaluations[themeId].rating}★
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                {t.detailedEvaluation.themeRating}
                              </label>
                              <div className="flex gap-2">
                                {["1", "2", "3", "4", "5"].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => {
                                      setThemeEvaluations({
                                        ...themeEvaluations,
                                        [themeId]: {
                                          ...themeEvaluations[themeId],
                                          rating,
                                        },
                                      });
                                    }}
                                    className={`p-2 border rounded transition-all ${
                                      themeEvaluations[themeId]?.rating ===
                                      rating
                                        ? "border-primary bg-primary/10"
                                        : "border-border hover:border-primary/50"
                                    }`}
                                  >
                                    <StarIcon
                                      className={`h-4 w-4 ${
                                        themeEvaluations[themeId]?.rating ===
                                        rating
                                          ? "fill-primary text-primary"
                                          : "text-muted"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                {t.detailedEvaluation.themeComment}
                              </label>
                              <Textarea
                                placeholder={
                                  t.detailedEvaluation.commentPlaceholder
                                }
                                value={themeEvaluations[themeId]?.comment || ""}
                                onChange={(e) => {
                                  setThemeEvaluations({
                                    ...themeEvaluations,
                                    [themeId]: {
                                      ...themeEvaluations[themeId],
                                      comment: e.target.value,
                                    },
                                  });
                                }}
                                rows={2}
                                maxLength={150}
                              />

                              <p className="text-xs text-muted-foreground mt-1">
                                {t.detailedEvaluation.commentMaxLength}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              )}
            </Card>
          )}

          {/* General Comment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.generalComment.title}
                <Badge variant="destructive" className="text-xs">
                  {t.generalComment.required}
                </Badge>
              </CardTitle>
              <CardDescription>{t.generalComment.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={t.generalComment.placeholder}
                {...register("generalComment")}
                onChange={(e) => {
                  setCommentLength(e.target.value.length);
                  register("generalComment").onChange(e);
                }}
                rows={6}
                maxLength={500}
                className="resize-none"
              />

              <div className="flex items-center justify-between text-sm">
                <span
                  className={
                    commentLength < 50
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {commentLength < 50
                    ? t.generalComment.minLength
                    : t.generalComment.maxLength}
                </span>
                <span className="text-muted-foreground">
                  {commentLength} {t.generalComment.currentLength}
                </span>
              </div>

              {commentLength > 0 && commentLength < 50 && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>
                    {t.errors.commentTooShort}
                  </AlertDescription>
                </Alert>
              )}
              {commentLength > 500 && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>{t.errors.commentTooLong}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Progress Estimate Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t.progressEstimate.title}</CardTitle>
              <CardDescription>{t.progressEstimate.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Slider
                  value={progressValue}
                  onValueChange={(value) => {
                    setProgressValue(value);
                    setValue("progressEstimate", value[0]);
                  }}
                  max={100}
                  step={5}
                  className="w-full"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.progressEstimate.percentage}
                  </span>
                  <Badge
                    variant={
                      progressValue[0] < 30
                        ? "destructive"
                        : progressValue[0] < 70
                          ? "secondary"
                          : "default"
                    }
                  >
                    {progressValue[0]}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t.recommendations.title}</CardTitle>
              <CardDescription>{t.recommendations.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t.recommendations.placeholder}
                {...register("recommendations")}
                rows={3}
                maxLength={300}
              />

              <p className="text-xs text-muted-foreground mt-2">
                {t.recommendations.maxLength}
              </p>
            </CardContent>
          </Card>

          {/* Safety Concerns Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t.safetyConcerns.title}</CardTitle>
              <CardDescription>{t.safetyConcerns.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {Object.entries(t.safetyConcerns.items).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`safety-${key}`}
                      checked={safetyConcerns.includes(key)}
                      onCheckedChange={() => handleSafetyConcernToggle(key)}
                    />

                    <label
                      htmlFor={`safety-${key}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {safetyConcerns.includes("other_custom") && (
                <Input
                  placeholder={t.safetyConcerns.customPlaceholder}
                  {...register("safetyConcernsCustom")}
                  maxLength={200}
                />
              )}

              {safetyConcerns.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>{t.safetyConcerns.alert}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Digital Signatures Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.signatures.title}
                <Badge variant="destructive" className="text-xs">
                  {t.signatures.subtitle}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-primary/50 bg-primary/5">
                <AlertDescription className="text-sm">
                  {t.signatures.legalNotice}
                </AlertDescription>
              </Alert>

              {/* Signature Metadata Display */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-semibold mb-2">
                  {locale === "fr"
                    ? "Métadonnées de signature"
                    : locale === "de"
                      ? "Signatur-Metadaten"
                      : locale === "it"
                        ? "Metadati firma"
                        : "Signature Metadata"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">
                      {t.signatures.metadata.timestamp}:
                    </span>
                    <p className="font-medium mt-1">
                      {signatureMetadata.timestamp}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {t.signatures.metadata.location}:
                    </span>
                    <p className="font-medium mt-1">
                      {signatureMetadata.location.city},{" "}
                      {signatureMetadata.location.canton}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {t.signatures.metadata.ipAddress}:
                    </span>
                    <p className="font-medium mt-1">
                      {signatureMetadata.ipAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instructor Signature */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    {t.signatures.instructor}
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 h-40 flex items-center justify-center bg-muted/20">
                    {instructorSignature ? (
                      <CheckCircle2Icon className="h-12 w-12 text-green-600" />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t.signatures.sign}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setInstructorSignature("signed")}
                      className="flex-1"
                    >
                      {t.signatures.sign}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setInstructorSignature("")}
                    >
                      {t.signatures.clear}
                    </Button>
                  </div>
                </div>

                {/* Student Signature */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    {t.signatures.student}
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 h-40 flex items-center justify-center bg-muted/20">
                    {studentSignature ? (
                      <CheckCircle2Icon className="h-12 w-12 text-green-600" />
                    ) : studentAbsent ? (
                      <p className="text-sm text-muted-foreground">
                        {t.signatures.studentAbsent}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t.signatures.sign}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStudentSignature("signed");
                        setStudentAbsent(false);
                      }}
                      className="flex-1"
                      disabled={studentAbsent}
                    >
                      {t.signatures.sign}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStudentSignature("")}
                    >
                      {t.signatures.clear}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="student-absent"
                      checked={studentAbsent}
                      onCheckedChange={(checked) => {
                        setStudentAbsent(checked as boolean);
                        setValue("studentAbsent", checked as boolean);
                        if (checked) setStudentSignature("");
                      }}
                    />

                    <label
                      htmlFor="student-absent"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {t.signatures.studentAbsent}
                    </label>
                  </div>
                </div>
              </div>

              {/* Validation Errors for Signatures */}
              {!instructorSignature && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>
                    {t.errors.instructorSignatureRequired}
                  </AlertDescription>
                </Alert>
              )}
              {!studentSignature && !studentAbsent && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>
                    {t.errors.studentSignatureRequired}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Validation Summary */}
          {!isFormValid && (
            <Card className="border-destructive bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-base text-destructive flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5" />

                  {locale === "fr"
                    ? "Formulaire incomplet"
                    : locale === "de"
                      ? "Formular unvollständig"
                      : locale === "it"
                        ? "Modulo incompleto"
                        : "Form Incomplete"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-destructive">
                  {selectedThemes.length === 0 && (
                    <li>• {t.errors.themesRequired}</li>
                  )}
                  {!globalRating && <li>• {t.errors.ratingRequired}</li>}
                  {commentLength < 50 && <li>• {t.errors.commentTooShort}</li>}
                  {commentLength > 500 && <li>• {t.errors.commentTooLong}</li>}
                  {!instructorSignature && (
                    <li>• {t.errors.instructorSignatureRequired}</li>
                  )}
                  {!studentSignature && !studentAbsent && (
                    <li>• {t.errors.studentSignatureRequired}</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={!isFormValid || isSubmitting || isEvaluationSaved}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />

                  {t.actions.saving}
                </>
              ) : isEvaluationSaved ? (
                <>
                  <CheckCircle2Icon className="mr-2 h-4 w-4" />

                  {locale === "fr"
                    ? "Évaluation enregistrée"
                    : locale === "de"
                      ? "Bewertung gespeichert"
                      : locale === "it"
                        ? "Valutazione salvata"
                        : "Evaluation Saved"}
                </>
              ) : (
                t.actions.save
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isSubmitting}
            >
              {t.actions.cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
