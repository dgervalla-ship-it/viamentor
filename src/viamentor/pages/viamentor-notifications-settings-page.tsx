/**
 * VIAMENTOR - Notifications Settings Page
 * Page principale paramètres notifications et communications
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MailIcon,
  MessageSquareIcon,
  BellIcon,
  ZapIcon,
  FileTextIcon,
  SettingsIcon,
  UsersIcon,
  SaveIcon,
  TestTubeIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  PlusIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
} from "lucide-react";
import {
  notificationsTranslations,
  type NotificationsLocale,
} from "@/viamentor/data/viamentor-notifications-i18n";
import {
  mockChannels,
  mockEventTriggers,
  mockEmailTemplates,
  mockSMSTemplates,
  mockSendingPreferences,
  mockDistributionLists,
  type CommunicationChannels,
  type EventTrigger,
  type EmailTemplate,
  type SMSTemplate,
  type SendingPreferences,
  type DistributionList,
} from "@/viamentor/data/viamentor-notifications-data";
import { getAllVariables } from "@/viamentor/data/viamentor-template-variables";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationsSettingsPageProps {
  locale?: NotificationsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsSettingsPage({
  locale = "fr",
}: NotificationsSettingsPageProps) {
  const t = notificationsTranslations[locale];

  // State
  const [channels, setChannels] = useState<CommunicationChannels>(mockChannels);
  const [triggers, setTriggers] = useState<EventTrigger[]>(mockEventTriggers);
  const [emailTemplates, setEmailTemplates] =
    useState<EmailTemplate[]>(mockEmailTemplates);
  const [smsTemplates, setSmsTemplates] =
    useState<SMSTemplate[]>(mockSMSTemplates);
  const [preferences, setPreferences] = useState<SendingPreferences>(
    mockSendingPreferences
  );
  const [lists, setLists] = useState<DistributionList[]>(mockDistributionLists);

  const variables = getAllVariables();
  const budgetPercentage =
    (channels.sms.currentUsage / (channels.sms.monthlyBudget || 1)) * 100;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">
            Configuration des canaux de communication et templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert("Reset templates")}>
            {t.actions.reset}
          </Button>
          <Button onClick={() => alert("Save configuration")}>
            <SaveIcon className="w-4 h-4 mr-2" />

            {t.actions.save}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="channels">
            <MailIcon className="w-4 h-4 mr-2" />
            Canaux
          </TabsTrigger>
          <TabsTrigger value="triggers">
            <ZapIcon className="w-4 h-4 mr-2" />
            Triggers
          </TabsTrigger>
          <TabsTrigger value="email-templates">
            <FileTextIcon className="w-4 h-4 mr-2" />
            Emails
          </TabsTrigger>
          <TabsTrigger value="sms-templates">
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            SMS
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Préférences
          </TabsTrigger>
          <TabsTrigger value="lists">
            <UsersIcon className="w-4 h-4 mr-2" />
            Listes
          </TabsTrigger>
        </TabsList>

        {/* Tab: Channels */}
        <TabsContent value="channels" className="space-y-6">
          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="w-5 h-5" />

                {t.channels.email.title}
              </CardTitle>
              <CardDescription>{t.channels.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{t.channels.email.enabled}</Label>
                <Switch checked={channels.email.enabled} />
              </div>
              <div className="flex items-center justify-between">
                <Label>{t.channels.email.useDefault}</Label>
                <Switch checked={channels.email.useDefault} />
              </div>
              {!channels.email.useDefault && (
                <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 border-border">
                  <div>
                    <Label>{t.channels.email.customHost}</Label>
                    <Input placeholder="smtp.example.com" />
                  </div>
                  <div>
                    <Label>{t.channels.email.port}</Label>
                    <Input type="number" placeholder="587" />
                  </div>
                  <div>
                    <Label>{t.channels.email.username}</Label>
                    <Input placeholder="user@example.com" />
                  </div>
                  <div>
                    <Label>{t.channels.email.password}</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder={t.channels.email.testEmail}
                  defaultValue={channels.email.testEmail}
                  className="flex-1"
                />

                <Button variant="outline">
                  <TestTubeIcon className="w-4 h-4 mr-2" />

                  {t.channels.email.testButton}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SMS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="w-5 h-5" />

                {t.channels.sms.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{t.channels.sms.enabled}</Label>
                <Switch checked={channels.sms.enabled} />
              </div>
              {channels.sms.enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t.channels.sms.provider}</Label>
                      <Select defaultValue={channels.sms.provider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twint">Twint</SelectItem>
                          <SelectItem value="vonage">Vonage</SelectItem>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="messagebird">
                            MessageBird
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t.channels.sms.senderName}</Label>
                      <Input defaultValue={channels.sms.senderName} />
                    </div>
                    <div>
                      <Label>{t.channels.sms.apiKey}</Label>
                      <Input
                        type="password"
                        defaultValue={channels.sms.apiKey}
                      />
                    </div>
                    <div>
                      <Label>{t.channels.sms.monthlyBudget}</Label>
                      <Input
                        type="number"
                        defaultValue={channels.sms.monthlyBudget}
                      />
                    </div>
                  </div>

                  {budgetPercentage >= 80 && (
                    <Alert>
                      <AlertTriangleIcon className="w-4 h-4" />

                      <AlertDescription>
                        {t.channels.sms.budgetWarning}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">
                      {t.channels.sms.currentUsage}
                    </span>
                    <Badge
                      variant={
                        budgetPercentage >= 80 ? "destructive" : "secondary"
                      }
                    >
                      CHF {channels.sms.currentUsage} /{" "}
                      {channels.sms.monthlyBudget}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder={t.channels.sms.testNumber}
                      defaultValue={channels.sms.testNumber}
                      className="flex-1"
                    />

                    <Button variant="outline">
                      <TestTubeIcon className="w-4 h-4 mr-2" />

                      {t.channels.sms.testButton}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Push & WhatsApp */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellIcon className="w-5 h-5" />

                  {t.channels.push.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t.channels.push.enabled}</Label>
                  <Switch checked={channels.push.enabled} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareIcon className="w-5 h-5" />

                  {t.channels.whatsapp.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t.channels.whatsapp.enabled}</Label>
                  <Switch checked={channels.whatsapp.enabled} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Triggers */}
        <TabsContent value="triggers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.triggers.title}</CardTitle>
                  <CardDescription>{t.triggers.description}</CardDescription>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />

                  {t.triggers.addButton}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.triggers.table.event}</TableHead>
                    <TableHead>{t.triggers.table.channels}</TableHead>
                    <TableHead>{t.triggers.table.recipients}</TableHead>
                    <TableHead>{t.triggers.table.delay}</TableHead>
                    <TableHead>{t.triggers.table.active}</TableHead>
                    <TableHead>{t.triggers.table.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {triggers.map((trigger) => (
                    <TableRow key={trigger.id}>
                      <TableCell className="font-medium">
                        {trigger.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {trigger.channels.map((channel) => (
                            <Badge key={channel} variant="outline">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {trigger.recipients.map((recipient) => (
                            <Badge key={recipient} variant="secondary">
                              {t.triggers.recipients[recipient]}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {trigger.delay?.type === "immediate"
                          ? t.triggers.delay.immediate
                          : `${trigger.delay?.value} ${t.triggers.delay[trigger.delay?.type || "immediate"]}`}
                      </TableCell>
                      <TableCell>
                        <Switch checked={trigger.active} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Email Templates */}
        <TabsContent value="email-templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.emailTemplates.title}</CardTitle>
                  <CardDescription>
                    {t.emailTemplates.description}
                  </CardDescription>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />

                  {t.emailTemplates.createButton}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.emailTemplates.table.name}</TableHead>
                    <TableHead>{t.emailTemplates.table.language}</TableHead>
                    <TableHead>{t.emailTemplates.table.event}</TableHead>
                    <TableHead>{t.emailTemplates.table.lastModified}</TableHead>
                    <TableHead>{t.emailTemplates.table.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {template.language.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {template.event
                          ? t.triggers.events[template.event]
                          : "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(template.lastModified).toLocaleDateString(
                          locale
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                          {!template.isSystem && (
                            <Button variant="ghost" size="sm">
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Variables Reference */}
          <Card>
            <CardHeader>
              <CardTitle>{t.emailTemplates.editor.variables}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {variables.slice(0, 12).map((variable) => (
                  <div
                    key={variable.variable}
                    className="p-2 bg-muted rounded text-sm"
                  >
                    <code className="font-mono text-xs">
                      {variable.variable}
                    </code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {variable.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: SMS Templates */}
        <TabsContent value="sms-templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.smsTemplates.title}</CardTitle>
                  <CardDescription>
                    {t.smsTemplates.description}
                  </CardDescription>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />

                  {t.emailTemplates.createButton}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangleIcon className="w-4 h-4" />

                <AlertDescription>
                  SMS facturés selon fournisseur, privilégier messages concis
                </AlertDescription>
              </Alert>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.emailTemplates.table.name}</TableHead>
                    <TableHead>{t.emailTemplates.table.language}</TableHead>
                    <TableHead>{t.smsTemplates.characterCount}</TableHead>
                    <TableHead>{t.emailTemplates.table.event}</TableHead>
                    <TableHead>{t.emailTemplates.table.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {smsTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {template.language.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            template.characterCount > 160
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {template.characterCount}/160
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {template.event
                          ? t.triggers.events[template.event]
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.preferences.title}</CardTitle>
              <CardDescription>{t.preferences.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Test Mode */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">
                      {t.preferences.testMode.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t.preferences.testMode.description}
                    </p>
                  </div>
                  <Switch checked={preferences.testMode} />
                </div>
                {preferences.testMode && (
                  <Alert>
                    <AlertTriangleIcon className="w-4 h-4" />

                    <AlertDescription>
                      Mode test actif - Tous les envois vers{" "}
                      {preferences.testEmail}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Throttling */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">
                    {t.preferences.throttling.title}
                  </Label>
                  <Switch checked={preferences.throttling.enabled} />
                </div>
                {preferences.throttling.enabled && (
                  <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 border-border">
                    <div>
                      <Label>{t.preferences.throttling.maxEmailsPerHour}</Label>
                      <Input
                        type="number"
                        defaultValue={preferences.throttling.maxEmailsPerHour}
                      />
                    </div>
                    <div>
                      <Label>{t.preferences.throttling.maxSMSPerHour}</Label>
                      <Input
                        type="number"
                        defaultValue={preferences.throttling.maxSMSPerHour}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Retry */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">
                    {t.preferences.retry.title}
                  </Label>
                  <Switch checked={preferences.retry.enabled} />
                </div>
                {preferences.retry.enabled && (
                  <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 border-border">
                    <div>
                      <Label>{t.preferences.retry.maxAttempts}</Label>
                      <Input
                        type="number"
                        defaultValue={preferences.retry.maxAttempts}
                      />
                    </div>
                    <div>
                      <Label>{t.preferences.retry.delayMinutes}</Label>
                      <Input
                        type="number"
                        defaultValue={preferences.retry.delayMinutes}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tracking */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">
                    {t.preferences.tracking.title}
                  </Label>
                  <Switch checked={preferences.tracking.enabled} />
                </div>
                {preferences.tracking.enabled && (
                  <div className="pl-6 border-l-2 border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t.preferences.tracking.informRecipients}</Label>
                      <Switch checked={preferences.tracking.informRecipients} />
                    </div>
                    <Alert>
                      <CheckCircle2Icon className="w-4 h-4" />

                      <AlertDescription>
                        {t.preferences.tracking.gdprInfo}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Lists */}
        <TabsContent value="lists" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.lists.title}</CardTitle>
                  <CardDescription>{t.lists.description}</CardDescription>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />

                  {t.lists.createButton}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.lists.table.name}</TableHead>
                    <TableHead>{t.lists.table.description}</TableHead>
                    <TableHead>{t.lists.table.subscribers}</TableHead>
                    <TableHead>{t.lists.table.type}</TableHead>
                    <TableHead>{t.lists.table.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lists.map((list) => (
                    <TableRow key={list.id}>
                      <TableCell className="font-medium">{list.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {list.description}
                      </TableCell>
                      <TableCell>
                        <Badge>{list.subscriberCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            list.type === "automatic" ? "default" : "secondary"
                          }
                        >
                          {t.lists.types[list.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
