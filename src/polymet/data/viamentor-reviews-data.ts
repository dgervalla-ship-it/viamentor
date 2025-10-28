/**
 * VIAMENTOR - Google Reviews Data
 * Mock data et types pour intégration avis Google Business
 */

import type { ReviewsLocale } from "@/polymet/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Configuration Google Business Profile
 */
export interface GoogleBusinessConfig {
  id: string;
  placeId: string;
  businessName: string;
  address: string;
  connected: boolean;
  connectedAt?: Date;
  accessToken?: string;
  refreshToken?: string;
  scopes: string[];
  stats: {
    totalReviews: number;
    averageRating: number;
    unrepliedCount: number;
  };
}

/**
 * Synchronisation automatique
 */
export interface SyncConfig {
  enabled: boolean;
  frequency: "realtime" | "hourly" | "4xday" | "daily";
  lastSync?: Date;
  nextSync?: Date;
  status: "idle" | "syncing" | "error";
  errorMessage?: string;
}

/**
 * Avis Google
 */
export interface GoogleReview {
  id: string;
  placeId: string;
  authorName: string;
  authorEmail?: string;
  authorPhoto?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  reviewDate: Date;
  replied: boolean;
  replyText?: string;
  replyDate?: Date;
  status: "new" | "replied" | "contested";
  studentId?: string;
  verifiedPurchase: boolean;
  helpful: number;
}

/**
 * Politique filtrage
 */
export interface FilteringPolicy {
  enabled: boolean;
  requirePayment: boolean;
  minimumAmount: number;
  gracePeriodDays: number;
}

/**
 * Widget configuration
 */
export interface WidgetConfig {
  theme: "light" | "dark";
  limit: 5 | 10 | 20;
  sort: "recent" | "rating" | "helpful";
  showRatings: boolean;
  showAuthors: boolean;
  showDates: boolean;
  showReplies: boolean;
  minimumRating: 0 | 4 | 5;
}

/**
 * Invitation automatique
 */
export interface AutoInvitationConfig {
  enabled: boolean;
  delay: "immediate" | "1day" | "3days" | "1week";
  conditions: {
    afterLessons?: number;
    afterPayment: boolean;
    afterExamSuccess: boolean;
    afterRatingAbove?: number;
  };
  emailTemplate: EmailTemplate;
  reminderEnabled: boolean;
  reminderDelayDays: number;
}

/**
 * Template email
 */
export interface EmailTemplate {
  subject: string;
  body: string;
  variables: string[];
  locale: "fr" | "de" | "it" | "en";
}

/**
 * Invitation envoyée
 */
export interface ReviewInvitation {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  sentAt: Date;
  clickedAt?: Date;
  reviewedAt?: Date;
  token: string;
  status: "sent" | "clicked" | "reviewed" | "expired";
}

/**
 * Analytics collection
 */
export interface CollectionAnalytics {
  period: {
    start: Date;
    end: Date;
  };
  stats: {
    invitationsSent: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  trend: TrendDataPoint[];
  topReviewers: TopReviewer[];
}

/**
 * Point de données tendance
 */
export interface TrendDataPoint {
  date: string;
  invitations: number;
  reviews: number;
}

/**
 * Top reviewer
 */
export interface TopReviewer {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  reviewsCount: number;
  averageRating: number;
  lastReviewDate: Date;
  badge?: "top_reviewer";
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Configuration Google Business mock
 */
export const mockGoogleBusinessConfig: GoogleBusinessConfig = {
  id: "gb-config-1",
  placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  businessName: "Auto-École Genève",
  address: "Rue du Rhône 123, 1204 Genève",
  connected: true,
  connectedAt: new Date("2024-01-15T10:00:00Z"),
  scopes: ["reviews.read", "reviews.reply"],
  stats: {
    totalReviews: 247,
    averageRating: 4.7,
    unrepliedCount: 8,
  },
};

/**
 * Configuration sync mock
 */
export const mockSyncConfig: SyncConfig = {
  enabled: true,
  frequency: "4xday",
  lastSync: new Date("2024-01-20T14:30:00Z"),
  nextSync: new Date("2024-01-20T20:30:00Z"),
  status: "idle",
};

/**
 * Politique filtrage mock
 */
export const mockFilteringPolicy: FilteringPolicy = {
  enabled: true,
  requirePayment: true,
  minimumAmount: 50,
  gracePeriodDays: 30,
};

/**
 * Configuration widget mock
 */
export const mockWidgetConfig: WidgetConfig = {
  theme: "light",
  limit: 10,
  sort: "recent",
  showRatings: true,
  showAuthors: true,
  showDates: true,
  showReplies: true,
  minimumRating: 4,
};

/**
 * Configuration invitations auto mock
 */
export const mockAutoInvitationConfig: AutoInvitationConfig = {
  enabled: true,
  delay: "3days",
  conditions: {
    afterLessons: 5,
    afterPayment: true,
    afterExamSuccess: false,
    afterRatingAbove: 4,
  },
  emailTemplate: {
    subject: "Partagez votre expérience avec {schoolName}",
    body: `Bonjour {studentName},

Merci de votre confiance! Votre avis aide les futurs élèves à choisir leur auto-école.

Cliquez pour partager votre expérience sur Google:
{linkReview}

Seulement 2 minutes!

Cordialement,
L'équipe {schoolName}`,
    variables: ["studentName", "schoolName", "linkReview"],
    locale: "fr",
  },
  reminderEnabled: true,
  reminderDelayDays: 7,
};

/**
 * Avis Google mock
 */
export const mockGoogleReviews: GoogleReview[] = [
  {
    id: "review-1",
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    authorName: "Sophie Martin",
    authorEmail: "sophie.martin@example.com",
    authorPhoto: "https://github.com/yahyabedirhan.png",
    rating: 5,
    text: "Excellente auto-école! Moniteurs patients et professionnels. J'ai réussi mon permis du premier coup grâce à leur formation de qualité.",
    reviewDate: new Date("2024-01-18T15:30:00Z"),
    replied: true,
    replyText:
      "Merci Sophie pour votre confiance! Félicitations pour votre réussite 🎉",
    replyDate: new Date("2024-01-18T16:00:00Z"),
    status: "replied",
    studentId: "student-1",
    verifiedPurchase: true,
    helpful: 12,
  },
  {
    id: "review-2",
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    authorName: "Marc Dubois",
    authorPhoto: "https://github.com/kdrnp.png",
    rating: 5,
    text: "Formation théorique et pratique au top. Les véhicules sont récents et bien entretenus. Je recommande vivement!",
    reviewDate: new Date("2024-01-17T10:15:00Z"),
    replied: true,
    replyText: "Merci Marc! Ravis que notre formation vous ait plu 😊",
    replyDate: new Date("2024-01-17T11:00:00Z"),
    status: "replied",
    studentId: "student-2",
    verifiedPurchase: true,
    helpful: 8,
  },
  {
    id: "review-3",
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    authorName: "Laura Schneider",
    authorPhoto: "https://github.com/shoaibux1.png",
    rating: 4,
    text: "Bonne auto-école, moniteurs compétents. Seul bémol: délais d'attente parfois longs pour réserver les leçons.",
    reviewDate: new Date("2024-01-16T14:20:00Z"),
    replied: false,
    status: "new",
    studentId: "student-3",
    verifiedPurchase: true,
    helpful: 5,
  },
  {
    id: "review-4",
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    authorName: "Thomas Müller",
    rating: 5,
    text: "Permis obtenu en 3 mois! Équipe professionnelle et à l'écoute. Merci pour tout!",
    reviewDate: new Date("2024-01-15T09:45:00Z"),
    replied: false,
    status: "new",
    verifiedPurchase: false,
    helpful: 3,
  },
];

/**
 * Invitations mock
 */
export const mockReviewInvitations: ReviewInvitation[] = [
  {
    id: "inv-1",
    studentId: "student-1",
    studentName: "Sophie Martin",
    studentEmail: "sophie.martin@example.com",
    sentAt: new Date("2024-01-15T10:00:00Z"),
    clickedAt: new Date("2024-01-15T14:30:00Z"),
    reviewedAt: new Date("2024-01-18T15:30:00Z"),
    token: "tok_abc123",
    status: "reviewed",
  },
  {
    id: "inv-2",
    studentId: "student-2",
    studentName: "Marc Dubois",
    studentEmail: "marc.dubois@example.com",
    sentAt: new Date("2024-01-14T11:00:00Z"),
    clickedAt: new Date("2024-01-14T15:00:00Z"),
    reviewedAt: new Date("2024-01-17T10:15:00Z"),
    token: "tok_def456",
    status: "reviewed",
  },
  {
    id: "inv-3",
    studentId: "student-4",
    studentName: "Emma Rossi",
    studentEmail: "emma.rossi@example.com",
    sentAt: new Date("2024-01-19T09:00:00Z"),
    clickedAt: new Date("2024-01-19T12:00:00Z"),
    token: "tok_ghi789",
    status: "clicked",
  },
];

/**
 * Analytics collection mock
 */
export const mockCollectionAnalytics: CollectionAnalytics = {
  period: {
    start: new Date("2023-10-20T00:00:00Z"),
    end: new Date("2024-01-20T23:59:59Z"),
  },
  stats: {
    invitationsSent: 156,
    openRate: 68.5,
    clickRate: 45.2,
    conversionRate: 32.7,
  },
  trend: [
    { date: "2023-11", invitations: 42, reviews: 12 },
    { date: "2023-12", invitations: 38, reviews: 15 },
    { date: "2024-01", invitations: 51, reviews: 18 },
  ],

  topReviewers: [
    {
      studentId: "student-1",
      studentName: "Sophie Martin",
      studentAvatar: "https://github.com/yahyabedirhan.png",
      reviewsCount: 3,
      averageRating: 5,
      lastReviewDate: new Date("2024-01-18T15:30:00Z"),
      badge: "top_reviewer",
    },
    {
      studentId: "student-2",
      studentName: "Marc Dubois",
      studentAvatar: "https://github.com/kdrnp.png",
      reviewsCount: 2,
      averageRating: 4.5,
      lastReviewDate: new Date("2024-01-17T10:15:00Z"),
    },
  ],
};

/**
 * Helper: Générer code widget
 */
export function generateWidgetCode(
  placeId: string,
  config: WidgetConfig
): string {
  return `<script src="https://viamentor.ch/widgets/reviews.js"
  data-place-id="${placeId}"
  data-theme="${config.theme}"
  data-limit="${config.limit}"
  data-sort="${config.sort}"
  data-min-rating="${config.minimumRating}"
></script>`;
}

/**
 * Helper: Vérifier éligibilité avis
 */
export function checkReviewEligibility(studentId: string): {
  eligible: boolean;
  reason?: string;
} {
  // Mock: vérifier paiements
  const hasPayments = true; // Query DB in real app

  if (!hasPayments) {
    return {
      eligible: false,
      reason: "no_payment",
    };
  }

  return { eligible: true };
}

/**
 * Helper: Calculer taux conversion
 */
export function calculateConversionRate(
  invitations: ReviewInvitation[]
): number {
  const reviewed = invitations.filter(
    (inv) => inv.status === "reviewed"
  ).length;
  return invitations.length > 0 ? (reviewed / invitations.length) * 100 : 0;
}
