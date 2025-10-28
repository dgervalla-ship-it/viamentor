/**
 * VIAMENTOR Instructors Stats Cards
 *
 * Stats Cards header KPIs pour page moniteurs
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  CheckCircle2Icon,
  BookOpenIcon,
  XCircleIcon,
} from "lucide-react";
import { InstructorStats } from "@/polymet/data/viamentor-instructors-data";
import {
  InstructorsLocale,
  useInstructorsTranslations,
} from "@/polymet/data/viamentor-instructors-i18n";

interface InstructorsStatsCardsProps {
  stats: InstructorStats;
  locale?: InstructorsLocale;
}

export function InstructorsStatsCards({
  stats,
  locale = "fr",
}: InstructorsStatsCardsProps) {
  const t = useInstructorsTranslations(locale);

  const cards = [
    {
      label: t.statsTotal,
      value: stats.total,
      icon: UsersIcon,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: t.statsAvailable,
      value: stats.available,
      icon: CheckCircle2Icon,
      iconColor: "text-green-600",
      bgColor: "bg-green-600/10",
      badge: true,
      badgeVariant: "default" as const,
      badgeClass: "bg-green-600",
    },
    {
      label: t.statsInLesson,
      value: stats.inLesson,
      icon: BookOpenIcon,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-600/10",
      badge: true,
      badgeVariant: "default" as const,
      badgeClass: "bg-blue-600",
    },
    {
      label: t.statsAbsent,
      value: stats.absent,
      icon: XCircleIcon,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-600/10",
      badge: true,
      badgeVariant: "default" as const,
      badgeClass: "bg-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">{card.value}</p>
                  {card.badge && (
                    <Badge
                      variant={card.badgeVariant}
                      className={card.badgeClass}
                    >
                      {card.value}
                    </Badge>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
