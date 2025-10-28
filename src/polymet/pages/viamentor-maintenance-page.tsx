/**
 * VIAMENTOR - Maintenance Management Page
 * Page principale gestion maintenance véhicules
 */

"use client";

import { useState } from "react";
import {
  Wrench,
  Calendar,
  ListTodo,
  History,
  DollarSign,
  AlertTriangle,
  Plus,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  mockMaintenanceTasks,
  mockMaintenanceAlerts,
  type MaintenanceTask,
  type MaintenanceAlert,
  type MaintenanceLocale,
  getMaintenanceStatusColor,
  getMaintenancePriorityColor,
  getMaintenanceTypeColor,
} from "@/polymet/data/viamentor-maintenance-data";
import { maintenanceTranslations } from "@/polymet/data/viamentor-maintenance-i18n";
import { MaintenanceTaskDialog } from "@/polymet/components/viamentor-maintenance-task-dialog";

// ============================================================================
// TYPES
// ============================================================================

interface MaintenancePageProps {
  locale?: MaintenanceLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenancePage({ locale = "fr" }: MaintenancePageProps) {
  const t = maintenanceTranslations[locale];
  const [selectedTab, setSelectedTab] = useState("tasks");
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockMaintenanceTasks);
  const [alerts] = useState<MaintenanceAlert[]>(mockMaintenanceAlerts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<
    MaintenanceTask | undefined
  >();

  // Calculate stats
  const stats = {
    total: tasks.length,
    scheduled: tasks.filter((t) => t.status === "scheduled").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    overdue: tasks.filter((t) => t.status === "overdue").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    totalCost: tasks.reduce(
      (sum, t) => sum + (t.actualCost || t.estimatedCost),
      0
    ),
    criticalAlerts: alerts.filter(
      (a) => a.severity === "critical" && !a.isResolved
    ).length,
  };

  // Handlers
  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (data: Partial<MaintenanceTask>) => {
    if (selectedTask) {
      // Update existing task
      setTasks(
        tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...data } : t))
      );
    } else {
      // Create new task
      const newTask: MaintenanceTask = {
        id: `maint-${Date.now()}`,
        ...data,
        status: "scheduled",
        createdAt: new Date().toISOString(),
        createdBy: "admin",
        updatedAt: new Date().toISOString(),
      } as MaintenanceTask;
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />

            {t.actions.filterTasks}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />

            {t.actions.exportData}
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />

            {t.actions.printReport}
          </Button>
          <Button size="sm" onClick={handleCreateTask}>
            <Plus className="h-4 w-4 mr-2" />

            {t.actions.createTask}
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {stats.criticalAlerts > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />

          <AlertTitle>Alertes critiques</AlertTitle>
          <AlertDescription>
            {stats.criticalAlerts} tâche(s) nécessitent une attention immédiate
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalTasks}
            </CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.scheduled} planifiées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              {stats.overdue} en retard
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.completedTasks}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <Progress
              value={(stats.completed / stats.total) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalCost}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              CHF {stats.totalCost.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="tasks">
            <ListTodo className="h-4 w-4 mr-2" />

            {t.tabs.tasks}
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />

            {t.tabs.calendar}
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="h-4 w-4 mr-2" />

            {t.tabs.alerts}
            {stats.criticalAlerts > 0 && (
              <Badge variant="destructive" className="ml-2">
                {stats.criticalAlerts}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />

            {t.tabs.history}
          </TabsTrigger>
          <TabsTrigger value="costs">
            <DollarSign className="h-4 w-4 mr-2" />

            {t.tabs.costs}
          </TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tâches de maintenance</CardTitle>
              <CardDescription>
                Liste complète des tâches planifiées et en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.fields.vehicle}</TableHead>
                    <TableHead>{t.fields.title}</TableHead>
                    <TableHead>{t.fields.type}</TableHead>
                    <TableHead>{t.fields.priority}</TableHead>
                    <TableHead>{t.fields.status}</TableHead>
                    <TableHead>{t.fields.dueDate}</TableHead>
                    <TableHead className="text-right">
                      {t.fields.estimatedCost}
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{task.vehicleName}</div>
                          <div className="text-xs text-muted-foreground">
                            {task.vehiclePlate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {task.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getMaintenanceTypeColor(task.type)}
                        >
                          {t.types[task.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getMaintenancePriorityColor(task.priority)}
                        >
                          {t.priority[task.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getMaintenanceStatusColor(task.status)}
                        >
                          {t.status[task.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(task.dueDate).toLocaleDateString(locale)}
                      </TableCell>
                      <TableCell className="text-right">
                        CHF {task.estimatedCost}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                        >
                          {t.actions.editTask}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes de maintenance</CardTitle>
              <CardDescription>
                Notifications et rappels importants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  variant={
                    alert.severity === "critical" ? "destructive" : "default"
                  }
                >
                  <AlertCircle className="h-4 w-4" />

                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-1">
                      <p>{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.vehicleName} •{" "}
                        {new Date(alert.createdAt).toLocaleDateString(locale)}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier de maintenance</CardTitle>
              <CardDescription>
                Vue calendrier des tâches planifiées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <Calendar className="h-12 w-12 mb-4" />

                <p>Calendrier en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique de maintenance</CardTitle>
              <CardDescription>
                Historique complet des interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <History className="h-12 w-12 mb-4" />

                <p>Historique en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Costs Tab */}
        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des coûts</CardTitle>
              <CardDescription>
                Suivi détaillé des dépenses de maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mb-4" />

                <p>Analytics en développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Dialog */}
      <MaintenanceTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
