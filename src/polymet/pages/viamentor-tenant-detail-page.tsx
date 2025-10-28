/**
 * VIAMENTOR Tenant Detail Page
 *
 * Page complète de détail tenant pour Platform Admin
 *
 * @module pages/viamentor-tenant-detail-page
 * @version 1.0.0
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { TenantDetailHeader } from "@/polymet/components/viamentor-tenant-detail-header";
import { TenantDetailTabs } from "@/polymet/components/viamentor-tenant-detail-tabs";
import { TenantOverviewTab } from "@/polymet/components/viamentor-tenant-overview-tab";
import { TenantUsersTab } from "@/polymet/components/viamentor-tenant-users-tab";
import { TenantStudentsTab } from "@/polymet/components/viamentor-tenant-students-tab";
import { TenantBillingTab } from "@/polymet/components/viamentor-tenant-billing-tab";
import { TenantSettingsTab } from "@/polymet/components/viamentor-tenant-settings-tab";
import { TenantLogsTab } from "@/polymet/components/viamentor-tenant-logs-tab";
import {
  getTenantById,
  getTenantUsers,
  getTenantStudents,
  getTenantInvoices,
  getTenantActivities,
  getTenantLogs,
} from "@/polymet/data/viamentor-tenant-detail-data";

export function ViamentorTenantDetailPage() {
  const { id = "tenant-001" } = useParams<{ id: string }>();

  // Load data (in real app, use TanStack Query)
  const tenant = getTenantById(id);
  const users = getTenantUsers(id);
  const students = getTenantStudents(id);
  const invoices = getTenantInvoices(id);
  const activities = getTenantActivities(id);
  const logs = getTenantLogs(id);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEdit = () => {
    console.log("Open edit drawer for tenant:", id);
    // TODO: Open drawer with edit form
  };

  const handleImpersonate = () => {
    console.log("Impersonate tenant:", id);
    // TODO: Implement impersonation logic
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Refetch all data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleDelete = () => {
    console.log("Delete tenant:", id);
    // TODO: Implement delete logic
  };

  return (
    <div className="min-h-screen bg-background">
      <TenantDetailHeader
        tenant={tenant}
        onEdit={handleEdit}
        onImpersonate={handleImpersonate}
        onRefresh={handleRefresh}
        onDelete={handleDelete}
      />

      <TenantDetailTabs
        usersCount={users.length}
        studentsCount={tenant.stats.studentsCount}
      >
        {{
          overview: (
            <TenantOverviewTab
              tenant={tenant}
              activities={activities}
              onUpdate={async (field, value) => {
                console.log("Update field:", field, "with value:", value);
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
              onLoadMore={() => console.log("Load more activities")}
            />
          ),

          users: (
            <TenantUsersTab
              users={users}
              onInvite={async (email, role, sendEmail) => {
                console.log("Invite user:", { email, role, sendEmail });
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
              onRoleChange={async (userId, newRole) => {
                console.log("Change role:", { userId, newRole });
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
              onStatusToggle={async (userId, newStatus) => {
                console.log("Toggle status:", { userId, newStatus });
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
              onExport={() => console.log("Export users CSV")}
            />
          ),

          students: (
            <TenantStudentsTab
              students={students}
              totalStudents={tenant.stats.studentsCount}
              inTrainingPercentage={87}
              upcomingExams={12}
              onExport={() => console.log("Export students Excel")}
            />
          ),

          billing: (
            <TenantBillingTab
              currentPlan={tenant.plan}
              price={tenant.stats.mrr}
              billingCycle="Monthly"
              nextBillingDate="2024-02-01T00:00:00Z"
              paymentMethod={{
                last4: "4242",
                expiry: "12/25",
                brand: "Visa",
              }}
              invoices={invoices}
              usage={{
                storage: { used: 75, quota: 100 },
                students: {
                  current: tenant.stats.studentsCount,
                  limit: tenant.plan === "Starter" ? 50 : 200,
                },
                apiCalls: 45230,
                bandwidth: 12800,
              }}
              onChangePlan={async (newPlan) => {
                console.log("Change plan to:", newPlan);
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onUpdatePayment={() => console.log("Update payment method")}
            />
          ),

          settings: (
            <TenantSettingsTab
              onSave={async (section, data) => {
                console.log("Save section:", section, data);
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
            />
          ),

          logs: (
            <TenantLogsTab
              logs={logs}
              onExport={() => console.log("Export logs CSV")}
              onRefresh={async () => {
                console.log("Refresh logs");
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            />
          ),
        }}
      </TenantDetailTabs>
    </div>
  );
}
