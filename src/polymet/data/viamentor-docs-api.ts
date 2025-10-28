/**
 * ============================================================================
 * VIAMENTOR - API.md
 * ============================================================================
 *
 * Documentation complète de l'API ViaMenutor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

// Documentation API exportée comme string
export const API_MD = String.raw`
# 🔌 API Documentation ViaMenutor

## Table des matières

1. [Introduction](#introduction)
2. [Authentification](#authentification)
3. [Endpoints](#endpoints)
4. [Modèles de données](#modèles-de-données)
5. [Codes d'erreur](#codes-derreur)
6. [Rate limiting](#rate-limiting)
7. [Webhooks](#webhooks)

---

## 1. Introduction

### 1.1 Base URL

\`\`\`
Production:  https://api.viamentor.ch/v1
Staging:     https://api-staging.viamentor.ch/v1
Development: http://localhost:3000/api/v1
\`\`\`

### 1.2 Format des requêtes

- **Content-Type:** \`application/json\`
- **Accept:** \`application/json\`
- **Encoding:** UTF-8

### 1.3 Versioning

L'API utilise le versioning dans l'URL: \`/v1/\`, \`/v2/\`, etc.

---

## 2. Authentification

### 2.1 JWT Token

Toutes les requêtes nécessitent un JWT token dans le header:

\`\`\`http
Authorization: Bearer <token>
\`\`\`

### 2.2 Obtenir un token

**Endpoint:** \`POST /auth/login\`

**Request:**
\`\`\`json
{
  "email": "admin@viamentor.ch",
  "password": "viamentor2025"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "user-uuid",
    "email": "admin@viamentor.ch",
    "role": "SCHOOL_ADMIN",
    "tenant_id": "tenant-uuid"
  }
}
\`\`\`

### 2.3 Refresh token

**Endpoint:** \`POST /auth/refresh\`

**Request:**
\`\`\`json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
\`\`\`

### 2.4 Logout

**Endpoint:** \`POST /auth/logout\`

**Request:**
\`\`\`json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Logged out successfully"
}
\`\`\`

---

## 3. Endpoints

### 3.1 Students

#### List students

\`\`\`http
GET /students
\`\`\`

**Query Parameters:**
- \`page\` (number): Page number (default: 1)
- \`limit\` (number): Items per page (default: 20, max: 100)
- \`status\` (string): Filter by status (active, inactive, suspended)
- \`category\` (string): Filter by category (B, A1, A, etc.)
- \`search\` (string): Search by name, email, phone
- \`sort\` (string): Sort field (firstName, lastName, createdAt)
- \`order\` (string): Sort order (asc, desc)

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "student-uuid",
      "firstName": "Marie",
      "lastName": "Dubois",
      "email": "marie.dubois@example.ch",
      "phone": "+41 79 123 45 67",
      "status": "active",
      "category": "B",
      "instructor": {
        "id": "instructor-uuid",
        "firstName": "Jean",
        "lastName": "Martin"
      },
      "progression": {
        "totalLessons": 25,
        "completedLessons": 15,
        "percentage": 60
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-12-20T14:45:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
\`\`\`

#### Get student

\`\`\`http
GET /students/:id
\`\`\`

**Response:**
\`\`\`json
{
  "id": "student-uuid",
  "firstName": "Marie",
  "lastName": "Dubois",
  "email": "marie.dubois@example.ch",
  "phone": "+41 79 123 45 67",
  "dateOfBirth": "2000-05-15",
  "address": {
    "street": "Rue de la Gare 12",
    "city": "Lausanne",
    "postalCode": "1003",
    "canton": "VD"
  },
  "status": "active",
  "category": "B",
  "instructor": {
    "id": "instructor-uuid",
    "firstName": "Jean",
    "lastName": "Martin"
  },
  "progression": {
    "totalLessons": 25,
    "completedLessons": 15,
    "percentage": 60,
    "themes": [
      {
        "id": "theme-1",
        "name": "Circulation en ville",
        "status": "completed"
      }
    ]
  },
  "documents": [
    {
      "id": "doc-uuid",
      "type": "identity_card",
      "status": "validated",
      "url": "https://storage.viamentor.ch/..."
    }
  ],
  "invoices": [
    {
      "id": "invoice-uuid",
      "number": "INV-2024-001",
      "amount": 1500.00,
      "status": "paid"
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-12-20T14:45:00Z"
}
\`\`\`

#### Create student

\`\`\`http
POST /students
\`\`\`

**Request:**
\`\`\`json
{
  "firstName": "Marie",
  "lastName": "Dubois",
  "email": "marie.dubois@example.ch",
  "phone": "+41 79 123 45 67",
  "dateOfBirth": "2000-05-15",
  "address": {
    "street": "Rue de la Gare 12",
    "city": "Lausanne",
    "postalCode": "1003",
    "canton": "VD"
  },
  "category": "B",
  "instructorId": "instructor-uuid"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "student-uuid",
  "firstName": "Marie",
  "lastName": "Dubois",
  "email": "marie.dubois@example.ch",
  "status": "active",
  "createdAt": "2024-12-20T15:00:00Z"
}
\`\`\`

#### Update student

\`\`\`http
PATCH /students/:id
\`\`\`

**Request:**
\`\`\`json
{
  "phone": "+41 79 987 65 43",
  "status": "inactive"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "student-uuid",
  "firstName": "Marie",
  "lastName": "Dubois",
  "phone": "+41 79 987 65 43",
  "status": "inactive",
  "updatedAt": "2024-12-20T15:30:00Z"
}
\`\`\`

#### Delete student

\`\`\`http
DELETE /students/:id
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Student deleted successfully"
}
\`\`\`

---

### 3.2 Instructors

#### List instructors

\`\`\`http
GET /instructors
\`\`\`

**Query Parameters:**
- \`page\`, \`limit\`, \`search\`, \`sort\`, \`order\` (same as students)
- \`status\` (string): active, inactive, on_leave
- \`category\` (string): B, A1, A, etc.
- \`availability\` (boolean): Filter by availability

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "instructor-uuid",
      "firstName": "Jean",
      "lastName": "Martin",
      "email": "jean.martin@viamentor.ch",
      "phone": "+41 79 111 22 33",
      "status": "active",
      "categories": ["B", "A1"],
      "students": {
        "total": 12,
        "active": 10
      },
      "performance": {
        "rating": 4.8,
        "lessonsCompleted": 245,
        "successRate": 92
      },
      "createdAt": "2023-06-10T09:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8,
    "totalPages": 1
  }
}
\`\`\`

---

### 3.3 Lessons

#### List lessons

\`\`\`http
GET /lessons
\`\`\`

**Query Parameters:**
- \`page\`, \`limit\` (pagination)
- \`studentId\` (string): Filter by student
- \`instructorId\` (string): Filter by instructor
- \`vehicleId\` (string): Filter by vehicle
- \`status\` (string): scheduled, completed, cancelled
- \`startDate\` (date): Filter from date
- \`endDate\` (date): Filter to date

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "lesson-uuid",
      "type": "practical",
      "date": "2024-12-21",
      "startTime": "10:00",
      "endTime": "11:45",
      "duration": 105,
      "status": "scheduled",
      "student": {
        "id": "student-uuid",
        "firstName": "Marie",
        "lastName": "Dubois"
      },
      "instructor": {
        "id": "instructor-uuid",
        "firstName": "Jean",
        "lastName": "Martin"
      },
      "vehicle": {
        "id": "vehicle-uuid",
        "brand": "Volkswagen",
        "model": "Golf",
        "plate": "VD 123456"
      },
      "location": {
        "pickup": "Rue de la Gare 12, Lausanne",
        "dropoff": "Rue de la Gare 12, Lausanne"
      },
      "createdAt": "2024-12-15T14:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
\`\`\`

#### Create lesson

\`\`\`http
POST /lessons
\`\`\`

**Request:**
\`\`\`json
{
  "type": "practical",
  "date": "2024-12-21",
  "startTime": "10:00",
  "duration": 105,
  "studentId": "student-uuid",
  "instructorId": "instructor-uuid",
  "vehicleId": "vehicle-uuid",
  "location": {
    "pickup": "Rue de la Gare 12, Lausanne",
    "dropoff": "Rue de la Gare 12, Lausanne"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "lesson-uuid",
  "type": "practical",
  "date": "2024-12-21",
  "startTime": "10:00",
  "endTime": "11:45",
  "status": "scheduled",
  "createdAt": "2024-12-20T16:00:00Z"
}
\`\`\`

---

### 3.4 Invoices

#### List invoices

\`\`\`http
GET /invoices
\`\`\`

**Query Parameters:**
- \`page\`, \`limit\` (pagination)
- \`studentId\` (string): Filter by student
- \`status\` (string): draft, sent, paid, overdue, cancelled
- \`startDate\`, \`endDate\` (date): Filter by date range

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "invoice-uuid",
      "number": "INV-2024-001",
      "date": "2024-12-01",
      "dueDate": "2024-12-31",
      "status": "paid",
      "student": {
        "id": "student-uuid",
        "firstName": "Marie",
        "lastName": "Dubois"
      },
      "items": [
        {
          "description": "Leçon pratique (105 min)",
          "quantity": 10,
          "unitPrice": 150.00,
          "total": 1500.00
        }
      ],
      "subtotal": 1500.00,
      "vat": 114.00,
      "total": 1614.00,
      "paid": 1614.00,
      "balance": 0.00,
      "createdAt": "2024-12-01T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 234,
    "totalPages": 12
  }
}
\`\`\`

#### Create invoice

\`\`\`http
POST /invoices
\`\`\`

**Request:**
\`\`\`json
{
  "studentId": "student-uuid",
  "date": "2024-12-20",
  "dueDate": "2025-01-20",
  "items": [
    {
      "description": "Leçon pratique (105 min)",
      "quantity": 10,
      "unitPrice": 150.00
    }
  ],
  "notes": "Paiement par virement bancaire"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "invoice-uuid",
  "number": "INV-2024-235",
  "status": "draft",
  "total": 1614.00,
  "createdAt": "2024-12-20T16:30:00Z"
}
\`\`\`

---

### 3.5 Vehicles

#### List vehicles

\`\`\`http
GET /vehicles
\`\`\`

**Query Parameters:**
- \`page\`, \`limit\`, \`search\`, \`sort\`, \`order\`
- \`status\` (string): active, maintenance, inactive
- \`category\` (string): B, A1, A, etc.
- \`available\` (boolean): Filter by availability

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "vehicle-uuid",
      "brand": "Volkswagen",
      "model": "Golf",
      "year": 2022,
      "plate": "VD 123456",
      "category": "B",
      "status": "active",
      "mileage": 45000,
      "nextMaintenance": "2025-01-15",
      "insurance": {
        "company": "AXA",
        "policyNumber": "POL-123456",
        "expiryDate": "2025-06-30"
      },
      "createdAt": "2022-03-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
\`\`\`

---

## 4. Modèles de données

### 4.1 Student

\`\`\`typescript
interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: Address
  status: "active" | "inactive" | "suspended"
  category: "B" | "A1" | "A" | "C" | "D"
  instructor: Instructor
  progression: Progression
  documents: Document[]
  invoices: Invoice[]
  createdAt: string
  updatedAt: string
}
\`\`\`

### 4.2 Instructor

\`\`\`typescript
interface Instructor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: "active" | "inactive" | "on_leave"
  categories: string[]
  students: {
    total: number
    active: number
  }
  performance: {
    rating: number
    lessonsCompleted: number
    successRate: number
  }
  createdAt: string
  updatedAt: string
}
\`\`\`

### 4.3 Lesson

\`\`\`typescript
interface Lesson {
  id: string
  type: "practical" | "theory"
  date: string
  startTime: string
  endTime: string
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  student: Student
  instructor: Instructor
  vehicle: Vehicle
  location: {
    pickup: string
    dropoff: string
  }
  evaluation?: Evaluation
  createdAt: string
  updatedAt: string
}
\`\`\`

### 4.4 Invoice

\`\`\`typescript
interface Invoice {
  id: string
  number: string
  date: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  student: Student
  items: InvoiceItem[]
  subtotal: number
  vat: number
  total: number
  paid: number
  balance: number
  createdAt: string
  updatedAt: string
}
\`\`\`

---

## 5. Codes d'erreur

### 5.1 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Requête réussie |
| 201 | Created - Ressource créée |
| 204 | No Content - Suppression réussie |
| 400 | Bad Request - Requête invalide |
| 401 | Unauthorized - Non authentifié |
| 403 | Forbidden - Non autorisé |
| 404 | Not Found - Ressource introuvable |
| 409 | Conflict - Conflit de données |
| 422 | Unprocessable Entity - Validation échouée |
| 429 | Too Many Requests - Rate limit dépassé |
| 500 | Internal Server Error - Erreur serveur |

### 5.2 Error Response Format

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
\`\`\`

### 5.3 Error Codes

| Code | Description |
|------|-------------|
| \`VALIDATION_ERROR\` | Erreur de validation |
| \`AUTHENTICATION_ERROR\` | Erreur d'authentification |
| \`AUTHORIZATION_ERROR\` | Erreur d'autorisation |
| \`NOT_FOUND\` | Ressource introuvable |
| \`CONFLICT\` | Conflit de données |
| \`RATE_LIMIT_EXCEEDED\` | Rate limit dépassé |
| \`INTERNAL_ERROR\` | Erreur interne |

---

## 6. Rate Limiting

### 6.1 Limites

- **Authenticated:** 1000 requêtes / heure
- **Unauthenticated:** 100 requêtes / heure

### 6.2 Headers

\`\`\`http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
\`\`\`

### 6.3 Response 429

\`\`\`json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds."
  }
}
\`\`\`

---

## 7. Webhooks

### 7.1 Configuration

Les webhooks peuvent être configurés dans les paramètres du tenant.

### 7.2 Events

| Event | Description |
|-------|-------------|
| \`student.created\` | Élève créé |
| \`student.updated\` | Élève mis à jour |
| \`student.deleted\` | Élève supprimé |
| \`lesson.scheduled\` | Leçon planifiée |
| \`lesson.completed\` | Leçon terminée |
| \`lesson.cancelled\` | Leçon annulée |
| \`invoice.created\` | Facture créée |
| \`invoice.paid\` | Facture payée |
| \`invoice.overdue\` | Facture en retard |

### 7.3 Payload Format

\`\`\`json
{
  "event": "student.created",
  "timestamp": "2024-12-20T16:00:00Z",
  "data": {
    "id": "student-uuid",
    "firstName": "Marie",
    "lastName": "Dubois",
    "email": "marie.dubois@example.ch"
  }
}
\`\`\`

### 7.4 Signature Verification

Chaque webhook inclut un header \`X-Webhook-Signature\` pour vérifier l'authenticité:

\`\`\`typescript
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(JSON.stringify(payload))
  .digest('hex')

if (signature !== request.headers['x-webhook-signature']) {
  throw new Error('Invalid signature')
}
\`\`\`

---

## Conclusion

Cette API REST suit les standards modernes:
- ✅ RESTful design
- ✅ JWT authentication
- ✅ Pagination
- ✅ Filtering & sorting
- ✅ Error handling
- ✅ Rate limiting
- ✅ Webhooks

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** ViaMenutor Team
`.trim();

// Export par défaut
export default API_MD;

// Export nommé pour compatibilité
export const apiDocumentation = API_MD;
