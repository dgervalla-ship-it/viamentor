/**
 * VIAMENTOR User Store (Zustand)
 *
 * Store global pour gestion de l'utilisateur et RBAC
 * Intégration Zustand pour state management avancé
 *
 * @module data/viamentor-user-store
 * @version 1.0.0
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  UserRole,
  ROLE_MATRIX,
  RoleUtils,
  PermissionCategory,
  PermissionAction,
} from "@/viamentor/data/viamentor-roles";

/**
 * Interface utilisateur
 */
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId?: string;
  avatar?: string;
}

/**
 * Interface du store utilisateur
 */
interface UserStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  changeRole: (role: UserRole) => void;

  // RBAC Helpers
  hasPermission: (
    category: PermissionCategory,
    action: PermissionAction
  ) => boolean;
  canAccess: (requiredRole: UserRole) => boolean;
  isTenantScoped: () => boolean;
}

/**
 * Store Zustand pour l'utilisateur
 *
 * @example
 * ```tsx
 * const { user, setUser, hasPermission } = useUserStore()
 * const canManageLessons = hasPermission('LESSON', 'MANAGE')
 * ```
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            ...updates,
          },
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      changeRole: (role: UserRole) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            role,
          },
        });
      },

      // RBAC Helpers
      hasPermission: (
        category: PermissionCategory,
        action: PermissionAction
      ): boolean => {
        const { user } = get();
        if (!user) return false;

        return RoleUtils.hasPermission(user.role, category, action);
      },

      canAccess: (requiredRole: UserRole): boolean => {
        const { user } = get();
        if (!user) return false;

        return RoleUtils.isHigherRole(user.role, requiredRole);
      },

      isTenantScoped: (): boolean => {
        const { user } = get();
        if (!user) return false;

        return RoleUtils.isTenantScoped(user.role);
      },
    }),
    {
      name: "viamentor-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Sélecteurs optimisés
 */
export const selectUser = (state: UserStore) => state.user;
export const selectIsAuthenticated = (state: UserStore) =>
  state.isAuthenticated;
export const selectUserRole = (state: UserStore) => state.user?.role;
export const selectIsLoading = (state: UserStore) => state.isLoading;

export type { User };
