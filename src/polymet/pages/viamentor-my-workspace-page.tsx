/**
 * VIAMENTOR - My Workspace Page
 * Page espace de travail personnalisé avec widgets, raccourcis et dashboard
 *
 * @module pages/viamentor-my-workspace-page
 */

import { useState } from "react";
import {
  LayoutDashboardIcon,
  PlusIcon,
  SettingsIcon,
  GripVerticalIcon,
  XIcon,
  CalendarIcon,
  UsersIcon,
  CarIcon,
  FileTextIcon,
  TrendingUpIcon,
  ClockIcon,
  BellIcon,
  StarIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// ============================================================================
// TYPES
// ============================================================================

interface MyWorkspacePageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Widget {
  id: string;
  type: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  size: "small" | "medium" | "large";
  enabled: boolean;
  order: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const AVAILABLE_WIDGETS: Widget[] = [
  {
    id: "upcoming-lessons",
    type: "calendar",
    title: "Prochaines Leçons",
    icon: CalendarIcon,
    size: "medium",
    enabled: true,
    order: 1,
  },
  {
    id: "my-students",
    type: "students",
    title: "Mes Élèves",
    icon: UsersIcon,
    size: "medium",
    enabled: true,
    order: 2,
  },
  {
    id: "quick-stats",
    type: "stats",
    title: "Statistiques Rapides",
    icon: TrendingUpIcon,
    size: "large",
    enabled: true,
    order: 3,
  },
  {
    id: "recent-activity",
    type: "activity",
    title: "Activité Récente",
    icon: ClockIcon,
    size: "medium",
    enabled: true,
    order: 4,
  },
  {
    id: "vehicles-status",
    type: "vehicles",
    title: "État Véhicules",
    icon: CarIcon,
    size: "small",
    enabled: false,
    order: 5,
  },
  {
    id: "pending-invoices",
    type: "invoices",
    title: "Factures en Attente",
    icon: FileTextIcon,
    size: "small",
    enabled: false,
    order: 6,
  },
  {
    id: "notifications",
    type: "notifications",
    title: "Notifications",
    icon: BellIcon,
    size: "small",
    enabled: true,
    order: 7,
  },
  {
    id: "favorites",
    type: "favorites",
    title: "Favoris",
    icon: StarIcon,
    size: "small",
    enabled: true,
    order: 8,
  },
];

const QUICK_SHORTCUTS = [
  {
    id: "book-lesson",
    label: "Réserver Leçon",
    icon: CalendarIcon,
    href: "/quick/book-lesson",
    color: "blue",
  },
  {
    id: "new-student",
    label: "Nouvel Élève",
    icon: UsersIcon,
    href: "/quick/new-student",
    color: "green",
  },
  {
    id: "new-invoice",
    label: "Nouvelle Facture",
    icon: FileTextIcon,
    href: "/quick/new-invoice",
    color: "purple",
  },
  {
    id: "planning",
    label: "Planning",
    icon: CalendarIcon,
    href: "/planning",
    color: "orange",
  },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mon Espace de Travail",
    subtitle: "Personnalisez votre tableau de bord avec vos widgets préférés",
    customize: "Personnaliser",
    addWidget: "Ajouter Widget",
    layout: "Disposition",
    layoutCompact: "Compacte",
    layoutComfortable: "Confortable",
    layoutSpacious: "Spacieuse",
    quickShortcuts: "Raccourcis Rapides",
    myWidgets: "Mes Widgets",
    availableWidgets: "Widgets Disponibles",
    selectWidgets: "Sélectionner les widgets à afficher",
    save: "Enregistrer",
    cancel: "Annuler",
    dragToReorder: "Glissez pour réorganiser",
    noWidgets: "Aucun widget activé",
    addWidgetsMessage:
      "Cliquez sur 'Personnaliser' pour ajouter des widgets à votre espace de travail",
  },
  de: {
    title: "Mein Arbeitsbereich",
    subtitle: "Passen Sie Ihr Dashboard mit Ihren bevorzugten Widgets an",
    customize: "Anpassen",
    addWidget: "Widget hinzufügen",
    layout: "Layout",
    layoutCompact: "Kompakt",
    layoutComfortable: "Komfortabel",
    layoutSpacious: "Geräumig",
    quickShortcuts: "Schnellzugriffe",
    myWidgets: "Meine Widgets",
    availableWidgets: "Verfügbare Widgets",
    selectWidgets: "Wählen Sie die anzuzeigenden Widgets aus",
    save: "Speichern",
    cancel: "Abbrechen",
    dragToReorder: "Ziehen zum Neuordnen",
    noWidgets: "Keine Widgets aktiviert",
    addWidgetsMessage:
      "Klicken Sie auf 'Anpassen', um Widgets zu Ihrem Arbeitsbereich hinzuzufügen",
  },
  it: {
    title: "Il Mio Spazio di Lavoro",
    subtitle: "Personalizza la tua dashboard con i tuoi widget preferiti",
    customize: "Personalizza",
    addWidget: "Aggiungi Widget",
    layout: "Layout",
    layoutCompact: "Compatto",
    layoutComfortable: "Confortevole",
    layoutSpacious: "Spazioso",
    quickShortcuts: "Scorciatoie Rapide",
    myWidgets: "I Miei Widget",
    availableWidgets: "Widget Disponibili",
    selectWidgets: "Seleziona i widget da visualizzare",
    save: "Salva",
    cancel: "Annulla",
    dragToReorder: "Trascina per riordinare",
    noWidgets: "Nessun widget attivato",
    addWidgetsMessage:
      "Clicca su 'Personalizza' per aggiungere widget al tuo spazio di lavoro",
  },
  en: {
    title: "My Workspace",
    subtitle: "Customize your dashboard with your favorite widgets",
    customize: "Customize",
    addWidget: "Add Widget",
    layout: "Layout",
    layoutCompact: "Compact",
    layoutComfortable: "Comfortable",
    layoutSpacious: "Spacious",
    quickShortcuts: "Quick Shortcuts",
    myWidgets: "My Widgets",
    availableWidgets: "Available Widgets",
    selectWidgets: "Select widgets to display",
    save: "Save",
    cancel: "Cancel",
    dragToReorder: "Drag to reorder",
    noWidgets: "No widgets enabled",
    addWidgetsMessage: "Click 'Customize' to add widgets to your workspace",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MyWorkspacePage({ locale = "fr" }: MyWorkspacePageProps) {
  const t = translations[locale];
  const [widgets, setWidgets] = useState<Widget[]>(AVAILABLE_WIDGETS);
  const [layout, setLayout] = useState<"compact" | "comfortable" | "spacious">(
    "comfortable"
  );
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [tempWidgets, setTempWidgets] = useState<Widget[]>(AVAILABLE_WIDGETS);

  const enabledWidgets = widgets
    .filter((w) => w.enabled)
    .sort((a, b) => a.order - b.order);

  const handleOpenCustomize = () => {
    setTempWidgets([...widgets]);
    setCustomizeDialogOpen(true);
  };

  const handleSaveCustomize = () => {
    setWidgets([...tempWidgets]);
    setCustomizeDialogOpen(false);
  };

  const handleToggleWidget = (widgetId: string) => {
    setTempWidgets((prev) =>
      prev.map((w) => (w.id === widgetId ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const getLayoutSpacing = () => {
    switch (layout) {
      case "compact":
        return "gap-3";
      case "comfortable":
        return "gap-4";
      case "spacious":
        return "gap-6";
      default:
        return "gap-4";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Layout Selector */}
          <Select
            value={layout}
            onValueChange={(value: any) => setLayout(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.layout} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">{t.layoutCompact}</SelectItem>
              <SelectItem value="comfortable">{t.layoutComfortable}</SelectItem>
              <SelectItem value="spacious">{t.layoutSpacious}</SelectItem>
            </SelectContent>
          </Select>

          {/* Customize Button */}
          <Button onClick={handleOpenCustomize}>
            <SettingsIcon className="h-4 w-4 mr-2" />

            {t.customize}
          </Button>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <LayoutDashboardIcon className="h-5 w-5 text-primary" />

          <h2 className="text-lg font-semibold text-foreground">
            {t.quickShortcuts}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_SHORTCUTS.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <Button
                key={shortcut.id}
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                asChild
              >
                <a href={shortcut.href}>
                  <Icon className="h-6 w-6" />

                  <span className="text-sm font-medium">{shortcut.label}</span>
                </a>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Widgets Grid */}
      {enabledWidgets.length === 0 ? (
        <Card className="p-12 text-center">
          <LayoutDashboardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t.noWidgets}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t.addWidgetsMessage}
          </p>
          <Button onClick={handleOpenCustomize}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.addWidget}
          </Button>
        </Card>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${getLayoutSpacing()}`}
        >
          {enabledWidgets.map((widget) => {
            const Icon = widget.icon;
            const colSpan =
              widget.size === "large"
                ? "md:col-span-2 lg:col-span-3"
                : widget.size === "medium"
                  ? "md:col-span-1"
                  : "md:col-span-1";

            return (
              <Card key={widget.id} className={`p-4 ${colSpan}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />

                    <h3 className="text-base font-semibold text-foreground">
                      {widget.title}
                    </h3>
                  </div>
                  <GripVerticalIcon className="h-5 w-5 text-muted-foreground cursor-move" />
                </div>

                {/* Widget Content Placeholder */}
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <Icon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />

                  <p className="text-sm text-muted-foreground">
                    Contenu du widget {widget.title}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Customize Dialog */}
      <Dialog open={customizeDialogOpen} onOpenChange={setCustomizeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.customize}</DialogTitle>
            <DialogDescription>{t.selectWidgets}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tempWidgets.map((widget) => {
                const Icon = widget.icon;
                return (
                  <div
                    key={widget.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={widget.id}
                      checked={widget.enabled}
                      onCheckedChange={() => handleToggleWidget(widget.id)}
                    />

                    <Label
                      htmlFor={widget.id}
                      className="flex items-center gap-2 flex-1 cursor-pointer"
                    >
                      <Icon className="h-4 w-4 text-primary" />

                      <span className="text-sm font-medium">
                        {widget.title}
                      </span>
                      <Badge variant="outline" className="ml-auto">
                        {widget.size === "large"
                          ? "Grand"
                          : widget.size === "medium"
                            ? "Moyen"
                            : "Petit"}
                      </Badge>
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCustomizeDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button onClick={handleSaveCustomize}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
