/**
 * VIAMENTOR - Super Admin Welcome Banner
 * Banner de bienvenue avec highlights des fonctionnalités
 *
 * FEATURES:
 * - Welcome message personnalisé
 * - Highlights des nouvelles fonctionnalités
 * - Quick actions
 * - Dismissible
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  XMarkIcon,
  ChartBarIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  CogIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { SuperAdminLocale } from "@/polymet/data/viamentor-super-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SuperAdminWelcomeBannerProps {
  locale?: SuperAdminLocale;
  onDismiss?: () => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SuperAdminWelcomeBanner({
  locale = "fr",
  onDismiss,
  className,
}: SuperAdminWelcomeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const t = {
    fr: {
      welcome: "Bienvenue sur le Dashboard Super Admin",
      subtitle:
        "Gérez et monitorez l'ensemble de la plateforme Viamentor en temps réel",
      newFeatures: "Nouvelles Fonctionnalités",
      features: [
        {
          icon: ChartBarIcon,
          title: "Métriques Revenus & Usage",
          description:
            "Graphiques interactifs pour suivre MRR, ARR, utilisateurs actifs et stockage",
        },
        {
          icon: CogIcon,
          title: "Actions Tenants",
          description:
            "Suspendre ou activer des tenants avec workflow de confirmation complet",
        },
        {
          icon: BellAlertIcon,
          title: "Notifications Critiques",
          description:
            "Alertes push en temps réel pour événements sécurité et système",
        },
        {
          icon: ShieldCheckIcon,
          title: "Monitoring Sécurité",
          description:
            "Détection et investigation des tentatives d'accès non autorisés",
        },
      ],

      quickActions: "Actions Rapides",
      viewMetrics: "Voir Métriques",
      viewTenants: "Gérer Tenants",
      viewSecurity: "Alertes Sécurité",
      viewLogs: "Logs Système",
      dismiss: "Masquer",
    },
    de: {
      welcome: "Willkommen im Super Admin Dashboard",
      subtitle:
        "Verwalten und überwachen Sie die gesamte Viamentor-Plattform in Echtzeit",
      newFeatures: "Neue Funktionen",
      features: [
        {
          icon: ChartBarIcon,
          title: "Umsatz- und Nutzungsmetriken",
          description:
            "Interaktive Diagramme zur Verfolgung von MRR, ARR, aktiven Benutzern und Speicher",
        },
        {
          icon: CogIcon,
          title: "Mandantenaktionen",
          description:
            "Mandanten sperren oder aktivieren mit vollständigem Bestätigungsworkflow",
        },
        {
          icon: BellAlertIcon,
          title: "Kritische Benachrichtigungen",
          description:
            "Echtzeit-Push-Benachrichtigungen für Sicherheits- und Systemereignisse",
        },
        {
          icon: ShieldCheckIcon,
          title: "Sicherheitsüberwachung",
          description: "Erkennung und Untersuchung unbefugter Zugriffsversuche",
        },
      ],

      quickActions: "Schnellaktionen",
      viewMetrics: "Metriken anzeigen",
      viewTenants: "Mandanten verwalten",
      viewSecurity: "Sicherheitswarnungen",
      viewLogs: "Systemprotokolle",
      dismiss: "Ausblenden",
    },
    it: {
      welcome: "Benvenuto nella Dashboard Super Admin",
      subtitle:
        "Gestisci e monitora l'intera piattaforma Viamentor in tempo reale",
      newFeatures: "Nuove Funzionalità",
      features: [
        {
          icon: ChartBarIcon,
          title: "Metriche Ricavi e Utilizzo",
          description:
            "Grafici interattivi per monitorare MRR, ARR, utenti attivi e storage",
        },
        {
          icon: CogIcon,
          title: "Azioni Tenant",
          description:
            "Sospendi o attiva tenant con workflow di conferma completo",
        },
        {
          icon: BellAlertIcon,
          title: "Notifiche Critiche",
          description:
            "Avvisi push in tempo reale per eventi di sicurezza e sistema",
        },
        {
          icon: ShieldCheckIcon,
          title: "Monitoraggio Sicurezza",
          description:
            "Rilevamento e indagine di tentativi di accesso non autorizzati",
        },
      ],

      quickActions: "Azioni Rapide",
      viewMetrics: "Vedi Metriche",
      viewTenants: "Gestisci Tenant",
      viewSecurity: "Avvisi Sicurezza",
      viewLogs: "Log Sistema",
      dismiss: "Nascondi",
    },
    en: {
      welcome: "Welcome to Super Admin Dashboard",
      subtitle:
        "Manage and monitor the entire Viamentor platform in real-time",
      newFeatures: "New Features",
      features: [
        {
          icon: ChartBarIcon,
          title: "Revenue & Usage Metrics",
          description:
            "Interactive charts to track MRR, ARR, active users and storage",
        },
        {
          icon: CogIcon,
          title: "Tenant Actions",
          description:
            "Suspend or activate tenants with complete confirmation workflow",
        },
        {
          icon: BellAlertIcon,
          title: "Critical Notifications",
          description: "Real-time push alerts for security and system events",
        },
        {
          icon: ShieldCheckIcon,
          title: "Security Monitoring",
          description:
            "Detection and investigation of unauthorized access attempts",
        },
      ],

      quickActions: "Quick Actions",
      viewMetrics: "View Metrics",
      viewTenants: "Manage Tenants",
      viewSecurity: "Security Alerts",
      viewLogs: "System Logs",
      dismiss: "Dismiss",
    },
  };

  const translations = t[locale];

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <Card
      className={`p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900 ${className || ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{translations.welcome}</h2>
              <Badge
                variant="secondary"
                className="bg-blue-100 dark:bg-blue-900"
              >
                v2.1.0
              </Badge>
            </div>
            <p className="text-muted-foreground">{translations.subtitle}</p>
          </div>

          {/* New Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              {translations.newFeatures}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {translations.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-border"
                >
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold mb-3">
              {translations.quickActions}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <ChartBarIcon className="h-4 w-4 mr-2" />

                {translations.viewMetrics}
                <ArrowRightIcon className="h-3 w-3 ml-2" />
              </Button>
              <Button variant="outline" size="sm">
                <CogIcon className="h-4 w-4 mr-2" />

                {translations.viewTenants}
                <ArrowRightIcon className="h-3 w-3 ml-2" />
              </Button>
              <Button variant="outline" size="sm">
                <ShieldCheckIcon className="h-4 w-4 mr-2" />

                {translations.viewSecurity}
                <ArrowRightIcon className="h-3 w-3 ml-2" />
              </Button>
              <Button variant="outline" size="sm">
                <BellAlertIcon className="h-4 w-4 mr-2" />

                {translations.viewLogs}
                <ArrowRightIcon className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="flex-shrink-0"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

export default SuperAdminWelcomeBanner;
