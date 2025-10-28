/**
 * ============================================================================
 * VIAMENTOR - Guide d'Optimisation Mobile & Responsive
 * ============================================================================
 *
 * Guide complet pour optimiser l'expérience mobile
 *
 * Score initial: 8/10
 * Score cible: 10/10
 */

// ============================================================================
// 1. PROBLÈMES IDENTIFIÉS
// ============================================================================

/**
 * ❌ PROBLÈME 1: Dashboards non optimisés mobile
 *
 * Symptômes:
 * - 8 graphiques illisibles sur petit écran
 * - Scroll horizontal nécessaire
 * - Tooltips inaccessibles au touch
 * - Légendes tronquées
 *
 * Solutions implémentées:
 * ✅ ResponsiveDashboard avec layout adaptatif
 * ✅ Tabs pour organiser les charts sur mobile
 * ✅ Charts simplifiés (pas de YAxis sur mobile)
 * ✅ Tooltips tactiles optimisés
 * ✅ KPIs en grille 2x2 compacte
 *
 * Utilisation:
 * ```tsx
 * import { ResponsiveDashboard } from "@/viamentor/components/viamentor-responsive-dashboard"
 *
 * <ResponsiveDashboard
 *   kpis={kpisData}
 *   chartsData={chartsData}
 *   onKPIClick={(kpi) => console.log(kpi)}
 * />
 * ```
 */

/**
 * ❌ PROBLÈME 2: Forms complexes difficiles sur mobile
 *
 * Symptômes:
 * - Wizard 3+ étapes non adapté
 * - Inputs trop petits pour le touch
 * - Validation non inline
 * - Navigation confuse
 *
 * Solutions implémentées:
 * ✅ MobileWizard avec swipe navigation
 * ✅ Steps indicator adaptatif (dots mobile, liste desktop)
 * ✅ Progress bar visible
 * ✅ Validation inline avec feedback immédiat
 * ✅ Actions fixées en bas (sticky footer)
 * ✅ Inputs optimisés tactile (min 44px height)
 *
 * Utilisation:
 * ```tsx
 * import { MobileWizard } from "@/viamentor/components/viamentor-mobile-wizard"
 *
 * <MobileWizard
 *   steps={wizardSteps}
 *   onComplete={() => console.log("Done")}
 *   allowSwipe
 *   showProgress
 * />
 * ```
 */

/**
 * ❌ PROBLÈME 3: Pas de touch gestures
 *
 * Symptômes:
 * - Swipe pour actions manquant
 * - Long press non supporté
 * - Pinch zoom absent
 * - Expérience mobile limitée
 *
 * Solutions implémentées:
 * ✅ useSwipeGesture hook
 * ✅ useLongPress hook
 * ✅ usePinchZoom hook
 * ✅ useTouchGestures (combiné)
 * ✅ SwipeableCard component
 * ✅ Feedback visuel (progress bars)
 *
 * Utilisation:
 * ```tsx
 * import { useSwipeGesture } from "@/viamentor/data/viamentor-touch-gestures"
 *
 * const swipe = useSwipeGesture({
 *   onSwipeLeft: () => console.log("Next"),
 *   onSwipeRight: () => console.log("Previous")
 * })
 *
 * <div {...swipe}>Swipe me!</div>
 * ```
 */

/**
 * ❌ PROBLÈME 4: Pas d'app mobile native
 *
 * Note: Hors scope pour cette itération
 * Recommandation: PWA (Progressive Web App)
 *
 * Prochaines étapes:
 * - Manifest.json
 * - Service Worker
 * - Offline support
 * - Install prompt
 * - Push notifications
 */

// ============================================================================
// 2. UTILITIES RESPONSIVE
// ============================================================================

/**
 * Hook useResponsive
 *
 * Détecte automatiquement:
 * - Breakpoint actuel (xs, sm, md, lg, xl, 2xl)
 * - Type de device (mobile, tablet, desktop)
 * - Touch device
 * - iOS / Android
 * - Orientation (portrait, landscape)
 * - Hover support
 * - Reduced motion preference
 *
 * @example
 * ```tsx
 * import { useResponsive } from "@/viamentor/data/viamentor-responsive-utils"
 *
 * const responsive = useResponsive()
 *
 * if (responsive.isMobile) {
 *   return <MobileView />
 * }
 *
 * if (responsive.isTablet) {
 *   return <TabletView />
 * }
 *
 * return <DesktopView />
 * ```
 */

/**
 * Hook useBreakpoint
 *
 * Vérifie un breakpoint spécifique
 *
 * @example
 * ```tsx
 * import { useBreakpoint } from "@/viamentor/data/viamentor-responsive-utils"
 *
 * const isMobile = useBreakpoint("mobile")
 * const isLargeOrAbove = useBreakpoint("lg", "min")
 * const isSmallOrBelow = useBreakpoint("sm", "max")
 * ```
 */

/**
 * Helper responsiveClasses
 *
 * Génère des classes Tailwind responsive
 *
 * @example
 * ```tsx
 * import { responsiveClasses } from "@/viamentor/data/viamentor-responsive-utils"
 *
 * const classes = responsiveClasses({
 *   base: "p-4",
 *   sm: "p-6",
 *   md: "p-8",
 *   lg: "p-10"
 * })
 * // → "p-4 sm:p-6 md:p-8 lg:p-10"
 * ```
 */

// ============================================================================
// 3. TOUCH GESTURES
// ============================================================================

/**
 * Swipe Gestures
 *
 * Détecte les swipes dans 4 directions
 *
 * @example
 * ```tsx
 * import { useSwipeGesture } from "@/viamentor/data/viamentor-touch-gestures"
 *
 * const swipe = useSwipeGesture({
 *   onSwipeLeft: () => nextPage(),
 *   onSwipeRight: () => previousPage(),
 *   onSwipeUp: () => scrollToTop(),
 *   onSwipeDown: () => refresh(),
 *   swipeThreshold: 100, // px
 *   swipeVelocity: 0.3 // px/ms
 * })
 *
 * <div {...swipe}>Content</div>
 * ```
 */

/**
 * Long Press
 *
 * Détecte les appuis prolongés
 *
 * @example
 * ```tsx
 * import { useLongPress } from "@/viamentor/data/viamentor-touch-gestures"
 *
 * const longPress = useLongPress({
 *   onLongPress: (e) => showContextMenu(e.x, e.y),
 *   longPressDuration: 800 // ms
 * })
 *
 * <button {...longPress}>Long press me</button>
 * ```
 */

/**
 * Pinch Zoom
 *
 * Détecte les pinch gestures
 *
 * @example
 * ```tsx
 * import { usePinchZoom } from "@/viamentor/data/viamentor-touch-gestures"
 *
 * const pinch = usePinchZoom({
 *   onPinch: (e) => setZoom(e.scale),
 *   onPinchStart: () => console.log("Start"),
 *   onPinchEnd: () => console.log("End")
 * })
 *
 * <div {...pinch}>Zoomable content</div>
 * ```
 */

// ============================================================================
// 4. COMPOSANTS RESPONSIVE
// ============================================================================

/**
 * ResponsiveDashboard
 *
 * Dashboard adaptatif avec 3 layouts:
 * - Mobile: Tabs + KPIs 2x2
 * - Tablet: Grille 2 colonnes
 * - Desktop: Grille 2x2 complète
 *
 * Features:
 * - Charts simplifiés mobile
 * - Tooltips tactiles
 * - KPIs cliquables
 * - Export/actions contextuels
 */

/**
 * MobileWizard
 *
 * Wizard multi-steps optimisé mobile
 *
 * Features:
 * - Swipe navigation
 * - Progress bar
 * - Step indicator adaptatif
 * - Validation inline
 * - Sticky footer actions
 * - Optional steps
 */

/**
 * SwipeableCard
 *
 * Card avec actions swipe
 *
 * Features:
 * - Left/right actions
 * - Visual feedback
 * - Snap behavior
 * - Auto-reset
 * - Customizable colors
 */

// ============================================================================
// 5. BEST PRACTICES MOBILE
// ============================================================================

/**
 * 📱 RÈGLE 1: Touch Targets
 *
 * Minimum 44x44px pour tous les éléments interactifs
 *
 * ✅ Bon:
 * ```tsx
 * <Button className="min-h-[44px] min-w-[44px]">OK</Button>
 * ```
 *
 * ❌ Mauvais:
 * ```tsx
 * <Button className="h-8 w-8">OK</Button>
 * ```
 */

/**
 * 📱 RÈGLE 2: Spacing
 *
 * Espacement généreux entre éléments tactiles
 *
 * ✅ Bon:
 * ```tsx
 * <div className="space-y-4"> // 16px
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </div>
 * ```
 *
 * ❌ Mauvais:
 * ```tsx
 * <div className="space-y-1"> // 4px
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </div>
 * ```
 */

/**
 * 📱 RÈGLE 3: Typography
 *
 * Tailles de police lisibles sur mobile
 *
 * ✅ Bon:
 * - Body: 16px (text-base)
 * - Small: 14px (text-sm)
 * - Tiny: 12px (text-xs) - minimum
 *
 * ❌ Mauvais:
 * - Body: 12px
 * - Small: 10px
 */

/**
 * 📱 RÈGLE 4: Forms
 *
 * Inputs optimisés tactile
 *
 * ✅ Bon:
 * ```tsx
 * <Input
 *   type="email"
 *   inputMode="email"
 *   autoComplete="email"
 *   className="h-12" // 48px
 * />
 * ```
 *
 * ❌ Mauvais:
 * ```tsx
 * <Input type="text" className="h-8" />
 * ```
 */

/**
 * 📱 RÈGLE 5: Navigation
 *
 * Navigation accessible au pouce
 *
 * ✅ Bon:
 * - Bottom navigation
 * - Floating action button
 * - Sticky header/footer
 *
 * ❌ Mauvais:
 * - Top-only navigation
 * - Small hamburger menu
 */

/**
 * 📱 RÈGLE 6: Performance
 *
 * Optimisation pour mobile
 *
 * ✅ Bon:
 * - Lazy loading images
 * - Code splitting
 * - Debounced scroll
 * - Virtualized lists
 *
 * ❌ Mauvais:
 * - Load all data upfront
 * - Heavy animations
 * - Large bundle size
 */

// ============================================================================
// 6. CHECKLIST RESPONSIVE
// ============================================================================

/**
 * ✅ CHECKLIST COMPLÈTE
 *
 * Layout:
 * ✅ Breakpoints Tailwind utilisés
 * ✅ Grid responsive partout
 * ✅ Sidebar collapsible
 * ✅ Tables → Cards sur mobile
 * ✅ Dashboards optimisés mobile
 * ✅ Forms adaptatifs
 *
 * Touch:
 * ✅ Touch targets 44x44px minimum
 * ✅ Swipe gestures implémentés
 * ✅ Long press supporté
 * ✅ Pinch zoom disponible
 * ✅ Feedback visuel
 *
 * Typography:
 * ✅ Tailles lisibles mobile
 * ✅ Line-height adapté
 * ✅ Contrast suffisant
 *
 * Navigation:
 * ✅ Bottom navigation mobile
 * ✅ Sticky actions
 * ✅ Breadcrumb adaptatif
 *
 * Performance:
 * ✅ Images optimisées
 * ✅ Lazy loading
 * ✅ Code splitting
 * ✅ Debounced events
 *
 * Accessibility:
 * ✅ ARIA labels
 * ✅ Keyboard navigation
 * ✅ Focus visible
 * ✅ Screen reader support
 */

// ============================================================================
// 7. MIGRATION GUIDE
// ============================================================================

/**
 * ÉTAPE 1: Audit des pages existantes
 *
 * Pour chaque page:
 * 1. Tester sur mobile (< 768px)
 * 2. Identifier les problèmes
 * 3. Prioriser les corrections
 */

/**
 * ÉTAPE 2: Implémenter useResponsive
 *
 * Remplacer:
 * ```tsx
 * const [isMobile, setIsMobile] = useState(false)
 *
 * useEffect(() => {
 *   const checkMobile = () => {
 *     setIsMobile(window.innerWidth < 768)
 *   }
 *   window.addEventListener("resize", checkMobile)
 *   return () => window.removeEventListener("resize", checkMobile)
 * }, [])
 * ```
 *
 * Par:
 * ```tsx
 * const { isMobile } = useResponsive()
 * ```
 */

/**
 * ÉTAPE 3: Migrer les dashboards
 *
 * Remplacer:
 * ```tsx
 * <div className="grid grid-cols-4 gap-4">
 *   {charts.map(chart => <Chart {...chart} />)}
 * </div>
 * ```
 *
 * Par:
 * ```tsx
 * <ResponsiveDashboard
 *   kpis={kpis}
 *   chartsData={chartsData}
 * />
 * ```
 */

/**
 * ÉTAPE 4: Migrer les wizards
 *
 * Remplacer:
 * ```tsx
 * <Dialog>
 *   <WizardSteps />
 * </Dialog>
 * ```
 *
 * Par:
 * ```tsx
 * <MobileWizard
 *   steps={steps}
 *   allowSwipe
 * />
 * ```
 */

/**
 * ÉTAPE 5: Ajouter swipe actions
 *
 * Sur les listes:
 * ```tsx
 * <SwipeableCardList
 *   items={items}
 *   leftActions={(item) => [...]}
 *   rightActions={(item) => [...]}
 *   renderItem={(item) => <ItemCard {...item} />}
 * />
 * ```
 */

// ============================================================================
// 8. TESTS & VALIDATION
// ============================================================================

/**
 * Tests manuels:
 * - iPhone SE (375px)
 * - iPhone 12 Pro (390px)
 * - iPad (768px)
 * - iPad Pro (1024px)
 * - Desktop (1920px)
 *
 * Tests automatisés:
 * - Lighthouse mobile score
 * - Touch target size
 * - Viewport meta tag
 * - Font size
 */

// ============================================================================
// EXPORT
// ============================================================================

export const MOBILE_OPTIMIZATION_GUIDE = {
  version: "1.0.0",
  scoreInitial: 8,
  scoreCible: 10,
  problemesResolus: 3,
  problemesRestants: 1, // PWA
  composantsCreés: 3,
  hooksCreés: 4,
  utilitiesCreés: 5,
};

export default MOBILE_OPTIMIZATION_GUIDE;
