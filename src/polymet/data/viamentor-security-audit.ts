/**
 * VIAMENTOR - SECURITY AUDIT
 * Audit complet sécurité avec recommandations OWASP Top 10
 */

// ============================================================================
// 4. SÉCURITÉ
// ============================================================================

export const SECURITY_AUDIT = {
  score: "7.5/10",
  lastUpdate: "2025-01-18",
  category: "Security",
  owaspCompliance: "Partial",

  strengths: [
    "✅ Authentication avec Supabase (JWT tokens)",
    "✅ RBAC implémenté (15 rôles)",
    "✅ Validation inputs avec Zod",
    "✅ HTTPS enforced",
    "✅ Environment variables sécurisées",
    "✅ SQL injection protection (Prisma ORM)",
  ],

  owaspTop10: {
    "A01:2021": {
      name: "Broken Access Control",
      status: "PARTIAL",
      score: "7/10",
      issues: [
        "❌ Pas de vérification RBAC côté serveur systématique",
        "❌ API routes non protégées",
        "❌ Certaines mutations sans auth check",
      ],

      strengths: [
        "✅ RBAC frontend implémenté",
        "✅ Middleware auth Next.js",
        "✅ Permissions granulaires",
      ],
    },

    "A02:2021": {
      name: "Cryptographic Failures",
      status: "GOOD",
      score: "9/10",
      strengths: [
        "✅ Passwords hashés (Supabase bcrypt)",
        "✅ JWT tokens sécurisés",
        "✅ HTTPS enforced",
        "✅ Secrets dans .env",
      ],

      issues: ["⚠️ Pas de rotation des secrets"],
    },

    "A03:2021": {
      name: "Injection",
      status: "GOOD",
      score: "9/10",
      strengths: [
        "✅ Prisma ORM (prepared statements)",
        "✅ Validation Zod",
        "✅ Sanitization inputs",
      ],

      issues: ["⚠️ Certains inputs non validés côté serveur"],
    },

    "A04:2021": {
      name: "Insecure Design",
      status: "PARTIAL",
      score: "7/10",
      issues: [
        "❌ Pas de rate limiting",
        "❌ Pas de CAPTCHA sur forms publics",
        "❌ Pas de 2FA",
      ],

      strengths: [
        "✅ Architecture sécurisée (Next.js 15)",
        "✅ Separation of concerns",
      ],
    },

    "A05:2021": {
      name: "Security Misconfiguration",
      status: "PARTIAL",
      score: "7/10",
      issues: [
        "❌ Headers sécurité manquants (CSP, HSTS)",
        "❌ CORS non configuré",
        "❌ Error messages trop verbeux",
      ],

      strengths: ["✅ Environment variables", "✅ Secrets non commitées"],
    },

    "A06:2021": {
      name: "Vulnerable and Outdated Components",
      status: "GOOD",
      score: "8/10",
      strengths: [
        "✅ Dependencies à jour",
        "✅ Next.js 15 (latest)",
        "✅ React 19 (latest)",
      ],

      issues: ["⚠️ Pas d'audit automatique (npm audit)"],
    },

    "A07:2021": {
      name: "Identification and Authentication Failures",
      status: "PARTIAL",
      score: "7/10",
      issues: [
        "❌ Pas de 2FA",
        "❌ Pas de password strength meter",
        "❌ Session timeout non configuré",
      ],

      strengths: ["✅ JWT tokens", "✅ Supabase auth", "✅ Password hashing"],
    },

    "A08:2021": {
      name: "Software and Data Integrity Failures",
      status: "GOOD",
      score: "8/10",
      strengths: ["✅ Package lock files", "✅ Integrity checks npm"],

      issues: ["⚠️ Pas de signature des releases"],
    },

    "A09:2021": {
      name: "Security Logging and Monitoring Failures",
      status: "WEAK",
      score: "5/10",
      issues: [
        "❌ Pas de logging sécurité",
        "❌ Pas d'alertes intrusions",
        "❌ Pas d'audit trail",
      ],

      needed: [
        "Logs authentification (login, logout, failed attempts)",
        "Logs mutations critiques (delete, update permissions)",
        "Monitoring anomalies",
      ],
    },

    "A10:2021": {
      name: "Server-Side Request Forgery (SSRF)",
      status: "GOOD",
      score: "8/10",
      strengths: ["✅ Pas de fetch user-controlled URLs", "✅ Validation URLs"],
    },
  },

  weaknesses: [
    {
      severity: "CRITICAL",
      issue: "Pas de vérification RBAC côté serveur",
      description:
        "Permissions vérifiées uniquement frontend, API routes non protégées",
      examples: [
        {
          vulnerable: `// ❌ API route non protégée
export async function POST(request: Request) {
  const data = await request.json()
  await db.student.create({ data })
  return Response.json({ success: true })
}`,
          secure: `// ✅ API route protégée
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/rbac'

export async function POST(request: Request) {
  // 1. Vérifier authentification
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // 2. Vérifier permissions
  if (!hasPermission(session.user, 'students.write')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // 3. Valider input
  const data = studentSchema.parse(await request.json())
  
  // 4. Exécuter action
  await db.student.create({ data })
  return Response.json({ success: true })
}`,
        },
      ],

      impact: {
        risk: "CRITIQUE",
        description:
          "Utilisateur malveillant peut bypass frontend et appeler API directement",
        example: "Élève peut créer/modifier/supprimer autres élèves via API",
      },

      exploitation: `// Attaque possible
fetch('/api/students/123', {
  method: 'DELETE',
  headers: { 'Authorization': 'Bearer <token>' }
})
// ✅ Devrait échouer si pas permission students.delete
// ❌ Actuellement réussit car pas de check serveur`,
    },
    {
      severity: "HIGH",
      issue: "Pas de rate limiting",
      description: "Vulnérable aux attaques brute force et DDoS",
      examples: [
        {
          attack: "Brute force login",
          scenario: "Attaquant teste 1000 passwords/seconde",
          impact: "Compte compromis en quelques minutes",
        },
        {
          attack: "API abuse",
          scenario: "Bot spam création élèves",
          impact: "Base de données polluée, coûts serveur",
        },
      ],

      solution: {
        library: "upstash/ratelimit",
        code: `// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Rate limiters par endpoint
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 tentatives / 15 min
  analytics: true,
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 req / min
})

// Usage dans API route
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success, limit, remaining } = await loginRateLimit.limit(ip)
  
  if (!success) {
    return Response.json(
      { error: 'Too many requests. Try again in 15 minutes.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    )
  }
  
  // Continue...
}`,
      },
    },
    {
      severity: "HIGH",
      issue: "Headers sécurité manquants",
      description: "Vulnérable XSS, clickjacking, MIME sniffing",
      missing: [
        "Content-Security-Policy (CSP)",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy",
      ],

      solution: {
        file: "next.config.js",
        code: `// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js needs unsafe-eval
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.viamentor.ch",
      "frame-ancestors 'none'",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}`,
      },
    },
    {
      severity: "MEDIUM",
      issue: "Pas de logging sécurité",
      description: "Impossible de détecter/investiguer incidents",
      needed: [
        "Logs authentification (login, logout, failed attempts)",
        "Logs mutations critiques (delete, update permissions)",
        "Logs accès données sensibles",
        "Logs erreurs serveur",
        "Monitoring anomalies",
      ],

      solution: {
        library: "pino + pino-pretty",
        code: `// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

// Security logger
export const securityLogger = logger.child({ module: 'security' })

// Usage
securityLogger.info({
  event: 'login_success',
  userId: user.id,
  ip: request.ip,
  userAgent: request.headers.get('user-agent'),
})

securityLogger.warn({
  event: 'login_failed',
  email: email,
  ip: request.ip,
  reason: 'invalid_password',
})

securityLogger.error({
  event: 'unauthorized_access',
  userId: user.id,
  resource: 'students',
  action: 'delete',
  ip: request.ip,
})`,
      },
    },
    {
      severity: "MEDIUM",
      issue: "Pas de 2FA",
      description: "Comptes vulnérables si password compromis",
      impact: "Attaquant avec password peut accéder au compte",
      solution: {
        library: "Supabase Auth (TOTP built-in)",
        steps: [
          "1. Activer 2FA dans Supabase dashboard",
          "2. Ajouter UI pour setup 2FA (QR code)",
          "3. Vérifier TOTP code au login",
          "4. Backup codes pour recovery",
        ],

        code: `// Setup 2FA
import { supabase } from '@/lib/supabase'

async function setupTwoFactor() {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
  })
  
  if (error) throw error
  
  // Afficher QR code
  const qrCode = data.totp.qr_code
  const secret = data.totp.secret
  
  return { qrCode, secret }
}

// Verify 2FA
async function verifyTwoFactor(code: string) {
  const { data, error } = await supabase.auth.mfa.verify({
    factorId: factorId,
    code: code,
  })
  
  if (error) throw error
  return data
}`,
      },
    },
  ],

  recommendations: [
    {
      priority: "CRITICAL",
      title: "Implémenter RBAC côté serveur",
      description: "Vérifier permissions sur TOUTES les API routes",
      effort: "1 semaine",
      impact: "Élimine risque #1 de sécurité",
      steps: [
        {
          step: "1. Créer middleware RBAC",
          code: `// lib/rbac-middleware.ts
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/rbac'

export function withAuth(handler: Function) {
  return async (request: Request) => {
    const session = await auth()
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return handler(request, session)
  }
}

export function withPermission(permission: Permission, handler: Function) {
  return withAuth(async (request: Request, session: Session) => {
    if (!hasPermission(session.user, permission)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    return handler(request, session)
  })
}`,
        },
        {
          step: "2. Protéger toutes les API routes",
          code: `// app/api/students/route.ts
import { withPermission } from '@/lib/rbac-middleware'

export const POST = withPermission('students.write', async (request, session) => {
  const data = studentSchema.parse(await request.json())
  await db.student.create({ data })
  return Response.json({ success: true })
})

export const DELETE = withPermission('students.delete', async (request, session) => {
  const { id } = await request.json()
  await db.student.delete({ where: { id } })
  return Response.json({ success: true })
})`,
        },
        {
          step: "3. Créer tests automatisés",
          code: `// tests/rbac.spec.ts
import { test, expect } from '@playwright/test'

test.describe('RBAC Security', () => {
  test('Student cannot delete other students', async ({ request }) => {
    // Login as student
    const studentToken = await loginAsStudent()
    
    // Try to delete another student
    const response = await request.delete('/api/students/123', {
      headers: { Authorization: \`Bearer \${studentToken}\` }
    })
    
    expect(response.status()).toBe(403)
    expect(await response.json()).toEqual({ error: 'Forbidden' })
  })
  
  test('School Admin can delete students', async ({ request }) => {
    const adminToken = await loginAsSchoolAdmin()
    
    const response = await request.delete('/api/students/123', {
      headers: { Authorization: \`Bearer \${adminToken}\` }
    })
    
    expect(response.status()).toBe(200)
  })
})`,
        },
      ],
    },
    {
      priority: "CRITICAL",
      title: "Implémenter rate limiting",
      description: "Protéger contre brute force et DDoS",
      effort: "2 jours",
      impact: "Élimine risque brute force",
      implementation: [
        {
          endpoint: "Login",
          limit: "5 tentatives / 15 minutes",
          action: "Bloquer IP temporairement",
        },
        {
          endpoint: "API mutations",
          limit: "100 requêtes / minute",
          action: "429 Too Many Requests",
        },
        {
          endpoint: "API reads",
          limit: "1000 requêtes / minute",
          action: "429 Too Many Requests",
        },
      ],
    },
    {
      priority: "HIGH",
      title: "Ajouter headers sécurité",
      description: "CSP, X-Frame-Options, HSTS, etc.",
      effort: "2 heures",
      impact: "Protection XSS, clickjacking, MIME sniffing",
    },
    {
      priority: "HIGH",
      title: "Implémenter logging sécurité",
      description: "Logs auth, mutations, accès données sensibles",
      effort: "3 jours",
      impact: "Détection incidents, audit trail, compliance",
    },
    {
      priority: "MEDIUM",
      title: "Ajouter 2FA",
      description: "TOTP avec Supabase Auth",
      effort: "1 semaine",
      impact: "Protection comptes même si password compromis",
    },
    {
      priority: "MEDIUM",
      title: "Implémenter CAPTCHA",
      description: "Protéger forms publics (contact, registration)",
      effort: "1 jour",
      impact: "Protection contre bots",
      library: "hCaptcha ou reCAPTCHA",
    },
  ],

  bestPractices: [
    "✅ Principe du moindre privilège (least privilege)",
    "✅ Defense in depth (plusieurs couches sécurité)",
    "✅ Fail securely (erreur = deny access)",
    "✅ Never trust user input (validate everything)",
    "✅ Use prepared statements (Prisma ORM)",
    "✅ Hash passwords (bcrypt, argon2)",
    "✅ Use HTTPS everywhere",
    "✅ Keep dependencies updated",
    "✅ Log security events",
    "✅ Implement rate limiting",
    "✅ Use security headers",
    "✅ Implement RBAC server-side",
    "✅ Use 2FA for sensitive accounts",
    "✅ Regular security audits",
  ],

  tools: [
    "OWASP ZAP (vulnerability scanner)",
    "Snyk (dependency vulnerabilities)",
    "npm audit (npm vulnerabilities)",
    "Lighthouse (security audit)",
    "Burp Suite (penetration testing)",
    "Upstash Rate Limit (rate limiting)",
    "Supabase Auth (authentication)",
    "Prisma (SQL injection protection)",
  ],

  compliance: {
    gdpr: {
      status: "PARTIAL",
      implemented: [
        "✅ Consent management",
        "✅ Data export",
        "✅ Data deletion",
        "✅ Privacy policy",
      ],

      missing: [
        "❌ Data breach notification process",
        "❌ DPO contact",
        "❌ Cookie consent banner",
      ],
    },
    pci: {
      status: "N/A",
      note: "Pas de traitement cartes bancaires (Stripe/PayPal)",
    },
  },
};

export default SECURITY_AUDIT;
