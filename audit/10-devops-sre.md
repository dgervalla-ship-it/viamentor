# 🚀 AUDIT - DEVOPS / SRE

**Rôle** : DevOps / SRE  
**Mission** : Livrer du code en prod sans downtime et le garder en vie  
**Score Global** : 🟡 **3/10**  
**Statut** : INSUFFISANT - CI/CD manquant

---

## ✅ Tâches à contrôler

### 10.1 Pipeline CI/CD complète (lint → test → build → deploy) ≤ 15 min
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- ❌ Aucun fichier `.github/workflows/`
- ❌ Pas de CI/CD configuré
- ❌ Déploiement manuel seulement
- 🔴 **RISQUE MAJEUR**

**Impact** :
- ⚠️ Erreurs détectées tard (après merge)
- ⚠️ Déploiement lent et error-prone
- ⚠️ Impossible de rollback rapidement

**Action requise URGENTE** :

**Pipeline CI/CD complète** :

**Fichier** : `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint -- --max-warnings 0
      
  typecheck:
    name: TypeScript
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsc --noEmit
      
  test-unit:
    name: Unit Tests
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        
  test-e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test-unit, test-e2e]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Upload build
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          
  deploy-staging:
    name: Deploy Staging
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - name: Deploy to Vercel Staging
        run: npx vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
        
  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - name: Deploy to Vercel Production
        run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

**Timeline cible** :
- Lint : 2 min
- Typecheck : 2 min
- Unit tests : 3 min
- E2E tests : 5 min
- Build : 2 min
- Deploy : 1 min
- **Total** : ~15 min ✅

---

### 10.2 Infrastructure as Code (Terraform/Pulumi) versionnée
**Statut** : 🟡 **PARTIEL**  
**Évaluation** : 5/10

**Constat** :
- ✅ Supabase = Infrastructure managed
- ❌ Pas de Terraform/Pulumi
- ⚠️ Config Supabase non versionnée

**Ce qui est "Infrastructure"** :
- Supabase project (DB, Auth, Storage)
- Vercel deployment (probable)
- DNS, CDN (futurs)

**Supabase non-versionné** :
- Tables créées manuellement (SQL Editor)
- RLS policies manuelles
- Auth settings manuels

**Action requise** :

**Versionner config Supabase** :

```bash
# Installer Supabase CLI
npm install -D supabase

# Initialiser
npx supabase init

# Link projet
npx supabase link --project-ref jdyuulqscwxlkswmceqp

# Pull config actuelle
npx supabase db pull
```

**Résultat** : Fichiers créés dans `/supabase/`
```
supabase/
├── config.toml
├── migrations/
│   └── 20251028_initial_schema.sql
└── seed.sql
```

**Bénéfice** :
- ✅ Infrastructure versionnée
- ✅ Reproductible (dev, staging, prod)
- ✅ Rollback facile

**Pour Vercel** : `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

---

### 10.3 SLI/SLO définis (ex : disponibilité 99,9 %) + dashboard
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Aucun SLI/SLO défini
- Pas de monitoring uptime
- Pas de dashboard observabilité

**Action requise** :

**Définir SLO** : `/docs/slo.md`

```markdown
# Service Level Objectives (SLO)

## Availability
- **SLO** : 99.9% uptime (mensuel)
- **Error Budget** : 43 min downtime/mois
- **SLI** : % de requests HTTP 200 vs total
- **Measurement** : Vercel Analytics + Sentry

## Latency
- **SLO** : 95% requests < 400ms
- **SLI** : p95 latency
- **Measurement** : Sentry Performance

## Error Rate
- **SLO** : < 0.1% requests en erreur
- **SLI** : (5xx + 4xx) / total requests
- **Measurement** : Sentry Error Tracking

## Data Freshness
- **SLO** : Data < 1 min de retard
- **SLI** : Timestamp dernière sync
- **Measurement** : Custom metric

## Alerting
- Availability < 99.9% → Page on-call
- Latency p95 > 1s → Slack alert
- Error rate > 1% → Slack alert
```

**Dashboard** : Grafana ou Vercel Analytics

---

### 10.4 Backup DB automatisé + restore testé mensuellement
**Statut** : 🟢 **BON (Supabase)**  
**Évaluation** : 7/10

**Constat** :
- ✅ Supabase fait backups automatiques
- ✅ Point-in-time recovery disponible
- ❌ Restore jamais testé
- ❌ Pas de process documenté

**Supabase Backups (inclus)** :
- Daily backups (Pro plan)
- 7 days retention
- Point-in-time recovery

**Action requise** :

**Tester restore** : 1× par mois

```bash
# Créer backup manuel
supabase db dump -f backup-$(date +%Y%m%d).sql

# Tester restore (sur projet test)
supabase db reset
supabase db push --file backup-20251028.sql

# Vérifier data integrity
psql $DATABASE_URL -c "SELECT COUNT(*) FROM students;"
```

**Plan de Disaster Recovery** :

```markdown
# DR Plan

## RTO (Recovery Time Objective) : 2 heures
Temps max toléré d'indisponibilité

## RPO (Recovery Point Objective) : 1 heure
Perte de données max tolérée

## Scenarios

### Scenario 1 : Supabase region down
1. Switch to read-only mode (1 min)
2. Communicate to users (5 min)
3. Failover to backup region (30 min) [si multi-region]
4. Restore service (1h total)

### Scenario 2 : Data corruption
1. Identify corruption timestamp (10 min)
2. Restore from backup (30 min)
3. Replay transactions depuis backup (1h)
4. Validate data integrity (20 min)

### Scenario 3 : Accidental DELETE
1. Stop all writes immediately (1 min)
2. Point-in-time recovery (15 min)
3. Validate recovery (10 min)
4. Resume operations (30 min total)
```

---

### 10.5 Incident runbook + on-call rotation documentés
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de runbook incidents
- Pas de rotation on-call
- Pas de PagerDuty/Opsgenie

**Action requise** :

**Incident Runbook** : `/docs/runbook.md`

```markdown
# Incident Response Runbook

## Severity Levels

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| P0 | Production down | < 15 min | Login broken |
| P1 | Core feature broken | < 1 hour | Can't create student |
| P2 | Minor feature broken | < 4 hours | Export PDF fails |
| P3 | Cosmetic | < 24 hours | Button misaligned |

## P0 : Production Down

### Detection
- Uptime monitor alert
- Sentry error spike
- User reports

### Response
1. **Ack alert** (< 5 min)
2. **Assess impact** : How many users affected?
3. **Communicate** : Status page update
4. **Triage** : Bug or infra?
5. **Fix** : Rollback or hotfix
6. **Verify** : Monitor metrics 30 min
7. **Postmortem** : Within 48h

### Contacts
- On-call dev : [Phone]
- Supabase support : support@supabase.com
- Vercel support : support@vercel.com

## Rollback Procedure

### Vercel
```bash
vercel rollback
# Or via dashboard
```

### Supabase Migration
```bash
supabase migration rollback
```

### Cache Clear
```bash
# Vercel
vercel --purge

# Browser
Broadcast message : "Please refresh (Cmd+R)"
```
```

**On-call Rotation** :
```
Semaine 1 : Dev A
Semaine 2 : Dev B
Semaine 3 : Dev C
Semaine 4 : Dev A
```

---

## 📊 Indicateur DevOps

**Cible** : MTTR ≤ 1 h, MTBF ≥ 1 000 h

**MTTR** (Mean Time To Recovery) : Temps moyen résolution incident  
**MTBF** (Mean Time Between Failures) : Temps moyen entre pannes

**État actuel** : ❌ **NON MESURABLE** (pas en prod)

**Prédiction** :
- Sans monitoring : MTTR = 4-8h (détection lente)
- Sans tests : MTBF = 10-50h (pannes fréquentes)

**Target avec process** :
- MTTR < 1h (détection + fix rapides)
- MTBF > 1000h (42 jours entre pannes)

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Pipeline CI/CD ≤ 15min | 0/10 | 30% | 0 |
| Infrastructure as Code | 5/10 | 20% | 1.0 |
| SLI/SLO + dashboard | 0/10 | 20% | 0 |
| Backup + restore testé | 7/10 | 15% | 1.05 |
| Runbook + on-call | 0/10 | 15% | 0 |
| **TOTAL** | **3/10** | 100% | **2.05/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Cette semaine
- [ ] Setup GitHub Actions CI basique (lint + build)
- [ ] Choisir plateforme deploy (Vercel recommandé)
- [ ] Premier déploiement staging

### P0 - Semaine prochaine
- [ ] CI complet (lint + test + build + deploy)
- [ ] Environnements : dev, staging, production
- [ ] Secrets management (GitHub Secrets)

### P1 - Sprint 1
- [ ] Définir SLO
- [ ] Setup monitoring (Sentry + Vercel Analytics)
- [ ] Incident runbook
- [ ] Backup restore test

### P2 - Post-MVP
- [ ] Multi-region deployment
- [ ] Blue-green deployments
- [ ] On-call rotation
- [ ] Automated rollback

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **CRITIQUE - Pas de déploiement automatisé**

**Sans CI/CD** :
- Déploiement = risqué
- Régression non détectée
- Rollback difficile

**Effort** : 1 semaine setup complet

**Quick win** : Vercel (deploy en 10 min)

```bash
npm install -g vercel
vercel login
vercel
# Suivre instructions
```

---

**Prochaines étapes** : Consulter `11-security-engineer.md`

