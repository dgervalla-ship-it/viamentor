/**
 * VIAMENTOR - Onboarding Step 2: Utilisateurs & Rôles
 * Table invitations, gestion équipe, import CSV
 */

import { useState, useCallback } from "react";
import { Plus, Trash2, Upload, Download, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  type UsersRolesData,
  type UserInviteData,
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/viamentor/data/viamentor-onboarding-i18n";

interface UsersRolesStepProps {
  data: Partial<UsersRolesData>;
  locale?: OnboardingLocale;
  onChange: (data: Partial<UsersRolesData>) => void;
}

export function UsersRolesStep({
  data,
  locale = "fr",
  onChange,
}: UsersRolesStepProps) {
  const t = ONBOARDING_I18N[locale].step2;
  const invites = data.invites || [];

  /**
   * Add new invite row
   */
  const handleAddInvite = useCallback(() => {
    const newInvite: UserInviteData = {
      email: "",
      role: "INSTRUCTOR",
      firstName: "",
      lastName: "",
      sendInviteNow: true,
    };
    onChange({ invites: [...invites, newInvite] });
  }, [invites, onChange]);

  /**
   * Update invite
   */
  const handleUpdateInvite = useCallback(
    (index: number, updates: Partial<UserInviteData>) => {
      const updated = [...invites];
      updated[index] = { ...updated[index], ...updates };
      onChange({ invites: updated });
    },
    [invites, onChange]
  );

  /**
   * Remove invite
   */
  const handleRemoveInvite = useCallback(
    (index: number) => {
      const updated = invites.filter((_, i) => i !== index);
      onChange({ invites: updated });
    },
    [invites, onChange]
  );

  /**
   * Import CSV (mock)
   */
  const handleImportCSV = useCallback(() => {
    // Mock CSV import
    const mockInvites: UserInviteData[] = [
      {
        email: "jean.dupont@example.ch",
        role: "INSTRUCTOR",
        firstName: "Jean",
        lastName: "Dupont",
        sendInviteNow: true,
      },
      {
        email: "marie.martin@example.ch",
        role: "SECRETARY",
        firstName: "Marie",
        lastName: "Martin",
        sendInviteNow: true,
      },
    ];

    onChange({ invites: [...invites, ...mockInvites] });
  }, [invites, onChange]);

  /**
   * Download CSV template
   */
  const handleDownloadTemplate = useCallback(() => {
    const csv = "email,role,firstName,lastName,sendInviteNow\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "viamentor-users-template.csv";
    a.click();
  }, []);

  // Count instructors
  const instructorCount = invites.filter(
    (inv) => inv.role === "INSTRUCTOR"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Alert Info */}
      <Alert>
        <Info className="w-4 h-4" />

        <AlertTitle>{t.alert.title}</AlertTitle>
        <AlertDescription>{t.alert.description}</AlertDescription>
      </Alert>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleAddInvite} size="sm">
          <Plus className="w-4 h-4 mr-2" />

          {t.addUser}
        </Button>
        <Button onClick={handleImportCSV} variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />

          {t.importCSV}
        </Button>
        <Button onClick={handleDownloadTemplate} variant="ghost" size="sm">
          <Download className="w-4 h-4 mr-2" />

          {t.downloadTemplate}
        </Button>
      </div>

      {/* Minimum Instructor Warning */}
      {instructorCount === 0 && (
        <Alert variant="destructive">
          <AlertDescription>{t.minimumInstructor}</AlertDescription>
        </Alert>
      )}

      {/* Invites Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 text-sm font-medium">
                  {t.table.email}
                </th>
                <th className="text-left p-3 text-sm font-medium">
                  {t.table.role}
                </th>
                <th className="text-left p-3 text-sm font-medium">
                  {t.table.name}
                </th>
                <th className="text-center p-3 text-sm font-medium">
                  {t.table.sendInvite}
                </th>
                <th className="text-center p-3 text-sm font-medium">
                  {t.table.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {invites.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-8 text-muted-foreground"
                  >
                    {t.addUser}
                  </td>
                </tr>
              ) : (
                invites.map((invite, index) => (
                  <tr key={index} className="border-t border-border">
                    {/* Email */}
                    <td className="p-3">
                      <Input
                        type="email"
                        value={invite.email}
                        onChange={(e) =>
                          handleUpdateInvite(index, { email: e.target.value })
                        }
                        placeholder="email@example.ch"
                        className="min-w-[200px]"
                      />
                    </td>

                    {/* Role */}
                    <td className="p-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Select
                                value={invite.role}
                                onValueChange={(value: any) =>
                                  handleUpdateInvite(index, { role: value })
                                }
                              >
                                <SelectTrigger className="min-w-[150px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="INSTRUCTOR">
                                    {t.roles.INSTRUCTOR}
                                  </SelectItem>
                                  <SelectItem value="SECRETARY">
                                    {t.roles.SECRETARY}
                                  </SelectItem>
                                  <SelectItem value="SCHOOL_ADMIN">
                                    {t.roles.SCHOOL_ADMIN}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">
                              {t.roles.tooltips[invite.role]}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>

                    {/* Name */}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Input
                          value={invite.firstName || ""}
                          onChange={(e) =>
                            handleUpdateInvite(index, {
                              firstName: e.target.value,
                            })
                          }
                          placeholder="Prénom"
                          className="min-w-[100px]"
                        />

                        <Input
                          value={invite.lastName || ""}
                          onChange={(e) =>
                            handleUpdateInvite(index, {
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Nom"
                          className="min-w-[100px]"
                        />
                      </div>
                    </td>

                    {/* Send Invite */}
                    <td className="p-3 text-center">
                      <Checkbox
                        checked={invite.sendInviteNow}
                        onCheckedChange={(checked) =>
                          handleUpdateInvite(index, {
                            sendInviteNow: checked as boolean,
                          })
                        }
                      />
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInvite(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Cards */}
      {invites.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t.preview.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invites.map((invite, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {invite.firstName?.[0] || invite.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {invite.firstName && invite.lastName
                        ? `${invite.firstName} ${invite.lastName}`
                        : invite.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {invite.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{t.roles[invite.role]}</Badge>
                  <Badge variant="outline">{t.preview.pending}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
