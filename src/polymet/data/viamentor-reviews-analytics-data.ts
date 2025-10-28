/**
 * VIAMENTOR - Reviews Analytics Data
 * Mock data et types pour analytics avis Google avec insights IA
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * KPIs dashboard avis
 */
export interface ReviewsKPIs {
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  nps: number;
  trends: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    nps: number;
  };
}

/**
 * Distribution notes
 */
export interface RatingDistribution {
  rating: 1 | 2 | 3 | 4 | 5;
  count: number;
  percentage: number;
}

/**
 * Tendance temporelle
 */
export interface TemporalTrend {
  month: string;
  averageRating: number;
  reviewsCount: number;
  positiveCount?: number;
  neutralCount?: number;
  negativeCount?: number;
  rating5Count?: number;
  rating4Count?: number;
  rating3Count?: number;
  rating2Count?: number;
  rating1Count?: number;
  verifiedCount?: number;
}

/**
 * Analyse sentiments
 */
export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
  wordCloud: WordCloudItem[];
}

/**
 * Item word cloud
 */
export interface WordCloudItem {
  text: string;
  value: number;
  sentiment: "positive" | "neutral" | "negative";
}

/**
 * Top reviewer
 */
export interface TopReviewer {
  rank: number;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  reviewsCount: number;
  averageRating: number;
  lastReviewDate: Date;
  badge?: "champion" | "elite" | "contributor";
}

/**
 * Insight IA
 */
export interface AIInsight {
  id: string;
  category: "strength" | "weakness" | "opportunity" | "threat";
  title: string;
  description: string;
  evidence: string[];
  priority: "high" | "medium" | "low";
  actionable: boolean;
}

/**
 * Période analytics
 */
export interface AnalyticsPeriod {
  start: Date;
  end: Date;
  label: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * KPIs mock
 */
export const mockReviewsKPIs: ReviewsKPIs = {
  averageRating: 4.8,
  totalReviews: 247,
  responseRate: 92.3,
  nps: 78,
  trends: {
    averageRating: 0.3,
    totalReviews: 12,
    responseRate: 5.1,
    nps: 8,
  },
};

/**
 * Distribution notes mock
 */
export const mockRatingDistribution: RatingDistribution[] = [
  { rating: 5, count: 189, percentage: 76.5 },
  { rating: 4, count: 42, percentage: 17.0 },
  { rating: 3, count: 10, percentage: 4.0 },
  { rating: 2, count: 4, percentage: 1.6 },
  { rating: 1, count: 2, percentage: 0.8 },
];

/**
 * Tendances temporelles mock
 */
export const mockTemporalTrends: TemporalTrend[] = [
  {
    month: "2023-02",
    averageRating: 4.3,
    reviewsCount: 15,
    positiveCount: 12,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 8,
    rating4Count: 4,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 13,
  },
  {
    month: "2023-03",
    averageRating: 4.4,
    reviewsCount: 18,
    positiveCount: 15,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 10,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 16,
  },
  {
    month: "2023-04",
    averageRating: 4.5,
    reviewsCount: 22,
    positiveCount: 19,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 14,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 20,
  },
  {
    month: "2023-05",
    averageRating: 4.6,
    reviewsCount: 19,
    positiveCount: 16,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 12,
    rating4Count: 4,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 17,
  },
  {
    month: "2023-06",
    averageRating: 4.5,
    reviewsCount: 21,
    positiveCount: 18,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 13,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 19,
  },
  {
    month: "2023-07",
    averageRating: 4.7,
    reviewsCount: 24,
    positiveCount: 21,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 16,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 22,
  },
  {
    month: "2023-08",
    averageRating: 4.6,
    reviewsCount: 20,
    positiveCount: 17,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 13,
    rating4Count: 4,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 18,
  },
  {
    month: "2023-09",
    averageRating: 4.7,
    reviewsCount: 23,
    positiveCount: 20,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 15,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 21,
  },
  {
    month: "2023-10",
    averageRating: 4.8,
    reviewsCount: 26,
    positiveCount: 23,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 18,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 24,
  },
  {
    month: "2023-11",
    averageRating: 4.8,
    reviewsCount: 25,
    positiveCount: 22,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 17,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 23,
  },
  {
    month: "2023-12",
    averageRating: 4.9,
    reviewsCount: 28,
    positiveCount: 25,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 20,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 26,
  },
  {
    month: "2024-01",
    averageRating: 4.8,
    reviewsCount: 26,
    positiveCount: 23,
    neutralCount: 2,
    negativeCount: 1,
    rating5Count: 18,
    rating4Count: 5,
    rating3Count: 2,
    rating2Count: 1,
    rating1Count: 0,
    verifiedCount: 24,
  },
];

/**
 * Analyse sentiments mock
 */
export const mockSentimentAnalysis: SentimentAnalysis = {
  positive: 85.4,
  neutral: 10.1,
  negative: 4.5,
  wordCloud: [
    { text: "excellent", value: 89, sentiment: "positive" },
    { text: "professionnel", value: 76, sentiment: "positive" },
    { text: "patient", value: 68, sentiment: "positive" },
    { text: "qualité", value: 62, sentiment: "positive" },
    { text: "recommande", value: 58, sentiment: "positive" },
    { text: "compétent", value: 54, sentiment: "positive" },
    { text: "réussi", value: 51, sentiment: "positive" },
    { text: "véhicules", value: 45, sentiment: "positive" },
    { text: "formation", value: 42, sentiment: "positive" },
    { text: "écoute", value: 38, sentiment: "positive" },
    { text: "attente", value: 24, sentiment: "negative" },
    { text: "délais", value: 18, sentiment: "negative" },
    { text: "prix", value: 15, sentiment: "neutral" },
    { text: "disponibilité", value: 12, sentiment: "negative" },
  ],
};

/**
 * Top reviewers mock
 */
export const mockTopReviewers: TopReviewer[] = [
  {
    rank: 1,
    studentId: "student-1",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    reviewsCount: 3,
    averageRating: 5.0,
    lastReviewDate: new Date("2024-01-18T15:30:00Z"),
    badge: "champion",
  },
  {
    rank: 2,
    studentId: "student-2",
    studentName: "Marc Dubois",
    studentAvatar: "https://github.com/kdrnp.png",
    reviewsCount: 2,
    averageRating: 5.0,
    lastReviewDate: new Date("2024-01-17T10:15:00Z"),
    badge: "elite",
  },
  {
    rank: 3,
    studentId: "student-3",
    studentName: "Laura Schneider",
    studentAvatar: "https://github.com/shoaibux1.png",
    reviewsCount: 2,
    averageRating: 4.5,
    lastReviewDate: new Date("2024-01-16T14:20:00Z"),
    badge: "elite",
  },
  {
    rank: 4,
    studentId: "student-4",
    studentName: "Thomas Müller",
    studentAvatar: "https://github.com/denizbuyuktas.png",
    reviewsCount: 1,
    averageRating: 5.0,
    lastReviewDate: new Date("2024-01-15T09:45:00Z"),
    badge: "contributor",
  },
  {
    rank: 5,
    studentId: "student-5",
    studentName: "Emma Rossi",
    studentAvatar: "https://github.com/polymet-ai.png",
    reviewsCount: 1,
    averageRating: 4.0,
    lastReviewDate: new Date("2024-01-14T11:20:00Z"),
    badge: "contributor",
  },
];

/**
 * Insights IA mock
 */
export const mockAIInsights: AIInsight[] = [
  {
    id: "insight-1",
    category: "strength",
    title: "Excellence pédagogique reconnue",
    description:
      "Les moniteurs sont systématiquement loués pour leur patience, professionnalisme et qualité d'enseignement. 89% des avis mentionnent explicitement la compétence des instructeurs.",
    evidence: [
      "89 mentions 'moniteurs patients'",
      "76 mentions 'professionnels'",
      "Note moyenne moniteurs: 4.9/5",
    ],

    priority: "high",
    actionable: false,
  },
  {
    id: "insight-2",
    category: "strength",
    title: "Flotte véhicules moderne appréciée",
    description:
      "Les élèves valorisent la qualité et la modernité des véhicules de formation. Point fort différenciant face à la concurrence.",
    evidence: [
      "45 mentions 'véhicules récents'",
      "Satisfaction équipement: 4.8/5",
      "Aucune plainte maintenance",
    ],

    priority: "medium",
    actionable: false,
  },
  {
    id: "insight-3",
    category: "weakness",
    title: "Délais réservation problématiques",
    description:
      "24 avis mentionnent des difficultés pour réserver des créneaux de leçons. Temps d'attente moyen perçu: 2-3 semaines. Impact négatif sur satisfaction globale.",
    evidence: [
      "24 mentions 'délais attente'",
      "18 mentions 'disponibilité limitée'",
      "Note moyenne planning: 3.2/5",
    ],

    priority: "high",
    actionable: true,
  },
  {
    id: "insight-4",
    category: "weakness",
    title: "Tarification perçue élevée",
    description:
      "15 avis évoquent des prix supérieurs à la concurrence. Bien que justifiés par la qualité, cela peut freiner certains prospects.",
    evidence: [
      "15 mentions 'prix élevés'",
      "Comparaison concurrence: +12% moyenne",
      "Taux conversion prospects: 68%",
    ],

    priority: "medium",
    actionable: true,
  },
  {
    id: "insight-5",
    category: "opportunity",
    title: "Demande forte cours intensifs",
    description:
      "12 élèves ont demandé des formules accélérées (permis en 1-2 mois). Opportunité de créer une offre premium 'Permis Express'.",
    evidence: [
      "12 demandes cours intensifs",
      "Willingness to pay: +25%",
      "Concurrence: 2/5 écoles proposent",
    ],

    priority: "high",
    actionable: true,
  },
  {
    id: "insight-6",
    category: "opportunity",
    title: "Potentiel cours théoriques en ligne",
    description:
      "8 élèves ont suggéré des cours théoriques en visio pour plus de flexibilité. Tendance post-COVID confirmée.",
    evidence: [
      "8 suggestions e-learning",
      "Marché Suisse: +34% demande 2023",
      "Coût implémentation: CHF 15'000",
    ],

    priority: "medium",
    actionable: true,
  },
  {
    id: "insight-7",
    category: "threat",
    title: "Concurrence agressive pricing",
    description:
      "Nouvelle auto-école low-cost ouverte à 500m avec tarifs -30%. Risque perte parts de marché segment price-sensitive.",
    evidence: [
      "Concurrent: Auto-École Express",
      "Leurs avis Google: 4.2/5 (45 avis)",
      "Nos prospects perdus: 8 ce mois",
    ],

    priority: "high",
    actionable: true,
  },
  {
    id: "insight-8",
    category: "threat",
    title: "Évolution réglementation 2024",
    description:
      "Nouvelles exigences OMCo pour moniteurs (formation continue 16h/an). Impact budget formation et disponibilité instructeurs.",
    evidence: [
      "Réglementation: OMCo Art. 32bis",
      "Coût formation: CHF 2'400/moniteur",
      "Jours indisponibilité: 2j/moniteur",
    ],

    priority: "medium",
    actionable: true,
  },
];

/**
 * Helper: Calculer NPS
 */
export function calculateNPS(ratings: number[]): number {
  const promoters = ratings.filter((r) => r >= 9).length;
  const detractors = ratings.filter((r) => r <= 6).length;
  return ((promoters - detractors) / ratings.length) * 100;
}

/**
 * Helper: Classifier sentiment
 */
export function classifySentiment(
  rating: number,
  text: string
): "positive" | "neutral" | "negative" {
  if (rating >= 4) return "positive";
  if (rating === 3) return "neutral";
  return "negative";
}

/**
 * Helper: Extraire mots-clés
 */
export function extractKeywords(text: string): string[] {
  // Mock: en production, utiliser NLP (Claude AI, spaCy, etc.)
  const stopWords = ["le", "la", "les", "un", "une", "des", "et", "ou"];
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.includes(word));
}
