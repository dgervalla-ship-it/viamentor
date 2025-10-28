/**
 * VIAMENTOR - DOCUMENTATION 02: ARCHITECTURE COMPLÈTE
 */

export const architectureDoc = `
# 🏗️ Viamentor - Architecture Complète

## 📋 Table des matières

1. [Architecture Générale](#architecture-générale)
2. [Architecture Front-end](#architecture-front-end)
3. [Architecture Back-end](#architecture-back-end)
4. [Architecture Database](#architecture-database)
5. [Architecture Sécurité](#architecture-sécurité)
6. [Architecture Scalabilité](#architecture-scalabilité)

---

## 1. Architecture Générale

### 🎯 Vue d'ensemble

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React 18 + TypeScript + Next.js 15                      │   │
│  │  • Shadcn UI + Hero UI                                   │   │
│  │  • Tailwind CSS                                          │   │
│  │  • React Router v6                                       │   │
│  │  • Zustand (State)                                       │   │
│  │  • TanStack Query (Data fetching)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTPS/TLS
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes / Supabase Edge Functions           │   │
│  │  • REST API                                              │   │
│  │  • Authentication (JWT)                                  │   │
│  │  • Authorization (RBAC)                                  │   │
│  │  • Validation (Zod)                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ PostgreSQL Protocol
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Supabase PostgreSQL                                     │   │
│  │  • Row Level Security (RLS)                              │   │
│  │  • Tenant Isolation                                      │   │
│  │  • Backups automatiques                                  │   │
│  │  • Replication                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 🔄 Flux de données

\`\`\`
User Action
    ↓
React Component
    ↓
TanStack Query Hook
    ↓
API Route (Next.js)
    ↓
Validation (Zod)
    ↓
Authorization (RBAC)
    ↓
Database Query (Prisma)
    ↓
PostgreSQL (Supabase)
    ↓
Response (JSON)
    ↓
Cache (TanStack Query)
    ↓
UI Update (React)
\`\`\`

---

## 2. Architecture Front-end

### 📁 Structure des dossiers

\`\`\`
viamentor/
├── components/          # Composants réutilisables (100+)
│   ├── viamentor-header.tsx
│   ├── viamentor-sidebar.tsx
│   ├── viamentor-students-table.tsx
│   └── ...
├── pages/              # Pages de l'application (50+)
│   ├── viamentor-students-page.tsx
│   ├── viamentor-student-detail-page.tsx
│   └── ...
├── layouts/            # Layouts (wrappers)
│   └── viamentor-main-layout.tsx
├── data/               # Data files, i18n, schemas (80+)
│   ├── viamentor-students-data.ts
│   ├── viamentor-students-i18n.ts
│   ├── viamentor-student-wizard-schemas.ts
│   └── ...
├── prototypes/         # Routing & navigation
│   └── viamentor-system-prototype.tsx
└── plans/              # Documentation plans
    └── viamentor-*.md
\`\`\`

### 🧩 Composants principaux

#### **1. Layout System**

\`\`\`tsx
// layouts/viamentor-main-layout.tsx
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
\`\`\`

#### **2. Routing System**

\`\`\`tsx
// prototypes/viamentor-system-prototype.tsx
export default function ViamentorPrototype() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={
          <MainLayout>
            <StudentsPage />
          </MainLayout>
        } />
        <Route path="/students/:id" element={
          <MainLayout>
            <StudentDetailPage />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}
\`\`\`

#### **3. State Management**

\`\`\`tsx
// data/viamentor-user-store.ts
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  role: UserRole;
  tenant: string | null;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  role: 'student',
  tenant: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: 'student', tenant: null }),
}));
\`\`\`

#### **4. Data Fetching**

\`\`\`tsx
// data/viamentor-query-hooks.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export function useStudents(tenantId: string) {
  return useQuery({
    queryKey: ['students', tenantId],
    queryFn: () => fetchStudents(tenantId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: (data: StudentCreateInput) => createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}
\`\`\`

### 🎨 Design System

#### **Tokens**

\`\`\`css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --radius: 0.5rem;
}
\`\`\`

#### **Composants UI**

- **Shadcn UI**: Button, Input, Select, Dialog, Table, etc.
- **Hero UI**: Advanced components (Calendar, Charts)
- **Custom**: Viamentor-specific components

### 📱 Responsive Design

\`\`\`tsx
// Breakpoints Tailwind
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
\`\`\`

---

## 3. Architecture Back-end

### 🔧 Stack technique

- **Runtime**: Next.js 15 API Routes
- **Database ORM**: Prisma
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Validation**: Zod
- **Email**: Resend / SendGrid
- **SMS**: Twilio

### 📡 API Structure

\`\`\`
app/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── refresh/route.ts
├── students/
│   ├── route.ts              # GET /api/students, POST /api/students
│   ├── [id]/route.ts         # GET/PUT/DELETE /api/students/:id
│   └── [id]/lessons/route.ts # GET /api/students/:id/lessons
├── instructors/
│   ├── route.ts
│   └── [id]/route.ts
├── vehicles/
│   ├── route.ts
│   └── [id]/route.ts
├── lessons/
│   ├── route.ts
│   └── [id]/route.ts
├── invoices/
│   ├── route.ts
│   └── [id]/route.ts
└── analytics/
    ├── students/route.ts
    ├── instructors/route.ts
    └── financial/route.ts
\`\`\`

### 🔐 Middleware

\`\`\`tsx
// middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  // 1. Verify authentication
  if (!token) {
    return NextResponse.redirect('/login');
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.redirect('/login');
  }
  
  // 2. Verify authorization (RBAC)
  const path = request.nextUrl.pathname;
  const hasPermission = checkPermission(user.role, path);
  
  if (!hasPermission) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
  
  // 3. Add user to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', user.id);
  requestHeaders.set('x-user-role', user.role);
  requestHeaders.set('x-tenant-id', user.tenantId);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
\`\`\`

### 📝 API Example

\`\`\`tsx
// app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { studentCreateSchema } from '@/schemas/student';

export async function GET(request: NextRequest) {
  try {
    const tenantId = request.headers.get('x-tenant-id');
    const { searchParams } = new URL(request.url);
    
    const students = await prisma.student.findMany({
      where: {
        tenantId,
        status: searchParams.get('status') || undefined,
      },
      include: {
        instructor: true,
        lessons: {
          take: 5,
          orderBy: { date: 'desc' },
        },
      },
    });
    
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tenantId = request.headers.get('x-tenant-id');
    const body = await request.json();
    
    // Validation
    const validated = studentCreateSchema.parse(body);
    
    // Create student
    const student = await prisma.student.create({
      data: {
        ...validated,
        tenantId,
      },
    });
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
\`\`\`

---

## 4. Architecture Database

### 🗄️ Schema Prisma

\`\`\`prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// TENANTS & USERS
// ============================================================================

model Tenant {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  canton        String
  plan          String   // starter, professional, enterprise
  status        String   // active, suspended, cancelled
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  users         User[]
  students      Student[]
  instructors   Instructor[]
  vehicles      Vehicle[]
  lessons       Lesson[]
  invoices      Invoice[]
  
  @@index([slug])
  @@index([status])
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  firstName     String
  lastName      String
  role          String   // platform_admin, school_admin, secretary, instructor, student
  status        String   // active, inactive, suspended
  locale        String   @default("fr")
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([email])
  @@index([tenantId, role])
}

// ============================================================================
// STUDENTS
// ============================================================================

model Student {
  id                String   @id @default(cuid())
  firstName         String
  lastName          String
  email             String
  phone             String
  dateOfBirth       DateTime
  address           String
  city              String
  postalCode        String
  canton            String
  
  // Training info
  category          String   // B, A1, A, C, D, etc.
  status            String   // active, inactive, graduated, dropped
  enrollmentDate    DateTime
  theoryExamDate    DateTime?
  practicalExamDate DateTime?
  licenseNumber     String?
  
  // Assignments
  instructorId      String?
  instructor        Instructor? @relation(fields: [instructorId], references: [id])
  vehicleId         String?
  vehicle           Vehicle?    @relation(fields: [vehicleId], references: [id])
  
  // Relations
  tenantId          String
  tenant            Tenant      @relation(fields: [tenantId], references: [id])
  lessons           Lesson[]
  invoices          Invoice[]
  documents         Document[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([tenantId, status])
  @@index([instructorId])
  @@index([email])
}

// ============================================================================
// INSTRUCTORS
// ============================================================================

model Instructor {
  id                String   @id @default(cuid())
  firstName         String
  lastName          String
  email             String
  phone             String
  dateOfBirth       DateTime
  
  // Qualifications
  licenseNumber     String
  categories        String[] // ["B", "A1", "A"]
  omcoNumber        String   // OMCo registration number
  omcoExpiryDate    DateTime
  
  // Status
  status            String   // active, inactive, on_leave
  hireDate          DateTime
  
  // Relations
  tenantId          String
  tenant            Tenant     @relation(fields: [tenantId], references: [id])
  students          Student[]
  lessons           Lesson[]
  availabilities    Availability[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([tenantId, status])
  @@index([email])
}

// ============================================================================
// VEHICLES
// ============================================================================

model Vehicle {
  id                String   @id @default(cuid())
  plate             String   @unique
  brand             String
  model             String
  year              Int
  category          String   // B, A1, A, C, D
  
  // Technical info
  vin               String   @unique
  firstRegistration DateTime
  lastInspection    DateTime
  nextInspection    DateTime
  mileage           Int
  
  // Insurance
  insuranceCompany  String
  insuranceNumber   String
  insuranceExpiry   DateTime
  
  // Status
  status            String   // available, in_use, maintenance, out_of_service
  
  // Relations
  tenantId          String
  tenant            Tenant     @relation(fields: [tenantId], references: [id])
  students          Student[]
  lessons           Lesson[]
  maintenances      Maintenance[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([tenantId, status])
  @@index([plate])
}

// ============================================================================
// LESSONS
// ============================================================================

model Lesson {
  id                String   @id @default(cuid())
  type              String   // practical, theory, exam_preparation
  date              DateTime
  startTime         String
  duration          Int      // minutes
  status            String   // scheduled, completed, cancelled, no_show
  
  // Participants
  studentId         String
  student           Student    @relation(fields: [studentId], references: [id])
  instructorId      String
  instructor        Instructor @relation(fields: [instructorId], references: [id])
  vehicleId         String?
  vehicle           Vehicle?   @relation(fields: [vehicleId], references: [id])
  
  // Evaluation
  rating            Int?       // 1-5
  notes             String?
  topics            String[]   // L-drive topics
  
  // Billing
  price             Decimal
  invoiceId         String?
  invoice           Invoice?   @relation(fields: [invoiceId], references: [id])
  
  // Relations
  tenantId          String
  tenant            Tenant     @relation(fields: [tenantId], references: [id])
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([tenantId, date])
  @@index([studentId])
  @@index([instructorId])
  @@index([status])
}

// ============================================================================
// INVOICES
// ============================================================================

model Invoice {
  id                String   @id @default(cuid())
  number            String   @unique
  date              DateTime
  dueDate           DateTime
  status            String   // draft, sent, paid, overdue, cancelled
  
  // Amounts
  subtotal          Decimal
  taxRate           Decimal
  taxAmount         Decimal
  total             Decimal
  paidAmount        Decimal  @default(0)
  
  // Student
  studentId         String
  student           Student  @relation(fields: [studentId], references: [id])
  
  // QR-Bill
  qrReference       String?
  qrIban            String?
  
  // Relations
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])
  lessons           Lesson[]
  payments          Payment[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([tenantId, status])
  @@index([studentId])
  @@index([number])
}

// ============================================================================
// PAYMENTS
// ============================================================================

model Payment {
  id                String   @id @default(cuid())
  amount            Decimal
  date              DateTime
  method            String   // cash, card, bank_transfer, qr_bill
  reference         String?
  
  // Invoice
  invoiceId         String
  invoice           Invoice  @relation(fields: [invoiceId], references: [id])
  
  // Relations
  tenantId          String
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([invoiceId])
  @@index([date])
}

// ============================================================================
// ADDITIONAL MODELS
// ============================================================================

model Availability {
  id            String     @id @default(cuid())
  instructorId  String
  instructor    Instructor @relation(fields: [instructorId], references: [id])
  dayOfWeek     Int        // 0-6 (Sunday-Saturday)
  startTime     String
  endTime       String
  isRecurring   Boolean    @default(true)
  
  @@index([instructorId])
}

model Maintenance {
  id          String   @id @default(cuid())
  vehicleId   String
  vehicle     Vehicle  @relation(fields: [vehicleId], references: [id])
  type        String   // routine, repair, inspection
  date        DateTime
  cost        Decimal
  description String
  
  @@index([vehicleId])
}

model Document {
  id          String   @id @default(cuid())
  studentId   String
  student     Student  @relation(fields: [studentId], references: [id])
  type        String   // identity, permit, certificate
  name        String
  url         String
  uploadDate  DateTime @default(now())
  
  @@index([studentId])
}
\`\`\`

### 🔒 Row Level Security (RLS)

\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their tenant's data
CREATE POLICY tenant_isolation_students ON students
  USING (tenant_id = current_setting('app.current_tenant')::text);

CREATE POLICY tenant_isolation_instructors ON instructors
  USING (tenant_id = current_setting('app.current_tenant')::text);

-- Policy: Platform admins can access all data
CREATE POLICY platform_admin_access ON students
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'platform_admin'
    )
  );
\`\`\`

---

## 5. Architecture Sécurité

### 🔐 Authentification

\`\`\`tsx
// Supabase Auth
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Get session
const { data: { session } } = await supabase.auth.getSession();

// Logout
await supabase.auth.signOut();
\`\`\`

### 🛡️ Autorisation (RBAC)

\`\`\`tsx
// Permission matrix
const PERMISSIONS = {
  platform_admin: ['*'], // All permissions
  
  school_admin: [
    'students:read',
    'students:write',
    'instructors:read',
    'instructors:write',
    'vehicles:read',
    'vehicles:write',
    'lessons:read',
    'lessons:write',
    'invoices:read',
    'invoices:write',
    'analytics:read',
  ],
  
  secretary: [
    'students:read',
    'students:write',
    'lessons:read',
    'lessons:write',
    'invoices:read',
  ],
  
  instructor: [
    'students:read',
    'lessons:read',
    'lessons:write',
  ],
  
  student: [
    'lessons:read',
    'invoices:read',
  ],
};

// Check permission
function hasPermission(role: UserRole, permission: string): boolean {
  const rolePermissions = PERMISSIONS[role];
  return rolePermissions.includes('*') || rolePermissions.includes(permission);
}
\`\`\`

### 🔒 Data Encryption

\`\`\`tsx
// Encryption at rest (PostgreSQL)
- Database encryption: AES-256
- Backup encryption: AES-256

// Encryption in transit
- TLS 1.3
- HTTPS only
- Certificate pinning

// Sensitive data encryption
import { encrypt, decrypt } from '@/lib/crypto';

const encryptedSSN = encrypt(student.ssn);
const decryptedSSN = decrypt(encryptedSSN);
\`\`\`

---

## 6. Architecture Scalabilité

### 📈 Horizontal Scaling

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
│                   (Vercel Edge)                         │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
│   Instance 1 │  │   Instance 2 │  │   Instance N │
│   (Serverless)│  │   (Serverless)│  │   (Serverless)│
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                ┌─────────▼─────────┐
                │  PostgreSQL       │
                │  (Supabase)       │
                │  • Read replicas  │
                │  • Connection pool│
                └───────────────────┘
\`\`\`

### 🚀 Performance Optimizations

\`\`\`tsx
// 1. Code Splitting
const StudentsPage = lazy(() => import('@/pages/viamentor-students-page'));

// 2. Memoization
const MemoizedTable = React.memo(StudentsTable);

// 3. Virtualization
import { useVirtualizer } from '@tanstack/react-virtual';

// 4. Image Optimization
import Image from 'next/image';

// 5. Cache Strategy
const { data } = useQuery({
  queryKey: ['students'],
  queryFn: fetchStudents,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
\`\`\`

### 📊 Monitoring

\`\`\`tsx
// Sentry Error Tracking
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Performance Monitoring
import { performance } from 'perf_hooks';

const start = performance.now();
await fetchStudents();
const end = performance.now();
console.log(\`Query took \${end - start}ms\`);
\`\`\`

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Query](https://tanstack.com/query)
- [Shadcn UI](https://ui.shadcn.com)

---

**Prochaine section**: [03 - Features & Modules](./03-features-modules.md)
`;

export default architectureDoc;
