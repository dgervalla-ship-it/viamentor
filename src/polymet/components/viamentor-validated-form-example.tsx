/**
 * ============================================================================
 * VIAMENTOR - Validated Form Example
 * ============================================================================
 *
 * Composant exemple démontrant l'utilisation du hook useValidatedForm
 * avec tous les patterns de validation
 */

import React from "react";
import { z } from "zod";
import {
  useValidatedForm,
  emailValidation,
  swissPhoneValidation,
  ageValidation,
  swissIBANValidation,
  conditionalValidation,
} from "@/polymet/data/viamentor-validation-improvements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface ValidatedFormExampleProps {
  locale?: "fr" | "de" | "it" | "en";
  onSuccess?: (data: any) => void;
}

// ============================================================================
// SCHEMAS
// ============================================================================

// Schema formulaire standard
const standardFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Prénom trop court (min 2 caractères)")
    .max(50, "Prénom trop long (max 50 caractères)"),
  lastName: z
    .string()
    .min(2, "Nom trop court (min 2 caractères)")
    .max(50, "Nom trop long (max 50 caractères)"),
  email: emailValidation,
  phone: swissPhoneValidation,
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 15;
  }, "L'élève doit avoir au moins 15 ans"),
});

// Schema formulaire critique (paiement)
const criticalFormSchema = z
  .object({
    amount: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Montant invalide"
      ),
    method: z.enum(["cash", "card", "bank_transfer", "twint"], {
      errorMap: () => ({ message: "Méthode de paiement requise" }),
    }),
    reference: z.string().min(1, "Référence requise"),
    iban: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.method === "bank_transfer" && !data.iban) {
        return false;
      }
      if (data.method === "bank_transfer" && data.iban) {
        return /^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?[\dA-Z]$/.test(
          data.iban
        );
      }
      return true;
    },
    {
      message: "IBAN suisse requis pour virement bancaire",
      path: ["iban"],
    }
  );

// Schema formulaire recherche
const searchFormSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
  status: z.string().optional(),
});

// ============================================================================
// COMPONENT
// ============================================================================

export function ValidatedFormExample({
  locale = "fr",
  onSuccess,
}: ValidatedFormExampleProps) {
  const [activeTab, setActiveTab] = React.useState("standard");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Validated Form Examples
        </h2>
        <p className="text-muted-foreground">
          Démonstration du hook useValidatedForm avec différents use cases
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="standard">
            Standard Form
            <Badge variant="secondary" className="ml-2">
              onBlur
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="critical">
            Critical Form
            <Badge variant="destructive" className="ml-2">
              onChange
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="search">
            Search Form
            <Badge variant="outline" className="ml-2">
              no validation
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Standard Form */}
        <TabsContent value="standard">
          <StandardFormExample locale={locale} onSuccess={onSuccess} />
        </TabsContent>

        {/* Critical Form */}
        <TabsContent value="critical">
          <CriticalFormExample locale={locale} onSuccess={onSuccess} />
        </TabsContent>

        {/* Search Form */}
        <TabsContent value="search">
          <SearchFormExample locale={locale} onSuccess={onSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// STANDARD FORM EXAMPLE
// ============================================================================

function StandardFormExample({
  locale,
  onSuccess,
}: {
  locale: "fr" | "de" | "it" | "en";
  onSuccess?: (data: any) => void;
}) {
  const form = useValidatedForm({
    schema: standardFormSchema,
    useCase: "create",
    locale,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
    },
    onSubmit: async (data) => {
      console.log("Standard form submitted:", data);
      onSuccess?.(data);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire Standard</CardTitle>
        <CardDescription>
          Validation onBlur • Re-validation onChange après erreur
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Prénom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="Jean"
              />

              {form.formState.errors.firstName && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircleIcon className="h-4 w-4" />

                  {form.formState.errors.firstName.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Dupont"
              />

              {form.formState.errors.lastName && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircleIcon className="h-4 w-4" />

                  {form.formState.errors.lastName.message}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="jean.dupont@example.com"
            />

            {form.formState.errors.email && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.email.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="+41 79 123 45 67"
            />

            {form.formState.errors.phone && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.phone.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">
              Date de naissance <span className="text-destructive">*</span>
            </Label>
            <Input id="birthDate" type="date" {...form.register("birthDate")} />

            {form.formState.errors.birthDate && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.birthDate.message}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              {form.formState.isValid ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2Icon className="h-4 w-4" />
                  Formulaire valide
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertCircleIcon className="h-4 w-4" />
                  Veuillez corriger les erreurs
                </div>
              )}
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Envoi..." : "Créer élève"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// CRITICAL FORM EXAMPLE
// ============================================================================

function CriticalFormExample({
  locale,
  onSuccess,
}: {
  locale: "fr" | "de" | "it" | "en";
  onSuccess?: (data: any) => void;
}) {
  const form = useValidatedForm({
    schema: criticalFormSchema,
    useCase: "payment",
    locale,
    defaultValues: {
      amount: "",
      method: undefined,
      reference: "",
      iban: "",
    },
    onSubmit: async (data) => {
      console.log("Critical form submitted:", data);
      onSuccess?.(data);
    },
  });

  const selectedMethod = form.watch("method");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire Critique (Paiement)</CardTitle>
        <CardDescription>
          Validation onChange • Temps réel • Validation conditionnelle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">
              Montant (CHF) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...form.register("amount")}
              placeholder="150.00"
            />

            {form.formState.errors.amount && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.amount.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">
              Méthode de paiement <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.watch("method")}
              onValueChange={(value) => form.setValue("method", value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Espèces</SelectItem>
                <SelectItem value="card">Carte</SelectItem>
                <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                <SelectItem value="twint">TWINT</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.method && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.method.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">
              Référence <span className="text-destructive">*</span>
            </Label>
            <Input
              id="reference"
              {...form.register("reference")}
              placeholder="INV-2024-001"
            />

            {form.formState.errors.reference && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircleIcon className="h-4 w-4" />

                {form.formState.errors.reference.message}
              </div>
            )}
          </div>

          {selectedMethod === "bank_transfer" && (
            <div className="space-y-2">
              <Label htmlFor="iban">
                IBAN <span className="text-destructive">*</span>
              </Label>
              <Input
                id="iban"
                {...form.register("iban")}
                placeholder="CH93 0076 2011 6238 5295 7"
              />

              {form.formState.errors.iban && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircleIcon className="h-4 w-4" />

                  {form.formState.errors.iban.message}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              {form.formState.isValid ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2Icon className="h-4 w-4" />
                  Paiement valide
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertCircleIcon className="h-4 w-4" />
                  Veuillez corriger les erreurs
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              variant="destructive"
            >
              {form.formState.isSubmitting
                ? "Traitement..."
                : "Enregistrer paiement"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// SEARCH FORM EXAMPLE
// ============================================================================

function SearchFormExample({
  locale,
  onSuccess,
}: {
  locale: "fr" | "de" | "it" | "en";
  onSuccess?: (data: any) => void;
}) {
  const form = useValidatedForm({
    schema: searchFormSchema,
    useCase: "search",
    locale,
    defaultValues: {
      query: "",
      category: "",
      status: "",
    },
    onSubmit: async (data) => {
      console.log("Search form submitted:", data);
      onSuccess?.(data);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire Recherche</CardTitle>
        <CardDescription>
          Pas de validation • onChange • Résultats temps réel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Recherche</Label>
            <Input
              id="query"
              {...form.register("query")}
              placeholder="Rechercher un élève, moniteur..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes</SelectItem>
                  <SelectItem value="students">Élèves</SelectItem>
                  <SelectItem value="instructors">Moniteurs</SelectItem>
                  <SelectItem value="vehicles">Véhicules</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(value) => form.setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Résultats mis à jour automatiquement
            </div>
            <Button type="submit" variant="outline">
              Rechercher
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
