/**
 * VIAMENTOR Tenant Settings Tab
 *
 * Tab Settings avec accordion sections complètes
 *
 * @module components/viamentor-tenant-settings-tab
 * @version 1.0.0
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UploadIcon,
  PaletteIcon,
  PlugIcon,
  KeyIcon,
  BellIcon,
  AlertTriangleIcon,
  CopyIcon,
  TrashIcon,
  RefreshCwIcon,
  PlusIcon,
} from "lucide-react";

interface SettingsTabProps {
  onSave?: (section: string, data: any) => Promise<void>;
}

export function TenantSettingsTab({ onSave }: SettingsTabProps) {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [apiKeyName, setApiKeyName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // Mock API keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: "key-001",
      name: "Production API",
      key: "sk_live_***************",
      created: "2023-06-15",
      lastUsed: "2024-01-10",
    },
    {
      id: "key-002",
      name: "Development API",
      key: "sk_test_***************",
      created: "2023-08-20",
      lastUsed: "2024-01-09",
    },
  ]);

  // Mock modules
  const [modules, setModules] = useState({
    geolocation: true,
    smsNotifications: true,
    accountingIntegration: false,
    qrBill: true,
    bankReconciliation: false,
  });

  // Mock notifications
  const [notifications, setNotifications] = useState({
    systemUpdates: true,
    billing: true,
    security: true,
    marketing: false,
  });

  const handleGenerateApiKey = () => {
    const key = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setNewApiKey(key);
  };

  const handleSaveApiKey = () => {
    setApiKeys([
      ...apiKeys,
      {
        id: `key-${Date.now()}`,
        name: apiKeyName,
        key: newApiKey.replace(/(.{10}).*/, "$1***************"),
        created: new Date().toISOString().split("T")[0],
        lastUsed: "Never",
      },
    ]);
    setShowApiKeyDialog(false);
    setApiKeyName("");
    setNewApiKey("");
  };

  return (
    <>
      <div className="space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {/* Branding Section */}
          <AccordionItem value="branding" className="border rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <PaletteIcon className="h-5 w-5 text-primary" />

                <span className="text-lg font-semibold">Branding</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <div className="space-y-2">
                <Label>Logo personnalisé</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 border-2 border-dashed rounded-lg flex items-center justify-center">
                    <UploadIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      defaultValue="#3b82f6"
                      className="w-20 h-10"
                    />

                    <Input defaultValue="#3b82f6" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      defaultValue="#8b5cf6"
                      className="w-20 h-10"
                    />

                    <Input defaultValue="#8b5cf6" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Custom Domain (CNAME)</Label>
                <Input placeholder="app.votre-ecole.ch" />

                <p className="text-xs text-muted-foreground">
                  Configure your DNS to point to: viamentor.app
                </p>
              </div>

              <Button onClick={() => onSave?.("branding", {})}>
                Save branding
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Modules Section */}
          <AccordionItem value="modules" className="border rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <PlugIcon className="h-5 w-5 text-primary" />

                <span className="text-lg font-semibold">Modules</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <Alert>
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>
                  Certains modules peuvent nécessiter une reconfiguration après
                  activation/désactivation.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {Object.entries(modules).map(([key, enabled]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === "geolocation" &&
                          "Track instructor and student locations"}
                        {key === "smsNotifications" &&
                          "Send SMS reminders to students"}
                        {key === "accountingIntegration" &&
                          "Integrate with accounting software"}
                        {key === "qrBill" && "Generate Swiss QR bills"}
                        {key === "bankReconciliation" &&
                          "Automatic bank reconciliation"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        setModules({ ...modules, [key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button onClick={() => onSave?.("modules", modules)}>
                Save modules
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* API Keys Section */}
          <AccordionItem value="api-keys" className="border rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <KeyIcon className="h-5 w-5 text-primary" />

                <span className="text-lg font-semibold">API Keys</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setShowApiKeyDialog(true)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create new key
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <code className="text-xs">{key.key}</code>
                      </TableCell>
                      <TableCell className="text-sm">{key.created}</TableCell>
                      <TableCell className="text-sm">{key.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <RefreshCwIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <TrashIcon className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>

          {/* Notifications Section */}
          <AccordionItem
            value="notifications"
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <BellIcon className="h-5 w-5 text-primary" />

                <span className="text-lg font-semibold">Notifications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, enabled]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === "systemUpdates" &&
                          "Receive notifications about system updates"}
                        {key === "billing" &&
                          "Receive billing and payment notifications"}
                        {key === "security" &&
                          "Receive security alerts and warnings"}
                        {key === "marketing" &&
                          "Receive marketing and promotional emails"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button onClick={() => onSave?.("notifications", notifications)}>
                Save notifications
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Danger Zone Section */}
          <AccordionItem
            value="danger"
            className="border-2 border-destructive rounded-lg px-6 bg-destructive/5"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <AlertTriangleIcon className="h-5 w-5 text-destructive" />

                <span className="text-lg font-semibold text-destructive">
                  Danger Zone
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-base">Suspend Tenant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Temporarily suspend this tenant. Users won't be able to
                    access the system.
                  </p>
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setShowSuspendDialog(true)}
                  >
                    Suspend tenant
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-base text-destructive">
                    Delete Tenant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert variant="destructive">
                    <AlertTriangleIcon className="h-4 w-4" />

                    <AlertDescription>
                      <strong>WARNING:</strong> This action is permanent and
                      cannot be undone. All data will be permanently deleted.
                    </AlertDescription>
                  </Alert>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete tenant permanently
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Create API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              Generate a new API key for this tenant. The key will only be shown
              once.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Key Name</Label>
              <Input
                placeholder="Production API"
                value={apiKeyName}
                onChange={(e) => setApiKeyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Scopes</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="read" defaultChecked />

                  <Label htmlFor="read" className="font-normal">
                    Read access
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="write" defaultChecked />

                  <Label htmlFor="write" className="font-normal">
                    Write access
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delete" />

                  <Label htmlFor="delete" className="font-normal">
                    Delete access
                  </Label>
                </div>
              </div>
            </div>

            {!newApiKey && (
              <Button onClick={handleGenerateApiKey} className="w-full">
                Generate API Key
              </Button>
            )}

            {newApiKey && (
              <div className="space-y-2">
                <Label>Your API Key (copy now, won't be shown again)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={newApiKey}
                    readOnly
                    className="font-mono text-xs"
                  />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(newApiKey)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowApiKeyDialog(false);
                setNewApiKey("");
                setApiKeyName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveApiKey}
              disabled={!newApiKey || !apiKeyName}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Delete Tenant Permanently?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                This will permanently delete all data including users, students,
                lessons, and invoices.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Type DELETE to confirm</Label>
              <Input
                placeholder="DELETE"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteConfirmation("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteConfirmation !== "DELETE"}
              onClick={() => {
                console.log("Delete tenant");
                setShowDeleteDialog(false);
                setDeleteConfirmation("");
              }}
            >
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Tenant?</DialogTitle>
            <DialogDescription>
              Users won't be able to access the system until you reactivate it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-4">
            <Label>Reason for suspension</Label>
            <Input placeholder="Payment overdue, policy violation, etc." />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuspendDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Suspend tenant");
                setShowSuspendDialog(false);
              }}
            >
              Suspend Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
