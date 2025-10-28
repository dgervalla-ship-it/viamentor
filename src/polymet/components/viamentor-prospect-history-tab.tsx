/**
 * VIAMENTOR - Prospect History Tab
 * Tab Historique avec timeline chronologique reverse, types interactions, empty state
 */

"use client";

import * as React from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  ArrowRightLeft,
  FileText,
  Share2,
  ChevronDown,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Prospect,
  type TeamMember,
  type ProspectInteraction,
  mockInteractions,
  formatRelativeTime,
} from "@/polymet/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectHistoryTabProps {
  prospect: Prospect;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
  onCall?: (prospect: Prospect) => void;
  onEmail?: (prospect: Prospect) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectHistoryTab({
  prospect,
  teamMembers,
  locale = "fr",
  onCall,
  onEmail,
}: ProspectHistoryTabProps) {
  const t = getProspectsTranslations(locale);

  // Filter interactions for this prospect
  const interactions = mockInteractions.filter(
    (i) => i.prospectId === prospect.id
  );

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;

      case "email":
        return <Mail className="h-4 w-4" />;

      case "sms":
        return <MessageSquare className="h-4 w-4" />;

      case "meeting":
        return <Calendar className="h-4 w-4" />;

      case "statusChange":
        return <ArrowRightLeft className="h-4 w-4" />;

      case "noteAdded":
        return <FileText className="h-4 w-4" />;

      case "documentShared":
        return <Share2 className="h-4 w-4" />;

      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "call":
        return "bg-blue-500";
      case "email":
        return "bg-purple-500";
      case "sms":
        return "bg-green-500";
      case "meeting":
        return "bg-orange-500";
      case "statusChange":
        return "bg-yellow-500";
      case "noteAdded":
        return "bg-gray-500";
      case "documentShared":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  // Empty state
  if (interactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="rounded-full bg-muted p-6">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {t.detail.history.noInteractions}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Commencez par contacter le prospect pour créer votre premier
            historique d'interaction.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onCall?.(prospect)}>
            <Phone className="h-4 w-4 mr-2" />

            {t.detail.history.callNow}
          </Button>
          <Button variant="outline" onClick={() => onEmail?.(prospect)}>
            <Mail className="h-4 w-4 mr-2" />

            {t.detail.history.sendEmail}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t.detail.history.title}</h3>

      {/* Timeline */}
      <div className="relative space-y-4">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        {interactions.map((interaction, index) => {
          const member = teamMembers.find((m) => m.id === interaction.userId);
          const iconColor = getInteractionColor(interaction.type);

          return (
            <Card key={interaction.id} className="relative ml-14">
              {/* Icon */}
              <div
                className={`absolute -left-[52px] top-4 h-10 w-10 rounded-full ${iconColor} text-white flex items-center justify-center shadow-lg`}
              >
                {getInteractionIcon(interaction.type)}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{interaction.description}</h4>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {formatRelativeTime(interaction.date, locale)}{" "}
                        {t.misc.ago}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(interaction.date).toLocaleString(locale, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {member && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <span>{t.detail.history.by}</span>
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className="text-[10px]">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Details */}
                    {interaction.details && (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <ChevronDown className="h-3 w-3 mr-1" />

                            {t.detail.history.details}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            {interaction.details}
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {/* Attachments */}
                    {interaction.attachments &&
                      interaction.attachments.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Paperclip className="h-3 w-3" />

                          <span>
                            {interaction.attachments.length}{" "}
                            {t.detail.history.attachments}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        {t.detail.history.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t.detail.history.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
