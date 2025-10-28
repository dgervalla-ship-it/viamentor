/**
 * VIAMENTOR - Swiss License Regulations 2025
 *
 * Règles officielles des permis de conduire suisses selon OAC
 * (Ordonnance sur l'admission à la circulation routière)
 *
 * Source: OFROU (Office fédéral des routes)
 * Dernière mise à jour: 2025
 */

// ============================================================================
// TYPES - CATÉGORIES DE PERMIS
// ============================================================================

export type LicenseCategory =
  | "A1"
  | "A_35kW"
  | "A_illimitee"
  | "B"
  | "BE"
  | "B1"
  | "C1"
  | "C1E"
  | "C"
  | "CE"
  | "D1"
  | "D1E"
  | "D"
  | "DE"
  | "F"
  | "G"
  | "M";

export type CourseType =
  | "premiers_secours"
  | "controle_vue"
  | "examen_theorique"
  | "sensibilisation"
  | "IPB"
  | "lecons_conduite"
  | "lecons_remorque"
  | "lecons_pratiques"
  | "formation_2_phases"
  | "examen_pratique"
  | "examen_medical"
  | "OACP";

// ============================================================================
// TYPES - STRUCTURES DE DONNÉES
// ============================================================================

export interface CourseRequirement {
  duree?: string;
  validite?: string;
  timing?: string;
  requis?: boolean | string;
  dispense?: string;
  questions?: number;
  modules?: number;
  reduction?: string;
  type?: string;
  vehicule?: string;
  moyenne?: string;
  remorque_min?: string;
  periodicite?: string;
  norme?: string;
  duree_initiale?: string;
  code?: string;
}

export interface LicenseRegulation {
  age_min: number;
  vehicules: string;
  prerequis?: string;
  cours: {
    premiers_secours?: CourseRequirement;
    controle_vue?: CourseRequirement;
    examen_theorique?: CourseRequirement;
    sensibilisation?: CourseRequirement;
    IPB?: CourseRequirement;
    lecons_conduite?: CourseRequirement;
    lecons_remorque?: CourseRequirement;
    lecons_pratiques?: CourseRequirement;
    formation_2_phases?: CourseRequirement;
    examen_pratique?: CourseRequirement;
    examen_medical?: CourseRequirement;
    OACP?: CourseRequirement;
  };
  remarques?: string[];
  progression?: string;
  apprentissage_min?: string;
  probatoire?: string;
  validite?: string;
  renouvellement?: string;
  usage?: string[];
}

export interface LicenseRegulations {
  [key: string]: LicenseRegulation;
}

// ============================================================================
// DONNÉES - PARTIE 1/4 : CATÉGORIES MOTOS (A1, A 35kW, A illimitée)
// ============================================================================

export const SWISS_LICENSE_REGULATIONS_MOTOS: LicenseRegulations = {
  /**
   * CATÉGORIE A1 - Motocycles légers
   * Âge minimum: 16 ans
   */
  A1: {
    age_min: 16,
    vehicules: "Motocycles ≤125cm³ et ≤11kW, cyclomoteurs",
    cours: {
      premiers_secours: {
        duree: "10h",
        validite: "6 ans",
        timing: "avant permis élève",
      },
      controle_vue: {
        validite: "24 mois",
      },
      examen_theorique: {
        questions: 50,
        dispense: "si permis B",
      },
      sensibilisation: {
        duree: "8h",
        validite: "à vie depuis 2021",
        timing: "avant pratique",
      },
      IPB: {
        duree: "12h",
        modules: 3,
        timing: "4 mois après permis élève",
      },
      examen_pratique: {
        type: "manœuvres + circulation",
      },
    },
    remarques: [
      "Permis élève 4 mois, +12 mois après IPB",
      "Pas examen hiver (nov-mars)",
    ],
  },

  /**
   * CATÉGORIE A 35kW - Motocycles de puissance limitée
   * Âge minimum: 18 ans
   */
  A_35kW: {
    age_min: 18,
    vehicules: "≤35kW, rapport ≤0.20kW/kg",
    prerequis: "permet A1",
    cours: {
      premiers_secours: {
        dispense: "si B/A1",
      },
      controle_vue: {
        validite: "24 mois",
      },
      examen_theorique: {
        requis: false,
        dispense: "si pas B/A1",
      },
      sensibilisation: {
        duree: "8h",
      },
      IPB: {
        duree: "12h",
        reduction: "6h si A1 récent",
      },
      examen_pratique: {
        requis: true,
        vehicule: "≤35kW",
      },
    },
    progression: "2 ans sans infraction avant A illimitée",
    remarques: [
      "Permet de conduire les véhicules de catégorie A1",
      "Réduction IPB à 6h si A1 obtenu récemment",
    ],
  },

  /**
   * CATÉGORIE A illimitée - Tous motocycles
   * Âge minimum: 20 ans (après 2 ans de A 35kW)
   */
  A_illimitee: {
    age_min: 20,
    vehicules: "tous motocycles sans restriction",
    prerequis: "2 ans A 35kW sans infraction",
    cours: {
      premiers_secours: {
        dispense: "déjà fait",
      },
      sensibilisation: {
        dispense: "si A1/A35/B",
      },
      IPB: {
        dispense: "si A1/A35",
      },
      examen_pratique: {
        requis: true,
        vehicule: ">35kW",
      },
    },
    remarques: [
      "Plus d'accès direct possible",
      "Permis définitif après période probatoire",
      "Nécessite 2 ans de permis A 35kW sans infraction",
    ],
  },
};

// ============================================================================
// DONNÉES - PARTIE 2/4 : CATÉGORIES VOITURES (B, B1, BE)
// ============================================================================

export const SWISS_LICENSE_REGULATIONS_CARS: LicenseRegulations = {
  /**
   * CATÉGORIE B - Voitures de tourisme
   * Âge minimum: 17 ans
   */
  B: {
    age_min: 17,
    vehicules: "≤3.5t, ≤9 places; remorque ≤750kg",
    cours: {
      premiers_secours: {
        duree: "10h",
        validite: "6 ans",
      },
      controle_vue: {
        validite: "24 mois",
      },
      examen_theorique: {
        requis: true,
      },
      sensibilisation: {
        duree: "8h",
        validite: "à vie depuis 2021",
      },
      lecons_conduite: {
        moyenne: "20-30 leçons",
      },
      examen_pratique: {
        type: "circulation",
      },
      formation_2_phases: {
        timing: "12 mois après permis essai",
      },
    },
    apprentissage_min: "12 mois si <20 ans",
    probatoire: "3 ans",
    remarques: ["Sensibilisation moto reconnu pour B"],
  },

  /**
   * CATÉGORIE B1 - Quadricycles lourds
   * Âge minimum: 16 ans
   */
  B1: {
    age_min: 16,
    vehicules: "Quadricycles ≤15kW (≤400kg, 550kg pro)",
    cours: {
      premiers_secours: {
        duree: "10h",
      },
      controle_vue: {
        validite: "24 mois",
      },
      examen_theorique: {
        requis: true,
      },
      sensibilisation: {
        duree: "8h",
      },
      examen_pratique: {
        vehicule: "B1",
      },
    },
  },

  /**
   * CATÉGORIE BE - Voiture avec remorque lourde
   * Âge minimum: 18 ans
   */
  BE: {
    age_min: 18,
    vehicules: "B + remorque >750kg (ensemble ≤7t)",
    prerequis: "permis B",
    cours: {
      premiers_secours: {
        dispense: "déjà B",
      },
      controle_vue: {
        validite: "24 mois",
      },
      examen_theorique: {
        dispense: "si B",
      },
      sensibilisation: {
        dispense: "déjà B",
      },
      lecons_remorque: {
        type: "attelage, freinage, manœuvre",
      },
      examen_pratique: {
        remorque_min: "800kg",
      },
    },
    remarques: ["Remorque lourde ≤3.5t"],
  },
};

// ============================================================================
// DONNÉES - PARTIE 3/4 : CATÉGORIES CAMIONS (C1, C1E, C, CE)
// ============================================================================

export const SWISS_LICENSE_REGULATIONS_TRUCKS: LicenseRegulations = {
  /**
   * CATÉGORIE C1 - Camions légers
   * Âge minimum: 18 ans
   */
  C1: {
    age_min: 18,
    vehicules: "3.5t à 7.5t",
    prerequis: "permis B",
    cours: {
      premiers_secours: {
        requis: "requis sauf si B",
      },
      examen_medical: {
        periodicite: "selon âge",
      },
      examen_theorique: {
        type: "théorie camion",
      },
      lecons_conduite: {
        vehicule: ">3.5t",
      },
      examen_pratique: {
        type: "C1",
      },
    },
    usage: ["Service public", "Ambulances légères"],
  },

  /**
   * CATÉGORIE C1E - Camion léger avec remorque lourde
   * Âge minimum: 18 ans
   */
  C1E: {
    age_min: 18,
    vehicules: "C1 + remorque >750kg (≤12t ensemble)",
    prerequis: "C1",
    cours: {
      examen_pratique: {
        type: "poids total + attelage",
      },
    },
  },

  /**
   * CATÉGORIE C - Camions lourds
   * Âge minimum: 21 ans
   */
  C: {
    age_min: 21,
    vehicules: ">3.5t sans limite",
    prerequis: "permis B",
    cours: {
      examen_medical: {
        norme: "OAC",
      },
      examen_theorique: {
        type: "réglementation C",
      },
      lecons_conduite: {
        type: "poids lourd",
      },
      examen_pratique: {
        type: "complet C",
      },
      OACP: {
        duree_initiale: "140h",
        code: "95",
      },
    },
    remarques: ["Camions sans limite tonnage"],
  },

  /**
   * CATÉGORIE CE - Train routier
   * Âge minimum: 21 ans
   */
  CE: {
    age_min: 21,
    vehicules: "Camion + remorque >750kg (train routier)",
    prerequis: "C",
    cours: {
      lecons_pratiques: {
        type: "attelage/désattelage + convoi",
      },
      examen_pratique: {
        type: "train routier CE",
      },
      OACP: {
        requis: "pour transport pro",
      },
    },
  },
};

// ============================================================================
// DONNÉES - PARTIE 4/4 : CATÉGORIES BUS & SPÉCIAUX (D1, D1E, D, DE, F, G, M)
// ============================================================================

export const SWISS_LICENSE_REGULATIONS_BUS_SPECIAL: LicenseRegulations = {
  /**
   * CATÉGORIE D1 - Minibus
   * Âge minimum: 21 ans
   */
  D1: {
    age_min: 21,
    vehicules: "≤16 passagers, ≤8m",
    prerequis: "permis B",
    cours: {
      examen_theorique: {
        type: "transport personnes",
      },
      lecons_conduite: {
        vehicule: "minibus",
      },
      examen_pratique: {
        type: "D1",
      },
    },
    usage: ["Transport scolaire", "Service local"],
  },

  /**
   * CATÉGORIE D1E - Minibus avec remorque lourde
   * Âge minimum: 21 ans
   */
  D1E: {
    age_min: 21,
    vehicules: "D1 + remorque >750kg",
    prerequis: "D1",
    cours: {},
    remarques: ["Remorque non passagers"],
  },

  /**
   * CATÉGORIE D - Bus
   * Âge minimum: 21 ans
   */
  D: {
    age_min: 21,
    vehicules: "Bus >16 passagers",
    prerequis: "permis B",
    cours: {
      examen_theorique: {
        requis: true,
      },
      lecons_conduite: {
        vehicule: "autobus/car",
      },
      examen_pratique: {
        type: "D",
      },
      OACP: {
        duree_initiale: "140h",
        requis: "recyclage 35h/5ans",
      },
    },
  },

  /**
   * CATÉGORIE DE - Bus avec remorque lourde
   * Âge minimum: 21 ans
   */
  DE: {
    age_min: 21,
    vehicules: "D + remorque >750kg",
    prerequis: "D",
    cours: {
      OACP: {
        requis: "pour pros",
      },
    },
  },

  /**
   * CATÉGORIE F - Tracteurs agricoles
   * Âge minimum: 16 ans
   */
  F: {
    age_min: 16,
    vehicules: "Tracteurs agricoles ≤45km/h",
    cours: {
      examen_theorique: {
        requis: true,
      },
    },
    remarques: ["Pas formation pratique standardisée"],
  },

  /**
   * CATÉGORIE G - Véhicules agricoles lents
   * Âge minimum: 14 ans
   */
  G: {
    age_min: 14,
    vehicules: "Véhicules agricoles ≤30km/h",
    cours: {
      examen_theorique: {
        type: "simplifié",
      },
    },
    remarques: ["Pas premiers secours"],
  },

  /**
   * CATÉGORIE M - Cyclomoteurs
   * Âge minimum: 14 ans
   */
  M: {
    age_min: 14,
    vehicules: "Cyclomoteurs ≤50cm³, ≤45km/h",
    cours: {
      examen_theorique: {
        type: "base simplifié",
      },
    },
    remarques: ["Aucun cours pratique", "Pas premiers secours"],
  },
};

// ============================================================================
// DONNÉES - TOUTES CATÉGORIES COMBINÉES
// ============================================================================

export const SWISS_LICENSE_REGULATIONS_ALL: LicenseRegulations = {
  ...SWISS_LICENSE_REGULATIONS_MOTOS,
  ...SWISS_LICENSE_REGULATIONS_CARS,
  ...SWISS_LICENSE_REGULATIONS_TRUCKS,
  ...SWISS_LICENSE_REGULATIONS_BUS_SPECIAL,
};

// ============================================================================
// HELPERS - VALIDATION ET VÉRIFICATION
// ============================================================================

/**
 * Vérifie si un candidat remplit les conditions d'âge pour une catégorie
 */
export function checkAgeRequirement(
  category: LicenseCategory,
  birthDate: Date
): { eligible: boolean; ageRequired: number; currentAge: number } {
  const regulation = SWISS_LICENSE_REGULATIONS_ALL[category];
  if (!regulation) {
    throw new Error(`Catégorie ${category} non trouvée`);
  }

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const currentAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;

  return {
    eligible: currentAge >= regulation.age_min,
    ageRequired: regulation.age_min,
    currentAge,
  };
}

/**
 * Vérifie les prérequis d'une catégorie
 */
export function checkPrerequisites(
  category: LicenseCategory,
  existingLicenses: LicenseCategory[]
): { eligible: boolean; missing: string[] } {
  const regulation = SWISS_LICENSE_REGULATIONS_ALL[category];

  if (!regulation || !regulation.prerequis) {
    return { eligible: true, missing: [] };
  }

  // Parse prerequis string
  const missing: string[] = [];

  // Motos
  if (category === "A_illimitee" && !existingLicenses.includes("A_35kW")) {
    missing.push("Permis A 35kW requis pendant 2 ans");
  }

  // Voitures
  if (category === "BE" && !existingLicenses.includes("B")) {
    missing.push("Permis B requis");
  }

  // Camions
  if (category === "C1" && !existingLicenses.includes("B")) {
    missing.push("Permis B requis");
  }
  if (category === "C1E" && !existingLicenses.includes("C1")) {
    missing.push("Permis C1 requis");
  }
  if (category === "C" && !existingLicenses.includes("B")) {
    missing.push("Permis B requis");
  }
  if (category === "CE" && !existingLicenses.includes("C")) {
    missing.push("Permis C requis");
  }

  // Bus
  if (category === "D1" && !existingLicenses.includes("B")) {
    missing.push("Permis B requis");
  }
  if (category === "D1E" && !existingLicenses.includes("D1")) {
    missing.push("Permis D1 requis");
  }
  if (category === "D" && !existingLicenses.includes("B")) {
    missing.push("Permis B requis");
  }
  if (category === "DE" && !existingLicenses.includes("D")) {
    missing.push("Permis D requis");
  }

  return {
    eligible: missing.length === 0,
    missing,
  };
}

/**
 * Récupère les cours obligatoires pour une catégorie
 */
export function getRequiredCourses(
  category: LicenseCategory,
  existingLicenses: LicenseCategory[] = []
): CourseType[] {
  const regulation = SWISS_LICENSE_REGULATIONS_ALL[category];
  if (!regulation) return [];

  const required: CourseType[] = [];

  // Premiers secours
  if (
    regulation.cours.premiers_secours &&
    !regulation.cours.premiers_secours.dispense
  ) {
    required.push("premiers_secours");
  }

  // Contrôle de la vue
  if (regulation.cours.controle_vue) {
    required.push("controle_vue");
  }

  // Examen théorique
  if (
    regulation.cours.examen_theorique &&
    regulation.cours.examen_theorique.requis !== false &&
    !existingLicenses.includes("B")
  ) {
    required.push("examen_theorique");
  }

  // Sensibilisation
  if (
    regulation.cours.sensibilisation &&
    !regulation.cours.sensibilisation.dispense
  ) {
    required.push("sensibilisation");
  }

  // IPB
  if (regulation.cours.IPB && !regulation.cours.IPB.dispense) {
    required.push("IPB");
  }

  // Leçons de conduite
  if (regulation.cours.lecons_conduite) {
    required.push("lecons_conduite");
  }

  // Leçons remorque
  if (regulation.cours.lecons_remorque) {
    required.push("lecons_remorque");
  }

  // Leçons pratiques (camions)
  if (regulation.cours.lecons_pratiques) {
    required.push("lecons_pratiques");
  }

  // Examen médical
  if (regulation.cours.examen_medical) {
    required.push("examen_medical");
  }

  // OACP (formation continue)
  if (regulation.cours.OACP) {
    required.push("OACP");
  }

  // Formation 2 phases
  if (regulation.cours.formation_2_phases) {
    required.push("formation_2_phases");
  }

  // Examen pratique
  if (regulation.cours.examen_pratique) {
    required.push("examen_pratique");
  }

  return required;
}

/**
 * Calcule la durée totale des cours pour une catégorie
 */
export function calculateTotalCourseDuration(
  category: LicenseCategory,
  hasA1Recent: boolean = false
): { hours: number; details: { [key: string]: string } } {
  const regulation = SWISS_LICENSE_REGULATIONS_ALL[category];
  if (!regulation) return { hours: 0, details: {} };

  let totalHours = 0;
  const details: { [key: string]: string } = {};

  // Premiers secours
  if (regulation.cours.premiers_secours?.duree) {
    const hours = parseInt(regulation.cours.premiers_secours.duree);
    totalHours += hours;
    details["Premiers secours"] = regulation.cours.premiers_secours.duree;
  }

  // Sensibilisation
  if (regulation.cours.sensibilisation?.duree) {
    const hours = parseInt(regulation.cours.sensibilisation.duree);
    totalHours += hours;
    details["Sensibilisation"] = regulation.cours.sensibilisation.duree;
  }

  // IPB
  if (regulation.cours.IPB?.duree) {
    let ipbDuration = regulation.cours.IPB.duree;

    // Réduction si A1 récent
    if (
      category === "A_35kW" &&
      hasA1Recent &&
      regulation.cours.IPB.reduction
    ) {
      ipbDuration = regulation.cours.IPB.reduction;
    }

    const hours = parseInt(ipbDuration);
    totalHours += hours;
    details["IPB"] = ipbDuration;
  }

  // OACP (formation continue camions)
  if (regulation.cours.OACP?.duree_initiale) {
    const hours = parseInt(regulation.cours.OACP.duree_initiale);
    totalHours += hours;
    details["OACP"] = regulation.cours.OACP.duree_initiale;
  }

  return { hours: totalHours, details };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default SWISS_LICENSE_REGULATIONS_ALL;
