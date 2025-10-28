/**
 * VIAMENTOR - Exams Results Page
 * Page résultats examens avec statistiques, filtres avancés et export
 *
 * @module pages/viamentor-exams-results-page
 * @version 1.0.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AwardIcon,
  XCircleIcon,
  UsersIcon,
  CalendarIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsResultsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Résultats Examens",
    subtitle: "Suivi des résultats et statistiques de réussite",
    stats: {
      successRate: "Taux de réussite",
      avgAttempts: "Tentatives moyennes",
      totalExams: "Total examens",
      thisMonth: "ce mois",
    },
    filters: {
      search: "Rechercher élève...",
      type: "Type examen",
      allTypes: "Tous types",
      theory: "Théorique",
      practical: "Pratique",
      category: "Catégorie",
      allCategories: "Toutes",
      period: "Période",
      allPeriods: "Toutes",
      result: "Résultat",
      allResults: "Tous",
      passed: "Réussi",
      failed: "Échoué",
    },
    table: {
      student: "Élève",
      date: "Date",
      type: "Type",
      category: "Catégorie",
      result: "Résultat",
      score: "Score",
      attempt: "Tentative",
      instructor: "Moniteur",
      actions: "Actions",
    },
    actions: {
      viewDetails: "Voir détail",
      downloadCertificate: "Télécharger certificat",
      export: "Exporter",
    },
    result: {
      passed: "Réussi",
      failed: "Échoué",
    },
  },
  de: {
    title: "Prüfungsergebnisse",
    subtitle: "Verfolgung der Ergebnisse und Erfolgsstatistiken",
    stats: {
      successRate: "Erfolgsquote",
      avgAttempts: "Durchschnittliche Versuche",
      totalExams: "Prüfungen gesamt",
      thisMonth: "diesen Monat",
    },
    filters: {
      search: "Schüler suchen...",
      type: "Prüfungstyp",
      allTypes: "Alle Typen",
      theory: "Theoretisch",
      practical: "Praktisch",
      category: "Kategorie",
      allCategories: "Alle",
      period: "Zeitraum",
      allPeriods: "Alle",
      result: "Ergebnis",
      allResults: "Alle",
      passed: "Bestanden",
      failed: "Nicht bestanden",
    },
    table: {
      student: "Schüler",
      date: "Datum",
      type: "Typ",
      category: "Kategorie",
      result: "Ergebnis",
      score: "Punktzahl",
      attempt: "Versuch",
      instructor: "Fahrlehrer",
      actions: "Aktionen",
    },
    actions: {
      viewDetails: "Details anzeigen",
      downloadCertificate: "Zertifikat herunterladen",
      export: "Exportieren",
    },
    result: {
      passed: "Bestanden",
      failed: "Nicht bestanden",
    },
  },
  it: {
    title: "Risultati Esami",
    subtitle: "Monitoraggio dei risultati e statistiche di successo",
    stats: {
      successRate: "Tasso di successo",
      avgAttempts: "Tentativi medi",
      totalExams: "Esami totali",
      thisMonth: "questo mese",
    },
    filters: {
      search: "Cerca studente...",
      type: "Tipo esame",
      allTypes: "Tutti i tipi",
      theory: "Teorico",
      practical: "Pratico",
      category: "Categoria",
      allCategories: "Tutte",
      period: "Periodo",
      allPeriods: "Tutti",
      result: "Risultato",
      allResults: "Tutti",
      passed: "Superato",
      failed: "Fallito",
    },
    table: {
      student: "Studente",
      date: "Data",
      type: "Tipo",
      category: "Categoria",
      result: "Risultato",
      score: "Punteggio",
      attempt: "Tentativo",
      instructor: "Istruttore",
      actions: "Azioni",
    },
    actions: {
      viewDetails: "Vedi dettagli",
      downloadCertificate: "Scarica certificato",
      export: "Esporta",
    },
    result: {
      passed: "Superato",
      failed: "Fallito",
    },
  },
  en: {
    title: "Exam Results",
    subtitle: "Tracking results and success statistics",
    stats: {
      successRate: "Success rate",
      avgAttempts: "Average attempts",
      totalExams: "Total exams",
      thisMonth: "this month",
    },
    filters: {
      search: "Search student...",
      type: "Exam type",
      allTypes: "All types",
      theory: "Theory",
      practical: "Practical",
      category: "Category",
      allCategories: "All",
      period: "Period",
      allPeriods: "All",
      result: "Result",
      allResults: "All",
      passed: "Passed",
      failed: "Failed",
    },
    table: {
      student: "Student",
      date: "Date",
      type: "Type",
      category: "Category",
      result: "Result",
      score: "Score",
      attempt: "Attempt",
      instructor: "Instructor",
      actions: "Actions",
    },
    actions: {
      viewDetails: "View details",
      downloadCertificate: "Download certificate",
      export: "Export",
    },
    result: {
      passed: "Passed",
      failed: "Failed",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockResults = [
  {
    id: "1",
    student: "Marie Dupont",
    studentId: "S001",
    date: "2024-01-15",
    type: "theory",
    category: "B",
    result: "passed",
    score: 48,
    maxScore: 50,
    attempt: 1,
    instructor: "Jean Martin",
  },
  {
    id: "2",
    student: "Pierre Dubois",
    studentId: "S002",
    date: "2024-01-14",
    type: "practical",
    category: "B",
    result: "failed",
    score: 65,
    maxScore: 100,
    attempt: 2,
    instructor: "Sophie Laurent",
  },
  {
    id: "3",
    student: "Julie Bernard",
    studentId: "S003",
    date: "2024-01-13",
    type: "theory",
    category: "A",
    result: "passed",
    score: 45,
    maxScore: 50,
    attempt: 1,
    instructor: "Jean Martin",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamsResultsPage({ locale = "fr" }: ExamsResultsPageProps) {
  const t = translations[locale];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {t.subtitle}
          </p>
        </div>
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />

          {t.actions.export}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.stats.successRate}
                </p>
                <p className="text-2xl sm:text-3xl font-bold">78%</p>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <TrendingUpIcon className="h-3 w-3" />

                  <span>+5%</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.stats.avgAttempts}
                </p>
                <p className="text-2xl sm:text-3xl font-bold">1.8</p>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <TrendingDownIcon className="h-3 w-3" />

                  <span>-0.2</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <AwardIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.stats.totalExams}
                </p>
                <p className="text-2xl sm:text-3xl font-bold">156</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">+12</span>
                  <span>{t.stats.thisMonth}</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.filters.failed}
                </p>
                <p className="text-2xl sm:text-3xl font-bold">34</p>
                <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                  <TrendingUpIcon className="h-3 w-3" />

                  <span>+3</span>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input placeholder={t.filters.search} className="pl-9 h-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.allTypes}</SelectItem>
                <SelectItem value="theory">{t.filters.theory}</SelectItem>
                <SelectItem value="practical">{t.filters.practical}</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.allCategories}</SelectItem>
                <SelectItem value="B">Catégorie B</SelectItem>
                <SelectItem value="A">Catégorie A</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.allResults}</SelectItem>
                <SelectItem value="passed">{t.filters.passed}</SelectItem>
                <SelectItem value="failed">{t.filters.failed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.table.student}</TableHead>
                  <TableHead>{t.table.date}</TableHead>
                  <TableHead>{t.table.type}</TableHead>
                  <TableHead>{t.table.category}</TableHead>
                  <TableHead>{t.table.result}</TableHead>
                  <TableHead>{t.table.score}</TableHead>
                  <TableHead>{t.table.attempt}</TableHead>
                  <TableHead>{t.table.instructor}</TableHead>
                  <TableHead className="text-right">
                    {t.table.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/students/${result.studentId}`}
                        className="hover:underline"
                      >
                        {result.student}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString(locale)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {result.type === "theory"
                          ? t.filters.theory
                          : t.filters.practical}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          result.result === "passed"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        }
                      >
                        {result.result === "passed"
                          ? t.result.passed
                          : t.result.failed}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {result.score}/{result.maxScore}
                    </TableCell>
                    <TableCell>#{result.attempt}</TableCell>
                    <TableCell>{result.instructor}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/exams/${result.id}`}>
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
