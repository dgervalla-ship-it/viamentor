/**
 * VIAMENTOR - Marketing Manager Actions Section
 * Section Quick Actions avec actions contextuelles
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockQuickActions,
  type MarketingManagerLocale,
} from "@/polymet/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/polymet/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerActionsSectionProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingManagerActionsSection({
  locale = "fr",
}: MarketingManagerActionsSectionProps) {
  const t = getMarketingManagerTranslations(locale);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t.sections.quickActions}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mockQuickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto flex-col items-start p-4 gap-2 relative"
          >
            {action.badge && (
              <Badge
                className={`absolute top-2 right-2 ${
                  action.badge.variant === "warning"
                    ? "bg-orange-500"
                    : action.badge.variant === "primary"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                } text-white`}
              >
                {action.badge.value}
              </Badge>
            )}
            <div className="font-semibold text-sm">{action.label}</div>
            <div className="text-xs text-muted-foreground text-left">
              {action.description}
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}
