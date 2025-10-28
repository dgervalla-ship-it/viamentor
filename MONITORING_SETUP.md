# 📊 VIAMENTOR - Configuration Monitoring & Alerting

**Date** : 28 octobre 2025  
**Objectif** : Monitoring 24/7 en production  
**Statut** : ✅ Sentry configuré, autres outils à activer

---

## 🎯 Vue d'Ensemble

### Services Configurés

| Service | Fonction | Statut | Coût |
|---------|----------|--------|------|
| **Sentry** | Error tracking + Performance | ✅ Installé | 0-26$/mois |
| **Vercel Analytics** | Web vitals + Performance | ✅ Intégré | Inclus |
| **Google Analytics 4** | Usage + Conversions | ✅ Installé | Gratuit |
| **BetterUptime** | Uptime monitoring | ⏳ À configurer | 0-15$/mois |
| **Logtail** | Logs aggregation | ⏳ Optionnel | 0-29$/mois |
| **Slack** | Alerting | ⏳ À configurer | Gratuit |

---

## 🔴 1. SENTRY - Error & Performance Monitoring

### ✅ Configuration Actuelle

**Fichier** : `src/lib/sentry.ts`

```typescript
import { initSentry } from './lib/sentry';

initSentry(); // Dans main.tsx
```

### 🔧 Configuration Manuelle

1. **Créer un compte Sentry** :  
   https://sentry.io/signup/

2. **Créer un projet** :
   - Type : React
   - Nom : `viamentor`

3. **Récupérer le DSN** :
   - Dashboard → Settings → Client Keys (DSN)
   - Copier le DSN (commence par `https://`)

4. **Ajouter dans Vercel** :
   ```
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

5. **Optionnel - Source Maps** :
   ```bash
   npm install --save-dev @sentry/vite-plugin
   ```

   Ajouter dans `vite.config.ts` :
   ```typescript
   import { sentryVitePlugin } from "@sentry/vite-plugin";

   export default defineConfig({
     plugins: [
       sentryVitePlugin({
         org: "votre-org",
         project: "viamentor",
         authToken: process.env.SENTRY_AUTH_TOKEN,
       }),
     ],
   });
   ```

### 📊 Métriques Suivies

- **Erreurs** : Toutes les exceptions non gérées
- **Performance** : Web Vitals (LCP, FID, CLS)
- **Session Replay** : Replay des sessions avec erreur
- **Breadcrumbs** : Contexte avant l'erreur

### 🚨 Alertes Recommandées

1. **Alert #1 : Nouvelle erreur (P0)**
   - Condition : Nouvelle erreur jamais vue
   - Action : Slack notification immédiate

2. **Alert #2 : Spike d'erreurs (P1)**
   - Condition : > 10 erreurs en 5 min
   - Action : Email + Slack

3. **Alert #3 : Performance dégradée (P2)**
   - Condition : LCP > 2.5s sur > 25% des sessions
   - Action : Email quotidien

---

## 🟢 2. BETTERUPTIME - Uptime Monitoring

### 🔧 Configuration (5 minutes)

1. **Créer un compte** :  
   https://betteruptime.com

2. **Créer un monitor** :
   - URL : `https://viamentor.vercel.app`
   - Interval : 1 minute
   - Timeout : 30 secondes
   - HTTP Method : GET
   - Expected status : 200

3. **Créer un heartbeat** (API health check) :
   - URL : `https://viamentor.vercel.app/api/health`
   - Interval : 5 minutes

### 📱 Notifications

- **Email** : Activé par défaut
- **Slack** : Intégration disponible
- **SMS** : Optionnel (payant)
- **PagerDuty** : Pour on-call rotation

### 🎯 SLA Cible

- **Uptime** : > 99.9% (8.76h downtime/an max)
- **Response Time** : < 500ms (p95)
- **Availability Zones** : Multi-régions Vercel

---

## 📋 3. LOGTAIL - Logs Aggregation (Optionnel)

### 🔧 Configuration

1. **Créer un compte** :  
   https://logs.betterstack.com

2. **Créer une source** :
   - Type : JavaScript/Browser
   - Nom : Viamentor Production

3. **Installer** :
   ```bash
   npm install @logtail/browser
   ```

4. **Configurer** :
   ```typescript
   import { Logtail } from '@logtail/browser';

   const logtail = new Logtail(import.meta.env.VITE_LOGTAIL_TOKEN);

   logtail.info('App started', { version: '1.0.0' });
   ```

### 📊 Logs à Capturer

- **Authentification** : Login, logout, échecs
- **API Calls** : Success, failures, latency
- **Erreurs** : Toutes les erreurs applicatives
- **Performance** : Slow queries, timeouts

---

## 💬 4. SLACK - Alerting

### 🔧 Configuration Slack

1. **Créer un Workspace** :  
   https://slack.com/create

2. **Créer un canal** : `#viamentor-alerts`

3. **Intégrations** :
   - **Sentry** : Settings → Integrations → Slack
   - **BetterUptime** : Settings → Integrations → Slack
   - **GitHub Actions** : Workflow → notifications

### 📢 Canaux Recommandés

```
#viamentor-alerts        → Erreurs critiques (P0/P1)
#viamentor-deploys       → Déploiements
#viamentor-monitoring    → Métriques quotidiennes
#viamentor-support       → Tickets utilisateurs
```

### 🤖 Exemple de Notification

```
🔴 ALERTE PRODUCTION - Sentry

Erreur : TypeError: Cannot read property 'id' of undefined
Environnement : Production
Affecté : 12 utilisateurs
URL : /students/123

Voir détails : https://sentry.io/...
```

---

## 📈 5. VERCEL ANALYTICS - Performance

### ✅ Déjà Activé

Vercel Analytics est **automatiquement activé** pour tous les projets.

### 📊 Dashboard

👉 https://vercel.com/dotis-projects-c470c3bf/viamentor/analytics

### Métriques Suivies

- **Real User Monitoring** (RUM)
- **Core Web Vitals** :
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- **Time to First Byte** (TTFB)
- **Performance Score**

### 🎯 Objectifs

- LCP : < 2.5s (green)
- FID : < 100ms (green)
- CLS : < 0.1 (green)
- TTFB : < 600ms

---

## 🔍 6. GOOGLE ANALYTICS 4 - Usage

### ✅ Déjà Installé

**Fichier** : `src/lib/analytics.ts`

### 📊 Événements Suivis (15+)

- Page views
- Auth (login, signup, logout)
- Student CRUD
- Lesson booking
- Invoice generated
- Form submissions
- Errors

### Dashboard GA4

👉 https://analytics.google.com/

### Rapports Clés

1. **Acquisition** : D'où viennent les utilisateurs
2. **Engagement** : Temps passé, pages vues
3. **Conversions** : Inscriptions, paiements
4. **Rétention** : Utilisateurs récurrents

---

## 🚨 7. ALERTING RULES

### 🔴 Critiques (P0) - Action Immédiate

| Alert | Condition | Action |
|-------|-----------|--------|
| App Down | Uptime < 99% sur 5 min | Slack + SMS + PagerDuty |
| Error Spike | > 50 errors/min | Slack + Email |
| DB Connection Lost | Supabase unreachable | Slack + SMS |
| Auth Failure Spike | > 20 échecs/min | Email |

### 🟡 Importantes (P1) - Action < 4h

| Alert | Condition | Action |
|-------|-----------|--------|
| Slow Response | p95 latency > 2s | Slack |
| High Error Rate | Error rate > 1% | Email |
| Disk Space Low | < 20% free | Email |

### 🟢 Info (P2) - Daily Digest

| Alert | Condition | Action |
|-------|-----------|--------|
| Performance Dégradée | LCP > 3s | Email quotidien |
| Bugs Mineurs | New minor bugs | Daily summary |

---

## 📊 8. DASHBOARDS

### Dashboard #1 : Real-Time Health

**Stack** : Grafana + Prometheus (futur) ou Vercel Dashboard

**Métriques** :
- Uptime (1 min)
- Response time (p50, p95, p99)
- Error rate
- Active users

### Dashboard #2 : Business Metrics

**Stack** : Google Analytics 4

**Métriques** :
- Nouvelles inscriptions
- Leçons réservées
- Revenus (factures payées)
- NPS score

### Dashboard #3 : Technical Health

**Stack** : Sentry

**Métriques** :
- Errors (par type, par page)
- Performance (LCP, FID, CLS)
- Release health
- Session replay

---

## 🛠️ 9. INCIDENT RESPONSE

### Runbook Incidents

#### 🔴 App Down

1. **Vérifier** :
   - https://viamentor.vercel.app (status HTTP)
   - Vercel Dashboard (build status)
   - Supabase Dashboard (DB health)

2. **Actions** :
   - Rollback dernier deploy (si récent)
   - Vérifier les variables d'environnement
   - Vérifier les limites Vercel/Supabase

3. **Communication** :
   - Status page (statuspage.io)
   - Email aux utilisateurs actifs

#### 🟡 Slow Performance

1. **Vérifier** :
   - Vercel Analytics (TTFB, LCP)
   - Sentry Performance
   - Supabase Query performance

2. **Actions** :
   - Vérifier les requêtes N+1
   - Activer le caching
   - Optimiser les images

#### 🟢 Error Spike

1. **Vérifier** :
   - Sentry (stack trace)
   - Type d'erreur (frontend, backend, network)
   - Pages affectées

2. **Actions** :
   - Hotfix si critique
   - Deploy patch < 1h

---

## 📞 10. ON-CALL ROTATION (Si Équipe)

### Équipe Recommandée

- **Semaine A** : Dev Backend (primary), DevOps (backup)
- **Semaine B** : Dev Frontend (primary), QA (backup)

### Responsabilités

- **Répondre** : Incidents P0 < 15 min
- **Résoudre** : P0 < 1h, P1 < 4h, P2 < 24h
- **Communiquer** : Status updates toutes les 30 min
- **Post-Mortem** : Rapport < 48h après incident

### Outils

- **PagerDuty** : Gestion on-call
- **Opsgenie** : Alternative
- **Slack** : Communication d'équipe

---

## ✅ CHECKLIST SETUP MONITORING

### Phase 1 : Monitoring de Base (✅ Fait)

- [x] Sentry installé et configuré
- [x] Google Analytics 4 actif
- [x] Vercel Analytics actif
- [ ] Variables Sentry dans Vercel

### Phase 2 : Uptime & Alerting (30 minutes)

- [ ] BetterUptime configuré
- [ ] Monitors créés (homepage + API health)
- [ ] Slack workspace créé
- [ ] Intégrations Slack (Sentry + BetterUptime)

### Phase 3 : Dashboards (1 heure)

- [ ] Dashboard Sentry configuré
- [ ] Dashboard GA4 personnalisé
- [ ] Rapports automatiques (hebdo)

### Phase 4 : Incident Response (2 heures)

- [ ] Runbooks écrits
- [ ] On-call rotation définie
- [ ] Status page créé
- [ ] Communication templates

---

## 🚀 QUICK START - 15 Minutes Setup

### Étape 1 : Sentry (5 min)

1. Compte : https://sentry.io/signup/
2. Projet React créé
3. DSN copié
4. Variable Vercel :
   ```
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```
5. Redéployer

### Étape 2 : BetterUptime (5 min)

1. Compte : https://betteruptime.com
2. Monitor : https://viamentor.vercel.app
3. Heartbeat : https://viamentor.vercel.app/api/health
4. Email notifications activées

### Étape 3 : Slack (5 min)

1. Workspace : https://slack.com/create
2. Canal : `#viamentor-alerts`
3. Intégrations :
   - Sentry webhook
   - BetterUptime webhook
   - GitHub Actions

---

## 📊 MÉTRIQUES SLA/SLO

### Service Level Objectives (SLO)

| Métrique | Target | Mesure |
|----------|--------|--------|
| **Availability** | 99.9% | BetterUptime |
| **Error Rate** | < 0.1% | Sentry |
| **Response Time (p95)** | < 500ms | Vercel Analytics |
| **LCP** | < 2.5s | Vercel + Sentry |
| **FID** | < 100ms | Vercel + Sentry |
| **CLS** | < 0.1 | Vercel + Sentry |

### Service Level Indicators (SLI)

- **Uptime** : % de temps où status HTTP = 200
- **Error Budget** : 43 min downtime/mois autorisé (99.9%)
- **MTTR** : Mean Time To Recovery < 1h
- **MTBF** : Mean Time Between Failures > 1000h

---

## 📱 MONITORING MOBILE

### React Native (Futur)

Si app mobile :

```bash
npm install @sentry/react-native
npm install @react-native-firebase/analytics
```

---

## 💰 COÛT ESTIMÉ

### Plan Gratuit (Recommandé pour démarrer)

| Service | Limite Gratuite | Coût |
|---------|-----------------|------|
| Sentry | 5K errors/mois | Gratuit |
| BetterUptime | 1 monitor | Gratuit |
| Vercel Analytics | Illimité | Inclus |
| GA4 | Illimité | Gratuit |
| Slack | < 10K messages | Gratuit |

**Total** : **0 CHF/mois** 🎉

### Plan Production (Si croissance)

| Service | Plan | Coût |
|---------|------|------|
| Sentry Team | 50K errors/mois | 26$/mois |
| BetterUptime Pro | 10 monitors | 15$/mois |
| Logtail | 1GB logs/mois | 29$/mois |
| Slack Pro | Features avancées | 7.25$/user/mois |

**Total** : ~**70-100$/mois** (selon équipe)

---

## 🔧 ADVANCED SETUP

### Custom Health Check Endpoint

Créer `/api/health` pour BetterUptime :

```typescript
// src/pages/api/health.ts
export async function GET() {
  try {
    // Vérifier DB
    const dbHealthy = await supabase.from('tenants').select('count').limit(1);
    
    if (dbHealthy.error) {
      return new Response(JSON.stringify({ 
        status: 'unhealthy', 
        database: 'error' 
      }), { status: 503 });
    }

    return new Response(JSON.stringify({ 
      status: 'healthy',
      database: 'ok',
      timestamp: new Date().toISOString()
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'error',
      message: error.message
    }), { status: 500 });
  }
}
```

---

## ✅ VALIDATION

### Tests Monitoring

```bash
# 1. Tester Sentry localement
npm run dev
# Ouvrir console → déclencher une erreur

# 2. Tester l'app en prod
curl https://viamentor.vercel.app

# 3. Tester health endpoint
curl https://viamentor.vercel.app/api/health

# 4. Vérifier Sentry Dashboard
https://sentry.io/organizations/YOUR_ORG/issues/

# 5. Vérifier BetterUptime
https://betteruptime.com/status
```

---

## 📚 RESSOURCES

- **Sentry Docs** : https://docs.sentry.io/platforms/javascript/guides/react/
- **BetterUptime Docs** : https://docs.betteruptime.com/
- **Vercel Analytics** : https://vercel.com/docs/analytics
- **Google Analytics 4** : https://support.google.com/analytics/

---

## 🎯 NEXT STEPS

### Cette Semaine (30 min)
1. ✅ Configurer compte Sentry
2. ✅ Ajouter VITE_SENTRY_DSN dans Vercel
3. ✅ Créer compte BetterUptime
4. ✅ Créer 2 monitors (app + API)

### Semaine Prochaine (2h)
5. ✅ Créer Slack workspace
6. ✅ Intégrer Slack avec Sentry + BetterUptime
7. ✅ Configurer alerting rules
8. ✅ Tester incident response

---

**🎉 Avec ce setup, vous aurez une observabilité complète 24/7 !**

_Mis à jour le 28 octobre 2025_

