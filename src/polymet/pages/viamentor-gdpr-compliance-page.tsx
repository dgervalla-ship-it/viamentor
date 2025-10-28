/**
 * VIAMENTOR GDPR Compliance Page
 *
 * Page principale module RGPD et consentements
 *
 * @module pages/viamentor-gdpr-compliance-page
 * @version 1.0.0
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GDPRDashboardKPIs } from "@/polymet/components/viamentor-gdpr-dashboard-kpis";
import { GDPRRequestsTable } from "@/polymet/components/viamentor-gdpr-requests-table";
import { GDPRProcessWizard } from "@/polymet/components/viamentor-gdpr-process-wizard";
import { GDPRConsentManagement } from "@/polymet/components/viamentor-gdpr-consent-management";
import { GDPRConsentDetailDrawer } from "@/polymet/components/viamentor-gdpr-consent-detail-drawer";
import {
  MOCK_DPO_STATS,
  MOCK_GDPR_REQUESTS,
  MOCK_CONSENT_TYPES,
  MOCK_USER_CONSENTS,
  GDPRRequest,
  RequestStatus,
} from "@/polymet/data/viamentor-gdpr-data";
import { ShieldCheckIcon } from "lucide-react";

export function ViamentorGDPRCompliancePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [processWizardOpen, setProcessWizardOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<GDPRRequest | null>(
    null
  );
  const [consentDrawerOpen, setConsentDrawerOpen] = useState(false);
  const [selectedConsentId, setSelectedConsentId] = useState<string | null>(
    null
  );

  const handleProcessRequest = (request: GDPRRequest) => {
    setSelectedRequest(request);
    setProcessWizardOpen(true);
  };

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    console.log("Status change:", requestId, newStatus);
    // TODO: Update request status via API
  };

  const handleViewConsentDetails = (consentId: string) => {
    setSelectedConsentId(consentId);
    setConsentDrawerOpen(true);
  };

  const selectedConsent = MOCK_CONSENT_TYPES.find(
    (c) => c.id === selectedConsentId
  );

  const userConsentsForSelected = MOCK_USER_CONSENTS.filter(
    (uc) => uc.consentTypeId === selectedConsentId
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Conformité RGPD</h1>
              <p className="text-muted-foreground">
                Gestion des requêtes data subject et consentements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="requests">
              Requêtes ({MOCK_GDPR_REQUESTS.length})
            </TabsTrigger>
            <TabsTrigger value="consents">
              Consentements ({MOCK_CONSENT_TYPES.length})
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <GDPRDashboardKPIs
              stats={MOCK_DPO_STATS}
              onNewAudit={() => console.log("New audit")}
              onExportGDPR={() => console.log("Export GDPR")}
              onDataBreachReport={() => console.log("Data breach report")}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Requêtes récentes</h2>
              </div>
              <GDPRRequestsTable
                requests={MOCK_GDPR_REQUESTS.slice(0, 5)}
                onProcess={handleProcessRequest}
                onStatusChange={handleStatusChange}
                onDelete={(id) => console.log("Delete:", id)}
              />
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Requêtes data subject</h2>
                  <p className="text-muted-foreground">
                    Gérer les demandes d'accès, suppression, export et
                    rectification
                  </p>
                </div>
              </div>

              <GDPRRequestsTable
                requests={MOCK_GDPR_REQUESTS}
                onProcess={handleProcessRequest}
                onStatusChange={handleStatusChange}
                onDelete={(id) => console.log("Delete:", id)}
              />
            </div>
          </TabsContent>

          {/* Consents Tab */}
          <TabsContent value="consents" className="space-y-6">
            <GDPRConsentManagement
              consents={MOCK_CONSENT_TYPES}
              onEdit={(consent) => console.log("Edit consent:", consent)}
              onViewDetails={handleViewConsentDetails}
              onExport={(id) => console.log("Export consent:", id)}
              onCreate={() => console.log("Create new consent type")}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Process Wizard */}
      <GDPRProcessWizard
        open={processWizardOpen}
        onOpenChange={setProcessWizardOpen}
        request={selectedRequest}
        onComplete={(id) => {
          console.log("Request completed:", id);
          setProcessWizardOpen(false);
        }}
      />

      {/* Consent Detail Drawer */}
      <GDPRConsentDetailDrawer
        open={consentDrawerOpen}
        onOpenChange={setConsentDrawerOpen}
        consentType={selectedConsent || null}
        userConsents={userConsentsForSelected}
        onRevokeConsent={(userId) => console.log("Revoke consent:", userId)}
        onRevokeAll={() => console.log("Revoke all consents")}
        onExport={() => console.log("Export consent users")}
      />
    </div>
  );
}
