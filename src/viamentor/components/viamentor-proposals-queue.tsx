/**
 * VIAMENTOR - Proposals Queue
 * File d'attente propositions moniteurs avec validation école
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  Loader2Icon,
} from "lucide-react";
import type {
  InstructorProposal,
  ProposalStats,
  WorkloadComparison,
  AssignmentLocale,
} from "@/viamentor/data/viamentor-assignments-data";
import {
  ASSIGNMENTS_TRANSLATIONS,
  formatRelativeTime,
  getProposalStatusColor,
} from "@/viamentor/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface ProposalsQueueProps {
  proposals: InstructorProposal[];
  stats: ProposalStats;
  workloadComparisons: Record<string, WorkloadComparison>;
  locale?: AssignmentLocale;
  onApprove: (proposalId: string) => Promise<void>;
  onReject: (proposalId: string, reason: string) => Promise<void>;
  onPostpone: (proposalId: string) => void;
  onViewDetail: (proposal: InstructorProposal) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProposalsQueue({
  proposals,
  stats,
  workloadComparisons,
  locale = "fr",
  onApprove,
  onReject,
  onPostpone,
  onViewDetail,
  className,
}: ProposalsQueueProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] =
    useState<InstructorProposal | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingProposals = proposals.filter((p) => p.status === "Pending");

  const handleRejectClick = (proposal: InstructorProposal) => {
    setSelectedProposal(proposal);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedProposal || rejectionReason.trim().length < 20) return;

    setIsSubmitting(true);
    try {
      await onReject(selectedProposal.id, rejectionReason.trim());
      setRejectDialogOpen(false);
      setSelectedProposal(null);
      setRejectionReason("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.proposals.pendingProposals}
              </p>
              <p className="text-2xl font-bold mt-1">{stats.pending}</p>
            </div>
            <Badge variant="secondary" className="text-lg">
              {locale === "fr"
                ? "nouvelles"
                : locale === "de"
                  ? "neu"
                  : locale === "it"
                    ? "nuove"
                    : "new"}
            </Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.proposals.approvedThisWeek}
              </p>
              <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                {stats.approvedThisWeek}
              </p>
            </div>
            <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.proposals.rejectedThisWeek}
              </p>
              <p className="text-2xl font-bold mt-1 text-destructive">
                {stats.rejectedThisWeek}
              </p>
            </div>
            <XCircleIcon className="w-8 h-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.proposals.acceptanceRate}
              </p>
              <p className="text-2xl font-bold mt-1">{stats.acceptanceRate}%</p>
            </div>
            <TrendingUpIcon className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Proposals Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {locale === "fr"
                    ? "Date"
                    : locale === "de"
                      ? "Datum"
                      : locale === "it"
                        ? "Data"
                        : "Date"}
                </TableHead>
                <TableHead>{t.proposals.proposingInstructor}</TableHead>
                <TableHead>{t.proposals.concernedStudent}</TableHead>
                <TableHead>{t.proposals.motivationPreview}</TableHead>
                <TableHead>{t.proposals.workloadComparison}</TableHead>
                <TableHead>{t.proposals.proposalScore}</TableHead>
                <TableHead className="text-right">
                  {t.actions.viewDetail}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingProposals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {locale === "fr"
                      ? "Aucune proposition en attente"
                      : locale === "de"
                        ? "Keine ausstehenden Vorschläge"
                        : locale === "it"
                          ? "Nessuna proposta in attesa"
                          : "No pending proposals"}
                  </TableCell>
                </TableRow>
              ) : (
                pendingProposals.map((proposal) => {
                  const comparison = workloadComparisons[proposal.id];
                  const isBetterWorkload =
                    comparison &&
                    comparison.proposed.activeStudents <
                      comparison.current.activeStudents;

                  return (
                    <TableRow
                      key={proposal.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="text-sm text-muted-foreground">
                        {formatRelativeTime(proposal.createdAt, locale)}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={proposal.instructorAvatar} />

                            <AvatarFallback>
                              {proposal.instructorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {proposal.instructorName}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={proposal.studentAvatar} />

                            <AvatarFallback>
                              {proposal.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {proposal.studentName}
                            </p>
                            {proposal.currentInstructorName && (
                              <p className="text-xs text-muted-foreground">
                                {locale === "fr"
                                  ? "Actuel:"
                                  : locale === "de"
                                    ? "Aktuell:"
                                    : locale === "it"
                                      ? "Attuale:"
                                      : "Current:"}{" "}
                                {proposal.currentInstructorName}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="text-sm line-clamp-2 max-w-xs">
                          {proposal.motivation}
                        </p>
                      </TableCell>

                      <TableCell>
                        {comparison ? (
                          <div className="flex items-center gap-2">
                            {isBetterWorkload ? (
                              <TrendingDownIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <TrendingUpIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            )}
                            <div className="text-xs">
                              <p className="font-medium">
                                {comparison.current.activeStudents} →{" "}
                                {comparison.proposed.activeStudents}
                              </p>
                              <p className="text-muted-foreground">
                                {comparison.current.weeklyHours}h →{" "}
                                {comparison.proposed.weeklyHours}h
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            -
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor:
                              proposal.compatibilityScore >= 80
                                ? "hsl(173 58% 39%)"
                                : proposal.compatibilityScore >= 60
                                  ? "hsl(43 74% 66%)"
                                  : "hsl(0 84.2% 60.2%)",
                            color: "white",
                          }}
                        >
                          {proposal.compatibilityScore}%
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={(e) => {
                              e.stopPropagation();
                              onApprove(proposal.id);
                            }}
                          >
                            <CheckCircle2Icon className="w-4 h-4 mr-1" />

                            {t.proposals.approve}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRejectClick(proposal);
                            }}
                          >
                            <XCircleIcon className="w-4 h-4 mr-1" />

                            {t.proposals.reject}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPostpone(proposal.id);
                            }}
                          >
                            <ClockIcon className="w-4 h-4 mr-1" />

                            {t.proposals.postpone}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.proposals.reject} - {selectedProposal?.instructorName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason">
                {t.proposals.rejectionReason}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={t.proposals.rejectionReasonPlaceholder}
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
                    rejectionReason.length >= 20
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {rejectionReason.length}/200
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={rejectionReason.trim().length < 20 || isSubmitting}
            >
              {isSubmitting && (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t.proposals.reject}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
