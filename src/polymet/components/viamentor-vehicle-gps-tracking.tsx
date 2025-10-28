/**
 * VIAMENTOR - Vehicle GPS Tracking
 * GPS tracking avec maps simulation, trajets historique, stats, settings
 */

import { useState } from "react";
import {
  type VehicleDetail,
  type GPSTrajectory,
} from "@/polymet/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPinIcon,
  NavigationIcon,
  ClockIcon,
  GaugeIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";

interface VehicleGPSTrackingProps {
  vehicle: VehicleDetail;
  trajectories: GPSTrajectory[];
  locale?: VehicleDetailLocale;
  onViewDetails?: (trajectory: GPSTrajectory) => void;
}

export function VehicleGPSTracking({
  vehicle,
  trajectories,
  locale = "fr",
  onViewDetails,
}: VehicleGPSTrackingProps) {
  const t = getVehicleDetailI18n(locale).gps;
  const [selectedTrajectory, setSelectedTrajectory] = useState<string>("");
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [autoRecord, setAutoRecord] = useState(true);
  const [speedAlerts, setSpeedAlerts] = useState(true);
  const [speedThreshold, setSpeedThreshold] = useState("130");

  const selectedTraj = trajectories.find((t) => t.id === selectedTrajectory);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Real-time Position */}
      {vehicle.gpsEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <NavigationIcon className="h-5 w-5" />

              {t.realtime.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicle.currentLocation ? (
              <>
                {/* Map Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950" />

                  <div className="relative z-10 text-center space-y-2">
                    <MapPinIcon className="h-12 w-12 mx-auto text-primary animate-bounce" />

                    <p className="text-sm font-medium">
                      {t.realtime.currentPosition}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.currentLocation.address}
                    </p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {t.realtime.lastUpdate}
                    </p>
                    <p className="text-sm font-medium">
                      {formatDate(vehicle.currentLocation.lastUpdate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Coordonnées</p>
                    <p className="text-sm font-mono">
                      {vehicle.currentLocation.lat.toFixed(4)},{" "}
                      {vehicle.currentLocation.lng.toFixed(4)}
                    </p>
                  </div>
                </div>

                {vehicle.status === "in_lesson" && (
                  <Badge variant="default" className="w-full justify-center">
                    {t.realtime.inLesson} Marc Dubois & Emma Rousseau
                  </Badge>
                )}
              </>
            ) : (
              <Alert>
                <InfoIcon className="h-4 w-4" />

                <AlertDescription>{t.realtime.notAvailable}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Historical Trajectories */}
      <Card>
        <CardHeader>
          <CardTitle>{t.trajectories.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedTrajectory}
            onValueChange={setSelectedTrajectory}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.trajectories.selectLesson} />
            </SelectTrigger>
            <SelectContent>
              {trajectories.map((traj) => (
                <SelectItem key={traj.id} value={traj.id}>
                  {formatDate(traj.lessonDate)} - {traj.instructor} &{" "}
                  {traj.student}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedTraj ? (
            <>
              {/* Route Map Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950" />

                <div className="relative z-10">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    {/* Route polyline simulation */}
                    <path
                      d="M 50 250 Q 100 200, 150 150 T 250 100 T 350 50"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Start marker */}
                    <circle cx="50" cy="250" r="8" fill="green" />

                    {/* End marker */}
                    <circle cx="350" cy="50" r="8" fill="red" />

                    {/* Speed event marker */}
                    <circle cx="250" cy="100" r="6" fill="orange" />
                  </svg>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <NavigationIcon className="h-3 w-3" />

                    {t.trajectories.stats.distance}
                  </div>
                  <p className="text-lg font-semibold">
                    {selectedTraj.distance} km
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ClockIcon className="h-3 w-3" />

                    {t.trajectories.stats.duration}
                  </div>
                  <p className="text-lg font-semibold">
                    {formatDuration(selectedTraj.duration)}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GaugeIcon className="h-3 w-3" />

                    {t.trajectories.stats.avgSpeed}
                  </div>
                  <p className="text-lg font-semibold">
                    {selectedTraj.avgSpeed} km/h
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <GaugeIcon className="h-3 w-3" />

                    {t.trajectories.stats.maxSpeed}
                  </div>
                  <p className="text-lg font-semibold">
                    {selectedTraj.maxSpeed} km/h
                  </p>
                </div>
              </div>

              {/* Zones */}
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {t.trajectories.stats.zones}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">
                      {selectedTraj.zones.city}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.trajectories.stats.city}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">
                      {selectedTraj.zones.highway}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.trajectories.stats.highway}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">
                      {selectedTraj.zones.rural}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.trajectories.stats.rural}
                    </p>
                  </div>
                </div>
              </div>

              {/* Events */}
              {selectedTraj.events.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Événements</p>
                  <div className="space-y-2">
                    {selectedTraj.events.map((event, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 bg-muted rounded-lg text-sm"
                      >
                        {event.type === "speeding" && (
                          <AlertTriangleIcon className="h-4 w-4 text-orange-500" />
                        )}
                        {event.type === "start" && (
                          <NavigationIcon className="h-4 w-4 text-green-500" />
                        )}
                        {event.type === "stop" && (
                          <MapPinIcon className="h-4 w-4 text-red-500" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{t.events[event.type]}</p>
                          {event.details && (
                            <p className="text-xs text-muted-foreground">
                              {event.details}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString(locale)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => onViewDetails?.(selectedTraj)}
                className="w-full"
              >
                {t.trajectories.viewDetails}
              </Button>
            </>
          ) : (
            <Alert>
              <InfoIcon className="h-4 w-4" />

              <AlertDescription>{t.trajectories.noData}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* GPS Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="realtime">{t.settings.enableRealtime}</Label>
            <Switch
              id="realtime"
              checked={realtimeEnabled}
              onCheckedChange={setRealtimeEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoRecord">{t.settings.autoRecord}</Label>
            <Switch
              id="autoRecord"
              checked={autoRecord}
              onCheckedChange={setAutoRecord}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="speedAlerts">{t.settings.speedAlerts}</Label>
            <Switch
              id="speedAlerts"
              checked={speedAlerts}
              onCheckedChange={setSpeedAlerts}
            />
          </div>

          {speedAlerts && (
            <div className="space-y-2">
              <Label htmlFor="speedThreshold">
                {t.settings.speedThreshold}
              </Label>
              <Input
                id="speedThreshold"
                type="number"
                value={speedThreshold}
                onChange={(e) => setSpeedThreshold(e.target.value)}
              />
            </div>
          )}

          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription className="text-xs">
              {t.settings.privacy}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
