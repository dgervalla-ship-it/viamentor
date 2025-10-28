/**
 * VIAMENTOR - AI Responses Data
 * Mock data et types TypeScript pour système réponses IA avis
 */

import type { AIResponsesLocale } from "@/viamentor/data/viamentor-ai-responses-i18n";

// ============================================================================
// TYPES
// ============================================================================

export interface SchoolAIConfig {
  id: string;
  schoolValues: string;
  desiredTone: string;
  keywordsToInclude: string[];
  phrasesToAvoid: string[];
  primaryLanguage: "fr" | "de" | "it" | "en";
  useClaudeAI: boolean;
  apiKeyConfigured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  trigger: TemplateTrigger;
  baseTemplate: string;
  targetLength: "short" | "medium" | "long";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
}

export interface TemplateTrigger {
  ratingRange: {
    min: number;
    max: number;
  };
  keywords?: string[];
  sentiment?: "positive" | "neutral" | "negative";
}

export interface AIAutomationConfig {
  autoResponsePositive: boolean;
  draftsForNegative: boolean;
  responseDelay: "immediate" | "1hour" | "4hours" | "24hours";
}

export interface ReviewAnalysis {
  reviewId: string;
  sentiment: "positive" | "neutral" | "negative";
  rating: number;
  keyPoints: string[];
  extractedEntities: {
    instructor?: string;
    price?: boolean;
    quality?: boolean;
    infrastructure?: boolean;
    results?: boolean;
  };
  confidenceScore: number;
}

export interface AIGeneratedResponse {
  id: string;
  reviewId: string;
  originalReview: {
    author: string;
    rating: number;
    text: string;
    date: Date;
  };
  generatedText: string;
  templateUsed: string;
  qualityScore: number;
  sentiment: "positive" | "neutral" | "negative";
  status: "published" | "pending_review" | "rejected" | "draft";
  createdAt: Date;
  publishedAt?: Date;
  moderatedBy?: string;
  moderationNotes?: string;
  versions: ResponseVersion[];
}

export interface ResponseVersion {
  id: string;
  text: string;
  qualityScore: number;
  createdAt: Date;
  isSelected: boolean;
}

export interface ModerationAction {
  id: string;
  responseId: string;
  action: "approve" | "edit" | "regenerate" | "reject" | "manual";
  performedBy: string;
  performedAt: Date;
  notes?: string;
  originalText?: string;
  finalText?: string;
}

export interface AILearningData {
  id: string;
  originalAIResponse: string;
  humanFinalResponse: string;
  correctionDate: Date;
  correctedBy: string;
  improvementNotes: string;
  patternIdentified?: string;
}

export interface AIMetrics {
  totalResponsesGenerated: number;
  autoPublishedCount: number;
  humanModeratedCount: number;
  averageQualityScore: number;
  responseTimeAverage: string;
  learningDataPoints: number;
  lastModelUpdate?: Date;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockSchoolAIConfig: SchoolAIConfig = {
  id: "school-ai-config-1",
  schoolValues:
    "Professionnalisme, Bienveillance, Excellence pédagogique, Sécurité priorité",
  desiredTone: "Chaleureux mais professionnel, Empathique, Reconnaissant",
  keywordsToInclude: ["sécurité", "qualité", "merci", "équipe", "formation"],
  phrasesToAvoid: ["Malheureusement", "Désolé problème", "Excuses"],
  primaryLanguage: "fr",
  useClaudeAI: true,
  apiKeyConfigured: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-03-10"),
};

export const mockResponseTemplates: ResponseTemplate[] = [
  {
    id: "template-5stars",
    name: "Avis 5 étoiles - Remerciement",
    trigger: {
      ratingRange: { min: 5, max: 5 },
      sentiment: "positive",
    },
    baseTemplate:
      "Merci {studentName} pour votre confiance ! 🌟 Nous sommes ravis que votre expérience avec {schoolName} ait été excellente. Votre réussite est notre plus belle récompense. Toute l'équipe vous souhaite une excellente route !",
    targetLength: "medium",
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-05"),
    usageCount: 47,
  },
  {
    id: "template-4stars",
    name: "Avis 4 étoiles - Reconnaissance",
    trigger: {
      ratingRange: { min: 4, max: 4 },
      sentiment: "positive",
    },
    baseTemplate:
      "Merci {studentName} pour votre avis ! Nous sommes heureux que votre formation chez {schoolName} se soit bien déroulée. Vos retours nous aident à nous améliorer continuellement. Bonne route et merci de votre confiance !",
    targetLength: "medium",
    isActive: true,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-02-28"),
    usageCount: 32,
  },
  {
    id: "template-negative",
    name: "Avis négatif - Empathie",
    trigger: {
      ratingRange: { min: 1, max: 3 },
      sentiment: "negative",
    },
    baseTemplate:
      "Merci {studentName} pour votre retour. Nous prenons vos remarques très au sérieux et souhaitons comprendre comment nous pouvons améliorer votre expérience. Notre équipe vous contactera prochainement pour échanger et trouver des solutions. Votre satisfaction est notre priorité.",
    targetLength: "long",
    isActive: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-03-01"),
    usageCount: 8,
  },
  {
    id: "template-instructor-praise",
    name: "Éloge moniteur spécifique",
    trigger: {
      ratingRange: { min: 4, max: 5 },
      keywords: ["excellent moniteur", "super moniteur", "moniteur patient"],
    },
    baseTemplate:
      "Merci {studentName} ! Nous sommes fiers de {specificPoint} et transmettrons vos compliments à notre équipe. C'est grâce à des retours comme le vôtre que nous continuons à offrir une formation de qualité chez {schoolName}.",
    targetLength: "medium",
    isActive: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-08"),
    usageCount: 23,
  },
];

export const mockAIAutomationConfig: AIAutomationConfig = {
  autoResponsePositive: true,
  draftsForNegative: true,
  responseDelay: "4hours",
};

export const mockPendingResponses: AIGeneratedResponse[] = [
  {
    id: "response-1",
    reviewId: "review-123",
    originalReview: {
      author: "Marie Dubois",
      rating: 2,
      text: "Formation correcte mais prix vraiment élevé pour ce qui est proposé. Moniteur sympa mais manque d'organisation dans les cours.",
      date: new Date("2024-03-15"),
    },
    generatedText:
      "Merci Marie pour votre retour constructif. Nous prenons note de vos remarques concernant nos tarifs et l'organisation. Notre équipe pédagogique vous contactera pour échanger sur votre expérience et voir comment nous pouvons mieux répondre à vos attentes. Votre satisfaction est importante pour nous.",
    templateUsed: "template-negative",
    qualityScore: 85,
    sentiment: "negative",
    status: "pending_review",
    createdAt: new Date("2024-03-15T14:30:00"),
    versions: [
      {
        id: "v1",
        text: "Merci Marie pour votre retour constructif. Nous prenons note de vos remarques concernant nos tarifs et l'organisation. Notre équipe pédagogique vous contactera pour échanger sur votre expérience et voir comment nous pouvons mieux répondre à vos attentes. Votre satisfaction est importante pour nous.",
        qualityScore: 85,
        createdAt: new Date("2024-03-15T14:30:00"),
        isSelected: true,
      },
    ],
  },
  {
    id: "response-2",
    reviewId: "review-124",
    originalReview: {
      author: "Thomas Martin",
      rating: 1,
      text: "Très déçu de cette auto-école. Rendez-vous annulés à la dernière minute, moniteur pas professionnel. Je ne recommande pas du tout.",
      date: new Date("2024-03-16"),
    },
    generatedText:
      "Bonjour Thomas, nous sommes sincèrement désolés de votre expérience décevante. Ces problèmes ne reflètent pas nos standards habituels. Notre directeur souhaite vous rencontrer personnellement pour comprendre ce qui s'est passé et trouver une solution appropriée. Pouvez-vous nous contacter au 021 XXX XX XX ? Nous tenons à rectifier cette situation.",
    templateUsed: "template-negative",
    qualityScore: 78,
    sentiment: "negative",
    status: "pending_review",
    createdAt: new Date("2024-03-16T09:15:00"),
    versions: [
      {
        id: "v1",
        text: "Bonjour Thomas, nous sommes sincèrement désolés de votre expérience décevante. Ces problèmes ne reflètent pas nos standards habituels. Notre directeur souhaite vous rencontrer personnellement pour comprendre ce qui s'est passé et trouver une solution appropriée. Pouvez-vous nous contacter au 021 XXX XX XX ? Nous tenons à rectifier cette situation.",
        qualityScore: 78,
        createdAt: new Date("2024-03-16T09:15:00"),
        isSelected: true,
      },
    ],
  },
];

export const mockPublishedResponses: AIGeneratedResponse[] = [
  {
    id: "response-3",
    reviewId: "review-125",
    originalReview: {
      author: "Sophie Martin",
      rating: 5,
      text: "Excellente auto-école! Moniteurs patients et professionnels.",
      date: new Date("2024-03-14"),
    },
    generatedText:
      "Merci Sophie pour votre confiance ! 🌟 Nous sommes ravis que votre expérience avec notre équipe ait été excellente. Votre réussite est notre plus belle récompense. Toute l'équipe vous souhaite une excellente route !",
    templateUsed: "template-5stars",
    qualityScore: 92,
    sentiment: "positive",
    status: "published",
    createdAt: new Date("2024-03-14T16:20:00"),
    publishedAt: new Date("2024-03-14T20:20:00"),
    versions: [
      {
        id: "v1",
        text: "Merci Sophie pour votre confiance ! 🌟 Nous sommes ravis que votre expérience avec notre équipe ait été excellente. Votre réussite est notre plus belle récompense. Toute l'équipe vous souhaite une excellente route !",
        qualityScore: 92,
        createdAt: new Date("2024-03-14T16:20:00"),
        isSelected: true,
      },
    ],
  },
];

export const mockLearningData: AILearningData[] = [
  {
    id: "learning-1",
    originalAIResponse:
      "Merci pour votre avis positif ! Nous sommes contents que tout se soit bien passé.",
    humanFinalResponse:
      "Merci Sophie pour votre confiance ! 🌟 Nous sommes ravis que votre expérience avec notre équipe ait été excellente. Votre réussite est notre plus belle récompense. Toute l'équipe vous souhaite une excellente route !",
    correctionDate: new Date("2024-03-10"),
    correctedBy: "admin@viamentor.ch",
    improvementNotes:
      "Réponse trop générique, manque de personnalisation et d'émotion",
    patternIdentified:
      "Ajouter plus d'émotion et de personnalisation pour les avis 5 étoiles",
  },
  {
    id: "learning-2",
    originalAIResponse:
      "Nous sommes désolés de votre mauvaise expérience. Nous allons faire mieux.",
    humanFinalResponse:
      "Bonjour Thomas, nous prenons vos remarques très au sérieux. Notre directeur souhaite vous rencontrer pour comprendre ce qui s'est passé et trouver une solution. Pouvez-vous nous contacter ? Votre satisfaction est notre priorité.",
    correctionDate: new Date("2024-03-08"),
    correctedBy: "admin@viamentor.ch",
    improvementNotes:
      "Éviter les excuses directes, proposer des actions concrètes",
    patternIdentified:
      "Pour les avis négatifs, proposer des solutions concrètes plutôt que des excuses",
  },
];

export const mockAIMetrics: AIMetrics = {
  totalResponsesGenerated: 127,
  autoPublishedCount: 89,
  humanModeratedCount: 38,
  averageQualityScore: 87.3,
  responseTimeAverage: "3.2 heures",
  learningDataPoints: 15,
  lastModelUpdate: new Date("2024-03-01"),
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTemplatesByTrigger = (
  rating: number,
  keywords: string[] = [],
  sentiment: "positive" | "neutral" | "negative"
): ResponseTemplate[] => {
  return mockResponseTemplates.filter((template) => {
    const ratingMatch =
      rating >= template.trigger.ratingRange.min &&
      rating <= template.trigger.ratingRange.max;

    const keywordMatch =
      !template.trigger.keywords ||
      template.trigger.keywords.some((keyword) =>
        keywords.some((k) => k.toLowerCase().includes(keyword.toLowerCase()))
      );

    const sentimentMatch =
      !template.trigger.sentiment || template.trigger.sentiment === sentiment;

    return ratingMatch && keywordMatch && sentimentMatch && template.isActive;
  });
};

export const analyzeReviewSentiment = (
  rating: number,
  text: string
): ReviewAnalysis => {
  // Simulation d'analyse de sentiment
  let sentiment: "positive" | "neutral" | "negative" = "neutral";

  if (rating >= 4) sentiment = "positive";
  else if (rating <= 2) sentiment = "negative";

  // Extraction de mots-clés simples
  const keyPoints: string[] = [];
  const lowerText = text.toLowerCase();

  if (lowerText.includes("moniteur") || lowerText.includes("instructeur")) {
    keyPoints.push("Moniteur mentionné");
  }
  if (
    lowerText.includes("prix") ||
    lowerText.includes("cher") ||
    lowerText.includes("coût")
  ) {
    keyPoints.push("Prix évoqué");
  }
  if (lowerText.includes("qualité") || lowerText.includes("professionnel")) {
    keyPoints.push("Qualité mentionnée");
  }

  return {
    reviewId: `review-${Date.now()}`,
    sentiment,
    rating,
    keyPoints,
    extractedEntities: {
      instructor: lowerText.includes("moniteur"),
      price: lowerText.includes("prix"),
      quality: lowerText.includes("qualité"),
    },
    confidenceScore: Math.random() * 20 + 80, // 80-100%
  };
};

export const generateAIResponse = async (
  review: { rating: number; text: string; author: string },
  config: SchoolAIConfig,
  template: ResponseTemplate
): Promise<string> => {
  // Simulation de génération IA
  const variables = {
    studentName: review.author.split(" ")[0],
    schoolName: "Viamentor",
    rating: review.rating,
    reviewText: review.text,
    specificPoint: "votre retour positif",
  };

  let response = template.baseTemplate;

  // Remplacement des variables
  Object.entries(variables).forEach(([key, value]) => {
    response = response.replace(new RegExp(`{${key}}`, "g"), String(value));
  });

  return response;
};
