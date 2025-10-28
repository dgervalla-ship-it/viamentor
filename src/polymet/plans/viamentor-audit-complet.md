# Audit Complet Viamentor

## User Request
Identifier toutes les anomalies, incohérences et pages manquantes dans le prototype Viamentor.

## Related Files
- @/polymet/prototypes/viamentor-system-prototype (to view) - Prototype principal
- @/polymet/plans/viamentor-design-system-full-compliance (to view) - Plan conformité en cours

## TODO List
- [x] Analyser le prototype complet (148 routes)
- [x] Identifier les pages placeholder
- [x] Identifier les incohérences de routing
- [x] Identifier les anomalies de navigation
- [x] Créer rapport détaillé

## Important Notes

### 🔴 ANOMALIES CRITIQUES

#### 1. Pages Placeholder (17 pages manquantes)
**Placeholder utilisé au lieu d'implémentation réelle:**
- `/instructor/lessons` - Liste leçons moniteur
- `/student/planning` - Planning élève
- `/secretary/lessons` - Leçons secrétariat
- `/instructor/evaluations` - Historique évaluations
- `/instructor/availability` - Disponibilités moniteur
- `/instructor/makeups` - Rattrapages moniteur
- `/instructor/performance` - Stats moniteur
- `/instructor/earnings` - Revenus moniteur
- `/staff/profile` - Profil secrétaire
- `/platform/analytics` - Analytics plateforme
- `/config` - Configuration système
- `/config/features` - Feature flags
- `/config/integrations` - Intégrations
- `/docs` - Documentation
- `/support` - Support tickets
- `/reports` - Rapports globaux
- `/staff` - Gestion secrétaires

#### 2. Incohérences de Routing

**A. Redirects sans destination claire:**
- `/finance/analytics` → `/analytics` (OK mais perte de contexte tab)
- `/staff/planning` → `/secretary/planning` (OK)
- `/dashboard` → `/school/dashboard` (OK)
- `/instructor-dashboard` → `/instructor/dashboard` (OK)
- `/student-dashboard` → `/student/dashboard` (OK)

**B. Routes avec patterns incohérents:**
- Analytics: `/instructors/analytics`, `/vehicles/analytics`, `/exams/analytics`, `/financial/analytics`
  - ❌ Devrait être: `/analytics?tab=instructors`, `/analytics?tab=vehicles`, etc.
  - ✅ Déjà centralisé: `/analytics` existe mais routes individuelles persistent

**C. Duplicate functionality:**
- `/planning` (School Admin) vs `/instructor/planning` vs `/secretary/planning`
  - Même composant `PlanningPage` réutilisé partout
  - Pas de différenciation par rôle

#### 3. Anomalies de Navigation Sidebar

**A. Sections manquantes dans sidebar:**
- Pas de section "Examens" visible
- Pas de section "Cours Théoriques"
- Pas de section "Rattrapages"
- Pas de section "Prospects/CRM"

**B. Liens navigation vers pages placeholder:**
- Sidebar contient probablement des liens vers pages non implémentées

#### 4. Incohérences de Nommage

**A. Patterns de routes mixtes:**
- `/student/lessons` vs `/instructor/lessons` vs `/lessons`
- `/student/profile` vs `/instructor/profile` (OK)
- `/settings/pricing` vs `/pricing` (duplicate?)

**B. Préfixes incohérents:**
- Certaines pages: `viamentor-` prefix
- Autres pages: pas de prefix
- Exemple: `ViamentorLoginPage` vs `StudentsPage`

#### 5. Pages Détails Manquantes

**A. Détails incomplets:**
- ✅ `/students/:id` - Existe
- ✅ `/instructors/:id` - Existe
- ✅ `/vehicles/:id` - Existe
- ✅ `/tenants/:id` - Existe
- ✅ `/exams/:id` - Existe
- ✅ `/lessons/:id` - Existe
- ❌ `/invoices/:id` - Manquant (modal au lieu de page)
- ❌ `/payments/:id` - Manquant
- ❌ `/prospects/:id` - Manquant (sheet au lieu de page)

#### 6. Fonctionnalités Manquantes

**A. Gestion Examens:**
- ✅ `/exams` - Liste
- ✅ `/exams/:id` - Détail
- ✅ `/exams/book` - Réservation
- ✅ `/exams/mock` - Examens blancs
- ✅ `/exams/analytics` - Analytics
- ❌ `/exams/results` - Résultats examens
- ❌ `/exams/calendar` - Calendrier examens

**B. Gestion Cours Théoriques:**
- ❌ `/theory-courses` - Liste cours théoriques
- ❌ `/theory-courses/:id` - Détail cours
- ❌ `/theory-courses/book` - Inscription cours
- ❌ Intégré dans Planning mais pas de page dédiée

**C. Gestion Rattrapages:**
- ✅ `/settings/makeups` - Configuration
- ✅ `/student/makeups` - Dashboard élève
- ❌ `/instructor/makeups` - Page placeholder (devrait être réelle)
- ❌ `/makeups/analytics` - Analytics rattrapages

**D. CRM Prospects:**
- ✅ `/staff/prospects` - Kanban prospects
- ❌ `/prospects/:id` - Détail prospect (sheet au lieu de page)
- ✅ `/staff/marketing/campaigns` - Campagnes
- ❌ `/campaigns/:id` - Détail campagne

**E. Gestion Avis Google:**
- ✅ `/settings/reviews` - Configuration
- ✅ `/reviews/verification` - Vérification
- ✅ `/reviews/dashboard` - Analytics
- ❌ `/reviews/:id` - Détail avis

**F. Gestion Paiements:**
- ✅ `/payments` - Liste paiements
- ✅ `/billing` - Dashboard facturation
- ✅ `/invoices` - Liste factures
- ❌ `/invoices/:id` - Détail facture (modal)
- ❌ `/payments/:id` - Détail paiement

#### 7. Anomalies UX/UI

**A. Breadcrumbs incohérents:**
- Certaines pages: breadcrumb complet
- Autres pages: breadcrumb partiel ou manquant

**B. Back links incohérents:**
- Placeholder pages: backLink défini
- Pages réelles: pas de back link systématique

**C. Layout inconsistencies:**
- Toutes les pages wrapped dans `ViamentorMainLayout`
- Mais certaines devraient être fullscreen (onboarding, login)

#### 8. Problèmes de Performance

**A. Prototype trop large:**
- 148 routes dans un seul fichier
- 2476 lignes de code
- ⚠️ LARGE_FILE_ALERT déclenché

**B. Imports massifs:**
- 130+ imports de pages
- Tous chargés au démarrage
- Pas de lazy loading

### 🟡 INCOHÉRENCES MINEURES

#### 1. Tenant Hardcodé
- Toutes les routes: `tenant="auto-ecole-geneve"`
- Devrait être dynamique ou context-based

#### 2. Locale Hardcodée
- Toutes les routes: `locale="fr"`
- Devrait être dynamique ou context-based

#### 3. Data-pol-id Partout
- Tous les éléments ont data-pol-id
- Utile pour tracking mais verbose

#### 4. Commentaires Sections
- Bonne organisation avec commentaires
- Mais sections trop longues

### 🟢 POINTS POSITIFS

#### 1. Structure Claire
- Sections bien organisées
- Commentaires explicites
- Groupement logique des routes

#### 2. Redirects Bien Gérés
- Anciens chemins redirigés
- Compatibilité maintenue

#### 3. Error Pages Complètes
- 404, 403, 500, Maintenance
- Toutes implémentées

#### 4. Smart Home Redirect
- Route `/` intelligente
- Redirection selon rôle

### 📊 STATISTIQUES

**Total routes:** 148
**Pages réelles:** 131
**Pages placeholder:** 17
**Redirects:** 5
**Error pages:** 4

**Par catégorie:**
- School Admin: 35 routes
- Instructor: 18 routes
- Student: 15 routes
- Secretary: 8 routes
- Super Admin: 12 routes
- Platform Admin: 5 routes
- Shared: 55 routes

### 🎯 RECOMMANDATIONS PRIORITAIRES

#### Priorité 1 - Critique
1. Implémenter les 17 pages placeholder
2. Créer pages détails manquantes (invoices, payments, prospects)
3. Optimiser prototype (lazy loading, code splitting)

#### Priorité 2 - Haute
4. Standardiser patterns de routing
5. Centraliser analytics sous `/analytics`
6. Ajouter pages cours théoriques dédiées
7. Compléter gestion examens

#### Priorité 3 - Moyenne
8. Rendre tenant/locale dynamiques
9. Ajouter lazy loading
10. Refactorer prototype en modules

#### Priorité 4 - Basse
11. Nettoyer data-pol-id si non utilisé
12. Optimiser imports
13. Documenter architecture routing

## Plan Information
*Created at iteration 253*

  
## Plan Information
*This plan is created when the project is at iteration 253, and date 2025-10-19T22:55:10.455Z*
