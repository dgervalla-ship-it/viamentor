/**
 * VIAMENTOR Swiss Cantons Data
 *
 * Données des 26 cantons suisses avec codes, noms, drapeaux et langues
 *
 * @module data/viamentor-swiss-cantons
 * @version 1.0.0
 */

import { SupportedLocale } from "@/viamentor/data/viamentor-i18n-config";

/**
 * Canton suisse
 */
export interface SwissCanton {
  code: string;
  name: string;
  nameFr: string;
  nameDe: string;
  nameIt: string;
  nameEn: string;
  flag: string;
  defaultLocale: SupportedLocale;
  capital: string; // Chef-lieu du canton
  officialLanguages: string[]; // Langue(s) officielle(s)
}

/**
 * Liste complète des 26 cantons suisses
 */
export const SWISS_CANTONS: SwissCanton[] = [
  {
    code: "AG",
    name: "Argovie",
    nameFr: "Argovie",
    nameDe: "Aargau",
    nameIt: "Argovia",
    nameEn: "Aargau",
    flag: "🏛️",
    defaultLocale: "de",
    capital: "Aarau",
    officialLanguages: ["Allemand"],
  },
  {
    code: "AI",
    name: "Appenzell Rhodes-Intérieures",
    nameFr: "Appenzell Rhodes-Intérieures",
    nameDe: "Appenzell Innerrhoden",
    nameIt: "Appenzello Interno",
    nameEn: "Appenzell Innerrhoden",
    flag: "⛪",
    defaultLocale: "de",
    capital: "Appenzell",
    officialLanguages: ["Allemand"],
  },
  {
    code: "AR",
    name: "Appenzell Rhodes-Extérieures",
    nameFr: "Appenzell Rhodes-Extérieures",
    nameDe: "Appenzell Ausserrhoden",
    nameIt: "Appenzello Esterno",
    nameEn: "Appenzell Ausserrhoden",
    flag: "🏔️",
    defaultLocale: "de",
    capital: "Herisau",
    officialLanguages: ["Allemand"],
  },
  {
    code: "BE",
    name: "Berne",
    nameFr: "Berne",
    nameDe: "Bern",
    nameIt: "Berna",
    nameEn: "Bern",
    flag: "🐻",
    defaultLocale: "de",
    capital: "Berne",
    officialLanguages: ["Allemand", "Français"],
  },
  {
    code: "BL",
    name: "Bâle-Campagne",
    nameFr: "Bâle-Campagne",
    nameDe: "Basel-Landschaft",
    nameIt: "Basilea Campagna",
    nameEn: "Basel-Landschaft",
    flag: "🏰",
    defaultLocale: "de",
    capital: "Liestal",
    officialLanguages: ["Allemand"],
  },
  {
    code: "BS",
    name: "Bâle-Ville",
    nameFr: "Bâle-Ville",
    nameDe: "Basel-Stadt",
    nameIt: "Basilea Città",
    nameEn: "Basel-Stadt",
    flag: "🏛️",
    defaultLocale: "de",
    capital: "Bâle",
    officialLanguages: ["Allemand"],
  },
  {
    code: "FR",
    name: "Fribourg",
    nameFr: "Fribourg",
    nameDe: "Freiburg",
    nameIt: "Friburgo",
    nameEn: "Fribourg",
    flag: "🏰",
    defaultLocale: "fr",
    capital: "Fribourg",
    officialLanguages: ["Français", "Allemand"],
  },
  {
    code: "GE",
    name: "Genève",
    nameFr: "Genève",
    nameDe: "Genf",
    nameIt: "Ginevra",
    nameEn: "Geneva",
    flag: "⛲",
    defaultLocale: "fr",
    capital: "Genève",
    officialLanguages: ["Français"],
  },
  {
    code: "GL",
    name: "Glaris",
    nameFr: "Glaris",
    nameDe: "Glarus",
    nameIt: "Glarona",
    nameEn: "Glarus",
    flag: "⛰️",
    defaultLocale: "de",
    capital: "Glaris",
    officialLanguages: ["Allemand"],
  },
  {
    code: "GR",
    name: "Grisons",
    nameFr: "Grisons",
    nameDe: "Graubünden",
    nameIt: "Grigioni",
    nameEn: "Grisons",
    flag: "🏔️",
    defaultLocale: "de",
    capital: "Coire",
    officialLanguages: ["Allemand", "Romanche", "Italien"],
  },
  {
    code: "JU",
    name: "Jura",
    nameFr: "Jura",
    nameDe: "Jura",
    nameIt: "Giura",
    nameEn: "Jura",
    flag: "🌲",
    defaultLocale: "fr",
    capital: "Delémont",
    officialLanguages: ["Français"],
  },
  {
    code: "LU",
    name: "Lucerne",
    nameFr: "Lucerne",
    nameDe: "Luzern",
    nameIt: "Lucerna",
    nameEn: "Lucerne",
    flag: "🌉",
    defaultLocale: "de",
    capital: "Lucerne",
    officialLanguages: ["Allemand"],
  },
  {
    code: "NE",
    name: "Neuchâtel",
    nameFr: "Neuchâtel",
    nameDe: "Neuenburg",
    nameIt: "Neuchâtel",
    nameEn: "Neuchâtel",
    flag: "🏰",
    defaultLocale: "fr",
    capital: "Neuchâtel",
    officialLanguages: ["Français"],
  },
  {
    code: "NW",
    name: "Nidwald",
    nameFr: "Nidwald",
    nameDe: "Nidwalden",
    nameIt: "Nidvaldo",
    nameEn: "Nidwalden",
    flag: "⛰️",
    defaultLocale: "de",
    capital: "Stans",
    officialLanguages: ["Allemand"],
  },
  {
    code: "OW",
    name: "Obwald",
    nameFr: "Obwald",
    nameDe: "Obwalden",
    nameIt: "Obvaldo",
    nameEn: "Obwalden",
    flag: "🏔️",
    defaultLocale: "de",
    capital: "Sarnen",
    officialLanguages: ["Allemand"],
  },
  {
    code: "SG",
    name: "Saint-Gall",
    nameFr: "Saint-Gall",
    nameDe: "St. Gallen",
    nameIt: "San Gallo",
    nameEn: "St. Gallen",
    flag: "🏛️",
    defaultLocale: "de",
    capital: "Saint-Gall",
    officialLanguages: ["Allemand"],
  },
  {
    code: "SH",
    name: "Schaffhouse",
    nameFr: "Schaffhouse",
    nameDe: "Schaffhausen",
    nameIt: "Sciaffusa",
    nameEn: "Schaffhausen",
    flag: "🏰",
    defaultLocale: "de",
    capital: "Schaffhouse",
    officialLanguages: ["Allemand"],
  },
  {
    code: "SO",
    name: "Soleure",
    nameFr: "Soleure",
    nameDe: "Solothurn",
    nameIt: "Soletta",
    nameEn: "Solothurn",
    flag: "🏛️",
    defaultLocale: "de",
    capital: "Soleure",
    officialLanguages: ["Allemand"],
  },
  {
    code: "SZ",
    name: "Schwyz",
    nameFr: "Schwyz",
    nameDe: "Schwyz",
    nameIt: "Svitto",
    nameEn: "Schwyz",
    flag: "🏔️",
    defaultLocale: "de",
    capital: "Schwyz",
    officialLanguages: ["Allemand"],
  },
  {
    code: "TG",
    name: "Thurgovie",
    nameFr: "Thurgovie",
    nameDe: "Thurgau",
    nameIt: "Turgovia",
    nameEn: "Thurgau",
    flag: "🌳",
    defaultLocale: "de",
    capital: "Frauenfeld",
    officialLanguages: ["Allemand"],
  },
  {
    code: "TI",
    name: "Tessin",
    nameFr: "Tessin",
    nameDe: "Tessin",
    nameIt: "Ticino",
    nameEn: "Ticino",
    flag: "🌴",
    defaultLocale: "it",
    capital: "Bellinzone",
    officialLanguages: ["Italien"],
  },
  {
    code: "UR",
    name: "Uri",
    nameFr: "Uri",
    nameDe: "Uri",
    nameIt: "Uri",
    nameEn: "Uri",
    flag: "🐂",
    defaultLocale: "de",
    capital: "Altdorf",
    officialLanguages: ["Allemand"],
  },
  {
    code: "VD",
    name: "Vaud",
    nameFr: "Vaud",
    nameDe: "Waadt",
    nameIt: "Vaud",
    nameEn: "Vaud",
    flag: "🍇",
    defaultLocale: "fr",
    capital: "Lausanne",
    officialLanguages: ["Français"],
  },
  {
    code: "VS",
    name: "Valais",
    nameFr: "Valais",
    nameDe: "Wallis",
    nameIt: "Vallese",
    nameEn: "Valais",
    flag: "⛰️",
    defaultLocale: "fr",
    capital: "Sion",
    officialLanguages: ["Français", "Allemand"],
  },
  {
    code: "ZG",
    name: "Zoug",
    nameFr: "Zoug",
    nameDe: "Zug",
    nameIt: "Zugo",
    nameEn: "Zug",
    flag: "🏛️",
    defaultLocale: "de",
    capital: "Zoug",
    officialLanguages: ["Allemand"],
  },
  {
    code: "ZH",
    name: "Zurich",
    nameFr: "Zurich",
    nameDe: "Zürich",
    nameIt: "Zurigo",
    nameEn: "Zurich",
    flag: "🏙️",
    defaultLocale: "de",
    capital: "Zurich",
    officialLanguages: ["Allemand"],
  },
];

/**
 * Obtenir un canton par son code
 */
export function getCantonByCode(code: string): SwissCanton | undefined {
  return SWISS_CANTONS.find((c) => c.code === code);
}

/**
 * Obtenir la langue par défaut d'un canton
 */
export function getCantonDefaultLocale(code: string): SupportedLocale {
  const canton = getCantonByCode(code);
  return canton?.defaultLocale || "fr";
}

/**
 * Obtenir le nom du canton dans une langue donnée
 */
export function getCantonName(code: string, locale: SupportedLocale): string {
  const canton = getCantonByCode(code);
  if (!canton) return code;

  switch (locale) {
    case "fr":
      return canton.nameFr;
    case "de":
      return canton.nameDe;
    case "it":
      return canton.nameIt;
    case "en":
      return canton.nameEn;
    default:
      return canton.name;
  }
}

/**
 * Obtenir le chef-lieu d'un canton
 */
export function getCantonCapital(code: string): string {
  const canton = getCantonByCode(code);
  return canton?.capital || "";
}

/**
 * Obtenir les langues officielles d'un canton
 */
export function getCantonOfficialLanguages(code: string): string[] {
  const canton = getCantonByCode(code);
  return canton?.officialLanguages || [];
}
