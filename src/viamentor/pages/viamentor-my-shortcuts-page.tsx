/**
 * VIAMENTOR - My Shortcuts Page
 * Page gestion raccourcis personnalisés avec keyboard shortcuts et quick links
 *
 * @module pages/viamentor-my-shortcuts-page
 */

import { useState } from "react";
import {
  KeyboardIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  StarIcon,
  SearchIcon,
  LinkIcon,
  CommandIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// ============================================================================
// TYPES
// ============================================================================

interface MyShortcutsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Shortcut {
  id: string;
  type: "keyboard" | "link";
  label: string;
  description?: string;
  keys?: string[];
  url?: string;
  icon?: string;
  category: string;
  favorite: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const SHORTCUTS: Shortcut[] = [
  // Keyboard Shortcuts
  {
    id: "search",
    type: "keyboard",
    label: "Recherche Globale",
    description: "Ouvrir la recherche globale",
    keys: ["Cmd", "K"],
    category: "Navigation",
    favorite: true,
  },
  {
    id: "new-student",
    type: "keyboard",
    label: "Nouvel Élève",
    description: "Créer un nouvel élève rapidement",
    keys: ["Cmd", "Shift", "N"],
    category: "Actions Rapides",
    favorite: true,
  },
  {
    id: "book-lesson",
    type: "keyboard",
    label: "Réserver Leçon",
    description: "Ouvrir le formulaire de réservation",
    keys: ["Cmd", "B"],
    category: "Actions Rapides",
    favorite: false,
  },
  {
    id: "planning",
    type: "keyboard",
    label: "Planning",
    description: "Accéder au planning",
    keys: ["Cmd", "P"],
    category: "Navigation",
    favorite: true,
  },
  {
    id: "notifications",
    type: "keyboard",
    label: "Notifications",
    description: "Ouvrir le panneau de notifications",
    keys: ["Cmd", "N"],
    category: "Navigation",
    favorite: false,
  },

  // Quick Links
  {
    id: "students-list",
    type: "link",
    label: "Liste Élèves",
    description: "Voir tous les élèves",
    url: "/students",
    icon: "users",
    category: "Gestion",
    favorite: true,
  },
  {
    id: "instructors-list",
    type: "link",
    label: "Liste Moniteurs",
    description: "Voir tous les moniteurs",
    url: "/instructors",
    icon: "user-check",
    category: "Gestion",
    favorite: false,
  },
  {
    id: "vehicles-list",
    type: "link",
    label: "Liste Véhicules",
    description: "Voir tous les véhicules",
    url: "/vehicles",
    icon: "car",
    category: "Gestion",
    favorite: false,
  },
  {
    id: "invoices",
    type: "link",
    label: "Factures",
    description: "Gérer les factures",
    url: "/invoices",
    icon: "file-text",
    category: "Finance",
    favorite: true,
  },
  {
    id: "analytics",
    type: "link",
    label: "Analytics",
    description: "Voir les statistiques",
    url: "/analytics",
    icon: "trending-up",
    category: "Reporting",
    favorite: false,
  },
];

const CATEGORIES = [
  "Tous",
  "Navigation",
  "Actions Rapides",
  "Gestion",
  "Finance",
  "Reporting",
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Raccourcis",
    subtitle: "Gérez vos raccourcis clavier et liens rapides personnalisés",
    search: "Rechercher un raccourci...",
    addShortcut: "Ajouter Raccourci",
    keyboardShortcuts: "Raccourcis Clavier",
    quickLinks: "Liens Rapides",
    favorites: "Favoris",
    allCategories: "Toutes Catégories",
    category: "Catégorie",
    edit: "Modifier",
    delete: "Supprimer",
    addToFavorites: "Ajouter aux favoris",
    removeFromFavorites: "Retirer des favoris",
    noShortcuts: "Aucun raccourci trouvé",
    createFirst: "Créez votre premier raccourci personnalisé",
    shortcutType: "Type de Raccourci",
    keyboardShortcut: "Raccourci Clavier",
    quickLink: "Lien Rapide",
    label: "Libellé",
    description: "Description",
    keys: "Touches",
    url: "URL",
    save: "Enregistrer",
    cancel: "Annuler",
    pressKeys: "Appuyez sur les touches...",
  },
  de: {
    title: "Meine Verknüpfungen",
    subtitle:
      "Verwalten Sie Ihre benutzerdefinierten Tastenkombinationen und Schnelllinks",
    search: "Verknüpfung suchen...",
    addShortcut: "Verknüpfung hinzufügen",
    keyboardShortcuts: "Tastenkombinationen",
    quickLinks: "Schnelllinks",
    favorites: "Favoriten",
    allCategories: "Alle Kategorien",
    category: "Kategorie",
    edit: "Bearbeiten",
    delete: "Löschen",
    addToFavorites: "Zu Favoriten hinzufügen",
    removeFromFavorites: "Aus Favoriten entfernen",
    noShortcuts: "Keine Verknüpfungen gefunden",
    createFirst: "Erstellen Sie Ihre erste benutzerdefinierte Verknüpfung",
    shortcutType: "Verknüpfungstyp",
    keyboardShortcut: "Tastenkombination",
    quickLink: "Schnelllink",
    label: "Bezeichnung",
    description: "Beschreibung",
    keys: "Tasten",
    url: "URL",
    save: "Speichern",
    cancel: "Abbrechen",
    pressKeys: "Tasten drücken...",
  },
  it: {
    title: "Le Mie Scorciatoie",
    subtitle:
      "Gestisci le tue scorciatoie da tastiera e i link rapidi personalizzati",
    search: "Cerca scorciatoia...",
    addShortcut: "Aggiungi Scorciatoia",
    keyboardShortcuts: "Scorciatoie da Tastiera",
    quickLinks: "Link Rapidi",
    favorites: "Preferiti",
    allCategories: "Tutte le Categorie",
    category: "Categoria",
    edit: "Modifica",
    delete: "Elimina",
    addToFavorites: "Aggiungi ai preferiti",
    removeFromFavorites: "Rimuovi dai preferiti",
    noShortcuts: "Nessuna scorciatoia trovata",
    createFirst: "Crea la tua prima scorciatoia personalizzata",
    shortcutType: "Tipo di Scorciatoia",
    keyboardShortcut: "Scorciatoia da Tastiera",
    quickLink: "Link Rapido",
    label: "Etichetta",
    description: "Descrizione",
    keys: "Tasti",
    url: "URL",
    save: "Salva",
    cancel: "Annulla",
    pressKeys: "Premi i tasti...",
  },
  en: {
    title: "My Shortcuts",
    subtitle: "Manage your custom keyboard shortcuts and quick links",
    search: "Search shortcut...",
    addShortcut: "Add Shortcut",
    keyboardShortcuts: "Keyboard Shortcuts",
    quickLinks: "Quick Links",
    favorites: "Favorites",
    allCategories: "All Categories",
    category: "Category",
    edit: "Edit",
    delete: "Delete",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    noShortcuts: "No shortcuts found",
    createFirst: "Create your first custom shortcut",
    shortcutType: "Shortcut Type",
    keyboardShortcut: "Keyboard Shortcut",
    quickLink: "Quick Link",
    label: "Label",
    description: "Description",
    keys: "Keys",
    url: "URL",
    save: "Save",
    cancel: "Cancel",
    pressKeys: "Press keys...",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MyShortcutsPage({ locale = "fr" }: MyShortcutsPageProps) {
  const t = translations[locale];
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(SHORTCUTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredShortcuts = shortcuts.filter((shortcut) => {
    const matchesSearch =
      shortcut.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" || shortcut.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const keyboardShortcuts = filteredShortcuts.filter(
    (s) => s.type === "keyboard"
  );
  const quickLinks = filteredShortcuts.filter((s) => s.type === "link");
  const favoriteShortcuts = filteredShortcuts.filter((s) => s.favorite);

  const toggleFavorite = (id: string) => {
    setShortcuts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.addShortcut}
        </Button>
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

      {/* Favorites Section */}
      {favoriteShortcuts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />

            <h2 className="text-lg font-semibold text-foreground">
              {t.favorites}
            </h2>
            <Badge variant="secondary">{favoriteShortcuts.length}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteShortcuts.map((shortcut) => (
              <ShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                onToggleFavorite={toggleFavorite}
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Section */}
      {keyboardShortcuts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <KeyboardIcon className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold text-foreground">
              {t.keyboardShortcuts}
            </h2>
            <Badge variant="secondary">{keyboardShortcuts.length}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyboardShortcuts.map((shortcut) => (
              <ShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                onToggleFavorite={toggleFavorite}
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Links Section */}
      {quickLinks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold text-foreground">
              {t.quickLinks}
            </h2>
            <Badge variant="secondary">{quickLinks.length}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((shortcut) => (
              <ShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                onToggleFavorite={toggleFavorite}
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredShortcuts.length === 0 && (
        <Card className="p-12 text-center">
          <KeyboardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t.noShortcuts}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{t.createFirst}</p>
          <Button onClick={() => setAddDialogOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.addShortcut}
          </Button>
        </Card>
      )}

      {/* Add Shortcut Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addShortcut}</DialogTitle>
            <DialogDescription>
              Créez un nouveau raccourci personnalisé
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.shortcutType}</Label>
              <Select defaultValue="keyboard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyboard">{t.keyboardShortcut}</SelectItem>
                  <SelectItem value="link">{t.quickLink}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t.label}</Label>
              <Input placeholder="Ex: Nouvelle Facture" />
            </div>

            <div className="space-y-2">
              <Label>{t.description}</Label>
              <Input placeholder="Ex: Créer une nouvelle facture rapidement" />
            </div>

            <div className="space-y-2">
              <Label>{t.category}</Label>
              <Select defaultValue="Actions Rapides">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter((c) => c !== "Tous").map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============================================================================
// SHORTCUT CARD COMPONENT
// ============================================================================

interface ShortcutCardProps {
  shortcut: Shortcut;
  onToggleFavorite: (id: string) => void;
  t: any;
}

function ShortcutCard({ shortcut, onToggleFavorite, t }: ShortcutCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {shortcut.label}
          </h3>
          {shortcut.description && (
            <p className="text-xs text-muted-foreground">
              {shortcut.description}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onToggleFavorite(shortcut.id)}
        >
          <StarIcon
            className={`h-4 w-4 ${
              shortcut.favorite
                ? "text-yellow-500 fill-yellow-500"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      </div>

      <Separator className="my-3" />

      {shortcut.type === "keyboard" && shortcut.keys && (
        <div className="flex items-center gap-2 flex-wrap">
          {shortcut.keys.map((key, index) => (
            <div key={index} className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
                {key}
              </kbd>
              {index < shortcut.keys!.length - 1 && (
                <span className="text-muted-foreground">+</span>
              )}
            </div>
          ))}
        </div>
      )}

      {shortcut.type === "link" && shortcut.url && (
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-muted-foreground" />

          <span className="text-xs text-muted-foreground truncate">
            {shortcut.url}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3">
        <Badge variant="outline" className="text-xs">
          {shortcut.category}
        </Badge>
      </div>
    </Card>
  );
}
