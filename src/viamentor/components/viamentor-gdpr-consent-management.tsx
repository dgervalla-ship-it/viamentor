/**
 * VIAMENTOR GDPR Consent Management
 *
 * Gestion des types de consentements configurables
 *
 * @module components/viamentor-gdpr-consent-management
 * @version 1.0.0
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EditIcon, EyeIcon, DownloadIcon, PlusIcon } from "lucide-react";
import { ConsentType } from "@/viamentor/data/viamentor-gdpr-data";

interface ConsentManagementProps {
  consents: ConsentType[];
  onEdit?: (consent: ConsentType) => void;
  onViewDetails?: (consentId: string) => void;
  onExport?: (consentId: string) => void;
  onCreate?: () => void;
}

export function GDPRConsentManagement({
  consents,
  onEdit,
  onViewDetails,
  onExport,
  onCreate,
}: ConsentManagementProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<ConsentType | null>(
    null
  );

  const handleEdit = (consent: ConsentType) => {
    setSelectedConsent(consent);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedConsent) {
      onEdit?.(selectedConsent);
    }
    setEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des consentements</h2>
          <p className="text-muted-foreground">
            {consents.length} types de consentements configurés
          </p>
        </div>
        <Button onClick={onCreate} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Nouveau type
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de consentement</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Requis</TableHead>
              <TableHead className="text-center">Opt-in par défaut</TableHead>
              <TableHead>Collecté via</TableHead>
              <TableHead>Utilisateurs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consents.map((consent) => {
              const percentage =
                (consent.usersConsented / consent.totalUsers) * 100;
              return (
                <TableRow key={consent.id}>
                  <TableCell className="font-medium">{consent.type}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">
                      {consent.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch checked={consent.required} disabled />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch checked={consent.defaultOptIn} disabled />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {consent.collectedVia.map((method) => (
                        <Badge
                          key={method}
                          variant="outline"
                          className="text-xs"
                        >
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {percentage.toFixed(1)}%
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {consent.usersConsented}/{consent.totalUsers}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(consent)}
                      >
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails?.(consent.id)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onExport?.(consent.id)}
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {consents.map((consent) => {
          const percentage =
            (consent.usersConsented / consent.totalUsers) * 100;
          return (
            <div
              key={consent.id}
              className="p-4 border rounded-lg space-y-3 bg-card"
            >
              <div className="space-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{consent.type}</h3>
                  {consent.required && (
                    <Badge variant="destructive" className="text-xs">
                      Requis
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {consent.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taux</span>
                  <span className="font-medium">{percentage.toFixed(1)}%</span>
                </div>
                <Progress value={percentage} />

                <p className="text-xs text-muted-foreground text-right">
                  {consent.usersConsented} / {consent.totalUsers} utilisateurs
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(consent)}
                  className="flex-1"
                >
                  <EditIcon className="h-4 w-4 mr-2" />
                  Éditer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails?.(consent.id)}
                  className="flex-1"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Éditer le type de consentement</DialogTitle>
          </DialogHeader>

          {selectedConsent && (
            <div className="space-y-4 py-4">
              <div>
                <Label>Type de consentement</Label>
                <Input
                  value={selectedConsent.type}
                  onChange={(e) =>
                    setSelectedConsent({
                      ...selectedConsent,
                      type: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedConsent.description}
                  onChange={(e) =>
                    setSelectedConsent({
                      ...selectedConsent,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={selectedConsent.required}
                  onCheckedChange={(checked) =>
                    setSelectedConsent({
                      ...selectedConsent,
                      required: checked as boolean,
                    })
                  }
                />

                <Label htmlFor="required" className="cursor-pointer">
                  Consentement requis (bloque signup si refusé)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="default-opt-in"
                  checked={selectedConsent.defaultOptIn}
                  onCheckedChange={(checked) =>
                    setSelectedConsent({
                      ...selectedConsent,
                      defaultOptIn: checked as boolean,
                    })
                  }
                />

                <Label htmlFor="default-opt-in" className="cursor-pointer">
                  Opt-in par défaut
                </Label>
              </div>

              <div>
                <Label>Collecté via</Label>
                <div className="space-y-2 mt-2">
                  {["Signup", "Settings", "Both"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={`method-${method}`}
                        checked={selectedConsent.collectedVia.includes(
                          method as any
                        )}
                      />

                      <Label
                        htmlFor={`method-${method}`}
                        className="cursor-pointer"
                      >
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
