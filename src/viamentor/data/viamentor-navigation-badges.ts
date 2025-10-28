/**
 * VIAMENTOR - Navigation Badges Data
 * Mock data badges counts dynamiques par rôle
 *
 * Features:
 * - Badge counts par rôle
 * - WebSocket simulation real-time
 * - Badge types (count, status, new)
 * - Badge variants (default, primary, success, warning, danger)
 */

export interface BadgeConfig {
  type: "count" | "status" | "new";
  value: string | number;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

export type BadgeCounts = Record<string, number>;
export type BadgeConfigs = Record<string, BadgeConfig>;

// ============================================================================
// BADGE COUNTS BY ROLE
// ============================================================================

export const BADGE_COUNTS_BY_ROLE: Record<string, BadgeCounts> = {
  super_admin: {
    tenants: 12,
    "audit-logs": 45,
    "system-config": 3,
  },

  platform_admin: {
    tenants: 8,
    support: 3,
    gdpr: 2,
  },

  school_admin: {
    dashboard: 5,
    students: 45,
    "group-lessons": 8,
    makeups: 5,
    prospects: 12,
    registrations: 3,
    campaigns: 2,
    invoices: 15,
    payments: 7,
    reminders: 4,
  },

  instructor: {
    dashboard: 3,
    planning: 5,
    students: 12,
    evaluations: 8,
    makeups: 3,
  },

  student: {
    "book-lesson": 1,
    lessons: 3,
    makeups: 2,
    invoices: 1,
  },

  secretary: {
    dashboard: 6,
    tasks: 8,
    prospects: 12,
    students: 45,
    messages: 5,
  },
};

// ============================================================================
// BADGE CONFIGS (with variants)
// ============================================================================

export const BADGE_CONFIGS_BY_ROLE: Record<string, BadgeConfigs> = {
  super_admin: {
    tenants: { type: "count", value: 12, variant: "primary" },
    "audit-logs": { type: "count", value: 45, variant: "default" },
    "system-config": { type: "count", value: 3, variant: "warning" },
  },

  platform_admin: {
    tenants: { type: "count", value: 8, variant: "primary" },
    support: { type: "count", value: 3, variant: "warning" },
    gdpr: { type: "count", value: 2, variant: "danger" },
  },

  school_admin: {
    dashboard: { type: "count", value: 5, variant: "primary" },
    students: { type: "count", value: 45, variant: "primary" },
    "group-lessons": { type: "count", value: 8, variant: "warning" },
    makeups: { type: "count", value: 5, variant: "warning" },
    prospects: { type: "count", value: 12, variant: "success" },
    registrations: { type: "count", value: 3, variant: "success" },
    campaigns: { type: "count", value: 2, variant: "default" },
    invoices: { type: "count", value: 15, variant: "default" },
    payments: { type: "count", value: 7, variant: "warning" },
    reminders: { type: "count", value: 4, variant: "danger" },
  },

  instructor: {
    dashboard: { type: "count", value: 3, variant: "primary" },
    planning: { type: "count", value: 5, variant: "primary" },
    students: { type: "count", value: 12, variant: "default" },
    evaluations: { type: "count", value: 8, variant: "warning" },
    makeups: { type: "count", value: 3, variant: "warning" },
  },

  student: {
    "book-lesson": { type: "status", value: "CTA", variant: "primary" },
    lessons: { type: "count", value: 3, variant: "default" },
    makeups: { type: "count", value: 2, variant: "warning" },
    invoices: { type: "count", value: 1, variant: "danger" },
  },

  secretary: {
    dashboard: { type: "count", value: 6, variant: "primary" },
    tasks: { type: "count", value: 8, variant: "warning" },
    prospects: { type: "count", value: 12, variant: "success" },
    students: { type: "count", value: 45, variant: "primary" },
    messages: { type: "count", value: 5, variant: "primary" },
  },
};

// ============================================================================
// WEBSOCKET SIMULATION (Real-time updates)
// ============================================================================

export class BadgeUpdatesSimulator {
  private listeners: Set<
    (role: string, linkId: string, count: number) => void
  > = new Set();
  private intervalId?: NodeJS.Timeout;

  /**
   * Start simulating badge updates
   */
  start() {
    if (this.intervalId) return;

    // Simulate updates every 5 seconds
    this.intervalId = setInterval(() => {
      this.simulateUpdate();
    }, 5000);
  }

  /**
   * Stop simulating
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * Subscribe to badge updates
   */
  subscribe(callback: (role: string, linkId: string, count: number) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Simulate a random badge update
   */
  private simulateUpdate() {
    const roles = Object.keys(BADGE_COUNTS_BY_ROLE);
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const badges = Object.keys(BADGE_COUNTS_BY_ROLE[randomRole]);
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    const currentCount = BADGE_COUNTS_BY_ROLE[randomRole][randomBadge];
    const newCount = Math.max(0, currentCount + (Math.random() > 0.5 ? 1 : -1));

    // Update internal state
    BADGE_COUNTS_BY_ROLE[randomRole][randomBadge] = newCount;

    // Notify listeners
    this.listeners.forEach((listener) => {
      listener(randomRole, randomBadge, newCount);
    });
  }

  /**
   * Manually trigger an update
   */
  triggerUpdate(role: string, linkId: string, count: number) {
    if (BADGE_COUNTS_BY_ROLE[role]) {
      BADGE_COUNTS_BY_ROLE[role][linkId] = count;
      this.listeners.forEach((listener) => {
        listener(role, linkId, count);
      });
    }
  }
}

// Singleton instance
export const badgeUpdatesSimulator = new BadgeUpdatesSimulator();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get badge count for a specific role and link
 */
export function getBadgeCount(role: string, linkId: string): number {
  return BADGE_COUNTS_BY_ROLE[role]?.[linkId] || 0;
}

/**
 * Get badge config for a specific role and link
 */
export function getBadgeConfig(
  role: string,
  linkId: string
): BadgeConfig | undefined {
  return BADGE_CONFIGS_BY_ROLE[role]?.[linkId];
}

/**
 * Get all badge counts for a role
 */
export function getAllBadgeCounts(role: string): BadgeCounts {
  return BADGE_COUNTS_BY_ROLE[role] || {};
}

/**
 * Get all badge configs for a role
 */
export function getAllBadgeConfigs(role: string): BadgeConfigs {
  return BADGE_CONFIGS_BY_ROLE[role] || {};
}

/**
 * Update badge count
 */
export function updateBadgeCount(
  role: string,
  linkId: string,
  count: number
): void {
  if (BADGE_COUNTS_BY_ROLE[role]) {
    BADGE_COUNTS_BY_ROLE[role][linkId] = count;
  }
}

/**
 * Increment badge count
 */
export function incrementBadgeCount(
  role: string,
  linkId: string,
  delta: number = 1
): void {
  if (BADGE_COUNTS_BY_ROLE[role]) {
    const current = BADGE_COUNTS_BY_ROLE[role][linkId] || 0;
    BADGE_COUNTS_BY_ROLE[role][linkId] = Math.max(0, current + delta);
  }
}

/**
 * Reset badge count to 0
 */
export function resetBadgeCount(role: string, linkId: string): void {
  if (BADGE_COUNTS_BY_ROLE[role]) {
    BADGE_COUNTS_BY_ROLE[role][linkId] = 0;
  }
}
