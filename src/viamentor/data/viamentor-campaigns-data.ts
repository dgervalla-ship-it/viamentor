/**
 * VIAMENTOR - Marketing Campaigns Data
 * Mock data et types TypeScript pour campagnes marketing avec email campaigns, ROI tracking, analytics sources
 */

import type { CampaignsLocale } from "@/viamentor/data/viamentor-campaigns-i18n";

// ============================================================================
// TYPES
// ============================================================================

export type CampaignType = "email" | "sms" | "mixed";

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "running"
  | "completed"
  | "paused";

export type AudienceSegment =
  | "all"
  | "newUncontacted"
  | "interestedNoAppointment"
  | "lostReactivate"
  | "custom";

export type FilterOperator =
  | "equals"
  | "notEquals"
  | "greaterThan"
  | "lessThan"
  | "contains";
export type FilterLogic = "AND" | "OR";

export type EmailStatus =
  | "sent"
  | "opened"
  | "clicked"
  | "bounced"
  | "unsubscribed";

export type AttributionModel =
  | "firstTouch"
  | "lastTouch"
  | "linear"
  | "timeDecay"
  | "positionBased";

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | number;
}

export interface FilterGroup {
  id: string;
  logic: FilterLogic;
  conditions: FilterCondition[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "info" | "appointment" | "followUp" | "promotion";
  locale: CampaignsLocale;
}

export interface EmailVariant {
  id: string;
  name: string;
  subject: string;
  body: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  objective: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  budget: number | null; // CHF
  audienceSegment: AudienceSegment;
  audienceFilters: FilterGroup[];
  audienceCount: number;
  template: string | null; // Template ID
  emailSubject: string;
  emailBody: string;
  abTestEnabled: boolean;
  variants: EmailVariant[];
  trackingEnabled: boolean;
  scheduledAt: string | null; // ISO date
  sentCount: number;
  openedCount: number;
  clickedCount: number;
  convertedCount: number;
  bouncedCount: number;
  unsubscribedCount: number;
  openRate: number; // Percentage
  clickRate: number; // Percentage (CTR)
  conversionRate: number; // Percentage
  costPerAcquisition: number | null; // CPA in CHF
  roi: number | null; // Percentage
  createdAt: string; // ISO date
  createdBy: string; // User ID
  updatedAt: string; // ISO date
}

export interface CampaignProspect {
  id: string;
  campaignId: string;
  prospectId: string;
  prospectName: string;
  prospectEmail: string;
  status: EmailStatus;
  sentAt: string; // ISO date
  openedAt: string | null; // ISO date
  clickedAt: string | null; // ISO date
  convertedAt: string | null; // ISO date
  variantId: string | null;
}

export interface SourceAnalytics {
  source: string;
  leadsGenerated: number;
  contacted: number;
  contactedRate: number; // Percentage
  appointmentsScheduled: number;
  appointmentRate: number; // Percentage
  conversions: number;
  conversionRate: number; // Percentage
  costPerAcquisition: number | null; // CHF
  revenue: number; // CHF
  roi: number | null; // Percentage
}

export interface ConversionJourney {
  prospectId: string;
  prospectName: string;
  touchpoints: TouchPoint[];
  conversionDate: string; // ISO date
  revenue: number; // CHF
}

export interface TouchPoint {
  id: string;
  source: string;
  type: "ad" | "organic" | "email" | "social" | "referral" | "direct";
  date: string; // ISO date
  attribution: number; // Credit percentage based on model
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSent: number;
  avgOpenRate: number; // Percentage
  avgClickRate: number; // Percentage
  avgConversionRate: number; // Percentage
  totalRevenue: number; // CHF
  avgROI: number; // Percentage
}

// ============================================================================
// MOCK DATA
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Sophie Martin",
    email: "sophie@viamentor.ch",
    role: "secretary",
    avatar: "https://github.com/shoaibux1.png",
  },
  {
    id: "tm-2",
    name: "Marc Dubois",
    email: "marc@viamentor.ch",
    role: "admin",
    avatar: "https://github.com/yusufhilmi.png",
  },
  {
    id: "tm-3",
    name: "Julie Schneider",
    email: "julie@viamentor.ch",
    role: "secretary",
    avatar: "https://github.com/kdrnp.png",
  },
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "tpl-1",
    name: "Demande d'information - Permis B",
    subject: "Obtenez votre permis B avec Viamentor 🚗",
    body: `Bonjour {firstName},

Merci de votre intérêt pour notre auto-école Viamentor!

Nous proposons des formations complètes pour le permis B avec:
- Moniteurs expérimentés et certifiés
- Véhicules récents et bien entretenus
- Horaires flexibles adaptés à votre emploi du temps
- Taux de réussite de 85% au premier passage

📅 Réservez votre leçon d'essai gratuite dès maintenant!

Cordialement,
L'équipe Viamentor`,
    category: "info",
    locale: "fr",
  },
  {
    id: "tpl-2",
    name: "Proposition rendez-vous",
    subject: "Planifions votre première leçon 📅",
    body: `Bonjour {firstName},

Suite à votre demande, nous serions ravis de vous rencontrer pour discuter de votre formation au permis {category}.

Voici nos disponibilités cette semaine:
- Lundi 14h-18h
- Mercredi 10h-12h et 14h-18h
- Vendredi 14h-18h

Répondez simplement à cet email avec votre préférence!

À très bientôt,
{instructorName}`,
    category: "appointment",
    locale: "fr",
  },
  {
    id: "tpl-3",
    name: "Relance sans réponse",
    subject: "Toujours intéressé par votre permis? 🤔",
    body: `Bonjour {firstName},

Nous avons remarqué que vous n'avez pas encore répondu à notre dernier message.

Êtes-vous toujours intéressé par votre formation au permis {category}?

Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter!

Cordialement,
L'équipe Viamentor`,
    category: "followUp",
    locale: "fr",
  },
  {
    id: "tpl-4",
    name: "Promotion rentrée 2025",
    subject: "🎉 Offre spéciale rentrée: -15% sur tous nos forfaits!",
    body: `Bonjour {firstName},

Profitez de notre offre spéciale rentrée 2025!

🎁 -15% sur tous nos forfaits de formation
🚗 Leçon d'essai gratuite
📚 Manuel de théorie offert

Offre valable jusqu'au 31 janvier 2025.

Inscrivez-vous maintenant et commencez votre formation dès février!

L'équipe Viamentor`,
    category: "promotion",
    locale: "fr",
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Promo rentrée 2025",
    type: "email",
    status: "completed",
    objective: "Attirer nouveaux élèves lycéens avec offre spéciale rentrée",
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-01-31T23:59:59Z",
    budget: 500,
    audienceSegment: "newUncontacted",
    audienceFilters: [],
    audienceCount: 156,
    template: "tpl-4",
    emailSubject: "🎉 Offre spéciale rentrée: -15% sur tous nos forfaits!",
    emailBody: mockEmailTemplates[3].body,
    abTestEnabled: true,
    variants: [
      {
        id: "var-1",
        name: "Variant A - Emoji 🎉",
        subject: "🎉 Offre spéciale rentrée: -15% sur tous nos forfaits!",
        body: mockEmailTemplates[3].body,
        sentCount: 78,
        openRate: 32.5,
        clickRate: 12.8,
        conversionRate: 8.5,
      },
      {
        id: "var-2",
        name: "Variant B - Sans emoji",
        subject: "Offre spéciale rentrée: -15% sur tous nos forfaits",
        body: mockEmailTemplates[3].body,
        sentCount: 78,
        openRate: 28.2,
        clickRate: 10.3,
        conversionRate: 6.4,
      },
    ],

    trackingEnabled: true,
    scheduledAt: null,
    sentCount: 156,
    openedCount: 48,
    clickedCount: 18,
    convertedCount: 12,
    bouncedCount: 3,
    unsubscribedCount: 1,
    openRate: 30.8,
    clickRate: 11.5,
    conversionRate: 7.7,
    costPerAcquisition: 41.67,
    roi: 220,
    createdAt: "2025-01-08T10:00:00Z",
    createdBy: "tm-2",
    updatedAt: "2025-01-31T23:59:59Z",
  },
  {
    id: "camp-2",
    name: "Relance prospects perdus Q4 2024",
    type: "email",
    status: "completed",
    objective: "Réactiver prospects perdus avec nouvelle offre",
    startDate: "2025-01-05T00:00:00Z",
    endDate: "2025-01-15T23:59:59Z",
    budget: null,
    audienceSegment: "lostReactivate",
    audienceFilters: [],
    audienceCount: 89,
    template: "tpl-3",
    emailSubject: "Toujours intéressé par votre permis? 🤔",
    emailBody: mockEmailTemplates[2].body,
    abTestEnabled: false,
    variants: [],
    trackingEnabled: true,
    scheduledAt: null,
    sentCount: 89,
    openedCount: 22,
    clickedCount: 8,
    convertedCount: 3,
    bouncedCount: 5,
    unsubscribedCount: 2,
    openRate: 24.7,
    clickRate: 9.0,
    conversionRate: 3.4,
    costPerAcquisition: null,
    roi: null,
    createdAt: "2025-01-04T14:30:00Z",
    createdBy: "tm-1",
    updatedAt: "2025-01-15T23:59:59Z",
  },
  {
    id: "camp-3",
    name: "Campagne Google Ads - Permis B",
    type: "mixed",
    status: "running",
    objective: "Générer leads qualifiés via Google Ads",
    startDate: "2025-01-15T00:00:00Z",
    endDate: "2025-02-15T23:59:59Z",
    budget: 1500,
    audienceSegment: "all",
    audienceFilters: [],
    audienceCount: 0,
    template: null,
    emailSubject: "",
    emailBody: "",
    abTestEnabled: false,
    variants: [],
    trackingEnabled: true,
    scheduledAt: null,
    sentCount: 0,
    openedCount: 0,
    clickedCount: 0,
    convertedCount: 0,
    bouncedCount: 0,
    unsubscribedCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    costPerAcquisition: null,
    roi: null,
    createdAt: "2025-01-14T09:00:00Z",
    createdBy: "tm-2",
    updatedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "camp-4",
    name: "Newsletter mensuelle janvier",
    type: "email",
    status: "scheduled",
    objective: "Informer prospects des nouveautés et conseils permis",
    startDate: "2025-01-25T10:00:00Z",
    endDate: "2025-01-25T10:00:00Z",
    budget: null,
    audienceSegment: "interestedNoAppointment",
    audienceFilters: [],
    audienceCount: 67,
    template: "tpl-1",
    emailSubject: "Newsletter Viamentor - Janvier 2025 📰",
    emailBody: "Contenu newsletter...",
    abTestEnabled: false,
    variants: [],
    trackingEnabled: true,
    scheduledAt: "2025-01-25T10:00:00Z",
    sentCount: 0,
    openedCount: 0,
    clickedCount: 0,
    convertedCount: 0,
    bouncedCount: 0,
    unsubscribedCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    costPerAcquisition: null,
    roi: null,
    createdAt: "2025-01-15T16:00:00Z",
    createdBy: "tm-1",
    updatedAt: "2025-01-15T16:00:00Z",
  },
];

export const mockSourceAnalytics: SourceAnalytics[] = [
  {
    source: "Google Ads",
    leadsGenerated: 145,
    contacted: 132,
    contactedRate: 91.0,
    appointmentsScheduled: 78,
    appointmentRate: 53.8,
    conversions: 42,
    conversionRate: 29.0,
    costPerAcquisition: 85.71,
    revenue: 63000,
    roi: 175,
  },
  {
    source: "Facebook",
    leadsGenerated: 98,
    contacted: 85,
    contactedRate: 86.7,
    appointmentsScheduled: 45,
    appointmentRate: 45.9,
    conversions: 28,
    conversionRate: 28.6,
    costPerAcquisition: 67.86,
    revenue: 42000,
    roi: 220,
  },
  {
    source: "Instagram",
    leadsGenerated: 76,
    contacted: 68,
    contactedRate: 89.5,
    appointmentsScheduled: 38,
    appointmentRate: 50.0,
    conversions: 22,
    conversionRate: 28.9,
    costPerAcquisition: 54.55,
    revenue: 33000,
    roi: 275,
  },
  {
    source: "TikTok",
    leadsGenerated: 52,
    contacted: 45,
    contactedRate: 86.5,
    appointmentsScheduled: 28,
    appointmentRate: 53.8,
    conversions: 18,
    conversionRate: 34.6,
    costPerAcquisition: 44.44,
    revenue: 27000,
    roi: 338,
  },
  {
    source: "Référence",
    leadsGenerated: 34,
    contacted: 34,
    contactedRate: 100.0,
    appointmentsScheduled: 30,
    appointmentRate: 88.2,
    conversions: 26,
    conversionRate: 76.5,
    costPerAcquisition: 0,
    revenue: 39000,
    roi: null,
  },
  {
    source: "Direct",
    leadsGenerated: 28,
    contacted: 25,
    contactedRate: 89.3,
    appointmentsScheduled: 18,
    appointmentRate: 64.3,
    conversions: 12,
    conversionRate: 42.9,
    costPerAcquisition: 0,
    revenue: 18000,
    roi: null,
  },
  {
    source: "Organique",
    leadsGenerated: 45,
    contacted: 40,
    contactedRate: 88.9,
    appointmentsScheduled: 25,
    appointmentRate: 55.6,
    conversions: 16,
    conversionRate: 35.6,
    costPerAcquisition: 0,
    revenue: 24000,
    roi: null,
  },
];

export const mockCampaignStats: CampaignStats = {
  totalCampaigns: 4,
  activeCampaigns: 1,
  totalSent: 245,
  avgOpenRate: 27.8,
  avgClickRate: 10.3,
  avgConversionRate: 5.6,
  totalRevenue: 246000,
  avgROI: 243,
};

// ============================================================================
// HELPERS
// ============================================================================

export function getCampaignStatusColor(status: CampaignStatus): string {
  const colors: Record<CampaignStatus, string> = {
    draft: "bg-gray-500",
    scheduled: "bg-blue-500",
    running: "bg-green-500",
    completed: "bg-purple-500",
    paused: "bg-orange-500",
  };
  return colors[status];
}

export function getCampaignTypeIcon(type: CampaignType): string {
  const icons: Record<CampaignType, string> = {
    email: "Mail",
    sms: "MessageSquare",
    mixed: "Layers",
  };
  return icons[type];
}

export function calculateROI(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

export function getROIColor(roi: number | null): string {
  if (roi === null) return "text-gray-600 dark:text-gray-400";
  if (roi >= 200) return "text-green-600 dark:text-green-400";
  if (roi >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatCurrency(
  value: number,
  locale: CampaignsLocale = "fr"
): string {
  return new Intl.NumberFormat(
    locale === "fr"
      ? "fr-CH"
      : locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : "en-CH",
    {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function getAttributionCredit(
  model: AttributionModel,
  touchpointIndex: number,
  totalTouchpoints: number
): number {
  switch (model) {
    case "firstTouch":
      return touchpointIndex === 0 ? 100 : 0;
    case "lastTouch":
      return touchpointIndex === totalTouchpoints - 1 ? 100 : 0;
    case "linear":
      return 100 / totalTouchpoints;
    case "timeDecay":
      // More recent touchpoints get more credit
      const decayFactor = 0.5;
      const weight = Math.pow(
        decayFactor,
        totalTouchpoints - touchpointIndex - 1
      );
      const totalWeight =
        (1 - Math.pow(decayFactor, totalTouchpoints)) / (1 - decayFactor);
      return (weight / totalWeight) * 100;
    case "positionBased":
      // 40% first, 40% last, 20% distributed to middle
      if (touchpointIndex === 0) return 40;
      if (touchpointIndex === totalTouchpoints - 1) return 40;
      return 20 / (totalTouchpoints - 2);
    default:
      return 0;
  }
}
