/**
 * VIAMENTOR - Moderation Queue
 * Composant file modération réponses IA avec actions complètes
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckIcon,
  XIcon,
  EditIcon,
  RefreshCwIcon,
  UserIcon,
  ClockIcon,
  StarIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  EyeIcon,
} from "lucide-react";
import { aiResponsesTranslations } from "@/polymet/data/viamentor-ai-responses-i18n";
import type { AIResponsesLocale } from "@/polymet/data/viamentor-ai-responses-i18n";
import type {
  AIGeneratedResponse,
  ResponseVersion,
} from "@/polymet/data/viamentor-ai-responses-data";

// ============================================================================
// TYPES
// ============================================================================

interface ModerationQueueProps {
  pendingResponses: AIGeneratedResponse[];
  locale?: AIResponsesLocale;
  onApprove?: (responseId: string, notes?: string) => void;
  onReject?: (responseId: string, reason: string) => void;
  onEdit?: (responseId: string, newText: string, notes?: string) => void;
  onRegenerate?: (responseId: string) => void;
  onManualResponse?: (responseId: string) => void;
}

interface ModerationAction {
  type: "approve" | "reject" | "edit" | "regenerate" | "manual";
  responseId: string;
  notes?: string;
  newText?: string;
  reason?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ModerationQueue({
  pendingResponses,
  locale = "fr",
  onApprove,
  onReject,
  onEdit,
  onRegenerate,
  onManualResponse,
}: ModerationQueueProps) {
  const t = aiResponsesTranslations[locale];
  const [selectedResponse, setSelectedResponse] =
    useState<AIGeneratedResponse | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: ModerationAction["type"];
    response: AIGeneratedResponse | null;
  }>({
    open: false,
    type: "approve",
    response: null,
  });
  const [editedText, setEditedText] = useState("");
  const [moderationNotes, setModerationNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const openActionDialog = (
    type: ModerationAction["type"],
    response: AIGeneratedResponse
  ) => {
    setActionDialog({ open: true, type, response });
    setEditedText(response.generatedText);
    setModerationNotes("");
    setRejectionReason("");
  };

  const closeActionDialog = () => {
    setActionDialog({ open: false, type: "approve", response: null });
    setEditedText("");
    setModerationNotes("");
    setRejectionReason("");
  };

  const handleAction = () => {
    if (!actionDialog.response) return;

    const { type, response } = actionDialog;

    switch (type) {
      case "approve":
        onApprove?.(response.id, moderationNotes || undefined);
        break;
      case "reject":
        onReject?.(response.id, rejectionReason);
        break;
      case "edit":
        onEdit?.(response.id, editedText, moderationNotes || undefined);
        break;
      case "regenerate":
        onRegenerate?.(response.id);
        break;
      case "manual":
        onManualResponse?.(response.id);
        break;
    }

    closeActionDialog();
  };

  const getSentimentBadge = (
    sentiment: "positive" | "neutral" | "negative"
  ) => {
    const config = {
      positive: {
        variant: "default",
        color: "bg-green-600",
        icon: ThumbsUpIcon,
      },
      neutral: { variant: "secondary", color: "bg-orange-500", icon: EyeIcon },
      negative: {
        variant: "destructive",
        color: "bg-red-600",
        icon: ThumbsDownIcon,
      },
    } as const;

    const { variant, icon: Icon } = config[sentiment];

    return (
      <Badge variant={variant} className="text-xs">
        <Icon className="h-3 w-3 mr-1" />

        {t.moderation.sentiment[sentiment]}
      </Badge>
    );
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-orange-500";
    return "text-red-600";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="h-5 w-5" />

            {t.moderation.title}
          </CardTitle>
          <CardDescription>
            {pendingResponses.length} réponse(s) en attente de modération
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Liste des réponses en attente */}
      <div className="space-y-4">
        {pendingResponses.map((response) => (
          <Card key={response.id} className="w-full">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Header avec infos */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />

                        <span className="font-medium">
                          {response.originalReview.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < response.originalReview.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {response.originalReview.rating}/5
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />

                        {formatDate(response.originalReview.date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSentimentBadge(response.sentiment)}
                      <Badge variant="outline" className="text-xs">
                        Template: {response.templateUsed}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {t.moderation.qualityScore}:
                      </span>
                      <span
                        className={`font-medium ${getQualityColor(response.qualityScore)}`}
                      >
                        {response.qualityScore}%
                      </span>
                    </div>
                    <Progress
                      value={response.qualityScore}
                      className="w-24 h-2"
                    />
                  </div>
                </div>

                <Separator />

                {/* Avis original */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    {t.moderation.originalReview}
                  </Label>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">"{response.originalReview.text}"</p>
                  </div>
                </div>

                {/* Réponse IA générée */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    {t.moderation.aiResponse}
                  </Label>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                    <p className="text-sm">{response.generatedText}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Généré le {formatDate(response.createdAt)} •{" "}
                      {response.generatedText.split(" ").length} mots
                    </div>
                  </div>
                </div>

                {/* Versions alternatives si disponibles */}
                {response.versions.length > 1 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t.moderation.versions} ({response.versions.length})
                    </Label>
                    <div className="space-y-2">
                      {response.versions.map((version, index) => (
                        <div
                          key={version.id}
                          className={`p-3 rounded border text-sm ${
                            version.isSelected
                              ? "bg-primary/10 border-primary"
                              : "bg-muted border-border"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">
                              Version {index + 1}{" "}
                              {version.isSelected && "(Sélectionnée)"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Score: {version.qualityScore}%
                            </span>
                          </div>
                          <p>{version.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Actions de modération */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => openActionDialog("approve", response)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckIcon className="h-4 w-4 mr-2" />

                    {t.moderation.actions.approve}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => openActionDialog("edit", response)}
                  >
                    <EditIcon className="h-4 w-4 mr-2" />

                    {t.moderation.actions.edit}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => openActionDialog("regenerate", response)}
                  >
                    <RefreshCwIcon className="h-4 w-4 mr-2" />

                    {t.moderation.actions.regenerate}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => openActionDialog("manual", response)}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />

                    {t.moderation.actions.manual}
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => openActionDialog("reject", response)}
                  >
                    <XIcon className="h-4 w-4 mr-2" />

                    {t.moderation.actions.reject}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* État vide */}
      {pendingResponses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquareIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />

            <h3 className="text-lg font-medium mb-2">
              Aucune réponse en attente
            </h3>
            <p className="text-muted-foreground">
              Toutes les réponses IA ont été modérées ou aucun avis négatif n'a
              été reçu récemment.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialog d'action */}
      <Dialog open={actionDialog.open} onOpenChange={closeActionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === "approve" && "Approuver la réponse"}
              {actionDialog.type === "reject" && "Rejeter la réponse"}
              {actionDialog.type === "edit" && "Modifier la réponse"}
              {actionDialog.type === "regenerate" && "Régénérer la réponse"}
              {actionDialog.type === "manual" && "Réponse manuelle"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.type === "approve" &&
                "Publier cette réponse sur Google Business Profile"}
              {actionDialog.type === "reject" &&
                "Rejeter cette réponse et ne pas publier"}
              {actionDialog.type === "edit" &&
                "Modifier le texte avant publication"}
              {actionDialog.type === "regenerate" &&
                "Générer une nouvelle version avec l'IA"}
              {actionDialog.type === "manual" &&
                "Écrire une réponse personnalisée"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Édition du texte */}
            {actionDialog.type === "edit" && (
              <div className="space-y-2">
                <Label htmlFor="editedText">Texte de la réponse</Label>
                <Textarea
                  id="editedText"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="min-h-[120px]"
                />

                <p className="text-xs text-muted-foreground">
                  {editedText.split(" ").length} mots
                </p>
              </div>
            )}

            {/* Raison du rejet */}
            {actionDialog.type === "reject" && (
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Raison du rejet</Label>
                <Select
                  value={rejectionReason}
                  onValueChange={setRejectionReason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une raison..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate">
                      Contenu inapproprié
                    </SelectItem>
                    <SelectItem value="generic">Trop générique</SelectItem>
                    <SelectItem value="tone">Ton inadéquat</SelectItem>
                    <SelectItem value="factual">Erreur factuelle</SelectItem>
                    <SelectItem value="other">Autre raison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Confirmation régénération */}
            {actionDialog.type === "regenerate" && (
              <Alert>
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>
                  Une nouvelle réponse sera générée avec l'IA. La version
                  actuelle sera conservée dans l'historique.
                </AlertDescription>
              </Alert>
            )}

            {/* Notes de modération */}
            {(actionDialog.type === "approve" ||
              actionDialog.type === "edit") && (
              <div className="space-y-2">
                <Label htmlFor="moderationNotes">
                  {t.moderation.notes.label} (optionnel)
                </Label>
                <Textarea
                  id="moderationNotes"
                  value={moderationNotes}
                  onChange={(e) => setModerationNotes(e.target.value)}
                  placeholder={t.moderation.notes.placeholder}
                  className="min-h-[80px]"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeActionDialog}>
              Annuler
            </Button>
            <Button
              onClick={handleAction}
              disabled={
                (actionDialog.type === "reject" && !rejectionReason) ||
                (actionDialog.type === "edit" && !editedText.trim())
              }
            >
              {actionDialog.type === "approve" && "Approuver et publier"}
              {actionDialog.type === "reject" && "Rejeter"}
              {actionDialog.type === "edit" && "Modifier et publier"}
              {actionDialog.type === "regenerate" && "Régénérer"}
              {actionDialog.type === "manual" && "Continuer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
