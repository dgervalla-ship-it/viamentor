/**
 * VIAMENTOR - Swiss Holidays API Service
 * Service simulation pour import jours fériés suisses
 */

import type {
  Holiday,
  BusinessHoursLocale,
} from "@/viamentor/data/viamentor-business-hours-data";

// ============================================================================
// TYPES
// ============================================================================

export interface HolidaysAPIResponse {
  success: boolean;
  count: number;
  holidays: Holiday[];
  lastSync: string;
}

export interface HolidaysAPIOptions {
  year?: number;
  canton?: string;
  includeFederal?: boolean;
  includeCantonal?: boolean;
  locale?: BusinessHoursLocale;
}

// ============================================================================
// SWISS HOLIDAYS DATA
// ============================================================================

const federalHolidays2025: Omit<Holiday, "id">[] = [
  { date: "2025-01-01", name: "Nouvel An", type: "federal", isRecurring: true },
  {
    date: "2025-04-18",
    name: "Vendredi Saint",
    type: "federal",
    isRecurring: true,
  },
  {
    date: "2025-04-21",
    name: "Lundi de Pâques",
    type: "federal",
    isRecurring: true,
  },
  {
    date: "2025-05-01",
    name: "Fête du Travail",
    type: "federal",
    isRecurring: true,
  },
  { date: "2025-05-29", name: "Ascension", type: "federal", isRecurring: true },
  {
    date: "2025-06-09",
    name: "Lundi de Pentecôte",
    type: "federal",
    isRecurring: true,
  },
  {
    date: "2025-08-01",
    name: "Fête Nationale Suisse",
    type: "federal",
    isRecurring: true,
  },
  { date: "2025-12-25", name: "Noël", type: "federal", isRecurring: true },
  {
    date: "2025-12-26",
    name: "Saint-Étienne",
    type: "federal",
    isRecurring: true,
  },
];

const cantonalHolidays: Record<string, Omit<Holiday, "id">[]> = {
  VD: [
    {
      date: "2025-01-02",
      name: "Lendemain du Nouvel An",
      type: "cantonal",
      isRecurring: true,
      canton: "VD",
    },
    {
      date: "2025-09-20",
      name: "Jeûne Fédéral",
      type: "cantonal",
      isRecurring: true,
      canton: "VD",
    },
  ],

  GE: [
    {
      date: "2025-01-02",
      name: "Lendemain du Nouvel An",
      type: "cantonal",
      isRecurring: true,
      canton: "GE",
    },
    {
      date: "2025-03-31",
      name: "Restauration de la République",
      type: "cantonal",
      isRecurring: true,
      canton: "GE",
    },
    {
      date: "2025-09-11",
      name: "Jeûne Genevois",
      type: "cantonal",
      isRecurring: true,
      canton: "GE",
    },
    {
      date: "2025-12-31",
      name: "Restauration de la République",
      type: "cantonal",
      isRecurring: true,
      canton: "GE",
    },
  ],

  ZH: [
    {
      date: "2025-01-02",
      name: "Berchtoldstag",
      type: "cantonal",
      isRecurring: true,
      canton: "ZH",
    },
    {
      date: "2025-05-01",
      name: "Tag der Arbeit",
      type: "cantonal",
      isRecurring: true,
      canton: "ZH",
    },
    {
      date: "2025-09-22",
      name: "Knabenschiessen",
      type: "cantonal",
      isRecurring: true,
      canton: "ZH",
    },
  ],

  BE: [
    {
      date: "2025-01-02",
      name: "Berchtoldstag",
      type: "cantonal",
      isRecurring: true,
      canton: "BE",
    },
    {
      date: "2025-09-21",
      name: "Eidgenössischer Dank-, Buss- und Bettag",
      type: "cantonal",
      isRecurring: true,
      canton: "BE",
    },
  ],

  TI: [
    {
      date: "2025-01-06",
      name: "Epifania",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-03-19",
      name: "San Giuseppe",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-06-19",
      name: "Corpus Domini",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-06-29",
      name: "Santi Pietro e Paolo",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-08-15",
      name: "Assunzione di Maria",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-11-01",
      name: "Ognissanti",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
    {
      date: "2025-12-08",
      name: "Immacolata Concezione",
      type: "cantonal",
      isRecurring: true,
      canton: "TI",
    },
  ],

  VS: [
    {
      date: "2025-03-19",
      name: "Saint-Joseph",
      type: "cantonal",
      isRecurring: true,
      canton: "VS",
    },
    {
      date: "2025-06-19",
      name: "Fête-Dieu",
      type: "cantonal",
      isRecurring: true,
      canton: "VS",
    },
    {
      date: "2025-08-15",
      name: "Assomption",
      type: "cantonal",
      isRecurring: true,
      canton: "VS",
    },
    {
      date: "2025-11-01",
      name: "Toussaint",
      type: "cantonal",
      isRecurring: true,
      canton: "VS",
    },
    {
      date: "2025-12-08",
      name: "Immaculée Conception",
      type: "cantonal",
      isRecurring: true,
      canton: "VS",
    },
  ],
};

// ============================================================================
// TRANSLATIONS
// ============================================================================

const holidayTranslations: Record<
  string,
  Record<BusinessHoursLocale, string>
> = {
  "Nouvel An": {
    fr: "Nouvel An",
    de: "Neujahr",
    it: "Capodanno",
    en: "New Year's Day",
  },
  "Vendredi Saint": {
    fr: "Vendredi Saint",
    de: "Karfreitag",
    it: "Venerdì Santo",
    en: "Good Friday",
  },
  "Lundi de Pâques": {
    fr: "Lundi de Pâques",
    de: "Ostermontag",
    it: "Lunedì di Pasqua",
    en: "Easter Monday",
  },
  "Fête du Travail": {
    fr: "Fête du Travail",
    de: "Tag der Arbeit",
    it: "Festa del Lavoro",
    en: "Labour Day",
  },
  Ascension: {
    fr: "Ascension",
    de: "Auffahrt",
    it: "Ascensione",
    en: "Ascension Day",
  },
  "Lundi de Pentecôte": {
    fr: "Lundi de Pentecôte",
    de: "Pfingstmontag",
    it: "Lunedì di Pentecoste",
    en: "Whit Monday",
  },
  "Fête Nationale Suisse": {
    fr: "Fête Nationale Suisse",
    de: "Schweizer Nationalfeiertag",
    it: "Festa Nazionale Svizzera",
    en: "Swiss National Day",
  },
  Noël: { fr: "Noël", de: "Weihnachten", it: "Natale", en: "Christmas Day" },
  "Saint-Étienne": {
    fr: "Saint-Étienne",
    de: "Stephanstag",
    it: "Santo Stefano",
    en: "St. Stephen's Day",
  },
};

function translateHolidayName(
  name: string,
  locale: BusinessHoursLocale
): string {
  return holidayTranslations[name]?.[locale] || name;
}

// ============================================================================
// API SERVICE
// ============================================================================

export const holidaysAPIService = {
  /**
   * Fetch Swiss holidays from API (simulation)
   */
  async fetchHolidays(
    options: HolidaysAPIOptions = {}
  ): Promise<HolidaysAPIResponse> {
    const {
      year = 2025,
      canton = "VD",
      includeFederal = true,
      includeCantonal = true,
      locale = "fr",
    } = options;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const holidays: Holiday[] = [];

    // Add federal holidays
    if (includeFederal) {
      federalHolidays2025.forEach((holiday, index) => {
        holidays.push({
          ...holiday,
          id: `federal-${index}`,
          name: translateHolidayName(holiday.name, locale),
        });
      });
    }

    // Add cantonal holidays
    if (includeCantonal && cantonalHolidays[canton]) {
      cantonalHolidays[canton].forEach((holiday, index) => {
        holidays.push({
          ...holiday,
          id: `cantonal-${canton}-${index}`,
          name: translateHolidayName(holiday.name, locale),
        });
      });
    }

    // Sort by date
    holidays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      success: true,
      count: holidays.length,
      holidays,
      lastSync: new Date().toISOString(),
    };
  },

  /**
   * Get available cantons
   */
  getAvailableCantons(): string[] {
    return Object.keys(cantonalHolidays);
  },

  /**
   * Check if date is holiday
   */
  isHoliday(date: string, holidays: Holiday[]): boolean {
    return holidays.some((h) => h.date === date);
  },

  /**
   * Get next holiday
   */
  getNextHoliday(holidays: Holiday[]): Holiday | null {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = holidays
      .filter((h) => h.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
    return upcoming[0] || null;
  },
};
