/**
 * VIAMENTOR Tenant Detail Tabs
 *
 * Tabs navigation container avec counts badges
 *
 * @module components/viamentor-tenant-detail-tabs
 * @version 1.0.0
 */

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboardIcon,
  UsersIcon,
  GraduationCapIcon,
  CreditCardIcon,
  SettingsIcon,
  FileTextIcon,
  InfinityIcon,
} from "lucide-react";

interface TabConfig {
  value: string;
  label: string;
  icon: typeof LayoutDashboardIcon;
  count?: number | "infinity";
}

interface TenantDetailTabsProps {
  defaultTab?: string;
  usersCount?: number;
  studentsCount?: number;
  children: {
    overview: ReactNode;
    users: ReactNode;
    students: ReactNode;
    billing: ReactNode;
    settings: ReactNode;
    logs: ReactNode;
  };
}

export function TenantDetailTabs({
  defaultTab = "overview",
  usersCount,
  studentsCount,
  children,
}: TenantDetailTabsProps) {
  const tabs: TabConfig[] = [
    {
      value: "overview",
      label: "Overview",
      icon: LayoutDashboardIcon,
    },
    {
      value: "users",
      label: "Users",
      icon: UsersIcon,
      count: usersCount,
    },
    {
      value: "students",
      label: "Students",
      icon: GraduationCapIcon,
      count: studentsCount,
    },
    {
      value: "billing",
      label: "Billing",
      icon: CreditCardIcon,
    },
    {
      value: "settings",
      label: "Settings",
      icon: SettingsIcon,
    },
    {
      value: "logs",
      label: "Logs",
      icon: FileTextIcon,
      count: "infinity",
    },
  ];

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <TabsList className="h-auto p-0 bg-transparent border-0 rounded-none w-full justify-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 gap-2"
                >
                  <Icon className="h-4 w-4" />

                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 min-w-5 px-1.5 text-xs"
                    >
                      {tab.count === "infinity" ? (
                        <InfinityIcon className="h-3 w-3" />
                      ) : (
                        tab.count
                      )}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <TabsContent value="overview" className="mt-0">
          {children.overview}
        </TabsContent>
        <TabsContent value="users" className="mt-0">
          {children.users}
        </TabsContent>
        <TabsContent value="students" className="mt-0">
          {children.students}
        </TabsContent>
        <TabsContent value="billing" className="mt-0">
          {children.billing}
        </TabsContent>
        <TabsContent value="settings" className="mt-0">
          {children.settings}
        </TabsContent>
        <TabsContent value="logs" className="mt-0">
          {children.logs}
        </TabsContent>
      </div>
    </Tabs>
  );
}
