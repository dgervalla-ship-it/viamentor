/**
 * VIAMENTOR - Marketing Manager Prospects Section
 * Section Prospects avec pipeline conversion funnel
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import {
  mockProspectsPipeline,
  type MarketingManagerLocale,
} from "@/polymet/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/polymet/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerProspectsSectionProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingManagerProspectsSection({
  locale = "fr",
}: MarketingManagerProspectsSectionProps) {
  const t = getMarketingManagerTranslations(locale);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t.sections.prospects}</h3>
        <Button variant="ghost" size="sm" className="gap-2">
          {t.prospects.viewAll}
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">
              {t.prospects.newLeads}
            </div>
            <div className="text-2xl font-bold">
              {mockProspectsPipeline.newLeads}
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-600 border-blue-500/20"
          >
            Nouveaux
          </Badge>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">
              {t.prospects.contacted}
            </div>
            <div className="text-2xl font-bold">
              {mockProspectsPipeline.contacted}
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-orange-500/10 text-orange-600 border-orange-500/20"
          >
            En cours
          </Badge>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">
              {t.prospects.qualified}
            </div>
            <div className="text-2xl font-bold">
              {mockProspectsPipeline.qualified}
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-600 border-purple-500/20"
          >
            Qualifiés
          </Badge>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">
              {t.prospects.converted}
            </div>
            <div className="text-2xl font-bold">
              {mockProspectsPipeline.converted}
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-600 border-green-500/20"
          >
            Convertis
          </Badge>
        </div>
      </div>
    </Card>
  );
}
