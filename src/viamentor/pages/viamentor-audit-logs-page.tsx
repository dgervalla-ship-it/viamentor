/**
 * VIAMENTOR - Audit Logs Page
 * Page consultation logs audit système (Super Admin)
 */

import {
  FileTextIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AuditLogsPage({ locale = "fr" }: { locale?: string }) {
  const logs = [
    {
      id: "1",
      timestamp: "2025-01-17 14:30:45",
      user: "admin@viamentor.ch",
      action: "USER_CREATED",
      resource: "User #3842",
      tenant: "Auto-École Genève",
      ip: "185.45.123.67",
      status: "success",
    },
    {
      id: "2",
      timestamp: "2025-01-17 14:28:12",
      user: "platform@viamentor.ch",
      action: "TENANT_SUSPENDED",
      resource: "Tenant #156",
      tenant: "Auto-École Lausanne",
      ip: "185.45.123.67",
      status: "success",
    },
    {
      id: "3",
      timestamp: "2025-01-17 14:25:33",
      user: "admin@viamentor.ch",
      action: "CONFIG_UPDATED",
      resource: "Feature Flags",
      tenant: "System",
      ip: "185.45.123.67",
      status: "success",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logs d'Audit</h1>
          <p className="text-muted-foreground mt-1">
            Traçabilité complète des actions système
          </p>
        </div>
        <Button variant="outline">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Logs (24h)
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+8% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actions Critiques
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Dernières 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs Actifs
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Dernière heure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Échecs</CardTitle>
            <FileTextIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">0.09% du total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Rechercher dans les logs..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Ressource</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="text-sm">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.resource}</TableCell>
                  <TableCell className="text-sm">{log.tenant}</TableCell>
                  <TableCell>
                    <Badge
                      className="bg-green-100 text-green-800"
                      variant="secondary"
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuditLogsPage;
