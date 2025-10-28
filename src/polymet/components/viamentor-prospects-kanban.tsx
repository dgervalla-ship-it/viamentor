/**
 * VIAMENTOR - Prospects Kanban Board
 * Kanban drag-drop avec react-beautiful-dnd, colonnes statuts workflow
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProspectCard } from "@/polymet/components/viamentor-prospect-card";
import type {
  Prospect,
  ProspectStatus,
} from "@/polymet/data/viamentor-prospects-data";
import {
  getProspectsByStatus,
  mockTeamMembers,
} from "@/polymet/data/viamentor-prospects-data";
import type { ProspectsLocale } from "@/polymet/data/viamentor-prospects-i18n";
import { getProspectsTranslations } from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectsKanbanProps {
  prospects: Prospect[];
  locale?: ProspectsLocale;
  onStatusChange?: (prospectId: string, newStatus: ProspectStatus) => void;
  onView?: (prospect: Prospect) => void;
  onCall?: (prospect: Prospect) => void;
  onEmail?: (prospect: Prospect) => void;
  onSchedule?: (prospect: Prospect) => void;
  onConvert?: (prospect: Prospect) => void;
  onMarkLost?: (prospect: Prospect) => void;
  onAssign?: (prospect: Prospect) => void;
}

interface KanbanColumn {
  status: ProspectStatus;
  color: string;
  bgColor: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectsKanban({
  prospects,
  locale = "fr",
  onStatusChange,
  onView,
  onCall,
  onEmail,
  onSchedule,
  onConvert,
  onMarkLost,
  onAssign,
}: ProspectsKanbanProps) {
  const t = getProspectsTranslations(locale);
  const [draggedProspect, setDraggedProspect] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ProspectStatus | null>(
    null
  );

  const columns: KanbanColumn[] = [
    {
      status: "new",
      color: "text-blue-700 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      status: "contacted",
      color: "text-yellow-700 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      status: "interested",
      color: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      status: "appointment",
      color: "text-purple-700 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      status: "hot",
      color: "text-red-700 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      status: "converted",
      color: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      status: "lost",
      color: "text-gray-700 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-950",
    },
  ];

  const handleDragStart = (prospectId: string) => {
    setDraggedProspect(prospectId);
  };

  const handleDragEnd = () => {
    setDraggedProspect(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, status: ProspectStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: ProspectStatus) => {
    e.preventDefault();
    if (draggedProspect) {
      onStatusChange?.(draggedProspect, newStatus);
    }
    setDraggedProspect(null);
    setDragOverColumn(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnProspects = getProspectsByStatus(prospects, column.status);
        const isDragOver = dragOverColumn === column.status;

        return (
          <div
            key={column.status}
            className="flex-shrink-0 w-[300px]"
            onDragOver={(e) => handleDragOver(e, column.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header */}
            <Card
              className={`
                p-3 mb-3 transition-all duration-200
                ${column.bgColor}
                ${isDragOver ? "ring-2 ring-primary scale-[1.02]" : ""}
              `}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${column.color}`}>
                  {t.statuses[column.status]}
                </h3>
                <Badge variant="secondary" className={column.color}>
                  {columnProspects.length}
                </Badge>
              </div>
            </Card>

            {/* Column Content */}
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-3 pr-2">
                {columnProspects.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t.misc.noProspects}
                    </p>
                  </Card>
                ) : (
                  columnProspects.map((prospect) => {
                    const assignedMember = mockTeamMembers.find(
                      (m) => m.id === prospect.assignedTo
                    );

                    return (
                      <div
                        key={prospect.id}
                        draggable
                        onDragStart={() => handleDragStart(prospect.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <ProspectCard
                          prospect={prospect}
                          locale={locale}
                          assignedMemberName={assignedMember?.name}
                          assignedMemberAvatar={assignedMember?.avatar}
                          onView={onView}
                          onCall={onCall}
                          onEmail={onEmail}
                          onSchedule={onSchedule}
                          onConvert={onConvert}
                          onMarkLost={onMarkLost}
                          onAssign={onAssign}
                          isDragging={draggedProspect === prospect.id}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
