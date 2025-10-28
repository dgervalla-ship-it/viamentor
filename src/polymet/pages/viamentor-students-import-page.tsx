/**
 * VIAMENTOR - Students Import Page
 * Page d'import d'élèves avec modèle CSV
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  UploadIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  InfoIcon,
  ArrowLeftIcon,
} from "lucide-react";

interface StudentsImportPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

export function StudentsImportPage({ locale = "fr" }: StudentsImportPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    success: number;
    errors: number;
    warnings: string[];
  } | null>(null);

  const t = {
    fr: {
      title: "Importer des élèves",
      description:
        "Importez plusieurs élèves en une seule fois via un fichier CSV",
      downloadTemplate: "Télécharger le modèle CSV",
      templateInfo:
        "Le modèle contient toutes les colonnes nécessaires avec des exemples",
      uploadFile: "Sélectionner un fichier CSV",
      dragDrop: "ou glissez-déposez le fichier ici",
      fileSelected: "Fichier sélectionné",
      startImport: "Démarrer l'import",
      importing: "Import en cours...",
      importSuccess: "Import terminé avec succès",
      importErrors: "Import terminé avec des erreurs",
      successCount: "élèves importés avec succès",
      errorCount: "erreurs détectées",
      warnings: "Avertissements",
      backToList: "Retour à la liste",
      requiredFields: "Champs obligatoires",
      requiredFieldsList:
        "Nom, Prénom, Date de naissance, Email, Téléphone, Adresse",
      optionalFields: "Champs optionnels",
      optionalFieldsList: "Catégorie permis, Moniteur assigné, Notes",
      instructions: "Instructions",
      step1: "Téléchargez le modèle CSV",
      step2: "Remplissez les informations des élèves",
      step3: "Uploadez le fichier complété",
      step4: "Vérifiez les résultats de l'import",
    },
  };

  const translations = t[locale];

  const handleDownloadTemplate = () => {
    // Créer un fichier CSV modèle
    const csvContent = `Nom,Prénom,Date de naissance,Email,Téléphone,Adresse,Code postal,Ville,Canton,Catégorie permis,Moniteur assigné,Notes
Dupont,Jean,1995-03-15,jean.dupont@email.com,+41791234567,"Rue de la Paix 12",1200,Genève,GE,B,,"Élève motivé"
Martin,Sophie,1998-07-22,sophie.martin@email.com,+41792345678,"Avenue du Lac 45",1003,Lausanne,VD,B,,"Débutante"`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modele_import_eleves.csv";
    link.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);

    // Simuler l'import avec progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simuler le résultat après 3 secondes
    setTimeout(() => {
      setImporting(false);
      setResult({
        success: 2,
        errors: 0,
        warnings: ["L'élève Jean Dupont existe déjà - ligne ignorée"],
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/students">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {translations.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {translations.description}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-primary" />

              {translations.instructions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>{translations.step1}</li>
              <li>{translations.step2}</li>
              <li>{translations.step3}</li>
              <li>{translations.step4}</li>
            </ol>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-medium text-sm mb-2">
                  {translations.requiredFields}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {translations.requiredFieldsList}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">
                  {translations.optionalFields}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {translations.optionalFieldsList}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Template */}
        <Card>
          <CardHeader>
            <CardTitle>1. {translations.downloadTemplate}</CardTitle>
            <CardDescription>{translations.templateInfo}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDownloadTemplate}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />

              {translations.downloadTemplate}
            </Button>
          </CardContent>
        </Card>

        {/* Upload File */}
        <Card>
          <CardHeader>
            <CardTitle>2. {translations.uploadFile}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />

              <label htmlFor="csv-upload" className="cursor-pointer">
                <FileSpreadsheetIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

                <p className="text-sm font-medium mb-1">
                  {translations.uploadFile}
                </p>
                <p className="text-xs text-muted-foreground">
                  {translations.dragDrop}
                </p>
              </label>
            </div>

            {file && (
              <Alert>
                <CheckCircle2Icon className="h-4 w-4" />

                <AlertDescription>
                  {translations.fileSelected}: <strong>{file.name}</strong>
                </AlertDescription>
              </Alert>
            )}

            {file && !importing && !result && (
              <Button onClick={handleImport} className="w-full">
                <UploadIcon className="mr-2 h-4 w-4" />

                {translations.startImport}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Import Progress */}
        {importing && (
          <Card>
            <CardHeader>
              <CardTitle>3. {translations.importing}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />

              <p className="text-sm text-muted-foreground mt-2 text-center">
                {progress}%
              </p>
            </CardContent>
          </Card>
        )}

        {/* Import Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.errors === 0 ? (
                  <>
                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />

                    {translations.importSuccess}
                  </>
                ) : (
                  <>
                    <AlertCircleIcon className="h-5 w-5 text-orange-500" />

                    {translations.importErrors}
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result.success}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {translations.successCount}
                  </p>
                </div>
                {result.errors > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {result.errors}
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {translations.errorCount}
                    </p>
                  </div>
                )}
              </div>

              {result.warnings.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    {translations.warnings}
                  </h4>
                  <ul className="space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <AlertCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-500" />

                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button asChild className="w-full">
                <Link to="/students">{translations.backToList}</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
