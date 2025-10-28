/**
 * VIAMENTOR - Contact Public Data
 * Mock data et types pour formulaire contact public
 */

import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/viamentor/data/viamentor-contact-public-i18n";

// ============================================================================
// TYPES
// ============================================================================

export type LeadCategory =
  | "carB"
  | "motoA"
  | "trailerBE"
  | "motoLightA1"
  | "professionalBPT"
  | "awarenessTraining"
  | "firstAid"
  | "other";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";

export type LeadSource =
  | "google"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "referral"
  | "direct"
  | "organic";

export type LeadMedium =
  | "cpc"
  | "social"
  | "email"
  | "referral"
  | "organic"
  | "direct";

export interface UTMParams {
  utm_source?: LeadSource;
  utm_medium?: LeadMedium;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface LeadMetadata {
  referrer?: string;
  landing_page?: string;
  user_agent?: string;
  ip_address?: string;
  browser?: string;
  device?: string;
  os?: string;
  timestamp: string;
  fingerprint?: string;
}

export interface LeadFormData {
  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: LeadCategory;
  message?: string;

  // Consent
  gdprConsent: boolean;

  // Tracking
  utm?: UTMParams;
  metadata?: LeadMetadata;
}

export interface Lead extends LeadFormData {
  id: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  notes?: string[];
  convertedToStudentId?: string;
}

export interface SpamCheckResult {
  isSpam: boolean;
  score: number;
  reasons: string[];
}

export interface RateLimitInfo {
  remaining: number;
  resetAt: Date;
  limit: number;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const validateEmail = (email: string): boolean => {
  // RFC5322 simplified regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Swiss phone format: +41 XX XXX XX XX
  const phoneRegex = /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name: string): boolean => {
  // Letters, accents, hyphens, spaces only
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
};

export const formatPhone = (phone: string): string => {
  // Format to +41 XX XXX XX XX
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("41")) {
    const rest = digits.slice(2);
    return `+41 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5, 7)} ${rest.slice(7, 9)}`;
  }
  return phone;
};

// ============================================================================
// SPAM DETECTION
// ============================================================================

export const checkSpam = (data: LeadFormData): SpamCheckResult => {
  const reasons: string[] = [];
  let score = 0;

  // Check for suspicious patterns
  if (data.email.includes("test") || data.email.includes("fake")) {
    reasons.push("Suspicious email");
    score += 30;
  }

  if (data.message && data.message.length > 0) {
    // Check for spam keywords
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "winner",
      "click here",
    ];

    const lowerMessage = data.message.toLowerCase();
    spamKeywords.forEach((keyword) => {
      if (lowerMessage.includes(keyword)) {
        reasons.push(`Spam keyword: ${keyword}`);
        score += 40;
      }
    });

    // Check for excessive links
    const linkCount = (data.message.match(/https?:\/\//g) || []).length;
    if (linkCount > 2) {
      reasons.push("Too many links");
      score += 30;
    }
  }

  // Check for duplicate submissions (would be checked against DB in real app)
  // This is just a placeholder
  if (data.email === "spam@example.com") {
    reasons.push("Known spam email");
    score += 100;
  }

  return {
    isSpam: score >= 50,
    score,
    reasons,
  };
};

// ============================================================================
// RATE LIMITING
// ============================================================================

const rateLimitStore = new Map<string, { count: number; resetAt: Date }>();

export const checkRateLimit = (ip: string): RateLimitInfo => {
  const limit = 3;
  const windowMs = 60 * 60 * 1000; // 1 hour

  const now = new Date();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt < now) {
    // Reset or create new entry
    const resetAt = new Date(now.getTime() + windowMs);
    rateLimitStore.set(ip, { count: 0, resetAt });
    return { remaining: limit, resetAt, limit };
  }

  return {
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    limit,
  };
};

export const incrementRateLimit = (ip: string): void => {
  const existing = rateLimitStore.get(ip);
  if (existing) {
    existing.count++;
  }
};

// ============================================================================
// BROWSER FINGERPRINTING
// ============================================================================

export const generateFingerprint = (): string => {
  // In a real app, this would use Canvas, WebGL, AudioContext, etc.
  // For demo purposes, we'll just generate a random ID
  return `fp_${Math.random().toString(36).substring(2, 15)}`;
};

export const detectBrowser = (userAgent: string): string => {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Unknown";
};

export const detectDevice = (userAgent: string): string => {
  if (userAgent.includes("Mobile")) return "Mobile";
  if (userAgent.includes("Tablet")) return "Tablet";
  return "Desktop";
};

export const detectOS = (userAgent: string): string => {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS")) return "iOS";
  return "Unknown";
};

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.com",
    phone: "+41 79 123 45 67",
    category: "carB",
    message: "J'aimerais connaître vos tarifs pour le permis B",
    gdprConsent: true,
    status: "new",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    utm: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "permis-b-2025",
      utm_content: "ad-variant-a",
    },
    metadata: {
      landing_page: "/landing/google-ads",
      referrer: "https://www.google.com",
      browser: "Chrome",
      device: "Desktop",
      os: "Windows",
      timestamp: "2025-01-15T10:30:00Z",
    },
  },
  {
    id: "lead-002",
    firstName: "Marc",
    lastName: "Dubois",
    email: "marc.dubois@example.com",
    phone: "+41 78 987 65 43",
    category: "motoA",
    message: "Quand puis-je commencer la formation moto?",
    gdprConsent: true,
    status: "contacted",
    createdAt: "2025-01-14T14:20:00Z",
    updatedAt: "2025-01-14T15:45:00Z",
    assignedTo: "instructor-001",
    utm: {
      utm_source: "facebook",
      utm_medium: "social",
      utm_campaign: "moto-printemps",
    },
    metadata: {
      landing_page: "/landing/facebook",
      referrer: "https://www.facebook.com",
      browser: "Safari",
      device: "Mobile",
      os: "iOS",
      timestamp: "2025-01-14T14:20:00Z",
    },
  },
  {
    id: "lead-003",
    firstName: "Emma",
    lastName: "Schneider",
    email: "emma.schneider@example.com",
    phone: "+41 76 555 44 33",
    category: "carB",
    message: "Avez-vous des disponibilités en soirée?",
    gdprConsent: true,
    status: "qualified",
    createdAt: "2025-01-13T16:10:00Z",
    updatedAt: "2025-01-13T17:30:00Z",
    assignedTo: "instructor-002",
    utm: {
      utm_source: "referral",
      utm_medium: "referral",
      utm_campaign: "parrainage",
      utm_content: "PARRAIN20",
    },
    metadata: {
      landing_page: "/landing/referral",
      referrer: "https://friend-website.com",
      browser: "Firefox",
      device: "Desktop",
      os: "macOS",
      timestamp: "2025-01-13T16:10:00Z",
    },
  },
];

export const getCategoryLabel = (
  category: LeadCategory,
  locale: ContactPublicLocale
): string => {
  const t = contactPublicTranslations[locale];
  return t.categories[category];
};

export const getStatusColor = (status: LeadStatus): string => {
  switch (status) {
    case "new":
      return "bg-blue-500";
    case "contacted":
      return "bg-yellow-500";
    case "qualified":
      return "bg-purple-500";
    case "converted":
      return "bg-green-500";
    case "lost":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getSourceIcon = (source?: LeadSource): string => {
  switch (source) {
    case "google":
      return "🔍";
    case "facebook":
      return "📘";
    case "instagram":
      return "📷";
    case "tiktok":
      return "🎵";
    case "referral":
      return "👥";
    case "direct":
      return "🔗";
    case "organic":
      return "🌱";
    default:
      return "❓";
  }
};
