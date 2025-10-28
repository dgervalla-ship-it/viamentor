/**
 * VIAMENTOR - Global Search Page
 * Page recherche globale avec filtres et résultats groupés
 *
 * Architecture:
 * - Composants réutilisables (SearchBar, SearchResults, RecentSearches)
 * - Séparation des responsabilités
 * - Pattern Container/Presentational
 *
 * @module pages/viamentor-global-search-page
 * @version 2.0.0 - Refactored with modular architecture
 */

import { useState } from "react";
import { SearchIcon, XIcon, ClockIcon, TrendingUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { PageContainer } from "@/polymet/components/viamentor-page-container";

// ============================================================================
// TYPES
// ============================================================================

interface SearchResult {
  id: string;
  type:
    | "student"
    | "instructor"
    | "vehicle"
    | "invoice"
    | "lesson"
    | "prospect";
  title: string;
  subtitle: string;
  href: string;
  metadata?: string;
}

interface GlobalSearchPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const RECENT_SEARCHES = [
  "Sophie Martin",
  "Facture #2024-001",
  "Véhicule GE-123456",
  "Moniteur Jean Dupont",
];

const POPULAR_SEARCHES = [
  "Élèves actifs",
  "Factures impayées",
  "Planning aujourd'hui",
  "Véhicules disponibles",
];

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "student",
    title: "Sophie Martin",
    subtitle: "Catégorie B • En formation",
    href: "/students/1",
    metadata: "12 leçons • Prochain examen: 15 mars",
  },
  {
    id: "2",
    type: "instructor",
    title: "Jean Dupont",
    subtitle: "Moniteur • Catégories B, A",
    href: "/instructors/2",
    metadata: "4.8★ • 15 élèves actifs",
  },
  {
    id: "3",
    type: "vehicle",
    title: "VW Golf - GE-123456",
    subtitle: "Véhicule • Catégorie B",
    href: "/vehicles/3",
    metadata: "Disponible • Prochain entretien: 20 mars",
  },
  {
    id: "4",
    type: "invoice",
    title: "Facture #2024-001",
    subtitle: "Sophie Martin • CHF 1'200.00",
    href: "/invoices",
    metadata: "Payée • 15 janv. 2024",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getTypeIcon = (type: SearchResult["type"]) => {
  const icons = {
    student: "👨‍🎓",
    instructor: "👨‍🏫",
    vehicle: "🚗",
    invoice: "📄",
    lesson: "📅",
    prospect: "🎯",
  };
  return icons[type] || "📋";
};

const getTypeBadge = (type: SearchResult["type"]) => {
  const labels = {
    student: "Élève",
    instructor: "Moniteur",
    vehicle: "Véhicule",
    invoice: "Facture",
    lesson: "Leçon",
    prospect: "Prospect",
  };
  return labels[type];
};

// ============================================================================
// SEARCH BAR COMPONENT
// ============================================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

      <Input
        type="text"
        placeholder="Rechercher... (Cmd+K)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 text-lg"
        autoFocus
      />

      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// SEARCH RESULT CARD COMPONENT
// ============================================================================

interface SearchResultCardProps {
  result: SearchResult;
}

function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Link key={result.id} to={result.href}>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{getTypeIcon(result.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{result.title}</h3>
                <Badge variant="secondary" className="shrink-0">
                  {getTypeBadge(result.type)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {result.subtitle}
              </p>
              {result.metadata && (
                <p className="text-xs text-muted-foreground">
                  {result.metadata}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ============================================================================
// QUICK SEARCHES COMPONENT
// ============================================================================

interface QuickSearchesProps {
  title: string;
  icon: typeof ClockIcon;
  searches: string[];
  onSearchClick: (search: string) => void;
}

function QuickSearches({
  title,
  icon: Icon,
  searches,
  onSearchClick,
}: QuickSearchesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />

          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {searches.map((search, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSearchClick(search)}
            >
              {search}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

function EmptyState() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

        <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
        <p className="text-muted-foreground">
          Essayez avec d'autres mots-clés ou filtres
        </p>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// KEYBOARD SHORTCUTS COMPONENT
// ============================================================================

function KeyboardShortcuts() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-sm">Raccourcis Clavier</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd+K</kbd>
            <span className="ml-2 text-muted-foreground">
              Ouvrir la recherche
            </span>
          </div>
          <div>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
            <span className="ml-2 text-muted-foreground">Effacer</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GlobalSearchPage({ locale = "fr" }: GlobalSearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setResults(query.length > 0 ? MOCK_RESULTS : []);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

  return (
    <PageContainer maxWidth="lg" padding="md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recherche Globale</h1>
        <p className="text-muted-foreground">
          Recherchez des élèves, moniteurs, véhicules, factures et plus encore
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          onClear={clearSearch}
        />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="student">Élèves</TabsTrigger>
            <TabsTrigger value="instructor">Moniteurs</TabsTrigger>
            <TabsTrigger value="vehicle">Véhicules</TabsTrigger>
            <TabsTrigger value="invoice">Factures</TabsTrigger>
            <TabsTrigger value="lesson">Leçons</TabsTrigger>
            <TabsTrigger value="prospect">Prospects</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results or Empty State */}
      {searchQuery.length === 0 ? (
        <div className="space-y-8">
          <QuickSearches
            title="Recherches Récentes"
            icon={ClockIcon}
            searches={RECENT_SEARCHES}
            onSearchClick={handleSearch}
          />

          <QuickSearches
            title="Recherches Populaires"
            icon={TrendingUpIcon}
            searches={POPULAR_SEARCHES}
            onSearchClick={handleSearch}
          />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            {results.length} résultat{results.length > 1 ? "s" : ""} trouvé
            {results.length > 1 ? "s" : ""}
          </div>
          {results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcuts />
    </PageContainer>
  );
}
