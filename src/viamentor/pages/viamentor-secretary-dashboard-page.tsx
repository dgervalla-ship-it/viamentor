/**
 * VIAMENTOR - Secretary Dashboard Page
 * Page principale dashboard secrétariat avec tâches, messages, planning, stats
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  CheckCircleIcon,
  UserPlusIcon,
  TrophyIcon,
  BellIcon,
  RefreshCwIcon,
} from "lucide-react";
import {
  mockDashboardStats,
  mockTasks,
  mockMessages,
  mockPhoneCalls,
  mockActivities,
  mockAppointments,
  mockSchoolInfo,
  mockAvailableInstructors,
  getGreeting,
  getTimeUntilDue,
  getTaskTypeIcon,
  getTaskTypeColor,
  getActivityIcon,
  formatDuration,
  type Task,
  type Message,
  type PhoneCall,
  type Activity,
  type Appointment,
} from "@/viamentor/data/viamentor-secretary-dashboard-data";
import {
  secretaryDashboardTranslations,
  type SecretaryDashboardLocale,
} from "@/viamentor/data/viamentor-secretary-dashboard-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryDashboardPageProps {
  locale?: SecretaryDashboardLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SecretaryDashboardPage({
  locale = "fr",
}: SecretaryDashboardPageProps) {
  const t = secretaryDashboardTranslations[locale];
  const [activeTab, setActiveTab] = useState("dashboard");
  const [taskFilter, setTaskFilter] = useState<
    "all" | "urgent" | "mine" | "assigned"
  >("all");

  const greeting = getGreeting();
  const currentUser = {
    firstName: "Claire",
    lastName: "Dupont",
    avatar: "https://github.com/shoaibux1.png",
  };

  const today = new Date().toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const urgentTasks = mockTasks.filter((task) => {
    const timeInfo = getTimeUntilDue(task.dueDate);
    return timeInfo.isUrgent && task.status === "pending";
  });

  const filteredTasks = mockTasks.filter((task) => {
    if (taskFilter === "urgent") return urgentTasks.includes(task);
    if (taskFilter === "mine") return task.assignedTo === "secretary-1";
    if (taskFilter === "assigned") return task.assignedTo === "secretary-1";
    return true;
  });

  const unreadMessages = mockMessages.filter((msg) => msg.status === "unread");

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage
                src={currentUser.avatar}
                alt={currentUser.firstName}
              />

              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t.greeting[greeting]} {currentUser.firstName}!
              </h1>
              <p className="text-muted-foreground">{today}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <BellIcon className="h-5 w-5" />

            {unreadMessages.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
                {unreadMessages.length}
              </Badge>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCwIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Today's Overview Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <PhoneIcon className="h-24 w-24 mx-auto text-primary/40 mb-4" />

              <p className="text-lg text-muted-foreground">
                {t.overview.encouragement[greeting].replace(
                  "{count}",
                  mockTasks
                    .filter((t) => t.status === "pending")
                    .length.toString()
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="text-2xl font-bold text-card-foreground">
                {mockDashboardStats.callsToday}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.overview.stats.calls}
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="text-2xl font-bold text-card-foreground">
                {mockDashboardStats.inscriptionsToday}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.overview.stats.inscriptions}
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="text-2xl font-bold text-card-foreground">
                {mockDashboardStats.lessonsBooked}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.overview.stats.lessons}
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="text-2xl font-bold text-card-foreground">
                {mockDashboardStats.messagesProcessed}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.overview.stats.messages}
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-card-foreground">
              {t.quickStats.urgentTasks.title}
            </h3>
            {urgentTasks.length > 5 && (
              <Badge variant="destructive">
                {t.quickStats.urgentTasks.alert}
              </Badge>
            )}
          </div>
          <div className="text-3xl font-bold text-destructive mb-2">
            {urgentTasks.length}
          </div>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setActiveTab("tasks")}
          >
            {t.quickStats.urgentTasks.button} →
          </Button>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-card-foreground">
              {t.quickStats.messages.title}
            </h3>
            {unreadMessages.length > 0 && (
              <Badge variant="secondary">{unreadMessages.length}</Badge>
            )}
          </div>
          <div className="text-3xl font-bold text-card-foreground mb-2">
            {mockDashboardStats.unreadMessages}
          </div>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setActiveTab("messages")}
          >
            {t.quickStats.messages.button} →
          </Button>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="font-semibold text-card-foreground mb-2">
            {t.quickStats.lessonsToday.title}
          </h3>
          <div className="text-3xl font-bold text-card-foreground mb-2">
            {mockDashboardStats.lessonsToday}
          </div>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setActiveTab("planning")}
          >
            {t.quickStats.lessonsToday.button} →
          </Button>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="font-semibold text-card-foreground mb-2">
            {t.quickStats.newProspects.title}
          </h3>
          <div className="text-3xl font-bold text-card-foreground mb-2">
            {mockDashboardStats.newProspects}
          </div>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setActiveTab("inscriptions")}
          >
            {t.quickStats.newProspects.button} →
          </Button>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="dashboard">{t.tabs.dashboard}</TabsTrigger>
          <TabsTrigger value="tasks">
            {t.tabs.tasks}
            {urgentTasks.length > 0 && (
              <Badge className="ml-2 bg-destructive text-destructive-foreground">
                {urgentTasks.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages">
            {t.tabs.messages}
            {unreadMessages.length > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {unreadMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="planning">{t.tabs.planning}</TabsTrigger>
          <TabsTrigger value="inscriptions">{t.tabs.inscriptions}</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Quick Actions Grid */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              {t.quickActions.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <UserPlusIcon className="h-8 w-8" />

                <div className="text-center">
                  <div className="font-semibold">
                    {t.quickActions.newStudent.title}
                  </div>
                  <div className="text-xs opacity-80">
                    {t.quickActions.newStudent.description}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <CalendarIcon className="h-8 w-8" />

                <div className="text-center">
                  <div className="font-semibold">
                    {t.quickActions.bookLesson.title}
                  </div>
                  <div className="text-xs opacity-80">
                    {t.quickActions.bookLesson.description}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <PhoneIcon className="h-8 w-8" />

                <div className="text-center">
                  <div className="font-semibold">
                    {t.quickActions.callProspect.title}
                  </div>
                  <div className="text-xs opacity-80">
                    {t.quickActions.callProspect.description}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MailIcon className="h-8 w-8" />

                <div className="text-center">
                  <div className="font-semibold">
                    {t.quickActions.sendEmail.title}
                  </div>
                  <div className="text-xs opacity-80">
                    {t.quickActions.sendEmail.description}
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Recent Activity & Appointments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">
                  {t.activity.title}
                </h2>
                <Button variant="ghost" size="sm">
                  {t.activity.viewAll}
                </Button>
              </div>
              <div className="space-y-4">
                {mockActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activity.user.avatar}
                        alt={activity.user.name}
                      />

                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {activity.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground">
                        <span className="font-medium">
                          {activity.user.name}
                        </span>{" "}
                        {t.activity.types[activity.type]}{" "}
                        {activity.relatedEntity && (
                          <span className="font-medium">
                            {activity.relatedEntity.name}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString(
                          locale,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                {t.appointments.title}
              </h2>
              <div className="space-y-4">
                {mockAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={appt.person.avatar}
                        alt={appt.person.name}
                      />

                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {appt.person.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {t.appointments.types[appt.type]}
                        </Badge>
                        <Badge
                          variant={
                            appt.status === "confirmed" ? "default" : "outline"
                          }
                          className="text-xs"
                        >
                          {t.appointments.status[appt.status]}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm text-card-foreground">
                        {appt.person.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(appt.dateTime).toLocaleString(locale, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {appt.location && (
                        <p className="text-xs text-muted-foreground">
                          {appt.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* School Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              {t.schoolInfo.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={mockSchoolInfo.logo}
                      alt={mockSchoolInfo.name}
                    />
                  </Avatar>
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {mockSchoolInfo.name}
                    </div>
                    <Badge
                      variant={
                        mockSchoolInfo.currentlyOpen ? "default" : "secondary"
                      }
                    >
                      {mockSchoolInfo.currentlyOpen
                        ? t.schoolInfo.currentStatus.open
                        : t.schoolInfo.currentStatus.closed}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{mockSchoolInfo.address}</div>
                  <div>{mockSchoolInfo.phone}</div>
                  <div>{mockSchoolInfo.email}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-sm mb-2 text-card-foreground">
                    {t.schoolInfo.availableInstructors}
                  </h3>
                  <div className="space-y-2">
                    {mockAvailableInstructors
                      .filter((i) => i.status === "available")
                      .map((instructor) => (
                        <div
                          key={instructor.id}
                          className="flex items-center gap-2 text-sm text-card-foreground"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={instructor.avatar}
                              alt={instructor.name}
                            />
                          </Avatar>
                          <span>{instructor.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {instructor.category.join(", ")}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">
                {t.tasks.title}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={taskFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTaskFilter("all")}
                >
                  {t.tasks.filters.all}
                </Button>
                <Button
                  variant={taskFilter === "urgent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTaskFilter("urgent")}
                >
                  {t.tasks.filters.urgent}
                </Button>
                <Button
                  variant={taskFilter === "mine" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTaskFilter("mine")}
                >
                  {t.tasks.filters.mine}
                </Button>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <TrophyIcon className="h-16 w-16 mx-auto text-primary/40 mb-4" />

                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t.tasks.emptyState.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.tasks.emptyState.subtitle}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => {
                  const timeInfo = getTimeUntilDue(task.dueDate);
                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <input type="checkbox" className="mt-1" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getTaskTypeColor(task.type)}>
                            {t.tasks.types[task.type]}
                          </Badge>
                          {Array.from({ length: task.priority }).map((_, i) => (
                            <span key={i} className="text-yellow-500">
                              ★
                            </span>
                          ))}
                          <Badge
                            variant={
                              timeInfo.isOverdue ? "destructive" : "secondary"
                            }
                            className="text-xs"
                          >
                            {timeInfo.text}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-card-foreground mb-1">
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {task.description}
                        </p>
                        {task.relatedEntity && (
                          <p className="text-xs text-muted-foreground">
                            {task.relatedEntity.name}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          {t.tasks.actions.markDone}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-card-foreground">
              {t.messages.title}
            </h2>
            <div className="space-y-3">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                    message.status === "unread"
                      ? "border-primary bg-primary/5 hover:bg-primary/10"
                      : "border-border hover:bg-accent/50"
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={message.from.avatar}
                      alt={message.from.name}
                    />

                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {message.from.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-semibold text-sm ${
                          message.status === "unread"
                            ? "text-card-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.from.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {t.messages.types[message.type]}
                      </Badge>
                      {message.priority === "urgent" && (
                        <Badge variant="destructive" className="text-xs">
                          {t.messages.priority.urgent}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(message.receivedAt).toLocaleTimeString(
                          locale,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <h3
                      className={`text-sm mb-1 ${
                        message.status === "unread"
                          ? "font-semibold text-card-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              {t.tabs.planning}
            </h2>
            <p className="text-muted-foreground">
              Planning view coming soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="inscriptions" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              {t.tabs.inscriptions}
            </h2>
            <p className="text-muted-foreground">
              Inscriptions view coming soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
