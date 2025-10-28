/**
 * VIAMENTOR - Temporary Access List
 * Liste autorisations temporaires actives avec actions
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClockIcon,
  XCircleIcon,
  HistoryIcon,
  CalendarIcon,
  Loader2Icon,
} from "lucide-react";
import type {
  TemporaryAccess,
  AssignmentLocale,
} from "@/viamentor/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/viamentor/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface TemporaryAccessListProps {
  temporaryAccess: TemporaryAccess[];
  locale?: AssignmentLocale;
  onExtend: (accessId: string, newEndDate: string) => Promise<void>;
  onRevoke: (accessId: string, reason: string) => Promise<void>;
  onViewHistory: (accessId: string) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TemporaryAccessList({
  temporaryAccess,
  locale = "fr",
  onExtend,
  onRevoke,
  onViewHistory,
  className,
}: TemporaryAccessListProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];

  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<TemporaryAccess | null>(
    null
  );
  const [newEndDate, setNewEndDate] = useState("");
  const [revocationReason, setRevocationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeAccess = temporaryAccess.filter((a) => a.status === "Active");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-600 dark:bg-green-400 text-white">
            {t.status.Active}
          </Badge>
        );

      case "Expired":
        return (
          <Badge variant="secondary">
            {locale === "fr"
              ? "Expirée"
              : locale === "de"
                ? "Abgelaufen"
                : locale === "it"
                  ? "Scaduta"
                  : "Expired"}
          </Badge>
        );

      case "Revoked":
        return (
          <Badge variant="destructive">
            {locale === "fr"
              ? "Révoquée"
              : locale === "de"
                ? "Widerrufen"
                : locale === "it"
                  ? "Revocata"
                  : "Revoked"}
          </Badge>
        );

      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formatter = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
    });
    return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
  };

  const handleExtendClick = (access: TemporaryAccess) => {
    setSelectedAccess(access);
    setNewEndDate(access.endDate.split("T")[0]);
    setExtendDialogOpen(true);
  };

  const handleExtendConfirm = async () => {
    if (!selectedAccess || !newEndDate) return;

    setIsSubmitting(true);
    try {
      await onExtend(selectedAccess.id, newEndDate);
      setExtendDialogOpen(false);
      setSelectedAccess(null);
      setNewEndDate("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeClick = (access: TemporaryAccess) => {
    setSelectedAccess(access);
    setRevocationReason("");
    setRevokeDialogOpen(true);
  };

  const handleRevokeConfirm = async () => {
    if (!selectedAccess || revocationReason.trim().length < 20) return;

    setIsSubmitting(true);
    try {
      await onRevoke(selectedAccess.id, revocationReason.trim());
      setRevokeDialogOpen(false);
      setSelectedAccess(null);
      setRevocationReason("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {locale === "fr"
                    ? "Élève"
                    : locale === "de"
                      ? "Schüler"
                      : locale === "it"
                        ? "Allievo"
                        : "Student"}
                </TableHead>
                <TableHead>{t.temporaryAccess.primaryInstructor}</TableHead>
                <TableHead>{t.temporaryAccess.temporaryInstructor}</TableHead>
                <TableHead>{t.temporaryAccess.validity}</TableHead>
                <TableHead>{t.temporaryAccess.lessonsCompleted}</TableHead>
                <TableHead>
                  {locale === "fr"
                    ? "Statut"
                    : locale === "de"
                      ? "Status"
                      : locale === "it"
                        ? "Stato"
                        : "Status"}
                </TableHead>
                <TableHead className="text-right">
                  {t.actions.viewDetail}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeAccess.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {locale === "fr"
                      ? "Aucune autorisation active"
                      : locale === "de"
                        ? "Keine aktiven Autorisierungen"
                        : locale === "it"
                          ? "Nessuna autorizzazione attiva"
                          : "No active authorizations"}
                  </TableCell>
                </TableRow>
              ) : (
                activeAccess.map((access) => (
                  <TableRow key={access.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={access.studentAvatar} />

                          <AvatarFallback>
                            {access.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {access.studentName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={access.primaryInstructorAvatar} />

                          <AvatarFallback>
                            {access.primaryInstructorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {access.primaryInstructorName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={access.temporaryInstructorAvatar} />

                          <AvatarFallback>
                            {access.temporaryInstructorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {access.temporaryInstructorName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />

                        <span className="text-sm">
                          {formatDateRange(access.startDate, access.endDate)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {access.completedLessons}/{access.maxLessons}
                        </span>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${(access.completedLessons / access.maxLessons) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{getStatusBadge(access.status)}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExtendClick(access)}
                        >
                          <ClockIcon className="w-4 h-4 mr-1" />

                          {t.temporaryAccess.extend}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRevokeClick(access)}
                        >
                          <XCircleIcon className="w-4 h-4 mr-1" />

                          {t.temporaryAccess.revoke}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewHistory(access.id)}
                        >
                          <HistoryIcon className="w-4 h-4 mr-1" />

                          {t.temporaryAccess.history}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Extend Dialog */}
      <Dialog open={extendDialogOpen} onOpenChange={setExtendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.temporaryAccess.extend} - {selectedAccess?.studentName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="new-end-date">
                {locale === "fr"
                  ? "Nouvelle date de fin"
                  : locale === "de"
                    ? "Neues Enddatum"
                    : locale === "it"
                      ? "Nuova data fine"
                      : "New end date"}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="new-end-date"
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExtendDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleExtendConfirm}
              disabled={!newEndDate || isSubmitting}
            >
              {isSubmitting && (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Dialog */}
      <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.temporaryAccess.revoke} - {selectedAccess?.studentName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="revocation-reason">
                {t.temporaryAccess.revocationReason}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Textarea
                id="revocation-reason"
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder={t.temporaryAccess.revocationReasonPlaceholder}
                rows={4}
                maxLength={200}
                className="mt-2"
              />

              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {locale === "fr"
                    ? "Minimum 20 caractères"
                    : locale === "de"
                      ? "Mindestens 20 Zeichen"
                      : locale === "it"
                        ? "Minimo 20 caratteri"
                        : "Minimum 20 characters"}
                </p>
                <p
                  className={`text-xs ${
                    revocationReason.length >= 20
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {revocationReason.length}/200
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRevokeDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevokeConfirm}
              disabled={revocationReason.trim().length < 20 || isSubmitting}
            >
              {isSubmitting && (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t.temporaryAccess.revoke}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
