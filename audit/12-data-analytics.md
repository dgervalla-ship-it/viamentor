# 📊 AUDIT - DATA / ANALYTICS ENGINEER

**Rôle** : Data / Analytics Engineer  
**Mission** : Fournir des données fiables pour décider  
**Score Global** : 🔴 **1/10**  
**Statut** : CRITIQUE - Aucun tracking

---

## ✅ Tâches à contrôler

### 12.1 Plan de tracking (GTM ou Segment) validé avant MEP
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- ❌ Google Tag Manager non installé
- ❌ Segment non installé
- ❌ Google Analytics non configuré
- ❌ Aucun plan de tracking documenté

**Analytics mentionnés dans le code** :
```typescript
// viamentor-contact-public-guide.ts (ligne 54-57)
// * ### 4. Analytics Integration
// * - Google Analytics 4 (page_view, generate_lead, conversion)
// * - Meta Pixel (Lead event)
// * - TikTok Pixel (SubmitForm, CompleteRegistration)
// * - Custom events avec valeur LTV
```

**MAIS** : Commentaires seulement, pas d'implémentation

**Impact** :
- 🔴 Aucune data pour décider
- 🔴 ROI marketing inconnu
- 🔴 Optimisation impossible

**Action requise URGENTE** :

**Plan de Tracking** : `/docs/analytics/tracking-plan.md`

```markdown
# Tracking Plan Viamentor

## Events Core

### Page Views
| Event | Properties | Trigger |
|-------|-----------|---------|
| page_view | page_path, page_title, user_role | Chaque navigation |

### Authentication
| Event | Properties | Trigger |
|-------|-----------|---------|
| login_success | user_id, role, method | Login réussi |
| login_failed | error_type | Login échoué |
| signup_completed | user_id, tenant_id | Inscription terminée |
| logout | user_id, session_duration | Logout |

### Student Management
| Event | Properties | Trigger |
|-------|-----------|---------|
| student_created | category, source | Élève créé |
| student_updated | field_changed | Élève modifié |
| student_deleted | reason | Élève supprimé |

### Planning
| Event | Properties | Trigger |
|-------|-----------|---------|
| lesson_booked | category, instructor_id, duration | Leçon réservée |
| lesson_cancelled | reason, notice_hours | Leçon annulée |
| conflict_detected | type, resources | Conflit détecté |

### Invoicing
| Event | Properties | Trigger |
|-------|-----------|---------|
| invoice_generated | amount, items_count | Facture générée |
| invoice_sent | channel (email/postal) | Facture envoyée |
| payment_received | amount, method | Paiement reçu |

## User Properties
- user_id
- role
- tenant_id
- canton
- plan (starter/pro/enterprise)
- signup_date

## Implementation

### Google Analytics 4
```typescript
// lib/analytics.ts
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

export const trackEvent = (event: string, properties: object) => {
  ReactGA.event(event, properties);
};

export const trackPage = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};
```

### Usage
```typescript
// In component
import { trackEvent } from '@/lib/analytics';

const handleCreateStudent = () => {
  // ... create logic
  trackEvent('student_created', {
    category: student.category,
    source: 'manual',
  });
};
```
```

---

### 12.2 Événements nommés casing snake_case + versionnés
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas d'événements trackés
- Convention naming non définie

**Action requise** :

**Convention Naming** : `/docs/analytics/naming-convention.md`

```markdown
# Event Naming Convention

## Format
`{object}_{action}` en snake_case

## Examples
✅ student_created
✅ lesson_booked
✅ invoice_sent
✅ payment_received

❌ StudentCreated (PascalCase)
❌ student-created (kebab-case)
❌ createStudent (camelCase)

## Versioning
Quand structure event change, versionner :

v1 : student_created { category, source }
v2 : student_created_v2 { category, source, instructor_id, campaign }

Garder v1 + v2 pendant 3 mois, puis deprecate v1.
```

---

### 12.3 Tests de data-quality (duplicate, NULL impossible)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Pas de tests data quality
- Validation côté client seulement
- Risque : données corrompues en DB

**Action requise** :

**Data Quality Tests** : `/tests/data-quality/`

```sql
-- tests/data-quality/check-students.sql

-- Test 1 : No duplicate emails
SELECT email, COUNT(*) as cnt
FROM students
GROUP BY email
HAVING COUNT(*) > 1;
-- Expected : 0 rows

-- Test 2 : No NULL in required fields
SELECT COUNT(*) 
FROM students
WHERE first_name IS NULL 
   OR last_name IS NULL 
   OR email IS NULL;
-- Expected : 0

-- Test 3 : Valid email format
SELECT COUNT(*)
FROM students
WHERE email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$';
-- Expected : 0

-- Test 4 : Future dates coherent
SELECT COUNT(*)
FROM lessons
WHERE date < NOW() AND status = 'scheduled';
-- Expected : 0 (no lessons in past with status scheduled)
```

**Run tests** :
```bash
# Daily cron
psql $DATABASE_URL -f tests/data-quality/check-students.sql
# Alert si résultat ≠ expected
```

---

### 12.4 Dashboards critique (activation, rétention J7) live J+1
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Dashboards analytics UI existent (code)
- Mais pas de vraie data source
- Metrics business non trackées

**Dashboards à créer** :

**1. Product Metrics Dashboard** (Metabase/Redash)

```sql
-- Activation Rate (J7)
SELECT 
  DATE_TRUNC('week', signup_date) as week,
  COUNT(*) as signups,
  COUNT(CASE WHEN first_action_date <= signup_date + INTERVAL '7 days' 
        THEN 1 END) as activated,
  ROUND(100.0 * COUNT(CASE WHEN first_action_date <= signup_date + INTERVAL '7 days' 
        THEN 1 END) / COUNT(*), 2) as activation_rate
FROM users
GROUP BY week
ORDER BY week DESC;
-- Target : > 60%

-- Retention J7, J30
SELECT 
  cohort,
  retained_d7,
  retained_d30
FROM retention_cohorts;
-- Target : D7 > 40%, D30 > 20%

-- MRR (Monthly Recurring Revenue)
SELECT 
  SUM(amount) as mrr,
  COUNT(DISTINCT tenant_id) as paying_tenants
FROM subscriptions
WHERE status = 'active';
```

**2. Business Dashboard** (Superset/Tableau)

- KPI : MRR, Churn, LTV, CAC
- Graphs : Signups trend, Revenue trend
- Tables : Top tenants, Churn reasons

---

### 12.5 Documentation métier (comment lire le dashboard)
**Statut** : ❌ **ABSENT**  
**Évaluation** : 0/10

**Constat** :
- Dashboards UI codés mais pas expliqués
- Utilisateurs ne sauront pas interpréter

**Action requise** :

**Guide Analytics** : `/docs/analytics/how-to-read-dashboards.md`

```markdown
# Guide : Lire les Dashboards Viamentor

## Dashboard : École (School Admin)

### KPI 1 : Taux d'occupation
**Définition** : % heures moniteurs utilisées vs disponibles

**Calcul** : 
```
Taux = (Heures leçons réservées) / (Heures dispo moniteurs) × 100
```

**Interprétation** :
- < 60% : ⚠️ Sous-utilisation → recruter moins ou marketing plus
- 60-80% : ✅ Optimal
- \> 80% : ⚠️ Sur-booking risque → recruter moniteur

**Action si < 60%** :
1. Vérifier disponibilités moniteurs (trop larges ?)
2. Lancer campagne marketing
3. Promotions tarifs creux

### KPI 2 : Chiffre affaires prévisionnel
**Définition** : CA estimé sur 30 jours glissants

**Calcul** :
```
CA = SUM(leçons confirmées × tarif) + SUM(forfaits vendus)
```

**Interprétation** :
- Trend ↗️ : Business grows
- Trend → : Stable
- Trend ↘️ : ⚠️ Alerte, investiguer

### KPI 3 : Taux de réussite examen
**Définition** : % élèves réussissant du 1er coup

**Benchmark** : 
- Suisse moyenne : 65%
- Votre école : ____%

**Si < moyenne** :
- Vérifier qualité enseignement
- Plus de leçons recommandées
- Examen blanc obligatoire
```

---

## 📊 Indicateur Data

**Cible** : Données financières reconciliées à 100 % vs source

**État actuel** : ❌ **NON APPLICABLE** (pas de data réelle)

**Post-production** :
```sql
-- Reconciliation check (daily)
SELECT 
  SUM(invoice_total) as total_invoices,
  SUM(payment_amount) as total_payments,
  SUM(invoice_total) - SUM(payment_amount) as outstanding
FROM (
  SELECT SUM(total) as invoice_total FROM invoices
  UNION ALL
  SELECT SUM(amount) as payment_amount FROM payments
);

-- Compare avec comptabilité externe
-- Diff toléré : < 1 CHF (arrondi)
```

---

## 🎯 SCORE DÉTAILLÉ

| Critère | Note | Poids | Pondéré |
|---------|------|-------|---------|
| Plan tracking validé | 0/10 | 30% | 0 |
| Naming convention | 0/10 | 15% | 0 |
| Data quality tests | 0/10 | 25% | 0 |
| Dashboards live | 0/10 | 20% | 0 |
| Docs métier | 0/10 | 10% | 0 |
| **TOTAL** | **1/10** | 100% | **0/10** |

---

## 📋 ACTIONS PRIORITAIRES

### P0 - Sprint 1
- [ ] Installer GA4 + GTM
- [ ] Définir 20 events critiques
- [ ] Implémenter tracking code
- [ ] Valider events fire (GA4 DebugView)

### P1 - Sprint 2
- [ ] Créer dashboards Metabase/Superset
- [ ] Data quality tests SQL
- [ ] Documentation lecture dashboards

### P2 - Post-MVP
- [ ] Data warehouse (BigQuery)
- [ ] BI tool (Tableau)
- [ ] ML models (churn prediction)

---

## 🚦 RECOMMANDATION

**Statut** : 🔴 **CRITIQUE - Aucune analytics**

**Sans analytics** :
- Décisions à l'aveugle
- Impossible d'optimiser
- CAC/LTV inconnus

**Effort** : 1 semaine setup basique

**Quick win** : GA4 (3 heures)

---

**Prochaines étapes** : Consulter `13-tech-writer.md`

