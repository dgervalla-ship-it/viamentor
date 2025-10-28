/**
 * VIAMENTOR - Arguments Grid Component
 * Grille arguments alternée image-texte pour pages personas
 */

import { Clock, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// TYPES
// ============================================================================

interface ArgumentBlock {
  icon: "clock" | "trending" | "shield";
  title: string;
  subtitle: string;
  items: string[];
  imagePosition: "left" | "right";
}

interface ArgumentsGridProps {
  blocks: ArgumentBlock[];
  className?: string;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const ICONS_MAP = {
  clock: Clock,
  trending: TrendingUp,
  shield: Shield,
};

const ICON_COLORS = {
  clock: "text-blue-600 dark:text-blue-400",
  trending: "text-green-600 dark:text-green-400",
  shield: "text-purple-600 dark:text-purple-400",
};

const ICON_BG_COLORS = {
  clock: "bg-blue-100 dark:bg-blue-950",
  trending: "bg-green-100 dark:bg-green-950",
  shield: "bg-purple-100 dark:bg-purple-950",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ArgumentsGrid({ blocks, className = "" }: ArgumentsGridProps) {
  return (
    <div className={`space-y-24 ${className}`}>
      {blocks.map((block, index) => {
        const Icon = ICONS_MAP[block.icon];
        const isImageLeft = block.imagePosition === "left";

        return (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              isImageLeft ? "" : "lg:grid-flow-dense"
            }`}
          >
            {/* Image mockup */}
            <div
              className={`relative ${
                isImageLeft ? "lg:col-start-1" : "lg:col-start-2"
              }`}
            >
              <Card className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 border-2 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl ${
                        ICON_BG_COLORS[block.icon]
                      } flex items-center justify-center`}
                    >
                      <Icon
                        className={`w-10 h-10 ${ICON_COLORS[block.icon]}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mx-auto" />

                      <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mx-auto" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4">
                <Badge
                  variant="default"
                  className="text-sm px-4 py-2 shadow-lg"
                >
                  <Icon className="w-4 h-4 mr-2" />

                  {block.title}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div
              className={`space-y-6 ${
                isImageLeft ? "lg:col-start-2" : "lg:col-start-1"
              }`}
            >
              {/* Icon + Title */}
              <div className="space-y-4">
                <div
                  className={`w-16 h-16 rounded-xl ${
                    ICON_BG_COLORS[block.icon]
                  } flex items-center justify-center`}
                >
                  <Icon className={`w-8 h-8 ${ICON_COLORS[block.icon]}`} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {block.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {block.subtitle}
                  </p>
                </div>
              </div>

              {/* Items list */}
              <ul className="space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
