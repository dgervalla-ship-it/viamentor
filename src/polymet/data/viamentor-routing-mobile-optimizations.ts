/**
 * VIAMENTOR - Routing Mobile Optimizations
 * Guide des optimisations mobile pour le système de routing
 */

// ============================================================================
// ANALYSE DE L'ÉTAT ACTUEL
// ============================================================================

/**
 * ✅ Points Positifs Déjà Implémentés
 *
 * 1. Layout Mobile-Ready
 *    - Sidebar cachée sur mobile (hidden lg:flex)
 *    - Menu hamburger avec backdrop
 *    - Sidebar mobile avec animation slide
 *    - QuickActionsBar pour navigation rapide mobile
 *
 * 2. Responsive Main Content
 *    - Padding adaptatif (p-4 sm:p-6)
 *    - Padding bottom pour QuickActionsBar (pb-20 lg:pb-6)
 *    - Overflow-y-auto pour scroll
 *
 * 3. Error Handling
 *    - ErrorBoundary wrapper
 *    - Suspense avec LoadingPage
 *
 * 4. Navigation Mobile
 *    - Fermeture auto du menu après navigation
 *    - Backdrop cliquable
 */

// ============================================================================
// PROBLÈMES IDENTIFIÉS ET SOLUTIONS
// ============================================================================

/**
 * 1. Props Tenant/Locale en Dur
 *
 * Problème:
 * - tenant="auto-ecole-geneve" et locale="fr" hardcodés dans chaque route
 * - Pas de gestion dynamique selon contexte utilisateur
 *
 * Solution:
 */

import { createContext, useContext, ReactNode } from "react";

// Context pour tenant et locale
interface AppContextType {
  tenant: string;
  locale: "fr" | "de" | "it" | "en";
  setTenant: (tenant: string) => void;
  setLocale: (locale: "fr" | "de" | "it" | "en") => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState(
    localStorage.getItem("tenant") || "auto-ecole-geneve"
  );
  const [locale, setLocale] = useState<"fr" | "de" | "it" | "en">(
    (localStorage.getItem("locale") as any) || "fr"
  );

  useEffect(() => {
    localStorage.setItem("tenant", tenant);
  }, [tenant]);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <AppContext.Provider value={{ tenant, locale, setTenant, setLocale }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

/**
 * 2. Smooth Scroll sur Changement de Route
 *
 * Problème:
 * - Pas de scroll to top automatique
 * - Pas de smooth scroll
 *
 * Solution:
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top avec smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

/**
 * 3. Lazy Loading des Pages
 *
 * Problème:
 * - Toutes les pages importées directement
 * - Bundle size important pour mobile
 *
 * Solution:
 */

import { lazy } from "react";

// Lazy load des pages
export const LazyStudentsPage = lazy(
  () => import("@/polymet/pages/viamentor-students-page")
);
export const LazyInstructorsPage = lazy(
  () => import("@/polymet/pages/viamentor-instructors-page")
);
export const LazyPlanningPage = lazy(
  () => import("@/polymet/pages/viamentor-planning-page")
);
// ... etc pour toutes les pages

/**
 * 4. Gestion du Back Button Mobile
 *
 * Problème:
 * - Pas de stratégie de navigation arrière
 *
 * Solution:
 */

import { useNavigate } from "react-router-dom";

export function useBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // Fallback vers home
    }
  };

  return { goBack };
}

/**
 * 5. Skeleton Loaders pour Connexion Lente
 *
 * Problème:
 * - LoadingPage générique pour toutes les pages
 * - Pas de skeleton adapté au contenu
 *
 * Solution:
 */

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-muted rounded" />

        <div className="h-4 w-96 bg-muted rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-lg" />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-3">
        <div className="h-12 bg-muted rounded" />

        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

/**
 * 6. Responsive Dialog Wrapper
 *
 * Problème:
 * - Dialogs peuvent être trop larges sur mobile
 *
 * Solution:
 */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ResponsiveDialog({
  open,
  onOpenChange,
  children,
  size = "md",
}: ResponsiveDialogProps) {
  const sizeClasses = {
    sm: "max-w-sm sm:max-w-md",
    md: "max-w-lg sm:max-w-xl",
    lg: "max-w-lg sm:max-w-2xl",
    xl: "max-w-xl sm:max-w-3xl",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(sizeClasses[size], "max-h-[90vh] overflow-y-auto")}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

/**
 * 7. Responsive Table Wrapper
 *
 * Problème:
 * - Tables débordent sur mobile
 *
 * Solution:
 */

export function ResponsiveTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-[640px]">{children}</div>
    </div>
  );
}

// ============================================================================
// IMPLÉMENTATION DANS LE PROTOTYPE
// ============================================================================

/**
 * Structure Recommandée du Prototype
 *
 * export default function ViamentorSystemPrototype() {
 *   return (
 *     <AppProvider>
 *       <Router>
 *         <ScrollToTop />
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *           <Route
 *             path="/students"
 *             element={
 *               <LayoutWrapper>
 *                 <Suspense fallback={<PageSkeleton />}>
 *                   <LazyStudentsPage />
 *                 </Suspense>
 *               </LayoutWrapper>
 *             }
 *           />
 *           // ... autres routes
 *         </Routes>
 *       </Router>
 *     </AppProvider>
 *   );
 * }
 */

// ============================================================================
// WRAPPER LAYOUT DYNAMIQUE
// ============================================================================

function LayoutWrapper({ children }: { children: ReactNode }) {
  const { tenant, locale } = useApp();

  return (
    <ViamentorMainLayout locale={locale} tenant={tenant}>
      {children}
    </ViamentorMainLayout>
  );
}

// ============================================================================
// OPTIMISATIONS PERFORMANCE MOBILE
// ============================================================================

/**
 * 8. Prefetch des Routes Critiques
 */

export function usePrefetch() {
  useEffect(() => {
    // Prefetch des routes les plus utilisées après 2 secondes
    const timer = setTimeout(() => {
      import("@/polymet/pages/viamentor-students-page");
      import("@/polymet/pages/viamentor-planning-page");
      import("@/polymet/pages/viamentor-instructors-page");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
}

/**
 * 9. Détection de Connexion Lente
 */

export function useSlowConnection() {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // @ts-ignore - Navigator.connection est expérimental
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const checkConnection = () => {
        const effectiveType = connection.effectiveType;
        setIsSlowConnection(
          effectiveType === "slow-2g" || effectiveType === "2g"
        );
      };

      checkConnection();
      connection.addEventListener("change", checkConnection);

      return () => {
        connection.removeEventListener("change", checkConnection);
      };
    }
  }, []);

  return isSlowConnection;
}

/**
 * 10. Service Worker pour Cache Offline
 */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    });
  }
}

// ============================================================================
// CHECKLIST MOBILE OPTIMIZATION
// ============================================================================

/**
 * ✅ Layout Responsive
 * ✅ Sidebar Mobile avec Hamburger
 * ✅ QuickActionsBar Mobile
 * ✅ Padding Responsive
 * ✅ ErrorBoundary
 * ✅ Suspense avec Loading
 *
 * 🔄 À Implémenter:
 * - [ ] AppContext pour tenant/locale dynamique
 * - [ ] ScrollToTop component
 * - [ ] Lazy loading des pages
 * - [ ] useBackButton hook
 * - [ ] PageSkeleton adaptatif
 * - [ ] ResponsiveDialog wrapper
 * - [ ] ResponsiveTable wrapper
 * - [ ] Prefetch routes critiques
 * - [ ] Détection connexion lente
 * - [ ] Service Worker offline
 */

// ============================================================================
// EXEMPLE D'UTILISATION
// ============================================================================

/**
 * Exemple de Route Optimisée Mobile
 *
 * <Route
 *   path="/students"
 *   element={
 *     <LayoutWrapper>
 *       <Suspense fallback={<PageSkeleton />}>
 *         <LazyStudentsPage />
 *       </Suspense>
 *     </LayoutWrapper>
 *   }
 * />
 */

export default {
  AppProvider,
  useApp,
  ScrollToTop,
  useBackButton,
  PageSkeleton,
  ResponsiveDialog,
  ResponsiveTable,
  usePrefetch,
  useSlowConnection,
  registerServiceWorker,
};
