/**
 * VIAMENTOR - Instructor Evaluations Page
 * Historique des évaluations de leçons pour moniteur
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
  ClipboardCheckIcon,
  SearchIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";

interface InstructorEvaluationsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const mockEvaluations = [
  {
    id: "1",
    student: "Sophie Laurent",
    date: "15 Jan 2025",
    type: "Pratique",
    themes: ["Circulation", "Stationnement"],
    rating: 4,
  },
  {
    id: "2",
    student: "Marc Dubois",
    date: "14 Jan 2025",
    type: "Pratique",
    themes: ["Autoroute", "Dépassement"],
    rating: 5,
  },
];

export function InstructorEvaluationsPage({
  locale = "fr",
}: InstructorEvaluationsPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Mes Évaluations
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Historique des évaluations de leçons
        </p>
      </div>

      <Card className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Rechercher une évaluation..."
            className="h-11 border-border pl-9"
          />
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Élève</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Thèmes</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEvaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="font-medium">{evaluation.student}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                    {evaluation.date}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{evaluation.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.themes.map((theme, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i < evaluation.rating ? "bg-yellow-500" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-border">
                    Voir détails
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
