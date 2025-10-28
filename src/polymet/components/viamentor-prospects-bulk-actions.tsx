/**
 * VIAMENTOR - Prospects Bulk Actions
 * Barre actions groupées sticky bottom avec dialogs assign/status/email/delete
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  UserPlusIcon,
  RefreshCwIcon,
  MailIcon,
  DownloadIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import type {
  ProspectStatus,
  TeamMember,
} from "@/polymet/data/viamentor-prospects-data";
import type { ProspectsLocale } from "@/polymet/data/viamentor-prospects-i18n";
import { getProspectsTranslations } from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectsBulkActionsProps {
  selectedCount: number;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
  onAssign?: (memberId: string) => void;
  onChangeStatus?: (status: ProspectStatus) => void;
  onSendEmail?: (subject: string, message: string) => void;
  onExportCSV?: () => void;
  onDelete?: () => void;
  onClearSelection?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectsBulkActions({
  selectedCount,
  teamMembers,
  locale = "fr",
  onAssign,
  onChangeStatus,
  onSendEmail,
  onExportCSV,
  onDelete,
  onClearSelection,
}: ProspectsBulkActionsProps) {
  const t = getProspectsTranslations(locale);

  // Dialog states
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<ProspectStatus | "">("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  if (selectedCount === 0) return null;

  const handleAssign = () => {
    if (selectedMember) {
      onAssign?.(selectedMember);
      setAssignDialogOpen(false);
      setSelectedMember("");
    }
  };

  const handleChangeStatus = () => {
    if (selectedStatus) {
      onChangeStatus?.(selectedStatus);
      setStatusDialogOpen(false);
      setSelectedStatus("");
    }
  };

  const handleSendEmail = () => {
    if (emailSubject && emailMessage) {
      onSendEmail?.(emailSubject, emailMessage);
      setEmailDialogOpen(false);
      setEmailSubject("");
      setEmailMessage("");
    }
  };

  const handleDelete = () => {
    onDelete?.();
    setDeleteDialogOpen(false);
  };

  const statuses: ProspectStatus[] = [
    "new",
    "contacted",
    "interested",
    "appointment",
    "hot",
    "converted",
    "lost",
  ];

  return (
    <>
      {/* Sticky Bottom Bar */}
      <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 shadow-lg z-50 max-w-4xl w-full mx-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {selectedCount} {t.bulk.selected}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearSelection}
              className="h-8 w-8"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAssignDialogOpen(true)}
              className="gap-2"
            >
              <UserPlusIcon className="h-4 w-4" />

              {t.bulk.assign}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatusDialogOpen(true)}
              className="gap-2"
            >
              <RefreshCwIcon className="h-4 w-4" />

              {t.bulk.changeStatus}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setEmailDialogOpen(true)}
              className="gap-2"
            >
              <MailIcon className="h-4 w-4" />

              {t.bulk.sendEmail}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExportCSV}
              className="gap-2"
            >
              <DownloadIcon className="h-4 w-4" />

              {t.bulk.exportCSV}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="gap-2"
            >
              <Trash2Icon className="h-4 w-4" />

              {t.bulk.delete}
            </Button>
          </div>
        </div>
      </Card>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.bulk.assignDialog.title}</DialogTitle>
            <DialogDescription>
              {t.bulk.assignDialog.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.bulk.assignDialog.selectMember}</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder={t.bulk.assignDialog.selectMember} />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 rounded-full"
                        />

                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignDialogOpen(false)}
            >
              {t.bulk.assignDialog.cancel}
            </Button>
            <Button onClick={handleAssign} disabled={!selectedMember}>
              {t.bulk.assignDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.bulk.statusDialog.title}</DialogTitle>
            <DialogDescription>
              {t.bulk.statusDialog.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.bulk.statusDialog.selectStatus}</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(value as ProspectStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.bulk.statusDialog.selectStatus} />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t.statuses[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
            >
              {t.bulk.statusDialog.cancel}
            </Button>
            <Button onClick={handleChangeStatus} disabled={!selectedStatus}>
              {t.bulk.statusDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.bulk.emailDialog.title}</DialogTitle>
            <DialogDescription>
              {t.bulk.emailDialog.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.bulk.emailDialog.subject}</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Objet de l'email"
              />
            </div>

            <div className="space-y-2">
              <Label>{t.bulk.emailDialog.message}</Label>
              <Textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Votre message..."
                rows={8}
              />

              <p className="text-xs text-muted-foreground">
                Variables disponibles: {"{firstName}"}, {"{lastName}"},{" "}
                {"{category}"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              {t.bulk.emailDialog.cancel}
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!emailSubject || !emailMessage}
            >
              {t.bulk.emailDialog.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.bulk.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {t.bulk.deleteDialog.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              {t.bulk.deleteDialog.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t.bulk.deleteDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
