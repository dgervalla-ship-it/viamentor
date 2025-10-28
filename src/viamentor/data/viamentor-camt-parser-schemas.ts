/**
 * VIAMENTOR - Camt Parser & Payment Schemas
 * Schémas Zod validation pour Camt.054 et paiements
 */

import { z } from "zod";

// ============================================================================
// RECORD PAYMENT SCHEMA
// ============================================================================

export const recordPaymentSchema = z
  .object({
    studentId: z.string().min(1, "Élève requis"),
    invoiceIds: z.array(z.string()).min(1, "Sélectionner au moins une facture"),
    amount: z.number().positive("Montant doit être positif"),
    allowPartial: z.boolean().default(false),
    date: z.string().min(1, "Date requise"),
    time: z.string().optional(),
    method: z.enum([
      "cash",
      "card",
      "bank_transfer",
      "twint",
      "postfinance",
      "other",
    ]),
    methodOther: z.string().optional(),
    reference: z.string().optional(),
    receiptFile: z.instanceof(File).optional(),
    notes: z.string().max(300, "Maximum 300 caractères").optional(),
    createAccounting: z.boolean().default(false),
  })
  .refine((data) => data.method !== "other" || data.methodOther, {
    message: "Préciser la méthode",
    path: ["methodOther"],
  });

export type RecordPaymentFormData = z.infer<typeof recordPaymentSchema>;

// ============================================================================
// CAMT.054 XML SCHEMA
// ============================================================================

export const camtTransactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.number(),
  currency: z.string().default("CHF"),
  debtorName: z.string(),
  debtorIBAN: z.string().optional(),
  creditorName: z.string(),
  creditorIBAN: z.string(),
  reference: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(["credit", "debit"]),
});

export const camtFileSchema = z.object({
  messageId: z.string(),
  creationDateTime: z.string(),
  account: z.object({
    iban: z.string(),
    currency: z.string().default("CHF"),
    owner: z.string(),
  }),
  statement: z.object({
    id: z.string(),
    creationDateTime: z.string(),
    fromDate: z.string(),
    toDate: z.string(),
    openingBalance: z.number(),
    closingBalance: z.number(),
  }),
  transactions: z.array(camtTransactionSchema),
});

export type CamtFileData = z.infer<typeof camtFileSchema>;
export type CamtTransactionData = z.infer<typeof camtTransactionSchema>;

// ============================================================================
// MATCHING ASSIGNMENT SCHEMA
// ============================================================================

export const matchingAssignmentSchema = z.object({
  transactionId: z.string(),
  invoiceId: z.string(),
  studentId: z.string(),
  confidence: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

export type MatchingAssignmentData = z.infer<typeof matchingAssignmentSchema>;

// ============================================================================
// CAMT IMPORT SCHEMA
// ============================================================================

export const camtImportSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.type === "text/xml" || file.name.endsWith(".xml"),
      "Fichier XML requis"
    )
    .refine((file) => file.size <= 10 * 1024 * 1024, "Taille maximum 10MB"),
  createAccounting: z.boolean().default(false),
  assignments: z.array(matchingAssignmentSchema).optional(),
});

export type CamtImportFormData = z.infer<typeof camtImportSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse Camt.054 XML file
 * Simplified mock parser for demo
 */
export async function parseCamtXML(file: File): Promise<CamtFileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const xmlText = e.target?.result as string;

        // Mock parsing - in real app, use DOMParser or xml2js
        if (!xmlText.includes("<?xml") || !xmlText.includes("camt.054")) {
          throw new Error("Invalid Camt.054 XML format");
        }

        // Mock parsed data
        const mockData: CamtFileData = {
          messageId: "MSG-" + Date.now(),
          creationDateTime: new Date().toISOString(),
          account: {
            iban: "CH93 0076 2011 6238 5295 7",
            currency: "CHF",
            owner: "Auto-École Léman",
          },
          statement: {
            id: "STMT-" + Date.now(),
            creationDateTime: new Date().toISOString(),
            fromDate: "2025-01-01",
            toDate: "2025-01-15",
            openingBalance: 5000.0,
            closingBalance: 7039.5,
          },
          transactions: [
            {
              id: "TX-001",
              date: "2025-01-15",
              amount: 450.0,
              currency: "CHF",
              debtorName: "Martin Sophie",
              debtorIBAN: "CH12 3456 7890 1234 5678 9",
              creditorName: "Auto-École Léman",
              creditorIBAN: "CH93 0076 2011 6238 5295 7",
              reference: "QRR-2025-001-456789",
              type: "credit",
            },
            {
              id: "TX-002",
              date: "2025-01-14",
              amount: 405.0,
              currency: "CHF",
              debtorName: "Dubois L.",
              creditorName: "Auto-École Léman",
              creditorIBAN: "CH93 0076 2011 6238 5295 7",
              message: "Facture auto-école",
              type: "credit",
            },
            {
              id: "TX-003",
              date: "2025-01-13",
              amount: 1200.0,
              currency: "CHF",
              debtorName: "Entreprise XYZ SA",
              creditorName: "Auto-École Léman",
              creditorIBAN: "CH93 0076 2011 6238 5295 7",
              reference: "INV-SUPPLIER-456",
              type: "credit",
            },
            {
              id: "TX-004",
              date: "2025-01-12",
              amount: -15.5,
              currency: "CHF",
              debtorName: "PostFinance SA",
              creditorName: "Auto-École Léman",
              creditorIBAN: "CH93 0076 2011 6238 5295 7",
              reference: "FEES-2025-01",
              message: "Frais de tenue de compte",
              type: "debit",
            },
          ],
        };

        // Validate with Zod
        const validated = camtFileSchema.parse(mockData);
        resolve(validated);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Erreur lecture fichier"));
    reader.readAsText(file);
  });
}

/**
 * Extract QR reference from transaction
 */
export function extractQRReference(
  transaction: CamtTransactionData
): string | null {
  if (!transaction.reference) return null;

  // QR reference format: 27 digits
  const qrMatch = transaction.reference.match(/\d{27}/);
  if (qrMatch) return qrMatch[0];

  // BVR reference format
  const bvrMatch = transaction.reference.match(/\d{16,27}/);
  if (bvrMatch) return bvrMatch[0];

  return transaction.reference;
}

/**
 * Calculate name similarity (simple Levenshtein-like)
 */
export function calculateNameSimilarity(name1: string, name2: string): number {
  const n1 = name1.toLowerCase().replace(/[^a-z]/g, "");
  const n2 = name2.toLowerCase().replace(/[^a-z]/g, "");

  if (n1 === n2) return 100;

  // Simple word matching
  const words1 = name1.toLowerCase().split(/\s+/);
  const words2 = name2.toLowerCase().split(/\s+/);

  let matches = 0;
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1.includes(w2) || w2.includes(w1)) {
        matches++;
        break;
      }
    }
  }

  return Math.round((matches / Math.max(words1.length, words2.length)) * 100);
}
