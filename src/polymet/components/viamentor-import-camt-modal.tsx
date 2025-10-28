/**
 * VIAMENTOR - Import Camt Modal
 * Modal import Camt.054 avec wizard 4 steps
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  parseCamtXML,
  type CamtFileData,
} from "@/polymet/data/viamentor-camt-parser-schemas";
import { CamtMatchingTable } from "@/polymet/components/viamentor-camt-matching-table";
import {
  mockCamtTransactions,
  mockCamtFile,
} from "@/polymet/data/viamentor-payments-data";
import { type PaymentsTranslations } from "@/polymet/data/viamentor-payments-i18n";

interface ImportCamtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PaymentsTranslations;
  onComplete?: (data: any) => Promise<void>;
}

export function ImportCamtModal({
  open,
  onOpenChange,
  locale,
  onComplete,
}: ImportCamtModalProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<CamtFileData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createAccounting, setCreateAccounting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);

    try {
      const parsed = await parseCamtXML(uploadedFile);
      setParsedData(parsed);
      setStep(2);
    } catch (error) {
      alert(locale?.importCamt.step1InvalidXML || "Fichier XML invalide");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async () => {
    setIsProcessing(true);
    setStep(4);

    // Simulate import progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    await onComplete?.({
      file: mockCamtFile,
      transactions: mockCamtTransactions,
      createAccounting,
    });

    setIsProcessing(false);
    onOpenChange(false);
  };

  const stats = {
    auto: mockCamtTransactions.filter(
      (tx) => tx.matchingStatus === "auto_matched"
    ).length,
    verify: mockCamtTransactions.filter(
      (tx) => tx.matchingStatus === "to_verify"
    ).length,
    unmatched: mockCamtTransactions.filter(
      (tx) => tx.matchingStatus === "unmatched"
    ).length,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {locale?.importCamt.title || "Import Camt.054"}
          </DialogTitle>
        </DialogHeader>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />

          <AlertDescription>
            {locale?.importCamt.infoAlert ||
              "Format XML standard bancaire suisse"}
          </AlertDescription>
        </Alert>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              {locale?.importCamt.step1Title || "Étape 1: Téléchargement"}
            </h3>
            <div
              className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-accent cursor-pointer"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

              <p className="text-lg font-medium mb-2">
                {locale?.importCamt.step1Upload || "Déposer fichier XML ici"}
              </p>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />

                {locale?.importCamt.step1Browse || "Parcourir"}
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".xml"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileUpload(e.target.files[0])
                }
              />
            </div>
            {isProcessing && (
              <p className="text-center text-muted-foreground">
                {locale?.importCamt.step1Analyzing || "Analyse..."}
              </p>
            )}
          </div>
        )}

        {/* Step 2: Preview */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              {locale?.importCamt.step2Title || "Étape 2: Aperçu"}
            </h3>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale?.importCamt.step2Bank || "Banque"}
                    </p>
                    <p className="font-medium">{mockCamtFile.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale?.importCamt.step2IBAN || "IBAN"}
                    </p>
                    <p className="font-medium">{mockCamtFile.iban}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale?.importCamt.step2Period || "Période"}
                    </p>
                    <p className="font-medium">
                      {mockCamtFile.periodStart} - {mockCamtFile.periodEnd}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale?.importCamt.step2Transactions || "Transactions"}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="default">
                        {mockCamtFile.creditsCount}{" "}
                        {locale?.importCamt.step2Credits || "Crédits"}
                      </Badge>
                      <Badge variant="secondary">
                        {mockCamtFile.debitsCount}{" "}
                        {locale?.importCamt.step2Debits || "Débits"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {locale?.importCamt.step2TotalCredits || "Total crédits"}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockCamtFile.totalCredits.toFixed(2)} CHF
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button onClick={() => setStep(3)}>
                {locale?.importCamt.step2Continue || "Continuer"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Matching */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              {locale?.importCamt.step3Title || "Étape 3: Réconciliation"}
            </h3>
            <CamtMatchingTable
              transactions={mockCamtTransactions}
              locale={locale}
            />

            {stats.unmatched > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />

                <AlertDescription>
                  {locale?.importCamt.step4WarningUnmatched ||
                    "Certains paiements nécessitent validation"}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                id="accounting"
                checked={createAccounting}
                onCheckedChange={(checked) =>
                  setCreateAccounting(checked as boolean)
                }
              />

              <Label htmlFor="accounting">
                {locale?.importCamt.step4AccountingAuto ||
                  "Créer écritures comptables"}
              </Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Retour
              </Button>
              <Button onClick={handleImport}>
                <CheckCircle2 className="h-4 w-4 mr-2" />

                {locale?.importCamt.step4Submit || "Importer"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Processing */}
        {step === 4 && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <h3 className="font-semibold mb-4">
                {locale?.importCamt.step4Submitting || "Import en cours..."}
              </h3>
              <Progress value={progress} className="mb-2" />

              <p className="text-sm text-muted-foreground">
                {progress}% -{" "}
                {locale?.importCamt.step4Progress
                  ?.replace("{current}", progress.toString())
                  .replace("{total}", "100") || `${progress}/100`}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
