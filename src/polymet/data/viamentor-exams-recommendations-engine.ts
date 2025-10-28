/**
 * VIAMENTOR - Exams Recommendations Engine
 * Service génération recommandations intelligentes
 */

import type {
  CategorySuccessRate,
  FailureAnalysis,
  InstructorExamPerformance,
  Recommendation,
} from "@/polymet/data/viamentor-exams-analytics-data";

// ============================================================================
// RECOMMENDATION ENGINE
// ============================================================================

export class ExamsRecommendationsEngine {
  /**
   * Génère recommandations basées sur les données d'examens
   */
  static generateRecommendations(data: {
    categoryRates: CategorySuccessRate[];
    failureReasons: FailureAnalysis[];
    instructorPerformance: InstructorExamPerformance[];
    globalSuccessRate: number;
    targetSuccessRate?: number;
  }): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Analyse taux réussite par catégorie
    recommendations.push(...this.analyzeCategoryRates(data.categoryRates));

    // Analyse motifs échecs
    recommendations.push(...this.analyzeFailureReasons(data.failureReasons));

    // Analyse performance moniteurs
    recommendations.push(
      ...this.analyzeInstructorPerformance(data.instructorPerformance)
    );

    // Analyse objectifs globaux
    if (data.targetSuccessRate) {
      recommendations.push(
        ...this.analyzeGlobalTargets(
          data.globalSuccessRate,
          data.targetSuccessRate
        )
      );
    }

    // Trier par priorité
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Analyse taux réussite par catégorie
   */
  private static analyzeCategoryRates(
    categoryRates: CategorySuccessRate[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const TARGET_RATE = 80;

    categoryRates.forEach((cat) => {
      // Théorique faible
      if (cat.theoryExams.rate < TARGET_RATE) {
        recommendations.push({
          id: `theory-${cat.category}`,
          title: `Améliorer taux théorique catégorie ${cat.category}`,
          description: `Le taux de réussite théorique (${cat.theoryExams.rate.toFixed(1)}%) est inférieur à l'objectif de ${TARGET_RATE}%`,
          priority: cat.theoryExams.rate < 70 ? "high" : "medium",
          impact: `+${(TARGET_RATE - cat.theoryExams.rate).toFixed(1)}% de réussite potentielle`,
          actions: [
            "Renforcer cours théoriques avec supports visuels",
            "Organiser sessions révision avant examens",
            "Utiliser tests blancs pour identifier lacunes",
          ],
        });
      }

      // Pratique faible
      if (cat.practicalExams.rate < TARGET_RATE) {
        recommendations.push({
          id: `practical-${cat.category}`,
          title: `Augmenter leçons pratiques catégorie ${cat.category}`,
          description: `Le taux de réussite pratique (${cat.practicalExams.rate.toFixed(1)}%) nécessite plus de préparation`,
          priority: cat.practicalExams.rate < 65 ? "high" : "medium",
          impact: `Réduction échecs de ${(100 - cat.practicalExams.rate).toFixed(0)}% à ${100 - TARGET_RATE}%`,
          actions: [
            `Recommander ${Math.ceil(cat.averageLessons * 1.2)} leçons minimum (actuellement ${cat.averageLessons.toFixed(1)})`,
            "Cibler manœuvres complexes en fin de formation",
            "Simuler conditions examen réel",
          ],
        });
      }
    });

    return recommendations;
  }

  /**
   * Analyse motifs échecs
   */
  private static analyzeFailureReasons(
    failureReasons: FailureAnalysis[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Top 3 motifs
    const topReasons = failureReasons.slice(0, 3);

    topReasons.forEach((reason) => {
      if (reason.percentage > 20) {
        const reasonLabels: Record<string, string> = {
          maneuvers: "manœuvres",
          priorities: "priorités",
          parking: "stationnement",
          stress: "gestion du stress",
          speed: "contrôle de la vitesse",
          observation: "observation",
        };

        recommendations.push({
          id: `failure-${reason.reason}`,
          title: `Former moniteurs sur ${reasonLabels[reason.reason]}`,
          description: `${reason.percentage.toFixed(1)}% des échecs sont dus aux ${reasonLabels[reason.reason]} (motif principal)`,
          priority: reason.percentage > 30 ? "high" : "medium",
          impact: `Réduction potentielle de ${reason.count} échecs`,
          actions: [
            `Organiser formation continue moniteurs sur ${reasonLabels[reason.reason]}`,
            "Créer exercices spécifiques pour élèves",
            "Ajouter leçons ciblées avant examen",
          ],
        });
      }
    });

    return recommendations;
  }

  /**
   * Analyse performance moniteurs
   */
  private static analyzeInstructorPerformance(
    instructorPerformance: InstructorExamPerformance[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const avgSuccessRate =
      instructorPerformance.reduce((sum, i) => sum + i.successRate, 0) /
      instructorPerformance.length;

    // Moniteurs sous-performants
    const underperforming = instructorPerformance.filter(
      (i) => i.successRate < avgSuccessRate - 10
    );

    if (underperforming.length > 0) {
      recommendations.push({
        id: "instructor-training",
        title: "Former moniteurs sous-performants",
        description: `${underperforming.length} moniteur(s) ont un taux inférieur à la moyenne (${avgSuccessRate.toFixed(1)}%)`,
        priority: "high",
        impact: `Alignement sur moyenne = +${underperforming.length * 3} élèves réussis/an`,
        actions: [
          "Organiser mentorat avec top moniteurs",
          "Analyser méthodes pédagogiques",
          "Proposer formations continues",
        ],
      });
    }

    // Moniteurs trop de leçons
    const avgLessons =
      instructorPerformance.reduce((sum, i) => sum + i.averageLessons, 0) /
      instructorPerformance.length;
    const inefficient = instructorPerformance.filter(
      (i) => i.averageLessons > avgLessons * 1.2 && i.successRate < 75
    );

    if (inefficient.length > 0) {
      recommendations.push({
        id: "instructor-efficiency",
        title: "Optimiser efficacité moniteurs",
        description: `${inefficient.length} moniteur(s) nécessitent trop de leçons avec faible taux réussite`,
        priority: "medium",
        impact: "Réduction coûts formation + amélioration satisfaction",
        actions: [
          "Revoir progression pédagogique",
          "Identifier blocages élèves plus tôt",
          "Standardiser méthodes des top performers",
        ],
      });
    }

    return recommendations;
  }

  /**
   * Analyse objectifs globaux
   */
  private static analyzeGlobalTargets(
    currentRate: number,
    targetRate: number
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (currentRate < targetRate) {
      const gap = targetRate - currentRate;

      recommendations.push({
        id: "global-target",
        title: "Atteindre objectif global de réussite",
        description: `Écart de ${gap.toFixed(1)}% entre taux actuel (${currentRate.toFixed(1)}%) et objectif (${targetRate}%)`,
        priority: gap > 10 ? "high" : "medium",
        impact: `${Math.ceil((gap / 100) * 150)} élèves supplémentaires réussis/an`,
        actions: [
          "Appliquer toutes recommandations ci-dessus",
          "Analyser best practices écoles concurrentes",
          "Investir dans outils pédagogiques innovants",
          "Renforcer suivi personnalisé élèves",
        ],
      });
    }

    return recommendations;
  }

  /**
   * Calcule score priorité recommandation
   */
  static calculatePriorityScore(recommendation: Recommendation): number {
    const priorityScores = { high: 100, medium: 50, low: 25 };
    return priorityScores[recommendation.priority];
  }
}

// ============================================================================
// MOCK RECOMMENDATIONS
// ============================================================================

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-001",
    title: "Augmenter leçons catégorie A",
    description:
      "Le taux de réussite pratique catégorie A (68%) est inférieur à l'objectif de 80%",
    priority: "high",
    impact: "Réduction échecs de 32% à 20%",
    actions: [
      "Recommander 25 leçons minimum (actuellement 22.3)",
      "Cibler manœuvres moto complexes",
      "Simuler conditions examen réel",
    ],
  },
  {
    id: "rec-002",
    title: "Former moniteurs sur manœuvres",
    description: "35.3% des échecs sont dus aux manœuvres (motif principal)",
    priority: "high",
    impact: "Réduction potentielle de 12 échecs",
    actions: [
      "Organiser formation continue moniteurs sur manœuvres",
      "Créer exercices spécifiques pour élèves",
      "Ajouter leçons ciblées avant examen",
    ],
  },
  {
    id: "rec-003",
    title: "Optimiser timing examens catégorie B",
    description:
      "Meilleur taux de réussite observé entre 3-6 mois de formation (82.3%)",
    priority: "medium",
    impact: "Amélioration satisfaction élèves + réduction coûts",
    actions: [
      "Recommander inscription examen après 4 mois",
      "Éviter examens trop précoces (<3 mois: 62.5%)",
      "Identifier élèves procrastinant (>12 mois)",
    ],
  },
  {
    id: "rec-004",
    title: "Former moniteurs sous-performants",
    description: "1 moniteur a un taux inférieur à la moyenne (78.9% vs 79.5%)",
    priority: "medium",
    impact: "Alignement sur moyenne = +3 élèves réussis/an",
    actions: [
      "Organiser mentorat avec top moniteurs",
      "Analyser méthodes pédagogiques",
      "Proposer formations continues",
    ],
  },
  {
    id: "rec-005",
    title: "Planifier examens en juin",
    description:
      "Juin présente les meilleurs taux de réussite (88% catégorie B)",
    priority: "low",
    impact: "Optimisation calendrier examens",
    actions: [
      "Concentrer examens mai-juin si possible",
      "Éviter janvier (75% seulement)",
      "Communiquer saisonnalité aux élèves",
    ],
  },
];
