/**
 * VIAMENTOR - Staff Management Page
 * Gestion de l'équipe administrative (secrétaires)
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UsersIcon,
  SearchIcon,
  PlusIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";

interface StaffManagementPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const mockStaff = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    phone: "+41 22 123 45 67",
    role: "Secrétaire principale",
    status: "active",
  },
  {
    id: "2",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "+41 22 123 45 68",
    role: "Secrétaire",
    status: "active",
  },
];

export function StaffManagementPage({
  locale = "fr",
}: StaffManagementPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Gestion Secrétaires
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Gestion de l'équipe administrative de l'auto-école
          </p>
        </div>
        <Button className="h-11">
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter un secrétaire
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Rechercher un secrétaire..."
            className="h-11 border-border pl-9"
          />
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />

                      {staff.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <PhoneIcon className="h-4 w-4" />

                      {staff.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/10 text-green-500"
                  >
                    Actif
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-border">
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
