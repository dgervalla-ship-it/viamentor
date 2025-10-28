/**
 * VIAMENTOR - Smart Home Redirect
 *
 * Composant de redirection intelligente qui détecte le rôle de l'utilisateur
 * et le redirige automatiquement vers son dashboard approprié.
 *
 * Logique de redirection :
 * - Super Admin → /super-admin
 * - Platform Admin → /platform-admin
 * - School Admin → /school/dashboard
 * - Instructor Manager → /instructor-manager
 * - Marketing Manager → /marketing-manager
 * - Finance Manager → /finance-manager
 * - Accountant → /accountant
 * - Instructor → /instructor/dashboard
 * - Student → /student/dashboard
 * - Secretary → /secretary/dashboard
 * - Non authentifié → /login
 *
 * @module components/viamentor-smart-home-redirect
 */

import { Navigate } from "react-router-dom";
import { useUserStore } from "@/viamentor/data/viamentor-user-store";

/**
 * Map des rôles vers leurs dashboards respectifs
 */
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  // Super Admin & Platform Admin
  super_admin: "/super-admin",
  platform_admin: "/platform-admin",

  // School Admin & Managers
  school_admin: "/school/dashboard",
  instructor_manager: "/instructor-manager",
  marketing_manager: "/marketing-manager",
  finance_manager: "/finance-manager",
  accountant: "/accountant",

  // Operational Roles
  instructor: "/instructor/dashboard",
  student: "/student/dashboard",
  secretary: "/secretary/dashboard",
};

/**
 * Dashboard par défaut si le rôle n'est pas reconnu
 */
const DEFAULT_DASHBOARD = "/school/dashboard";

/**
 * Composant de redirection intelligente
 * Utilise Navigate de react-router-dom pour une redirection propre
 */
export function SmartHomeRedirect() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Obtenir le dashboard approprié pour le rôle
  const targetDashboard = ROLE_DASHBOARD_MAP[user.role] || DEFAULT_DASHBOARD;

  // Rediriger vers le dashboard
  return <Navigate to={targetDashboard} replace />;
}

/**
 * Version alternative avec Navigate direct (sans useEffect)
 * Utilisé pour les redirections simples sans logique complexe
 */
export function SmartHomeRedirectSimple() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Obtenir le dashboard approprié pour le rôle
  const targetDashboard = ROLE_DASHBOARD_MAP[user.role] || DEFAULT_DASHBOARD;

  // Rediriger vers le dashboard
  return <Navigate to={targetDashboard} replace />;
}
