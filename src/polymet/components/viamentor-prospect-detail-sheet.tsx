/**
 * VIAMENTOR - Prospect Detail Sheet
 * Sheet slide-over 700px avec header, tabs navigation (Informations/Historique/Communications/Documents/Notes)
 */

"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Phone, Mail, Calendar, UserPlus, Trash2, Edit } from "lucide-react";
import { ProspectInfoTab } from "@/polymet/components/viamentor-prospect-info-tab";
import { ProspectHistoryTab } from "@/polymet/components/viamentor-prospect-history-tab";
import { ProspectCommunicationsTab } from "@/polymet/components/viamentor-prospect-communications-tab";
import { ProspectDocumentsTab } from "@/polymet/components/viamentor-prospect-documents-tab";
import { ProspectNotesTab } from "@/polymet/components/viamentor-prospect-notes-tab";
import {
  type Prospect,
  type TeamMember,
  getStatusColor,
  getSourceColor,
  getLeadScoreColor,
} from "@/polymet/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectDetailSheetProps {
  prospect: Prospect | null;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: (prospect: Prospect) => void;
  onDelete?: (id: string) => void;
  onConvert?: (prospect: Prospect) => void;
  onCall?: (prospect: Prospect) => void;
  onEmail?: (prospect: Prospect) => void;
  onSchedule?: (prospect: Prospect) => void;
  onMarkLost?: (prospect: Prospect, reason: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectDetailSheet({
  prospect,
  teamMembers,
  locale = "fr",
  open,
  onOpenChange,
  onUpdate,
  onDelete,
  onConvert,
  onCall,
  onEmail,
  onSchedule,
  onMarkLost,
}: ProspectDetailSheetProps) {
  const t = getProspectsTranslations(locale);
  const [activeTab, setActiveTab] = React.useState("info");

  if (!prospect) return null;

  const statusColor = getStatusColor(prospect.status);
  const sourceColor = getSourceColor(prospect.source);
  const scoreColor = getLeadScoreColor(prospect.leadScore);

  const assignedMember = prospect.assignedTo
    ? teamMembers.find((m) => m.id === prospect.assignedTo)
    : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[700px] sm:max-w-[700px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar */}
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                  {prospect.firstName[0]}
                  {prospect.lastName[0]}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <SheetTitle className="text-2xl">
                  {prospect.firstName} {prospect.lastName}
                </SheetTitle>

                {/* Contact */}
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${prospect.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />

                    {prospect.email}
                  </a>
                  <a
                    href={`tel:${prospect.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />

                    {prospect.phone}
                  </a>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={statusColor}>
                    {t.statuses[prospect.status]}
                  </Badge>
                  <Badge variant="outline" className={sourceColor}>
                    {t.sources[prospect.source]}
                  </Badge>
                  <Badge variant="outline" className={scoreColor}>
                    Score: {prospect.leadScore}/100
                  </Badge>
                </div>
              </div>
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCall?.(prospect)}
            >
              <Phone className="h-4 w-4 mr-2" />

              {t.detail.quickActions.call}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEmail?.(prospect)}
            >
              <Mail className="h-4 w-4 mr-2" />

              {t.detail.quickActions.email}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSchedule?.(prospect)}
            >
              <Calendar className="h-4 w-4 mr-2" />

              {t.detail.quickActions.schedule}
            </Button>
            <Button size="sm" onClick={() => onConvert?.(prospect)}>
              <UserPlus className="h-4 w-4 mr-2" />

              {t.detail.quickActions.convert}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(prospect.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />

              {t.detail.quickActions.delete}
            </Button>
          </div>
        </SheetHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start rounded-none border-b border-border px-6">
            <TabsTrigger value="info">{t.detail.tabs.info}</TabsTrigger>
            <TabsTrigger value="history">{t.detail.tabs.history}</TabsTrigger>
            <TabsTrigger value="communications">
              {t.detail.tabs.communications}
            </TabsTrigger>
            <TabsTrigger value="documents">
              {t.detail.tabs.documents}
            </TabsTrigger>
            <TabsTrigger value="notes">{t.detail.tabs.notes}</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="info" className="mt-0">
              <ProspectInfoTab
                prospect={prospect}
                teamMembers={teamMembers}
                locale={locale}
                onUpdate={onUpdate}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <ProspectHistoryTab
                prospect={prospect}
                teamMembers={teamMembers}
                locale={locale}
                onCall={onCall}
                onEmail={onEmail}
              />
            </TabsContent>

            <TabsContent value="communications" className="mt-0">
              <ProspectCommunicationsTab prospect={prospect} locale={locale} />
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <ProspectDocumentsTab
                prospect={prospect}
                teamMembers={teamMembers}
                locale={locale}
              />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <ProspectNotesTab
                prospect={prospect}
                teamMembers={teamMembers}
                locale={locale}
              />
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
