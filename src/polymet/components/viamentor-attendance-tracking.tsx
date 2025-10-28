/**
 * VIAMENTOR - Attendance Tracking
 * Émargement présence cours théoriques avec signature digitale
 */

import { useState, useRef, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  PenToolIcon,
  DownloadIcon,
  SaveIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type {
  CourseParticipant,
  AttendanceStatus,
} from "@/polymet/data/viamentor-theory-courses-data";
import {
  getTheoryCoursesTranslation,
  type TheoryCoursesLocale,
} from "@/polymet/data/viamentor-theory-courses-i18n";

interface AttendanceTrackingProps {
  participants: CourseParticipant[];
  locale?: TheoryCoursesLocale;
  onAttendanceChange?: (
    participantId: string,
    status: AttendanceStatus
  ) => void;
  onSave?: (attendance: Record<string, AttendanceStatus>) => void;
  onGenerateSheet?: () => void;
}

export function AttendanceTracking({
  participants,
  locale = "fr",
  onAttendanceChange,
  onSave,
  onGenerateSheet,
}: AttendanceTrackingProps) {
  const t = getTheoryCoursesTranslation(locale);
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >(
    participants.reduce(
      (acc, p) => ({ ...acc, [p.id]: p.attendance || null }),
      {}
    )
  );
  const [showSignature, setShowSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 200 });

  // Handle attendance change
  const handleAttendanceChange = (
    participantId: string,
    status: AttendanceStatus
  ) => {
    setAttendance((prev) => ({ ...prev, [participantId]: status }));
    if (onAttendanceChange) {
      onAttendanceChange(participantId, status);
    }
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(attendance);
    }
  };

  // Setup canvas for drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showSignature) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fit container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const width = container.clientWidth - 32; // padding
        setCanvasSize({ width, height: 200 });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Setup drawing
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [showSignature]);

  // Drawing handlers
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear signature
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Save signature
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    console.log("Signature saved:", dataUrl);
    // You can send this to your backend or store it
  };

  // Get attendance stats
  const stats = {
    present: Object.values(attendance).filter((s) => s === "present").length,
    absent: Object.values(attendance).filter((s) => s === "absent").length,
    excused: Object.values(attendance).filter((s) => s === "excused").length,
    pending: Object.values(attendance).filter((s) => !s).length,
  };

  // Get icon for status
  const getStatusIcon = (status: AttendanceStatus) => {
    if (status === "present")
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;

    if (status === "absent")
      return <XCircleIcon className="h-5 w-5 text-destructive" />;

    if (status === "excused")
      return <AlertCircleIcon className="h-5 w-5 text-orange-600" />;

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {t.attendanceTracking.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {stats.present} {t.attendance.present} • {stats.absent}{" "}
            {t.attendance.absent} • {stats.excused} {t.attendance.excused}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onGenerateSheet && (
            <Button variant="outline" size="sm" onClick={onGenerateSheet}>
              <DownloadIcon className="h-4 w-4 md:mr-2" />

              <span className="hidden md:inline">
                {t.attendanceTracking.generateSheet}
              </span>
              <span className="sr-only md:hidden">
                {t.attendanceTracking.generateSheet}
              </span>
            </Button>
          )}
          {onSave && (
            <Button size="sm" onClick={handleSave}>
              <SaveIcon className="h-4 w-4 md:mr-2" />

              <span className="hidden md:inline">
                {t.attendanceTracking.saveAttendance}
              </span>
              <span className="sr-only md:hidden">
                {t.attendanceTracking.saveAttendance}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Participants list */}
      <div className="space-y-3">
        {participants.map((participant) => (
          <Card key={participant.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                {/* Student info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={participant.student.avatar} />

                    <AvatarFallback>
                      {participant.student.firstName[0]}
                      {participant.student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {participant.student.firstName}{" "}
                      {participant.student.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground truncate break-all">
                      {participant.student.email}
                    </p>
                  </div>
                </div>

                {/* Attendance status */}
                <RadioGroup
                  value={attendance[participant.id] || ""}
                  onValueChange={(value) =>
                    handleAttendanceChange(
                      participant.id,
                      value as AttendanceStatus
                    )
                  }
                  className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="present"
                      id={`${participant.id}-present`}
                    />

                    <Label
                      htmlFor={`${participant.id}-present`}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />

                      <span className="text-sm">{t.attendance.present}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="absent"
                      id={`${participant.id}-absent`}
                    />

                    <Label
                      htmlFor={`${participant.id}-absent`}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <XCircleIcon className="h-4 w-4 text-destructive" />

                      <span className="text-sm">{t.attendance.absent}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="excused"
                      id={`${participant.id}-excused`}
                    />

                    <Label
                      htmlFor={`${participant.id}-excused`}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <AlertCircleIcon className="h-4 w-4 text-orange-600" />

                      <span className="text-sm">{t.attendance.excused}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital signature section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <PenToolIcon className="h-4 w-4" />

            {t.attendanceTracking.digitalSignature}
          </CardTitle>
          <CardDescription>
            Signature digitale pour validation émargement (optionnel)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="signature"
                checked={showSignature}
                onCheckedChange={(checked) =>
                  setShowSignature(checked as boolean)
                }
              />

              <Label htmlFor="signature">Activer signature digitale</Label>
            </div>
            {showSignature && (
              <div className="border-2 border-dashed border-border rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  className="w-full border border-border rounded bg-background cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={clearSignature}
                    className="flex-1"
                  >
                    Effacer
                  </Button>
                  <Button size="xs" onClick={saveSignature} className="flex-1">
                    Enregistrer signature
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-muted-foreground">Total</p>
              <p className="text-xl md:text-2xl font-bold">
                {participants.length}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircleIcon className="h-3 w-3 xs:h-4 xs:w-4 text-green-600 flex-shrink-0" />

                <span className="truncate">{t.attendance.present}</span>
              </p>
              <p className="text-xl md:text-2xl font-bold text-green-600">
                {stats.present}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <XCircleIcon className="h-3 w-3 xs:h-4 xs:w-4 text-destructive flex-shrink-0" />

                <span className="truncate">{t.attendance.absent}</span>
              </p>
              <p className="text-xl md:text-2xl font-bold text-destructive">
                {stats.absent}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <AlertCircleIcon className="h-3 w-3 xs:h-4 xs:w-4 text-orange-600 flex-shrink-0" />

                <span className="truncate">{t.attendance.excused}</span>
              </p>
              <p className="text-xl md:text-2xl font-bold text-orange-600">
                {stats.excused}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
