/**
 * VIAMENTOR - Auth Store Unified
 * Store Zustand centralisé pour authentification (remplace user-store)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type Role =
  | "super_admin"
  | "platform_admin"
  | "school_admin"
  | "instructor_manager"
  | "marketing_manager"
  | "finance_manager"
  | "accountant"
  | "secretary"
  | "instructor"
  | "student";

export type Permission =
  | "students.read"
  | "students.write"
  | "students.delete"
  | "instructors.read"
  | "instructors.write"
  | "instructors.delete"
  | "lessons.read"
  | "lessons.write"
  | "lessons.delete"
  | "invoices.read"
  | "invoices.write"
  | "invoices.delete"
  | "vehicles.read"
  | "vehicles.write"
  | "vehicles.delete"
  | "analytics.read"
  | "settings.read"
  | "settings.write";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status?: "available" | "busy" | "away";
}

interface AuthState {
  // State
  user: User | null;
  role: Role | null;
  permissions: Permission[];
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User) => void;
  setRole: (role: Role) => void;
  setPermissions: (permissions: Permission[]) => void;
  login: (user: User, role: Role, permissions: Permission[]) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;

  // Helpers
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

// ============================================================================
// STORE
// ============================================================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      role: null,
      permissions: [],
      isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setRole: (role) => set({ role }),

      setPermissions: (permissions) => set({ permissions }),

      login: (user, role, permissions) =>
        set({
          user,
          role,
          permissions,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          role: null,
          permissions: [],
          isAuthenticated: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // Helpers
      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      hasAnyPermission: (permissionsToCheck) => {
        const { permissions } = get();
        return permissionsToCheck.some((p) => permissions.includes(p));
      },

      hasAllPermissions: (permissionsToCheck) => {
        const { permissions } = get();
        return permissionsToCheck.every((p) => permissions.includes(p));
      },
    }),
    {
      name: "viamentor-auth-storage",
      // Ne pas persister les permissions (recalculées au login)
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================================================
// SELECTORS (pour optimiser re-renders)
// ============================================================================

export const selectUser = (state: AuthState) => state.user;
export const selectRole = (state: AuthState) => state.role;
export const selectPermissions = (state: AuthState) => state.permissions;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
