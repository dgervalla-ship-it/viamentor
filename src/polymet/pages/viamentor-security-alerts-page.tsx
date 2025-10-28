/**
 * VIAMENTOR - Security Alerts Page
 * Page gestion alertes sécurité avec détection intrusion et monitoring temps réel
 *
 * FEATURES:
 * - Détection d'intrusion temps réel
 * - Alertes temps réel avec WebSocket
 * - Métriques sécurité
 * - Actions automatiques
 *
 * @module pages/viamentor-security-alerts-page
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntrusionDetectionDashboard } from "@/polymet/components/viamentor-intrusion-detection-dashboard";
import { RealtimeAlertsMonitor } from "@/polymet/components/viamentor-realtime-alerts-monitor";

// ============================================================================
// TYPES
// ============================================================================

interface SecurityAlertsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SecurityAlertsPage({ locale = "fr" }: SecurityAlertsPageProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alertes Sécurité</h1>
        <p className="text-muted-foreground mt-1">
          Monitoring temps réel et détection d'intrusion
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="realtime">Alertes Temps Réel</TabsTrigger>
          <TabsTrigger value="intrusion">Détection Intrusion</TabsTrigger>
        </TabsList>

        {/* Realtime Alerts Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <RealtimeAlertsMonitor
            locale={locale}
            onAcknowledge={(id) => console.log("Acknowledge alert:", id)}
            onResolve={(id) => console.log("Resolve alert:", id)}
            onInvestigate={(id) => console.log("Investigate alert:", id)}
          />
        </TabsContent>

        {/* Intrusion Detection Tab */}
        <TabsContent value="intrusion" className="space-y-6">
          <IntrusionDetectionDashboard
            locale={locale}
            onBlockIP={(ip) => console.log("Block IP:", ip)}
            onInvestigate={(id) => console.log("Investigate attempt:", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SecurityAlertsPage;
