/**
 * VIAMENTOR - Instructor Manager Data
 * Mock data et types pour dashboard Responsable des Moniteurs
 */

export type InstructorStatus = "available" | "busy" | "on_leave" | "off_duty";
export type RequestStatus = "pending" | "approved" | "rejected";
export type AssignmentStatus = "pending" | "active" | "completed";

// ============================================================================
// TYPES
// ============================================================================

export interface InstructorManagerKPIs {
  totalInstructors: number;
  availableToday: number;
  lessonsToday: number;
  avgSatisfaction: number;
  utilizationRate: number;
  pendingRequests: number;
}

export interface InstructorTeamMember {
  id: string;
  name: string;
  avatar: string;
  status: InstructorStatus;
  categories: string[];
  lessonsToday: number;
  satisfaction: number;
  studentsAssigned: number;
  availability: string;
}

export interface TeamRequest {
  id: string;
  type: "leave" | "schedule_change" | "support";
  instructorId: string;
  instructorName: string;
  date: string;
  reason: string;
  status: RequestStatus;
  priority: "low" | "medium" | "high";
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  category: string;
  startDate: string;
  status: AssignmentStatus;
  lessonsCompleted: number;
  satisfaction?: number;
}

export interface PerformanceMetric {
  instructorId: string;
  instructorName: string;
  punctuality: number;
  pedagogy: number;
  safety: number;
  communication: number;
  overall: number;
  lessonsCompleted: number;
  successRate: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_INSTRUCTOR_MANAGER_KPIS: InstructorManagerKPIs = {
  totalInstructors: 24,
  availableToday: 18,
  lessonsToday: 47,
  avgSatisfaction: 4.6,
  utilizationRate: 82,
  pendingRequests: 5,
};

export const MOCK_TEAM_MEMBERS: InstructorTeamMember[] = [
  {
    id: "inst-1",
    name: "Sophie Martin",
    avatar: "https://github.com/yusufhilmi.png",
    status: "available",
    categories: ["B", "BE"],
    lessonsToday: 6,
    satisfaction: 4.8,
    studentsAssigned: 12,
    availability: "08:00 - 18:00",
  },
  {
    id: "inst-2",
    name: "Marc Dubois",
    avatar: "https://github.com/kdrnp.png",
    status: "busy",
    categories: ["B", "A1"],
    lessonsToday: 7,
    satisfaction: 4.7,
    studentsAssigned: 15,
    availability: "09:00 - 19:00",
  },
  {
    id: "inst-3",
    name: "Laura Rossi",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "available",
    categories: ["B"],
    lessonsToday: 5,
    satisfaction: 4.9,
    studentsAssigned: 10,
    availability: "10:00 - 17:00",
  },
  {
    id: "inst-4",
    name: "Thomas Müller",
    avatar: "https://github.com/denizbuyuktas.png",
    status: "on_leave",
    categories: ["B", "C1"],
    lessonsToday: 0,
    satisfaction: 4.5,
    studentsAssigned: 8,
    availability: "Congé jusqu'au 15/12",
  },
];

export const MOCK_TEAM_REQUESTS: TeamRequest[] = [
  {
    id: "req-1",
    type: "leave",
    instructorId: "inst-5",
    instructorName: "Emma Bernard",
    date: "2024-12-20",
    reason: "Congé annuel",
    status: "pending",
    priority: "medium",
  },
  {
    id: "req-2",
    type: "schedule_change",
    instructorId: "inst-2",
    instructorName: "Marc Dubois",
    date: "2024-12-15",
    reason: "Rendez-vous médical",
    status: "pending",
    priority: "high",
  },
  {
    id: "req-3",
    type: "support",
    instructorId: "inst-6",
    instructorName: "Julie Petit",
    date: "2024-12-12",
    reason: "Besoin d'accompagnement pédagogique",
    status: "approved",
    priority: "low",
  },
];

export const MOCK_STUDENT_ASSIGNMENTS: StudentAssignment[] = [
  {
    id: "assign-1",
    studentId: "stu-1",
    studentName: "Pierre Dupont",
    instructorId: "inst-1",
    instructorName: "Sophie Martin",
    category: "B",
    startDate: "2024-11-01",
    status: "active",
    lessonsCompleted: 15,
    satisfaction: 4.8,
  },
  {
    id: "assign-2",
    studentId: "stu-2",
    studentName: "Marie Lambert",
    instructorId: "inst-2",
    instructorName: "Marc Dubois",
    category: "B",
    startDate: "2024-11-15",
    status: "active",
    lessonsCompleted: 8,
    satisfaction: 4.7,
  },
  {
    id: "assign-3",
    studentId: "stu-3",
    studentName: "Lucas Moreau",
    instructorId: "inst-1",
    instructorName: "Sophie Martin",
    category: "BE",
    startDate: "2024-10-01",
    status: "completed",
    lessonsCompleted: 25,
    satisfaction: 4.9,
  },
];

export const MOCK_PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    instructorId: "inst-1",
    instructorName: "Sophie Martin",
    punctuality: 98,
    pedagogy: 95,
    safety: 97,
    communication: 96,
    overall: 96.5,
    lessonsCompleted: 245,
    successRate: 89,
  },
  {
    instructorId: "inst-2",
    instructorName: "Marc Dubois",
    punctuality: 95,
    pedagogy: 92,
    safety: 94,
    communication: 93,
    overall: 93.5,
    lessonsCompleted: 312,
    successRate: 85,
  },
  {
    instructorId: "inst-3",
    instructorName: "Laura Rossi",
    punctuality: 99,
    pedagogy: 97,
    safety: 98,
    communication: 97,
    overall: 97.75,
    lessonsCompleted: 198,
    successRate: 92,
  },
];
