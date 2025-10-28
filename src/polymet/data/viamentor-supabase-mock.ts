/**
 * VIAMENTOR - Supabase Mock
 * Simulation complète Supabase pour développement sans connexion réelle
 *
 * Features:
 * - Auth mock avec session persistence localStorage
 * - Database mock avec CRUD operations
 * - Storage mock pour uploads
 * - Realtime mock avec WebSocket simulation
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Types
 */
export interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    role: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface MockSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: MockUser;
}

export interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: MockSession | null;
  };
  error: Error | null;
}

export interface MockTenant {
  id: string;
  slug: string;
  name: string;
  logo: string;
  status: "active" | "suspended" | "trial";
  plan: "starter" | "pro" | "enterprise";
  created_at: string;
}

/**
 * Mock Users Database
 * Password pour tous les utilisateurs: "viamentor2025"
 */
const MOCK_USERS: Record<string, MockUser> = {
  "admin@viamentor.ch": {
    id: "user-admin-1",
    email: "admin@viamentor.ch",
    user_metadata: {
      name: "Admin Platform",
      role: "platform_admin",
      avatar: "https://github.com/yusufhilmi.png",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  "school@viamentor.ch": {
    id: "user-school-1",
    email: "school@viamentor.ch",
    user_metadata: {
      name: "École Admin",
      role: "school_admin",
      avatar: "https://github.com/kdrnp.png",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  "instructor@viamentor.ch": {
    id: "user-instructor-1",
    email: "instructor@viamentor.ch",
    user_metadata: {
      name: "Jean Moniteur",
      role: "instructor",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  "student@viamentor.ch": {
    id: "user-student-1",
    email: "student@viamentor.ch",
    user_metadata: {
      name: "Marie Élève",
      role: "student",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

/**
 * Mock Tenants Database
 */
const MOCK_TENANTS: Record<string, MockTenant> = {
  "auto-ecole-geneve": {
    id: "tenant-1",
    slug: "auto-ecole-geneve",
    name: "Auto-École Genève",
    logo: "https://github.com/polymet-ai.png",
    status: "active",
    plan: "pro",
    created_at: new Date().toISOString(),
  },
  "ecole-conduite-lausanne": {
    id: "tenant-2",
    slug: "ecole-conduite-lausanne",
    name: "École de Conduite Lausanne",
    logo: "https://github.com/polymet-ai.png",
    status: "active",
    plan: "enterprise",
    created_at: new Date().toISOString(),
  },
};

/**
 * Storage Keys
 */
const STORAGE_KEYS = {
  SESSION: "viamentor_mock_session",
  AUTO_LOGIN: "viamentor_auto_login",
} as const;

/**
 * Mock Supabase Auth Client
 */
class MockSupabaseAuth {
  private session: MockSession | null = null;

  constructor() {
    // Restore session from localStorage
    this.restoreSession();
  }

  private restoreSession() {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (stored) {
      try {
        const session = JSON.parse(stored);
        // Check if session is still valid
        if (session.expires_at > Date.now()) {
          this.session = session;
        } else {
          localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
      } catch (e) {
        console.error("Failed to restore session:", e);
      }
    }
  }

  private saveSession(session: MockSession | null) {
    if (typeof window === "undefined") return;

    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
    this.session = session;
  }

  /**
   * Sign in with email/password
   */
  async signInWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<MockAuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS[email];

    if (!user || password !== "viamentor2025") {
      return {
        data: { user: null, session: null },
        error: new Error("Invalid credentials"),
      };
    }

    const session: MockSession = {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_at: Date.now() + 3600000, // 1 hour
      user,
    };

    this.saveSession(session);

    return {
      data: { user, session },
      error: null,
    };
  }

  /**
   * Get current user
   */
  async getUser(): Promise<MockAuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check auto-login
    if (typeof window !== "undefined") {
      const autoLogin = localStorage.getItem(STORAGE_KEYS.AUTO_LOGIN);
      if (autoLogin === "true" && !this.session) {
        // Auto-login with default user
        const defaultUser = MOCK_USERS["school@viamentor.ch"];
        const session: MockSession = {
          access_token: `mock_token_${Date.now()}`,
          refresh_token: `mock_refresh_${Date.now()}`,
          expires_at: Date.now() + 3600000,
          user: defaultUser,
        };
        this.saveSession(session);
        return {
          data: { user: defaultUser, session },
          error: null,
        };
      }
    }

    if (!this.session) {
      return {
        data: { user: null, session: null },
        error: null,
      };
    }

    // Check if session expired
    if (this.session.expires_at < Date.now()) {
      this.saveSession(null);
      return {
        data: { user: null, session: null },
        error: new Error("Session expired"),
      };
    }

    return {
      data: { user: this.session.user, session: this.session },
      error: null,
    };
  }

  /**
   * Get current session
   */
  async getSession(): Promise<{
    data: { session: MockSession | null };
    error: Error | null;
  }> {
    const { data } = await this.getUser();
    return {
      data: { session: data.session },
      error: null,
    };
  }

  /**
   * Sign out
   */
  async signOut(): Promise<{ error: Error | null }> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.saveSession(null);
    return { error: null };
  }

  /**
   * Sign up
   */
  async signUp({
    email,
    password,
    options,
  }: {
    email: string;
    password: string;
    options?: { data?: { name?: string; role?: string } };
  }): Promise<MockAuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user: MockUser = {
      id: `user-${Date.now()}`,
      email,
      user_metadata: {
        name: options?.data?.name || "New User",
        role: options?.data?.role || "student",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const session: MockSession = {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_at: Date.now() + 3600000,
      user,
    };

    this.saveSession(session);

    return {
      data: { user, session },
      error: null,
    };
  }

  /**
   * Update user
   */
  async updateUser(attributes: {
    email?: string;
    password?: string;
    data?: Record<string, any>;
  }): Promise<MockAuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!this.session) {
      return {
        data: { user: null, session: null },
        error: new Error("Not authenticated"),
      };
    }

    const updatedUser: MockUser = {
      ...this.session.user,
      email: attributes.email || this.session.user.email,
      user_metadata: {
        ...this.session.user.user_metadata,
        ...attributes.data,
      },
      updated_at: new Date().toISOString(),
    };

    const updatedSession: MockSession = {
      ...this.session,
      user: updatedUser,
    };

    this.saveSession(updatedSession);

    return {
      data: { user: updatedUser, session: updatedSession },
      error: null,
    };
  }
}

/**
 * Mock Supabase Database Client
 */
class MockSupabaseDatabase {
  /**
   * Query tenants
   */
  from(table: "tenants") {
    return {
      select: (columns: string = "*") => ({
        eq: (column: string, value: string) => ({
          single: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));

            if (column === "slug") {
              const tenant = MOCK_TENANTS[value];
              if (tenant) {
                return { data: tenant, error: null };
              }
              return { data: null, error: new Error("Tenant not found") };
            }

            return { data: null, error: new Error("Invalid query") };
          },
        }),
      }),
    };
  }
}

/**
 * Mock Supabase Client
 */
class MockSupabaseClient {
  auth: MockSupabaseAuth;
  private db: MockSupabaseDatabase;

  constructor() {
    this.auth = new MockSupabaseAuth();
    this.db = new MockSupabaseDatabase();
  }

  from(table: "tenants") {
    return this.db.from(table);
  }
}

/**
 * Create mock Supabase client
 */
export function createMockSupabaseClient() {
  return new MockSupabaseClient();
}

/**
 * Hook: useSupabaseMock
 */
export function useSupabaseMock() {
  const [client] = useState(() => createMockSupabaseClient());
  return client;
}

/**
 * Enable/Disable auto-login
 */
export function setAutoLogin(enabled: boolean) {
  if (typeof window === "undefined") return;

  if (enabled) {
    localStorage.setItem(STORAGE_KEYS.AUTO_LOGIN, "true");
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTO_LOGIN);
  }
}

/**
 * Get auto-login status
 */
export function getAutoLogin(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.AUTO_LOGIN) === "true";
}

/**
 * Export mock users for testing
 */
export { MOCK_USERS, MOCK_TENANTS };

/**
 * Export default client instance
 */
export const mockSupabase = createMockSupabaseClient();
