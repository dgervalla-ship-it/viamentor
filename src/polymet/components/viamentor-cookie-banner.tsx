/**
 * VIAMENTOR - Cookie Banner Component
 * Banner de consentement cookies avec gestion granulaire RGPD
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import { CookieIcon, SettingsIcon, XIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface CookieBannerProps {
  locale?: MarketingLocale;
  onAccept?: (preferences: CookiePreferences) => void;
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CookieBanner({ locale = "fr", onAccept }: CookieBannerProps) {
  const t = getMarketingTranslations(locale);
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyEssential);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
    setShowCustomize(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setIsVisible(false);
    onAccept?.(prefs);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CookieIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t.legal.cookies.banner.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.legal.cookies.banner.message}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCustomize(true)}
                className="flex-1 md:flex-none"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />

                {t.legal.cookies.banner.customize}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRejectAll}
                className="flex-1 md:flex-none"
              >
                {t.legal.cookies.banner.rejectAll}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none"
              >
                {t.legal.cookies.banner.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Dialog */}
      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.legal.cookies.banner.customize}</DialogTitle>
            <DialogDescription>{t.legal.cookies.intro}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-foreground">
                    {t.legal.cookies.types.essential}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Requis
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cookies nécessaires au fonctionnement du site. Ne peuvent pas
                  être désactivés.
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  {t.legal.cookies.types.analytics}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Cookies pour analyser l'utilisation du site et améliorer
                  l'expérience utilisateur.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  {t.legal.cookies.types.marketing}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Cookies pour personnaliser les publicités et mesurer
                  l'efficacité des campagnes.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setShowCustomize(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveCustom}>
              Enregistrer mes préférences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
