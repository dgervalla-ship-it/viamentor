/**
 * VIAMENTOR - Feature Flags Page
 * Gestion des fonctionnalités activables par tenant
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import {
  FlagIcon,
  SearchIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface FeatureFlagsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  tenants: number;
  category: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockFeatures: FeatureFlag[] = [
  {
    id: "1",
    name: "Rattrapages automatiques",
    description: "Système de crédits de rattrapage pour les élèves",
    enabled: true,
    tenants: 87,
    category: "Pédagogie",
  },
  {
    id: "2",
    name: "Avis Google",
    description: "Collecte et gestion des avis Google Business",
    enabled: true,
    tenants: 45,
    category: "Marketing",
  },
  {
    id: "3",
    name: "Pixels tracking",
    description: "Monitoring santé pixels Facebook/Google",
    enabled: false,
    tenants: 12,
    category: "Marketing",
  },
  {
    id: "4",
    name: "Paiements Camt.054",
    description: "Import automatique paiements bancaires",
    enabled: true,
    tenants: 34,
    category: "Finance",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function FeatureFlagsPage({ locale = "fr" }: FeatureFlagsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Feature Flags
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Gestion des fonctionnalités activables par tenant
          </p>
        </div>

        <Button className="h-11">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouvelle feature
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Rechercher une feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 border-border pl-9"
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="h-11 w-full border-border sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              <SelectItem value="pedagogy">Pédagogie</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Features Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-center">Tenants</TableHead>
              <TableHead className="text-center">Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFeatures.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FlagIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{feature.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{feature.tenants}</span>
                </TableCell>
                <TableCell className="text-center">
                  {feature.enabled ? (
                    <div className="flex items-center justify-center gap-1 text-green-500">
                      <CheckCircleIcon className="h-4 w-4" />

                      <span className="text-sm">Activée</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <XCircleIcon className="h-4 w-4" />

                      <span className="text-sm">Désactivée</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Switch checked={feature.enabled} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
