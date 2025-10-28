/**
 * VIAMENTOR - Onboarding Page
 * Configuration initiale tenant avec wizard fullscreen non-skippable
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OnboardingWizard } from "@/viamentor/components/viamentor-onboarding-wizard";
import { Loader2 } from "lucide-react";

/**
 * Mock tenant data
 */
interface TenantStatus {
  id: string;
  setupCompleted: boolean;
  name?: string;
}

/**
 * Onboarding Page Component
 */
export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tenantStatus, setTenantStatus] = useState<TenantStatus | null>(null);
  const [locale, setLocale] = useState<"fr" | "de" | "it" | "en">("fr");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  /**
   * Check tenant setup status
   */
  useEffect(() => {
    const checkTenantStatus = async () => {
      // Simuler API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock: Vérifier si tenant a complété setup
      const mockTenant: TenantStatus = {
        id: "tenant-123",
        setupCompleted: false, // false = doit passer par onboarding
      };

      setTenantStatus(mockTenant);
      setIsLoading(false);

      // Si déjà complété, marquer pour redirect
      if (mockTenant.setupCompleted) {
        setShouldRedirect(true);
      }
    };

    checkTenantStatus();
  }, []);

  /**
   * Handle onboarding completion
   */
  const handleComplete = async () => {
    // Simuler API call pour marquer setup_completed = true
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock: Update tenant status
    if (tenantStatus) {
      setTenantStatus({ ...tenantStatus, setupCompleted: true });
    }

    // Marquer pour redirect
    setShouldRedirect(true);
  };

  /**
   * Detect browser locale
   */
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (["fr", "de", "it", "en"].includes(browserLang)) {
      setLocale(browserLang as "fr" | "de" | "it" | "en");
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />

          <p className="text-muted-foreground">
            Chargement de la configuration...
          </p>
        </div>
      </div>
    );
  }

  // Tenant already setup - redirect to dashboard
  if (shouldRedirect || tenantStatus?.setupCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Configuration déjà complétée</h1>
          <p className="text-muted-foreground mb-4">
            Redirection vers le tableau de bord...
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Aller au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  // Render wizard (fullscreen, non-skippable)
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <OnboardingWizard locale={locale} onComplete={handleComplete} />
    </div>
  );
}
