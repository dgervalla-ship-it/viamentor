/**
 * Viamentor - Cookie Consent Banner
 * Conforme RGPD + ePrivacy Directive
 */

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { X, Cookie, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Switch } from "./switch";
import { Label } from "./label";

export interface CookiePreferences {
  essential: boolean; // Toujours true
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  performance: false,
  marketing: false,
};

export interface CookieConsentBannerProps {
  onAccept?: (preferences: CookiePreferences) => void;
  onReject?: () => void;
}

export function CookieConsentBanner({ onAccept, onReject }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>(DEFAULT_PREFERENCES);

  React.useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait son choix
    const consent = localStorage.getItem('viamentor-cookie-consent');
    if (!consent) {
      // Afficher après 2 secondes
      setTimeout(() => setIsVisible(true), 2000);
    } else {
      // Charger les préférences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('viamentor-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('viamentor-cookie-consent-date', new Date().toISOString());
    
    // Activer/désactiver les cookies selon les préférences
    if (!prefs.analytics) {
      // Désactiver Google Analytics
      window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }
    
    onAccept?.(prefs);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      performance: true,
      marketing: false, // Pas encore utilisé
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    savePreferences(DEFAULT_PREFERENCES);
    setIsVisible(false);
    onReject?.();
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setIsVisible(false);
  };

  const handleToggle = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === 'essential' ? true : value, // Essential toujours true
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Banner Principal */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-background border-t border-border shadow-lg",
          "p-4 md:p-6"
        )}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icône et Texte */}
          <div className="flex-1 flex items-start gap-3">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                🍪 Nous utilisons des cookies
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nous utilisons des cookies essentiels pour le fonctionnement du site, 
                et des cookies analytiques (avec votre consentement) pour améliorer votre expérience. 
                Consultez notre{" "}
                <a href="/legal/cookies" className="underline hover:text-primary">
                  Politique Cookies
                </a>
                {" "}pour plus d'informations.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Personnaliser
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectAll}
            >
              Refuser tout
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Accepter tout
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Paramètres */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres des cookies
            </DialogTitle>
            <DialogDescription>
              Choisissez les catégories de cookies que vous souhaitez autoriser.
              Les cookies essentiels sont toujours activés pour le fonctionnement du site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Cookies Essentiels */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label className="text-base font-medium">
                  🔒 Cookies Essentiels
                </Label>
                <p className="text-sm text-muted-foreground">
                  Nécessaires au fonctionnement du site (authentification, langue, thème).
                  Ces cookies ne peuvent pas être désactivés.
                </p>
              </div>
              <Switch
                checked={true}
                disabled
                className="mt-1"
              />
            </div>

            {/* Cookies Analytiques */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="analytics" className="text-base font-medium cursor-pointer">
                  📊 Cookies Analytiques
                </Label>
                <p className="text-sm text-muted-foreground">
                  Google Analytics et Vercel Analytics pour mesurer l'audience et améliorer le site.
                  Données anonymisées (IP masquée).
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => handleToggle('analytics', checked)}
                className="mt-1"
              />
            </div>

            {/* Cookies Performance */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="performance" className="text-base font-medium cursor-pointer">
                  ⚡ Cookies de Performance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Sentry pour détecter et corriger les bugs. Permet d'améliorer la stabilité.
                </p>
              </div>
              <Switch
                id="performance"
                checked={preferences.performance}
                onCheckedChange={(checked) => handleToggle('performance', checked)}
                className="mt-1"
              />
            </div>

            {/* Cookies Marketing */}
            <div className="flex items-start justify-between space-x-4 opacity-50">
              <div className="flex-1 space-y-1">
                <Label htmlFor="marketing" className="text-base font-medium cursor-pointer">
                  📢 Cookies Marketing
                </Label>
                <p className="text-sm text-muted-foreground">
                  Publicités ciblées et remarketing. (Actuellement non utilisés)
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => handleToggle('marketing', checked)}
                disabled
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-primary"
            >
              Enregistrer mes choix
            </Button>
          </DialogFooter>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Vous pouvez modifier vos choix à tout moment dans{" "}
            <a href="/settings/privacy" className="underline hover:text-primary">
              Paramètres → Confidentialité
            </a>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Hook pour gérer les préférences cookies
 */
export function useCookieConsent() {
  const [preferences, setPreferences] = React.useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem('viamentor-cookie-consent');
    if (consent) {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        setHasConsent(true);
      } catch (e) {
        console.error('Error loading cookie consent:', e);
      }
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<CookiePreferences>) => {
    const updated = { ...preferences, ...newPrefs, essential: true };
    setPreferences(updated);
    localStorage.setItem('viamentor-cookie-consent', JSON.stringify(updated));
    localStorage.setItem('viamentor-cookie-consent-date', new Date().toISOString());
    setHasConsent(true);
  };

  const revokeConsent = () => {
    localStorage.removeItem('viamentor-cookie-consent');
    localStorage.removeItem('viamentor-cookie-consent-date');
    setPreferences(DEFAULT_PREFERENCES);
    setHasConsent(false);
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    revokeConsent,
  };
}

export { type CookiePreferences };

