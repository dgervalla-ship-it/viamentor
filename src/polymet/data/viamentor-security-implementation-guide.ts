/**
 * ============================================================================
 * VIAMENTOR - SECURITY IMPLEMENTATION GUIDE
 * ============================================================================
 *
 * Guide complet pour implémenter toutes les améliorations de sécurité
 *
 * Sections:
 * 1. Vue d'ensemble
 * 2. RBAC Server-Side
 * 3. API Protection
 * 4. Auth Improvements
 * 5. Checklist implémentation
 * 6. Roadmap
 *
 * @module viamentor-security-implementation-guide
 */

// ============================================================================
// 1. VUE D'ENSEMBLE
// ============================================================================

/**
 * PROBLÈMES CRITIQUES IDENTIFIÉS
 *
 * ❌ CRITIQUE - RBAC Client-Side Only
 * - Vérifications permissions uniquement côté client
 * - Données accessibles même sans permissions
 * - Vulnérabilité majeure de sécurité
 *
 * ❌ MAJEUR - Authentification Incohérente
 * - Mode "no-auth" en dev risqué
 * - Patterns d'auth incohérents
 * - Pas de refresh token automatique
 * - Pas de 2FA ni rate limiting
 *
 * ❌ CRITIQUE - Protection API Manquante
 * - Pas de middleware RBAC
 * - Pas de RLS (Row Level Security)
 * - Endpoints non protégés
 */

/**
 * SOLUTIONS IMPLÉMENTÉES
 *
 * ✅ RBAC Server-Side Middleware
 * - Protection automatique des routes
 * - Vérifications permissions côté serveur
 * - Tenant isolation (RLS)
 * - Audit logging
 *
 * ✅ API Guards & RLS Helpers
 * - Protection API Routes
 * - Row Level Security automatique
 * - Rate limiting
 * - Request validation
 *
 * ✅ Auth Improvements
 * - Refresh token automatique
 * - Two-Factor Authentication (2FA)
 * - Rate limiting login
 * - Device tracking
 * - Security alerts
 */

// ============================================================================
// 2. RBAC SERVER-SIDE - IMPLÉMENTATION
// ============================================================================

/**
 * ÉTAPE 1: Créer middleware.ts à la racine du projet
 *
 * Fichier: middleware.ts
 */
const middlewareImplementation = `
// middleware.ts
export { middleware } from "@/polymet/data/viamentor-rbac-middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
`;

/**
 * ÉTAPE 2: Implémenter validateToken() avec Supabase
 *
 * Fichier: @/polymet/data/viamentor-rbac-middleware
 */
const validateTokenImplementation = `
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Service role key côté serveur uniquement
);

async function validateToken(token: string): Promise<Session | null> {
  try {
    // 1. Vérifier le token avec Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return null;
    }

    // 2. Récupérer les permissions depuis user_metadata ou DB
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role, tenant_id, permissions")
      .eq("id", data.user.id)
      .single();

    if (userError || !userData) {
      return null;
    }

    // 3. Construire la session
    return {
      userId: data.user.id,
      tenantId: userData.tenant_id,
      role: userData.role as UserRole,
      permissions: userData.permissions as Permission[],
      expiresAt: new Date(data.user.expires_at || Date.now() + 24 * 60 * 60 * 1000),
    };
  } catch (error) {
    console.error("[RBAC Middleware] Token validation error:", error);
    return null;
  }
}
`;

/**
 * ÉTAPE 3: Utiliser dans Server Components
 */
const serverComponentExample = `
// app/students/page.tsx
import { checkPermission } from "@/polymet/data/viamentor-rbac-middleware";
import { getStudents } from "@/lib/api/students";

export default async function StudentsPage() {
  // ✅ Vérification server-side
  await checkPermission("students.view");
  
  // ✅ Données protégées
  const students = await getStudents();
  
  return <StudentsList students={students} />;
}
`;

// ============================================================================
// 3. API PROTECTION - IMPLÉMENTATION
// ============================================================================

/**
 * ÉTAPE 1: Protéger une API Route simple
 */
const simpleApiProtection = `
// app/api/students/route.ts
import { requirePermission, applyRLS, createSuccessResponse } from "@/polymet/data/viamentor-api-guards";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // ✅ Vérification permission
  const sessionOrError = await requirePermission(request, "students.view");
  
  if (sessionOrError instanceof NextResponse) {
    return sessionOrError;
  }

  const session = sessionOrError;

  // ✅ Requête avec RLS automatique
  const students = await prisma.student.findMany({
    where: applyRLS(session, {
      status: "active",
    }),
  });

  return createSuccessResponse(students, session);
}
`;

/**
 * ÉTAPE 2: Protéger avec validation body
 */
const apiWithValidation = `
// app/api/students/route.ts
import { requirePermission, validateRequestBody, createSuccessResponse } from "@/polymet/data/viamentor-api-guards";
import { CreateStudentSchema } from "@/polymet/data/viamentor-student-wizard-schemas";

export async function POST(request: NextRequest) {
  // ✅ 1. Vérification permission
  const sessionOrError = await requirePermission(request, "students.create");
  
  if (sessionOrError instanceof NextResponse) {
    return sessionOrError;
  }

  const session = sessionOrError;

  // ✅ 2. Validation body avec Zod
  const bodyResult = await validateRequestBody(request, CreateStudentSchema);
  
  if (!bodyResult.valid) {
    return bodyResult.response;
  }

  const data = bodyResult.data;

  // ✅ 3. Créer avec tenant isolation
  const student = await prisma.student.create({
    data: {
      ...data,
      tenantId: session.tenantId, // ✅ RLS
    },
  });

  return createSuccessResponse(student, session, 201);
}
`;

/**
 * ÉTAPE 3: Protection complète avec rate limiting
 */
const apiWithRateLimit = `
// app/api/students/route.ts
import { apiGuard, applyRLS, createSuccessResponse } from "@/polymet/data/viamentor-api-guards";

export async function GET(request: NextRequest) {
  // ✅ Guard complet avec RBAC + RLS + Rate Limit
  const guardResult = await apiGuard(request, {
    requiredPermission: "students.view",
    requireTenant: true,
    rateLimit: {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
    },
  });

  if (!guardResult.authorized) {
    return guardResult.response;
  }

  const { session } = guardResult;

  const students = await prisma.student.findMany({
    where: applyRLS(session, {
      status: "active",
    }),
  });

  return createSuccessResponse(students, session);
}
`;

// ============================================================================
// 4. AUTH IMPROVEMENTS - IMPLÉMENTATION
// ============================================================================

/**
 * ÉTAPE 1: Refresh Token Automatique
 */
const refreshTokenMiddleware = `
// middleware.ts
import { refreshAccessToken } from "@/polymet/data/viamentor-auth-improvements";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  // Si access token expiré, refresh automatique
  if (!accessToken && refreshToken) {
    const result = await refreshAccessToken(refreshToken.value);

    if (result.success) {
      const response = NextResponse.next();
      
      // ✅ Mettre à jour les cookies
      response.cookies.set("access_token", result.session!.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60, // 15 minutes
      });

      response.cookies.set("refresh_token", result.session!.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 jours
      });

      return response;
    }
  }

  return NextResponse.next();
}
`;

/**
 * ÉTAPE 2: Activer 2FA
 */
const enable2FARoute = `
// app/api/auth/2fa/enable/route.ts
import { enable2FA } from "@/polymet/data/viamentor-auth-improvements";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Activer 2FA avec TOTP
  const result = await enable2FA(session.userId, "totp");

  if (result.success) {
    return NextResponse.json({
      secret: result.secret,
      qrCode: result.qrCode,
      backupCodes: result.backupCodes,
    });
  }

  return NextResponse.json({ error: result.error }, { status: 500 });
}
`;

/**
 * ÉTAPE 3: Login avec 2FA et Rate Limiting
 */
const loginWithSecurity = `
// app/api/auth/login/route.ts
import { 
  verify2FACode, 
  checkLoginRateLimit, 
  recordLoginAttempt,
  registerDevice,
  isKnownDevice,
} from "@/polymet/data/viamentor-auth-improvements";

export async function POST(request: NextRequest) {
  const { email, password, twoFactorCode } = await request.json();

  // ✅ 1. Rate limiting
  const rateLimitResult = await checkLoginRateLimit(email, request.ip!);
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        error: \`Too many attempts. Try again at \${rateLimitResult.resetAt}\`,
        remainingAttempts: rateLimitResult.remainingAttempts,
      },
      { status: 429 }
    );
  }

  // ✅ 2. Vérifier credentials
  const user = await verifyCredentials(email, password);

  if (!user) {
    await recordLoginAttempt({
      userId: "",
      email,
      success: false,
      ipAddress: request.ip!,
      userAgent: request.headers.get("user-agent")!,
      timestamp: new Date(),
      failureReason: "invalid_credentials",
    });

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ✅ 3. Vérifier 2FA si activé
  const config = await get2FAConfig(user.id);

  if (config?.enabled) {
    if (!twoFactorCode) {
      return NextResponse.json({ require2FA: true });
    }

    const verifyResult = await verify2FACode(user.id, twoFactorCode);

    if (!verifyResult.valid) {
      await recordLoginAttempt({
        userId: user.id,
        email,
        success: false,
        ipAddress: request.ip!,
        userAgent: request.headers.get("user-agent")!,
        timestamp: new Date(),
        failureReason: "invalid_2fa_code",
      });

      return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
    }
  }

  // ✅ 4. Device tracking
  const deviceId = request.cookies.get("device_id")?.value;
  const known = deviceId ? await isKnownDevice(user.id, deviceId) : false;

  if (!known) {
    const device = await registerDevice(user.id, request);
    
    // Envoyer email de notification
    await sendNewDeviceEmail(user.email, device);
  }

  // ✅ 5. Login réussi
  await recordLoginAttempt({
    userId: user.id,
    email,
    success: true,
    ipAddress: request.ip!,
    userAgent: request.headers.get("user-agent")!,
    timestamp: new Date(),
  });

  // Générer tokens
  const tokens = await generateTokens(user);

  const response = NextResponse.json({ success: true, user });

  response.cookies.set("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60,
  });

  response.cookies.set("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });

  if (!known) {
    response.cookies.set("device_id", deviceId!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60,
    });
  }

  return response;
}
`;

// ============================================================================
// 5. CHECKLIST IMPLÉMENTATION
// ============================================================================

export const SECURITY_CHECKLIST = {
  "Phase 1 - RBAC Server-Side (CRITIQUE)": {
    priority: "CRITICAL",
    estimatedTime: "2-3 jours",
    tasks: [
      {
        id: "rbac-1",
        task: "Créer middleware.ts à la racine",
        status: "pending" as const,
        file: "middleware.ts",
      },
      {
        id: "rbac-2",
        task: "Implémenter validateToken() avec Supabase",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-rbac-middleware",
      },
      {
        id: "rbac-3",
        task: "Configurer PROTECTED_ROUTES pour toutes les pages",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-rbac-middleware",
      },
      {
        id: "rbac-4",
        task: "Implémenter checkPermission() pour Server Components",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-rbac-middleware",
      },
      {
        id: "rbac-5",
        task: "Configurer audit logging (Supabase/CloudWatch)",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-rbac-middleware",
      },
    ],
  },

  "Phase 2 - API Protection (CRITIQUE)": {
    priority: "CRITICAL",
    estimatedTime: "3-4 jours",
    tasks: [
      {
        id: "api-1",
        task: "Protéger toutes les API Routes avec apiGuard()",
        status: "pending" as const,
        files: "app/api/**/*.ts",
      },
      {
        id: "api-2",
        task: "Implémenter RLS avec applyRLS() sur toutes les queries",
        status: "pending" as const,
        files: "app/api/**/*.ts",
      },
      {
        id: "api-3",
        task: "Ajouter validation Zod sur tous les POST/PUT/PATCH",
        status: "pending" as const,
        files: "app/api/**/*.ts",
      },
      {
        id: "api-4",
        task: "Configurer rate limiting sur endpoints sensibles",
        status: "pending" as const,
        files: "app/api/auth/*, app/api/students/*, etc.",
      },
      {
        id: "api-5",
        task: "Implémenter validateApiToken() avec Supabase",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-api-guards",
      },
    ],
  },

  "Phase 3 - Auth Improvements (MAJEUR)": {
    priority: "HIGH",
    estimatedTime: "4-5 jours",
    tasks: [
      {
        id: "auth-1",
        task: "Implémenter refresh token automatique dans middleware",
        status: "pending" as const,
        file: "middleware.ts",
      },
      {
        id: "auth-2",
        task: "Intégrer library TOTP (speakeasy ou otplib)",
        status: "pending" as const,
        dependencies: ["npm install speakeasy qrcode"],
      },
      {
        id: "auth-3",
        task: "Créer UI pour activer/désactiver 2FA",
        status: "pending" as const,
        files: "app/settings/security/page.tsx",
      },
      {
        id: "auth-4",
        task: "Implémenter rate limiting login avec Redis",
        status: "pending" as const,
        dependencies: ["npm install ioredis"],
      },
      {
        id: "auth-5",
        task: "Créer système de device tracking",
        status: "pending" as const,
        file: "@/polymet/data/viamentor-auth-improvements",
      },
      {
        id: "auth-6",
        task: "Configurer envoi emails/SMS pour security alerts",
        status: "pending" as const,
        dependencies: ["SendGrid, Twilio"],
      },
    ],
  },

  "Phase 4 - Testing & Monitoring (IMPORTANT)": {
    priority: "MEDIUM",
    estimatedTime: "2-3 jours",
    tasks: [
      {
        id: "test-1",
        task: "Tests unitaires RBAC middleware",
        status: "pending" as const,
        file: "__tests__/rbac-middleware.test.ts",
      },
      {
        id: "test-2",
        task: "Tests intégration API Guards",
        status: "pending" as const,
        file: "__tests__/api-guards.test.ts",
      },
      {
        id: "test-3",
        task: "Tests E2E login avec 2FA",
        status: "pending" as const,
        file: "e2e/auth.spec.ts",
      },
      {
        id: "test-4",
        task: "Configurer monitoring Sentry/DataDog",
        status: "pending" as const,
        dependencies: ["Sentry, DataDog"],
      },
      {
        id: "test-5",
        task: "Dashboard audit logs et security alerts",
        status: "pending" as const,
        file: "app/admin/security/page.tsx",
      },
    ],
  },
};

// ============================================================================
// 6. ROADMAP
// ============================================================================

export const SECURITY_ROADMAP = {
  "Semaine 1 - RBAC Server-Side": {
    days: "Lundi-Mercredi",
    focus: "Protection routes et Server Components",
    deliverables: [
      "✅ Middleware RBAC fonctionnel",
      "✅ Toutes les routes protégées",
      "✅ Server Components avec checkPermission()",
      "✅ Audit logging configuré",
    ],
  },

  "Semaine 1 - API Protection": {
    days: "Jeudi-Vendredi",
    focus: "Protection API Routes et RLS",
    deliverables: [
      "✅ Tous les endpoints protégés avec apiGuard()",
      "✅ RLS appliqué sur toutes les queries",
      "✅ Validation Zod sur tous les POST/PUT",
      "✅ Rate limiting configuré",
    ],
  },

  "Semaine 2 - Auth Improvements": {
    days: "Lundi-Vendredi",
    focus: "Refresh tokens, 2FA, device tracking",
    deliverables: [
      "✅ Refresh token automatique",
      "✅ 2FA TOTP fonctionnel",
      "✅ Rate limiting login",
      "✅ Device tracking et security alerts",
      "✅ UI settings sécurité",
    ],
  },

  "Semaine 3 - Testing & Monitoring": {
    days: "Lundi-Mercredi",
    focus: "Tests et monitoring",
    deliverables: [
      "✅ Tests unitaires et intégration",
      "✅ Tests E2E auth",
      "✅ Monitoring configuré",
      "✅ Dashboard security admin",
    ],
  },

  "Semaine 3 - Documentation & Déploiement": {
    days: "Jeudi-Vendredi",
    focus: "Documentation et mise en prod",
    deliverables: [
      "✅ Documentation complète",
      "✅ Guide migration",
      "✅ Déploiement staging",
      "✅ Audit sécurité final",
    ],
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  middlewareImplementation,
  validateTokenImplementation,
  serverComponentExample,
  simpleApiProtection,
  apiWithValidation,
  apiWithRateLimit,
  refreshTokenMiddleware,
  enable2FARoute,
  loginWithSecurity,
};
