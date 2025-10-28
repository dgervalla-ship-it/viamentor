/**
 * VIAMENTOR - Onboarding Progress Hook
 * Gestion état wizard avec auto-save localStorage et validation
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  type SchoolInfoData,
  type UsersRolesData,
  type CategoriesVehiclesData,
  type PaymentConfigData,
  type FinalizationData,
  schoolInfoSchema,
  usersRolesSchema,
  categoriesVehiclesSchema,
  paymentConfigSchema,
  finalizationSchema,
} from "@/polymet/data/viamentor-onboarding-schemas";

/**
 * État complet onboarding
 */
export interface OnboardingState {
  currentStep: number;
  completedSteps: number[];
  schoolInfo: Partial<SchoolInfoData>;
  usersRoles: Partial<UsersRolesData>;
  categoriesVehicles: Partial<CategoriesVehiclesData>;
  paymentConfig: Partial<PaymentConfigData>;
  finalization: Partial<FinalizationData>;
  lastSaved: Date | null;
  isComplete: boolean;
}

/**
 * Auto-save status
 */
export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

/**
 * Hook de gestion progression onboarding
 */
export function useOnboardingProgress() {
  const STORAGE_KEY = "viamentor-onboarding-progress";
  const AUTO_SAVE_DELAY = 2000; // 2 secondes debounce

  // État principal
  const [state, setState] = useState<OnboardingState>(() => {
    // Charger depuis localStorage au montage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            lastSaved: parsed.lastSaved ? new Date(parsed.lastSaved) : null,
          };
        } catch (error) {
          console.error("Failed to parse saved onboarding state:", error);
        }
      }
    }

    // État initial par défaut
    return {
      currentStep: 1,
      completedSteps: [],
      schoolInfo: {
        brandColor: "#3b82f6",
        multiSites: false,
      },
      usersRoles: {
        invites: [],
      },
      categoriesVehicles: {
        categories: [
          {
            category: "B" as const,
            enabled: true,
            price: 90,
            duration: 45,
          },
        ],

        quickVehicles: [],
        addVehiclesLater: false,
      },
      paymentConfig: {
        invoicingEnabled: true,
        vatNumber: "",
        iban: "",
        paymentMethods: ["cash"] as any,
        paymentDeadlineDays: 30,
        termsAndConditions: "",
        qrBillEnabled: true,
      },
      finalization: {
        acceptTerms: false,
        acceptPrivacy: false,
        newsletter: false,
        dataProcessingConsent: true,
      },
      lastSaved: null,
      isComplete: false,
    };
  });

  // Auto-save status
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("idle");

  // Refs pour debounce
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Sauvegarde dans localStorage
   */
  const saveToStorage = useCallback((stateToSave: OnboardingState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setAutoSaveStatus("saved");
      setTimeout(() => setAutoSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to save onboarding state:", error);
      setAutoSaveStatus("error");
    }
  }, []);

  /**
   * Auto-save avec debounce
   */
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setAutoSaveStatus("saving");

    saveTimeoutRef.current = setTimeout(() => {
      saveToStorage(state);
    }, AUTO_SAVE_DELAY);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state, saveToStorage]);

  /**
   * Mise à jour Step 1
   */
  const updateSchoolInfo = useCallback((data: Partial<SchoolInfoData>) => {
    setState((prev) => ({
      ...prev,
      schoolInfo: { ...prev.schoolInfo, ...data },
      lastSaved: new Date(),
    }));
  }, []);

  /**
   * Mise à jour Step 2
   */
  const updateUsersRoles = useCallback((data: Partial<UsersRolesData>) => {
    setState((prev) => ({
      ...prev,
      usersRoles: { ...prev.usersRoles, ...data },
      lastSaved: new Date(),
    }));
  }, []);

  /**
   * Mise à jour Step 3
   */
  const updateCategoriesVehicles = useCallback(
    (data: Partial<CategoriesVehiclesData>) => {
      setState((prev) => ({
        ...prev,
        categoriesVehicles: { ...prev.categoriesVehicles, ...data },
        lastSaved: new Date(),
      }));
    },
    []
  );

  /**
   * Mise à jour Step 4
   */
  const updatePaymentConfig = useCallback(
    (data: Partial<PaymentConfigData>) => {
      setState((prev) => ({
        ...prev,
        paymentConfig: { ...prev.paymentConfig, ...data },
        lastSaved: new Date(),
      }));
    },
    []
  );

  /**
   * Mise à jour Step 5
   */
  const updateFinalization = useCallback((data: Partial<FinalizationData>) => {
    setState((prev) => ({
      ...prev,
      finalization: { ...prev.finalization, ...data },
      lastSaved: new Date(),
    }));
  }, []);

  /**
   * Validation d'un step
   */
  const validateStep = useCallback(
    (step: number): { isValid: boolean; errors?: string[] } => {
      try {
        switch (step) {
          case 1:
            schoolInfoSchema.parse(state.schoolInfo);
            return { isValid: true };
          case 2:
            usersRolesSchema.parse(state.usersRoles);
            return { isValid: true };
          case 3:
            categoriesVehiclesSchema.parse(state.categoriesVehicles);
            return { isValid: true };
          case 4:
            paymentConfigSchema.parse(state.paymentConfig);
            return { isValid: true };
          case 5:
            finalizationSchema.parse(state.finalization);
            return { isValid: true };
          default:
            return { isValid: false, errors: ["Invalid step"] };
        }
      } catch (error: any) {
        const errors = error.errors?.map((e: any) => e.message) || [
          "Validation failed",
        ];

        return { isValid: false, errors };
      }
    },
    [state]
  );

  /**
   * Navigation vers step suivant
   */
  const goToNextStep = useCallback(() => {
    const validation = validateStep(state.currentStep);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 5),
      completedSteps: [...new Set([...prev.completedSteps, prev.currentStep])],
    }));

    return { success: true };
  }, [state.currentStep, validateStep]);

  /**
   * Navigation vers step précédent
   */
  const goToPreviousStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  /**
   * Navigation vers step spécifique
   */
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 5) {
      setState((prev) => ({
        ...prev,
        currentStep: step,
      }));
    }
  }, []);

  /**
   * Finalisation onboarding
   */
  const completeOnboarding = useCallback(async () => {
    // Valider tous les steps
    for (let step = 1; step <= 5; step++) {
      const validation = validateStep(step);
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
          failedStep: step,
        };
      }
    }

    // Marquer comme complété
    setState((prev) => ({
      ...prev,
      isComplete: true,
      completedSteps: [1, 2, 3, 4, 5],
    }));

    // Sauvegarder immédiatement
    saveToStorage({
      ...state,
      isComplete: true,
      completedSteps: [1, 2, 3, 4, 5],
    });

    // Simuler API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true };
  }, [state, validateStep, saveToStorage]);

  /**
   * Reset complet
   */
  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      currentStep: 1,
      completedSteps: [],
      schoolInfo: {
        brandColor: "#3b82f6",
        multiSites: false,
      },
      usersRoles: {
        invites: [],
      },
      categoriesVehicles: {
        categories: [
          {
            category: "B" as const,
            enabled: true,
            price: 90,
            duration: 45,
          },
        ],

        quickVehicles: [],
        addVehiclesLater: false,
      },
      paymentConfig: {
        invoicingEnabled: true,
        vatNumber: "",
        iban: "",
        paymentMethods: ["cash"] as any,
        paymentDeadlineDays: 30,
        termsAndConditions: "",
        qrBillEnabled: true,
      },
      finalization: {
        acceptTerms: false,
        acceptPrivacy: false,
        newsletter: false,
        dataProcessingConsent: true,
      },
      lastSaved: null,
      isComplete: false,
    });
  }, []);

  /**
   * Calcul progression globale
   */
  const progress = (state.completedSteps.length / 5) * 100;

  return {
    // État
    state,
    autoSaveStatus,
    progress,

    // Actions
    updateSchoolInfo,
    updateUsersRoles,
    updateCategoriesVehicles,
    updatePaymentConfig,
    updateFinalization,

    // Navigation
    goToNextStep,
    goToPreviousStep,
    goToStep,

    // Validation
    validateStep,

    // Finalisation
    completeOnboarding,
    resetOnboarding,
  };
}

export type { OnboardingState, AutoSaveStatus };
