/**
 * VIAMENTOR Students Grid View
 * Cards masonry responsive alternative à la table
 */

import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  EyeIcon,
  EditIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import {
  Student,
  getCategoryColor,
  getStatusColor,
  getRemainingLessonsColor,
  formatPhoneNumber,
  getRelativeDate,
} from "@/polymet/data/viamentor-students-data";
import {
  StudentsLocale,
  useStudentsTranslations,
  formatCurrency,
} from "@/polymet/data/viamentor-students-i18n";

interface StudentsGridViewProps {
  students: Student[];
  locale?: StudentsLocale;
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onBookLesson?: (student: Student) => void;
}

export function StudentsGridView({
  students,
  locale = "fr",
  onView,
  onEdit,
  onBookLesson,
}: StudentsGridViewProps) {
  const t = useStudentsTranslations(locale);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student) => (
        <Card
          key={student.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate(`/students/${student.id}`)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  {student.avatar && <AvatarImage src={student.avatar} />}
                  <AvatarFallback className="text-lg">
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${
                    student.status === "Actif"
                      ? "bg-green-600"
                      : student.status === "Suspendu"
                        ? "bg-red-600"
                        : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {student.firstName} {student.lastName}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {student.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: getCategoryColor(cat),
                        color: getCategoryColor(cat),
                      }}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-3">
            {/* Contact */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MailIcon className="h-3 w-3" />

                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="h-3 w-3" />

                <span>{formatPhoneNumber(student.phone)}</span>
              </div>
            </div>

            {/* Progression */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t.progression}</span>
                <span className="font-medium">{student.progression}%</span>
              </div>
              <Progress value={student.progression} className="h-2" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  {t.remainingLessons}
                </p>
                <Badge
                  variant={getRemainingLessonsColor(student.remainingLessons)}
                  className="mt-1"
                >
                  {student.remainingLessons}
                </Badge>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  {t.financialBalance}
                </p>
                <p
                  className={`font-semibold mt-1 ${
                    student.financialBalance < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {formatCurrency(student.financialBalance, locale)}
                </p>
              </div>
            </div>

            {/* Next Lesson */}
            {student.nextLesson && (
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground mb-1">
                  {t.nextLesson}
                </p>
                <Badge variant="outline">
                  {getRelativeDate(student.nextLesson, locale)}
                </Badge>
              </div>
            )}

            {/* Instructor */}
            {student.instructorName && (
              <div className="text-sm">
                <span className="text-muted-foreground">
                  {t.assignedInstructor}:{" "}
                </span>
                <span className="font-medium">{student.instructorName}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 w-full">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link
                  to={`/students/${student.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <EyeIcon className="mr-2 h-4 w-4" />

                  {t.viewProfile}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(student);
                }}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookLesson?.(student);
                }}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
