/**
 * VIAMENTOR Instructors Grid View
 *
 * Grid View cards alternative avec layout responsive
 */

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EyeIcon,
  EditIcon,
  CalendarIcon,
  StarIcon,
  UsersIcon,
  CarIcon,
  BikeIcon,
} from "lucide-react";
import {
  Instructor,
  getStatusColor,
  getOMCoStatusColor,
  getCategoryColor,
  getCategoryIcon,
} from "@/polymet/data/viamentor-instructors-data";
import {
  InstructorsLocale,
  useInstructorsTranslations,
} from "@/polymet/data/viamentor-instructors-i18n";

interface InstructorsGridViewProps {
  instructors: Instructor[];
  locale?: InstructorsLocale;
  onView?: (instructor: Instructor) => void;
  onEdit?: (instructor: Instructor) => void;
  onPlanning?: (instructor: Instructor) => void;
}

export function InstructorsGridView({
  instructors,
  locale = "fr",
  onView,
  onEdit,
  onPlanning,
}: InstructorsGridViewProps) {
  const t = useInstructorsTranslations(locale);

  const getCategoryIconComponent = (category: string) => {
    const iconType = getCategoryIcon(category as any);
    return iconType === "Bike" ? BikeIcon : CarIcon;
  };

  if (instructors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t.noInstructors}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instructors.map((instructor) => {
        const IconComponent = getCategoryIconComponent(
          instructor.categories[0]
        );

        return (
          <Card
            key={instructor.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              {/* Header avec Avatar et Status */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    {instructor.avatar && (
                      <AvatarImage src={instructor.avatar} />
                    )}
                    <AvatarFallback className="text-lg">
                      {instructor.firstName[0]}
                      {instructor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(instructor.status)}`}
                    title={instructor.status}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {instructor.firstName} {instructor.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {instructor.email}
                  </p>
                  <Badge
                    variant={getOMCoStatusColor(instructor.omcoStatus)}
                    className="mt-2"
                  >
                    {instructor.omcoStatus}
                  </Badge>
                </div>
              </div>

              {/* Habilitations */}
              <div className="flex items-center gap-1 flex-wrap mb-4">
                {instructor.categories.map((cat) => {
                  const Icon = getCategoryIconComponent(cat);
                  return (
                    <Badge
                      key={cat}
                      variant="outline"
                      style={{
                        borderColor: getCategoryColor(cat),
                        color: getCategoryColor(cat),
                      }}
                      className="gap-1"
                    >
                      <Icon className="h-3 w-3" />

                      {cat}
                    </Badge>
                  );
                })}
              </div>

              {/* Stats compacts */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-muted rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />

                    <span>{t.colLessonsToday}</span>
                  </div>
                  <p className="text-lg font-bold">{instructor.lessonsToday}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <UsersIcon className="h-3 w-3" />

                    <span>{t.activeStudents}</span>
                  </div>
                  <p className="text-lg font-bold">
                    {instructor.activeStudents}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {t.lessonsCount}
                  </p>
                  <p className="text-sm font-semibold">
                    {instructor.monthStats.lessonsCount}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t.rating}</p>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />

                    <span className="text-sm font-semibold">
                      {instructor.monthStats.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions buttons */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/instructors/${instructor.id}`}>
                    <EyeIcon className="mr-1 h-4 w-4" />

                    {t.actionView}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit?.(instructor)}
                >
                  <EditIcon className="mr-1 h-4 w-4" />

                  {t.actionEdit}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPlanning?.(instructor)}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Training due warning */}
              {instructor.trainingDue && (
                <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-900/20 rounded text-xs text-orange-800 dark:text-orange-200">
                  ⚠️ {t.filterTrainingDue}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
