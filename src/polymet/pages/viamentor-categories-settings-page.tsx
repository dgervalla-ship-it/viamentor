/**
 * VIAMENTOR - Categories Settings Page
 * Page paramètres catégories de permis
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  CarIcon,
  TruckIcon,
  BikeIcon,
  SaveIcon,
  XIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface CategoriesSettingsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  minAge: number;
  theoryHours: number;
  practicalHours: number;
  price: number;
  active: boolean;
  icon: "car" | "truck" | "bike";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      settings: "Paramètres",
      categories: "Catégories",
    },
    title: "Catégories de Permis",
    description: "Gérez les catégories de permis de conduire proposées",
    actions: {
      add: "Ajouter une catégorie",
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler",
    },
    table: {
      code: "Code",
      name: "Nom",
      minAge: "Âge min.",
      theoryHours: "Heures théorie",
      practicalHours: "Heures pratique",
      price: "Prix",
      status: "Statut",
      actions: "Actions",
    },
    dialog: {
      add: {
        title: "Ajouter une catégorie",
        description: "Créez une nouvelle catégorie de permis",
      },
      edit: {
        title: "Modifier la catégorie",
        description: "Modifiez les informations de la catégorie",
      },
      delete: {
        title: "Supprimer la catégorie",
        description: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
        confirm: "Supprimer",
      },
    },
    form: {
      code: "Code",
      codePlaceholder: "B",
      name: "Nom",
      namePlaceholder: "Voiture",
      description: "Description",
      descriptionPlaceholder: "Permis de conduire pour voitures...",
      minAge: "Âge minimum",
      theoryHours: "Heures de théorie",
      practicalHours: "Heures de pratique",
      price: "Prix (CHF)",
      active: "Actif",
      activeDesc: "Cette catégorie est proposée aux élèves",
    },
    status: {
      active: "Actif",
      inactive: "Inactif",
    },
  },
  de: {
    breadcrumb: {
      settings: "Einstellungen",
      categories: "Kategorien",
    },
    title: "Führerscheinkategorien",
    description: "Verwalten Sie die angebotenen Führerscheinkategorien",
    actions: {
      add: "Kategorie hinzufügen",
      edit: "Bearbeiten",
      delete: "Löschen",
      save: "Speichern",
      cancel: "Abbrechen",
    },
    table: {
      code: "Code",
      name: "Name",
      minAge: "Mindestalter",
      theoryHours: "Theoriestunden",
      practicalHours: "Praxisstunden",
      price: "Preis",
      status: "Status",
      actions: "Aktionen",
    },
    dialog: {
      add: {
        title: "Kategorie hinzufügen",
        description: "Erstellen Sie eine neue Führerscheinkategorie",
      },
      edit: {
        title: "Kategorie bearbeiten",
        description: "Bearbeiten Sie die Kategorieinformationen",
      },
      delete: {
        title: "Kategorie löschen",
        description:
          "Sind Sie sicher, dass Sie diese Kategorie löschen möchten?",
        confirm: "Löschen",
      },
    },
    form: {
      code: "Code",
      codePlaceholder: "B",
      name: "Name",
      namePlaceholder: "Auto",
      description: "Beschreibung",
      descriptionPlaceholder: "Führerschein für Autos...",
      minAge: "Mindestalter",
      theoryHours: "Theoriestunden",
      practicalHours: "Praxisstunden",
      price: "Preis (CHF)",
      active: "Aktiv",
      activeDesc: "Diese Kategorie wird Schülern angeboten",
    },
    status: {
      active: "Aktiv",
      inactive: "Inaktiv",
    },
  },
  it: {
    breadcrumb: {
      settings: "Impostazioni",
      categories: "Categorie",
    },
    title: "Categorie di Patente",
    description: "Gestisci le categorie di patente di guida offerte",
    actions: {
      add: "Aggiungi categoria",
      edit: "Modifica",
      delete: "Elimina",
      save: "Salva",
      cancel: "Annulla",
    },
    table: {
      code: "Codice",
      name: "Nome",
      minAge: "Età min.",
      theoryHours: "Ore teoria",
      practicalHours: "Ore pratica",
      price: "Prezzo",
      status: "Stato",
      actions: "Azioni",
    },
    dialog: {
      add: {
        title: "Aggiungi categoria",
        description: "Crea una nuova categoria di patente",
      },
      edit: {
        title: "Modifica categoria",
        description: "Modifica le informazioni della categoria",
      },
      delete: {
        title: "Elimina categoria",
        description: "Sei sicuro di voler eliminare questa categoria?",
        confirm: "Elimina",
      },
    },
    form: {
      code: "Codice",
      codePlaceholder: "B",
      name: "Nome",
      namePlaceholder: "Auto",
      description: "Descrizione",
      descriptionPlaceholder: "Patente di guida per auto...",
      minAge: "Età minima",
      theoryHours: "Ore di teoria",
      practicalHours: "Ore di pratica",
      price: "Prezzo (CHF)",
      active: "Attivo",
      activeDesc: "Questa categoria è offerta agli allievi",
    },
    status: {
      active: "Attivo",
      inactive: "Inattivo",
    },
  },
  en: {
    breadcrumb: {
      settings: "Settings",
      categories: "Categories",
    },
    title: "License Categories",
    description: "Manage the offered driving license categories",
    actions: {
      add: "Add category",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
    },
    table: {
      code: "Code",
      name: "Name",
      minAge: "Min. age",
      theoryHours: "Theory hours",
      practicalHours: "Practical hours",
      price: "Price",
      status: "Status",
      actions: "Actions",
    },
    dialog: {
      add: {
        title: "Add category",
        description: "Create a new license category",
      },
      edit: {
        title: "Edit category",
        description: "Edit category information",
      },
      delete: {
        title: "Delete category",
        description: "Are you sure you want to delete this category?",
        confirm: "Delete",
      },
    },
    form: {
      code: "Code",
      codePlaceholder: "B",
      name: "Name",
      namePlaceholder: "Car",
      description: "Description",
      descriptionPlaceholder: "Driving license for cars...",
      minAge: "Minimum age",
      theoryHours: "Theory hours",
      practicalHours: "Practical hours",
      price: "Price (CHF)",
      active: "Active",
      activeDesc: "This category is offered to students",
    },
    status: {
      active: "Active",
      inactive: "Inactive",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    code: "B",
    name: "Voiture",
    description: "Permis de conduire pour voitures jusqu'à 3.5 tonnes",
    minAge: 18,
    theoryHours: 8,
    practicalHours: 20,
    price: 3200,
    active: true,
    icon: "car",
  },
  {
    id: "2",
    code: "A",
    name: "Moto",
    description: "Permis de conduire pour motos",
    minAge: 18,
    theoryHours: 8,
    practicalHours: 12,
    price: 2800,
    active: true,
    icon: "bike",
  },
  {
    id: "3",
    code: "C",
    name: "Camion",
    description: "Permis de conduire pour camions",
    minAge: 21,
    theoryHours: 12,
    practicalHours: 30,
    price: 4500,
    active: true,
    icon: "truck",
  },
  {
    id: "4",
    code: "A1",
    name: "Moto légère",
    description: "Permis de conduire pour motos légères (125cc)",
    minAge: 16,
    theoryHours: 6,
    practicalHours: 8,
    price: 2200,
    active: false,
    icon: "bike",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function CategoriesSettingsPage({
  locale = "fr",
}: CategoriesSettingsPageProps) {
  const t = translations[locale];

  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
    }).format(amount);
  };

  const getIcon = (icon: Category["icon"]) => {
    switch (icon) {
      case "car":
        return <CarIcon className="w-4 h-4" />;

      case "truck":
        return <TruckIcon className="w-4 h-4" />;

      case "bike":
        return <BikeIcon className="w-4 h-4" />;
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    // API call here
    setDialogOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">
              {t.breadcrumb.settings}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.categories}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>

        <Button onClick={handleAdd}>
          <PlusIcon className="w-4 h-4 mr-2" />

          {t.actions.add}
        </Button>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Catégories disponibles</CardTitle>
          <CardDescription>
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}{" "}
            configurée{categories.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.code}</TableHead>
                <TableHead>{t.table.name}</TableHead>
                <TableHead>{t.table.minAge}</TableHead>
                <TableHead>{t.table.theoryHours}</TableHead>
                <TableHead>{t.table.practicalHours}</TableHead>
                <TableHead>{t.table.price}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getIcon(category.icon)}
                      <span className="font-mono font-bold">
                        {category.code}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category.minAge} ans</TableCell>
                  <TableCell>{category.theoryHours}h</TableCell>
                  <TableCell>{category.practicalHours}h</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(category.price)}
                  </TableCell>
                  <TableCell>
                    {category.active ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {t.status.active}
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      >
                        {t.status.inactive}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                      >
                        <TrashIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? t.dialog.edit.title : t.dialog.add.title}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? t.dialog.edit.description
                : t.dialog.add.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t.form.code}</Label>
                <Input
                  id="code"
                  placeholder={t.form.codePlaceholder}
                  defaultValue={editingCategory?.code}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t.form.name}</Label>
                <Input
                  id="name"
                  placeholder={t.form.namePlaceholder}
                  defaultValue={editingCategory?.name}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.form.description}</Label>
              <Textarea
                id="description"
                placeholder={t.form.descriptionPlaceholder}
                rows={3}
                defaultValue={editingCategory?.description}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAge">{t.form.minAge}</Label>
                <Input
                  id="minAge"
                  type="number"
                  min="16"
                  defaultValue={editingCategory?.minAge || 18}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theoryHours">{t.form.theoryHours}</Label>
                <Input
                  id="theoryHours"
                  type="number"
                  min="0"
                  defaultValue={editingCategory?.theoryHours || 8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="practicalHours">{t.form.practicalHours}</Label>
                <Input
                  id="practicalHours"
                  type="number"
                  min="0"
                  defaultValue={editingCategory?.practicalHours || 20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">{t.form.price}</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="50"
                defaultValue={editingCategory?.price || 3000}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t.form.active}</Label>
                <p className="text-sm text-muted-foreground">
                  {t.form.activeDesc}
                </p>
              </div>
              <Switch defaultChecked={editingCategory?.active ?? true} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <XIcon className="w-4 h-4 mr-2" />

              {t.actions.cancel}
            </Button>
            <Button onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />

              {t.actions.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
