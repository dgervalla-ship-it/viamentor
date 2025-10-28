/**
 * Component - Financial Reports
 *
 * Section rapports financiers avec templates, scheduled reports, historical
 * Templates clickables, automation cron, archive avec download
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUpIcon,
  BuildingIcon,
  ClockIcon,
  ReceiptIcon,
  DownloadIcon,
  MailIcon,
  TrashIcon,
  PlayIcon,
  EditIcon,
  PlusIcon,
} from "lucide-react";
import {
  FinancialReportTemplate,
  ScheduledReport,
  HistoricalReport,
} from "@/polymet/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
} from "@/polymet/data/viamentor-analytics-i18n";

export interface FinancialReportsProps {
  templates: FinancialReportTemplate[];
  scheduledReports: ScheduledReport[];
  historicalReports: HistoricalReport[];
  locale?: AnalyticsLocale;
  onGenerateReport?: (templateId: string) => void;
  onScheduleReport?: () => void;
  onToggleSchedule?: (scheduleId: string, active: boolean) => void;
  onRunNow?: (scheduleId: string) => void;
  onEditSchedule?: (scheduleId: string) => void;
  onDeleteSchedule?: (scheduleId: string) => void;
  onDownloadReport?: (reportId: string) => void;
  onEmailReport?: (reportId: string) => void;
  onDeleteReport?: (reportId: string) => void;
}

const ICON_MAP = {
  TrendingUpIcon,
  BuildingIcon,
  ClockIcon,
  ReceiptIcon,
};

export function FinancialReports({
  templates,
  scheduledReports,
  historicalReports,
  locale = "fr",
  onGenerateReport,
  onScheduleReport,
  onToggleSchedule,
  onRunNow,
  onEditSchedule,
  onDeleteSchedule,
  onDownloadReport,
  onEmailReport,
  onDeleteReport,
}: FinancialReportsProps) {
  const t = useAnalyticsTranslations(locale);

  return (
    <div className="space-y-6">
      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>{t.reportTemplates}</CardTitle>
          <CardDescription>
            Sélectionner un modèle pour générer un rapport
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => {
              const IconComponent =
                ICON_MAP[template.icon as keyof typeof ICON_MAP];

              return (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => onGenerateReport?.(template.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {IconComponent && (
                          <IconComponent className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <CardTitle className="text-base">
                            {template.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {template.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.scheduledReports}</CardTitle>
              <CardDescription>
                Automatisation des rapports récurrents
              </CardDescription>
            </div>
            <Button onClick={onScheduleReport}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouveau
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.reportType}</TableHead>
                <TableHead>{t.recipients}</TableHead>
                <TableHead>{t.frequency}</TableHead>
                <TableHead>{t.nextRun}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledReports.map((schedule) => {
                const nextRunDate = new Date(schedule.nextRun);
                const daysUntil = Math.ceil(
                  (nextRunDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">
                      {templates.find((t) => t.type === schedule.reportType)
                        ?.name || schedule.reportType}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {schedule.recipients.slice(0, 2).map((email, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {email.split("@")[0]}
                          </Badge>
                        ))}
                        {schedule.recipients.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{schedule.recipients.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{schedule.frequency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {nextRunDate.toLocaleDateString(
                            locale === "fr" ? "fr-CH" : "en-CH"
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Dans {daysUntil} jour{daysUntil > 1 ? "s" : ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={schedule.active}
                        onCheckedChange={(checked) =>
                          onToggleSchedule?.(schedule.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRunNow?.(schedule.id)}
                          title="Exécuter maintenant"
                        >
                          <PlayIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditSchedule?.(schedule.id)}
                          title="Modifier"
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteSchedule?.(schedule.id)}
                          title="Supprimer"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Historical Reports */}
      <Card>
        <CardHeader>
          <CardTitle>{t.historicalReports}</CardTitle>
          <CardDescription>Archive des rapports générés</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.reportName}</TableHead>
                <TableHead>{t.period}</TableHead>
                <TableHead>{t.generatedBy}</TableHead>
                <TableHead>{t.generatedDate}</TableHead>
                <TableHead>{t.fileSize}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.period}</Badge>
                  </TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(report.generatedDate).toLocaleDateString(
                      locale === "fr" ? "fr-CH" : "en-CH"
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {report.fileSize}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadReport?.(report.id)}
                        title={t.download}
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEmailReport?.(report.id)}
                        title={t.email}
                      >
                        <MailIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteReport?.(report.id)}
                        title={t.delete}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
