/**
 * VIAMENTOR - 403 Unauthorized Page
 * Page d'erreur 403 accès refusé avec gestion RBAC
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  HomeIcon,
  ArrowLeftIcon,
  ShieldAlertIcon,
  LockIcon,
  InfoIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface UnauthorizedPageProps {
  locale?: "fr" | "de" | "it" | "en";
  reason?: "role" | "permission" | "subscription" | "feature";
  requiredRole?: string;
  requiredPermission?: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Accès refusé",
    subtitle: "Erreur 403",
    description:
      "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
    reasons: {
      role: "Votre rôle actuel ne permet pas d'accéder à cette fonctionnalité.",
      permission:
        "Vous n'avez pas la permission spécifique requise pour cette action.",
      subscription:
        "Cette fonctionnalité nécessite un abonnement de niveau supérieur.",
      feature:
        "Cette fonctionnalité n'est pas activée pour votre établissement.",
    },
    whatToDo: "Que faire ?",
    suggestions: [
      "Vérifiez que vous êtes connecté avec le bon compte",
      "Contactez votre administrateur pour demander les accès nécessaires",
      "Consultez la documentation sur les rôles et permissions",
    ],

    goHome: "Retour à l'accueil",
    goBack: "Page précédente",
    contactAdmin: "Contacter l'administrateur",
    viewDocs: "Voir la documentation",
    currentRole: "Votre rôle actuel",
    requiredRole: "Rôle requis",
    requiredPermission: "Permission requise",
  },
  de: {
    title: "Zugriff verweigert",
    subtitle: "Fehler 403",
    description:
      "Sie haben nicht die erforderlichen Berechtigungen für diese Seite.",
    reasons: {
      role: "Ihre aktuelle Rolle erlaubt keinen Zugriff auf diese Funktion.",
      permission:
        "Sie haben nicht die spezifische Berechtigung für diese Aktion.",
      subscription: "Diese Funktion erfordert ein höheres Abonnement-Level.",
      feature: "Diese Funktion ist für Ihre Einrichtung nicht aktiviert.",
    },
    whatToDo: "Was tun?",
    suggestions: [
      "Überprüfen Sie, ob Sie mit dem richtigen Konto angemeldet sind",
      "Kontaktieren Sie Ihren Administrator für die erforderlichen Zugriffe",
      "Konsultieren Sie die Dokumentation zu Rollen und Berechtigungen",
    ],

    goHome: "Zur Startseite",
    goBack: "Vorherige Seite",
    contactAdmin: "Administrator kontaktieren",
    viewDocs: "Dokumentation ansehen",
    currentRole: "Ihre aktuelle Rolle",
    requiredRole: "Erforderliche Rolle",
    requiredPermission: "Erforderliche Berechtigung",
  },
  it: {
    title: "Accesso negato",
    subtitle: "Errore 403",
    description: "Non hai i permessi necessari per accedere a questa pagina.",
    reasons: {
      role: "Il tuo ruolo attuale non permette l'accesso a questa funzionalità.",
      permission: "Non hai il permesso specifico richiesto per questa azione.",
      subscription:
        "Questa funzionalità richiede un abbonamento di livello superiore.",
      feature: "Questa funzionalità non è attivata per il tuo istituto.",
    },
    whatToDo: "Cosa fare?",
    suggestions: [
      "Verifica di essere connesso con l'account corretto",
      "Contatta il tuo amministratore per richiedere gli accessi necessari",
      "Consulta la documentazione sui ruoli e permessi",
    ],

    goHome: "Torna alla home",
    goBack: "Pagina precedente",
    contactAdmin: "Contatta l'amministratore",
    viewDocs: "Vedi documentazione",
    currentRole: "Il tuo ruolo attuale",
    requiredRole: "Ruolo richiesto",
    requiredPermission: "Permesso richiesto",
  },
  en: {
    title: "Access denied",
    subtitle: "Error 403",
    description:
      "You do not have the necessary permissions to access this page.",
    reasons: {
      role: "Your current role does not allow access to this feature.",
      permission:
        "You do not have the specific permission required for this action.",
      subscription: "This feature requires a higher subscription level.",
      feature: "This feature is not enabled for your institution.",
    },
    whatToDo: "What to do?",
    suggestions: [
      "Check that you are logged in with the correct account",
      "Contact your administrator to request the necessary access",
      "Consult the documentation on roles and permissions",
    ],

    goHome: "Back to home",
    goBack: "Previous page",
    contactAdmin: "Contact administrator",
    viewDocs: "View documentation",
    currentRole: "Your current role",
    requiredRole: "Required role",
    requiredPermission: "Required permission",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function UnauthorizedPage({
  locale = "fr",
  reason = "permission",
  requiredRole,
  requiredPermission,
}: UnauthorizedPageProps) {
  const t = translations[locale];

  const handleGoBack = () => {
    console.warn(
      "Prevented function call: `window.history.back()`"
    ) /*TODO: Do not use window.history for navigation. Use react-router instead.*/;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                V
              </span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              VIAMENTOR
            </span>
          </div>
        </div>

        {/* Error Card */}
        <Card className="p-8 md:p-12">
          {/* 403 Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlertIcon className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Error Code */}
          <div className="text-center text-6xl md:text-8xl font-bold text-muted-foreground mb-4">
            403
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t.title}
          </h1>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-6">
            {t.description}
          </p>

          {/* Reason Alert */}
          <Alert className="mb-6">
            <LockIcon className="w-4 h-4" />

            <AlertDescription>{t.reasons[reason]}</AlertDescription>
          </Alert>

          {/* Required Info */}
          {(requiredRole || requiredPermission) && (
            <div className="bg-muted rounded-lg p-4 mb-6 space-y-2">
              {requiredRole && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.requiredRole}:
                  </span>
                  <span className="font-medium text-foreground">
                    {requiredRole}
                  </span>
                </div>
              )}
              {requiredPermission && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.requiredPermission}:
                  </span>
                  <span className="font-medium text-foreground">
                    {requiredPermission}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild size="lg">
              <Link to="/">
                <HomeIcon className="w-4 h-4 mr-2" />

                {t.goHome}
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleGoBack}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />

              {t.goBack}
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8" />

          {/* What to do */}
          <div className="text-left">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <InfoIcon className="w-4 h-4" />

              {t.whatToDo}
            </h2>
            <ul className="space-y-2 mb-6">
              {t.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>

            {/* Help Links */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                {t.contactAdmin}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full sm:w-auto"
              >
                <Link to="/docs">{t.viewDocs}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
