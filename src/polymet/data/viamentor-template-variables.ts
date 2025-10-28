/**
 * VIAMENTOR - Template Variables
 * Variables système pour templates emails/SMS
 */

export interface TemplateVariable {
  name: string;
  variable: string;
  description: string;
  example: string;
  context: VariableContext[];
}

export type VariableContext =
  | "student"
  | "instructor"
  | "lesson"
  | "invoice"
  | "school"
  | "vehicle"
  | "exam";

// ============================================================================
// VARIABLES BY CONTEXT
// ============================================================================

export const templateVariables: Record<VariableContext, TemplateVariable[]> = {
  student: [
    {
      name: "Nom de l'élève",
      variable: "{studentName}",
      description: "Nom complet de l'élève",
      example: "Jean Dupont",
      context: ["student"],
    },
    {
      name: "Prénom",
      variable: "{studentFirstName}",
      description: "Prénom de l'élève",
      example: "Jean",
      context: ["student"],
    },
    {
      name: "Email",
      variable: "{studentEmail}",
      description: "Adresse email de l'élève",
      example: "jean.dupont@example.com",
      context: ["student"],
    },
    {
      name: "Téléphone",
      variable: "{studentPhone}",
      description: "Numéro de téléphone",
      example: "+41 79 123 45 67",
      context: ["student"],
    },
    {
      name: "Catégorie",
      variable: "{studentCategory}",
      description: "Catégorie de permis",
      example: "Catégorie B",
      context: ["student"],
    },
  ],

  instructor: [
    {
      name: "Nom du moniteur",
      variable: "{instructorName}",
      description: "Nom complet du moniteur",
      example: "Marie Martin",
      context: ["instructor", "lesson"],
    },
    {
      name: "Email moniteur",
      variable: "{instructorEmail}",
      description: "Email du moniteur",
      example: "marie.martin@viamentor.ch",
      context: ["instructor"],
    },
    {
      name: "Téléphone moniteur",
      variable: "{instructorPhone}",
      description: "Téléphone du moniteur",
      example: "+41 79 987 65 43",
      context: ["instructor", "lesson"],
    },
  ],

  lesson: [
    {
      name: "Date de la leçon",
      variable: "{lessonDate}",
      description: "Date de la leçon",
      example: "15 janvier 2025",
      context: ["lesson"],
    },
    {
      name: "Heure de début",
      variable: "{lessonTime}",
      description: "Heure de début",
      example: "14:00",
      context: ["lesson"],
    },
    {
      name: "Durée",
      variable: "{lessonDuration}",
      description: "Durée en minutes",
      example: "90 minutes",
      context: ["lesson"],
    },
    {
      name: "Lieu de rendez-vous",
      variable: "{lessonLocation}",
      description: "Adresse de rendez-vous",
      example: "Place de la Gare, Lausanne",
      context: ["lesson"],
    },
    {
      name: "Type de leçon",
      variable: "{lessonType}",
      description: "Type de leçon",
      example: "Leçon pratique",
      context: ["lesson"],
    },
  ],

  invoice: [
    {
      name: "Numéro de facture",
      variable: "{invoiceNumber}",
      description: "Numéro unique de facture",
      example: "INV-2025-001",
      context: ["invoice"],
    },
    {
      name: "Montant total",
      variable: "{invoiceAmount}",
      description: "Montant total TTC",
      example: "CHF 450.00",
      context: ["invoice"],
    },
    {
      name: "Date d'émission",
      variable: "{invoiceDate}",
      description: "Date d'émission",
      example: "10 janvier 2025",
      context: ["invoice"],
    },
    {
      name: "Date d'échéance",
      variable: "{invoiceDueDate}",
      description: "Date limite de paiement",
      example: "31 janvier 2025",
      context: ["invoice"],
    },
    {
      name: "Solde dû",
      variable: "{invoiceBalance}",
      description: "Montant restant à payer",
      example: "CHF 450.00",
      context: ["invoice"],
    },
  ],

  school: [
    {
      name: "Nom de l'école",
      variable: "{schoolName}",
      description: "Nom de l'auto-école",
      example: "Auto-école ViaMenutor",
      context: ["student", "instructor", "lesson", "invoice", "school"],
    },
    {
      name: "Email de l'école",
      variable: "{schoolEmail}",
      description: "Email de contact",
      example: "contact@viamentor.ch",
      context: ["school"],
    },
    {
      name: "Téléphone de l'école",
      variable: "{schoolPhone}",
      description: "Téléphone de contact",
      example: "+41 21 123 45 67",
      context: ["school"],
    },
    {
      name: "Adresse de l'école",
      variable: "{schoolAddress}",
      description: "Adresse complète",
      example: "Rue de la Gare 15, 1003 Lausanne",
      context: ["school"],
    },
    {
      name: "Site web",
      variable: "{schoolWebsite}",
      description: "URL du site web",
      example: "https://www.viamentor.ch",
      context: ["school"],
    },
  ],

  vehicle: [
    {
      name: "Marque du véhicule",
      variable: "{vehicleBrand}",
      description: "Marque du véhicule",
      example: "Volkswagen",
      context: ["vehicle", "lesson"],
    },
    {
      name: "Modèle",
      variable: "{vehicleModel}",
      description: "Modèle du véhicule",
      example: "Golf",
      context: ["vehicle", "lesson"],
    },
    {
      name: "Plaque",
      variable: "{vehiclePlate}",
      description: "Numéro de plaque",
      example: "VD 123456",
      context: ["vehicle", "lesson"],
    },
  ],

  exam: [
    {
      name: "Type d'examen",
      variable: "{examType}",
      description: "Type d'examen",
      example: "Examen pratique",
      context: ["exam"],
    },
    {
      name: "Date d'examen",
      variable: "{examDate}",
      description: "Date de l'examen",
      example: "20 janvier 2025",
      context: ["exam"],
    },
    {
      name: "Résultat",
      variable: "{examResult}",
      description: "Résultat de l'examen",
      example: "Réussi",
      context: ["exam"],
    },
    {
      name: "Score",
      variable: "{examScore}",
      description: "Score obtenu",
      example: "85/100",
      context: ["exam"],
    },
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all variables for a specific context
 */
export function getVariablesByContext(
  context: VariableContext
): TemplateVariable[] {
  return templateVariables[context] || [];
}

/**
 * Get all variables (flattened)
 */
export function getAllVariables(): TemplateVariable[] {
  return Object.values(templateVariables).flat();
}

/**
 * Get variables for multiple contexts
 */
export function getVariablesForContexts(
  contexts: VariableContext[]
): TemplateVariable[] {
  const variables = new Map<string, TemplateVariable>();

  contexts.forEach((context) => {
    getVariablesByContext(context).forEach((variable) => {
      variables.set(variable.variable, variable);
    });
  });

  return Array.from(variables.values());
}

/**
 * Replace variables in template with sample data
 */
export function replaceVariables(template: string): string {
  let result = template;

  getAllVariables().forEach((variable) => {
    result = result.replace(
      new RegExp(variable.variable.replace(/[{}]/g, "\\$&"), "g"),
      variable.example
    );
  });

  return result;
}
