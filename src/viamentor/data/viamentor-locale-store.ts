/**
 * VIAMENTOR Locale Store (Zustand)
 *
 * Store global pour gestion de la locale avec persistence localStorage
 * Intégration Zustand pour state management avancé
 *
 * @module data/viamentor-locale-store
 * @version 1.0.0
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  SupportedLocale,
  LocaleTypographyRules,
  TranslationKeys,
  LOCALE_RULES,
  TRANSLATIONS,
} from "@/viamentor/data/viamentor-i18n-config";

/**
 * Interface du store locale
 */
interface LocaleStore {
  // State
  currentLocale: SupportedLocale;
  localeRules: LocaleTypographyRules;
  translations: TranslationKeys;
  isLoading: boolean;

  // Actions
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
  formatNumber: (value: number) => string;
  formatCurrency: (value: number) => string;
  formatPunctuation: (text: string) => string;
  quote: (text: string, single?: boolean) => string;
}

/**
 * Store Zustand pour la locale
 *
 * @example
 * ```tsx
 * const { currentLocale, setLocale, t } = useLocaleStore()
 * setLocale('de')
 * const welcome = t('common.welcome')
 * ```
 */
export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLocale: "fr",
      localeRules: LOCALE_RULES.fr,
      translations: TRANSLATIONS.fr,
      isLoading: false,

      // Actions
      setLocale: (locale: SupportedLocale) => {
        set({
          currentLocale: locale,
          localeRules: LOCALE_RULES[locale],
          translations: TRANSLATIONS[locale],
        });
      },

      t: (key: string): string => {
        const { translations } = get();
        const keys = key.split(".");
        let value: any = translations;

        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) return key;
        }

        return typeof value === "string" ? value : key;
      },

      formatNumber: (value: number): string => {
        const { localeRules } = get();
        return value
          .toFixed(2)
          .replace(".", localeRules.punctuation.decimalSeparator)
          .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            localeRules.punctuation.thousandsSeparator
          );
      },

      formatCurrency: (value: number): string => {
        const { localeRules, formatNumber } = get();
        return `${formatNumber(value)} ${localeRules.currency.symbol}`;
      },

      formatPunctuation: (text: string): string => {
        const { localeRules } = get();
        let formatted = text;

        if (localeRules.punctuation.spaceBeforeColon) {
          formatted = formatted.replace(/(\S):/g, "$1 :");
        }
        if (localeRules.punctuation.spaceBeforeSemicolon) {
          formatted = formatted.replace(/(\S);/g, "$1 ;");
        }
        if (localeRules.punctuation.spaceBeforeExclamation) {
          formatted = formatted.replace(/(\S)!/g, "$1 !");
        }
        if (localeRules.punctuation.spaceBeforeQuestion) {
          formatted = formatted.replace(/(\S)\?/g, "$1 ?");
        }

        return formatted;
      },

      quote: (text: string, single = false): string => {
        const { localeRules } = get();
        const quotes = single ? localeRules.quotes.single : localeRules.quotes;
        return `${quotes.opening}${text}${quotes.closing}`;
      },
    }),
    {
      name: "viamentor-locale-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Sélecteurs optimisés
 */
export const selectCurrentLocale = (state: LocaleStore) => state.currentLocale;
export const selectLocaleRules = (state: LocaleStore) => state.localeRules;
export const selectTranslations = (state: LocaleStore) => state.translations;
export const selectIsLoading = (state: LocaleStore) => state.isLoading;
