/**
 * ============================================================================
 * VIAMENTOR - Traductions Françaises Centralisées
 * ============================================================================
 *
 * Structure avec namespaces pour éviter les collisions
 * Toutes les traductions FR en un seul endroit
 */

// ============================================================================
// COMMON - Traductions réutilisables
// ============================================================================

export const common = {
  // Actions
  actions: {
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    create: "Créer",
    update: "Mettre à jour",
    search: "Rechercher",
    filter: "Filtrer",
    export: "Exporter",
    import: "Importer",
    print: "Imprimer",
    download: "Télécharger",
    upload: "Téléverser",
    close: "Fermer",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    confirm: "Confirmer",
    reset: "Réinitialiser",
    clear: "Effacer",
    apply: "Appliquer",
    view: "Voir",
    details: "Détails",
    refresh: "Actualiser",
  },

  // Statuts
  status: {
    active: "Actif",
    inactive: "Inactif",
    pending: "En attente",
    completed: "Terminé",
    cancelled: "Annulé",
    draft: "Brouillon",
    published: "Publié",
    archived: "Archivé",
  },

  // Messages
  messages: {
    success: "Opération réussie",
    error: "Une erreur est survenue",
    loading: "Chargement...",
    noData: "Aucune donnée disponible",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cet élément ?",
    unsavedChanges: "Vous avez des modifications non enregistrées",
  },

  // Validation
  validation: {
    required: "Ce champ est obligatoire",
    email: "Adresse e-mail invalide",
    phone: "Numéro de téléphone invalide",
    minLength: "Minimum {{min}} caractères",
    maxLength: "Maximum {{max}} caractères",
    pattern: "Format invalide",
  },

  // Temps
  time: {
    today: "Aujourd'hui",
    yesterday: "Hier",
    tomorrow: "Demain",
    thisWeek: "Cette semaine",
    thisMonth: "Ce mois",
    thisYear: "Cette année",
  },
} as const;

// ============================================================================
// STUDENTS - Module gestion élèves
// ============================================================================

export const students = {
  // Titre et navigation
  title: "Élèves",
  subtitle: "Gestion des élèves de l'auto-école",

  // Actions spécifiques
  actions: {
    createStudent: "Créer un élève",
    editStudent: "Modifier l'élève",
    deleteStudent: "Supprimer l'élève",
    viewStudent: "Voir le profil",
    bookLesson: "Réserver une leçon",
    sendEmail: "Envoyer un e-mail",
    assignInstructor: "Assigner un moniteur",
    changeStatus: "Changer le statut",
    exportStudents: "Exporter les élèves",
    printConvocations: "Imprimer les convocations",
  },

  // Statuts élèves
  status: {
    prospect: "Prospect",
    registered: "Inscrit",
    inTraining: "En formation",
    examReady: "Prêt pour l'examen",
    licensed: "Permis obtenu",
    suspended: "Suspendu",
    archived: "Archivé",
  },

  // Catégories
  categories: {
    A: "Moto (A)",
    A1: "Moto légère (A1)",
    B: "Voiture (B)",
    C: "Camion (C)",
    D: "Bus (D)",
    BE: "Voiture avec remorque (BE)",
  },

  // Champs formulaire
  fields: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    birthDate: "Date de naissance",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code postal",
    canton: "Canton",
    category: "Catégorie",
    instructor: "Moniteur",
    status: "Statut",
    registrationDate: "Date d'inscription",
    theoreticalExamDate: "Date examen théorique",
    practicalExamDate: "Date examen pratique",
    notes: "Notes",
  },

  // Stats
  stats: {
    total: "Total élèves",
    active: "Actifs",
    inTraining: "En formation",
    examReady: "Prêts pour l'examen",
  },

  // Filtres
  filters: {
    title: "Filtres",
    category: "Catégorie",
    status: "Statut",
    instructor: "Moniteur",
    registrationDate: "Date d'inscription",
    progression: "Progression",
    searchPlaceholder: "Rechercher un élève...",
    clearFilters: "Effacer les filtres",
    savePreset: "Enregistrer le filtre",
    loadPreset: "Charger un filtre",
  },

  // Table
  table: {
    name: "Nom",
    category: "Catégorie",
    instructor: "Moniteur",
    status: "Statut",
    progression: "Progression",
    nextLesson: "Prochaine leçon",
    actions: "Actions",
    selectAll: "Tout sélectionner",
    selected: "{{count}} sélectionné(s)",
  },

  // Bulk actions
  bulkActions: {
    title: "Actions groupées",
    assignInstructor: "Assigner un moniteur",
    sendEmail: "Envoyer un e-mail",
    changeStatus: "Changer le statut",
    exportSelection: "Exporter la sélection",
    printConvocations: "Imprimer les convocations",
    delete: "Supprimer",
    clearSelection: "Désélectionner tout",
  },

  // Pluralization
  count: {
    zero: "Aucun élève",
    one: "1 élève",
    other: "{{count}} élèves",
  },

  // Messages
  messages: {
    createSuccess: "Élève créé avec succès",
    updateSuccess: "Élève mis à jour avec succès",
    deleteSuccess: "Élève supprimé avec succès",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet élève ?",
    assignInstructorSuccess: "Moniteur assigné avec succès",
    noStudentsFound: "Aucun élève trouvé",
  },
} as const;

// ============================================================================
// INSTRUCTORS - Module gestion moniteurs
// ============================================================================

export const instructors = {
  title: "Moniteurs",
  subtitle: "Gestion des moniteurs de l'auto-école",

  actions: {
    createInstructor: "Créer un moniteur",
    editInstructor: "Modifier le moniteur",
    deleteInstructor: "Supprimer le moniteur",
    viewInstructor: "Voir le profil",
    viewPlanning: "Voir le planning",
    viewStudents: "Voir les élèves",
  },

  status: {
    active: "Actif",
    inactive: "Inactif",
    onLeave: "En congé",
    suspended: "Suspendu",
  },

  count: {
    zero: "Aucun moniteur",
    one: "1 moniteur",
    other: "{{count}} moniteurs",
  },
} as const;

// ============================================================================
// VEHICLES - Module gestion véhicules
// ============================================================================

export const vehicles = {
  title: "Véhicules",
  subtitle: "Gestion de la flotte de véhicules",

  actions: {
    createVehicle: "Créer un véhicule",
    editVehicle: "Modifier le véhicule",
    deleteVehicle: "Supprimer le véhicule",
    viewVehicle: "Voir les détails",
  },

  status: {
    available: "Disponible",
    inUse: "En cours d'utilisation",
    maintenance: "En maintenance",
    outOfService: "Hors service",
  },

  count: {
    zero: "Aucun véhicule",
    one: "1 véhicule",
    other: "{{count}} véhicules",
  },
} as const;

// ============================================================================
// PLANNING - Module planning
// ============================================================================

export const planning = {
  title: "Planning",
  subtitle: "Gestion du planning des leçons",

  actions: {
    createLesson: "Créer une leçon",
    editLesson: "Modifier la leçon",
    cancelLesson: "Annuler la leçon",
    viewLesson: "Voir les détails",
  },

  views: {
    month: "Mois",
    week: "Semaine",
    day: "Jour",
  },

  count: {
    zero: "Aucune leçon",
    one: "1 leçon",
    other: "{{count}} leçons",
  },
} as const;

// ============================================================================
// EXPORT TYPE-SAFE
// ============================================================================

export const fr = {
  common,
  students,
  instructors,
  vehicles,
  planning,
} as const;

export type FrenchTranslations = typeof fr;
