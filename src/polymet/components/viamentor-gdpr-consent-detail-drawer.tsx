/**
 * VIAMENTOR GDPR Consent Detail Drawer
 *
 * Drawer détail consent avec users tracking
 *
 * @module components/viamentor-gdpr-consent-detail-drawer
 * @version 1.0.0
 */

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  SearchIcon,
  XIcon,
  AlertTriangleIcon,
  DownloadIcon,
} from "lucide-react";
import { ConsentType, UserConsent } from "@/polymet/data/viamentor-gdpr-data";

interface ConsentDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consentType: ConsentType | null;
  userConsents: UserConsent[];
  onRevokeConsent?: (userId: string) => void;
  onRevokeAll?: () => void;
  onExport?: () => void;
}

export function GDPRConsentDetailDrawer({
  open,
  onOpenChange,
  consentType,
  userConsents,
  onRevokeConsent,
  onRevokeAll,
  onExport,
}: ConsentDetailDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [revokeAllDialog, setRevokeAllDialog] = useState(false);
  const [revokeUserId, setRevokeUserId] = useState<string | null>(null);

  if (!consentType) return null;

  const filteredConsents = userConsents.filter(
    (consent) =>
      consent.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consent.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConsents = filteredConsents.filter((c) => !c.revoked);
  const revokedConsents = filteredConsents.filter((c) => c.revoked);
  const consentRate = (activeConsents.length / consentType.totalUsers) * 100;

  const handleRevoke = (userId: string) => {
    onRevokeConsent?.(userId);
    setRevokeUserId(null);
  };

  const handleRevokeAll = () => {
    onRevokeAll?.();
    setRevokeAllDialog(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">{consentType.type}</SheetTitle>
            <p className="text-sm text-muted-foreground">
              {consentType.description}
            </p>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{consentType.totalUsers}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Consentis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {consentRate.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Révoqués
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-destructive">
                    {revokedConsents.length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={onExport} className="gap-2">
                <DownloadIcon className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            {/* Users Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsents.map((consent) => (
                    <TableRow
                      key={consent.id}
                      className={consent.revoked ? "opacity-50" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={consent.userAvatar} />

                            <AvatarFallback>
                              {consent.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {consent.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {consent.userEmail}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(consent.consentDate).toLocaleDateString(
                          "fr-FR"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {consent.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{consent.country}</span>
                          <span className="text-muted-foreground">
                            {consent.ipAddress}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {consent.revoked ? (
                          <Badge variant="destructive" className="text-xs">
                            Révoqué
                          </Badge>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRevokeUserId(consent.userId)}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5" />
                  Zone dangereuse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Révoquer tous les consentements pour ce type. Cette action
                  enverra une notification email à tous les utilisateurs
                  concernés.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setRevokeAllDialog(true)}
                >
                  Révoquer tous les consentements
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      {/* Revoke Single Consent Dialog */}
      <AlertDialog
        open={!!revokeUserId}
        onOpenChange={(open) => !open && setRevokeUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Révoquer le consentement ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action révoquera le consentement pour cet utilisateur. Une
              notification email sera envoyée automatiquement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => revokeUserId && handleRevoke(revokeUserId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Révoquer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Revoke All Dialog */}
      <AlertDialog open={revokeAllDialog} onOpenChange={setRevokeAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangleIcon className="h-5 w-5" />
              Révoquer TOUS les consentements ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              ⚠️ <strong>ATTENTION:</strong> Cette action révoquera le
              consentement pour <strong>{activeConsents.length}</strong>{" "}
              utilisateurs. Des notifications email seront envoyées en masse.
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeAll}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirmer la révocation massive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
