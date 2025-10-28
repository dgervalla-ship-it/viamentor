/**
 * VIAMENTOR - Features Detailed Component
 * Tabs navigation avec fonctionnalités détaillées par catégorie
 */

import { useState } from "react";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// TYPES
// ============================================================================

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureTab {
  id: string;
  label: string;
  icon: "users" | "calendar" | "file" | "trending" | "chart";
  features: Feature[];
}

interface FeaturesDetailedProps {
  title: string;
  tabs: FeatureTab[];
  className?: string;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const ICONS_MAP = {
  users: Users,
  calendar: Calendar,
  file: FileText,
  trending: TrendingUp,
  chart: BarChart3,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function FeaturesDetailed({
  title,
  tabs,
  className = "",
}: FeaturesDetailedProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Title */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez toutes les fonctionnalités organisées par catégorie
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto bg-muted/50 p-2">
          {tabs.map((tab) => {
            const Icon = ICONS_MAP[tab.icon];
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
              >
                <Icon className="w-4 h-4" />

                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tab.features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Badge */}
                    <Badge variant="secondary" className="text-xs">
                      Inclus
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
