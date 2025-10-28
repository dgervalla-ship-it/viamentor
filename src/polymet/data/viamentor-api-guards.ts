/**
 * ============================================================================
 * VIAMENTOR - API GUARDS & RLS HELPERS
 * ============================================================================
 *
 * Guards pour protection des API Routes avec RBAC et Row Level Security
 *
 * Features:
 * - ✅ API Route protection
 * - ✅ RBAC permission checks
 * - ✅ Row Level Security (RLS)
 * - ✅ Tenant isolation
 * - ✅ Rate limiting
 * - ✅ Request validation
 *
 * @module viamentor-api-guards
 */

import { NextRequest, NextResponse } from "next/server";
import type { UserRole, Permission } from "@/polymet/data/viamentor-roles";

// ============================================================================
// TYPES
// ============================================================================

interface ApiSession {
  userId: string;
  tenantId: string;
  role: UserRole;
  permissions: Permission[];
}

interface GuardOptions {
  requiredPermission: Permission;
  requireTenant?: boolean;
  allowedRoles?: UserRole[];
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

interface RLSContext {
  tenantId: string;
  userId: string;
  role: UserRole;
}

interface ApiError {
  error: string;
  code: string;
  details?: any;
}

interface RateLimitInfo {
  remaining: number;
  reset: Date;
  limit: number;
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Récupère la session depuis l'API Request
 */
export async function getApiSession(
  request: NextRequest
): Promise<ApiSession | null> {
  try {
    // 1. Récupérer le token depuis Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    // 2. Valider le token
    const session = await validateApiToken(token);

    return session;
  } catch (error) {
    console.error("[API Guards] Session error:", error);
    return null;
  }
}

/**
 * Valide un token API
 */
async function validateApiToken(token: string): Promise<ApiSession | null> {
  try {
    // TODO: Implémenter validation JWT/Supabase réelle

    // Exemple avec Supabase
    // const { data, error } = await supabase.auth.getUser(token);
    // if (error) return null;

    // Mock pour démonstration
    return {
      userId: "user_123",
      tenantId: "tenant_abc",
      role: "school_admin" as UserRole,
      permissions: [
        "students.view",
        "students.create",
        "students.edit",
        "instructors.view",
      ] as Permission[],
    };
  } catch (error) {
    console.error("[API Guards] Token validation error:", error);
    return null;
  }
}

// ============================================================================
// PERMISSION GUARDS
// ============================================================================

/**
 * Guard principal pour protéger les API Routes
 *
 * @example
 * ```ts
 * // app/api/students/route.ts
 * export async function GET(request: NextRequest) {
 *   const guardResult = await apiGuard(request, {
 *     requiredPermission: "students.view",
 *     requireTenant: true,
 *   });
 *
 *   if (!guardResult.authorized) {
 *     return guardResult.response;
 *   }
 *
 *   const { session } = guardResult;
 *   const students = await getStudents(session.tenantId);
 *
 *   return NextResponse.json(students);
 * }
 * ```
 */
export async function apiGuard(
  request: NextRequest,
  options: GuardOptions
): Promise<
  | { authorized: true; session: ApiSession }
  | { authorized: false; response: NextResponse }
> {
  // 1. Récupérer la session
  const session = await getApiSession(request);

  if (!session) {
    return {
      authorized: false,
      response: createErrorResponse(
        "Unauthorized",
        "UNAUTHORIZED",
        { message: "Missing or invalid authentication token" },
        401
      ),
    };
  }

  // 2. Vérifier les rôles autorisés
  if (options.allowedRoles && !options.allowedRoles.includes(session.role)) {
    return {
      authorized: false,
      response: createErrorResponse(
        "Forbidden",
        "FORBIDDEN_ROLE",
        {
          message: "Your role is not authorized to access this resource",
          requiredRoles: options.allowedRoles,
          currentRole: session.role,
        },
        403
      ),
    };
  }

  // 3. Vérifier la permission
  if (!session.permissions.includes(options.requiredPermission)) {
    return {
      authorized: false,
      response: createErrorResponse(
        "Forbidden",
        "FORBIDDEN_PERMISSION",
        {
          message: "You don't have permission to access this resource",
          requiredPermission: options.requiredPermission,
          currentPermissions: session.permissions,
        },
        403
      ),
    };
  }

  // 4. Vérifier tenant isolation
  if (options.requireTenant) {
    const requestedTenantId = request.nextUrl.searchParams.get("tenantId");

    if (requestedTenantId && requestedTenantId !== session.tenantId) {
      // Super Admin et Platform Admin peuvent accéder à tous les tenants
      if (!["super_admin", "platform_admin"].includes(session.role)) {
        return {
          authorized: false,
          response: createErrorResponse(
            "Forbidden",
            "FORBIDDEN_TENANT",
            {
              message: "You cannot access data from another tenant",
              requestedTenantId,
              currentTenantId: session.tenantId,
            },
            403
          ),
        };
      }
    }
  }

  // 5. Rate limiting (optionnel)
  if (options.rateLimit) {
    const rateLimitResult = await checkRateLimit(
      session.userId,
      options.rateLimit.maxRequests,
      options.rateLimit.windowMs
    );

    if (!rateLimitResult.allowed) {
      return {
        authorized: false,
        response: createRateLimitResponse(rateLimitResult.info!),
      };
    }
  }

  // 6. Accès autorisé
  return {
    authorized: true,
    session,
  };
}

/**
 * Guard simplifié pour vérifier uniquement la permission
 */
export async function requirePermission(
  request: NextRequest,
  permission: Permission
): Promise<ApiSession | NextResponse> {
  const result = await apiGuard(request, {
    requiredPermission: permission,
    requireTenant: true,
  });

  if (!result.authorized) {
    return result.response;
  }

  return result.session;
}

/**
 * Guard pour vérifier le rôle
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<ApiSession | NextResponse> {
  const session = await getApiSession(request);

  if (!session) {
    return createErrorResponse("Unauthorized", "UNAUTHORIZED", {}, 401);
  }

  if (!allowedRoles.includes(session.role)) {
    return createErrorResponse(
      "Forbidden",
      "FORBIDDEN_ROLE",
      { requiredRoles: allowedRoles, currentRole: session.role },
      403
    );
  }

  return session;
}

// ============================================================================
// ROW LEVEL SECURITY (RLS)
// ============================================================================

/**
 * Applique les filtres RLS pour isoler les données par tenant
 *
 * @example
 * ```ts
 * const students = await prisma.student.findMany({
 *   where: applyRLS(session, {
 *     status: "active",
 *   }),
 * });
 * ```
 */
export function applyRLS<T extends Record<string, any>>(
  context: RLSContext,
  baseWhere?: T
): T & { tenantId: string } {
  // Super Admin et Platform Admin peuvent voir tous les tenants
  if (["super_admin", "platform_admin"].includes(context.role)) {
    return baseWhere as T & { tenantId: string };
  }

  // Autres rôles : filtrer par tenant
  return {
    ...baseWhere,
    tenantId: context.tenantId,
  } as T & { tenantId: string };
}

/**
 * Vérifie qu'une ressource appartient au tenant de l'utilisateur
 *
 * @example
 * ```ts
 * const student = await prisma.student.findUnique({ where: { id } });
 *
 * if (!checkResourceOwnership(session, student)) {
 *   return createErrorResponse("Forbidden", "FORBIDDEN_TENANT", {}, 403);
 * }
 * ```
 */
export function checkResourceOwnership(
  context: RLSContext,
  resource: { tenantId: string } | null
): boolean {
  if (!resource) {
    return false;
  }

  // Super Admin et Platform Admin peuvent accéder à toutes les ressources
  if (["super_admin", "platform_admin"].includes(context.role)) {
    return true;
  }

  // Vérifier que la ressource appartient au tenant
  return resource.tenantId === context.tenantId;
}

/**
 * Filtre une liste de ressources par tenant
 */
export function filterByTenant<T extends { tenantId: string }>(
  context: RLSContext,
  resources: T[]
): T[] {
  // Super Admin et Platform Admin voient tout
  if (["super_admin", "platform_admin"].includes(context.role)) {
    return resources;
  }

  // Filtrer par tenant
  return resources.filter((r) => r.tenantId === context.tenantId);
}

// ============================================================================
// RATE LIMITING
// ============================================================================

// Store en mémoire pour rate limiting (à remplacer par Redis en prod)
const rateLimitStore = new Map<string, { count: number; resetAt: Date }>();

/**
 * Vérifie le rate limit pour un utilisateur
 */
async function checkRateLimit(
  userId: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; info?: RateLimitInfo }> {
  const now = new Date();
  const key = `ratelimit:${userId}`;

  // Récupérer ou créer l'entrée
  let entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // Nouvelle fenêtre
    entry = {
      count: 1,
      resetAt: new Date(now.getTime() + windowMs),
    };
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      info: {
        remaining: maxRequests - 1,
        reset: entry.resetAt,
        limit: maxRequests,
      },
    };
  }

  // Incrémenter le compteur
  entry.count++;

  if (entry.count > maxRequests) {
    return {
      allowed: false,
      info: {
        remaining: 0,
        reset: entry.resetAt,
        limit: maxRequests,
      },
    };
  }

  return {
    allowed: true,
    info: {
      remaining: maxRequests - entry.count,
      reset: entry.resetAt,
      limit: maxRequests,
    },
  };
}

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

/**
 * Crée une réponse d'erreur standardisée
 */
function createErrorResponse(
  message: string,
  code: string,
  details: any,
  status: number
): NextResponse {
  const error: ApiError = {
    error: message,
    code,
    details,
  };

  return NextResponse.json(error, { status });
}

/**
 * Crée une réponse de rate limit
 */
function createRateLimitResponse(info: RateLimitInfo): NextResponse {
  const response = NextResponse.json(
    {
      error: "Too Many Requests",
      code: "RATE_LIMIT_EXCEEDED",
      details: {
        limit: info.limit,
        remaining: info.remaining,
        reset: info.reset.toISOString(),
      },
    },
    { status: 429 }
  );

  response.headers.set("X-RateLimit-Limit", info.limit.toString());
  response.headers.set("X-RateLimit-Remaining", info.remaining.toString());
  response.headers.set("X-RateLimit-Reset", info.reset.toISOString());
  response.headers.set(
    "Retry-After",
    Math.ceil((info.reset.getTime() - Date.now()) / 1000).toString()
  );

  return response;
}

/**
 * Crée une réponse de succès avec headers RLS
 */
export function createSuccessResponse<T>(
  data: T,
  session: ApiSession,
  status: number = 200
): NextResponse {
  const response = NextResponse.json(data, { status });

  response.headers.set("X-Tenant-Id", session.tenantId);
  response.headers.set("X-User-Role", session.role);

  return response;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Valide le body d'une requête avec Zod
 *
 * @example
 * ```ts
 * const bodyResult = await validateRequestBody(request, CreateStudentSchema);
 * if (!bodyResult.valid) {
 *   return bodyResult.response;
 * }
 *
 * const data = bodyResult.data;
 * ```
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: { parse: (data: any) => T }
): Promise<
  { valid: true; data: T } | { valid: false; response: NextResponse }
> {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    return { valid: true, data };
  } catch (error: any) {
    return {
      valid: false,
      response: createErrorResponse(
        "Validation Error",
        "VALIDATION_ERROR",
        { errors: error.errors || error.message },
        400
      ),
    };
  }
}

/**
 * Valide les query params avec Zod
 */
export function validateQueryParams<T>(
  request: NextRequest,
  schema: { parse: (data: any) => T }
): { valid: true; data: T } | { valid: false; response: NextResponse } {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const data = schema.parse(params);

    return { valid: true, data };
  } catch (error: any) {
    return {
      valid: false,
      response: createErrorResponse(
        "Validation Error",
        "VALIDATION_ERROR",
        { errors: error.errors || error.message },
        400
      ),
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { ApiSession, GuardOptions, RLSContext, ApiError, RateLimitInfo };
