/**
 * VIAMENTOR - Vehicle Creation Wizard Schemas
 * Validation Zod avec règles OAC Art. 65-68
 */

import { z } from "zod";

/**
 * Step 1 - Vehicle Information Schema
 */
export const vehicleInfoSchema = z.object({
  photos: z.array(z.instanceof(File)).max(5, "Maximum 5 photos").optional(),
  photoUrls: z.array(z.string()).max(5).optional(),
  licensePlate: z
    .string()
    .min(1, "Plaque d'immatriculation requise")
    .regex(
      /^[A-Z]{2}[\s-]?\d{6}$/,
      "Format invalide (ex: VD-123456 ou VD 123456)"
    )
    .transform((val) => val.toUpperCase().replace(/\s/g, "-")),
  category: z.enum(["B", "A", "BE", "A1"], {
    required_error: "Catégorie requise",
  }),
  brand: z.string().min(1, "Marque requise"),
  model: z.string().min(1, "Modèle requis"),
  year: z
    .number()
    .min(1990, "Année minimum 1990")
    .max(new Date().getFullYear(), "Année invalide"),
  transmission: z.enum(["manual", "automatic"], {
    required_error: "Type de transmission requis",
  }),
  color: z.string().optional(),
  vin: z
    .string()
    .length(17, "VIN doit contenir 17 caractères")
    .optional()
    .or(z.literal("")),
  mileage: z.number().min(0, "Kilométrage invalide"),
  registrationDate: z.string().min(1, "Date de mise en circulation requise"),
  acquisitionDate: z.string().optional(),
  purchasePrice: z.number().optional(),
});

export type VehicleInfoData = z.infer<typeof vehicleInfoSchema>;

/**
 * Step 2 - Equipment & OAC Compliance Schema
 */
export const equipmentOACSchema = z
  .object({
    // Doubles commandes (required for manual B/BE)
    dualControls: z.boolean(),
    dualControlsDate: z.string().optional(),
    dualControlsInstaller: z.string().optional(),
    dualControlsCertificate: z.instanceof(File).optional(),
    dualControlsCertificateUrl: z.string().optional(),

    // Rétroviseur moniteur
    instructorMirror: z.boolean(),
    instructorMirrorDate: z.string().optional(),

    // Plaque AUTO-ÉCOLE
    schoolSign: z.boolean(),
    schoolSignType: z.enum(["magnetic", "fixed"]).optional(),

    // Triangle signalisation
    warningTriangle: z.boolean(),

    // Trousse premiers secours
    firstAidKit: z.boolean(),
    firstAidKitExpiry: z.string().optional(),

    // Extincteur (optional)
    fireExtinguisher: z.boolean().optional(),
    fireExtinguisherCheck: z.string().optional(),

    // Metadata
    category: z.enum(["B", "A", "BE", "A1"]),
    transmission: z.enum(["manual", "automatic"]),
  })
  .refine(
    (data) => {
      // Doubles commandes required for manual B/BE
      if (
        data.transmission === "manual" &&
        (data.category === "B" || data.category === "BE")
      ) {
        return data.dualControls === true;
      }
      return true;
    },
    {
      message:
        "Doubles commandes obligatoires pour véhicules manuels B/BE (OAC Art. 65)",
      path: ["dualControls"],
    }
  )
  .refine((data) => data.instructorMirror === true, {
    message: "Rétroviseur moniteur obligatoire (OAC Art. 65)",
    path: ["instructorMirror"],
  })
  .refine((data) => data.schoolSign === true, {
    message: "Plaque AUTO-ÉCOLE obligatoire (OAC Art. 65)",
    path: ["schoolSign"],
  })
  .refine((data) => data.warningTriangle === true, {
    message: "Triangle de signalisation obligatoire",
    path: ["warningTriangle"],
  })
  .refine((data) => data.firstAidKit === true, {
    message: "Trousse de premiers secours obligatoire",
    path: ["firstAidKit"],
  });

export type EquipmentOACData = z.infer<typeof equipmentOACSchema>;

/**
 * Step 3 - Insurances & Inspections Schema
 */
export const insurancesSchema = z
  .object({
    // RC Insurance
    rcCompany: z.string().min(1, "Compagnie d'assurance requise"),
    rcPolicyNumber: z.string().min(1, "Numéro de police requis"),
    rcStartDate: z.string().min(1, "Date de début requise"),
    rcExpiryDate: z.string().min(1, "Date d'expiration requise"),
    rcCertificate: z.instanceof(File).optional(),
    rcCertificateUrl: z.string().optional(),

    // Student Coverage
    studentCoverage: z.boolean(),
    studentPolicyNumber: z.string().optional(),
    studentExpiryDate: z.string().optional(),
    studentCertificate: z.instanceof(File).optional(),
    studentCertificateUrl: z.string().optional(),

    // Casco (optional)
    hasCasco: z.boolean().optional(),
    cascoType: z.enum(["partial", "full"]).optional(),
    cascoDeductible: z.number().optional(),

    // Technical Inspection
    lastInspectionNumber: z.string().optional(),
    lastInspectionDate: z.string().optional(),
    nextInspectionDate: z.string().min(1, "Date prochaine expertise requise"),
    inspectionCertificate: z.instanceof(File).optional(),
    inspectionCertificateUrl: z.string().optional(),

    // Highway Vignette
    hasVignette: z.boolean(),
    vignetteYear: z.number().optional(),

    // Metadata
    vehicleYear: z.number(),
  })
  .refine((data) => data.studentCoverage === true, {
    message: "Assurance couvrant les élèves obligatoire (OAC Art. 65)",
    path: ["studentCoverage"],
  })
  .refine((data) => data.hasVignette === true, {
    message: "Vignette autoroute obligatoire en Suisse",
    path: ["hasVignette"],
  })
  .refine(
    (data) => {
      const expiry = new Date(data.rcExpiryDate);
      const today = new Date();
      return expiry > today;
    },
    {
      message: "L'assurance RC doit être valide",
      path: ["rcExpiryDate"],
    }
  )
  .refine(
    (data) => {
      if (data.studentCoverage && data.studentExpiryDate) {
        const expiry = new Date(data.studentExpiryDate);
        const today = new Date();
        return expiry > today;
      }
      return true;
    },
    {
      message: "L'assurance élèves doit être valide",
      path: ["studentExpiryDate"],
    }
  );

export type InsurancesData = z.infer<typeof insurancesSchema>;

/**
 * Step 4 - Summary Schema
 */
export const summarySchema = z.object({
  availableImmediately: z.boolean().default(true),
  serviceDate: z.string().optional(),
  authorizedInstructors: z.array(z.string()).optional(),
  oacCompliance: z.boolean().refine((val) => val === true, {
    message: "Vous devez confirmer la conformité OAC Art. 65-68",
  }),
});

export type SummaryData = z.infer<typeof summarySchema>;

/**
 * Complete Vehicle Creation Schema
 */
export const completeVehicleSchema = z.object({
  vehicleInfo: vehicleInfoSchema,
  equipment: equipmentOACSchema,
  insurances: insurancesSchema,
  summary: summarySchema,
});

export type CompleteVehicleData = z.infer<typeof completeVehicleSchema>;

/**
 * Helper: Calculate next inspection date based on vehicle age
 */
export function calculateNextInspectionDate(
  registrationDate: string,
  lastInspectionDate?: string
): Date {
  const regDate = new Date(registrationDate);
  const today = new Date();
  const vehicleAge = today.getFullYear() - regDate.getFullYear();

  let intervalYears: number;
  if (vehicleAge < 4) {
    intervalYears = 5;
  } else if (vehicleAge < 8) {
    intervalYears = 3;
  } else {
    intervalYears = 2;
  }

  const baseDate = lastInspectionDate ? new Date(lastInspectionDate) : regDate;
  const nextDate = new Date(baseDate);
  nextDate.setFullYear(nextDate.getFullYear() + intervalYears);

  return nextDate;
}

/**
 * Helper: Check if date is expiring soon (within days)
 */
export function isExpiringSoon(dateString: string, days: number = 90): boolean {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays > 0;
}

/**
 * Helper: Get days until expiry
 */
export function getDaysUntilExpiry(dateString: string): number {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
