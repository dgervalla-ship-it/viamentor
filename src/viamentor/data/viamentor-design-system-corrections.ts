/**
 * VIAMENTOR - Design System Corrections Reference
 * Document de référence pour les corrections à appliquer globalement
 */

/**
 * ============================================================================
 * CORRECTIONS COULEURS
 * ============================================================================
 */

export const COLOR_CORRECTIONS = {
  // ❌ AVANT → ✅ APRÈS

  // Primary Actions
  "bg-blue-600": "bg-primary", // #3B82F6
  "text-blue-600": "text-primary",
  "border-blue-600": "border-primary",
  "hover:bg-blue-700": "hover:bg-primary/90",

  // Secondary Actions
  "bg-purple-600": "bg-secondary", // #8B5CF6
  "text-purple-600": "text-secondary",
  "border-purple-600": "border-secondary",

  // Success States
  "bg-green-500": "bg-green-500", // ✅ OK - #10B981
  "text-green-600": "text-green-500",
  "border-green-600": "border-green-500",

  // Warning States
  "bg-orange-500": "bg-amber-500", // #F59E0B
  "text-orange-600": "text-amber-500",
  "border-orange-200": "border-amber-200",
  "bg-orange-50": "bg-amber-50",

  // Danger States
  "bg-red-500": "bg-red-500", // ✅ OK - #EF4444
  "text-red-600": "text-red-500",

  // Status Indicators
  "bg-green-500": "bg-green-500", // Available
  "bg-orange-500": "bg-amber-500", // Busy
  "bg-red-500": "bg-red-500", // Away
};

/**
 * ============================================================================
 * CORRECTIONS TYPOGRAPHIE
 * ============================================================================
 */

export const TYPOGRAPHY_CORRECTIONS = {
  // H1: 36px/tight, font-bold, tracking-tight
  h1: "text-4xl font-bold leading-tight tracking-tight", // 36px = text-4xl

  // H2: 30px/tight, font-semibold
  h2: "text-3xl font-semibold leading-tight", // 30px = text-3xl

  // H3: 24px/snug, font-semibold
  h3: "text-2xl font-semibold leading-snug", // 24px = text-2xl

  // H4: 20px/normal, font-medium
  h4: "text-xl font-medium leading-normal", // 20px = text-xl

  // Body: 16px/relaxed, font-normal
  body: "text-base font-normal leading-relaxed", // 16px = text-base

  // Small: 14px/relaxed, font-normal
  small: "text-sm font-normal leading-relaxed", // 14px = text-sm

  // Tiny: 12px/normal, font-medium (labels, captions)
  tiny: "text-xs font-medium leading-normal", // 12px = text-xs
};

/**
 * ============================================================================
 * CORRECTIONS SPACING
 * ============================================================================
 */

export const SPACING_CORRECTIONS = {
  // Base unit: 4px (Tailwind default)
  // Cards padding: 24px = p-6
  cardPadding: "p-6", // 24px

  // Forms spacing: 16px = gap-4
  formSpacing: "gap-4", // 16px

  // Lists gap: 12px = gap-3
  listGap: "gap-3", // 12px

  // Section spacing: 32px = space-y-8
  sectionSpacing: "space-y-8", // 32px

  // Container padding: 24px desktop, 16px mobile
  containerPadding: "p-4 sm:p-6", // 16px mobile, 24px desktop
};

/**
 * ============================================================================
 * CORRECTIONS COMPOSANTS
 * ============================================================================
 */

export const COMPONENT_CORRECTIONS = {
  // Primary Button
  primaryButton:
    "bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity",

  // Secondary Button
  secondaryButton:
    "border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg transition-colors",

  // Ghost Button
  ghostButton:
    "text-muted-foreground hover:bg-muted px-6 py-3 rounded-lg transition-colors",

  // Cards
  card: "rounded-lg border border-border bg-card shadow-sm p-6",

  // Touch Targets (minimum 44x44px)
  touchTarget: "min-h-[44px] min-w-[44px]",

  // Focus Visible (accessibility)
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
};

/**
 * ============================================================================
 * CORRECTIONS ACCESSIBILITÉ
 * ============================================================================
 */

export const ACCESSIBILITY_CORRECTIONS = {
  // Focus visible sur tous les éléments interactifs
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",

  // Touch targets minimum 44x44px
  minTouchTarget: "min-h-[44px] min-w-[44px]",

  // ARIA labels obligatoires
  ariaLabel: 'aria-label="Description explicite"',

  // Keyboard navigation
  keyboardNav: "focus:outline-none focus-visible:ring-2",
};

/**
 * ============================================================================
 * CORRECTIONS MOBILE-FIRST
 * ============================================================================
 */

export const MOBILE_CORRECTIONS = {
  // Touch targets: Minimum 44×44px
  touchTarget: "min-h-[44px] min-w-[44px] p-3",

  // Bottom sheet préféré aux modals sur mobile
  mobileModal: "lg:max-w-lg", // Modal desktop, bottom sheet mobile

  // Responsive padding
  responsivePadding: "p-4 sm:p-6", // 16px mobile, 24px desktop

  // Responsive grid
  responsiveGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * ============================================================================
 * EXEMPLES DE CORRECTIONS
 * ============================================================================
 */

export const CORRECTION_EXAMPLES = {
  // ❌ AVANT
  before: {
    button:
      '<Button className="bg-blue-600 text-white px-4 py-2">Action</Button>',
    card: '<Card className="p-4 rounded-md">Content</Card>',
    heading: '<h1 className="text-3xl font-semibold">Title</h1>',
    alert:
      '<div className="bg-orange-100 border-orange-300 text-orange-700">Alert</div>',
  },

  // ✅ APRÈS
  after: {
    button:
      '<Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 min-h-[44px]">Action</Button>',
    card: '<Card className="p-6 rounded-lg border border-border bg-card shadow-sm">Content</Card>',
    heading:
      '<h1 className="text-4xl font-bold leading-tight tracking-tight">Title</h1>',
    alert:
      '<div className="bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900">Alert</div>',
  },
};

/**
 * ============================================================================
 * CHECKLIST DE CONFORMITÉ
 * ============================================================================
 */

export const CONFORMITY_CHECKLIST = {
  colors: [
    "✅ Primary: #3B82F6 (bg-primary, text-primary)",
    "✅ Secondary: #8B5CF6 (bg-secondary, text-secondary)",
    "✅ Success: #10B981 (bg-green-500, text-green-500)",
    "✅ Warning: #F59E0B (bg-amber-500, text-amber-500)",
    "✅ Danger: #EF4444 (bg-red-500, text-red-500)",
    "✅ Dark mode support avec dark: prefix",
  ],

  typography: [
    "✅ Font: Inter (system default)",
    "✅ H1: text-4xl font-bold leading-tight tracking-tight",
    "✅ H2: text-3xl font-semibold leading-tight",
    "✅ H3: text-2xl font-semibold leading-snug",
    "✅ Body: text-base font-normal leading-relaxed",
    "✅ Small: text-sm font-normal leading-relaxed",
  ],

  spacing: [
    "✅ Base unit: 4px (Tailwind default)",
    "✅ Cards padding: p-6 (24px)",
    "✅ Forms spacing: gap-4 (16px)",
    "✅ Lists gap: gap-3 (12px)",
    "✅ Border radius: rounded-lg (8px) pour cards",
  ],

  components: [
    "✅ Primary Button: bg-primary px-6 py-3 rounded-lg",
    "✅ Cards: rounded-lg border border-border p-6 shadow-sm",
    "✅ Touch targets: min-h-[44px] min-w-[44px]",
    "✅ Focus visible: ring-2 ring-primary ring-offset-2",
  ],

  accessibility: [
    "✅ ARIA labels sur tous les éléments interactifs",
    "✅ Focus visible avec ring-2 ring-primary",
    "✅ Keyboard navigation supportée",
    "✅ Touch targets minimum 44x44px",
    "✅ Color contrast WCAG AAA (7:1)",
  ],

  mobile: [
    "✅ Mobile-first approach",
    "✅ Touch targets 44x44px minimum",
    "✅ Responsive padding: p-4 sm:p-6",
    "✅ Responsive grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    "✅ Bottom sheet sur mobile, modal sur desktop",
  ],
};

export default {
  COLOR_CORRECTIONS,
  TYPOGRAPHY_CORRECTIONS,
  SPACING_CORRECTIONS,
  COMPONENT_CORRECTIONS,
  ACCESSIBILITY_CORRECTIONS,
  MOBILE_CORRECTIONS,
  CORRECTION_EXAMPLES,
  CONFORMITY_CHECKLIST,
};
