/**
 * VIAMENTOR - API Endpoints Reference
 * Documentation complète des API endpoints
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Documentation complète des API endpoints ViaMenutor
 *
 * Architecture: REST API avec Next.js App Router
 * Authentication: JWT tokens via Supabase
 * Authorization: RBAC avec middleware
 *
 * Base URL: /api/v1
 * Version: 1.0.0
 */

// ============================================================================
// 🔐 AUTHENTICATION
// ============================================================================

export const AUTH_ENDPOINTS = {
  title: "Authentication",
  baseUrl: "/api/v1/auth",

  endpoints: [
    {
      method: "POST",
      path: "/login",
      description: "Connexion utilisateur",
      body: {
        email: "string (required)",
        password: "string (required)",
      },
      response: {
        success: {
          user: "User object",
          token: "JWT token",
          refreshToken: "Refresh token",
        },
        error: {
          code: "AUTH_INVALID_CREDENTIALS",
          message: "Email ou mot de passe incorrect",
        },
      },
    },
    {
      method: "POST",
      path: "/logout",
      description: "Déconnexion utilisateur",
      headers: {
        Authorization: "Bearer {token}",
      },
      response: {
        success: {
          message: "Déconnexion réussie",
        },
      },
    },
    {
      method: "POST",
      path: "/refresh",
      description: "Rafraîchir le token",
      body: {
        refreshToken: "string (required)",
      },
      response: {
        success: {
          token: "New JWT token",
          refreshToken: "New refresh token",
        },
      },
    },
    {
      method: "POST",
      path: "/forgot-password",
      description: "Demander réinitialisation mot de passe",
      body: {
        email: "string (required)",
      },
      response: {
        success: {
          message: "Email envoyé",
        },
      },
    },
    {
      method: "POST",
      path: "/reset-password",
      description: "Réinitialiser le mot de passe",
      body: {
        token: "string (required)",
        password: "string (required)",
      },
      response: {
        success: {
          message: "Mot de passe réinitialisé",
        },
      },
    },
  ],
};

// ============================================================================
// 👥 STUDENTS
// ============================================================================

export const STUDENTS_ENDPOINTS = {
  title: "Students",
  baseUrl: "/api/v1/students",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des élèves",
      queryParams: {
        page: "number (default: 1)",
        limit: "number (default: 20)",
        status: "string (active|paused|completed)",
        category: "string (B|A1|A|C|D)",
        instructorId: "string",
        search: "string",
      },
      response: {
        success: {
          data: "Student[]",
          pagination: {
            page: "number",
            limit: "number",
            total: "number",
            totalPages: "number",
          },
        },
      },
    },
    {
      method: "GET",
      path: "/:id",
      description: "Détail d'un élève",
      params: {
        id: "string (required)",
      },
      response: {
        success: {
          data: "Student object with full details",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Créer un élève",
      body: {
        firstName: "string (required)",
        lastName: "string (required)",
        email: "string (required)",
        phone: "string (required)",
        dateOfBirth: "string (ISO date, required)",
        address: "Address object (required)",
        category: "string (required)",
        instructorId: "string (required)",
        documents: "Document[] (required)",
      },
      response: {
        success: {
          data: "Created Student object",
          message: "Élève créé avec succès",
        },
      },
    },
    {
      method: "PATCH",
      path: "/:id",
      description: "Modifier un élève",
      params: {
        id: "string (required)",
      },
      body: {
        // Tous les champs optionnels
        firstName: "string",
        lastName: "string",
        email: "string",
        // ...
      },
      response: {
        success: {
          data: "Updated Student object",
          message: "Élève modifié avec succès",
        },
      },
    },
    {
      method: "DELETE",
      path: "/:id",
      description: "Supprimer un élève",
      params: {
        id: "string (required)",
      },
      response: {
        success: {
          message: "Élève supprimé avec succès",
        },
      },
    },
  ],
};

// ============================================================================
// 👨‍🏫 INSTRUCTORS
// ============================================================================

export const INSTRUCTORS_ENDPOINTS = {
  title: "Instructors",
  baseUrl: "/api/v1/instructors",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des moniteurs",
      queryParams: {
        page: "number",
        limit: "number",
        status: "string",
        category: "string",
        available: "boolean",
      },
      response: {
        success: {
          data: "Instructor[]",
          pagination: "Pagination object",
        },
      },
    },
    {
      method: "GET",
      path: "/:id",
      description: "Détail d'un moniteur",
      response: {
        success: {
          data: "Instructor object with full details",
        },
      },
    },
    {
      method: "GET",
      path: "/:id/availability",
      description: "Disponibilités d'un moniteur",
      queryParams: {
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
      },
      response: {
        success: {
          data: "Availability[]",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Créer un moniteur",
      body: {
        firstName: "string (required)",
        lastName: "string (required)",
        email: "string (required)",
        categories: "string[] (required)",
        omcoNumber: "string (required)",
        // ...
      },
      response: {
        success: {
          data: "Created Instructor object",
        },
      },
    },
  ],
};

// ============================================================================
// 📅 LESSONS
// ============================================================================

export const LESSONS_ENDPOINTS = {
  title: "Lessons",
  baseUrl: "/api/v1/lessons",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des leçons",
      queryParams: {
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
        studentId: "string",
        instructorId: "string",
        vehicleId: "string",
        status: "string",
      },
      response: {
        success: {
          data: "Lesson[]",
        },
      },
    },
    {
      method: "GET",
      path: "/:id",
      description: "Détail d'une leçon",
      response: {
        success: {
          data: "Lesson object with full details",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Créer une leçon",
      body: {
        studentId: "string (required)",
        instructorId: "string (required)",
        vehicleId: "string (required)",
        date: "string (ISO date, required)",
        startTime: "string (HH:mm, required)",
        duration: "number (minutes, required)",
        type: "string (required)",
        pickupLocation: "string",
      },
      response: {
        success: {
          data: "Created Lesson object",
        },
      },
    },
    {
      method: "PATCH",
      path: "/:id",
      description: "Modifier une leçon",
      body: {
        date: "string (ISO date)",
        startTime: "string (HH:mm)",
        // ...
      },
      response: {
        success: {
          data: "Updated Lesson object",
        },
      },
    },
    {
      method: "DELETE",
      path: "/:id",
      description: "Annuler une leçon",
      body: {
        reason: "string (required)",
      },
      response: {
        success: {
          message: "Leçon annulée avec succès",
        },
      },
    },
    {
      method: "POST",
      path: "/:id/complete",
      description: "Marquer leçon comme complétée",
      body: {
        evaluation: "Evaluation object (required)",
        comments: "string",
      },
      response: {
        success: {
          data: "Updated Lesson object",
        },
      },
    },
  ],
};

// ============================================================================
// 💰 INVOICES
// ============================================================================

export const INVOICES_ENDPOINTS = {
  title: "Invoices",
  baseUrl: "/api/v1/invoices",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des factures",
      queryParams: {
        page: "number",
        limit: "number",
        studentId: "string",
        status: "string (paid|pending|overdue)",
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
      },
      response: {
        success: {
          data: "Invoice[]",
          pagination: "Pagination object",
        },
      },
    },
    {
      method: "GET",
      path: "/:id",
      description: "Détail d'une facture",
      response: {
        success: {
          data: "Invoice object with full details",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Créer une facture",
      body: {
        studentId: "string (required)",
        items: "InvoiceItem[] (required)",
        dueDate: "string (ISO date)",
        notes: "string",
      },
      response: {
        success: {
          data: "Created Invoice object",
        },
      },
    },
    {
      method: "POST",
      path: "/:id/send",
      description: "Envoyer facture par email",
      body: {
        email: "string",
        message: "string",
      },
      response: {
        success: {
          message: "Facture envoyée avec succès",
        },
      },
    },
    {
      method: "GET",
      path: "/:id/pdf",
      description: "Télécharger PDF facture",
      response: {
        success: "PDF file",
      },
    },
  ],
};

// ============================================================================
// 💳 PAYMENTS
// ============================================================================

export const PAYMENTS_ENDPOINTS = {
  title: "Payments",
  baseUrl: "/api/v1/payments",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des paiements",
      queryParams: {
        page: "number",
        limit: "number",
        invoiceId: "string",
        studentId: "string",
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
      },
      response: {
        success: {
          data: "Payment[]",
          pagination: "Pagination object",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Enregistrer un paiement",
      body: {
        invoiceId: "string (required)",
        amount: "number (required)",
        method: "string (required)",
        date: "string (ISO date, required)",
        reference: "string",
      },
      response: {
        success: {
          data: "Created Payment object",
        },
      },
    },
    {
      method: "POST",
      path: "/import-camt",
      description: "Importer fichier Camt.054",
      body: {
        file: "File (required)",
      },
      response: {
        success: {
          data: {
            transactions: "CamtTransaction[]",
            matched: "number",
            unmatched: "number",
          },
        },
      },
    },
  ],
};

// ============================================================================
// 📊 ANALYTICS
// ============================================================================

export const ANALYTICS_ENDPOINTS = {
  title: "Analytics",
  baseUrl: "/api/v1/analytics",

  endpoints: [
    {
      method: "GET",
      path: "/revenue",
      description: "Analytics revenus",
      queryParams: {
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
        groupBy: "string (day|week|month)",
      },
      response: {
        success: {
          data: {
            mrr: "number",
            revenue: "number",
            growth: "number",
            forecast: "number[]",
          },
        },
      },
    },
    {
      method: "GET",
      path: "/instructors",
      description: "Analytics moniteurs",
      queryParams: {
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
      },
      response: {
        success: {
          data: {
            performance: "InstructorPerformance[]",
            ranking: "InstructorRanking[]",
          },
        },
      },
    },
    {
      method: "GET",
      path: "/exams",
      description: "Analytics examens",
      queryParams: {
        startDate: "string (ISO date)",
        endDate: "string (ISO date)",
        category: "string",
      },
      response: {
        success: {
          data: {
            successRate: "number",
            averageAttempts: "number",
            byCategory: "ExamStats[]",
          },
        },
      },
    },
  ],
};

// ============================================================================
// 🚗 VEHICLES
// ============================================================================

export const VEHICLES_ENDPOINTS = {
  title: "Vehicles",
  baseUrl: "/api/v1/vehicles",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des véhicules",
      response: {
        success: {
          data: "Vehicle[]",
        },
      },
    },
    {
      method: "GET",
      path: "/:id",
      description: "Détail d'un véhicule",
      response: {
        success: {
          data: "Vehicle object with full details",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Créer un véhicule",
      body: {
        brand: "string (required)",
        model: "string (required)",
        year: "number (required)",
        plate: "string (required)",
        category: "string (required)",
        // ...
      },
      response: {
        success: {
          data: "Created Vehicle object",
        },
      },
    },
  ],
};

// ============================================================================
// 📝 EXAMS
// ============================================================================

export const EXAMS_ENDPOINTS = {
  title: "Exams",
  baseUrl: "/api/v1/exams",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des examens",
      response: {
        success: {
          data: "Exam[]",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Inscrire à un examen",
      body: {
        studentId: "string (required)",
        type: "string (required)",
        date: "string (ISO date, required)",
      },
      response: {
        success: {
          data: "Created Exam object",
        },
      },
    },
    {
      method: "POST",
      path: "/:id/result",
      description: "Enregistrer résultat",
      body: {
        passed: "boolean (required)",
        score: "number",
        comments: "string",
      },
      response: {
        success: {
          data: "Updated Exam object",
        },
      },
    },
  ],
};

// ============================================================================
// 🔄 MAKEUPS
// ============================================================================

export const MAKEUPS_ENDPOINTS = {
  title: "Makeups",
  baseUrl: "/api/v1/makeups",

  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Liste des crédits",
      queryParams: {
        studentId: "string",
        instructorId: "string",
        status: "string (active|used|expired)",
      },
      response: {
        success: {
          data: "Makeup[]",
        },
      },
    },
    {
      method: "POST",
      path: "/",
      description: "Accorder un crédit",
      body: {
        studentId: "string (required)",
        reason: "string (required)",
        expiresAt: "string (ISO date, required)",
      },
      response: {
        success: {
          data: "Created Makeup object",
        },
      },
    },
    {
      method: "DELETE",
      path: "/:id",
      description: "Annuler un crédit",
      response: {
        success: {
          message: "Crédit annulé avec succès",
        },
      },
    },
  ],
};

// ============================================================================
// 📋 RÉSUMÉ
// ============================================================================

export const API_SUMMARY = {
  totalEndpoints: 50,
  categories: [
    "Authentication (5)",
    "Students (5)",
    "Instructors (4)",
    "Lessons (6)",
    "Invoices (5)",
    "Payments (3)",
    "Analytics (3)",
    "Vehicles (3)",
    "Exams (3)",
    "Makeups (3)",
  ],

  authentication: "JWT Bearer tokens",
  rateLimit: "100 requests/minute",
  pagination: "Cursor-based pagination",
  errorHandling: "Standard HTTP status codes + error objects",
};

export const API_REFERENCE_VERSION = "1.0.0";
export const API_REFERENCE_LAST_UPDATE = "2025-01-20";
