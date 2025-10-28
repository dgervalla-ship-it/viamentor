/**
 * VIAMENTOR - System Integrations Page
 * Configuration des intégrations tierces (Stripe, Twilio, etc.)
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  CreditCardIcon,
  MessageSquareIcon,
  MailIcon,
  CloudIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface SystemIntegrationsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: "active" | "inactive" | "error";
  enabled: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockIntegrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Paiements en ligne et gestion abonnements",
    icon: CreditCardIcon,
    status: "active",
    enabled: true,
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Envoi SMS et notifications",
    icon: MessageSquareIcon,
    status: "active",
    enabled: true,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Envoi emails transactionnels",
    icon: MailIcon,
    status: "inactive",
    enabled: false,
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Base de données et authentification",
    icon: CloudIcon,
    status: "active",
    enabled: true,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function SystemIntegrationsPage({
  locale = "fr",
}: SystemIntegrationsPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Intégrations
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Configuration des intégrations tierces (Stripe, Twilio, etc.)
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {mockIntegrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <Switch checked={integration.enabled} />
                </div>

                <div className="flex items-center gap-2">
                  {integration.status === "active" ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />

                      <Badge
                        variant="outline"
                        className="border-green-500/20 bg-green-500/10 text-green-500"
                      >
                        Connecté
                      </Badge>
                    </>
                  ) : integration.status === "error" ? (
                    <>
                      <AlertCircleIcon className="h-4 w-4 text-red-500" />

                      <Badge
                        variant="outline"
                        className="border-red-500/20 bg-red-500/10 text-red-500"
                      >
                        Erreur
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="outline">Inactif</Badge>
                  )}
                </div>

                {integration.enabled && (
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="space-y-2">
                      <Label className="text-xs">API Key</Label>
                      <Input
                        type="password"
                        defaultValue="sk_test_••••••••••••••••"
                        className="h-9 border-border text-sm"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-border"
                    >
                      Tester la connexion
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
