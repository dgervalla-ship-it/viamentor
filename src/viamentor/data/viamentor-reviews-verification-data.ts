/**
 * VIAMENTOR - Reviews Verification Data
 * Mock data et types pour vérification authenticité avis Google
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Statut vérification avis
 */
export type ReviewVerificationStatus =
  | "verified"
  | "unverified"
  | "contested"
  | "fraudulent"
  | "pending";

/**
 * Avis avec vérification
 */
export interface VerifiedReview {
  id: string;
  authorName: string;
  authorEmail?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  reviewDate: Date;
  status: ReviewVerificationStatus;
  studentId?: string;
  studentName?: string;
  matchConfidence?: number;
  verifiedPurchase: boolean;
  totalPaid: number;
  lastPaymentDate?: Date;
  fraudScore: number;
  fraudReasons: string[];
  contestedAt?: Date;
  contestReason?: string;
  contestStatus?: "pending" | "accepted" | "rejected" | "partial";
}

/**
 * Candidat matching
 */
export interface MatchCandidate {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  lastLessonDate?: Date;
  similarity: number;
  matchType: "exact_email" | "fuzzy_name" | "phone";
}

/**
 * Résultat matching
 */
export interface MatchingResult {
  reviewId: string;
  candidates: MatchCandidate[];
  autoMatched: boolean;
  selectedStudentId?: string;
  matchedAt?: Date;
  matchedBy?: string;
}

/**
 * Validation paiement
 */
export interface PaymentValidation {
  studentId: string;
  totalPaid: number;
  paymentsCount: number;
  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
  verifiedPurchase: boolean;
}

/**
 * Facteur fraude
 */
export interface FraudFactor {
  type:
    | "multiple_ip"
    | "similar_wording"
    | "fake_name"
    | "extreme_rating"
    | "suspicious_timing"
    | "new_account"
    | "review_velocity";
  severity: "low" | "medium" | "high";
  description: string;
  weight: number;
}

/**
 * Analyse fraude
 */
export interface FraudAnalysis {
  reviewId: string;
  score: number;
  factors: FraudFactor[];
  recommendation: "approve" | "investigate" | "flag";
  detectedAt: Date;
}

/**
 * Raison contestation
 */
export type ContestReason =
  | "fake_competitor"
  | "spam_bot"
  | "inappropriate"
  | "not_customer"
  | "defamation"
  | "violation_terms";

/**
 * Contestation avis
 */
export interface ReviewContest {
  id: string;
  reviewId: string;
  reason: ContestReason;
  evidence: ContestEvidence[];
  explanation: string;
  submittedAt: Date;
  submittedBy: string;
  status: "pending" | "accepted" | "rejected" | "partial";
  googleResponse?: string;
  resolvedAt?: Date;
}

/**
 * Preuve contestation
 */
export interface ContestEvidence {
  id: string;
  type: "document" | "screenshot" | "email" | "log" | "other";
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

/**
 * Stats vérification
 */
export interface VerificationStats {
  total: number;
  verified: number;
  unverified: number;
  contested: number;
  fraudulent: number;
  verifiedPercentage: number;
}

/**
 * Entrée audit log
 */
export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action:
    | "received"
    | "matched"
    | "verified"
    | "responded"
    | "flagged"
    | "contested"
    | "resolved";
  reviewId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  details: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Avis vérifiés mock
 */
export const mockVerifiedReviews: VerifiedReview[] = [
  {
    id: "review-1",
    authorName: "Sophie Martin",
    authorEmail: "sophie.martin@example.com",
    rating: 5,
    text: "Excellente auto-école! Moniteurs patients et professionnels.",
    reviewDate: new Date("2024-01-18T15:30:00Z"),
    status: "verified",
    studentId: "student-1",
    studentName: "Sophie Martin",
    matchConfidence: 100,
    verifiedPurchase: true,
    totalPaid: 2450,
    lastPaymentDate: new Date("2024-01-15T10:00:00Z"),
    fraudScore: 5,
    fraudReasons: [],
  },
  {
    id: "review-2",
    authorName: "Marc Dubois",
    rating: 5,
    text: "Formation théorique et pratique au top.",
    reviewDate: new Date("2024-01-17T10:15:00Z"),
    status: "verified",
    studentId: "student-2",
    studentName: "Marc Dubois",
    matchConfidence: 95,
    verifiedPurchase: true,
    totalPaid: 1890,
    lastPaymentDate: new Date("2024-01-10T14:30:00Z"),
    fraudScore: 8,
    fraudReasons: [],
  },
  {
    id: "review-3",
    authorName: "John Doe",
    rating: 1,
    text: "Terrible service, incompetent instructors, waste of money.",
    reviewDate: new Date("2024-01-19T03:15:00Z"),
    status: "fraudulent",
    matchConfidence: 0,
    verifiedPurchase: false,
    totalPaid: 0,
    fraudScore: 92,
    fraudReasons: [
      "fake_name",
      "extreme_rating",
      "suspicious_timing",
      "no_payment",
    ],

    contestedAt: new Date("2024-01-19T09:00:00Z"),
    contestReason: "fake_competitor",
    contestStatus: "pending",
  },
  {
    id: "review-4",
    authorName: "Laura Schneider",
    rating: 4,
    text: "Bonne auto-école, moniteurs compétents.",
    reviewDate: new Date("2024-01-16T14:20:00Z"),
    status: "verified",
    studentId: "student-3",
    studentName: "Laura Schneider",
    matchConfidence: 100,
    verifiedPurchase: true,
    totalPaid: 3200,
    lastPaymentDate: new Date("2024-01-12T16:00:00Z"),
    fraudScore: 12,
    fraudReasons: [],
  },
  {
    id: "review-5",
    authorName: "Thomas Müller",
    rating: 5,
    text: "Permis obtenu en 3 mois! Équipe professionnelle.",
    reviewDate: new Date("2024-01-15T09:45:00Z"),
    status: "unverified",
    matchConfidence: 0,
    verifiedPurchase: false,
    totalPaid: 0,
    fraudScore: 45,
    fraudReasons: ["no_payment", "no_match"],
  },
];

/**
 * Candidats matching mock
 */
export const mockMatchCandidates: MatchCandidate[] = [
  {
    studentId: "student-5",
    fullName: "Thomas Müller",
    email: "thomas.mueller@example.com",
    phone: "+41 79 123 45 67",
    avatar: "https://github.com/denizbuyuktas.png",
    lastLessonDate: new Date("2024-01-10T14:00:00Z"),
    similarity: 88,
    matchType: "fuzzy_name",
  },
  {
    studentId: "student-6",
    fullName: "Thomas M. Müller",
    email: "t.muller@example.com",
    phone: "+41 78 987 65 43",
    avatar: "https://github.com/kdrnp.png",
    lastLessonDate: new Date("2023-12-20T10:00:00Z"),
    similarity: 82,
    matchType: "fuzzy_name",
  },
];

/**
 * Analyses fraude mock
 */
export const mockFraudAnalyses: FraudAnalysis[] = [
  {
    reviewId: "review-3",
    score: 92,
    factors: [
      {
        type: "fake_name",
        severity: "high",
        description: "Nom générique 'John Doe' suspect",
        weight: 25,
      },
      {
        type: "extreme_rating",
        severity: "high",
        description: "Note 1/5 sans nuance",
        weight: 20,
      },
      {
        type: "suspicious_timing",
        severity: "medium",
        description: "Publié à 3h15 du matin",
        weight: 15,
      },
      {
        type: "multiple_ip",
        severity: "high",
        description: "Même IP que 3 autres avis négatifs",
        weight: 32,
      },
    ],

    recommendation: "flag",
    detectedAt: new Date("2024-01-19T03:20:00Z"),
  },
  {
    reviewId: "review-5",
    score: 45,
    factors: [
      {
        type: "new_account",
        severity: "medium",
        description: "Compte Google créé il y a 2 jours",
        weight: 25,
      },
      {
        type: "extreme_rating",
        severity: "low",
        description: "Note 5/5 très positive",
        weight: 10,
      },
    ],

    recommendation: "investigate",
    detectedAt: new Date("2024-01-15T10:00:00Z"),
  },
];

/**
 * Contestations mock
 */
export const mockReviewContests: ReviewContest[] = [
  {
    id: "contest-1",
    reviewId: "review-3",
    reason: "fake_competitor",
    evidence: [
      {
        id: "ev-1",
        type: "screenshot",
        fileName: "same-ip-reviews.png",
        fileUrl: "/uploads/evidence/same-ip-reviews.png",
        uploadedAt: new Date("2024-01-19T09:05:00Z"),
      },
      {
        id: "ev-2",
        type: "log",
        fileName: "analytics-log.csv",
        fileUrl: "/uploads/evidence/analytics-log.csv",
        uploadedAt: new Date("2024-01-19T09:10:00Z"),
      },
    ],

    explanation:
      "Cet avis provient d'une adresse IP identique à 3 autres avis négatifs publiés la même nuit. Le nom 'John Doe' est générique et aucun paiement n'est associé. Nous soupçonnons une attaque coordonnée d'un concurrent.",
    submittedAt: new Date("2024-01-19T09:15:00Z"),
    submittedBy: "admin-1",
    status: "pending",
  },
];

/**
 * Stats vérification mock
 */
export const mockVerificationStats: VerificationStats = {
  total: 247,
  verified: 198,
  unverified: 32,
  contested: 8,
  fraudulent: 9,
  verifiedPercentage: 80.2,
};

/**
 * Audit log mock
 */
export const mockAuditLog: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: new Date("2024-01-19T09:15:00Z"),
    action: "contested",
    reviewId: "review-3",
    userId: "admin-1",
    userName: "Jean Dupont",
    userAvatar: "https://github.com/yusufhilmi.png",
    details: "Contestation soumise à Google pour faux avis concurrent",
    before: { status: "fraudulent" },
    after: { status: "contested", contestStatus: "pending" },
  },
  {
    id: "log-2",
    timestamp: new Date("2024-01-19T03:20:00Z"),
    action: "flagged",
    reviewId: "review-3",
    userId: "system",
    userName: "Système ML",
    details: "Avis marqué frauduleux (score: 92/100)",
    before: { status: "pending" },
    after: { status: "fraudulent", fraudScore: 92 },
  },
  {
    id: "log-3",
    timestamp: new Date("2024-01-18T15:35:00Z"),
    action: "verified",
    reviewId: "review-1",
    userId: "system",
    userName: "Système Auto",
    details: "Élève identifié et paiement vérifié (2450 CHF)",
    before: { status: "pending" },
    after: { status: "verified", studentId: "student-1" },
  },
  {
    id: "log-4",
    timestamp: new Date("2024-01-18T16:00:00Z"),
    action: "responded",
    reviewId: "review-1",
    userId: "admin-1",
    userName: "Jean Dupont",
    userAvatar: "https://github.com/yusufhilmi.png",
    details: "Réponse publiée sur Google",
    before: { replied: false },
    after: { replied: true },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculer score fraude
 */
export function calculateFraudScore(factors: FraudFactor[]): number {
  return Math.min(
    100,
    factors.reduce((sum, factor) => sum + factor.weight, 0)
  );
}

/**
 * Normaliser nom pour matching
 */
export function normalizeNameForMatching(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

/**
 * Calculer similarité Levenshtein
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculer pourcentage similarité
 */
export function calculateSimilarityPercentage(a: string, b: string): number {
  const distance = calculateLevenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 100 : ((maxLength - distance) / maxLength) * 100;
}
