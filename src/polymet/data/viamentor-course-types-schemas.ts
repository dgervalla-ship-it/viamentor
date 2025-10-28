/**
 * VIAMENTOR Course Types Validation Schemas
 */

import { z } from "zod";

export const courseTypeScheduleSchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format HH:mm requis"),
  duration: z.number().min(1).max(12).optional(),
});

export const courseTypeFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est obligatoire")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    description: z
      .string()
      .max(300, "La description ne peut pas dépasser 300 caractères")
      .optional(),
    category: z
      .array(
        z.enum([
          "theoretical",
          "practical",
          "awareness",
          "first_aid",
          "specialized",
          "other",
        ])
      )
      .min(1, "Au moins une catégorie est requise"),
    color: z
      .string()
      .regex(/^#[0-9A-F]{6}$/i, "Format hexadécimal requis (#RRGGBB)"),
    icon: z.string().url().optional(),
    defaultDuration: z
      .number()
      .min(1, "La durée doit être au moins 1 heure")
      .max(12, "La durée ne peut pas dépasser 12 heures"),
    maxCapacity: z
      .number()
      .min(5, "La capacité maximum doit être au moins 5")
      .max(30, "La capacité maximum ne peut pas dépasser 30"),
    minCapacity: z
      .number()
      .min(1, "La capacité minimum doit être au moins 1")
      .max(30, "La capacité minimum ne peut pas dépasser 30"),
    price: z.number().positive("Le prix doit être positif").optional(),
    licenseCategories: z
      .array(z.enum(["B", "A", "BE", "A1", "C", "D"]))
      .min(1, "Au moins une catégorie de permis est requise"),
    certificateIssued: z.boolean().default(false),
    active: z.boolean().default(true),
    authorizedInstructors: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    recurringSchedule: z.array(courseTypeScheduleSchema).optional(),
    autoRecurrence: z.boolean().default(false),
    notifications: z
      .array(z.enum(["reminder_d1", "confirmation", "satisfaction_survey"]))
      .default([]),
  })
  .refine((data) => data.minCapacity <= data.maxCapacity, {
    message:
      "La capacité minimum doit être inférieure ou égale à la capacité maximum",
    path: ["minCapacity"],
  });

export type CourseTypeFormData = z.infer<typeof courseTypeFormSchema>;
