/**
 * VIAMENTOR - Prospect Card
 * Card compact 280x140 pour Kanban avec drag-drop, avatar, badges, actions
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  PhoneIcon,
  MailIcon,
  MoreVerticalIcon,
  EyeIcon,
  CalendarIcon,
  UserCheckIcon,
  XCircleIcon,
  GraduationCapIcon,
} from "lucide-react";
import type { Prospect } from "@/polymet/data/viamentor-prospects-data";
import {
  getProspectInitials,
  getProspectColor,
  getSourceColor,
  formatRelativeTime,
  getCategoryLabel,
  getLeadScoreColor,
} from "@/polymet/data/viamentor-prospects-data";
import type { ProspectsLocale } from "@/polymet/data/viamentor-prospects-i18n";
import { getProspectsTranslations } from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectCardProps {
  prospect: Prospect;
  locale?: ProspectsLocale;
  assignedMemberName?: string;
  assignedMemberAvatar?: string;
  onView?: (prospect: Prospect) => void;
  onCall?: (prospect: Prospect) => void;
  onEmail?: (prospect: Prospect) => void;
  onSchedule?: (prospect: Prospect) => void;
  onConvert?: (prospect: Prospect) => void;
  onMarkLost?: (prospect: Prospect) => void;
  onAssign?: (prospect: Prospect) => void;
  isDragging?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectCard({
  prospect,
  locale = "fr",
  assignedMemberName,
  assignedMemberAvatar,
  onView,
  onCall,
  onEmail,
  onSchedule,
  onConvert,
  onMarkLost,
  onAssign,
  isDragging = false,
}: ProspectCardProps) {
  const t = getProspectsTranslations(locale);
  const [isHovered, setIsHovered] = useState(false);

  const initials = getProspectInitials(prospect);
  const avatarColor = getProspectColor(
    `${prospect.firstName} ${prospect.lastName}`
  );
  const sourceColor = getSourceColor(prospect.source);
  const scoreColor = getLeadScoreColor(prospect.leadScore);

  return (
    <Card
      className={`
        w-full max-w-[280px] p-3 space-y-2 cursor-grab active:cursor-grabbing
        transition-all duration-200
        ${isHovered ? "shadow-lg scale-[1.02]" : "shadow-sm"}
        ${isDragging ? "opacity-50 rotate-2" : "opacity-100"}
        hover:shadow-md
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header: Avatar + Name + Actions */}
      <div className="flex items-start gap-2">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            text-white text-sm font-medium flex-shrink-0
            ${avatarColor}
          `}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="font-semibold text-sm text-foreground truncate"
            title={`${prospect.firstName} ${prospect.lastName}`}
          >
            {prospect.firstName} {prospect.lastName}
          </div>
          <div
            className="text-xs text-muted-foreground truncate"
            title={prospect.email}
          >
            {prospect.email}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(prospect)}>
              <EyeIcon className="h-4 w-4 mr-2" />

              {t.actions.viewDetail}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCall?.(prospect)}>
              <PhoneIcon className="h-4 w-4 mr-2" />

              {t.actions.call}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEmail?.(prospect)}>
              <MailIcon className="h-4 w-4 mr-2" />

              {t.actions.sendEmail}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSchedule?.(prospect)}>
              <CalendarIcon className="h-4 w-4 mr-2" />

              {t.actions.scheduleAppointment}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onConvert?.(prospect)}>
              <UserCheckIcon className="h-4 w-4 mr-2" />

              {t.actions.convertToStudent}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMarkLost?.(prospect)}>
              <XCircleIcon className="h-4 w-4 mr-2" />

              {t.actions.markAsLost}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Phone with click-to-call */}
      <a
        href={`tel:${prospect.phone}`}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <PhoneIcon className="h-3 w-3" />

        {prospect.phone}
      </a>

      {/* Badges: Source + Category */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={`${sourceColor} text-white text-xs`}>
          {t.sources[prospect.source]}
        </Badge>
        <Badge variant="outline" className="text-xs">
          <GraduationCapIcon className="h-3 w-3 mr-1" />

          {getCategoryLabel(prospect.category)}
        </Badge>
      </div>

      {/* Created date */}
      <div className="text-xs text-muted-foreground">
        {t.misc.createdAt} {t.misc.ago}{" "}
        {formatRelativeTime(prospect.createdAt, locale)}
      </div>

      {/* Assigned to */}
      <div className="flex items-center gap-2">
        {prospect.assignedTo && assignedMemberName ? (
          <div className="flex items-center gap-1">
            {assignedMemberAvatar && (
              <img
                src={assignedMemberAvatar}
                alt={assignedMemberName}
                className="w-5 h-5 rounded-full"
              />
            )}
            <span className="text-xs text-muted-foreground">
              {assignedMemberName}
            </span>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs"
            onClick={() => onAssign?.(prospect)}
          >
            {t.assignment.notAssigned}
          </Button>
        )}
      </div>

      {/* Lead Score */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {t.misc.leadScore}
          </span>
          <span className={`text-xs font-semibold ${scoreColor}`}>
            {prospect.leadScore}/100
          </span>
        </div>
        <Progress
          value={prospect.leadScore}
          className="h-1"
          indicatorClassName={
            prospect.leadScore >= 70
              ? "bg-green-500"
              : prospect.leadScore >= 40
                ? "bg-orange-500"
                : "bg-red-500"
          }
        />
      </div>
    </Card>
  );
}
