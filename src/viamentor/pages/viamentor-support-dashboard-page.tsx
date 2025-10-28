/**
 * VIAMENTOR - Support Dashboard Page
 * Page principale dashboard support avec stats KPIs, tickets récents et quick actions
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TicketIcon,
  ClockIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  PlusIcon,
  SearchIcon,
  MessageSquareIcon,
  BookOpenIcon,
} from "lucide-react";
import {
  getSupportTranslations,
  type SupportLocale,
} from "@/viamentor/data/viamentor-support-tickets-i18n";
import {
  mockTicketStats,
  mockSupportTickets,
  getTimeAgo,
  getTicketPriorityColor,
  getTicketStatusColor,
  type SupportTicket,
} from "@/viamentor/data/viamentor-support-tickets-data";

// ============================================================================
// TYPES
// ============================================================================

interface SupportDashboardPageProps {
  locale?: SupportLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SupportDashboardPage({
  locale = "fr",
}: SupportDashboardPageProps) {
  const t = getSupportTranslations(locale);
  const [stats] = useState(mockTicketStats);
  const [recentTickets] = useState(mockSupportTickets.slice(0, 5));

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.page.dashboard.title}
          </h1>
          <p className="text-muted-foreground">
            {t.page.dashboard.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="mr-2 h-4 w-4" />

            {t.actions.refresh}
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.actions.createTicket}
          </Button>
        </div>
      </div>

      {/* SLA Alerts */}
      {stats.slaBreachedCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>
            {stats.slaBreachedCount} ticket(s) en dépassement SLA nécessitent
            une attention immédiate
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Open Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.openTickets}
            </CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.openTickets}
            </div>
            <Badge variant="default" className="mt-2">
              Actifs
            </Badge>
          </CardContent>
        </Card>

        {/* Pending Response */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.pendingResponse}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.pendingResponse}
            </div>
            {stats.slaBreachedCount > 0 && (
              <Badge variant="destructive" className="mt-2">
                {t.stats.slaRisk}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Resolved Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.resolvedToday}
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.resolvedToday}
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {t.stats.dailyTarget}: {stats.dailyTarget}
                </span>
                <span>{stats.dailyProgress}%</span>
              </div>
              <Progress value={stats.dailyProgress} className="h-1" />
            </div>
          </CardContent>
        </Card>

        {/* NPS Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.npsScore}
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.npsScore}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.npsScore >= 70
                ? "Excellent"
                : stats.npsScore >= 50
                  ? "Bon"
                  : "À améliorer"}
            </p>
          </CardContent>
        </Card>

        {/* Avg Response Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.avgResponseTime}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.avgResponseTime}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t.stats.minutes}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TicketIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">
                  {t.page.tickets.title}
                </CardTitle>
                <CardDescription>Gérer les tickets support</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpenIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{t.page.kb.title}</CardTitle>
                <CardDescription>
                  Articles d'aide et documentation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{t.chat.title}</CardTitle>
                <CardDescription>Support en direct</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tickets récents</CardTitle>
              <CardDescription>
                Derniers tickets créés ou mis à jour
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <SearchIcon className="mr-2 h-4 w-4" />
              Voir tous
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} t={t} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// TICKET ROW COMPONENT
// ============================================================================

interface TicketRowProps {
  ticket: SupportTicket;
  t: ReturnType<typeof getSupportTranslations>;
}

function TicketRow({ ticket, t }: TicketRowProps) {
  return (
    <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-card hover:bg-accent transition-colors cursor-pointer">
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm text-muted-foreground">
                {ticket.number}
              </span>
              <Badge variant={getTicketPriorityColor(ticket.priority) as any}>
                {t.priority[ticket.priority]}
              </Badge>
              <Badge variant={getTicketStatusColor(ticket.status) as any}>
                {t.status[ticket.status]}
              </Badge>
              {ticket.slaBreached && (
                <Badge variant="destructive">{t.tickets.slaBreached}</Badge>
              )}
            </div>
            <p className="font-medium text-card-foreground">{ticket.subject}</p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {getTimeAgo(ticket.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img
              src={ticket.client.avatar}
              alt={ticket.client.tenantName}
              className="w-5 h-5 rounded-full"
            />

            <span>{ticket.client.tenantName}</span>
          </div>
          {ticket.assignedTo && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                <img
                  src={ticket.assignedTo.avatar}
                  alt={ticket.assignedTo.name}
                  className="w-5 h-5 rounded-full"
                />

                <span>{ticket.assignedTo.name}</span>
              </div>
            </>
          )}
          <span>•</span>
          <span>{ticket.messages.length} messages</span>
        </div>
      </div>
    </div>
  );
}
