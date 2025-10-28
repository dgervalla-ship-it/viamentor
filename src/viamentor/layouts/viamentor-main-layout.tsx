/**
 * VIAMENTOR - Main Layout
 * Layout principal avec Sidebar + Header, mock user, mock tenant, i18n
 *
 * Structure: Sidebar 280px collapsible + Header sticky + Main content scrollable
 * Features: Mock auth (pas de login requis), RBAC, multi-tenant, i18n, theme
 * Mode: Développement - Accès direct sans authentification
 */

"use client";

import { ReactNode, useState, useEffect, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "@/viamentor/components/viamentor-sidebar";
import { Header } from "@/viamentor/components/viamentor-header";
import { ErrorBoundary } from "@/viamentor/components/viamentor-error-boundary";
import { LoadingPage } from "@/viamentor/components/viamentor-loading-page";
import { QuickActionsBar } from "@/viamentor/components/viamentor-quick-actions-bar";
import { useUserStore } from "@/viamentor/data/viamentor-user-store";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  UsersIcon,
  PlusIcon,
  LayoutDashboardIcon,
} from "lucide-react";

/**
 * QueryClient instance for TanStack Query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Types
 */
export type MainLayoutLocale = "fr" | "de" | "it" | "en";

export interface MainLayoutProps {
  children: ReactNode;
  locale?: MainLayoutLocale;
  tenant?: string;
  className?: string;
}

/**
 * Mock user - Pas d'authentification requise
 * Utilisateur par défaut pour accès direct
 */
const useMockUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    // Définir un utilisateur mock par défaut (School Admin)
    const defaultUser = {
      id: "mock-user-school-admin",
      email: "school@viamentor.ch",
      name: "Admin École",
      role: "school_admin",
    };

    setUser(defaultUser);
  }, [setUser]);

  // Retourner un utilisateur mock avec toutes les métadonnées
  return {
    id: "mock-user-school-admin",
    email: "school@viamentor.ch",
    name: "Admin École",
    role: "school_admin",
    user_metadata: {
      name: "Admin École",
      role: "school_admin",
    },
  };
};

/**
 * Mock tenant - Pas de validation requise
 * Tenant par défaut pour accès direct
 */
const useMockTenant = (tenantSlug?: string) => {
  // Retourner un tenant mock par défaut
  return {
    tenant: {
      id: "tenant-mock-1",
      slug: tenantSlug || "auto-ecole-geneve",
      name: "Auto-École Genève",
      logo: "https://github.com/viamentor-ai.png",
    },
    isLoading: false,
    error: null,
  };
};

/**
 * Main Layout Component
 */
export function ViamentorMainLayout({
  children,
  locale = "fr",
  tenant: tenantSlug,
  className,
}: MainLayoutProps) {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useMockUser();
  const { tenant } = useMockTenant(tenantSlug);

  // Persist collapse state
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored) {
      setSidebarCollapsed(stored === "true");
    }
  }, []);

  const handleToggleCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  const handleNavigate = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false); // Fermer le menu mobile après navigation
  };

  // Mock user data for Header
  const headerUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: "https://github.com/yusufhilmi.png",
    status: "available" as const,
  };

  // Quick Actions configuration - Les 4 actions les plus utilisées
  const quickActions = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Tableau",
        icon: LayoutDashboardIcon,
        onClick: () => handleNavigate("/dashboard"),
        ariaLabel: "Aller au tableau de bord",
      },
      {
        id: "planning",
        label: "Planning",
        icon: CalendarIcon,
        onClick: () => handleNavigate("/planning"),
        ariaLabel: "Ouvrir le planning",
        badge: 3, // Exemple: 3 leçons aujourd'hui
      },
      {
        id: "students",
        label: "Élèves",
        icon: UsersIcon,
        onClick: () => handleNavigate("/students"),
        ariaLabel: "Gérer les élèves",
      },
      {
        id: "new-lesson",
        label: "Nouvelle",
        icon: PlusIcon,
        onClick: () => {
          // Action pour créer une nouvelle leçon - peut ouvrir un modal
          handleNavigate("/planning");
        },
        ariaLabel: "Créer une nouvelle leçon",
      },
    ],

    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn("flex h-screen overflow-hidden bg-background", className)}
      >
        {/* Sidebar Desktop - Caché sur mobile */}
        <aside
          className={cn(
            "hidden lg:flex flex-shrink-0 transition-all duration-300",
            sidebarCollapsed ? "w-20" : "w-[280px]"
          )}
        >
          <Sidebar
            locale={locale}
            role={user?.role}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={handleToggleCollapse}
            onNavigate={handleNavigate}
          />
        </aside>

        {/* Sidebar Mobile - Menu hamburger */}
        <div className="lg:hidden">
          {/* Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar Sheet */}
          <aside
            className={cn(
              "fixed left-0 top-0 h-screen w-[280px] z-50 transition-transform duration-300",
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <Sidebar
              locale={locale}
              role={user?.role}
              isCollapsed={false}
              onToggleCollapse={handleToggleCollapse}
              onNavigate={handleNavigate}
            />
          </aside>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header
            locale={locale}
            user={headerUser}
            onLogout={() => {
              console.log("Logout clicked - No action in mock mode");
            }}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            showMobileMenuButton={true}
            mobileMenuOpen={mobileMenuOpen}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 pb-20 lg:pb-6">
            <ErrorBoundary>
              <Suspense
                fallback={<LoadingPage message="Chargement de la page..." />}
              >
                {children}
              </Suspense>
            </ErrorBoundary>
          </main>

          {/* Quick Actions Bar - Mobile & Tablet Only */}
          <QuickActionsBar actions={quickActions} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

/**
 * Export default
 */
export default ViamentorMainLayout;
