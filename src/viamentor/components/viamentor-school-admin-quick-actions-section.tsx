/**
 * VIAMENTOR - School Admin Quick Actions Section
 * Section Quick Actions pour dashboard School Admin
 *
 * FEATURES:
 * - Grid d'actions rapides
 * - Icons et badges
 * - Links vers pages
 * - Responsive grid
 */

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  UserCheck,
  Car,
  Calendar,
  FileText,
  Award,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  mockQuickActions,
  type SchoolAdminLocale,
} from "@/viamentor/data/viamentor-school-admin-data";
import { schoolAdminTranslations } from "@/viamentor/data/viamentor-school-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminQuickActionsSectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const iconMap: Record<string, any> = {
  Users,
  UserPlus,
  UserCheck,
  Car,
  Calendar,
  FileText,
  Award,
  BarChart3,
  Settings,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminQuickActionsSection({
  locale = "fr",
}: SchoolAdminQuickActionsSectionProps) {
  const t = schoolAdminTranslations[locale];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.sections.quickActions}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockQuickActions.map((action) => {
            const Icon = iconMap[action.icon];
            // Utiliser Link seulement si href est défini et non vide
            if (action.href && action.href !== "#") {
              return (
                <Link key={action.id} to={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-auto flex-col gap-2 py-4 relative"
                  >
                    {action.badge && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {action.badge}
                      </Badge>
                    )}
                    <Icon className="h-5 w-5" />

                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                </Link>
              );
            }
            // Si pas de href, utiliser un button simple
            return (
              <Button
                key={action.id}
                variant="outline"
                className="w-full h-auto flex-col gap-2 py-4 relative"
              >
                {action.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {action.badge}
                  </Badge>
                )}
                <Icon className="h-5 w-5" />

                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViamentorSchoolAdminQuickActionsSection;
