/**
 * VIAMENTOR - Support Tickets Page
 * Gestion des demandes de support des tenants
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LifeBuoyIcon, SearchIcon, PlusIcon, ClockIcon } from "lucide-react";

interface SupportTicketsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const mockTickets = [
  {
    id: "#T-1234",
    tenant: "Auto-École Genève",
    subject: "Problème import paiements",
    priority: "high",
    status: "open",
    created: "Il y a 2h",
  },
  {
    id: "#T-1233",
    tenant: "École de Conduite Lausanne",
    subject: "Question sur facturation",
    priority: "medium",
    status: "in_progress",
    created: "Il y a 5h",
  },
];

export function SupportTicketsPage({ locale = "fr" }: SupportTicketsPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Gestion des demandes de support des tenants
          </p>
        </div>
        <Button className="h-11">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouveau ticket
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Rechercher un ticket..."
              className="h-11 border-border pl-9"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 w-full border-border sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="resolved">Résolu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.tenant}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      ticket.priority === "high"
                        ? "border-red-500/20 bg-red-500/10 text-red-500"
                        : "border-orange-500/20 bg-orange-500/10 text-orange-500"
                    }
                  >
                    {ticket.priority === "high" ? "Haute" : "Moyenne"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {ticket.status === "open" ? "Ouvert" : "En cours"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ClockIcon className="h-4 w-4" />

                    {ticket.created}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
