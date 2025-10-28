/**
 * VIAMENTOR - Instructors Bulk Actions Bar
 * Barre actions groupées sticky bottom avec dialogs
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  MailIcon,
  DownloadIcon,
  UserCheckIcon,
  UserXIcon,
  XIcon,
} from "lucide-react";
import { MOCK_MESSAGE_TEMPLATES } from "@/polymet/data/viamentor-instructors-availability-data";
import type { InstructorStatus } from "@/polymet/data/viamentor-instructors-realtime-hook";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BulkActionsBarProps {
  selectedCount: number;
  selectedIds: string[];
  locale?: "fr" | "de" | "it" | "en";
  onClearSelection?: () => void;
  onSendMessage?: (data: {
    subject: string;
    body: string;
    instructorIds: string[];
  }) => void;
  onExport?: (format: "excel" | "csv", instructorIds: string[]) => void;
  onChangeStatus?: (data: {
    status: InstructorStatus;
    startDate: Date;
    endDate?: Date;
    instructorIds: string[];
  }) => void;
  onSuspend?: (data: { reason: string; instructorIds: string[] }) => void;
}

export function ViaMenutorInstructorsBulkActions({
  selectedCount,
  selectedIds,
  locale = "fr",
  onClearSelection,
  onSendMessage,
  onExport,
  onChangeStatus,
  onSuspend,
}: BulkActionsBarProps) {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);

  // Message dialog state
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // Status dialog state
  const [newStatus, setNewStatus] = useState<InstructorStatus>("Disponible");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Suspend dialog state
  const [suspendReason, setSuspendReason] = useState("");

  if (selectedCount === 0) return null;

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = MOCK_MESSAGE_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setMessageSubject(template.subject);
      setMessageBody(template.body);
    }
  };

  const handleSendMessage = () => {
    onSendMessage?.({
      subject: messageSubject,
      body: messageBody,
      instructorIds: selectedIds,
    });
    setMessageDialogOpen(false);
    setMessageSubject("");
    setMessageBody("");
    setSelectedTemplate("");
  };

  const handleChangeStatus = () => {
    onChangeStatus?.({
      status: newStatus,
      startDate,
      endDate,
      instructorIds: selectedIds,
    });
    setStatusDialogOpen(false);
    setNewStatus("Disponible");
    setStartDate(new Date());
    setEndDate(undefined);
  };

  const handleSuspend = () => {
    onSuspend?.({
      reason: suspendReason,
      instructorIds: selectedIds,
    });
    setSuspendDialogOpen(false);
    setSuspendReason("");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-base px-3 py-1">
                {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="h-8"
              >
                <XIcon className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessageDialogOpen(true)}
              >
                <MailIcon className="h-4 w-4 mr-2" />
                Envoyer message
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport?.("excel", selectedIds)}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Exporter
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusDialogOpen(true)}
              >
                <UserCheckIcon className="h-4 w-4 mr-2" />
                Changer statut
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSuspendDialogOpen(true)}
              >
                <UserXIcon className="h-4 w-4 mr-2" />
                Suspendre
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Envoyer un message groupé</DialogTitle>
            <DialogDescription>
              Message envoyé à {selectedCount} moniteur
              {selectedCount > 1 ? "s" : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Modèle (optionnel)</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un modèle..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_MESSAGE_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Sujet du message..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Votre message..."
                rows={8}
              />

              <p className="text-xs text-muted-foreground">
                Variables disponibles: {"{prenom}"}, {"{nom}"}, {"{date}"}
              </p>
            </div>

            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Aperçu:</p>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Sujet:</strong> {messageSubject || "(vide)"}
                </p>
                <p className="whitespace-pre-wrap">{messageBody || "(vide)"}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMessageDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!messageSubject || !messageBody}
            >
              Envoyer à {selectedCount} moniteur{selectedCount > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le statut</DialogTitle>
            <DialogDescription>
              Modifier le statut de {selectedCount} moniteur
              {selectedCount > 1 ? "s" : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nouveau statut</Label>
              <Select
                value={newStatus}
                onValueChange={(value) =>
                  setNewStatus(value as InstructorStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="En leçon">En leçon</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Congé">Congé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {format(startDate, "PPP", { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date de fin (optionnel)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {endDate
                      ? format(endDate, "PPP", { locale: fr })
                      : "Sélectionner..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleChangeStatus}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspendre les moniteurs</DialogTitle>
            <DialogDescription>
              Suspendre {selectedCount} moniteur{selectedCount > 1 ? "s" : ""}.
              Une notification sera envoyée par email.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Raison de la suspension</Label>
              <Textarea
                id="reason"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Expliquez la raison de la suspension..."
                rows={5}
              />
            </div>

            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">
                ⚠️ Cette action suspendra immédiatement les moniteurs
                sélectionnés et annulera leurs leçons planifiées.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSuspendDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleSuspend}
              disabled={!suspendReason}
            >
              Suspendre {selectedCount} moniteur{selectedCount > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
