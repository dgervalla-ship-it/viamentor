/**
 * VIAMENTOR - Notifications Filters
 * Sidebar filtres avec types, categories, priority, date range, sender
 */

"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  NotificationFilters,
  NotificationsLocale,
  NotificationType,
  NotificationCategory,
  NotificationPriority,
} from "@/polymet/data/viamentor-notifications-center-data";
import { getNotificationsCenterTranslations } from "@/polymet/data/viamentor-notifications-center-data";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationsFiltersProps {
  filters: NotificationFilters;
  locale?: NotificationsLocale;
  onFiltersChange: (filters: NotificationFilters) => void;
  onReset: () => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsFilters({
  filters,
  locale = "fr",
  onFiltersChange,
  onReset,
  className,
}: NotificationsFiltersProps) {
  const t = getNotificationsCenterTranslations(locale);

  // Type options
  const typeOptions: NotificationType[] = [
    "info",
    "success",
    "warning",
    "error",
    "system",
  ];

  // Category options
  const categoryOptions: NotificationCategory[] = [
    "students",
    "lessons",
    "payments",
    "messages",
    "system",
    "exams",
    "reviews",
    "documents",
  ];

  // Priority options
  const priorityOptions: NotificationPriority[] = ["high", "normal", "low"];

  // Handlers
  const handleTypeToggle = (type: NotificationType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleCategoryToggle = (category: NotificationCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriorityChange = (priority: string) => {
    onFiltersChange({
      ...filters,
      priority:
        priority === "all" ? undefined : (priority as NotificationPriority),
    });
  };

  const handleSenderChange = (sender: string) => {
    onFiltersChange({ ...filters, sender: sender || undefined });
  };

  const handleAttachmentToggle = (checked: boolean) => {
    onFiltersChange({ ...filters, hasAttachment: checked ? true : undefined });
  };

  const handleUnreadToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      status: checked ? ["unread"] : undefined,
    });
  };

  return (
    <div className={cn("flex h-full flex-col bg-card", className)}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {t.filters.title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <XIcon className="mr-2 h-4 w-4" />

            {t.actions.resetFilters}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          {/* Type Filters */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              {t.filters.type}
            </Label>
            <div className="space-y-2">
              {typeOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />

                  <label
                    htmlFor={`type-${type}`}
                    className="cursor-pointer text-sm text-foreground"
                  >
                    {t.types[type]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Category Filters */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              {t.filters.category}
            </Label>
            <div className="space-y-2">
              {categoryOptions.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />

                  <label
                    htmlFor={`category-${category}`}
                    className="cursor-pointer text-sm text-foreground"
                  >
                    {t.categories[category]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Priority Filter */}
          <div>
            <Label className="mb-3 block text-sm font-semibold text-foreground">
              {t.filters.priority}
            </Label>
            <RadioGroup
              value={filters.priority || "all"}
              onValueChange={handlePriorityChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="priority-all" />

                <label
                  htmlFor="priority-all"
                  className="cursor-pointer text-sm text-foreground"
                >
                  {t.periods.all}
                </label>
              </div>
              {priorityOptions.map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={priority}
                    id={`priority-${priority}`}
                  />

                  <label
                    htmlFor={`priority-${priority}`}
                    className="cursor-pointer text-sm text-foreground"
                  >
                    {t.priority[priority]}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Sender Search */}
          <div>
            <Label
              htmlFor="sender-search"
              className="mb-3 block text-sm font-semibold text-foreground"
            >
              {t.filters.sender}
            </Label>
            <Input
              id="sender-search"
              placeholder="Rechercher expéditeur..."
              value={filters.sender || ""}
              onChange={(e) => handleSenderChange(e.target.value)}
            />
          </div>

          <Separator />

          {/* Toggle Filters */}
          <div className="space-y-4">
            {/* With Attachment */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="with-attachment"
                className="text-sm text-foreground"
              >
                {t.filters.withAttachment}
              </Label>
              <Switch
                id="with-attachment"
                checked={filters.hasAttachment || false}
                onCheckedChange={handleAttachmentToggle}
              />
            </div>

            {/* Unread Only */}
            <div className="flex items-center justify-between">
              <Label htmlFor="unread-only" className="text-sm text-foreground">
                {t.filters.unreadOnly}
              </Label>
              <Switch
                id="unread-only"
                checked={filters.status?.includes("unread") || false}
                onCheckedChange={handleUnreadToggle}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
