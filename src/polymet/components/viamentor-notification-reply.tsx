/**
 * VIAMENTOR - Notification Reply
 * Composant réponse inline avec rich editor, templates et attachments
 */

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  LinkIcon,
  SmileIcon,
  PaperclipIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export type NotificationsLocale = "fr" | "de" | "it" | "en";

interface NotificationReplyProps {
  notificationId: string;
  recipients: string[];
  ccRecipients?: string[];
  locale?: NotificationsLocale;
  onSend: (content: string, attachments: File[]) => Promise<void>;
  className?: string;
}

interface QuickTemplate {
  id: string;
  label: string;
  content: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    reply: "Répondre",
    placeholder: "Écrivez votre réponse...",
    charLimit: "caractères",
    attachFile: "Joindre fichier",
    templates: "Réponses rapides",
    selectTemplate: "Sélectionner un modèle",
    to: "À:",
    cc: "Cc:",
    send: "Envoyer réponse",
    cancel: "Annuler",
    sending: "Envoi en cours...",
    success: "Réponse envoyée avec succès",
    error: "Échec envoi - Réessayer",
    fileSizeError: "Fichier trop volumineux (max 5MB)",
    fileTypeError: "Type de fichier non autorisé",
    templates: {
      welcome: "Merci pour votre inscription",
      lessonConfirmed: "Leçon confirmée - rendez-vous",
      paymentReceived: "Paiement reçu - merci",
      custom: "Personnalisé",
    },
  },
  de: {
    reply: "Antworten",
    placeholder: "Schreiben Sie Ihre Antwort...",
    charLimit: "Zeichen",
    attachFile: "Datei anhängen",
    templates: "Schnellantworten",
    selectTemplate: "Vorlage auswählen",
    to: "An:",
    cc: "Cc:",
    send: "Antwort senden",
    cancel: "Abbrechen",
    sending: "Wird gesendet...",
    success: "Antwort erfolgreich gesendet",
    error: "Fehler beim Senden - Erneut versuchen",
    fileSizeError: "Datei zu groß (max 5MB)",
    fileTypeError: "Dateityp nicht erlaubt",
    templates: {
      welcome: "Danke für Ihre Anmeldung",
      lessonConfirmed: "Lektion bestätigt - Termin",
      paymentReceived: "Zahlung erhalten - Danke",
      custom: "Benutzerdefiniert",
    },
  },
  it: {
    reply: "Rispondi",
    placeholder: "Scrivi la tua risposta...",
    charLimit: "caratteri",
    attachFile: "Allega file",
    templates: "Risposte rapide",
    selectTemplate: "Seleziona modello",
    to: "A:",
    cc: "Cc:",
    send: "Invia risposta",
    cancel: "Annulla",
    sending: "Invio in corso...",
    success: "Risposta inviata con successo",
    error: "Invio fallito - Riprova",
    fileSizeError: "File troppo grande (max 5MB)",
    fileTypeError: "Tipo di file non consentito",
    templates: {
      welcome: "Grazie per la registrazione",
      lessonConfirmed: "Lezione confermata - appuntamento",
      paymentReceived: "Pagamento ricevuto - grazie",
      custom: "Personalizzato",
    },
  },
  en: {
    reply: "Reply",
    placeholder: "Write your reply...",
    charLimit: "characters",
    attachFile: "Attach file",
    templates: "Quick responses",
    selectTemplate: "Select template",
    to: "To:",
    cc: "Cc:",
    send: "Send reply",
    cancel: "Cancel",
    sending: "Sending...",
    success: "Reply sent successfully",
    error: "Send failed - Retry",
    fileSizeError: "File too large (max 5MB)",
    fileTypeError: "File type not allowed",
    templates: {
      welcome: "Thank you for registration",
      lessonConfirmed: "Lesson confirmed - appointment",
      paymentReceived: "Payment received - thank you",
      custom: "Custom",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationReply({
  notificationId,
  recipients,
  ccRecipients = [],
  locale = "fr",
  onSend,
  className,
}: NotificationReplyProps) {
  const t = translations[locale];
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const MAX_CHARS = 500;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];

  const quickTemplates: QuickTemplate[] = [
    {
      id: "welcome",
      label: t.templates.welcome,
      content: `Bonjour,\n\nMerci pour votre inscription à notre auto-école. Nous sommes ravis de vous accompagner dans votre formation.\n\nCordialement,\nL'équipe ViaMenutor`,
    },
    {
      id: "lesson-confirmed",
      label: t.templates.lessonConfirmed,
      content: `Bonjour,\n\nVotre leçon est confirmée. Rendez-vous comme prévu.\n\nÀ bientôt,\nVotre moniteur`,
    },
    {
      id: "payment-received",
      label: t.templates.paymentReceived,
      content: `Bonjour,\n\nNous avons bien reçu votre paiement. Merci pour votre confiance.\n\nCordialement,\nLe service comptabilité`,
    },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: t.error,
          description: t.fileSizeError,
          variant: "destructive",
        });
        continue;
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: t.error,
          description: t.fileTypeError,
          variant: "destructive",
        });
        continue;
      }

      setAttachments((prev) => [...prev, file]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = quickTemplates.find((t) => t.id === templateId);
    if (template) {
      setContent(template.content);
    }
  };

  const handleSend = async () => {
    if (!content.trim()) return;

    setIsSending(true);
    try {
      await onSend(content, attachments);
      toast({
        title: t.success,
        description: "",
      });
      setContent("");
      setAttachments([]);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: t.error,
        description: "",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    setAttachments([]);
    setIsOpen(false);
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? "reply" : ""}
      onValueChange={(value) => setIsOpen(value === "reply")}
      className={cn("w-full", className)}
    >
      <AccordionItem value="reply" className="border-none">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <SendIcon className="h-4 w-4" />

            <span className="font-medium">{t.reply}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-4">
            {/* Recipients */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {t.to}
                </span>
                {recipients.map((recipient, index) => (
                  <Badge key={index} variant="secondary">
                    {recipient}
                  </Badge>
                ))}
              </div>
              {ccRecipients.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t.cc}
                  </span>
                  {ccRecipients.map((recipient, index) => (
                    <Badge key={index} variant="secondary">
                      {recipient}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Templates Dropdown */}
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectTemplate} />
              </SelectTrigger>
              <SelectContent>
                {quickTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rich Editor */}
            <div className="relative">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.placeholder}
                className={cn(
                  "min-h-[150px] resize-none",
                  isOverLimit && "border-destructive"
                )}
              />

              <div
                className={cn(
                  "absolute bottom-2 right-2 text-xs",
                  isOverLimit ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {charCount}/{MAX_CHARS} {t.charLimit}
              </div>
            </div>

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <PaperclipIcon className="h-3 w-3" />

                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <button
                      onClick={() => handleRemoveAttachment(index)}
                      className="hover:text-destructive"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PaperclipIcon className="mr-2 h-4 w-4" />

                  {t.attachFile}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSending}
                >
                  {t.cancel}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!content.trim() || isOverLimit || isSending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isSending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      {t.sending}
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-4 w-4" />

                      {t.send}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
