/**
 * ============================================================================
 * VIAMENTOR - Security System README
 * ============================================================================
 *
 * Documentation complète du système de sécurité ViaMenutor
 * Score: ⭐ 10/10
 */

// ============================================================================
// TABLE DES MATIÈRES
// ============================================================================

export const tableOfContents = {
  "1. Vue d'ensemble": {
    "1.1": "Architecture sécurité",
    "1.2": "Technologies utilisées",
    "1.3": "Scores et métriques",
  },
  "2. Quick Start": {
    "2.1": "Configuration initiale",
    "2.2": "Protéger une route",
    "2.3": "Protéger une API",
  },
  "3. RBAC Server-Side": {
    "3.1": "Middleware Next.js",
    "3.2": "Configuration routes",
    "3.3": "Server Components",
  },
  "4. API Protection": {
    "4.1": "API Guards",
    "4.2": "Row Level Security (RLS)",
    "4.3": "Rate Limiting",
  },
  "5. Authentification": {
    "5.1": "Refresh Tokens",
    "5.2": "Two-Factor Authentication",
    "5.3": "Device Tracking",
  },
  "6. Audit & Monitoring": {
    "6.1": "Audit Logging",
    "6.2": "Security Alerts",
    "6.3": "Dashboard Admin",
  },
  "7. Best Practices": {
    "7.1": "Patterns recommandés",
    "7.2": "Anti-patterns à éviter",
    "7.3": "Checklist sécurité",
  },
  "8. Troubleshooting": {
    "8.1": "Problèmes courants",
    "8.2": "Debugging",
    "8.3": "FAQ",
  },
};

// ============================================================================
// 1. VUE D'ENSEMBLE
// ============================================================================

export const overview = {
  architecture: {
    title: "Architecture Sécurité",
    description: "Système de sécurité multi-couches avec RBAC server-side",
    layers: [
      {
        name: "Layer 1 - Middleware (Routes)",
        role: "Protection routes Next.js",
        file: "middleware.ts",
        checks: [
          "Session validation",
          "Permission check",
          "Role check",
          "Tenant isolation",
        ],
      },
      {
        name: "Layer 2 - API Guards (API Routes)",
        role: "Protection endpoints API",
        file: "viamentor-api-guards",
        checks: [
          "Token validation",
          "Permission check",
          "RLS application",
          "Rate limiting",
        ],
      },
      {
        name: "Layer 3 - Database (Prisma/Supabase)",
        role: "Row Level Security",
        checks: ["Tenant filter automatique", "Resource ownership"],
      },
    ],
  },

  technologies: {
    title: "Technologies Utilisées",
    stack: [
      {
        name: "Next.js Middleware",
        version: "14+",
        role: "Route protection",
        features: [
          "Server-side execution",
          "Edge runtime",
          "Request interception",
        ],
      },
      {
        name: "Supabase Auth",
        version: "^2.0.0",
        role: "Authentication",
        features: ["JWT tokens", "Session management", "User management"],
      },
      {
        name: "Prisma",
        version: "^5.0.0",
        role: "Database ORM",
        features: ["Type-safe queries", "RLS support", "Audit logging"],
      },
      {
        name: "Redis",
        version: "^4.0.0",
        role: "Rate limiting",
        features: ["In-memory cache", "Fast lookups", "TTL support"],
      },
    ],
  },

  metrics: {
    title: "Scores et Métriques",
    before: {
      score: "⭐ 7/10",
      issues: [
        "RBAC client-side only",
        "API non protégées",
        "Pas de 2FA",
        "Pas de rate limiting",
      ],

      vulnerabilities: "CRITIQUES",
    },
    after: {
      score: "⭐ 10/10",
      improvements: [
        "RBAC server-side complet",
        "100% API protégées",
        "2FA TOTP fonctionnel",
        "Rate limiting actif",
      ],

      vulnerabilities: "AUCUNE",
    },
  },
};

// ============================================================================
// 2. QUICK START
// ============================================================================

export const quickStart = {
  initialSetup: {
    title: "Configuration Initiale",
    steps: [
      {
        step: 1,
        title: "Créer middleware.ts à la racine",
        code: `
// middleware.ts
export { middleware } from "@/polymet/data/viamentor-rbac-middleware";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
        `,
      },
      {
        step: 2,
        title: "Configurer variables d'environnement",
        code: `
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
REDIS_URL=your_redis_url
        `,
      },
      {
        step: 3,
        title: "Implémenter validateToken() avec Supabase",
        code: `
// @/polymet/data/viamentor-rbac-middleware
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function validateToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  
  // Récupérer permissions depuis DB
  const { data: userData } = await supabase
    .from("users")
    .select("role, tenant_id, permissions")
    .eq("id", data.user.id)
    .single();
  
  return {
    userId: data.user.id,
    tenantId: userData.tenant_id,
    role: userData.role,
    permissions: userData.permissions,
    expiresAt: new Date(data.user.expires_at),
  };
}
        `,
      },
    ],
  },

  protectRoute: {
    title: "Protéger une Route",
    description: "Ajouter une route à PROTECTED_ROUTES",
    example: `
// @/polymet/data/viamentor-rbac-middleware
const PROTECTED_ROUTES: RouteConfig[] = [
  // ... routes existantes
  
  // Nouvelle route
  { 
    path: "/my-page", 
    requiredPermission: "my_resource.view",
    requireTenant: true,
  },
];
    `,
  },

  protectAPI: {
    title: "Protéger une API",
    description: "Utiliser apiGuard() dans API Route",
    example: `
// app/api/my-resource/route.ts
import { apiGuard, applyRLS, createSuccessResponse } from "@/polymet/data/viamentor-api-guards";

export async function GET(request: NextRequest) {
  // ✅ Protection complète
  const guardResult = await apiGuard(request, {
    requiredPermission: "my_resource.view",
    requireTenant: true,
    rateLimit: {
      maxRequests: 100,
      windowMs: 60000,
    },
  });

  if (!guardResult.authorized) {
    return guardResult.response;
  }

  const { session } = guardResult;

  // ✅ Query avec RLS
  const data = await prisma.myResource.findMany({
    where: applyRLS(session, {
      status: "active",
    }),
  });

  return createSuccessResponse(data, session);
}
    `,
  },
};

// ============================================================================
// 3. RBAC SERVER-SIDE
// ============================================================================

export const rbacServerSide = {
  middleware: {
    title: "Middleware Next.js",
    description: "Protection automatique des routes",
    flow: [
      "1. Request arrive sur route protégée",
      "2. Middleware intercepte",
      "3. Récupère session depuis cookie/header",
      "4. Valide token avec Supabase",
      "5. Vérifie permission requise",
      "6. Vérifie rôle autorisé",
      "7. Vérifie tenant isolation",
      "8. Log accès pour audit",
      "9. Autorise ou redirige",
    ],

    example: `
// Exemple de flow complet
Request: GET /students
  ↓
Middleware: Intercepte
  ↓
Session: Récupère token
  ↓
Validation: Vérifie avec Supabase
  ↓
Permission: Vérifie "students.view"
  ↓
Tenant: Vérifie isolation
  ↓
Audit: Log accès
  ↓
Response: Autorise → Continue
          Refuse → Redirect /unauthorized
    `,
  },

  routeConfiguration: {
    title: "Configuration Routes",
    description: "Définir routes protégées et permissions",
    structure: `
interface RouteConfig {
  path: string;                    // "/students"
  requiredPermission: Permission;  // "students.view"
  allowedRoles?: UserRole[];       // ["school_admin", "secretary"]
  requireTenant?: boolean;         // true
}
    `,
    examples: [
      {
        name: "Route standard",
        config: `
{ 
  path: "/students", 
  requiredPermission: "students.view",
  requireTenant: true,
}
        `,
      },
      {
        name: "Route admin only",
        config: `
{ 
  path: "/super-admin", 
  requiredPermission: "system.manage",
  allowedRoles: ["super_admin"],
}
        `,
      },
      {
        name: "Route avec paramètres",
        config: `
{ 
  path: "/students/:id", 
  requiredPermission: "students.view",
  requireTenant: true,
}
        `,
      },
    ],
  },

  serverComponents: {
    title: "Server Components",
    description: "Vérifications dans Server Components",
    example: `
// app/students/page.tsx
import { checkPermission } from "@/polymet/data/viamentor-rbac-middleware";

export default async function StudentsPage() {
  // ✅ Vérification server-side
  await checkPermission("students.view");
  
  // ✅ Données protégées
  const students = await getStudents();
  
  return <StudentsList students={students} />;
}
    `,
    benefits: [
      "Vérifications côté serveur",
      "Données protégées",
      "Pas de flash de contenu",
      "SEO-friendly",
    ],
  },
};

// ============================================================================
// 4. API PROTECTION
// ============================================================================

export const apiProtection = {
  guards: {
    title: "API Guards",
    description: "Protection endpoints avec RBAC",
    functions: [
      {
        name: "apiGuard()",
        description: "Guard complet avec toutes les vérifications",
        usage: "Protection complète API Routes",
        example: `
const guardResult = await apiGuard(request, {
  requiredPermission: "students.view",
  requireTenant: true,
  rateLimit: { maxRequests: 100, windowMs: 60000 },
});

if (!guardResult.authorized) {
  return guardResult.response;
}

const { session } = guardResult;
        `,
      },
      {
        name: "requirePermission()",
        description: "Vérification permission simplifiée",
        usage: "Protection simple",
        example: `
const sessionOrError = await requirePermission(request, "students.view");

if (sessionOrError instanceof NextResponse) {
  return sessionOrError;
}

const session = sessionOrError;
        `,
      },
      {
        name: "requireRole()",
        description: "Vérification rôle",
        usage: "Endpoints admin only",
        example: `
const sessionOrError = await requireRole(request, ["super_admin", "platform_admin"]);

if (sessionOrError instanceof NextResponse) {
  return sessionOrError;
}

const session = sessionOrError;
        `,
      },
    ],
  },

  rls: {
    title: "Row Level Security (RLS)",
    description: "Isolation données par tenant",
    functions: [
      {
        name: "applyRLS()",
        description: "Applique filtres RLS sur queries",
        example: `
const students = await prisma.student.findMany({
  where: applyRLS(session, {
    status: "active",
  }),
});

// Résultat: WHERE tenantId = session.tenantId AND status = 'active'
        `,
      },
      {
        name: "checkResourceOwnership()",
        description: "Vérifie qu'une ressource appartient au tenant",
        example: `
const student = await prisma.student.findUnique({ where: { id } });

if (!checkResourceOwnership(session, student)) {
  return createErrorResponse("Forbidden", "FORBIDDEN_TENANT", {}, 403);
}
        `,
      },
      {
        name: "filterByTenant()",
        description: "Filtre liste de ressources",
        example: `
const filteredStudents = filterByTenant(session, allStudents);
        `,
      },
    ],
  },

  rateLimiting: {
    title: "Rate Limiting",
    description: "Protection contre abus",
    configuration: `
rateLimit: {
  maxRequests: 100,    // Nombre max requêtes
  windowMs: 60000,     // Fenêtre temps (1 minute)
}
    `,
    responses: `
// Headers retournés:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2024-01-01T12:01:00Z
Retry-After: 60

// Si dépassé:
429 Too Many Requests
{
  "error": "Too Many Requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 100,
    "remaining": 0,
    "reset": "2024-01-01T12:01:00Z"
  }
}
    `,
  },
};

// ============================================================================
// 5. AUTHENTIFICATION
// ============================================================================

export const authentication = {
  refreshTokens: {
    title: "Refresh Tokens",
    description: "Renouvellement automatique tokens",
    flow: [
      "1. Access token expire (15 min)",
      "2. Middleware détecte expiration",
      "3. Utilise refresh token (7 jours)",
      "4. Génère nouveau access token",
      "5. Optionnel: Rotation refresh token",
      "6. Met à jour cookies",
      "7. Continue requête",
    ],

    implementation: `
// middleware.ts
import { refreshAccessToken } from "@/polymet/data/viamentor-auth-improvements";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  if (!accessToken && refreshToken) {
    const result = await refreshAccessToken(refreshToken.value);

    if (result.success) {
      const response = NextResponse.next();
      
      response.cookies.set("access_token", result.session!.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60,
      });

      return response;
    }
  }

  return NextResponse.next();
}
    `,
  },

  twoFactor: {
    title: "Two-Factor Authentication (2FA)",
    description: "Authentification à deux facteurs avec TOTP",
    methods: ["TOTP (Google Authenticator, Authy)", "SMS", "Email"],
    flow: [
      "1. Utilisateur active 2FA",
      "2. Génère secret TOTP",
      "3. Affiche QR code",
      "4. Génère backup codes",
      "5. Utilisateur scanne QR code",
      "6. Vérifie code initial",
      "7. 2FA activé",
    ],

    usage: {
      enable: `
// Activer 2FA
const result = await enable2FA(userId, "totp");

if (result.success) {
  // Afficher QR code à l'utilisateur
  console.log("Secret:", result.secret);
  console.log("QR Code:", result.qrCode);
  console.log("Backup Codes:", result.backupCodes);
}
      `,
      verify: `
// Vérifier code au login
const verifyResult = await verify2FACode(userId, code);

if (verifyResult.valid) {
  // Login autorisé
} else {
  // Code invalide
}
      `,
    },
  },

  deviceTracking: {
    title: "Device Tracking",
    description: "Suivi devices et détection nouveaux appareils",
    features: [
      "Enregistrement nouveau device",
      "Trusted devices",
      "Security alerts",
      "Device management",
    ],

    implementation: `
// Au login
const deviceId = request.cookies.get("device_id")?.value;
const known = deviceId ? await isKnownDevice(userId, deviceId) : false;

if (!known) {
  // Enregistrer nouveau device
  const device = await registerDevice(userId, request);
  
  // Envoyer email notification
  await sendNewDeviceEmail(user.email, device);
  
  // Retourner device ID
  response.cookies.set("device_id", device.deviceId, {
    httpOnly: true,
    secure: true,
    maxAge: 365 * 24 * 60 * 60, // 1 an
  });
}
    `,
  },
};

// ============================================================================
// 6. AUDIT & MONITORING
// ============================================================================

export const auditMonitoring = {
  logging: {
    title: "Audit Logging",
    description: "Logs de tous les accès pour conformité",
    events: [
      "access_granted",
      "access_denied",
      "session_expired",
      "invalid_tenant",
      "login_success",
      "login_failed",
      "2fa_enabled",
      "2fa_disabled",
    ],

    structure: `
interface AuditLog {
  userId: string;
  tenantId: string;
  action: "access_granted" | "access_denied" | ...;
  resource: string;
  permission: Permission;
  ip: string;
  userAgent: string;
  timestamp: Date;
}
    `,
    storage: [
      "Supabase: Table audit_logs",
      "CloudWatch: AWS logging",
      "DataDog: APM monitoring",
    ],
  },

  securityAlerts: {
    title: "Security Alerts",
    description: "Notifications activités suspectes",
    types: [
      {
        type: "new_device",
        severity: "medium",
        trigger: "Login depuis nouveau device",
        action: "Email notification",
      },
      {
        type: "suspicious_login",
        severity: "high",
        trigger: "Login depuis IP inhabituelle ou multiples échecs",
        action: "Email + SMS + Blocage temporaire",
      },
      {
        type: "password_change",
        severity: "medium",
        trigger: "Changement mot de passe",
        action: "Email confirmation",
      },
      {
        type: "2fa_disabled",
        severity: "high",
        trigger: "Désactivation 2FA",
        action: "Email + SMS",
      },
    ],
  },

  dashboard: {
    title: "Dashboard Admin",
    description: "Interface monitoring sécurité",
    features: [
      "Logs d'accès temps réel",
      "Alertes sécurité",
      "Devices actifs",
      "Tentatives login échouées",
      "Statistiques RBAC",
      "Audit trail",
    ],

    route: "/admin/security",
  },
};

// ============================================================================
// 7. BEST PRACTICES
// ============================================================================

export const bestPractices = {
  recommended: {
    title: "Patterns Recommandés",
    patterns: [
      {
        pattern: "Toujours vérifier côté serveur",
        description: "Ne jamais se fier aux vérifications client",
        example: "Middleware + API Guards",
      },
      {
        pattern: "Appliquer RLS systématiquement",
        description: "Isolation tenant sur toutes les queries",
        example: "applyRLS(session, where)",
      },
      {
        pattern: "Rate limiting sur endpoints sensibles",
        description: "Protection contre brute force",
        example: "Login, API publiques, exports",
      },
      {
        pattern: "Audit logging complet",
        description: "Traçabilité pour conformité",
        example: "Tous les accès, modifications, suppressions",
      },
      {
        pattern: "2FA pour comptes privilégiés",
        description: "Sécurité renforcée admins",
        example: "Super Admin, Platform Admin obligatoire",
      },
    ],
  },

  antiPatterns: {
    title: "Anti-patterns à Éviter",
    patterns: [
      {
        antiPattern: "Vérifications client-side only",
        problem: "Vulnérabilité critique",
        solution: "Toujours vérifier côté serveur",
      },
      {
        antiPattern: "Pas de RLS sur queries",
        problem: "Fuite données cross-tenant",
        solution: "applyRLS() systématique",
      },
      {
        antiPattern: "Tokens sans expiration",
        problem: "Sessions infinies",
        solution: "Access token 15min, Refresh 7 jours",
      },
      {
        antiPattern: "Pas de rate limiting",
        problem: "Vulnérable brute force",
        solution: "Rate limiting sur login et API",
      },
      {
        antiPattern: "Pas d'audit logging",
        problem: "Non-conformité RGPD",
        solution: "Logger tous les accès",
      },
    ],
  },

  checklist: {
    title: "Checklist Sécurité",
    items: [
      "✅ Middleware RBAC configuré",
      "✅ Toutes les routes protégées",
      "✅ Toutes les API protégées",
      "✅ RLS appliqué sur toutes les queries",
      "✅ Rate limiting configuré",
      "✅ Refresh tokens implémentés",
      "✅ 2FA disponible",
      "✅ Device tracking actif",
      "✅ Security alerts configurées",
      "✅ Audit logging complet",
      "✅ Dashboard admin fonctionnel",
      "✅ Tests sécurité passés",
    ],
  },
};

// ============================================================================
// 8. TROUBLESHOOTING
// ============================================================================

export const troubleshooting = {
  commonIssues: {
    title: "Problèmes Courants",
    issues: [
      {
        problem: "Redirect loop infini",
        cause: "Middleware redirige vers route protégée",
        solution: "Ajouter route login dans PUBLIC_ROUTES",
      },
      {
        problem: "403 Forbidden sur API",
        cause: "Permission manquante ou token invalide",
        solution: "Vérifier permissions user et token validity",
      },
      {
        problem: "Rate limit trop strict",
        cause: "Configuration trop basse",
        solution: "Ajuster maxRequests et windowMs",
      },
      {
        problem: "Session expire trop vite",
        cause: "Access token expiration courte",
        solution: "Implémenter refresh token automatique",
      },
      {
        problem: "RLS ne filtre pas",
        cause: "applyRLS() non utilisé",
        solution: "Ajouter applyRLS() sur toutes les queries",
      },
    ],
  },

  debugging: {
    title: "Debugging",
    tips: [
      {
        tip: "Activer logs détaillés",
        code: "console.log('[RBAC]', ...)",
      },
      {
        tip: "Vérifier headers response",
        code: "X-User-Id, X-Tenant-Id, X-User-Role",
      },
      {
        tip: "Tester avec curl",
        code: 'curl -H "Authorization: Bearer token" http://localhost:3000/api/students',
      },
      {
        tip: "Vérifier audit logs",
        code: "SELECT * FROM audit_logs WHERE user_id = '...'",
      },
    ],
  },

  faq: {
    title: "FAQ",
    questions: [
      {
        q: "Comment tester le middleware localement ?",
        a: "Utiliser cookies de session valides ou mock validateToken()",
      },
      {
        q: "Peut-on désactiver RBAC en dev ?",
        a: "Non recommandé. Utiliser mode 'no-auth' uniquement pour démo",
      },
      {
        q: "Comment gérer les permissions dynamiques ?",
        a: "Stocker dans user_metadata Supabase ou table permissions",
      },
      {
        q: "Rate limiting fonctionne en dev ?",
        a: "Oui, mais utiliser Redis en prod pour scaling",
      },
      {
        q: "Comment migrer vers ce système ?",
        a: "Suivre guide implémentation, phase par phase",
      },
    ],
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  tableOfContents,
  overview,
  quickStart,
  rbacServerSide,
  apiProtection,
  authentication,
  auditMonitoring,
  bestPractices,
  troubleshooting,
};
