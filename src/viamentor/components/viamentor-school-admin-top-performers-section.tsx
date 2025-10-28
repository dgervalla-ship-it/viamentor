/**
 * VIAMENTOR - School Admin Top Performers Section
 * Section Top Performers pour dashboard School Admin
 *
 * FEATURES:
 * - Ranking meilleurs moniteurs
 * - Ranking meilleurs élèves
 * - Avatars et badges
 * - Métriques performance
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star } from "lucide-react";
import { type SchoolAdminLocale } from "@/viamentor/data/viamentor-school-admin-data";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminTopPerformersSectionProps {
  locale?: SchoolAdminLocale;
}

interface TopPerformer {
  id: string;
  name: string;
  role: string;
  rating: number;
  lessons?: number;
  progress?: number;
  avatar: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const topPerformers: TopPerformer[] = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "Moniteur",
    rating: 4.9,
    lessons: 156,
    avatar: "https://github.com/yusufhilmi.png",
  },
  {
    id: "2",
    name: "Jean Martin",
    role: "Moniteur",
    rating: 4.8,
    lessons: 142,
    avatar: "https://github.com/kdrnp.png",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    role: "Élève",
    rating: 4.7,
    progress: 95,
    avatar: "https://github.com/yahyabedirhan.png",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminTopPerformersSection({
  locale = "fr",
}: SchoolAdminTopPerformersSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Top Performers
        </CardTitle>
        <CardDescription>Meilleurs moniteurs et élèves du mois</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-sm">
                {index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={performer.avatar} />

                <AvatarFallback>{performer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {performer.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {performer.role}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />

                  <span className="text-sm font-medium">
                    {performer.rating}
                  </span>
                </div>
                {performer.lessons && (
                  <Badge variant="secondary">{performer.lessons} leçons</Badge>
                )}
                {performer.progress && (
                  <Badge variant="secondary">
                    {performer.progress}% progression
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViamentorSchoolAdminTopPerformersSection;
