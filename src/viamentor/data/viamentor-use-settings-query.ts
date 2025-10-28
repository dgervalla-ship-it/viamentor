/**
 * VIAMENTOR - Use Settings Query
 * Hook TanStack Query pour gestion données serveur paramètres système
 *
 * Responsabilités:
 * - Queries: paramètres école, tarification, notifications, utilisateurs
 * - Mutations: mettre à jour paramètres avec validation
 * - Cache management avec invalidation automatique
 * - Optimistic updates pour UX réactive
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSettingsStore } from "@/viamentor/data/viamentor-settings-store";

// ============================================================================
// TYPES
// ============================================================================

export interface SchoolSettings {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  canton: string;
  phone: string;
  email: string;
  website: string;
  logo: string | null;
  businessHours: {
    [key: string]: { open: string; close: string } | null;
  };
}

export interface PricingSettings {
  lessonPrices: {
    [category: string]: number;
  };
  packageDiscounts: {
    lessons: number;
    discount: number;
  }[];
  examFees: {
    [type: string]: number;
  };
  cancellationPolicy: {
    hoursBeforeLesson: number;
    penaltyPercentage: number;
  };
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  templates: {
    [key: string]: {
      subject: string;
      body: string;
      enabled: boolean;
    };
  };
  triggers: {
    [key: string]: boolean;
  };
}

export interface UpdateSettingsInput {
  section: "school" | "pricing" | "notifications";
  data: Partial<SchoolSettings | PricingSettings | NotificationSettings>;
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const settingsKeys = {
  all: ["settings"] as const,
  school: () => [...settingsKeys.all, "school"] as const,
  pricing: () => [...settingsKeys.all, "pricing"] as const,
  notifications: () => [...settingsKeys.all, "notifications"] as const,
};

// ============================================================================
// API SIMULATION
// ============================================================================

const mockSchoolSettings: SchoolSettings = {
  name: "Auto-École Lausanne",
  address: "Rue de la Gare 15",
  city: "Lausanne",
  postalCode: "1003",
  canton: "VD",
  phone: "+41 21 123 45 67",
  email: "info@autoecole-lausanne.ch",
  website: "https://autoecole-lausanne.ch",
  logo: null,
  businessHours: {
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: { open: "09:00", close: "12:00" },
    sunday: null,
  },
};

const mockPricingSettings: PricingSettings = {
  lessonPrices: {
    B: 90,
    A: 100,
    A1: 95,
  },
  packageDiscounts: [
    { lessons: 10, discount: 5 },
    { lessons: 20, discount: 10 },
    { lessons: 30, discount: 15 },
  ],

  examFees: {
    practical: 150,
    theory: 50,
  },
  cancellationPolicy: {
    hoursBeforeLesson: 24,
    penaltyPercentage: 50,
  },
};

const mockNotificationSettings: NotificationSettings = {
  emailEnabled: true,
  smsEnabled: true,
  templates: {
    lessonReminder: {
      subject: "Rappel de leçon",
      body: "Votre leçon est prévue demain à {time}",
      enabled: true,
    },
    lessonCancellation: {
      subject: "Annulation de leçon",
      body: "Votre leçon du {date} a été annulée",
      enabled: true,
    },
  },
  triggers: {
    lessonReminder24h: true,
    lessonReminder2h: true,
    lessonCancellation: true,
    invoiceCreated: true,
    paymentReceived: true,
  },
};

const api = {
  getSchoolSettings: async (): Promise<SchoolSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSchoolSettings;
  },

  getPricingSettings: async (): Promise<PricingSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockPricingSettings;
  },

  getNotificationSettings: async (): Promise<NotificationSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockNotificationSettings;
  },

  updateSettings: async (input: UpdateSettingsInput): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    switch (input.section) {
      case "school":
        Object.assign(mockSchoolSettings, input.data);
        return mockSchoolSettings;
      case "pricing":
        Object.assign(mockPricingSettings, input.data);
        return mockPricingSettings;
      case "notifications":
        Object.assign(mockNotificationSettings, input.data);
        return mockNotificationSettings;
      default:
        throw new Error("Invalid section");
    }
  },
};

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Hook pour récupérer les paramètres de l'école
 */
export function useSchoolSettings() {
  return useQuery({
    queryKey: settingsKeys.school(),
    queryFn: () => api.getSchoolSettings(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook pour récupérer les paramètres de tarification
 */
export function usePricingSettings() {
  return useQuery({
    queryKey: settingsKeys.pricing(),
    queryFn: () => api.getPricingSettings(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook pour récupérer les paramètres de notifications
 */
export function useNotificationSettings() {
  return useQuery({
    queryKey: settingsKeys.notifications(),
    queryFn: () => api.getNotificationSettings(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Hook pour mettre à jour les paramètres avec optimistic update
 */
export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { markSaved, setSaving } = useSettingsStore();

  return useMutation({
    mutationFn: (input: UpdateSettingsInput) => {
      setSaving(true);
      return api.updateSettings(input);
    },
    onMutate: async (input) => {
      // Déterminer la query key en fonction de la section
      let queryKey: any;
      switch (input.section) {
        case "school":
          queryKey = settingsKeys.school();
          break;
        case "pricing":
          queryKey = settingsKeys.pricing();
          break;
        case "notifications":
          queryKey = settingsKeys.notifications();
          break;
      }

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousSettings = queryClient.getQueryData(queryKey);

      // Optimistically update
      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        ...input.data,
      }));

      return { previousSettings, queryKey };
    },
    onError: (err, input, context) => {
      // Rollback on error
      if (context?.previousSettings && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousSettings);
      }
    },
    onSuccess: (data, input, context) => {
      // Mark as saved in UI store
      markSaved();
    },
    onSettled: (data, error, input, context) => {
      // Refetch after mutation
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });
}

/**
 * Hook pour réinitialiser les paramètres aux valeurs par défaut
 */
export function useResetSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: "school" | "pricing" | "notifications") => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Simuler la réinitialisation
      return { section };
    },
    onSuccess: (data) => {
      // Invalider les paramètres de la section
      switch (data.section) {
        case "school":
          queryClient.invalidateQueries({ queryKey: settingsKeys.school() });
          break;
        case "pricing":
          queryClient.invalidateQueries({ queryKey: settingsKeys.pricing() });
          break;
        case "notifications":
          queryClient.invalidateQueries({
            queryKey: settingsKeys.notifications(),
          });
          break;
      }
    },
  });
}
