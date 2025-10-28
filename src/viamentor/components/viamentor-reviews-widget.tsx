/**
 * VIAMENTOR - Reviews Widget Component
 * Widget avis site web avec code intégration et preview
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, CopyIcon, StarIcon } from "lucide-react";
import {
  generateWidgetCode,
  type WidgetConfig,
} from "@/viamentor/data/viamentor-reviews-data";
import {
  reviewsTranslations,
  type ReviewsLocale,
} from "@/viamentor/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewsWidgetProps {
  placeId: string;
  config: WidgetConfig;
  locale?: ReviewsLocale;
  onSave?: (config: WidgetConfig) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewsWidget({
  placeId,
  config: initialConfig,
  locale = "fr",
  onSave,
}: ReviewsWidgetProps) {
  const t = reviewsTranslations[locale];
  const [config, setConfig] = useState(initialConfig);
  const [copied, setCopied] = useState(false);

  const widgetCode = generateWidgetCode(placeId, config);

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave?.(config);
  };

  return (
    <div className="space-y-6">
      {/* Code Widget */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.widget.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.widget.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="widgetCode"
              className="text-sm font-medium text-foreground"
            >
              {t.widget.code}
            </Label>
            <Textarea
              id="widgetCode"
              value={widgetCode}
              readOnly
              rows={6}
              className="font-mono text-xs bg-muted border-input text-foreground"
            />
          </div>

          <Button
            onClick={handleCopy}
            className="w-full bg-primary text-primary-foreground"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />

                {t.widget.copied}
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 mr-2" />

                {t.widget.copy}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Options Widget */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.widget.options.theme}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label
              htmlFor="theme"
              className="text-sm font-medium text-foreground"
            >
              {t.widget.options.theme}
            </Label>
            <Select
              value={config.theme}
              onValueChange={(value: "light" | "dark") =>
                setConfig({ ...config, theme: value })
              }
            >
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t.widget.themes.light}</SelectItem>
                <SelectItem value="dark">{t.widget.themes.dark}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Limit */}
          <div className="space-y-2">
            <Label
              htmlFor="limit"
              className="text-sm font-medium text-foreground"
            >
              {t.widget.options.limit}
            </Label>
            <Select
              value={config.limit.toString()}
              onValueChange={(value) =>
                setConfig({ ...config, limit: parseInt(value) as 5 | 10 | 20 })
              }
            >
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label
              htmlFor="sort"
              className="text-sm font-medium text-foreground"
            >
              {t.widget.options.sort}
            </Label>
            <Select
              value={config.sort}
              onValueChange={(value: "recent" | "rating" | "helpful") =>
                setConfig({ ...config, sort: value })
              }
            >
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">{t.widget.sorts.recent}</SelectItem>
                <SelectItem value="rating">{t.widget.sorts.rating}</SelectItem>
                <SelectItem value="helpful">
                  {t.widget.sorts.helpful}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <Label
              htmlFor="minRating"
              className="text-sm font-medium text-foreground"
            >
              {t.widget.options.minimumRating}
            </Label>
            <Select
              value={config.minimumRating.toString()}
              onValueChange={(value) =>
                setConfig({
                  ...config,
                  minimumRating: parseInt(value) as 0 | 4 | 5,
                })
              }
            >
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tous</SelectItem>
                <SelectItem value="4">4+ ⭐</SelectItem>
                <SelectItem value="5">5 ⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="showRatings"
                className="text-sm font-medium text-foreground"
              >
                {t.widget.options.showRatings}
              </Label>
              <Switch
                id="showRatings"
                checked={config.showRatings}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, showRatings: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="showAuthors"
                className="text-sm font-medium text-foreground"
              >
                {t.widget.options.showAuthors}
              </Label>
              <Switch
                id="showAuthors"
                checked={config.showAuthors}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, showAuthors: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="showDates"
                className="text-sm font-medium text-foreground"
              >
                {t.widget.options.showDates}
              </Label>
              <Switch
                id="showDates"
                checked={config.showDates}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, showDates: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="showReplies"
                className="text-sm font-medium text-foreground"
              >
                {t.widget.options.showReplies}
              </Label>
              <Switch
                id="showReplies"
                checked={config.showReplies}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, showReplies: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            {t.widget.preview}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg p-4 bg-background space-y-4">
            {/* Mock Review */}
            <div className="space-y-2">
              {config.showAuthors && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted" />

                  <span className="text-sm font-medium text-foreground">
                    Sophie Martin
                  </span>
                </div>
              )}
              {config.showRatings && (
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Excellente auto-école! Moniteurs patients et professionnels.
              </p>
              {config.showDates && (
                <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
              )}
              {config.showReplies && (
                <div className="ml-4 mt-2 p-2 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Merci Sophie pour votre confiance! 🎉
                  </p>
                </div>
              )}
            </div>
          </div>
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
