/**
 * VIAMENTOR Locale Provider
 *
 * Context provider pour gestion globale de l'internationalisation
 * Utilise React Context pour partager les traductions et règles typographiques
 * Support des namespaces pour éviter les collisions de clés
 *
 * @module components/viamentor-locale-provider
 * @version 2.0.0
 */

import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  useTypography,
  SupportedLocale,
  LocaleTypographyRules,
  TranslationKeys,
} from "@/polymet/data/viamentor-i18n-config";
import {
  fr,
  type FrenchTranslations,
} from "@/polymet/data/viamentor-i18n-locales-fr";

/**
 * Interface du contexte locale avec support namespaces
 */
interface LocaleContextValue {
  currentLocale: SupportedLocale;
  localeRules: LocaleTypographyRules;
  translations: TranslationKeys;
  changeLocale: (locale: SupportedLocale) => void;
  // Fonction de traduction legacy (sans namespace)
  t: (key: string, params?: Record<string, any>) => string;
  // Fonction de traduction avec namespace (RECOMMANDÉ)
  tn: <N extends keyof FrenchTranslations>(
    namespace: N,
    key: string,
    params?: Record<string, any>
  ) => string;
  formatNumber: (value: number) => string;
  formatCurrency: (value: number) => string;
  formatPunctuation: (text: string) => string;
  quote: (text: string, single?: boolean) => string;
  availableLocales: SupportedLocale[];
  // Accès direct aux traductions centralisées
  i18n: FrenchTranslations;
}

/**
 * Contexte React pour l'i18n
 */
const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

/**
 * Props du LocaleProvider
 */
interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}

/**
 * Provider pour l'i18n VIAMENTOR avec support namespaces
 *
 * @example
 * ```tsx
 * <LocaleProvider initialLocale="fr">
 *   <App />
 * </LocaleProvider>
 * ```
 */
export function LocaleProvider({
  children,
  initialLocale = "fr",
}: LocaleProviderProps) {
  const typographyHook = useTypography(initialLocale);
  const [currentI18n] = useState<FrenchTranslations>(fr);

  /**
   * Fonction de traduction avec namespace (RECOMMANDÉ)
   * Évite les collisions de clés et améliore la maintenabilité
   *
   * @example
   * tn("common", "actions.save") // "Enregistrer"
   * tn("students", "actions.createStudent") // "Créer un élève"
   * tn("students", "count.other", { count: 5 }) // "5 élèves"
   */
  const tn = <N extends keyof FrenchTranslations>(
    namespace: N,
    key: string,
    params?: Record<string, any>
  ): string => {
    try {
      const keys = key.split(".");
      let value: any = currentI18n[namespace];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${namespace}.${key}`);
          return key;
        }
      }

      if (typeof value === "string" && params) {
        // Remplacer les variables {{var}}
        return value.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
          return params[varName]?.toString() || "";
        });
      }

      return typeof value === "string" ? value : key;
    } catch (error) {
      console.error(`Error translating ${namespace}.${key}:`, error);
      return key;
    }
  };

  /**
   * Fonction de traduction legacy (sans namespace)
   * Maintenue pour compatibilité avec l'ancien système
   */
  const tLegacy = (key: string, params?: Record<string, any>): string => {
    // Essayer de trouver dans common d'abord
    if (key.startsWith("common.")) {
      return tn("common", key.replace("common.", ""), params);
    }
    // Sinon utiliser l'ancien système
    return typographyHook.t(key);
  };

  const value: LocaleContextValue = {
    ...typographyHook,
    t: tLegacy,
    tn,
    i18n: currentI18n,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/**
 * Hook pour utiliser le contexte locale avec support namespaces
 *
 * @throws {Error} Si utilisé en dehors d'un LocaleProvider
 *
 * @example
 * ```tsx
 * // Avec namespaces (RECOMMANDÉ)
 * const { tn, formatCurrency } = useLocale()
 * const saveText = tn("common", "actions.save") // "Enregistrer"
 * const createStudent = tn("students", "actions.createStudent") // "Créer un élève"
 * const count = tn("students", "count.other", { count: 5 }) // "5 élèves"
 *
 * // Legacy (sans namespace)
 * const { t } = useLocale()
 * const text = t("common.welcome")
 * ```
 */
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}

/**
 * HOC pour injecter le locale dans un composant
 *
 * @example
 * ```tsx
 * const MyComponent = withLocale(({ locale }) => {
 *   return <div>{locale.t('common.welcome')}</div>
 * })
 * ```
 */
export function withLocale<P extends { locale?: LocaleContextValue }>(
  Component: React.ComponentType<P>
) {
  return function LocalizedComponent(props: Omit<P, "locale">) {
    const locale = useLocale();
    return <Component {...(props as P)} locale={locale} />;
  };
}

/**
 * Composant pour traduction inline avec namespace
 *
 * @example
 * ```tsx
 * <Trans namespace="common" k="actions.save" />
 * <Trans namespace="students" k="actions.createStudent" />
 * <Trans namespace="students" k="count.other" params={{ count: 5 }} />
 * ```
 */
interface TransProps {
  namespace: keyof FrenchTranslations;
  k: string;
  params?: Record<string, any>;
  fallback?: string;
}

export function Trans({ namespace, k, params, fallback }: TransProps) {
  const { tn } = useLocale();
  return <>{tn(namespace, k, params) || fallback || k}</>;
}

/**
 * Composant pour traduction legacy (sans namespace)
 * Maintenu pour compatibilité
 *
 * @example
 * ```tsx
 * <TransLegacy k="common.welcome" />
 * ```
 */
interface TransLegacyProps {
  k: string;
  fallback?: string;
}

export function TransLegacy({ k, fallback }: TransLegacyProps) {
  const { t } = useLocale();
  return <>{t(k) || fallback || k}</>;
}

/**
 * Composant pour formatage de nombre
 *
 * @example
 * ```tsx
 * <FormatNumber value={1234567.89} />
 * ```
 */
interface FormatNumberProps {
  value: number;
}

export function FormatNumber({ value }: FormatNumberProps) {
  const { formatNumber } = useLocale();
  return <>{formatNumber(value)}</>;
}

/**
 * Composant pour formatage de devise
 *
 * @example
 * ```tsx
 * <FormatCurrency value={1500.50} />
 * ```
 */
interface FormatCurrencyProps {
  value: number;
}

export function FormatCurrency({ value }: FormatCurrencyProps) {
  const { formatCurrency } = useLocale();
  return <>{formatCurrency(value)}</>;
}

export type { LocaleContextValue, LocaleProviderProps };
