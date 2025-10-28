/**
 * VIAMENTOR - Database Health Page
 * Monitoring santé base données avec stats, slow queries, tables, backups
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  DatabaseIcon,
  ActivityIcon,
  HardDriveIcon,
  ZapIcon,
  AlertCircleIcon,
  PlayIcon,
  DownloadIcon,
  RotateCcwIcon,
  TrashIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  mockDatabaseStats,
  mockSlowQueries,
  mockTableStats,
  mockBackupConfig,
  mockBackups,
  getTimeAgo,
  type Backup,
} from "@/viamentor/data/viamentor-admin-roles-data";
import {
  adminRolesTranslations,
  type AdminRolesLocale,
} from "@/viamentor/data/viamentor-admin-roles-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AdminDbHealthPageProps {
  locale?: AdminRolesLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AdminDbHealthPage({ locale = "fr" }: AdminDbHealthPageProps) {
  const t = adminRolesTranslations[locale];
  const [restoreDialog, setRestoreDialog] = useState<{
    open: boolean;
    backup: Backup | null;
  }>({ open: false, backup: null });
  const [restoreConfirm, setRestoreConfirm] = useState({
    understood: false,
    reason: "",
  });
  const [restoreProgress, setRestoreProgress] = useState(0);

  const handleRestore = () => {
    setRestoreProgress(0);
    const interval = setInterval(() => {
      setRestoreProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRestoreDialog({ open: false, backup: null });
            setRestoreConfirm({ understood: false, reason: "" });
            setRestoreProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <span>{t.breadcrumb.admin}</span>
        <span>/</span>
        <span className="text-foreground font-medium">
          {t.breadcrumb.dbHealth}
        </span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t.dbHealth.title}
        </h1>
        <p className="text-lg text-muted-foreground">{t.dbHealth.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.dbHealth.stats.connections}
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDatabaseStats.connections}/{mockDatabaseStats.maxConnections}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.dbHealth.stats.size}
            </CardTitle>
            <HardDriveIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDatabaseStats.size} GB
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.dbHealth.stats.tables}
            </CardTitle>
            <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDatabaseStats.tablesCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.dbHealth.stats.indexes}
            </CardTitle>
            <ZapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDatabaseStats.indexesCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.dbHealth.stats.cacheHitRatio}
            </CardTitle>
            <ZapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDatabaseStats.cacheHitRatio}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Slow Queries */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dbHealth.slowQueries.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t.dbHealth.slowQueries.subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.dbHealth.slowQueries.query}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t.dbHealth.slowQueries.duration}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t.dbHealth.slowQueries.calls}
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {t.dbHealth.slowQueries.table}
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSlowQueries.map((query) => (
                  <TableRow key={query.id}>
                    <TableCell
                      className="font-mono text-xs sm:text-sm max-w-xs sm:max-w-md truncate"
                      title={query.query}
                    >
                      {query.query}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="destructive">{query.duration}ms</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {query.calls.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell font-mono text-sm">
                      {query.table}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hidden sm:inline-flex"
                      >
                        {t.dbHealth.slowQueries.analyze}
                      </Button>
                      <Button size="sm" variant="outline" className="sm:hidden">
                        <ZapIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tables Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dbHealth.tables.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.dbHealth.tables.name}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t.dbHealth.tables.rows}
                  </TableHead>
                  <TableHead>{t.dbHealth.tables.size}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t.dbHealth.tables.indexes}
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {t.dbHealth.tables.lastVacuum}
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTableStats.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell className="font-mono font-medium">
                      {table.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {table.rows.toLocaleString()}
                    </TableCell>
                    <TableCell>{table.size} MB</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {table.indexesCount}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {table.lastVacuum
                        ? getTimeAgo(table.lastVacuum, locale)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hidden sm:inline-flex"
                        >
                          {t.dbHealth.tables.vacuum}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hidden sm:inline-flex"
                        >
                          {t.dbHealth.tables.analyze}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="sm:hidden"
                        >
                          <ZapIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Backups */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>{t.dbHealth.backups.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>
                  {t.dbHealth.backups.schedule}: {mockBackupConfig.schedule}
                </span>
                <span>
                  {t.dbHealth.backups.retention}: {mockBackupConfig.retention}{" "}
                  {t.common.timeAgo.days.replace("{{count}}", "")}
                </span>
                <Badge
                  variant={
                    mockBackupConfig.status === "active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {t.common[mockBackupConfig.status as keyof typeof t.common]}
                </Badge>
              </div>
            </div>
            <Button>
              <PlayIcon className="h-4 w-4 mr-2" />

              {t.dbHealth.backups.manualBackup}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {mockBackupConfig.lastBackup && (
            <Alert className="mb-4">
              <CheckCircleIcon className="h-4 w-4" />

              <AlertDescription>
                {t.dbHealth.backups.lastBackup}:{" "}
                {getTimeAgo(mockBackupConfig.lastBackup, locale)}
              </AlertDescription>
            </Alert>
          )}
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.dbHealth.backups.date}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t.dbHealth.backups.size}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t.dbHealth.backups.duration}
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {backup.date.toLocaleDateString(locale)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {backup.date.toLocaleTimeString(locale)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {backup.size} GB
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {backup.duration}s
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          backup.status === "success"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {t.common[backup.status as keyof typeof t.common]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 sm:gap-2">
                        <Button size="sm" variant="outline">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                        {backup.status === "success" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setRestoreDialog({ open: true, backup })
                            }
                          >
                            <RotateCcwIcon className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="hidden sm:inline-flex"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Restore Dialog */}
      <Dialog
        open={restoreDialog.open}
        onOpenChange={(open) => setRestoreDialog({ open, backup: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.dbHealth.backups.restoreConfirm}</DialogTitle>
            <DialogDescription>
              {restoreDialog.backup && (
                <span>
                  Backup du{" "}
                  {restoreDialog.backup.date.toLocaleDateString(locale)} (
                  {restoreDialog.backup.size} GB)
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          {restoreProgress === 0 ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />

                <AlertDescription>
                  {t.dbHealth.backups.restoreWarning}
                </AlertDescription>
              </Alert>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="understood"
                  checked={restoreConfirm.understood}
                  onCheckedChange={(checked) =>
                    setRestoreConfirm({
                      ...restoreConfirm,
                      understood: checked as boolean,
                    })
                  }
                />

                <label htmlFor="understood" className="text-sm cursor-pointer">
                  {t.roles.create.active}
                </label>
              </div>
              <Textarea
                placeholder="Raison de la restauration (optionnel)..."
                value={restoreConfirm.reason}
                onChange={(e) =>
                  setRestoreConfirm({
                    ...restoreConfirm,
                    reason: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Progress value={restoreProgress} />

              <p className="text-sm text-center text-muted-foreground">
                Restauration en cours... {restoreProgress}%
              </p>
            </div>
          )}
          <DialogFooter>
            {restoreProgress === 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    setRestoreDialog({ open: false, backup: null })
                  }
                >
                  {t.common.cancel}
                </Button>
                <Button
                  variant="destructive"
                  disabled={!restoreConfirm.understood}
                  onClick={handleRestore}
                >
                  {t.common.confirm}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
