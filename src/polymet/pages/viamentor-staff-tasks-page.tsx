/**
 * VIAMENTOR Staff Tasks Page
 *
 * Page gestion tâches secrétariat avec list/kanban views, CRUD, stats
 */

"use client";

import { useState } from "react";
import {
  ListTodo,
  Plus,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  User,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  mockTasks,
  mockTaskStats,
  getTaskStatusColor,
  getPriorityStars,
  isTaskOverdue,
  getDaysUntilDue,
  type Task,
  type TaskStatus,
  type TaskPriority,
} from "@/polymet/data/viamentor-staff-communications-data";
import {
  getStaffTranslations,
  type StaffLocale,
} from "@/polymet/data/viamentor-staff-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StaffTasksPageProps {
  locale?: StaffLocale;
}

type ViewMode = "list" | "kanban";

// ============================================================================
// COMPONENT
// ============================================================================

export function StaffTasksPage({ locale = "fr" }: StaffTasksPageProps) {
  const t = getStaffTranslations(locale);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "all">(
    "all"
  );
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredTasks = mockTasks.filter((task) => {
    if (selectedStatus !== "all" && task.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    in_progress: filteredTasks.filter((t) => t.status === "in_progress"),
    completed: filteredTasks.filter((t) => t.status === "completed"),
    postponed: filteredTasks.filter((t) => t.status === "postponed"),
    cancelled: filteredTasks.filter((t) => t.status === "cancelled"),
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t.tasks.title}
            </h1>
            <p className="text-sm text-muted-foreground">{t.tasks.subtitle}</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />

                {t.tasks.actions.newTask}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t.tasks.actions.newTask}</DialogTitle>
                <DialogDescription>
                  Créer une nouvelle tâche et l'assigner à un membre de l'équipe
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>{t.tasks.form.title}</Label>
                  <Input placeholder="Titre de la tâche" />
                </div>
                <div>
                  <Label>{t.tasks.form.description}</Label>
                  <Textarea
                    placeholder="Description détaillée (optionnel)"
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t.tasks.form.assignTo}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff-1">
                          Marie Secrétaire
                        </SelectItem>
                        <SelectItem value="staff-2">Paul Assistant</SelectItem>
                        <SelectItem value="unassigned">Non assigné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t.tasks.form.dueDate}</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <Label>{t.tasks.form.priority}</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        ⭐ {t.tasks.priority.low}
                      </SelectItem>
                      <SelectItem value="2">
                        ⭐⭐ {t.tasks.priority.medium}
                      </SelectItem>
                      <SelectItem value="3">
                        ⭐⭐⭐ {t.tasks.priority.high}
                      </SelectItem>
                      <SelectItem value="4">
                        ⭐⭐⭐⭐ {t.tasks.priority.urgent}
                      </SelectItem>
                      <SelectItem value="5">
                        ⭐⭐⭐⭐⭐ {t.tasks.priority.critical}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  {t.tasks.form.cancel}
                </Button>
                <Button onClick={() => setCreateDialogOpen(false)}>
                  {t.tasks.form.create}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              {t.tasks.stats.total}
            </div>
            <div className="text-2xl font-bold text-foreground">
              {mockTaskStats.total}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              {t.tasks.stats.todo}
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {mockTaskStats.todo}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              {t.tasks.stats.inProgress}
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {mockTaskStats.inProgress}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              {t.tasks.stats.completed}
            </div>
            <div className="text-2xl font-bold text-green-600">
              {mockTaskStats.completed}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">
              {t.tasks.stats.overdue}
            </div>
            <div className="text-2xl font-bold text-destructive">
              {mockTaskStats.overdue}
            </div>
          </Card>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />

                  {t.common.filter}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-4">
                  <div>
                    <Label>{t.tasks.filters.status}</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        setSelectedStatus(value as TaskStatus | "all")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="todo">
                          {t.tasks.status.todo}
                        </SelectItem>
                        <SelectItem value="in_progress">
                          {t.tasks.status.inProgress}
                        </SelectItem>
                        <SelectItem value="completed">
                          {t.tasks.status.completed}
                        </SelectItem>
                        <SelectItem value="postponed">
                          {t.tasks.status.postponed}
                        </SelectItem>
                        <SelectItem value="cancelled">
                          {t.tasks.status.cancelled}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />

              {t.tasks.views.list}
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />

              {t.tasks.views.kanban}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "list" ? (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Checkbox className="mt-1" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {task.title}
                      </span>
                      <span className="text-sm">
                        {getPriorityStars(task.priority)}
                      </span>
                      <Badge
                        className={`${getTaskStatusColor(task.status)} text-white`}
                      >
                        {
                          t.tasks.status[
                            task.status === "in_progress"
                              ? "inProgress"
                              : task.status
                          ]
                        }
                      </Badge>
                      {isTaskOverdue(task) && (
                        <Badge variant="destructive">{t.common.overdue}</Badge>
                      )}
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {task.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />

                          <img
                            src={task.assignedTo.avatar}
                            alt=""
                            className="w-5 h-5 rounded-full"
                          />

                          <span>{task.assignedTo.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />

                        <span>{task.dueDate.toLocaleDateString("fr-FR")}</span>
                        {!isTaskOverdue(task) &&
                          task.status !== "completed" && (
                            <span className="text-xs">
                              ({getDaysUntilDue(task.dueDate)}{" "}
                              {t.common.daysUntil})
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          {t.tasks.actions.edit}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          {t.tasks.actions.reassign}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-green-600"
                        >
                          {t.tasks.actions.complete}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-destructive"
                        >
                          {t.tasks.actions.delete}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">
                    {
                      t.tasks.status[
                        status === "in_progress"
                          ? "inProgress"
                          : (status as keyof typeof t.tasks.status)
                      ]
                    }
                  </h3>
                  <Badge variant="secondary">{tasks.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="p-3 cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium text-foreground line-clamp-2">
                            {task.title}
                          </span>
                          <span className="text-xs">
                            {getPriorityStars(task.priority)}
                          </span>
                        </div>
                        {task.assignedTo && (
                          <div className="flex items-center gap-1">
                            <img
                              src={task.assignedTo.avatar}
                              alt=""
                              className="w-5 h-5 rounded-full"
                            />

                            <span className="text-xs text-muted-foreground truncate">
                              {task.assignedTo.name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />

                          <span>
                            {task.dueDate.toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          {isTaskOverdue(task) && (
                            <Flag className="w-3 h-3 text-destructive ml-auto" />
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
