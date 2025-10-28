/**
 * VIAMENTOR - DOCUMENTATION 04: API + GUIDES + SETUP + DEPLOYMENT
 */

export const apiGuidesDoc = `
# 📚 Viamentor - API, Guides & Deployment

## 📋 Table des matières

### PARTIE 1: API REFERENCE
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Students API](#students-api)
4. [Instructors API](#instructors-api)
5. [Vehicles API](#vehicles-api)
6. [Lessons API](#lessons-api)
7. [Invoices API](#invoices-api)

### PARTIE 2: GUIDES UTILISATEURS
8. [Guide Platform Admin](#guide-platform-admin)
9. [Guide School Admin](#guide-school-admin)
10. [Guide Secretary](#guide-secretary)
11. [Guide Instructor](#guide-instructor)
12. [Guide Student](#guide-student)

### PARTIE 3: DÉVELOPPEMENT
13. [Setup Local](#setup-local)
14. [Coding Standards](#coding-standards)
15. [Testing Strategy](#testing-strategy)

### PARTIE 4: DÉPLOIEMENT
16. [Environments](#environments)
17. [CI/CD Pipeline](#cicd-pipeline)
18. [Monitoring](#monitoring)

---

# PARTIE 1: API REFERENCE

## 1. API Overview

### 🌐 Base URL

\`\`\`
Development:  http://localhost:3000/api
Staging:      https://staging.viamentor.ch/api
Production:   https://api.viamentor.ch
\`\`\`

### 📡 Endpoints Structure

\`\`\`
/api
├── /auth
│   ├── POST   /login
│   ├── POST   /logout
│   ├── POST   /refresh
│   └── GET    /me
├── /students
│   ├── GET    /students
│   ├── POST   /students
│   ├── GET    /students/:id
│   ├── PUT    /students/:id
│   ├── DELETE /students/:id
│   └── GET    /students/:id/lessons
├── /instructors
│   ├── GET    /instructors
│   ├── POST   /instructors
│   ├── GET    /instructors/:id
│   ├── PUT    /instructors/:id
│   └── GET    /instructors/:id/availability
├── /vehicles
│   ├── GET    /vehicles
│   ├── POST   /vehicles
│   ├── GET    /vehicles/:id
│   └── PUT    /vehicles/:id
├── /lessons
│   ├── GET    /lessons
│   ├── POST   /lessons
│   ├── GET    /lessons/:id
│   ├── PUT    /lessons/:id
│   └── DELETE /lessons/:id
└── /invoices
    ├── GET    /invoices
    ├── POST   /invoices
    ├── GET    /invoices/:id
    └── POST   /invoices/:id/payments
\`\`\`

### 🔐 Authentication

Toutes les requêtes (sauf /auth/login) nécessitent un token JWT :

\`\`\`http
Authorization: Bearer <token>
\`\`\`

---

## 2. Authentication

### POST /api/auth/login

**Request:**
\`\`\`json
{
  "email": "admin@autoecole.ch",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "usr_123",
    "email": "admin@autoecole.ch",
    "firstName": "Jean",
    "lastName": "Dupont",
    "role": "school_admin",
    "tenantId": "tenant_456"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
\`\`\`

### GET /api/auth/me

**Response:**
\`\`\`json
{
  "id": "usr_123",
  "email": "admin@autoecole.ch",
  "firstName": "Jean",
  "lastName": "Dupont",
  "role": "school_admin",
  "tenantId": "tenant_456",
  "permissions": ["students:*", "instructors:*", "vehicles:*"]
}
\`\`\`

---

## 3. Students API

### GET /api/students

**Query Parameters:**
\`\`\`
?status=active           # Filter by status
?category=B              # Filter by category
?instructorId=inst_123   # Filter by instructor
?search=jean             # Search by name/email
?page=1                  # Pagination
&limit=25                # Items per page
\`\`\`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "std_123",
      "firstName": "Jean",
      "lastName": "Dupont",
      "email": "jean.dupont@email.ch",
      "phone": "+41 79 123 45 67",
      "dateOfBirth": "2000-05-15",
      "category": "B",
      "status": "active",
      "enrollmentDate": "2024-01-15",
      "instructor": {
        "id": "inst_456",
        "firstName": "Marie",
        "lastName": "Martin"
      },
      "lessonsCount": 15,
      "hoursCompleted": 22.5,
      "nextLesson": {
        "date": "2025-01-20",
        "startTime": "14:00"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 45,
    "totalPages": 2
  }
}
\`\`\`

### POST /api/students

**Request:**
\`\`\`json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@email.ch",
  "phone": "+41 79 123 45 67",
  "dateOfBirth": "2000-05-15",
  "address": "Rue de la Gare 12",
  "city": "Lausanne",
  "postalCode": "1003",
  "canton": "VD",
  "category": "B",
  "instructorId": "inst_456",
  "vehicleId": "veh_789"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "std_123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "status": "active",
  "createdAt": "2025-01-15T10:30:00Z"
}
\`\`\`

### GET /api/students/:id

**Response:**
\`\`\`json
{
  "id": "std_123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@email.ch",
  "phone": "+41 79 123 45 67",
  "dateOfBirth": "2000-05-15",
  "address": "Rue de la Gare 12",
  "city": "Lausanne",
  "postalCode": "1003",
  "canton": "VD",
  "category": "B",
  "status": "active",
  "enrollmentDate": "2024-01-15",
  "instructor": {
    "id": "inst_456",
    "firstName": "Marie",
    "lastName": "Martin",
    "phone": "+41 79 987 65 43"
  },
  "vehicle": {
    "id": "veh_789",
    "plate": "VD-123456",
    "brand": "VW",
    "model": "Golf"
  },
  "progression": {
    "lessonsCompleted": 15,
    "hoursCompleted": 22.5,
    "themesCompleted": 18,
    "themesTotal": 28,
    "theoryExamDate": "2024-12-15",
    "theoryExamPassed": true,
    "practicalExamDate": null
  },
  "documents": [
    {
      "id": "doc_1",
      "type": "learner_permit",
      "name": "Permis d'élève conducteur",
      "url": "https://storage.viamentor.ch/docs/...",
      "uploadDate": "2024-01-15"
    }
  ]
}
\`\`\`

---

## 4. Instructors API

### GET /api/instructors

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "inst_456",
      "firstName": "Marie",
      "lastName": "Martin",
      "email": "marie.martin@autoecole.ch",
      "phone": "+41 79 987 65 43",
      "categories": ["B", "A1"],
      "omcoNumber": "OMCo-12345",
      "omcoExpiryDate": "2026-12-31",
      "status": "active",
      "studentsCount": 12,
      "lessonsThisWeek": 18,
      "rating": 4.8
    }
  ]
}
\`\`\`

### GET /api/instructors/:id/availability

**Query Parameters:**
\`\`\`
?date=2025-01-20    # Specific date
?week=2025-W03      # Specific week
\`\`\`

**Response:**
\`\`\`json
{
  "instructorId": "inst_456",
  "date": "2025-01-20",
  "slots": [
    {
      "startTime": "08:00",
      "endTime": "09:30",
      "available": true
    },
    {
      "startTime": "09:30",
      "endTime": "11:00",
      "available": false,
      "reason": "Leçon réservée - Jean Dupont"
    },
    {
      "startTime": "14:00",
      "endTime": "15:30",
      "available": true
    }
  ]
}
\`\`\`

---

## 5. Vehicles API

### GET /api/vehicles

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "veh_789",
      "plate": "VD-123456",
      "brand": "VW",
      "model": "Golf",
      "year": 2022,
      "category": "B",
      "status": "available",
      "mileage": 45000,
      "nextInspection": "2025-06-15",
      "utilizationRate": 78.5
    }
  ]
}
\`\`\`

---

## 6. Lessons API

### POST /api/lessons

**Request:**
\`\`\`json
{
  "type": "practical",
  "date": "2025-01-20",
  "startTime": "14:00",
  "duration": 90,
  "studentId": "std_123",
  "instructorId": "inst_456",
  "vehicleId": "veh_789",
  "price": 120.00
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "lesson_999",
  "status": "scheduled",
  "createdAt": "2025-01-15T10:30:00Z"
}
\`\`\`

---

## 7. Invoices API

### POST /api/invoices

**Request:**
\`\`\`json
{
  "studentId": "std_123",
  "date": "2025-01-15",
  "dueDate": "2025-01-30",
  "items": [
    {
      "description": "Leçon pratique 90 min",
      "quantity": 10,
      "unitPrice": 120.00,
      "total": 1200.00
    }
  ],
  "subtotal": 1200.00,
  "taxRate": 0.077,
  "taxAmount": 92.40,
  "total": 1292.40
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "inv_555",
  "number": "2025-001",
  "qrReference": "RF18 5390 0754 7034 3",
  "qrIban": "CH44 3000 0001 2345 6789 0",
  "pdfUrl": "https://storage.viamentor.ch/invoices/2025-001.pdf"
}
\`\`\`

---

# PARTIE 2: GUIDES UTILISATEURS

## 8. Guide Platform Admin

### 🎯 Rôle et responsabilités

Le **Platform Admin** gère l'ensemble de la plateforme Viamentor :
- Gestion des tenants (auto-écoles)
- Monitoring global
- Support technique
- Facturation SaaS

### 📊 Dashboard

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  PLATFORM ADMIN DASHBOARD                               │
├─────────────────────────────────────────────────────────┤
│  KPIs                                                   │
│  • Total Tenants: 45                                    │
│  • Active Users: 1,234                                  │
│  • MRR: CHF 12,450                                      │
│  • Churn Rate: 2.3%                                     │
├─────────────────────────────────────────────────────────┤
│  Recent Tenants                                         │
│  • Auto-École Lausanne (VD) - Professional             │
│  • Fahrschule Zürich (ZH) - Enterprise                 │
│  • Scuola Guida Lugano (TI) - Starter                  │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Tâches principales

#### 1. Créer un nouveau tenant
1. Cliquer sur "Nouveau tenant"
2. Remplir le wizard (5 steps) :
   - Informations école
   - Utilisateur admin
   - Plan & facturation
   - Configuration modules
   - Résumé
3. Valider la création

#### 2. Gérer les abonnements
1. Accéder à "Finance > Subscriptions"
2. Voir la liste des tenants
3. Actions possibles :
   - Changer de plan
   - Suspendre
   - Annuler
   - Facturer

#### 3. Support technique
1. Accéder à "Support > Tickets"
2. Voir les demandes
3. Répondre et résoudre

---

## 9. Guide School Admin

### 🎯 Rôle et responsabilités

Le **School Admin** gère son auto-école :
- Élèves, moniteurs, véhicules
- Planning et réservations
- Facturation et paiements
- Analytics et reporting

### 📊 Dashboard

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  SCHOOL ADMIN DASHBOARD                                 │
├─────────────────────────────────────────────────────────┤
│  KPIs                                                   │
│  • Élèves actifs: 45                                    │
│  • Moniteurs: 8                                         │
│  • Véhicules: 6                                         │
│  • Leçons cette semaine: 156                            │
│  • Revenus du mois: CHF 18,450                          │
├─────────────────────────────────────────────────────────┤
│  Activité récente                                       │
│  • Nouvelle inscription: Jean Dupont (Catégorie B)      │
│  • Examen réussi: Marie Dubois (Catégorie A1)          │
│  • Maintenance véhicule: VD-123456 (Golf)               │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Tâches principales

#### 1. Inscrire un nouvel élève
1. Accéder à "Élèves"
2. Cliquer sur "Nouvel élève"
3. Remplir le wizard (4 steps) :
   - Identité
   - Formation
   - Documents légaux
   - Résumé
4. Valider l'inscription

#### 2. Gérer le planning
1. Accéder à "Planning"
2. Choisir la vue (Mois/Semaine/Jour)
3. Actions possibles :
   - Réserver une leçon
   - Déplacer (drag & drop)
   - Annuler
   - Modifier

#### 3. Créer une facture
1. Accéder à "Facturation"
2. Cliquer sur "Nouvelle facture"
3. Sélectionner l'élève
4. Ajouter les prestations
5. Générer le QR-Bill
6. Envoyer par email

---

## 10. Guide Secretary

### 🎯 Rôle et responsabilités

Le **Secretary** gère les tâches administratives :
- Inscriptions rapides
- Planning quotidien
- Communications (emails, SMS)
- Tâches et rappels

### 📊 Dashboard

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  SECRETARY DASHBOARD                                    │
├─────────────────────────────────────────────────────────┤
│  Tâches du jour                                         │
│  • Rappeler Jean Dupont pour leçon 14h                  │
│  • Envoyer facture à Marie Dubois                       │
│  • Confirmer cours théorique samedi                     │
├─────────────────────────────────────────────────────────┤
│  Messages non lus: 5                                    │
│  Appels manqués: 2                                      │
│  Inscriptions en attente: 3                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Tâches principales

#### 1. Inscription rapide
1. Accéder à "Inscriptions"
2. Cliquer sur "Inscription rapide"
3. Remplir le formulaire simplifié
4. Valider

#### 2. Gérer les communications
1. Accéder à "Messages"
2. Voir les conversations
3. Répondre aux messages
4. Envoyer des SMS groupés

---

## 11. Guide Instructor

### 🎯 Rôle et responsabilités

Le **Instructor** (Moniteur) gère ses leçons :
- Planning personnel
- Évaluation élèves
- Gestion documents
- Performance tracking

### 📊 Dashboard

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  INSTRUCTOR DASHBOARD                                   │
├─────────────────────────────────────────────────────────┤
│  Planning du jour                                       │
│  • 08:00-09:30 - Jean Dupont (Catégorie B)             │
│  • 10:00-11:30 - Marie Dubois (Catégorie A1)           │
│  • 14:00-15:30 - Pierre Martin (Catégorie B)           │
├─────────────────────────────────────────────────────────┤
│  Mes élèves: 12                                         │
│  Leçons cette semaine: 18                               │
│  Satisfaction: 4.8/5 ⭐                                  │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Tâches principales

#### 1. Évaluer une leçon
1. Accéder à "Planning"
2. Cliquer sur la leçon terminée
3. Remplir l'évaluation :
   - Thèmes L-drive travaillés
   - Notation (1-5)
   - Commentaires
   - Signature digitale
4. Valider

#### 2. Gérer mes disponibilités
1. Accéder à "Profil > Disponibilités"
2. Définir les créneaux récurrents
3. Ajouter des exceptions (congés)
4. Sauvegarder

---

## 12. Guide Student

### 🎯 Rôle et responsabilités

Le **Student** (Élève) gère sa formation :
- Réservation leçons
- Suivi progression
- Documents personnels
- Paiements en ligne

### 📊 Dashboard

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  STUDENT DASHBOARD                                      │
├─────────────────────────────────────────────────────────┤
│  Ma progression                                         │
│  • Heures de conduite: 22.5 / 25                        │
│  • Thèmes L-drive: 18 / 28                              │
│  • Examen théorique: ✅ Réussi (15.12.2024)             │
│  • Examen pratique: 📅 À planifier                      │
├─────────────────────────────────────────────────────────┤
│  Prochaine leçon                                        │
│  • Date: Lundi 20.01.2025                               │
│  • Heure: 14:00-15:30                                   │
│  • Moniteur: Marie Martin                               │
│  • Véhicule: VW Golf (VD-123456)                        │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔧 Tâches principales

#### 1. Réserver une leçon
1. Accéder à "Mes leçons"
2. Cliquer sur "Réserver"
3. Choisir :
   - Moniteur
   - Date et heure
   - Durée (45/90/135 min)
4. Confirmer la réservation

#### 2. Payer une facture
1. Accéder à "Facturation"
2. Voir les factures en attente
3. Cliquer sur "Payer"
4. Choisir le moyen de paiement :
   - Carte bancaire
   - Twint
   - QR-Bill (scan)
5. Valider le paiement

---

# PARTIE 3: DÉVELOPPEMENT

## 13. Setup Local

### 📦 Prérequis

\`\`\`bash
Node.js >= 18.0.0
npm >= 9.0.0
PostgreSQL >= 14
Git
\`\`\`

### 🚀 Installation

\`\`\`bash
# 1. Clone repository
git clone https://github.com/viamentor/viamentor.git
cd viamentor

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Edit .env.local with your values:
# DATABASE_URL="postgresql://user:password@localhost:5432/viamentor"
# NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"

# 4. Setup database
npx prisma migrate dev
npx prisma db seed

# 5. Start development server
npm run dev
\`\`\`

### 🌐 Access

\`\`\`
Application: http://localhost:3000
API:         http://localhost:3000/api
Prisma Studio: http://localhost:5555
\`\`\`

---

## 14. Coding Standards

### 📝 TypeScript

\`\`\`typescript
// ✅ Good
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function getStudent(id: string): Promise<Student> {
  return prisma.student.findUnique({ where: { id } });
}

// ❌ Bad
function getStudent(id: any): any {
  return prisma.student.findUnique({ where: { id } });
}
\`\`\`

### 🎨 React Components

\`\`\`tsx
// ✅ Good
interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
}

export function StudentCard({ student, onEdit }: StudentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.firstName} {student.lastName}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ... */}
      </CardContent>
    </Card>
  );
}

// ❌ Bad
export function StudentCard(props: any) {
  return <div>{props.student.name}</div>;
}
\`\`\`

### 📁 File Naming

\`\`\`
Components:  kebab-case.tsx  (viamentor-student-card.tsx)
Pages:       kebab-case.tsx  (viamentor-students-page.tsx)
Data:        kebab-case.ts   (viamentor-students-data.ts)
Types:       PascalCase      (Student, Instructor)
Functions:   camelCase       (getStudent, createInvoice)
\`\`\`

---

## 15. Testing Strategy

### 🧪 Tests unitaires (Vitest)

\`\`\`typescript
// __tests__/components/student-card.test.tsx
import { render, screen } from '@testing-library/react';
import { StudentCard } from '@/components/viamentor-student-card';

describe('StudentCard', () => {
  it('renders student name', () => {
    const student = {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@email.ch',
    };
    
    render(<StudentCard student={student} />);
    
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
  });
});
\`\`\`

### 🎭 Tests E2E (Playwright)

\`\`\`typescript
// e2e/student-booking.spec.ts
import { test, expect } from '@playwright/test';

test('student can book a lesson', async ({ page }) => {
  await page.goto('/student/lessons/book');
  
  await page.click('[data-testid="instructor-select"]');
  await page.click('text=Marie Martin');
  
  await page.click('[data-testid="date-picker"]');
  await page.click('text=20');
  
  await page.click('button:has-text("Réserver")');
  
  await expect(page.locator('text=Leçon réservée')).toBeVisible();
});
\`\`\`

---

# PARTIE 4: DÉPLOIEMENT

## 16. Environments

### 🌍 Environnements

\`\`\`
Development:  http://localhost:3000
Staging:      https://staging.viamentor.ch
Production:   https://app.viamentor.ch
\`\`\`

### 🔐 Variables d'environnement

\`\`\`bash
# .env.production
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SENTRY_DSN="https://..."
STRIPE_SECRET_KEY="sk_live_..."
\`\`\`

---

## 17. CI/CD Pipeline

### 🔄 GitHub Actions

\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run test:e2e
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v2
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
\`\`\`

---

## 18. Monitoring

### 📊 Sentry Error Tracking

\`\`\`typescript
// sentry.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  },
});
\`\`\`

### 📈 Performance Monitoring

\`\`\`typescript
// lib/monitoring.ts
export function trackPerformance(metric: string, value: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
      event_category: 'Performance',
    });
  }
}
\`\`\`

---

## 📚 Ressources supplémentaires

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Sentry Docs](https://docs.sentry.io)

---

**FIN DE LA DOCUMENTATION COMPLÈTE**

Pour toute question : support@viamentor.ch
`;

export default apiGuidesDoc;
