/**
 * VIAMENTOR Staff Planning Data
 *
 * Mock data et types pour planning école secrétariat avec events, disponibilités, filtres
 */

// ============================================================================
// TYPES
// ============================================================================

export type LessonCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type LessonStatus =
  | "confirmed"
  | "tentative"
  | "cancelled"
  | "completed";
export type ViewType = "month" | "week" | "day" | "agenda";

export interface StaffPlanningEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: LessonCategory;
  status: LessonStatus;
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  vehicle: {
    id: string;
    plate: string;
    model: string;
  };
  location: {
    address: string;
    type: "pickup" | "school" | "exam_center";
  };
  duration: number; // minutes
  notes?: string;
}

export interface InstructorAvailability {
  instructorId: string;
  instructorName: string;
  slots: {
    start: Date;
    end: Date;
    available: boolean;
  }[];
}

export interface PlanningFilters {
  instructors: string[];
  vehicles: string[];
  status: LessonStatus | "all";
  dateRange: {
    start: Date;
    end: Date;
  };
  showAvailability: boolean;
}

export interface PlanningStats {
  totalLessons: number;
  confirmedLessons: number;
  tentativeLessons: number;
  cancelledLessons: number;
  instructorsActive: number;
  vehiclesInUse: number;
  utilizationRate: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockStaffPlanningEvents: StaffPlanningEvent[] = [
  {
    id: "evt-1",
    title: "Leçon pratique B - Sophie Martin",
    start: new Date(2025, 0, 20, 9, 0),
    end: new Date(2025, 0, 20, 10, 30),
    category: "B",
    status: "confirmed",
    student: {
      id: "std-1",
      name: "Sophie Martin",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    instructor: {
      id: "inst-1",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    vehicle: {
      id: "veh-1",
      plate: "GE-123456",
      model: "VW Golf 8",
    },
    location: {
      address: "Rue du Commerce 12, 1204 Genève",
      type: "pickup",
    },
    duration: 90,
  },
  {
    id: "evt-2",
    title: "Leçon moto A - Marc Dubois",
    start: new Date(2025, 0, 20, 11, 0),
    end: new Date(2025, 0, 20, 12, 30),
    category: "A",
    status: "confirmed",
    student: {
      id: "std-2",
      name: "Marc Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    instructor: {
      id: "inst-2",
      name: "Marie Leclerc",
      avatar: "https://github.com/shoaibux1.png",
    },
    vehicle: {
      id: "veh-2",
      plate: "GE-789012",
      model: "Honda CB500F",
    },
    location: {
      address: "Auto-École Genève, Rue de la Servette 45",
      type: "school",
    },
    duration: 90,
  },
  {
    id: "evt-3",
    title: "Leçon remorque BE - Claire Rousseau",
    start: new Date(2025, 0, 20, 14, 0),
    end: new Date(2025, 0, 20, 15, 30),
    category: "BE",
    status: "tentative",
    student: {
      id: "std-3",
      name: "Claire Rousseau",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    instructor: {
      id: "inst-1",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    vehicle: {
      id: "veh-3",
      plate: "GE-345678",
      model: "Ford Transit + Remorque",
    },
    location: {
      address: "Zone industrielle Meyrin",
      type: "school",
    },
    duration: 90,
    notes: "Attente confirmation élève",
  },
];

export const mockInstructorAvailabilities: InstructorAvailability[] = [
  {
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    slots: [
      {
        start: new Date(2025, 0, 20, 8, 0),
        end: new Date(2025, 0, 20, 9, 0),
        available: true,
      },
      {
        start: new Date(2025, 0, 20, 13, 0),
        end: new Date(2025, 0, 20, 14, 0),
        available: true,
      },
      {
        start: new Date(2025, 0, 20, 16, 0),
        end: new Date(2025, 0, 20, 18, 0),
        available: true,
      },
    ],
  },
  {
    instructorId: "inst-2",
    instructorName: "Marie Leclerc",
    slots: [
      {
        start: new Date(2025, 0, 20, 8, 0),
        end: new Date(2025, 0, 20, 11, 0),
        available: true,
      },
      {
        start: new Date(2025, 0, 20, 14, 0),
        end: new Date(2025, 0, 20, 17, 0),
        available: true,
      },
    ],
  },
];

export const mockPlanningStats: PlanningStats = {
  totalLessons: 156,
  confirmedLessons: 142,
  tentativeLessons: 8,
  cancelledLessons: 6,
  instructorsActive: 12,
  vehiclesInUse: 8,
  utilizationRate: 78.5,
};

// ============================================================================
// HELPERS
// ============================================================================

export const getCategoryColor = (category: LessonCategory): string => {
  const colors: Record<LessonCategory, string> = {
    B: "bg-blue-500",
    A: "bg-orange-500",
    BE: "bg-green-500",
    A1: "bg-yellow-500",
    BPT: "bg-purple-500",
  };
  return colors[category];
};

export const getStatusBadgeVariant = (
  status: LessonStatus
): "default" | "secondary" | "destructive" | "outline" => {
  const variants: Record<
    LessonStatus,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    confirmed: "default",
    tentative: "secondary",
    cancelled: "destructive",
    completed: "outline",
  };
  return variants[status];
};

export const filterEvents = (
  events: StaffPlanningEvent[],
  filters: Partial<PlanningFilters>
): StaffPlanningEvent[] => {
  return events.filter((event) => {
    if (
      filters.instructors?.length &&
      !filters.instructors.includes(event.instructor.id)
    ) {
      return false;
    }
    if (
      filters.vehicles?.length &&
      !filters.vehicles.includes(event.vehicle.id)
    ) {
      return false;
    }
    if (
      filters.status &&
      filters.status !== "all" &&
      event.status !== filters.status
    ) {
      return false;
    }
    if (filters.dateRange) {
      const eventDate = new Date(event.start);
      if (
        eventDate < filters.dateRange.start ||
        eventDate > filters.dateRange.end
      ) {
        return false;
      }
    }
    return true;
  });
};

export const calculateUtilization = (events: StaffPlanningEvent[]): number => {
  const totalMinutes = events.reduce((sum, evt) => sum + evt.duration, 0);
  const workingHours = 8 * 60; // 8h par jour
  return (totalMinutes / workingHours) * 100;
};
