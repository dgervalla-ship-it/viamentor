/**
 * VIAMENTOR Staff Planning Page
 *
 * Page planning école secrétariat avec calendar view, filtres, booking wizard
 */

"use client";

import { useState } from "react";
import {
  Calendar,
  Filter,
  RefreshCw,
  Plus,
  Users,
  Car,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  mockStaffPlanningEvents,
  mockPlanningStats,
  getCategoryColor,
  getStatusBadgeVariant,
  type StaffPlanningEvent,
  type ViewType,
  type LessonStatus,
} from "@/polymet/data/viamentor-staff-planning-data";
import {
  getStaffTranslations,
  type StaffLocale,
} from "@/polymet/data/viamentor-staff-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StaffPlanningPageProps {
  locale?: StaffLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StaffPlanningPage({ locale = "fr" }: StaffPlanningPageProps) {
  const t = getStaffTranslations(locale);
  const [view, setView] = useState<ViewType>("week");
  const [selectedStatus, setSelectedStatus] = useState<LessonStatus | "all">(
    "all"
  );
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<StaffPlanningEvent | null>(
    null
  );
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const filteredEvents = mockStaffPlanningEvents.filter((event) => {
    if (selectedStatus !== "all" && event.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t.planning.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.planning.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />

              {t.common.refresh}
            </Button>
            <Dialog
              open={bookingDialogOpen}
              onOpenChange={setBookingDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />

                  {t.planning.actions.bookLesson}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.planning.actions.bookLesson}</DialogTitle>
                  <DialogDescription>
                    Wizard de réservation simplifié pour le secrétariat
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Wizard booking intégré - Sélection élève, moniteur,
                    véhicule, horaire
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.planning.stats.totalLessons}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {mockPlanningStats.totalLessons}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.planning.stats.confirmed}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockPlanningStats.confirmedLessons}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {mockPlanningStats.tentativeLessons}{" "}
                {t.planning.stats.tentative}
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.planning.stats.instructorsActive}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {mockPlanningStats.instructorsActive}
                </p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.planning.stats.utilization}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {mockPlanningStats.utilizationRate}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>

      {/* Filters & Views */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />

                  {t.planning.filters.title}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <Label>{t.planning.filters.status}</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        setSelectedStatus(value as LessonStatus | "all")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {t.planning.status.all}
                        </SelectItem>
                        <SelectItem value="confirmed">
                          {t.planning.status.confirmed}
                        </SelectItem>
                        <SelectItem value="tentative">
                          {t.planning.status.tentative}
                        </SelectItem>
                        <SelectItem value="cancelled">
                          {t.planning.status.cancelled}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="availability"
                      checked={showAvailability}
                      onCheckedChange={(checked) =>
                        setShowAvailability(checked as boolean)
                      }
                    />

                    <Label
                      htmlFor="availability"
                      className="text-sm cursor-pointer"
                    >
                      {t.planning.filters.showAvailability}
                    </Label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as ViewType)}>
            <TabsList>
              <TabsTrigger value="month">{t.planning.views.month}</TabsTrigger>
              <TabsTrigger value="week">{t.planning.views.week}</TabsTrigger>
              <TabsTrigger value="day">{t.planning.views.day}</TabsTrigger>
              <TabsTrigger value="agenda">
                {t.planning.views.agenda}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto p-6">
        {view === "agenda" ? (
          <div className="space-y-2">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="p-4 hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-1 h-full rounded-full ${getCategoryColor(event.category)}`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">
                        {event.title}
                      </span>
                      <Badge variant={getStatusBadgeVariant(event.status)}>
                        {t.planning.status[event.status]}
                      </Badge>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          {t.planning.filters.instructors}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={event.instructor.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full"
                          />

                          <span className="text-foreground">
                            {event.instructor.name}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          {t.planning.filters.vehicles}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Car className="w-4 h-4 text-muted-foreground" />

                          <span className="text-foreground">
                            {event.vehicle.plate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Horaire</p>
                        <p className="text-foreground mt-1">
                          {event.start.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -
                          {event.end.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      📍 {event.location.address}
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
                          {t.planning.actions.viewDetails}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          {t.planning.actions.modify}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-destructive"
                        >
                          {t.planning.actions.cancel}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />

              <p className="text-lg font-medium text-foreground">Vue {view}</p>
              <p className="text-sm text-muted-foreground">
                Calendar view avec React Big Calendar - {filteredEvents.length}{" "}
                leçons
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
