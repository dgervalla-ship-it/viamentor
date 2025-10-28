/**
 * VIAMENTOR Tenant Overview Tab
 *
 * Tab Overview avec édition inline, stats et timeline
 *
 * @module components/viamentor-tenant-overview-tab
 * @version 1.0.0
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckIcon,
  XIcon,
  EditIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  UploadIcon,
} from "lucide-react";
import {
  TenantDetail,
  TenantActivity,
} from "@/viamentor/data/viamentor-tenant-detail-data";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface OverviewTabProps {
  tenant: TenantDetail;
  activities: TenantActivity[];
  onUpdate?: (field: string, value: string) => Promise<void>;
  onLoadMore?: () => void;
}

export function TenantOverviewTab({
  tenant,
  activities,
  onUpdate,
  onLoadMore,
}: OverviewTabProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = async (field: string) => {
    await onUpdate?.(field, editValue);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const EditableField = ({
    field,
    label,
    value,
    multiline = false,
  }: {
    field: string;
    label: string;
    value: string;
    multiline?: boolean;
  }) => {
    const isEditing = editingField === field;

    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        {isEditing ? (
          <div className="flex items-start gap-2">
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1"
                rows={3}
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1"
              />
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleSave(field)}
              className="h-9 w-9 p-0"
            >
              <CheckIcon className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-9 w-9 p-0"
            >
              <XIcon className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer group"
            onClick={() => handleEdit(field, value)}
          >
            <p className="flex-1 text-sm">{value || "—"}</p>
            <EditIcon className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>
    );
  };

  const lessonsChange =
    ((tenant.stats.lessonsThisMonth - tenant.stats.lessonsLastMonth) /
      tenant.stats.lessonsLastMonth) *
    100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: General Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField
              field="name"
              label="Nom de l'école"
              value={tenant.name}
            />

            <EditableField
              field="description"
              label="Description"
              value={tenant.description}
              multiline
            />

            <EditableField
              field="address"
              label="Adresse complète"
              value={`${tenant.address.street}, ${tenant.address.postalCode} ${tenant.address.city}`}
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Téléphone
              </label>
              <a
                href={`tel:${tenant.contact.phone}`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm group"
              >
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />

                <span className="flex-1">{tenant.contact.phone}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                  Click to call
                </span>
              </a>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <a
                href={`mailto:${tenant.contact.email}`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm group"
              >
                <MailIcon className="h-4 w-4 text-muted-foreground" />

                <span className="flex-1">{tenant.contact.email}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                  Click to email
                </span>
              </a>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Site web
              </label>
              <a
                href={tenant.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm group"
              >
                <GlobeIcon className="h-4 w-4 text-muted-foreground" />

                <span className="flex-1">{tenant.contact.website}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                  Open ↗
                </span>
              </a>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Canton
              </label>
              <div className="p-2 text-sm">
                <Badge variant="outline">{tenant.address.canton}</Badge>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Logo
              </label>
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={tenant.logo} />

                  <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="gap-2">
                  <UploadIcon className="h-4 w-4" />
                  Change logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Stats + Timeline */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold">
                    {tenant.stats.studentsCount}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUpIcon className="h-4 w-4" />

                  <span className="text-sm font-medium">
                    +{tenant.stats.studentsTrend}%
                  </span>
                </div>
              </div>
              <GraduationCapIcon className="h-8 w-8 text-muted-foreground/20 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Instructors</p>
                  <p className="text-2xl font-bold">
                    {tenant.stats.instructorsCount}
                  </p>
                </div>
              </div>
              <UsersIcon className="h-8 w-8 text-muted-foreground/20 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lessons (ce mois)
                  </p>
                  <p className="text-2xl font-bold">
                    {tenant.stats.lessonsThisMonth}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 ${lessonsChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {lessonsChange >= 0 ? (
                    <TrendingUpIcon className="h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {lessonsChange >= 0 ? "+" : ""}
                    {lessonsChange.toFixed(1)}%
                  </span>
                </div>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground/20 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">MRR</p>
                  <p className="text-2xl font-bold">
                    CHF {tenant.stats.mrr.toLocaleString("fr-CH")}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUpIcon className="h-4 w-4" />

                  <span className="text-sm font-medium">
                    +{tenant.stats.mrrChange}%
                  </span>
                </div>
              </div>
              <DollarSignIcon className="h-8 w-8 text-muted-foreground/20 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />

              <span className="text-muted-foreground">Active depuis</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(tenant.stats.activeSince), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.userAvatar} />

                    <AvatarFallback>
                      {activity.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.userName}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">{activity.entity}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {onLoadMore && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLoadMore}
                className="w-full mt-4"
              >
                Load more
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
