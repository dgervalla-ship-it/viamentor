/**
 * ============================================================================
 * VIAMENTOR - DEPLOYMENT.md
 * ============================================================================
 *
 * Guide de déploiement Viamentor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

export const DEPLOYMENT_MD = `
# 🚀 Deployment Guide Viamentor

## Table des matières

1. [Prérequis](#prérequis)
2. [Environnements](#environnements)
3. [Configuration](#configuration)
4. [Déploiement](#déploiement)
5. [CI/CD](#cicd)
6. [Monitoring](#monitoring)
7. [Rollback](#rollback)
8. [Troubleshooting](#troubleshooting)

---

## 1. Prérequis

### 1.1 Outils requis

\`\`\`bash
# Node.js 20+
node --version  # v20.x.x

# pnpm 9+
pnpm --version  # 9.x.x

# Git
git --version

# Vercel CLI (pour déploiement)
pnpm install -g vercel
\`\`\`

### 1.2 Comptes requis

- ✅ **Vercel** : Hébergement frontend
- ✅ **Supabase** : Backend (Auth + DB + Storage)
- ✅ **Sentry** : Monitoring erreurs
- ✅ **PostHog** : Analytics
- ✅ **GitHub** : Repository + CI/CD

---

## 2. Environnements

### 2.1 Development

\`\`\`bash
# Local development
pnpm dev

# URL: http://localhost:5173
# Hot reload: Activé
# Source maps: Activés
# Minification: Désactivée
\`\`\`

### 2.2 Staging

\`\`\`bash
# Preview deployment
vercel

# URL: https://viamentor-staging.vercel.app
# Branch: develop
# Auto-deploy: Activé
\`\`\`

### 2.3 Production

\`\`\`bash
# Production deployment
vercel --prod

# URL: https://app.viamentor.ch
# Branch: main
# Auto-deploy: Activé (après review)
\`\`\`

---

## 3. Configuration

### 3.1 Variables d'environnement

#### Development (\`.env.local\`)

\`\`\`bash
# App
VITE_APP_NAME=Viamentor
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173

# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Sentry
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_SENTRY_ENVIRONMENT=development

# PostHog
VITE_POSTHOG_KEY=phc_xxx
VITE_POSTHOG_HOST=https://app.posthog.com

# Features flags
VITE_FEATURE_MAKEUPS=true
VITE_FEATURE_REVIEWS=true
VITE_FEATURE_CAMPAIGNS=true
\`\`\`

#### Staging (\`.env.staging\`)

\`\`\`bash
# App
VITE_APP_NAME=Viamentor Staging
VITE_APP_ENV=staging
VITE_APP_URL=https://viamentor-staging.vercel.app

# Supabase
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging-anon-key

# Sentry
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_SENTRY_ENVIRONMENT=staging

# PostHog
VITE_POSTHOG_KEY=phc_staging_xxx
VITE_POSTHOG_HOST=https://app.posthog.com

# Features flags
VITE_FEATURE_MAKEUPS=true
VITE_FEATURE_REVIEWS=true
VITE_FEATURE_CAMPAIGNS=false
\`\`\`

#### Production (\`.env.production\`)

\`\`\`bash
# App
VITE_APP_NAME=Viamentor
VITE_APP_ENV=production
VITE_APP_URL=https://app.viamentor.ch

# Supabase
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-anon-key

# Sentry
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_SENTRY_ENVIRONMENT=production

# PostHog
VITE_POSTHOG_KEY=phc_prod_xxx
VITE_POSTHOG_HOST=https://app.posthog.com

# Features flags
VITE_FEATURE_MAKEUPS=true
VITE_FEATURE_REVIEWS=true
VITE_FEATURE_CAMPAIGNS=true
\`\`\`

### 3.2 Vercel Configuration

#### \`vercel.json\`

\`\`\`json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/login",
      "permanent": false
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
\`\`\`

---

## 4. Déploiement

### 4.1 Déploiement manuel

#### Step 1: Build local

\`\`\`bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build production
pnpm build

# Preview build
pnpm preview
\`\`\`

#### Step 2: Deploy to Vercel

\`\`\`bash
# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
\`\`\`

### 4.2 Déploiement automatique (CI/CD)

#### GitHub Actions Workflow

\`\`\`.github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run linter
        run: pnpm lint
        
      - name: Run tests
        run: pnpm test
        
      - name: Build
        run: pnpm build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          scope: \${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: \${{ secrets.VERCEL_ORG_ID }}
\`\`\`

### 4.3 Database Migrations

\`\`\`bash
# Run migrations on Supabase
supabase db push

# Seed database
supabase db seed
\`\`\`

---

## 5. CI/CD

### 5.1 Pipeline stages

\`\`\`
┌─────────────┐
│   Commit    │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Lint      │ ← ESLint + Prettier
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Test      │ ← Vitest
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Build     │ ← Vite build
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Deploy    │ ← Vercel
└─────────────┘
\`\`\`

### 5.2 Quality Gates

- ✅ **Linting:** ESLint + Prettier
- ✅ **Tests:** Coverage > 80%
- ✅ **Build:** No errors
- ✅ **Bundle size:** < 500KB (gzipped)
- ✅ **Lighthouse:** Score > 90

### 5.3 Branch Strategy

\`\`\`
main (production)
  ↑
  │ PR + Review
  │
develop (staging)
  ↑
  │ PR
  │
feature/* (development)
\`\`\`

---

## 6. Monitoring

### 6.1 Sentry (Error Tracking)

\`\`\`typescript
// Initialize Sentry
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
\`\`\`

### 6.2 PostHog (Analytics)

\`\`\`typescript
// Initialize PostHog
import posthog from "posthog-js"

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  autocapture: true,
})
\`\`\`

### 6.3 Vercel Analytics

\`\`\`typescript
// Automatic with Vercel deployment
// Dashboard: https://vercel.com/analytics
\`\`\`

### 6.4 Health Checks

\`\`\`bash
# Endpoint: /api/health
curl https://app.viamentor.ch/api/health

# Response
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 123456,
  "timestamp": "2024-12-20T16:00:00Z"
}
\`\`\`

---

## 7. Rollback

### 7.1 Vercel Rollback

\`\`\`bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
\`\`\`

### 7.2 Database Rollback

\`\`\`bash
# Rollback last migration
supabase db reset --version <previous-version>
\`\`\`

### 7.3 Emergency Rollback

\`\`\`bash
# 1. Revert Git commit
git revert HEAD
git push origin main

# 2. Trigger CI/CD
# Auto-deploy will run

# 3. Verify deployment
curl https://app.viamentor.ch/api/health
\`\`\`

---

## 8. Troubleshooting

### 8.1 Build Errors

#### Error: "Out of memory"

\`\`\`bash
# Solution: Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 pnpm build
\`\`\`

#### Error: "Module not found"

\`\`\`bash
# Solution: Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
\`\`\`

### 8.2 Runtime Errors

#### Error: "CORS policy"

\`\`\`typescript
// Solution: Configure Supabase CORS
// Supabase Dashboard > Settings > API > CORS
// Add: https://app.viamentor.ch
\`\`\`

#### Error: "Rate limit exceeded"

\`\`\`typescript
// Solution: Implement exponential backoff
const retry = async (fn, retries = 3) => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0 && error.status === 429) {
      await new Promise(r => setTimeout(r, 1000 * (4 - retries)))
      return retry(fn, retries - 1)
    }
    throw error
  }
}
\`\`\`

### 8.3 Performance Issues

#### Slow page load

\`\`\`bash
# Solution 1: Analyze bundle
pnpm build --analyze

# Solution 2: Enable code splitting
# Already implemented with React.lazy()

# Solution 3: Optimize images
# Use WebP format + lazy loading
\`\`\`

#### High memory usage

\`\`\`typescript
// Solution: Implement pagination
const { data } = useQuery({
  queryKey: ['students', page],
  queryFn: () => fetchStudents({ page, limit: 20 }),
})
\`\`\`

---

## Checklist de déploiement

### Pre-deployment

- [ ] Tests passent (pnpm test)
- [ ] Linting OK (pnpm lint)
- [ ] Build réussit (pnpm build)
- [ ] Variables d'environnement configurées
- [ ] Migrations DB prêtes
- [ ] Changelog mis à jour

### Deployment

- [ ] Deploy staging
- [ ] Tests smoke staging
- [ ] Review PR
- [ ] Deploy production
- [ ] Tests smoke production

### Post-deployment

- [ ] Vérifier health checks
- [ ] Monitorer Sentry (erreurs)
- [ ] Monitorer Vercel (performance)
- [ ] Monitorer PostHog (analytics)
- [ ] Notifier équipe

---

## Ressources

- 📚 [Vercel Docs](https://vercel.com/docs)
- 📚 [Supabase Docs](https://supabase.com/docs)
- 📚 [Sentry Docs](https://docs.sentry.io)
- 📚 [PostHog Docs](https://posthog.com/docs)

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** Viamentor Team
`;

export default DEPLOYMENT_MD;
