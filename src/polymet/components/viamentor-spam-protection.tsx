/**
 * VIAMENTOR - Spam Protection Component
 * Protection spam avec honeypot, rate limiting, fingerprinting
 */

"use client";

import { useState, useEffect } from "react";
import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/polymet/data/viamentor-contact-public-i18n";
import {
  checkRateLimit,
  incrementRateLimit,
  generateFingerprint,
  detectBrowser,
  detectDevice,
  detectOS,
  type LeadMetadata,
} from "@/polymet/data/viamentor-contact-public-data";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon, ShieldCheckIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface SpamProtectionProps {
  locale?: ContactPublicLocale;
  onMetadataReady?: (metadata: LeadMetadata) => void;
  onRateLimitExceeded?: () => void;
  children: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SpamProtection({
  locale = "fr",
  onMetadataReady,
  onRateLimitExceeded,
  children,
}: SpamProtectionProps) {
  const t = contactPublicTranslations[locale];
  const [honeypotValue, setHoneypotValue] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [metadata, setMetadata] = useState<LeadMetadata | null>(null);
  const [recaptchaScore, setRecaptchaScore] = useState<number | null>(null);

  // Initialize metadata on mount
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const fingerprint = generateFingerprint();

    const meta: LeadMetadata = {
      referrer: document.referrer || undefined,
      landing_page: window.location.href,
      user_agent: userAgent,
      ip_address: "0.0.0.0", // Would be set by backend
      browser: detectBrowser(userAgent),
      device: detectDevice(userAgent),
      os: detectOS(userAgent),
      timestamp: new Date().toISOString(),
      fingerprint,
    };

    setMetadata(meta);
    onMetadataReady?.(meta);
  }, [onMetadataReady]);

  // Check rate limit on mount
  useEffect(() => {
    // In a real app, we'd get the IP from the backend
    const mockIp = "127.0.0.1";
    const rateLimitInfo = checkRateLimit(mockIp);

    if (rateLimitInfo.remaining === 0) {
      setIsRateLimited(true);
      onRateLimitExceeded?.();
    }
  }, [onRateLimitExceeded]);

  // Simulate reCAPTCHA v3 score
  useEffect(() => {
    // In a real app, this would be handled by Google reCAPTCHA
    const simulateRecaptcha = () => {
      // Generate a random score between 0.1 and 1.0
      const score = Math.random() * 0.9 + 0.1;
      setRecaptchaScore(score);
    };

    const timer = setTimeout(simulateRecaptcha, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Honeypot field handler
  const handleHoneypotChange = (value: string) => {
    setHoneypotValue(value);
    // If honeypot is filled, it's likely a bot
    if (value) {
      console.warn("Honeypot triggered - potential bot detected");
    }
  };

  // Check if submission should be blocked
  const isBlocked = honeypotValue !== "" || isRateLimited;

  return (
    <div className="space-y-4">
      {/* Honeypot field - hidden from users, visible to bots */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypotValue}
          onChange={(e) => handleHoneypotChange(e.target.value)}
        />
      </div>

      {/* Rate limit warning */}
      {isRateLimited && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>{t.rateLimitError}</AlertDescription>
        </Alert>
      )}

      {/* reCAPTCHA score indicator (for demo only) */}
      {recaptchaScore !== null && recaptchaScore < 0.5 && (
        <Alert>
          <ShieldCheckIcon className="h-4 w-4" />

          <AlertDescription>
            Vérification de sécurité en cours... (Score:{" "}
            {recaptchaScore.toFixed(2)})
          </AlertDescription>
        </Alert>
      )}

      {/* Main content */}
      <div className={isBlocked ? "pointer-events-none opacity-50" : ""}>
        {children}
      </div>

      {/* Hidden metadata fields */}
      {metadata && (
        <div style={{ display: "none" }}>
          <input
            type="hidden"
            name="fingerprint"
            value={metadata.fingerprint}
          />

          <input type="hidden" name="referrer" value={metadata.referrer} />

          <input
            type="hidden"
            name="landing_page"
            value={metadata.landing_page}
          />

          <input type="hidden" name="user_agent" value={metadata.user_agent} />

          <input type="hidden" name="browser" value={metadata.browser} />

          <input type="hidden" name="device" value={metadata.device} />

          <input type="hidden" name="os" value={metadata.os} />

          <input type="hidden" name="timestamp" value={metadata.timestamp} />
        </div>
      )}

      {/* reCAPTCHA badge placeholder */}
      <div className="text-xs text-muted-foreground text-center">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        apply.
      </div>
    </div>
  );
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to check if form submission should be allowed
 */
export function useSpamProtection() {
  const [isProtected, setIsProtected] = useState(false);
  const [metadata, setMetadata] = useState<LeadMetadata | null>(null);

  const checkProtection = (formData: any): boolean => {
    // Check honeypot
    if (formData.website) {
      console.warn("Honeypot triggered");
      return false;
    }

    // Check rate limit
    const mockIp = "127.0.0.1";
    const rateLimitInfo = checkRateLimit(mockIp);
    if (rateLimitInfo.remaining === 0) {
      console.warn("Rate limit exceeded");
      return false;
    }

    // Increment rate limit counter
    incrementRateLimit(mockIp);

    return true;
  };

  return {
    isProtected,
    metadata,
    checkProtection,
    setMetadata,
  };
}
