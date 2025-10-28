/**
 * VIAMENTOR - My Widgets Page
 * Page gestion widgets avec bibliothèque, marketplace et configuration
 *
 * @module pages/viamentor-my-widgets-page
 */

import { useState } from "react";
import {
  LayoutGridIcon,
  PlusIcon,
  DownloadIcon,
  SettingsIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  CarIcon,
  FileTextIcon,
  BellIcon,
  ClockIcon,
  BarChartIcon,
  PieChartIcon,
  ActivityIcon,
  SearchIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// ============================================================================
// TYPES
// ============================================================================

interface MyWidgetsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Widget {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  size: "small" | "medium" | "large";
  installed: boolean;
  enabled: boolean;
  rating: number;
  downloads: number;
  version: string;
  author: string;
  premium: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const WIDGETS: Widget[] = [
  {
    id: "upcoming-lessons",
    name: "Prochaines Leçons",
    description:
      "Affiche vos prochaines leçons avec détails élèves et horaires",
    icon: CalendarIcon,
    category: "Planning",
    size: "medium",
    installed: true,
    enabled: true,
    rating: 4.8,
    downloads: 1250,
    version: "2.1.0",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "students-stats",
    name: "Statistiques Élèves",
    description: "Vue d'ensemble des statistiques de vos élèves",
    icon: UsersIcon,
    category: "Analytics",
    size: "large",
    installed: true,
    enabled: true,
    rating: 4.9,
    downloads: 980,
    version: "1.5.2",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "revenue-chart",
    name: "Graphique Revenus",
    description: "Évolution des revenus sur les 12 derniers mois",
    icon: TrendingUpIcon,
    category: "Finance",
    size: "medium",
    installed: true,
    enabled: false,
    rating: 4.7,
    downloads: 850,
    version: "3.0.1",
    author: "Viamentor",
    premium: true,
  },
  {
    id: "vehicles-status",
    name: "État Véhicules",
    description: "Statut en temps réel de votre flotte de véhicules",
    icon: CarIcon,
    category: "Gestion",
    size: "small",
    installed: true,
    enabled: true,
    rating: 4.6,
    downloads: 720,
    version: "1.8.0",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "pending-invoices",
    name: "Factures en Attente",
    description: "Liste des factures impayées avec alertes",
    icon: FileTextIcon,
    category: "Finance",
    size: "small",
    installed: false,
    enabled: false,
    rating: 4.5,
    downloads: 650,
    version: "2.3.0",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "notifications-feed",
    name: "Fil Notifications",
    description: "Flux en temps réel de toutes vos notifications",
    icon: BellIcon,
    category: "Communication",
    size: "medium",
    installed: false,
    enabled: false,
    rating: 4.4,
    downloads: 580,
    version: "1.2.5",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "activity-timeline",
    name: "Timeline Activité",
    description: "Historique chronologique de toutes les activités",
    icon: ClockIcon,
    category: "Monitoring",
    size: "large",
    installed: false,
    enabled: false,
    rating: 4.8,
    downloads: 920,
    version: "2.0.0",
    author: "Viamentor",
    premium: true,
  },
  {
    id: "performance-metrics",
    name: "Métriques Performance",
    description: "KPIs et métriques de performance détaillées",
    icon: BarChartIcon,
    category: "Analytics",
    size: "large",
    installed: false,
    enabled: false,
    rating: 4.9,
    downloads: 1100,
    version: "3.2.1",
    author: "Viamentor",
    premium: true,
  },
  {
    id: "exam-success-rate",
    name: "Taux Réussite Examens",
    description: "Statistiques de réussite aux examens par catégorie",
    icon: PieChartIcon,
    category: "Analytics",
    size: "medium",
    installed: false,
    enabled: false,
    rating: 4.7,
    downloads: 780,
    version: "1.9.0",
    author: "Viamentor",
    premium: false,
  },
  {
    id: "real-time-activity",
    name: "Activité Temps Réel",
    description: "Monitoring en direct de l'activité de l'école",
    icon: ActivityIcon,
    category: "Monitoring",
    size: "medium",
    installed: false,
    enabled: false,
    rating: 4.6,
    downloads: 690,
    version: "2.5.0",
    author: "Viamentor",
    premium: true,
  },
];

const CATEGORIES = [
  "Tous",
  "Planning",
  "Analytics",
  "Finance",
  "Gestion",
  "Communication",
  "Monitoring",
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Widgets",
    subtitle: "Gérez votre bibliothèque de widgets personnalisés",
    search: "Rechercher un widget...",
    myWidgets: "Mes Widgets",
    marketplace: "Marketplace",
    installed: "Installés",
    available: "Disponibles",
    category: "Catégorie",
    allCategories: "Toutes Catégories",
    install: "Installer",
    uninstall: "Désinstaller",
    configure: "Configurer",
    enable: "Activer",
    disable: "Désactiver",
    premium: "Premium",
    free: "Gratuit",
    rating: "Note",
    downloads: "Téléchargements",
    version: "Version",
    author: "Auteur",
    noWidgets: "Aucun widget trouvé",
    installFirst: "Installez votre premier widget depuis la Marketplace",
    enabled: "Activé",
    disabled: "Désactivé",
    small: "Petit",
    medium: "Moyen",
    large: "Grand",
  },
  de: {
    title: "Meine Widgets",
    subtitle: "Verwalten Sie Ihre benutzerdefinierte Widget-Bibliothek",
    search: "Widget suchen...",
    myWidgets: "Meine Widgets",
    marketplace: "Marktplatz",
    installed: "Installiert",
    available: "Verfügbar",
    category: "Kategorie",
    allCategories: "Alle Kategorien",
    install: "Installieren",
    uninstall: "Deinstallieren",
    configure: "Konfigurieren",
    enable: "Aktivieren",
    disable: "Deaktivieren",
    premium: "Premium",
    free: "Kostenlos",
    rating: "Bewertung",
    downloads: "Downloads",
    version: "Version",
    author: "Autor",
    noWidgets: "Keine Widgets gefunden",
    installFirst: "Installieren Sie Ihr erstes Widget aus dem Marktplatz",
    enabled: "Aktiviert",
    disabled: "Deaktiviert",
    small: "Klein",
    medium: "Mittel",
    large: "Groß",
  },
  it: {
    title: "I Miei Widget",
    subtitle: "Gestisci la tua libreria di widget personalizzati",
    search: "Cerca widget...",
    myWidgets: "I Miei Widget",
    marketplace: "Marketplace",
    installed: "Installati",
    available: "Disponibili",
    category: "Categoria",
    allCategories: "Tutte le Categorie",
    install: "Installa",
    uninstall: "Disinstalla",
    configure: "Configura",
    enable: "Attiva",
    disable: "Disattiva",
    premium: "Premium",
    free: "Gratuito",
    rating: "Valutazione",
    downloads: "Download",
    version: "Versione",
    author: "Autore",
    noWidgets: "Nessun widget trovato",
    installFirst: "Installa il tuo primo widget dal Marketplace",
    enabled: "Attivato",
    disabled: "Disattivato",
    small: "Piccolo",
    medium: "Medio",
    large: "Grande",
  },
  en: {
    title: "My Widgets",
    subtitle: "Manage your custom widget library",
    search: "Search widget...",
    myWidgets: "My Widgets",
    marketplace: "Marketplace",
    installed: "Installed",
    available: "Available",
    category: "Category",
    allCategories: "All Categories",
    install: "Install",
    uninstall: "Uninstall",
    configure: "Configure",
    enable: "Enable",
    disable: "Disable",
    premium: "Premium",
    free: "Free",
    rating: "Rating",
    downloads: "Downloads",
    version: "Version",
    author: "Author",
    noWidgets: "No widgets found",
    installFirst: "Install your first widget from the Marketplace",
    enabled: "Enabled",
    disabled: "Disabled",
    small: "Small",
    medium: "Medium",
    large: "Large",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MyWidgetsPage({ locale = "fr" }: MyWidgetsPageProps) {
  const t = translations[locale];
  const [widgets, setWidgets] = useState<Widget[]>(WIDGETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredWidgets = widgets.filter((widget) => {
    const matchesSearch =
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" || widget.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const installedWidgets = filteredWidgets.filter((w) => w.installed);
  const availableWidgets = filteredWidgets.filter((w) => !w.installed);

  const handleInstall = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, installed: true } : w))
    );
  };

  const handleUninstall = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, installed: false, enabled: false } : w
      )
    );
  };

  const handleToggleEnabled = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t.allCategories} />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="installed" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="installed">
            {t.myWidgets} ({installedWidgets.length})
          </TabsTrigger>
          <TabsTrigger value="marketplace">
            {t.marketplace} ({availableWidgets.length})
          </TabsTrigger>
        </TabsList>

        {/* Installed Widgets Tab */}
        <TabsContent value="installed" className="mt-6">
          {installedWidgets.length === 0 ? (
            <Card className="p-12 text-center">
              <LayoutGridIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t.noWidgets}
              </h3>
              <p className="text-sm text-muted-foreground">{t.installFirst}</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedWidgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                  onToggleEnabled={handleToggleEnabled}
                  t={t}
                  isInstalled
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="mt-6">
          {availableWidgets.length === 0 ? (
            <Card className="p-12 text-center">
              <LayoutGridIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t.noWidgets}
              </h3>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableWidgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                  onToggleEnabled={handleToggleEnabled}
                  t={t}
                  isInstalled={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// WIDGET CARD COMPONENT
// ============================================================================

interface WidgetCardProps {
  widget: Widget;
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
  onToggleEnabled: (id: string) => void;
  t: any;
  isInstalled: boolean;
}

function WidgetCard({
  widget,
  onInstall,
  onUninstall,
  onToggleEnabled,
  t,
  isInstalled,
}: WidgetCardProps) {
  const Icon = widget.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {widget.name}
          </h3>
          <p className="text-xs text-muted-foreground">{widget.author}</p>
        </div>
        {widget.premium && (
          <Badge variant="secondary" className="text-xs">
            {t.premium}
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {widget.description}
      </p>

      <Separator className="my-3" />

      {/* Metadata */}
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />

          <span>{widget.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <DownloadIcon className="h-3 w-3" />

          <span>{widget.downloads}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {widget.size === "small"
            ? t.small
            : widget.size === "medium"
              ? t.medium
              : t.large}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          {widget.category}
        </Badge>
        <span className="text-xs text-muted-foreground">v{widget.version}</span>
      </div>

      <Separator className="my-3" />

      {/* Actions */}
      {isInstalled ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`enable-${widget.id}`} className="text-sm">
              {widget.enabled ? t.enabled : t.disabled}
            </Label>
            <Switch
              id={`enable-${widget.id}`}
              checked={widget.enabled}
              onCheckedChange={() => onToggleEnabled(widget.id)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onUninstall(widget.id)}
            >
              {t.uninstall}
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="w-full"
          size="sm"
          onClick={() => onInstall(widget.id)}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />

          {t.install}
        </Button>
      )}
    </Card>
  );
}
