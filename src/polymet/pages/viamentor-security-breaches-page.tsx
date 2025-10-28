// ============================================================================
// VIAMENTOR - Security Breaches Page
// Page gestion violations données et incidents sécurité RGPD
// ============================================================================

import { useState } from "react";
import {
  AlertTriangleIcon,
  ShieldAlertIcon,
  CheckCircle2Icon,
  ClockIcon,
  BellIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  BellRingIcon,
  UsersIcon,
  XCircleIcon,
  FileTextIcon,
  CalendarIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  securityBreachesTranslations,
  type SecurityBreachesLocale,
} from "@/polymet/data/viamentor-security-breaches-i18n";
import {
  mockBreaches,
  mockBreachStats,
  type SecurityBreach,
  type BreachType,
  type BreachSeverity,
  type BreachStatus,
} from "@/polymet/data/viamentor-security-breaches-data";

// ============================================================================
// TYPES
// ============================================================================

interface SecurityBreachesPageProps {
  locale?: SecurityBreachesLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SecurityBreachesPage({
  locale = "fr",
}: SecurityBreachesPageProps) {
  const t = securityBreachesTranslations[locale];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBreach, setSelectedBreach] = useState<SecurityBreach | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter breaches
  const filteredBreaches = mockBreaches.filter((breach) => {
    const matchesSearch =
      breach.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breach.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || breach.type === filterType;
    const matchesSeverity =
      filterSeverity === "all" || breach.severity === filterSeverity;
    const matchesStatus =
      filterStatus === "all" || breach.status === filterStatus;

    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const openIncidents = mockBreaches.filter(
    (b) => b.status !== "closed" && b.status !== "resolved"
  ).length;

  const getSeverityColor = (severity: BreachSeverity) => {
    const colors = {
      critical: "destructive",
      high: "orange",
      medium: "yellow",
      low: "blue",
    };
    return colors[severity] as any;
  };

  const getStatusColor = (status: BreachStatus) => {
    const colors = {
      new: "destructive",
      investigation: "orange",
      contained: "yellow",
      notified: "blue",
      resolved: "default",
      closed: "secondary",
    };
    return colors[status] as any;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{t.breadcrumb.security}</span>
          <span>/</span>
          <span>{t.breadcrumb.breaches}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.actions.createIncident}
          </Button>
        </div>
      </div>

      {/* Critical Alert */}
      {openIncidents > 0 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>
            <span className="font-semibold">{t.alert.critical}:</span>{" "}
            {openIncidents} {t.alert.openBreaches}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldAlertIcon className="h-4 w-4 text-muted-foreground" />

              {t.stats.totalIncidents}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBreachStats.totalIncidents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.totalIncidentsDesc}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangleIcon className="h-4 w-4 text-destructive" />

              {t.stats.openIncidents}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockBreachStats.openIncidents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.openIncidentsDesc}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2Icon className="h-4 w-4 text-green-600" />

              {t.stats.resolvedIncidents}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBreachStats.resolvedIncidents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.resolvedIncidentsDesc}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />

              {t.stats.avgResolutionTime}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBreachStats.avgResolutionTimeHours}h
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.avgResolutionTimeDesc}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BellIcon className="h-4 w-4 text-muted-foreground" />

              {t.stats.authorityNotifications}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBreachStats.authorityNotifications}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.authorityNotificationsDesc}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.table.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.table.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.filters.filterByType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="unauthorized_access">
                  {t.types.unauthorizedAccess}
                </SelectItem>
                <SelectItem value="data_leak">{t.types.dataLeak}</SelectItem>
                <SelectItem value="ransomware">{t.types.ransomware}</SelectItem>
                <SelectItem value="phishing">{t.types.phishing}</SelectItem>
                <SelectItem value="other">{t.types.other}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.filters.filterBySeverity} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="critical">{t.severity.critical}</SelectItem>
                <SelectItem value="high">{t.severity.high}</SelectItem>
                <SelectItem value="medium">{t.severity.medium}</SelectItem>
                <SelectItem value="low">{t.severity.low}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.filters.filterByStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="new">{t.status.new}</SelectItem>
                <SelectItem value="investigation">
                  {t.status.investigation}
                </SelectItem>
                <SelectItem value="contained">{t.status.contained}</SelectItem>
                <SelectItem value="notified">{t.status.notified}</SelectItem>
                <SelectItem value="resolved">{t.status.resolved}</SelectItem>
                <SelectItem value="closed">{t.status.closed}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.table.columns.detectionDate}</TableHead>
                  <TableHead>{t.table.columns.type}</TableHead>
                  <TableHead>{t.table.columns.severity}</TableHead>
                  <TableHead>{t.table.columns.affectedPersons}</TableHead>
                  <TableHead>{t.table.columns.status}</TableHead>
                  <TableHead>{t.table.columns.assignedTo}</TableHead>
                  <TableHead className="text-right">
                    {t.table.columns.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBreaches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <p className="font-medium">{t.table.empty}</p>
                        <p className="text-sm">{t.table.emptyDesc}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBreaches.map((breach) => (
                    <TableRow key={breach.id}>
                      <TableCell className="font-medium">
                        {breach.detectionDate.toLocaleString(locale)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {t.types[
                            breach.type.replace("_", "") as keyof typeof t.types
                          ] || breach.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(breach.severity)}>
                          {t.severity[breach.severity]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4 text-muted-foreground" />

                          {breach.affectedPersons}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(breach.status)}>
                          {t.status[breach.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={breach.assignedTo.avatar} />

                            <AvatarFallback>
                              {breach.assignedTo.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {breach.assignedTo.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBreach(breach);
                            setIsDetailOpen(true);
                          }}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedBreach && (
            <>
              <SheetHeader>
                <SheetTitle>{t.detail.title}</SheetTitle>
                <SheetDescription>
                  {selectedBreach.description}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Status & Severity */}
                <div className="flex gap-2">
                  <Badge variant={getSeverityColor(selectedBreach.severity)}>
                    {t.severity[selectedBreach.severity]}
                  </Badge>
                  <Badge variant={getStatusColor(selectedBreach.status)}>
                    {t.status[selectedBreach.status]}
                  </Badge>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.detail.user}
                    </p>
                    <p className="font-medium">
                      {selectedBreach.assignedTo.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.table.columns.affectedPersons}
                    </p>
                    <p className="font-medium">
                      {selectedBreach.affectedPersons}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.detail.notificationRequired}
                    </p>
                    <p className="font-medium">
                      {selectedBreach.notificationRequired
                        ? t.detail.yes
                        : t.detail.no}
                    </p>
                  </div>
                  {selectedBreach.notificationDeadline && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.detail.notificationDeadline}
                      </p>
                      <p className="font-medium">
                        {selectedBreach.notificationDeadline.toLocaleString(
                          locale
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold mb-3">{t.detail.timeline}</h4>
                  <div className="space-y-3">
                    {selectedBreach.timeline.map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">
                              {event.action}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.toLocaleString(locale)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedBreach.rootCause && (
                  <>
                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t.detail.rootCause}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedBreach.rootCause}
                      </p>
                    </div>
                  </>
                )}

                {selectedBreach.correctiveMeasures.length > 0 && (
                  <>
                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t.detail.correctiveMeasures}
                      </h4>
                      <ul className="space-y-2">
                        {selectedBreach.correctiveMeasures.map(
                          (measure, index) => (
                            <li key={index} className="flex gap-2 text-sm">
                              <CheckCircle2Icon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />

                              <span>{measure}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </>
                )}

                {selectedBreach.documents.length > 0 && (
                  <>
                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t.detail.attachedDocuments}
                      </h4>
                      <div className="space-y-2">
                        {selectedBreach.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-2 border border-border rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FileTextIcon className="h-4 w-4 text-muted-foreground" />

                              <div>
                                <p className="text-sm font-medium">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(doc.size / 1000).toFixed(0)} KB •{" "}
                                  {doc.uploadedBy}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.dialog.createTitle}</DialogTitle>
            <DialogDescription>{t.dialog.createDesc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.dialog.type}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unauthorized_access">
                      {t.types.unauthorizedAccess}
                    </SelectItem>
                    <SelectItem value="data_leak">
                      {t.types.dataLeak}
                    </SelectItem>
                    <SelectItem value="ransomware">
                      {t.types.ransomware}
                    </SelectItem>
                    <SelectItem value="phishing">{t.types.phishing}</SelectItem>
                    <SelectItem value="other">{t.types.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.dialog.severity}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">
                      {t.severity.critical}
                    </SelectItem>
                    <SelectItem value="high">{t.severity.high}</SelectItem>
                    <SelectItem value="medium">{t.severity.medium}</SelectItem>
                    <SelectItem value="low">{t.severity.low}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t.dialog.description}</Label>
              <Textarea
                placeholder={t.dialog.descriptionPlaceholder}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.dialog.affectedPersons}</Label>
                <Input type="number" min="0" />
              </div>
              <div className="space-y-2">
                <Label>{t.dialog.assignTo}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dpo-001">Marie Dubois (DPO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              {t.dialog.cancel}
            </Button>
            <Button onClick={() => setIsCreateOpen(false)}>
              {t.dialog.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
