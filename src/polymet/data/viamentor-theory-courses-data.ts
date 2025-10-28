/**
 * VIAMENTOR - Theory Courses Data
 * Mock data pour cours théoriques avec types complets
 */

export type CourseStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "canceled";
export type AttendanceStatus = "present" | "absent" | "excused" | null;
export type CourseType = "theory" | "sensibilisation" | "first_aid";

export interface TheoryCourse {
  id: string;
  topic: string;
  type: CourseType;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  room: {
    number: string;
    capacity: number;
    building?: string;
    address?: string;
  };
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  categories?: string[];
  price?: number;
  status: CourseStatus;
  capacity: number;
  enrolled: number;
  waitingList: number;
}

export interface CourseParticipant {
  id: string;
  courseId: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    category: string;
  };
  enrolledAt: string;
  attendance?: AttendanceStatus;
  signature?: string;
  notes?: string;
}

export interface WaitingListEntry {
  id: string;
  courseId: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
  addedAt: string;
  notified: boolean;
}

// Mock data
export const mockTheoryCourses: TheoryCourse[] = [
  {
    id: "tc-1",
    topic: "Cours sensibilisation 8h",
    type: "sensibilisation",
    description:
      "Cours obligatoire de sensibilisation aux dangers de la circulation routière. Programme complet selon OAC Art. 10.",
    startDate: "2025-10-20",
    endDate: "2025-10-20",
    startTime: "09:00",
    endTime: "17:00",
    totalHours: 8,
    room: {
      number: "Salle 3",
      capacity: 20,
      building: "Bâtiment principal",
      address: "Route de Lausanne 45, 1700 Fribourg",
    },
    instructor: {
      id: "inst-1",
      firstName: "Marc",
      lastName: "Dubois",
      avatar: "https://github.com/yusufhilmi.png",
    },
    categories: ["B", "A1"],
    price: 150,
    status: "scheduled",
    capacity: 20,
    enrolled: 18,
    waitingList: 3,
  },
  {
    id: "tc-2",
    topic: "Théorie circulation Cat. B",
    type: "theory",
    description:
      "Cours théorique complet pour catégorie B: règles de circulation, signalisation, priorités, comportement.",
    startDate: "2025-10-13",
    endDate: "2025-10-14",
    startTime: "14:00",
    endTime: "18:00",
    totalHours: 8,
    room: {
      number: "Salle 1",
      capacity: 15,
      building: "Bâtiment principal",
    },
    instructor: {
      id: "inst-2",
      firstName: "Sophie",
      lastName: "Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    categories: ["B"],
    price: 120,
    status: "in_progress",
    capacity: 15,
    enrolled: 12,
    waitingList: 0,
  },
  {
    id: "tc-3",
    topic: "Premiers secours",
    type: "first_aid",
    description:
      "Formation aux premiers secours obligatoire pour permis de conduire. Certification valable 6 ans.",
    startDate: "2025-10-25",
    endDate: "2025-10-25",
    startTime: "09:00",
    endTime: "17:00",
    totalHours: 10,
    room: {
      number: "Salle 2",
      capacity: 12,
      address: "Centre formation, Rue du Lac 12",
    },
    instructor: {
      id: "inst-3",
      firstName: "Jean",
      lastName: "Müller",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    price: 100,
    status: "scheduled",
    capacity: 12,
    enrolled: 8,
    waitingList: 0,
  },
  {
    id: "tc-4",
    topic: "Théorie moto Cat. A",
    type: "theory",
    description:
      "Cours théorique spécifique catégorie A: conduite moto, équipement, techniques, sécurité.",
    startDate: "2025-09-15",
    endDate: "2025-09-15",
    startTime: "09:00",
    endTime: "17:00",
    totalHours: 8,
    room: {
      number: "Salle 4",
      capacity: 10,
    },
    instructor: {
      id: "inst-1",
      firstName: "Marc",
      lastName: "Dubois",
      avatar: "https://github.com/yusufhilmi.png",
    },
    categories: ["A", "A1"],
    price: 140,
    status: "completed",
    capacity: 10,
    enrolled: 10,
    waitingList: 0,
  },
];

export const mockCourseParticipants: CourseParticipant[] = [
  {
    id: "cp-1",
    courseId: "tc-1",
    student: {
      id: "std-1",
      firstName: "Emma",
      lastName: "Schneider",
      email: "emma.schneider@example.com",
      phone: "+41 79 123 45 67",
      avatar: "https://github.com/shoaibux1.png",
      category: "B",
    },
    enrolledAt: "2025-10-01T10:30:00Z",
  },
  {
    id: "cp-2",
    courseId: "tc-1",
    student: {
      id: "std-2",
      firstName: "Lucas",
      lastName: "Weber",
      email: "lucas.weber@example.com",
      phone: "+41 79 234 56 78",
      avatar: "https://github.com/denizbuyuktas.png",
      category: "B",
    },
    enrolledAt: "2025-10-02T14:20:00Z",
  },
  {
    id: "cp-3",
    courseId: "tc-2",
    student: {
      id: "std-3",
      firstName: "Sophie",
      lastName: "Keller",
      email: "sophie.keller@example.com",
      phone: "+41 79 345 67 89",
      avatar: "https://github.com/shoaibux1.png",
      category: "B",
    },
    enrolledAt: "2025-10-05T09:15:00Z",
    attendance: "present",
  },
  {
    id: "cp-4",
    courseId: "tc-2",
    student: {
      id: "std-4",
      firstName: "Noah",
      lastName: "Fischer",
      email: "noah.fischer@example.com",
      phone: "+41 79 456 78 90",
      avatar: "https://github.com/denizbuyuktas.png",
      category: "B",
    },
    enrolledAt: "2025-10-06T11:00:00Z",
    attendance: "absent",
  },
];

export const mockWaitingList: WaitingListEntry[] = [
  {
    id: "wl-1",
    courseId: "tc-1",
    student: {
      id: "std-5",
      firstName: "Léa",
      lastName: "Morel",
      email: "lea.morel@example.com",
      avatar: "https://github.com/shoaibux1.png",
    },
    addedAt: "2025-10-10T15:30:00Z",
    notified: false,
  },
  {
    id: "wl-2",
    courseId: "tc-1",
    student: {
      id: "std-6",
      firstName: "Tom",
      lastName: "Schmid",
      email: "tom.schmid@example.com",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    addedAt: "2025-10-11T09:00:00Z",
    notified: false,
  },
];

// Helper functions
export function getCourseById(id: string): TheoryCourse | undefined {
  return mockTheoryCourses.find((c) => c.id === id);
}

export function getParticipantsByCourse(courseId: string): CourseParticipant[] {
  return mockCourseParticipants.filter((p) => p.courseId === courseId);
}

export function getWaitingListByCourse(courseId: string): WaitingListEntry[] {
  return mockWaitingList.filter((w) => w.courseId === courseId);
}

export function getEnrollmentPercentage(
  enrolled: number,
  capacity: number
): number {
  return Math.round((enrolled / capacity) * 100);
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 90) return "destructive";
  if (percentage >= 70) return "orange";
  return "green";
}

export function formatCourseDate(
  startDate: string,
  endDate: string,
  locale: string = "fr"
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  if (startDate === endDate) {
    return start.toLocaleDateString(locale, options);
  }

  return `${start.toLocaleDateString(locale, { day: "numeric" })} - ${end.toLocaleDateString(locale, options)}`;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}
