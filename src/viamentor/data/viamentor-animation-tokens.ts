/**
 * ============================================================================
 * VIAMENTOR - ANIMATION TOKENS
 * ============================================================================
 *
 * Tokens standardisés pour animations et transitions
 * Implémentation des recommandations de l'audit Animations
 */

// ============================================================================
// 1. CSS VARIABLES (globals.css)
// ============================================================================

export const globalsCssAnimations = `
/* ============================================================================
 * app/globals.css
 * Ajouter ces variables CSS pour les animations
 * ============================================================================ */

:root {
  /* Animation durations */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  /* Easing functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

/* ============================================================================
 * Prefers Reduced Motion
 * Respecter les préférences utilisateur pour accessibilité
 * ============================================================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

// ============================================================================
// 2. TAILWIND CONFIG
// ============================================================================

export const tailwindConfigAnimations = `
// ============================================================================
// tailwind.config.ts
// Ajouter ces tokens dans la configuration Tailwind
// ============================================================================

import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      // ✅ Animation durations
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      
      // ✅ Easing functions
      transitionTimingFunction: {
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'bounce': 'var(--ease-bounce)',
        'elastic': 'var(--ease-elastic)',
      },
      
      // ✅ Custom animations
      keyframes: {
        // Existing
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        
        // ✅ NEW: Fade animations
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        
        // ✅ NEW: Slide animations
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        
        // ✅ NEW: Zoom animations
        'zoom-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'zoom-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
        
        // ✅ NEW: Bounce animation
        'bounce-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        
        // ✅ NEW: Shake animation
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
      
      animation: {
        // Existing
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        
        // ✅ NEW: Fade
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-normal) var(--ease-in)',
        
        // ✅ NEW: Slide
        'slide-in-from-top': 'slide-in-from-top var(--duration-normal) var(--ease-out)',
        'slide-in-from-bottom': 'slide-in-from-bottom var(--duration-normal) var(--ease-out)',
        'slide-in-from-left': 'slide-in-from-left var(--duration-normal) var(--ease-out)',
        'slide-in-from-right': 'slide-in-from-right var(--duration-normal) var(--ease-out)',
        
        // ✅ NEW: Zoom
        'zoom-in': 'zoom-in var(--duration-normal) var(--ease-out)',
        'zoom-out': 'zoom-out var(--duration-normal) var(--ease-in)',
        
        // ✅ NEW: Micro-interactions
        'bounce-once': 'bounce-once var(--duration-fast) var(--ease-bounce)',
        'shake': 'shake var(--duration-slow) var(--ease-in-out)',
      },
    },
  },
  plugins: [
    // ✅ Plugin pour motion-safe et motion-reduce
    require('tailwindcss-animate'),
  ],
}

export default config
`;

// ============================================================================
// 3. USAGE EXAMPLES
// ============================================================================

export const usageExamples = {
  hoverStates: `
// ============================================================================
// Hover states avec transitions
// ============================================================================

// Button hover
<Button className="transition-all duration-fast ease-out hover:scale-105">
  Hover me
</Button>

// Card hover
<Card className="transition-all duration-normal ease-out hover:shadow-lg hover:-translate-y-1">
  Hover card
</Card>

// Link hover
<a className="transition-colors duration-fast ease-out hover:text-primary">
  Hover link
</a>
`,

  dialogs: `
// ============================================================================
// Dialogs avec animations
// ============================================================================

import { Dialog, DialogContent } from "@/components/ui/dialog"

// Fade + Zoom
<Dialog>
  <DialogContent className="animate-in fade-in-0 zoom-in-95 duration-normal">
    Content
  </DialogContent>
</Dialog>

// Slide from top
<Dialog>
  <DialogContent className="animate-in slide-in-from-top-5 duration-normal">
    Content
  </DialogContent>
</Dialog>
`,

  sheets: `
// ============================================================================
// Sheets avec animations
// ============================================================================

import { Sheet, SheetContent } from "@/components/ui/sheet"

// Slide from right
<Sheet>
  <SheetContent side="right" className="animate-in slide-in-from-right duration-slow">
    Content
  </SheetContent>
</Sheet>

// Slide from left
<Sheet>
  <SheetContent side="left" className="animate-in slide-in-from-left duration-slow">
    Content
  </SheetContent>
</Sheet>
`,

  toasts: `
// ============================================================================
// Toasts avec animations
// ============================================================================

import { toast } from "sonner"

// Success toast avec bounce
toast.success("Succès!", {
  className: "animate-in slide-in-from-top-5 duration-normal",
  icon: <CheckCircleIcon className="animate-bounce-once" />,
})

// Error toast avec shake
toast.error("Erreur!", {
  className: "animate-in slide-in-from-top-5 duration-normal animate-shake",
})
`,

  microInteractions: `
// ============================================================================
// Micro-interactions
// ============================================================================

// Button press
<Button className="active:scale-95 transition-transform duration-instant">
  Press me
</Button>

// Checkbox check
<Checkbox className="data-[state=checked]:animate-bounce-once" />

// Input focus
<Input className="transition-all duration-fast focus:ring-2 focus:ring-ring" />

// Badge pulse
<Badge className="animate-pulse">New</Badge>

// Icon spin
<RefreshIcon className="animate-spin" />
`,

  pageTransitions: `
// ============================================================================
// Page transitions avec Framer Motion
// ============================================================================

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1], // ease-in-out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
`,

  staggerList: `
// ============================================================================
// Stagger animations pour listes
// ============================================================================

import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function StaggerList({ items }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={item}>
          <Card>{item.content}</Card>
        </motion.li>
      ))}
    </motion.ul>
  )
}
`,

  skeletonToContent: `
// ============================================================================
// Skeleton → Content transition
// ============================================================================

{isLoading ? (
  <Skeleton className="h-20 w-full" />
) : (
  <Card className="animate-in fade-in-0 slide-in-from-bottom-5 duration-normal">
    {content}
  </Card>
)}
`,

  motionSafe: `
// ============================================================================
// Motion-safe et motion-reduce
// ============================================================================

// Animations respectent prefers-reduced-motion
<div className="motion-safe:animate-spin motion-reduce:animate-none">
  <LoaderIcon />
</div>

<Button className="motion-safe:transition-all motion-reduce:transition-none motion-safe:hover:scale-105">
  Hover me
</Button>

<Dialog>
  <DialogContent className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95">
    Content
  </DialogContent>
</Dialog>
`,
};

// ============================================================================
// 4. BEST PRACTICES
// ============================================================================

export const bestPractices = [
  "✅ Durées courtes: 150-300ms pour la plupart des animations",
  "✅ Easing naturel: ease-out pour entrées, ease-in pour sorties",
  "✅ Respecter prefers-reduced-motion (accessibilité)",
  "✅ Animations subtiles: pas de distraction",
  "✅ Feedback immédiat: <100ms pour interactions",
  "✅ Loading states: toujours indiquer chargement",
  "✅ Transitions cohérentes: même durée/easing pour actions similaires",
  "✅ Performance: GPU-accelerated (transform, opacity)",
  "✅ Utiliser motion-safe et motion-reduce classes",
  "❌ Éviter: animations trop longues (>500ms)",
  "❌ Éviter: animations sur layout (width, height, top, left)",
  "❌ Éviter: animations distrayantes ou excessives",
];

// ============================================================================
// 5. ANIMATION GUIDELINES
// ============================================================================

export const animationGuidelines = {
  durations: {
    instant: {
      value: "100ms",
      usage: "Micro-interactions (button press, checkbox check)",
      examples: ["active:scale-95", "data-[state=checked]:animate-bounce-once"],
    },
    fast: {
      value: "150ms",
      usage: "Hover states, focus states",
      examples: ["hover:scale-105", "focus:ring-2"],
    },
    normal: {
      value: "200ms",
      usage: "Dialogs, sheets, toasts, page transitions",
      examples: ["animate-in fade-in-0", "slide-in-from-top"],
    },
    slow: {
      value: "300ms",
      usage: "Large overlays, complex animations",
      examples: ["Sheet side transitions", "Accordion animations"],
    },
    slower: {
      value: "500ms",
      usage: "Rare, only for special effects",
      examples: ["Loading spinners", "Progress bars"],
    },
  },

  easing: {
    linear: {
      value: "linear",
      usage: "Continuous animations (spinners, progress)",
      curve: "Constant speed",
    },
    easeIn: {
      value: "cubic-bezier(0.4, 0, 1, 1)",
      usage: "Exit animations (fade-out, slide-out)",
      curve: "Slow start, fast end",
    },
    easeOut: {
      value: "cubic-bezier(0, 0, 0.2, 1)",
      usage: "Enter animations (fade-in, slide-in)",
      curve: "Fast start, slow end",
    },
    easeInOut: {
      value: "cubic-bezier(0.4, 0, 0.2, 1)",
      usage: "Bidirectional animations",
      curve: "Slow start and end",
    },
    bounce: {
      value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      usage: "Playful micro-interactions",
      curve: "Overshoot and bounce back",
    },
    elastic: {
      value: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      usage: "Attention-grabbing effects",
      curve: "Strong overshoot",
    },
  },

  properties: {
    performant: {
      list: ["transform", "opacity"],
      reason: "GPU-accelerated, 60fps",
      usage: "Always prefer these",
    },
    avoid: {
      list: ["width", "height", "top", "left", "margin", "padding"],
      reason: "Trigger layout reflow, janky",
      usage: "Use transform instead",
    },
  },
};

// ============================================================================
// 6. TESTING CHECKLIST
// ============================================================================

export const testingChecklist = [
  "☐ Animations fluides (60fps)",
  "☐ Durées appropriées (<300ms)",
  "☐ Easing naturel",
  "☐ Prefers-reduced-motion respecté",
  "☐ Motion-safe classes utilisées",
  "☐ Pas d'animations distrayantes",
  "☐ Loading states clairs",
  "☐ Transitions cohérentes",
  "☐ Performance GPU (transform, opacity)",
  "☐ Testé sur mobile",
  "☐ Testé sur tablette",
  "☐ Testé sur desktop",
];

// ============================================================================
// EXPORT
// ============================================================================

export default {
  globalsCssAnimations,
  tailwindConfigAnimations,
  usageExamples,
  bestPractices,
  animationGuidelines,
  testingChecklist,
};
