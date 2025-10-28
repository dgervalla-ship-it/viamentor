/**
 * VIAMENTOR GDPR Process Wizard
 *
 * Wizard traitement requests avec 4 steps validation
 *
 * @module components/viamentor-gdpr-process-wizard
 * @version 1.0.0
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  UploadIcon,
  FileTextIcon,
} from "lucide-react";
import { GDPRRequest, RequestType } from "@/polymet/data/viamentor-gdpr-data";
import {
  identityVerificationSchema,
  dataCollectionSchema,
  deliverySchema,
} from "@/polymet/data/viamentor-gdpr-schemas";

interface ProcessWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: GDPRRequest | null;
  onComplete?: (requestId: string) => void;
}

export function GDPRProcessWizard({
  open,
  onOpenChange,
  request,
  onComplete,
}: ProcessWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onComplete?.(request?.id || "");
    setIsProcessing(false);
    onOpenChange(false);
    setCurrentStep(1);
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Traiter la requête {request.type}
          </DialogTitle>
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="font-medium">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Identity Verification */}
          {currentStep === 1 && (
            <IdentityVerificationStep request={request} onNext={handleNext} />
          )}

          {/* Step 2: Type-specific processing */}
          {currentStep === 2 && request.type === "Access" && (
            <DataCollectionStep onNext={handleNext} />
          )}
          {currentStep === 2 && request.type === "Delete" && (
            <DeletionStrategyStep onNext={handleNext} />
          )}
          {currentStep === 2 && request.type === "Export" && (
            <ExportGenerationStep onNext={handleNext} />
          )}
          {currentStep === 2 && request.type === "Rectify" && (
            <RectificationStep request={request} onNext={handleNext} />
          )}

          {/* Step 3: Generate/Execute */}
          {currentStep === 3 && (
            <GenerateExecuteStep
              requestType={request.type}
              onNext={handleNext}
            />
          )}

          {/* Step 4: Delivery/Certificate */}
          {currentStep === 4 && (
            <DeliveryStep
              requestType={request.type}
              onComplete={handleComplete}
              isProcessing={isProcessing}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isProcessing}
          >
            Précédent
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// STEP COMPONENTS
// ============================================================================

function IdentityVerificationStep({
  request,
  onNext,
}: {
  request: GDPRRequest;
  onNext: () => void;
}) {
  const [verified, setVerified] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Vérifier l'identité de l'utilisateur
      </h3>

      <Alert>
        <AlertDescription>
          Utilisateur: <strong>{request.userName}</strong> ({request.userEmail})
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        <Label>Document d'identité (Passeport/Carte d'identité)</Label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <UploadIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />

          <p className="text-sm text-muted-foreground">
            Glisser-déposer ou cliquer pour télécharger
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPEG, PNG - Max 5MB
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="manual-verify"
          checked={verified}
          onCheckedChange={(checked) => setVerified(checked as boolean)}
        />

        <Label htmlFor="manual-verify" className="cursor-pointer">
          Identité vérifiée manuellement par Jean Dupont (DPO)
        </Label>
      </div>

      <Textarea placeholder="Notes de vérification (optionnel)..." />

      <Button onClick={onNext} disabled={!verified} className="w-full">
        Continuer
      </Button>
    </div>
  );
}

function DataCollectionStep({ onNext }: { onNext: () => void }) {
  const [collecting, setCollecting] = useState(false);
  const [collected, setCollected] = useState(false);

  const handleCollect = async () => {
    setCollecting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCollected(true);
    setCollecting(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Collecter les données personnelles
      </h3>

      {!collected ? (
        <Button
          onClick={handleCollect}
          disabled={collecting}
          className="w-full"
        >
          {collecting
            ? "Collecte en cours..."
            : "Lancer la collecte automatique"}
        </Button>
      ) : (
        <>
          <Alert>
            <CheckCircle2Icon className="h-4 w-4" />

            <AlertDescription>
              Données collectées conformément à l'Art. 15 RGPD
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Données trouvées - Sélectionner pour export:</Label>
            {[
              {
                label: "Profil (Nom, Email, Téléphone, Adresse)",
                count: "1 enregistrement",
              },
              { label: "Leçons historique", count: "24 leçons" },
              { label: "Factures", count: "8 factures" },
              { label: "Communications", count: "45 emails" },
              { label: "Audit logs", count: "156 actions" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 p-3 bg-muted rounded-md"
              >
                <Checkbox defaultChecked={idx < 4} id={`data-${idx}`} />

                <Label
                  htmlFor={`data-${idx}`}
                  className="flex-1 cursor-pointer"
                >
                  {item.label}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({item.count})
                  </span>
                </Label>
              </div>
            ))}
          </div>

          <Button onClick={onNext} className="w-full">
            Continuer
          </Button>
        </>
      )}
    </div>
  );
}

function DeletionStrategyStep({ onNext }: { onNext: () => void }) {
  const [strategy, setStrategy] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stratégie de suppression</h3>

      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />

        <AlertDescription>
          ⚠️ Élève a 3 leçons planifiées - Contacter School Admin avant
          suppression
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        {[
          {
            value: "full",
            label: "Suppression complète",
            desc: "Suppression totale de la base de données (IRRÉVERSIBLE)",
          },
          {
            value: "anonymize",
            label: "Anonymisation statistiques",
            desc: "Garde données statistiques anonymisées",
          },
          {
            value: "archive",
            label: "Archivage temporaire",
            desc: "Déplace vers système archivage (90j puis auto-delete)",
          },
        ].map((option) => (
          <div
            key={option.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              strategy === option.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setStrategy(option.value)}
          >
            <p className="font-medium">{option.label}</p>
            <p className="text-sm text-muted-foreground">{option.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="confirm-eligible"
          checked={confirmed}
          onCheckedChange={(checked) => setConfirmed(checked as boolean)}
        />

        <Label htmlFor="confirm-eligible" className="cursor-pointer">
          Confirmé éligible suppression Art. 17 RGPD
        </Label>
      </div>

      <Button
        onClick={onNext}
        disabled={!strategy || !confirmed}
        className="w-full"
      >
        Continuer
      </Button>
    </div>
  );
}

function ExportGenerationStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Génération de l'export</h3>
      <Alert>
        <FileTextIcon className="h-4 w-4" />

        <AlertDescription>
          Export ZIP généré avec chiffrement AES-256
        </AlertDescription>
      </Alert>
      <Button onClick={onNext} className="w-full">
        Continuer vers la livraison
      </Button>
    </div>
  );
}

function RectificationStep({
  request,
  onNext,
}: {
  request: GDPRRequest;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rectification des données</h3>
      <div className="space-y-3">
        <div>
          <Label>Prénom</Label>
          <Input defaultValue={request.userName.split(" ")[0]} />
        </div>
        <div>
          <Label>Nom</Label>
          <Input defaultValue={request.userName.split(" ")[1]} />
        </div>
        <div>
          <Label>Email</Label>
          <Input defaultValue={request.userEmail} />
        </div>
        <div>
          <Label>Justification</Label>
          <Textarea placeholder="Raison de la modification..." />
        </div>
      </div>
      <Button onClick={onNext} className="w-full">
        Continuer
      </Button>
    </div>
  );
}

function GenerateExecuteStep({
  requestType,
  onNext,
}: {
  requestType: RequestType;
  onNext: () => void;
}) {
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setGenerated(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {requestType === "Access" && "Générer le rapport"}
        {requestType === "Delete" && "Exécuter la suppression"}
        {requestType === "Export" && "Finaliser l'export"}
        {requestType === "Rectify" && "Appliquer les modifications"}
      </h3>

      {!generated ? (
        <Button onClick={handleGenerate} className="w-full">
          {requestType === "Delete" ? "Exécuter" : "Générer"}
        </Button>
      ) : (
        <>
          <Alert>
            <CheckCircle2Icon className="h-4 w-4" />

            <AlertDescription>
              {requestType === "Delete"
                ? "Suppression effectuée avec succès"
                : "Rapport généré avec succès"}
            </AlertDescription>
          </Alert>
          <Button onClick={onNext} className="w-full">
            Continuer
          </Button>
        </>
      )}
    </div>
  );
}

function DeliveryStep({
  requestType,
  onComplete,
  isProcessing,
}: {
  requestType: RequestType;
  onComplete: () => void;
  isProcessing: boolean;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {requestType === "Delete" ? "Certificat de destruction" : "Livraison"}
      </h3>

      <div className="space-y-3">
        <div>
          <Label>Email destinataire</Label>
          <Input type="email" placeholder="user@example.com" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="secure-link" defaultChecked />

          <Label htmlFor="secure-link" className="cursor-pointer">
            Lien sécurisé (expiration 7j, password protected)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="send-email" defaultChecked />

          <Label htmlFor="send-email" className="cursor-pointer">
            Envoyer email de notification
          </Label>
        </div>
      </div>

      <Button onClick={onComplete} disabled={isProcessing} className="w-full">
        {isProcessing ? "Envoi en cours..." : "Envoyer et compléter la requête"}
      </Button>
    </div>
  );
}
