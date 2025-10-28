/**
 * VIAMENTOR - ARCHITECTURE PARTIE 4/6
 * Middleware et Authentification
 */

export const MIDDLEWARE_EXAMPLE = `
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // 1. Auth check
  const { data: { session } } = await supabase.auth.getSession()

  // 2. Protected routes
  const protectedPaths = ['/dashboard', '/students', '/instructors']
  const isProtected = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 3. RBAC check
  if (session) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // Admin-only routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!['super_admin', 'platform_admin'].includes(user?.role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    // School admin routes
    if (req.nextUrl.pathname.startsWith('/students')) {
      if (!['super_admin', 'platform_admin', 'school_admin'].includes(user?.role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
  }

  // 4. i18n redirect
  const locale = req.nextUrl.locale || 'fr'
  if (!req.nextUrl.pathname.startsWith(\`/\${locale}\`)) {
    return NextResponse.redirect(
      new URL(\`/\${locale}\${req.nextUrl.pathname}\`, req.url)
    )
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
`;

export const AUTH_FLOW = {
  login: [
    "1. User submits login form",
    "2. Server Action validates credentials",
    "3. Supabase Auth creates session",
    "4. Middleware checks session",
    "5. Redirect to dashboard",
  ],

  rbac: [
    "1. Middleware checks session",
    "2. Fetch user role from DB",
    "3. Check route permissions",
    "4. Allow or redirect",
  ],

  multiTenant: [
    "1. Extract tenant from URL",
    "2. Verify user has access",
    "3. Set tenant context",
    "4. Filter all queries by tenant",
  ],
};

export default { MIDDLEWARE_EXAMPLE, AUTH_FLOW };
