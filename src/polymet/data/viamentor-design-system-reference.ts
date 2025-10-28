/**
 * ============================================================================
 * VIAMENTOR - DESIGN SYSTEM REFERENCE GUIDE
 * ============================================================================
 *
 * Guide de référence complet du Design System ViaMenutor
 * Version: 1.0.0
 * Dernière mise à jour: 2025
 *
 * Ce document définit tous les standards de design pour garantir
 * une cohérence visuelle et une expérience utilisateur optimale.
 */

// ============================================================================
// BRAND FOUNDATIONS
// ============================================================================

export const BRAND_FOUNDATIONS = {
  voice: "Professionnel mais accessible, orienté service, rassurant",
  principles: [
    "Clarté avant tout (auto-école = administration complexe)",
    "Efficacité (actions fréquentes en 1-2 clics max)",
    "Confiance (données sensibles = permis de conduire)",
  ],
} as const;

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export const COLORS = {
  // Primary Colors
  primary: {
    hex: "#3B82F6",
    tailwind: "blue-500",
    usage: "Actions principales, liens, boutons CTA",
    examples: ["Boutons principaux", "Navigation active", "Liens importants"],
  },
  secondary: {
    hex: "#8B5CF6",
    tailwind: "purple-500",
    usage: "Highlights, badges, status positifs",
    examples: ["Actions secondaires", "Tags", "Badges de statut"],
  },

  // Semantic Colors
  success: {
    hex: "#10B981",
    tailwind: "green-500",
    usage: "Validations, permis obtenu",
    examples: ["Messages de succès", "Statut validé", "Permis obtenu"],
  },
  warning: {
    hex: "#F59E0B",
    tailwind: "amber-500",
    usage: "Alertes, paiements en retard",
    examples: ["Alertes attention", "Paiements en retard", "Actions requises"],
  },
  danger: {
    hex: "#EF4444",
    tailwind: "red-500",
    usage: "Erreurs, annulations, échecs examen",
    examples: ["Messages d'erreur", "Annulations", "Échecs"],
  },

  // Neutral Colors
  gray: {
    hex: "#6B7280",
    tailwind: "gray-500",
    usage: "Texte secondaire, borders",
    examples: ["Texte descriptif", "Bordures", "Icônes secondaires"],
  },
  background: {
    hex: "#F9FAFB",
    tailwind: "gray-50",
    usage: "Page background",
    examples: ["Fond de page", "Sections alternées"],
  },
  surface: {
    hex: "#FFFFFF",
    tailwind: "white",
    usage: "Cards, modals, panels",
    examples: ["Cartes", "Modales", "Panneaux"],
  },
} as const;

/**
 * Règles d'utilisation des couleurs
 */
export const COLOR_RULES = [
  "Primary: Boutons principaux, navigation active",
  "Secondary: Actions secondaires, tags",
  "Success/Warning/Danger: Feedback utilisateur uniquement",
  "Jamais de rouge/vert pour info non-status (accessibilité daltonisme)",
] as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  fontFamily: {
    name: "Inter",
    type: "sans-serif",
    reason: "Lisibilité élevée",
    import:
      "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },

  scale: {
    h1: {
      size: "36px",
      lineHeight: "tight",
      weight: "font-bold",
      tracking: "tracking-tight",
      tailwind: "text-4xl font-bold tracking-tight",
      usage: "Titre de page uniquement",
      example:
        '<h1 className="text-4xl font-bold tracking-tight">VIAMENTOR</h1>',
    },
    h2: {
      size: "30px",
      lineHeight: "tight",
      weight: "font-semibold",
      tailwind: "text-3xl font-semibold",
      usage: "Sections principales",
      example: '<h2 className="text-3xl font-semibold">Gestion des élèves</h2>',
    },
    h3: {
      size: "24px",
      lineHeight: "snug",
      weight: "font-semibold",
      tailwind: "text-2xl font-semibold",
      usage: "Sous-sections, titres de cards",
      example: '<h3 className="text-2xl font-semibold">Informations</h3>',
    },
    h4: {
      size: "20px",
      lineHeight: "normal",
      weight: "font-medium",
      tailwind: "text-xl font-medium",
      usage: "Titres de sections mineures",
      example: '<h4 className="text-xl font-medium">Détails</h4>',
    },
    body: {
      size: "16px",
      lineHeight: "relaxed",
      weight: "font-normal",
      tailwind: "text-base",
      usage: "Contenu standard",
      example: '<p className="text-base">Texte de contenu principal</p>',
    },
    small: {
      size: "14px",
      lineHeight: "relaxed",
      weight: "font-normal",
      tailwind: "text-sm",
      usage: "Descriptions, aide contextuelle",
      example: '<p className="text-sm text-muted-foreground">Description</p>',
    },
    tiny: {
      size: "12px",
      lineHeight: "normal",
      weight: "font-medium",
      tailwind: "text-xs font-medium",
      usage: "Labels, captions",
      example: '<span className="text-xs font-medium">Label</span>',
    },
  },
} as const;

// ============================================================================
// SPACING & LAYOUT
// ============================================================================

export const SPACING = {
  baseUnit: "4px",
  scale: {
    1: { px: "4px", tailwind: "1" },
    2: { px: "8px", tailwind: "2" },
    3: { px: "12px", tailwind: "3" },
    4: { px: "16px", tailwind: "4" },
    6: { px: "24px", tailwind: "6" },
    8: { px: "32px", tailwind: "8" },
    12: { px: "48px", tailwind: "12" },
    16: { px: "64px", tailwind: "16" },
    24: { px: "96px", tailwind: "24" },
  },

  containerMaxWidth: "1280px", // xl
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  borderRadius: {
    sm: { px: "4px", tailwind: "rounded-sm" },
    md: { px: "6px", tailwind: "rounded-md" },
    lg: { px: "8px", tailwind: "rounded-lg" },
    xl: { px: "12px", tailwind: "rounded-xl" },
    "2xl": { px: "16px", tailwind: "rounded-2xl" },
  },

  grid: {
    columns: 12,
    responsive: true,
  },
} as const;

/**
 * Règles de layout
 */
export const LAYOUT_RULES = [
  "Mobile-first (80% moniteurs sur mobile)",
  "Cards: padding 24px (p-6), border radius lg (rounded-lg), shadow-sm",
  "Forms: max-width 640px (max-w-md), spacing 16px (space-y-4) entre champs",
  "Lists: gap 12px (gap-3), hover states visibles",
] as const;

// ============================================================================
// ICONOGRAPHY
// ============================================================================

export const ICONOGRAPHY = {
  library: "lucide-react",
  stroke: "2px",
  sizes: {
    small: {
      px: "16px",
      tailwind: "h-4 w-4",
      usage: "Icônes inline, badges",
      example: '<UserIcon className="h-4 w-4" />',
    },
    default: {
      px: "20px",
      tailwind: "h-5 w-5",
      usage: "Icônes standard, boutons",
      example: '<SearchIcon className="h-5 w-5" />',
    },
    large: {
      px: "24px",
      tailwind: "h-6 w-6",
      usage: "Icônes de titre, headers",
      example: '<SettingsIcon className="h-6 w-6" />',
    },
  },

  rules: [
    "Toujours accompagnés de texte (accessibilité)",
    "Placement: Gauche du texte pour actions, droite pour navigation",
  ],
} as const;

// ============================================================================
// MOTION & ANIMATION
// ============================================================================

export const MOTION = {
  duration: {
    quick: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  easing: {
    default: "ease-in-out",
    entrance: "ease-out",
  },

  transitions: ["opacity", "transform", "colors"],

  noAnimation: [
    "Data changes (éviter confusion)",
    "Critical actions (éviter erreurs)",
  ],
} as const;

// ============================================================================
// COMPONENTS - BUTTONS
// ============================================================================

export const BUTTONS = {
  primary: {
    classes: "bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90",
    usage: "Actions principales",
    example: '<Button className="px-6 py-3">Enregistrer</Button>',
  },
  secondary: {
    classes:
      "border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg",
    usage: "Actions secondaires",
    example: '<Button variant="outline">Annuler</Button>',
  },
  ghost: {
    classes: "text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg",
    usage: "Actions tertiaires",
    example: '<Button variant="ghost">Voir plus</Button>',
  },
  link: {
    classes: "text-primary underline-offset-4 hover:underline",
    usage: "Liens textuels",
    example: '<Button variant="link">En savoir plus</Button>',
  },
} as const;

// ============================================================================
// COMPONENTS - IRREVERSIBLE ACTIONS
// ============================================================================

export const IRREVERSIBLE_ACTIONS = {
  delete: {
    requirement: "Toujours avec modal confirmation",
    modal: {
      backdrop: "blur",
      maxWidth: "md",
      padding: "32px (p-8)",
    },
    confirmation: {
      layout: "2 boutons",
      order: "Annuler à gauche, Action danger à droite",
    },
  },
} as const;

// ============================================================================
// COMPONENTS - STATES
// ============================================================================

export const COMPONENT_STATES = {
  loading: {
    type: "Skeleton screens",
    avoid: "Spinners isolés",
    example: '<Skeleton className="h-8 w-64 bg-muted" />',
  },
  empty: {
    elements: ["Illustration", "Message", "CTA"],
    example: "Aucun élève trouvé. Créer un nouvel élève",
  },
  error: {
    elements: ["Couleur danger", "Icon", "Message clair", "Action retry"],
    example: "Erreur de chargement. Réessayer",
  },
  success: {
    type: "Toast notification",
    duration: "3s auto-dismiss",
    example: "Élève créé avec succès",
  },
} as const;

// ============================================================================
// UX PATTERNS
// ============================================================================

export const UX_PATTERNS = {
  navigation: {
    desktop: "Sidebar gauche",
    mobile: "Bottom nav",
  },
  quickActions: {
    mobile: "Floating Action Button (FAB) = + en bas droite",
  },
  breadcrumbs: {
    usage: "Toutes les pages internes (sauf dashboard)",
  },
  search: {
    availability: "Toujours accessible",
    shortcut: "Cmd+K / Ctrl+K",
  },
  filters: {
    desktop: "Sidebar droit collapsable",
    mobile: "Drawer",
  },
} as const;

// ============================================================================
// FORMS
// ============================================================================

export const FORMS = {
  labels: {
    position: "Au-dessus des champs",
    style: "font-medium",
  },
  validation: {
    timing: "Inline (temps réel sur blur)",
    errorDisplay: "Sous le champ, couleur danger",
  },
  submit: {
    state: "Désactivé jusqu'à validation",
  },
  autoSave: {
    usage: "Forms longs (>5 champs)",
  },
  spacing: {
    betweenFields: "16px (space-y-4)",
  },
} as const;

// ============================================================================
// TABLES
// ============================================================================

export const TABLES = {
  header: {
    behavior: "Sticky (scroll vertical)",
  },
  actions: {
    type: "Icon buttons (edit, delete)",
    position: "Dernière colonne",
  },
  selection: {
    position: "Checkbox première colonne",
  },
  responsive: {
    mobile: "Cards (pas de table)",
  },
} as const;

// ============================================================================
// MODALS
// ============================================================================

export const MODALS = {
  closing: {
    methods: ["X en haut droite", "ESC", "Clic backdrop"],
  },
  animations: {
    mobile: "slide-up",
    desktop: "fade-scale",
  },
  nesting: {
    max: "2 levels de nested modals",
  },
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const ACCESSIBILITY = {
  ariaRoles: {
    requirement: "Tous les composants interactifs",
  },
  focusVisible: {
    style: "ring-2 ring-primary ring-offset-2",
    example: "focus-visible:ring-2 focus-visible:ring-primary",
  },
  keyboardNav: {
    supported: ["Tab", "Enter", "ESC"],
  },
  textScaling: {
    support: "Jusqu'à 200%",
  },
  colorContrast: {
    standard: "WCAG AAA",
    ratio: "7:1 pour texte normal",
  },
  screenReaders: {
    requirements: ["Labels explicites", "Live regions pour feedback"],
  },
} as const;

// ============================================================================
// MOBILE-FIRST CRITICAL
// ============================================================================

export const MOBILE_FIRST = {
  touchTargets: {
    minimum: "44×44px",
    example: "min-h-[44px] min-w-[44px]",
  },
  swipeGestures: {
    left: "Delete (avec undo)",
    right: "Actions secondaires",
  },
  bottomSheet: {
    usage: "Préféré aux modals sur mobile",
  },
  pullToRefresh: {
    usage: "Sur listes longues",
  },
  thumbZones: {
    principle: "Actions fréquentes dans zone accessible pouce",
  },
} as const;

// ============================================================================
// EXAMPLES D'UTILISATION
// ============================================================================

export const USAGE_EXAMPLES = {
  // Page Header
  pageHeader: `
<div className="space-y-4">
  <h1 className="text-4xl font-bold tracking-tight">Gestion des élèves</h1>
  <p className="text-base text-muted-foreground">
    Gérez tous vos élèves en un seul endroit
  </p>
</div>
  `,

  // Card
  card: `
<Card className="p-6 rounded-lg shadow-sm">
  <h3 className="text-2xl font-semibold mb-4">Informations</h3>
  <div className="space-y-3">
    <p className="text-base">Contenu de la carte</p>
  </div>
</Card>
  `,

  // Button Primary
  buttonPrimary: `
<Button className="px-6 py-3 rounded-lg">
  Enregistrer
</Button>
  `,

  // Button with Icon
  buttonWithIcon: `
<Button className="px-6 py-3 rounded-lg">
  <PlusIcon className="h-5 w-5 mr-2" />
  Ajouter un élève
</Button>
  `,

  // Form Field
  formField: `
<div className="space-y-2">
  <Label htmlFor="email" className="font-medium">Email</Label>
  <Input 
    id="email" 
    type="email" 
    className="rounded-lg"
  />
  {error && (
    <p className="text-sm text-destructive">{error}</p>
  )}
</div>
  `,

  // List with proper spacing
  list: `
<ul className="space-y-3">
  <li className="flex items-center gap-3">
    <CheckIcon className="h-5 w-5 text-primary" />
    <span className="text-base">Item 1</span>
  </li>
  <li className="flex items-center gap-3">
    <CheckIcon className="h-5 w-5 text-primary" />
    <span className="text-base">Item 2</span>
  </li>
</ul>
  `,

  // Touch Target (Mobile)
  touchTarget: `
<Button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Action
</Button>
  `,
} as const;

// ============================================================================
// CHECKLIST DE CONFORMITÉ
// ============================================================================

export const CONFORMITY_CHECKLIST = {
  typography: [
    "✓ H1 utilise text-4xl font-bold tracking-tight",
    "✓ H2 utilise text-3xl font-semibold",
    "✓ H3 utilise text-2xl font-semibold",
    "✓ Body utilise text-base",
    "✓ Small utilise text-sm",
  ],

  spacing: [
    "✓ Gaps utilisent scale 4-8-12-16-24-32-48-64-96px",
    "✓ Cards ont p-6 (24px)",
    "✓ Forms ont space-y-4 (16px) entre champs",
    "✓ Lists ont gap-3 (12px)",
  ],

  colors: [
    "✓ Primary (#3B82F6) pour actions principales",
    "✓ Secondary (#8B5CF6) pour highlights",
    "✓ Success/Warning/Danger uniquement pour feedback",
  ],

  buttons: ["✓ Primary: px-6 py-3 rounded-lg", "✓ Touch targets: min-h-[44px]"],

  accessibility: [
    "✓ Contrast ratio 7:1 minimum",
    "✓ Focus visible avec ring-2",
    "✓ ARIA roles présents",
    "✓ Keyboard navigation supportée",
  ],
} as const;

// ============================================================================
// EXPORT TYPE DEFINITIONS
// ============================================================================

export type ColorKey = keyof typeof COLORS;
export type TypographyScale = keyof typeof TYPOGRAPHY.scale;
export type SpacingScale = keyof typeof SPACING.scale;
export type IconSize = keyof typeof ICONOGRAPHY.sizes;
export type ButtonVariant = keyof typeof BUTTONS;
