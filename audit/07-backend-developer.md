# 🔧 AUDIT - BACKEND DEVELOPER

**Rôle** : Backend Developer  
**Mission** : Exposer des APIs sûres, rapides, documentées  
**Score Global** : 🔴 **2/10**  
**Statut** : CRITIQUE - Backend inexistant

---

## ✅ Tâches à contrôler

### 7.1 Contrat OpenAPI 3.0 généré avant le code (contract-first)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- ❌ **Aucun backend**
- ❌ Aucune API REST/GraphQL
- ❌ Aucun fichier OpenAPI/Swagger
- ✅ Supabase configuré (peut servir d'API)

**Ce qui existe** :
- Client Supabase (`src/lib/supabase.ts`)
- Connexion DB PostgreSQL prête
- Mais : Supabase direct client-side (pas d'API layer)

**Impact** :
- 🔴 **BLOQUEUR PRODUCTION** : Pas de logique serveur
- 🔴 Sécurité compromise (credentials côté client)
- 🔴 Business logic en frontend (mauvaise pratique)

**Architecture actuelle** :
```
Browser → Supabase (direct)
```

**Architecture recommandée** :
```
Browser → API Backend → Supabase
         ↓
      Business Logic
      Validation
      Authorization
```

**Action requise URGENTE** :

**Option A : Next.js API Routes**
```typescript
// pages/api/students/[id].ts
export default async function handler(req, res) {
  const { id } = req.query;
  
  // Authorization check
  const user = await getUser(req);
  if (!canAccessStudent(user, id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Business logic
  const student = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
    
  return res.json(student);
}
```

**Option B : Supabase Edge Functions**
```typescript
// supabase/functions/get-student/index.ts
serve(async (req) => {
  const { id } = await req.json();
  
  // Server-side logic
  const student = await supabaseAdmin
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
    
  return new Response(JSON.stringify(student));
});
```

**OpenAPI Contract** :
```yaml
# openapi.yml
openapi: 3.0.0
info:
  title: Viamentor API
  version: 1.0.0

paths:
  /students/{id}:
    get:
      summary: Get student by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        200:
          description: Student found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Student'
        404:
          description: Student not found
        
components:
  schemas:
    Student:
      type: object
      properties:
        id: { type: string }
        firstName: { type: string }
        lastName: { type: string }
        # ...
```

---

### 7.2 Tests d'intégration (Postman/Newman) en CI ≥ 90 % pass
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de backend = pas d'API = pas de tests
- Aucun fichier Postman collection
- Aucun test Newman CI

**Action requise (après création backend)** :

**Créer collection Postman** : `/tests/postman/viamentor-api.json`

**Tests critiques à créer** :
1. Auth : Login, logout, refresh token
2. Students : CRUD complet
3. Lessons : Create, update, delete
4. Invoices : Generate, send, mark paid
5. Planning : Conflicts detection

**CI Integration** :
```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g newman
      - run: newman run tests/postman/viamentor-api.json \
             --environment tests/postman/env-ci.json \
             --reporters cli,json \
             --reporter-json-export results.json
      - name: Check pass rate
        run: |
          PASS_RATE=$(jq '.run.stats.assertions.failed == 0' results.json)
          if [ "$PASS_RATE" != "true" ]; then exit 1; fi
```

---

### 7.3 Moyenne latence 95e percentile documentée (< 400 ms)
**Statut** : ❌ **NON MESURABLE**  
**Évaluation** : 0/10

**Constat** :
- Pas de backend = pas de latence API à mesurer
- Supabase latency non monitorée

**Action requise (post-backend)** :

**Setup APM (Application Performance Monitoring)** :

Options :
- **Sentry Performance** (recommandé)
- **DataDog APM**
- **New Relic**

**Config Sentry** :
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "...",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// Mesurer transactions
const transaction = Sentry.startTransaction({
  op: "http.server",
  name: "GET /api/students/:id",
});

// ... API call ...

transaction.finish();
```

**Targets** :
- p50 : < 100ms
- p95 : < 400ms
- p99 : < 1s

---

### 7.4 Rate-limit, auth scopes, CORS configurés
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 4/10

**Constat** :
- ✅ Auth conçue (Supabase Auth)
- ✅ RBAC 15 rôles définis
- ❌ Rate-limiting non implémenté
- ❌ CORS non configuré
- ❌ Auth scopes non granulaires

**Ce qui existe** :
```typescript
// viamentor-roles.ts
export const ROLES = [
  'super_admin',
  'platform_admin',
  'school_admin',
  // ... 15 rôles
];
```

**Ce qui manque** :

**Rate Limiting** :
```typescript
// middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests
  message: 'Trop de requêtes, réessayez dans 15 min',
});

// Usage
app.use('/api/', limiter);
```

**CORS** :
```typescript
// Next.js API route
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://viamentor.ch');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // ... handler logic
}
```

---

### 7.5 Migration DB rollback testée (up & down)
**Statut** : 🟢 **BON (conception)**  
**Évaluation** : 7/10

**Constat** :
- ✅ Migrations SQL définies (`viamentor-schema-migrations-001.ts`)
- ✅ Bien structurées
- ❌ Rollback scripts non testés
- ❌ Pas en production donc pas critique yet

**Migrations trouvées** :
```typescript
// viamentor-schema-migrations-001.ts
export const migration001SQL = `
  CREATE TABLE tenants (...);
  CREATE TABLE users (...);
  // ... 10 tables
`;
```

**Ce qui manque : Rollback** :
```sql
-- migration-001-rollback.sql
DROP TABLE IF EXISTS expiration_logs CASCADE;
DROP TABLE IF EXISTS message_recipients CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
-- ... dans l'ordre inverse
```

**Recommandation** : Utiliser migration tool

**Prisma Migrate** (recommandé) :
```bash
npm install -D prisma

# Créer migration
npx prisma migrate dev --name init

# Rollback
npx prisma migrate rollback
```

**Ou Supabase Migrations** :
```bash
supabase migration new initial_schema
# Edit .sql file
supabase db push
# Rollback : supabase db reset
```

---

## 📊 Indicateur Backend

**Cible** : Erreurs 5×× / 4×× ratio < 0,1 %

**État actuel** : ❌ **NON APPLICABLE** (pas de backend)

**Prédiction** : Sans tests API, ratio sera **5-10%** (inacceptable)

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| OpenAPI contract | 0/10 | 25% | 0 |
| Tests intégration ≥ 90% | 0/10 | 25% | 0 |
| Latence p95 < 400ms | 0/10 | 20% | 0 |
| Rate-limit, CORS | 4/10 | 15% | 0.6 |
| Migration rollback | 7/10 | 15% | 1.05 |
| **TOTAL** | **2/10** | 100% | **1.65/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - URGENT (2 semaines)
- [ ] Créer backend API (Next.js API Routes OU Supabase Edge Functions)
- [ ] Migrer logique critique côté serveur
- [ ] Implémenter auth flow complet
- [ ] Tests intégration basiques

### P0 - Semaine 3-4
- [ ] OpenAPI contract
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Error handling global

### P1 - Post-MVP
- [ ] GraphQL layer (optionnel)
- [ ] Caching (Redis)
- [ ] Webhooks pour intégrations

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **BLOQUEUR ABSOLU pour production**

**Le backend n'existe pas.** C'est le **risque #1** du projet.

**Estimation effort** :
- Backend minimal (CRUD + Auth) : **3-4 semaines**
- Backend complet (business logic) : **8-10 semaines**

**Décision urgente** :
1. Next.js App Router (Full-stack)
2. Supabase Edge Functions (Serverless)
3. Backend séparé (Node/Express)

**Recommandation** : **Option 1 (Next.js)** pour time-to-market

---

**Prochaines étapes** : Consulter `08-qa-manual.md`

