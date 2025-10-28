/**
 * VIAMENTOR Students Bulk Actions
 * Sticky bar bottom avec actions batch
 */

import { Button } from "@/components/ui/button";
import {
  UserPlusIcon,
  MailIcon,
  RefreshCwIcon,
  DownloadIcon,
  PrinterIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import {
  StudentsLocale,
  useStudentsTranslations,
} from "@/viamentor/data/viamentor-students-i18n";

interface BulkActionsBarProps {
  selectedCount: number;
  locale?: StudentsLocale;
  onAssignInstructor?: () => void;
  onSendEmail?: () => void;
  onChangeStatus?: () => void;
  onExportSelection?: () => void;
  onPrintConvocations?: () => void;
  onDelete?: () => void;
  onClearSelection?: () => void;
}

export function BulkActionsBar({
  selectedCount,
  locale = "fr",
  onAssignInstructor,
  onSendEmail,
  onChangeStatus,
  onExportSelection,
  onPrintConvocations,
  onDelete,
  onClearSelection,
}: BulkActionsBarProps) {
  const t = useStudentsTranslations(locale);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-from-bottom">
      <div className="bg-primary text-primary-foreground shadow-lg border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{selectedCount}</span>
                <span>{t.selectedStudents}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSelection}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onAssignInstructor}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <UserPlusIcon className="mr-2 h-4 w-4" />

                {t.assignInstructor}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onSendEmail}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <MailIcon className="mr-2 h-4 w-4" />

                {t.sendEmail}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onChangeStatus}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />

                {t.changeStatus}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onExportSelection}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <DownloadIcon className="mr-2 h-4 w-4" />

                {t.exportSelection}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={onPrintConvocations}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <PrinterIcon className="mr-2 h-4 w-4" />

                {t.printConvocations}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="ml-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" />

                {t.deleteSelected}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
