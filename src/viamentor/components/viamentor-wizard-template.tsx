/**
 * VIAMENTOR - Wizard Template Component
 * Template réutilisable pour wizards multi-steps avec best practices
 */

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export interface WizardStep<T = any> {
  /** ID unique du step */
  id: string;

  /** Titre du step */
  title: string;

  /** Description du step */
  description: string;

  /** Composant à afficher */
  component: React.ComponentType<WizardStepComponentProps<T>>;

  /** Fonction de validation */
  validate: (data: T) => boolean | string;

  /** Optionnel: peut être skippé */
  optional?: boolean;

  /** Optionnel: icône du step */
  icon?: React.ReactNode;
}

export interface WizardStepComponentProps<T = any> {
  /** Données actuelles */
  data: T;

  /** Callback pour mettre à jour les données */
  onChange: (data: Partial<T>) => void;

  /** Erreurs de validation */
  errors?: Record<string, string>;
}

export interface WizardProps<T = any> {
  /** Steps du wizard */
  steps: WizardStep<T>[];

  /** Titre du wizard */
  title: string;

  /** Description du wizard */
  description?: string;

  /** Données initiales */
  initialData?: Partial<T>;

  /** Callback quand wizard est complété */
  onComplete: (data: T) => void | Promise<void>;

  /** Callback quand wizard est annulé */
  onCancel?: () => void;

  /** Dialog ouvert/fermé */
  open: boolean;

  /** Callback pour changer l'état ouvert/fermé */
  onOpenChange: (open: boolean) => void;

  /** Afficher la progression en % */
  showProgress?: boolean;

  /** Afficher les numéros de steps */
  showStepNumbers?: boolean;

  /** Largeur du dialog */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

// ============================================================================
// COMPONENT
// ============================================================================

export function Wizard<T = any>({
  steps,
  title,
  description,
  initialData = {} as T,
  onComplete,
  onCancel,
  open,
  onOpenChange,
  showProgress = true,
  showStepNumbers = true,
  size = "lg",
}: WizardProps<T>) {
  // State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<T>(initialData as T);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current step
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Handlers
  const handleDataChange = (newData: Partial<T>) => {
    setData((prev) => ({ ...prev, ...newData }));
    setErrors({}); // Clear errors on change
  };

  const handleNext = async () => {
    // Validate current step
    const validationResult = currentStep.validate(data);

    if (validationResult !== true) {
      if (typeof validationResult === "string") {
        setErrors({ general: validationResult });
      }
      return;
    }

    // Clear errors
    setErrors({});

    // Last step: submit
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        await onComplete(data);
        onOpenChange(false);
        // Reset wizard
        setCurrentStepIndex(0);
        setData(initialData as T);
      } catch (error) {
        setErrors({
          general:
            error instanceof Error ? error.message : "Une erreur est survenue",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Next step
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
      setErrors({});
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
    // Reset wizard
    setCurrentStepIndex(0);
    setData(initialData as T);
    setErrors({});
  };

  // Dialog sizes
  const dialogSizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  // Step component
  const StepComponent = currentStep.component;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-hidden flex flex-col",
          dialogSizes[size]
        )}
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Progress bar */}
        {showProgress && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />

            <p className="text-xs text-muted-foreground text-center">
              Étape {currentStepIndex + 1} sur {steps.length}
            </p>
          </div>
        )}

        {/* Steps indicators */}
        <div className="flex items-center justify-between gap-2 py-4">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            const isFuture = index > currentStepIndex;

            return (
              <div key={step.id} className="flex-1">
                <div className="flex items-center gap-2">
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                      isCompleted &&
                        "bg-primary border-primary text-primary-foreground",
                      isActive && "border-primary text-primary",
                      isFuture && "border-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : showStepNumbers ? (
                      <span className="text-sm font-medium">{index + 1}</span>
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Step title (hidden on mobile) */}
                  <div className="hidden md:block flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isActive && "text-foreground",
                        !isActive && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "hidden md:block flex-1 h-0.5 mx-2",
                        isCompleted ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current step content */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{currentStep.title}</h3>
              <p className="text-sm text-muted-foreground">
                {currentStep.description}
              </p>
            </div>

            {/* Error message */}
            {errors.general && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            {/* Step component */}
            <StepComponent
              data={data}
              onChange={handleDataChange}
              errors={errors}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep || isSubmitting}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Précédent
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>

            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? (
                "Création..."
              ) : isLastStep ? (
                "Créer"
              ) : (
                <>
                  Suivant
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * Exemple d'utilisation du Wizard Template
 *
 * interface StudentFormData {
 *   firstName: string
 *   lastName: string
 *   email: string
 *   phone: string
 *   category: string
 *   startDate: Date
 * }
 *
 * const steps: WizardStep<StudentFormData>[] = [
 *   {
 *     id: "identity",
 *     title: "Identité",
 *     description: "Informations personnelles de l'élève",
 *     component: IdentityStep,
 *     validate: (data) => {
 *       if (!data.firstName || !data.lastName) {
 *         return "Prénom et nom requis"
 *       }
 *       return true
 *     },
 *   },
 *   {
 *     id: "contact",
 *     title: "Contact",
 *     description: "Coordonnées de l'élève",
 *     component: ContactStep,
 *     validate: (data) => {
 *       if (!data.email || !data.phone) {
 *         return "Email et téléphone requis"
 *       }
 *       return true
 *     },
 *   },
 *   {
 *     id: "training",
 *     title: "Formation",
 *     description: "Détails de la formation",
 *     component: TrainingStep,
 *     validate: (data) => {
 *       if (!data.category || !data.startDate) {
 *         return "Catégorie et date de début requises"
 *       }
 *       return true
 *     },
 *   },
 * ]
 *
 * function CreateStudentWizard() {
 *   const [open, setOpen] = useState(false)
 *
 *   const handleComplete = async (data: StudentFormData) => {
 *     await createStudent(data)
 *     toast.success("Élève créé avec succès")
 *   }
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>
 *         Créer un élève
 *       </Button>
 *
 *       <Wizard
 *         steps={steps}
 *         title="Créer un élève"
 *         description="Suivez les étapes pour créer un nouvel élève"
 *         open={open}
 *         onOpenChange={setOpen}
 *         onComplete={handleComplete}
 *         showProgress
 *         showStepNumbers
 *         size="lg"
 *       />
 *     </>
 *   )
 * }
 */
