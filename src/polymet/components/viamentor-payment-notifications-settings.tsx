/**
 * VIAMENTOR - Payment Notifications Settings
 * Configuration notifications emails
 */

"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card as CardWrapper,
  CardContent as CardContentWrapper,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Edit,
  Send,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Info,
} from "lucide-react";
import type {
  NotificationTemplate,
  NotificationLog,
} from "@/polymet/data/viamentor-payments-data";
import type { PaymentsTranslations } from "@/polymet/data/viamentor-payments-i18n";

interface PaymentNotificationsSettingsProps {
  templates: NotificationTemplate[];
  logs: NotificationLog[];
  locale?: PaymentsTranslations;
  onToggleTemplate?: (templateId: string, enabled: boolean) => void;
  onEditTemplate?: (template: NotificationTemplate) => void;
  onTestSend?: (templateId: string, recipient: string) => void;
}

export function PaymentNotificationsSettings({
  templates,
  logs,
  locale,
  onToggleTemplate,
  onEditTemplate,
  onTestSend,
}: PaymentNotificationsSettingsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<NotificationTemplate | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [currentPageTemplates, setCurrentPageTemplates] = useState(1);
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic for templates
  const totalPagesTemplates = Math.ceil(templates.length / itemsPerPage);
  const startIndexTemplates = (currentPageTemplates - 1) * itemsPerPage;
  const endIndexTemplates = startIndexTemplates + itemsPerPage;
  const paginatedTemplates = templates.slice(
    startIndexTemplates,
    endIndexTemplates
  );

  // Pagination logic for logs
  const totalPagesLogs = Math.ceil(logs.length / itemsPerPage);
  const startIndexLogs = (currentPageLogs - 1) * itemsPerPage;
  const endIndexLogs = startIndexLogs + itemsPerPage;
  const paginatedLogs = logs.slice(startIndexLogs, endIndexLogs);

  const handleEdit = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const handleTest = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setTestDialogOpen(true);
  };

  const handleSendTest = () => {
    if (selectedTemplate && testEmail && onTestSend) {
      onTestSend(selectedTemplate.id, testEmail);
      alert(locale?.notifications.testSendSuccess || "Email de test envoyé");
      setTestDialogOpen(false);
      setTestEmail("");
    }
  };

  const getTypeBadge = (type: string) => {
    const types = locale?.notifications.types || {};
    const label = types[type as keyof typeof types] || type;

    const variants: Record<string, string> = {
      receipt: "bg-green-600",
      validation_alert: "bg-orange-600",
      unreconciled_reminder: "bg-blue-600",
    };

    return (
      <Badge variant="default" className={variants[type] || "bg-gray-600"}>
        {label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-600" />;

      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;

      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />

        <AlertDescription>
          {locale?.notifications.description ||
            "Configuration des emails automatiques envoyés lors des paiements"}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">
            {locale?.notifications.templates || "Modèles"}
          </TabsTrigger>
          <TabsTrigger value="logs">
            {locale?.notifications.logs || "Historique"}
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale?.notifications.templates || "Modèles d'emails"}
              </CardTitle>
              <CardDescription>
                Configurer les emails automatiques envoyés aux élèves et
                administrateurs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden md:block border border-border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {locale?.notifications.templateName || "Nom"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.type || "Type"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.trigger || "Déclencheur"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.lastSent || "Dernier envoi"}
                      </TableHead>
                      <TableHead className="text-right">
                        {locale?.notifications.sentCount || "Envois"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.enabled || "Activé"}
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">
                          {template.name}
                        </TableCell>
                        <TableCell>{getTypeBadge(template.type)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                          {template.trigger}
                        </TableCell>
                        <TableCell className="text-sm">
                          {template.lastSent
                            ? new Date(template.lastSent).toLocaleString(
                                "fr-CH"
                              )
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline">{template.sentCount}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={template.enabled}
                            onCheckedChange={(checked) => {
                              if (onToggleTemplate) {
                                onToggleTemplate(template.id, checked);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTest(template)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile/Tablet Cards for Templates */}
              <div className="md:hidden space-y-4">
                {paginatedTemplates.map((template) => (
                  <CardWrapper key={template.id}>
                    <CardContentWrapper className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{template.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {template.trigger}
                          </div>
                        </div>
                        <Switch
                          checked={template.enabled}
                          onCheckedChange={(checked) => {
                            if (onToggleTemplate) {
                              onToggleTemplate(template.id, checked);
                            }
                          }}
                        />
                      </div>

                      {/* Type Badge */}
                      {getTypeBadge(template.type)}

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Dernier envoi</p>
                          <p className="font-medium">
                            {template.lastSent
                              ? new Date(template.lastSent).toLocaleDateString(
                                  "fr-CH"
                                )
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Envois</p>
                          <Badge variant="outline">{template.sentCount}</Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(template)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTest(template)}
                          className="flex-1"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Tester
                        </Button>
                      </div>
                    </CardContentWrapper>
                  </CardWrapper>
                ))}
              </div>

              {/* Pagination for Templates */}
              {totalPagesTemplates > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPageTemplates(
                            Math.max(1, currentPageTemplates - 1)
                          )
                        }
                        className={
                          currentPageTemplates === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: totalPagesTemplates },
                      (_, i) => i + 1
                    ).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPagesTemplates ||
                        (page >= currentPageTemplates - 1 &&
                          page <= currentPageTemplates + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPageTemplates(page)}
                              isActive={currentPageTemplates === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        page === currentPageTemplates - 2 ||
                        page === currentPageTemplates + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPageTemplates(
                            Math.min(
                              totalPagesTemplates,
                              currentPageTemplates + 1
                            )
                          )
                        }
                        className={
                          currentPageTemplates === totalPagesTemplates
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale?.notifications.logs || "Historique des envois"}
              </CardTitle>
              <CardDescription>
                Suivi de tous les emails envoyés automatiquement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Desktop Table for Logs */}
              <div className="hidden md:block border border-border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {locale?.notifications.logColumns.date || "Date"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.logColumns.type || "Type"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.logColumns.recipient ||
                          "Destinataire"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.logColumns.subject || "Sujet"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.logColumns.status || "Statut"}
                      </TableHead>
                      <TableHead>
                        {locale?.notifications.logColumns.payment || "Paiement"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          {new Date(log.sentDate).toLocaleString("fr-CH")}
                        </TableCell>
                        <TableCell>{getTypeBadge(log.type)}</TableCell>
                        <TableCell className="text-sm">
                          {log.recipient}
                        </TableCell>
                        <TableCell className="max-w-[250px] truncate">
                          {log.subject}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(log.status)}
                            <span className="text-sm">
                              {locale?.notifications.logStatus[
                                log.status as keyof typeof locale.notifications.logStatus
                              ] || log.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.paymentId ? (
                            <Badge variant="outline">{log.paymentId}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile/Tablet Cards for Logs */}
              <div className="md:hidden space-y-4">
                {paginatedLogs.map((log) => (
                  <CardWrapper key={log.id}>
                    <CardContentWrapper className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {log.subject}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(log.sentDate).toLocaleDateString("fr-CH")}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                        </div>
                      </div>

                      {/* Type Badge */}
                      {getTypeBadge(log.type)}

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Destinataire</p>
                          <p>{log.recipient}</p>
                        </div>
                        {log.paymentId && (
                          <div>
                            <p className="text-muted-foreground">Paiement</p>
                            <Badge variant="outline">{log.paymentId}</Badge>
                          </div>
                        )}
                      </div>
                    </CardContentWrapper>
                  </CardWrapper>
                ))}
              </div>

              {/* Pagination for Logs */}
              {totalPagesLogs > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPageLogs(Math.max(1, currentPageLogs - 1))
                        }
                        className={
                          currentPageLogs === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: totalPagesLogs },
                      (_, i) => i + 1
                    ).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPagesLogs ||
                        (page >= currentPageLogs - 1 &&
                          page <= currentPageLogs + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPageLogs(page)}
                              isActive={currentPageLogs === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        page === currentPageLogs - 2 ||
                        page === currentPageLogs + 2
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPageLogs(
                            Math.min(totalPagesLogs, currentPageLogs + 1)
                          )
                        }
                        className={
                          currentPageLogs === totalPagesLogs
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {locale?.notifications.actions.edit || "Modifier modèle"}
            </DialogTitle>
            <DialogDescription>
              Personnaliser le contenu de l'email automatique
            </DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{locale?.notifications.subject || "Sujet"}</Label>
                <Input defaultValue={selectedTemplate.subject} />
              </div>

              <div className="space-y-2">
                <Label>
                  {locale?.notifications.body || "Corps du message"}
                </Label>
                <Textarea
                  defaultValue={selectedTemplate.body}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">
                  {locale?.notifications.variables || "Variables disponibles"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable) => (
                    <Badge key={variable} variant="secondary">
                      {`{${variable}}`}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                if (selectedTemplate && onEditTemplate) {
                  onEditTemplate(selectedTemplate);
                }
                alert(locale?.notifications.saveSuccess || "Modèle enregistré");
                setEditDialogOpen(false);
              }}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Send Dialog */}
      <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale?.notifications.actions.test || "Tester l'envoi"}
            </DialogTitle>
            <DialogDescription>
              Envoyer un email de test pour vérifier le rendu
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email destinataire</Label>
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>

            {selectedTemplate && (
              <Alert>
                <Mail className="h-4 w-4" />

                <AlertDescription>
                  Un email de test sera envoyé avec le modèle "
                  {selectedTemplate.name}"
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTestDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendTest} disabled={!testEmail}>
              <Send className="h-4 w-4 mr-2" />
              Envoyer test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
