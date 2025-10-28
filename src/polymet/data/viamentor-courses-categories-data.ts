/**
 * VIAMENTOR - Courses Categories Data
 * Mock data et types pour les catégories de cours théoriques
 */

// ============================================================================
// TYPES
// ============================================================================

export type CourseCategoryLocale = "fr" | "de" | "it" | "en";

export interface CourseCategory {
  id: string;
  name: string;
  code: string;
  color: string;
  description?: string;
  totalDuration: number; // heures
  defaultPrice: number; // CHF
  typesCount: number;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCategoryFormData {
  name: string;
  code: string;
  color: string;
  description?: string;
  totalDuration: number;
  defaultPrice: number;
  active: boolean;
  order: number;
}

// ============================================================================
// I18N
// ============================================================================

export const coursesCategoriesI18n = {
  fr: {
    title: "Catégories de cours théoriques",
    breadcrumb: {
      school: "École",
      theoryCourses: "Cours théoriques",
      categories: "Catégories",
    },
    alert: {
      info: "Organisez vos cours par catégories (CTC, Premier Secours, Sensibilisation, Moto)",
    },
    table: {
      name: "Nom",
      code: "Code",
      color: "Couleur",
      duration: "Durée totale",
      price: "Prix défaut",
      types: "Types",
      active: "Actif",
      order: "Ordre",
      actions: "Actions",
      hours: "h",
      chf: "CHF",
      typesCount: "+{count} types",
    },
    actions: {
      create: "Nouvelle catégorie",
      edit: "Modifier",
      viewTypes: "Voir types",
      duplicate: "Dupliquer",
      archive: "Archiver",
      delete: "Supprimer",
    },
    form: {
      title: {
        create: "Nouvelle catégorie",
        edit: "Modifier la catégorie",
      },
      name: {
        label: "Nom de la catégorie",
        placeholder: "Cours Théorie Circulation",
        required: "Le nom est requis",
      },
      code: {
        label: "Code unique",
        placeholder: "CTC",
        required: "Le code est requis",
        pattern: "Le code doit contenir 2 à 4 lettres majuscules",
        unique: "Ce code existe déjà",
      },
      color: {
        label: "Couleur",
        placeholder: "#FFC107",
      },
      description: {
        label: "Description",
        placeholder: "Formation obligatoire 8h sécurité routière",
        help: "Description publique (max 300 caractères)",
      },
      duration: {
        label: "Durée totale",
        placeholder: "8.0",
        required: "La durée est requise",
        positive: "La durée doit être positive",
      },
      price: {
        label: "Prix défaut",
        placeholder: "450",
        required: "Le prix est requis",
        positive: "Le prix doit être positif ou zéro",
      },
      active: {
        label: "Catégorie active",
        help: "Si désactivée, la catégorie sera masquée des réservations",
      },
      order: {
        label: "Ordre d'affichage",
        placeholder: "1",
      },
      save: "Enregistrer",
      cancel: "Annuler",
    },
    empty: {
      title: "Aucune catégorie",
      description: "Créez votre première catégorie de cours",
      action: "Créer catégorie",
    },
    toast: {
      created: "Catégorie créée avec succès",
      updated: "Catégorie mise à jour avec succès",
      duplicated: "Catégorie dupliquée avec succès",
      archived: "Catégorie archivée avec succès",
      deleted: "Catégorie supprimée avec succès",
      error: "Une erreur est survenue",
    },
    confirm: {
      delete: {
        title: "Supprimer la catégorie ?",
        description:
          "Cette action est irréversible. Tous les types de cours associés seront également supprimés.",
        confirm: "Supprimer",
        cancel: "Annuler",
      },
      archive: {
        title: "Archiver la catégorie ?",
        description:
          "La catégorie sera masquée mais les données seront conservées.",
        confirm: "Archiver",
        cancel: "Annuler",
      },
    },
  },
  de: {
    title: "Theoriekurs-Kategorien",
    breadcrumb: {
      school: "Schule",
      theoryCourses: "Theoriekurse",
      categories: "Kategorien",
    },
    alert: {
      info: "Organisieren Sie Ihre Kurse nach Kategorien (VKU, Erste Hilfe, Sensibilisierung, Motorrad)",
    },
    table: {
      name: "Name",
      code: "Code",
      color: "Farbe",
      duration: "Gesamtdauer",
      price: "Standardpreis",
      types: "Typen",
      active: "Aktiv",
      order: "Reihenfolge",
      actions: "Aktionen",
      hours: "Std",
      chf: "CHF",
      typesCount: "+{count} Typen",
    },
    actions: {
      create: "Neue Kategorie",
      edit: "Bearbeiten",
      viewTypes: "Typen anzeigen",
      duplicate: "Duplizieren",
      archive: "Archivieren",
      delete: "Löschen",
    },
    form: {
      title: {
        create: "Neue Kategorie",
        edit: "Kategorie bearbeiten",
      },
      name: {
        label: "Kategoriename",
        placeholder: "Verkehrskundeunterricht",
        required: "Name ist erforderlich",
      },
      code: {
        label: "Eindeutiger Code",
        placeholder: "VKU",
        required: "Code ist erforderlich",
        pattern: "Code muss 2 bis 4 Großbuchstaben enthalten",
        unique: "Dieser Code existiert bereits",
      },
      color: {
        label: "Farbe",
        placeholder: "#FFC107",
      },
      description: {
        label: "Beschreibung",
        placeholder: "Obligatorische 8h Verkehrssicherheit",
        help: "Öffentliche Beschreibung (max 300 Zeichen)",
      },
      duration: {
        label: "Gesamtdauer",
        placeholder: "8.0",
        required: "Dauer ist erforderlich",
        positive: "Dauer muss positiv sein",
      },
      price: {
        label: "Standardpreis",
        placeholder: "450",
        required: "Preis ist erforderlich",
        positive: "Preis muss positiv oder null sein",
      },
      active: {
        label: "Kategorie aktiv",
        help: "Wenn deaktiviert, wird die Kategorie bei Buchungen ausgeblendet",
      },
      order: {
        label: "Anzeigereihenfolge",
        placeholder: "1",
      },
      save: "Speichern",
      cancel: "Abbrechen",
    },
    empty: {
      title: "Keine Kategorien",
      description: "Erstellen Sie Ihre erste Kurskategorie",
      action: "Kategorie erstellen",
    },
    toast: {
      created: "Kategorie erfolgreich erstellt",
      updated: "Kategorie erfolgreich aktualisiert",
      duplicated: "Kategorie erfolgreich dupliziert",
      archived: "Kategorie erfolgreich archiviert",
      deleted: "Kategorie erfolgreich gelöscht",
      error: "Ein Fehler ist aufgetreten",
    },
    confirm: {
      delete: {
        title: "Kategorie löschen?",
        description:
          "Diese Aktion ist unwiderruflich. Alle zugehörigen Kurstypen werden ebenfalls gelöscht.",
        confirm: "Löschen",
        cancel: "Abbrechen",
      },
      archive: {
        title: "Kategorie archivieren?",
        description:
          "Die Kategorie wird ausgeblendet, aber die Daten bleiben erhalten.",
        confirm: "Archivieren",
        cancel: "Abbrechen",
      },
    },
  },
  it: {
    title: "Categorie corsi teorici",
    breadcrumb: {
      school: "Scuola",
      theoryCourses: "Corsi teorici",
      categories: "Categorie",
    },
    alert: {
      info: "Organizza i tuoi corsi per categorie (CTC, Primo Soccorso, Sensibilizzazione, Moto)",
    },
    table: {
      name: "Nome",
      code: "Codice",
      color: "Colore",
      duration: "Durata totale",
      price: "Prezzo predefinito",
      types: "Tipi",
      active: "Attivo",
      order: "Ordine",
      actions: "Azioni",
      hours: "h",
      chf: "CHF",
      typesCount: "+{count} tipi",
    },
    actions: {
      create: "Nuova categoria",
      edit: "Modifica",
      viewTypes: "Visualizza tipi",
      duplicate: "Duplica",
      archive: "Archivia",
      delete: "Elimina",
    },
    form: {
      title: {
        create: "Nuova categoria",
        edit: "Modifica categoria",
      },
      name: {
        label: "Nome categoria",
        placeholder: "Corso Teoria Circolazione",
        required: "Il nome è obbligatorio",
      },
      code: {
        label: "Codice univoco",
        placeholder: "CTC",
        required: "Il codice è obbligatorio",
        pattern: "Il codice deve contenere da 2 a 4 lettere maiuscole",
        unique: "Questo codice esiste già",
      },
      color: {
        label: "Colore",
        placeholder: "#FFC107",
      },
      description: {
        label: "Descrizione",
        placeholder: "Formazione obbligatoria 8h sicurezza stradale",
        help: "Descrizione pubblica (max 300 caratteri)",
      },
      duration: {
        label: "Durata totale",
        placeholder: "8.0",
        required: "La durata è obbligatoria",
        positive: "La durata deve essere positiva",
      },
      price: {
        label: "Prezzo predefinito",
        placeholder: "450",
        required: "Il prezzo è obbligatorio",
        positive: "Il prezzo deve essere positivo o zero",
      },
      active: {
        label: "Categoria attiva",
        help: "Se disattivata, la categoria sarà nascosta dalle prenotazioni",
      },
      order: {
        label: "Ordine di visualizzazione",
        placeholder: "1",
      },
      save: "Salva",
      cancel: "Annulla",
    },
    empty: {
      title: "Nessuna categoria",
      description: "Crea la tua prima categoria di corsi",
      action: "Crea categoria",
    },
    toast: {
      created: "Categoria creata con successo",
      updated: "Categoria aggiornata con successo",
      duplicated: "Categoria duplicata con successo",
      archived: "Categoria archiviata con successo",
      deleted: "Categoria eliminata con successo",
      error: "Si è verificato un errore",
    },
    confirm: {
      delete: {
        title: "Eliminare la categoria?",
        description:
          "Questa azione è irreversibile. Tutti i tipi di corso associati saranno eliminati.",
        confirm: "Elimina",
        cancel: "Annulla",
      },
      archive: {
        title: "Archiviare la categoria?",
        description: "La categoria sarà nascosta ma i dati saranno conservati.",
        confirm: "Archivia",
        cancel: "Annulla",
      },
    },
  },
  en: {
    title: "Theory Course Categories",
    breadcrumb: {
      school: "School",
      theoryCourses: "Theory Courses",
      categories: "Categories",
    },
    alert: {
      info: "Organize your courses by categories (CTC, First Aid, Awareness, Motorcycle)",
    },
    table: {
      name: "Name",
      code: "Code",
      color: "Color",
      duration: "Total Duration",
      price: "Default Price",
      types: "Types",
      active: "Active",
      order: "Order",
      actions: "Actions",
      hours: "h",
      chf: "CHF",
      typesCount: "+{count} types",
    },
    actions: {
      create: "New Category",
      edit: "Edit",
      viewTypes: "View Types",
      duplicate: "Duplicate",
      archive: "Archive",
      delete: "Delete",
    },
    form: {
      title: {
        create: "New Category",
        edit: "Edit Category",
      },
      name: {
        label: "Category Name",
        placeholder: "Traffic Theory Course",
        required: "Name is required",
      },
      code: {
        label: "Unique Code",
        placeholder: "CTC",
        required: "Code is required",
        pattern: "Code must contain 2 to 4 uppercase letters",
        unique: "This code already exists",
      },
      color: {
        label: "Color",
        placeholder: "#FFC107",
      },
      description: {
        label: "Description",
        placeholder: "Mandatory 8h road safety training",
        help: "Public description (max 300 characters)",
      },
      duration: {
        label: "Total Duration",
        placeholder: "8.0",
        required: "Duration is required",
        positive: "Duration must be positive",
      },
      price: {
        label: "Default Price",
        placeholder: "450",
        required: "Price is required",
        positive: "Price must be positive or zero",
      },
      active: {
        label: "Active Category",
        help: "If disabled, category will be hidden from bookings",
      },
      order: {
        label: "Display Order",
        placeholder: "1",
      },
      save: "Save",
      cancel: "Cancel",
    },
    empty: {
      title: "No Categories",
      description: "Create your first course category",
      action: "Create Category",
    },
    toast: {
      created: "Category created successfully",
      updated: "Category updated successfully",
      duplicated: "Category duplicated successfully",
      archived: "Category archived successfully",
      deleted: "Category deleted successfully",
      error: "An error occurred",
    },
    confirm: {
      delete: {
        title: "Delete Category?",
        description:
          "This action is irreversible. All associated course types will also be deleted.",
        confirm: "Delete",
        cancel: "Cancel",
      },
      archive: {
        title: "Archive Category?",
        description: "Category will be hidden but data will be preserved.",
        confirm: "Archive",
        cancel: "Cancel",
      },
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockCourseCategories: CourseCategory[] = [
  {
    id: "cat-1",
    name: "Cours Théorie Circulation",
    code: "CTC",
    color: "#FFC107",
    description: "Formation obligatoire 8h théorie sécurité routière",
    totalDuration: 8,
    defaultPrice: 450,
    typesCount: 3,
    active: true,
    order: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "cat-2",
    name: "Premier Secours",
    code: "PS",
    color: "#F44336",
    description: "Formation premiers secours obligatoire 10h",
    totalDuration: 10,
    defaultPrice: 150,
    typesCount: 2,
    active: true,
    order: 2,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "cat-3",
    name: "Sensibilisation",
    code: "SENS",
    color: "#4CAF50",
    description: "Cours de sensibilisation aux dangers de la route",
    totalDuration: 8,
    defaultPrice: 300,
    typesCount: 1,
    active: true,
    order: 3,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "cat-4",
    name: "Moto Base",
    code: "MOTO",
    color: "#2196F3",
    description: "Formation théorique moto catégorie A",
    totalDuration: 12,
    defaultPrice: 600,
    typesCount: 4,
    active: true,
    order: 4,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
];
