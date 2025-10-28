/**
 * VIAMENTOR - Google Business Config Component
 * Configuration Google Business Profile avec connexion API et sync
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  StarIcon,
  RefreshCwIcon,
} from "lucide-react";
import type {
  GoogleBusinessConfig as ConfigType,
  SyncConfig,
  FilteringPolicy,
} from "@/viamentor/data/viamentor-reviews-data";
import {
  reviewsTranslations,
  type ReviewsLocale,
} from "@/viamentor/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface GoogleBusinessConfigProps {
  config: ConfigType;
  syncConfig: SyncConfig;
  filteringPolicy: FilteringPolicy;
  locale?: ReviewsLocale;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSyncNow?: () => void;
  onSave?: (data: {
    syncConfig: SyncConfig;
    filteringPolicy: FilteringPolicy;
  }) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function GoogleBusinessConfig({
  config,
  syncConfig: initialSyncConfig,
  filteringPolicy: initialFilteringPolicy,
  locale = "fr",
  onConnect,
  onDisconnect,
  onSyncNow,
  onSave,
}: GoogleBusinessConfigProps) {
  const t = reviewsTranslations[locale];
  const [placeId, setPlaceId] = useState(config.placeId);
  const [syncConfig, setSyncConfig] = useState(initialSyncConfig);
  const [filteringPolicy, setFilteringPolicy] = useState(
    initialFilteringPolicy
  );

  const handleSave = () => {
    onSave?.({ syncConfig, filteringPolicy });
  };

  return (
    <div className="space-y-6">
      {/* Configuration Google Business */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.config.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.config.permissionsWarning}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Place ID */}
          <div className="space-y-2">
            <Label
              htmlFor="placeId"
              className="text-sm font-medium text-foreground"
            >
              {t.config.placeId}
            </Label>
            <Input
              id="placeId"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              placeholder={t.config.placeIdPlaceholder}
              disabled={config.connected}
              className="bg-background border-input text-foreground"
            />
          </div>

          {/* Connection Status */}
          {config.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <CheckCircle2Icon className="h-3 w-3 mr-1" />

                  {t.config.connected}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.config.location}: {config.businessName}, {config.address}
              </p>

              {/* Stats Mini */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {t.config.stats.totalReviews}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {config.stats.totalReviews}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {t.config.stats.averageRating}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-foreground">
                      {config.stats.averageRating.toFixed(1)}
                    </p>
                    <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {t.config.stats.unreplied}
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {config.stats.unrepliedCount}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={onDisconnect}
                className="w-full"
              >
                {t.config.disconnect}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                <AlertTriangleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />

                <AlertDescription className="text-sm text-orange-900 dark:text-orange-100">
                  {t.config.permissionsWarning}
                </AlertDescription>
              </Alert>
              <Button
                onClick={onConnect}
                className="w-full bg-primary text-primary-foreground"
              >
                {t.config.connect}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Synchronisation Auto */}
      {config.connected && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              {t.sync.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle Sync */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="syncEnabled"
                className="text-sm font-medium text-foreground"
              >
                {t.sync.enabled}
              </Label>
              <Switch
                id="syncEnabled"
                checked={syncConfig.enabled}
                onCheckedChange={(checked) =>
                  setSyncConfig({ ...syncConfig, enabled: checked })
                }
              />
            </div>

            {/* Frequency */}
            {syncConfig.enabled && (
              <div className="space-y-2">
                <Label
                  htmlFor="frequency"
                  className="text-sm font-medium text-foreground"
                >
                  {t.sync.frequency}
                </Label>
                <Select
                  value={syncConfig.frequency}
                  onValueChange={(value: any) =>
                    setSyncConfig({ ...syncConfig, frequency: value })
                  }
                >
                  <SelectTrigger className="bg-background border-input text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">
                      {t.sync.frequencies.realtime}
                    </SelectItem>
                    <SelectItem value="hourly">
                      {t.sync.frequencies.hourly}
                    </SelectItem>
                    <SelectItem value="4xday">
                      {t.sync.frequencies["4xday"]}
                    </SelectItem>
                    <SelectItem value="daily">
                      {t.sync.frequencies.daily}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sync Status */}
            {syncConfig.lastSync && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t.sync.lastSync}:
                </span>
                <span className="text-foreground">
                  {new Date(syncConfig.lastSync).toLocaleString(locale)}
                </span>
              </div>
            )}

            <Button
              variant="outline"
              onClick={onSyncNow}
              disabled={syncConfig.status === "syncing"}
              className="w-full"
            >
              <RefreshCwIcon
                className={`h-4 w-4 mr-2 ${
                  syncConfig.status === "syncing" ? "animate-spin" : ""
                }`}
              />

              {syncConfig.status === "syncing"
                ? t.sync.status.syncing
                : t.actions.test}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filtrage Élèves Payants */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.filtering.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.filtering.policy}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="filterEnabled"
              className="text-sm font-medium text-foreground"
            >
              {t.filtering.enabled}
            </Label>
            <Switch
              id="filterEnabled"
              checked={filteringPolicy.enabled}
              onCheckedChange={(checked) =>
                setFilteringPolicy({ ...filteringPolicy, enabled: checked })
              }
            />
          </div>

          {filteringPolicy.enabled && (
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                {t.filtering.blockMessage}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={
            () =>
              console.warn(
                "Prevented function call: `window.history.back()`"
              ) /*TODO: Do not use window.history for navigation. Use react-router instead.*/
          }
        >
          {t.actions.cancel}
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground"
        >
          {t.actions.save}
        </Button>
      </div>
    </div>
  );
}
