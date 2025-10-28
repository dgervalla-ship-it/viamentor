/**
 * VIAMENTOR - Recent Pages
 * Page historique des pages récemment visitées
 *
 * Features:
 * - Liste des pages récentes avec timestamp
 * - Groupement par date (Aujourd'hui, Hier, Cette semaine)
 * - Quick access links
 * - Clear history
 * - Pin favorites
 */

import { useState } from "react";
import { ClockIcon, PinIcon, TrashIcon, ExternalLinkIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// ============================================================================
// TYPES
// ============================================================================

interface RecentPage {
  id: string;
  title: string;
  href: string;
  timestamp: Date;
  category: string;
  icon: string;
  isPinned?: boolean;
}

interface RecentPagesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_RECENT_PAGES: RecentPage[] = [
  {
    id: "1",
    title: "Sophie Martin - Détail Élève",
    href: "/students/1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    category: "Élèves",
    icon: "👨‍🎓",
    isPinned: true,
  },
  {
    id: "2",
    title: "Planning",
    href: "/planning",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    category: "Planning",
    icon: "📅",
  },
  {
    id: "3",
    title: "Factures",
    href: "/invoices",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
    category: "Facturation",
    icon: "📄",
  },
  {
    id: "4",
    title: "Jean Dupont - Détail Moniteur",
    href: "/instructors/2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    category: "Moniteurs",
    icon: "👨‍🏫",
  },
  {
    id: "5",
    title: "Analytics Véhicules",
    href: "/vehicles/analytics",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    category: "Analytics",
    icon: "📊",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function RecentPagesPage({ locale = "fr" }: RecentPagesPageProps) {
  const [recentPages, setRecentPages] =
    useState<RecentPage[]>(MOCK_RECENT_PAGES);

  const togglePin = (id: string) => {
    setRecentPages((pages) =>
      pages.map((page) =>
        page.id === id ? { ...page, isPinned: !page.isPinned } : page
      )
    );
  };

  const clearHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer l'historique ?")) {
      setRecentPages([]);
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  const groupByDate = (pages: RecentPage[]) => {
    const now = new Date();
    const today: RecentPage[] = [];
    const yesterday: RecentPage[] = [];
    const thisWeek: RecentPage[] = [];
    const older: RecentPage[] = [];

    pages.forEach((page) => {
      const diffDays = Math.floor(
        (now.getTime() - page.timestamp.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) today.push(page);
      else if (diffDays === 1) yesterday.push(page);
      else if (diffDays < 7) thisWeek.push(page);
      else older.push(page);
    });

    return { today, yesterday, thisWeek, older };
  };

  const { today, yesterday, thisWeek, older } = groupByDate(recentPages);
  const pinnedPages = recentPages.filter((p) => p.isPinned);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pages Récentes</h1>
          <p className="text-muted-foreground">
            Historique de vos pages visitées récemment
          </p>
        </div>
        {recentPages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Effacer l'historique
          </Button>
        )}
      </div>

      {/* Pinned Pages */}
      {pinnedPages.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PinIcon className="h-5 w-5" />
              Pages Épinglées
            </CardTitle>
            <CardDescription>
              Accès rapide à vos pages favorites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pinnedPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <Link
                    to={page.href}
                    className="flex items-center gap-3 flex-1"
                  >
                    <span className="text-2xl">{page.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {page.category}
                      </p>
                    </div>
                    <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePin(page.id)}
                    className="ml-2"
                  >
                    <PinIcon className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Pages Grouped by Date */}
      {recentPages.length > 0 ? (
        <div className="space-y-8">
          {today.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Aujourd'hui</h2>
              <div className="space-y-2">
                {today.map((page) => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onTogglePin={togglePin}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </div>
          )}

          {yesterday.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Hier</h2>
              <div className="space-y-2">
                {yesterday.map((page) => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onTogglePin={togglePin}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </div>
          )}

          {thisWeek.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Cette Semaine</h2>
              <div className="space-y-2">
                {thisWeek.map((page) => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onTogglePin={togglePin}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </div>
          )}

          {older.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Plus Ancien</h2>
              <div className="space-y-2">
                {older.map((page) => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onTogglePin={togglePin}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <ClockIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

            <h3 className="text-lg font-semibold mb-2">Aucune page récente</h3>
            <p className="text-muted-foreground">
              Vos pages visitées apparaîtront ici
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// PAGE ITEM COMPONENT
// ============================================================================

interface PageItemProps {
  page: RecentPage;
  onTogglePin: (id: string) => void;
  getTimeAgo: (date: Date) => string;
}

function PageItem({ page, onTogglePin, getTimeAgo }: PageItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
      <Link to={page.href} className="flex items-center gap-3 flex-1">
        <span className="text-2xl">{page.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{page.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              {page.category}
            </Badge>
            <span>•</span>
            <span>{getTimeAgo(page.timestamp)}</span>
          </div>
        </div>
        <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTogglePin(page.id)}
        className="ml-2"
      >
        <PinIcon className={`h-4 w-4 ${page.isPinned ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
}
