/**
 * VIAMENTOR - Business Hours Settings Page
 * Page principale paramètres horaires et disponibilités
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ClockIcon,
  CalendarIcon,
  AlertCircleIcon,
  SaveIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  CopyIcon,
} from "lucide-react";
import {
  mockBusinessHoursSettings,
  type BusinessHoursSettings,
  type DaySchedule,
  type Holiday,
  type Closure,
  type Exception,
} from "@/viamentor/data/viamentor-business-hours-data";
import {
  getBusinessHoursTranslation,
  formatDayName,
  formatClosureReason,
  formatHolidayType,
  type BusinessHoursLocale,
} from "@/viamentor/data/viamentor-business-hours-i18n";
import { holidaysAPIService } from "@/viamentor/data/viamentor-holidays-api-service";

// ============================================================================
// TYPES
// ============================================================================

interface BusinessHoursSettingsPageProps {
  locale?: BusinessHoursLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function BusinessHoursSettingsPage({
  locale = "fr",
}: BusinessHoursSettingsPageProps) {
  const t = getBusinessHoursTranslation(locale);
  const [settings, setSettings] = useState<BusinessHoursSettings>(
    mockBusinessHoursSettings
  );
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync holidays from API
  const handleSyncHolidays = async () => {
    setSyncing(true);
    try {
      const response = await holidaysAPIService.fetchHolidays({
        canton: settings.canton,
        includeFederal: settings.includeFederalHolidays,
        includeCantonal: settings.includeCantonalHolidays,
        locale,
      });

      setSettings((prev) => ({
        ...prev,
        holidays: response.holidays,
        lastSync: response.lastSync,
      }));

      alert(
        t.holidays.syncSuccess.replace("{count}", response.count.toString())
      );
    } catch (error) {
      alert("Erreur lors de la synchronisation");
    } finally {
      setSyncing(false);
    }
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert(t.messages.saveSuccess);
  };

  // Update opening hours
  const updateOpeningHours = (day: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      openingHours: prev.openingHours.map((d) =>
        d.day === day ? { ...d, [field]: value } : d
      ),
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert("Preview")}>
            <EyeIcon className="w-4 h-4 mr-2" />

            {t.actions.preview}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <SaveIcon className="w-4 h-4 mr-2" />

            {saving ? "..." : t.actions.save}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="opening" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="opening">{t.openingHours.title}</TabsTrigger>
          <TabsTrigger value="slots">{t.lessonSlots.title}</TabsTrigger>
          <TabsTrigger value="holidays">{t.holidays.title}</TabsTrigger>
          <TabsTrigger value="closures">{t.closures.title}</TabsTrigger>
          <TabsTrigger value="exceptions">{t.exceptions.title}</TabsTrigger>
        </TabsList>

        {/* Opening Hours Tab */}
        <TabsContent value="opening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.openingHours.title}</CardTitle>
              <CardDescription>{t.openingHours.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircleIcon className="w-4 h-4" />

                <AlertDescription>{t.openingHours.info}</AlertDescription>
              </Alert>

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.openingHours.dayColumn}</TableHead>
                      <TableHead className="w-24">
                        {t.openingHours.openColumn}
                      </TableHead>
                      <TableHead>{t.openingHours.morningColumn}</TableHead>
                      <TableHead>{t.openingHours.afternoonColumn}</TableHead>
                      <TableHead className="w-24">
                        {t.openingHours.actionsColumn}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.openingHours.map((day) => (
                      <TableRow key={day.day}>
                        <TableCell className="font-medium">
                          {formatDayName(day.day, locale)}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={day.isOpen}
                            onCheckedChange={(checked) =>
                              updateOpeningHours(day.day, "isOpen", checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {day.isOpen && (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="time"
                                value={day.morning?.start || "08:00"}
                                className="w-28"
                              />

                              <span>-</span>
                              <Input
                                type="time"
                                value={day.morning?.end || "12:00"}
                                className="w-28"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {day.isOpen && (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="time"
                                value={day.afternoon?.start || "13:30"}
                                className="w-28"
                              />

                              <span>-</span>
                              <Input
                                type="time"
                                value={day.afternoon?.end || "18:30"}
                                className="w-28"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button variant="outline">
                <CopyIcon className="w-4 h-4 mr-2" />

                {t.openingHours.copyAll}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lesson Slots Tab */}
        <TabsContent value="slots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.lessonSlots.title}</CardTitle>
              <CardDescription>{t.lessonSlots.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>{t.lessonSlots.standardDuration}</Label>
                <RadioGroup
                  value={settings.lessonSlots.standardDuration.toString()}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45" id="d45" />

                    <Label htmlFor="d45">{t.lessonSlots.duration45}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60" id="d60" />

                    <Label htmlFor="d60">{t.lessonSlots.duration60}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90" id="d90" />

                    <Label htmlFor="d90">{t.lessonSlots.duration90}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.lessonSlots.granularity}</Label>
                  <Select value={settings.lessonSlots.granularity.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.lessonSlots.minimumBreak}</Label>
                  <Input
                    type="number"
                    value={settings.lessonSlots.minimumBreak}
                    min={0}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.lessonSlots.bookingAdvance}</Label>
                  <Input
                    type="number"
                    value={settings.lessonSlots.minimumBookingAdvance}
                    min={1}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.lessonSlots.cancellationDelay}</Label>
                  <Input
                    type="number"
                    value={settings.lessonSlots.freeCancellationDelay}
                    min={1}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="double"
                  checked={settings.lessonSlots.allowDoubleLessons}
                />

                <Label htmlFor="double">{t.lessonSlots.allowDouble}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.holidays.title}</CardTitle>
              <CardDescription>{t.holidays.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch checked={settings.autoImportHolidays} />

                    <Label>{t.holidays.autoImport}</Label>
                  </div>
                  <div className="flex gap-4 ml-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={settings.includeFederalHolidays} />

                      <Label>{t.holidays.includeFederal}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={settings.includeCantonalHolidays} />

                      <Label>{t.holidays.includeCantonal}</Label>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSyncHolidays} disabled={syncing}>
                  <DownloadIcon className="w-4 h-4 mr-2" />

                  {syncing ? "..." : t.holidays.syncNow}
                </Button>
              </div>

              {settings.lastSync && (
                <p className="text-sm text-muted-foreground">
                  {t.holidays.lastSync.replace(
                    "{date}",
                    new Date(settings.lastSync).toLocaleString()
                  )}
                </p>
              )}

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.holidays.dateColumn}</TableHead>
                      <TableHead>{t.holidays.nameColumn}</TableHead>
                      <TableHead>{t.holidays.typeColumn}</TableHead>
                      <TableHead>{t.holidays.recurringColumn}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.holidays.slice(0, 10).map((holiday) => (
                      <TableRow key={holiday.id}>
                        <TableCell>
                          {new Date(holiday.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {holiday.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              holiday.type === "federal"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {formatHolidayType(holiday.type, locale)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {holiday.isRecurring && (
                            <Badge variant="outline">
                              {t.holidays.recurring}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />

                {t.holidays.addCustom}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Closures Tab */}
        <TabsContent value="closures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.closures.title}</CardTitle>
              <CardDescription>{t.closures.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.closures.startDateColumn}</TableHead>
                      <TableHead>{t.closures.endDateColumn}</TableHead>
                      <TableHead>{t.closures.durationColumn}</TableHead>
                      <TableHead>{t.closures.reasonColumn}</TableHead>
                      <TableHead>{t.closures.statusColumn}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.closures.map((closure) => (
                      <TableRow key={closure.id}>
                        <TableCell>
                          {new Date(closure.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(closure.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {t.closures.days.replace(
                            "{count}",
                            closure.duration.toString()
                          )}
                        </TableCell>
                        <TableCell>
                          {formatClosureReason(closure.reason, locale)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              closure.status === "upcoming"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {t.closures.status[closure.status]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />

                {t.closures.addClosure}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exceptions Tab */}
        <TabsContent value="exceptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.exceptions.title}</CardTitle>
              <CardDescription>{t.exceptions.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.exceptions.dateColumn}</TableHead>
                      <TableHead>{t.exceptions.hoursColumn}</TableHead>
                      <TableHead>{t.exceptions.reasonColumn}</TableHead>
                      <TableHead className="w-24">
                        {t.exceptions.actionsColumn}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.exceptions.map((exception) => (
                      <TableRow key={exception.id}>
                        <TableCell>
                          {new Date(exception.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {exception.isClosed ? (
                            <Badge variant="destructive">
                              {t.exceptions.closed}
                            </Badge>
                          ) : (
                            <span className="text-sm">
                              {exception.customHours
                                ?.map((h) => `${h.start}-${h.end}`)
                                .join(", ")}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {exception.reason}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />

                {t.exceptions.addException}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
