# Priorité 2 - HAUTE - Améliorations Système Viamentor

## User Request
Implémenter les améliorations de **Priorité 2 - HAUTE** :
1. **Standardiser routing patterns** - Unifier les patterns de routes analytics
2. **Centraliser analytics** - Regrouper tous les analytics sous `/analytics`
3. **Unifier nommage** - Cohérence dans les noms de composants/pages
4. **Ajouter pages cours théoriques** - Liste, détail, inscription
5. **Compléter gestion examens** - Résultats, calendrier

## Related Files

### Prototype
- @/viamentor/prototypes/viamentor-system-prototype (to edit) - Routes principales à standardiser

### Pages à créer - Cours Théoriques
- @/viamentor/pages/viamentor-theory-courses-list-page (to create) - Liste cours théoriques
- @/viamentor/pages/viamentor-theory-course-detail-page (to create) - Détail cours théorique
- @/viamentor/pages/viamentor-theory-course-book-page (to create) - Inscription cours théorique

### Pages à créer - Examens
- @/viamentor/pages/viamentor-exams-results-page (to create) - Résultats examens
- @/viamentor/pages/viamentor-exams-calendar-page (to create) - Calendrier examens

### Data existants
- @/viamentor/data/viamentor-theory-courses-data (to view) - Mock data cours théoriques
- @/viamentor/data/viamentor-theory-courses-i18n (to view) - Traductions cours théoriques
- @/viamentor/data/viamentor-exams-data (to view) - Mock data examens
- @/viamentor/data/viamentor-exams-i18n (to view) - Traductions examens

## TODO List

### Phase 1 - Standardisation Routing Analytics ✅
- [x] Analyser les routes analytics actuelles
- [x] Identifier les routes à rediriger vers `/analytics`
- [x] Créer redirects pour compatibilité
- [x] Mettre à jour prototype avec redirects
- [x] Redirects créés: instructors, vehicles, financial, exams, reviews → /analytics

### Phase 2 - Pages Cours Théoriques ✅
- [x] Créer page liste cours théoriques avec filtres
- [x] Créer page détail cours théorique avec participants
- [x] Créer page inscription cours théorique (wizard)
- [x] Ajouter routes /theory-courses, /theory-courses/:id, /theory-courses/book dans prototype
- [x] Mettre à jour navigation sidebar avec section "Cours Théoriques"

### Phase 3 - Complétion Gestion Examens ✅
- [x] Créer page résultats examens avec stats
- [x] Créer page calendrier examens avec vue mensuelle
- [x] Ajouter routes /exams/results et /exams/calendar dans prototype
- [x] Mettre à jour navigation sidebar avec section "Examens" améliorée
- [x] Ajouter badges notifications sur résultats examens
- [x] Vérifier navigation sidebar pour tous les rôles
- [x] Confirmer traductions i18n FR/DE/IT/EN complètes

### Phase 4 - Unification Nommage ✅
- [x] Créer documentation complète conventions de nommage
- [x] Documenter patterns fichiers (pages, components, data)
- [x] Documenter patterns routes
- [x] Documenter conventions i18n
- [x] Documenter conventions TypeScript
- [x] Créer checklist conformité
- [x] Ajouter exemples complets par domaine

### Phase 5 - Tests & Documentation ✅
- [x] Tester toutes les nouvelles routes
- [x] Vérifier navigation sidebar mise à jour
- [x] Créer documentation conventions nommage
- [x] Mettre à jour traductions i18n FR/DE/IT/EN

## Important Notes

### 🎯 Objectifs Priorité 2

#### 1. Standardisation Routing Analytics
**Problème actuel:**
- Routes analytics dispersées: `/instructors/analytics`, `/vehicles/analytics`, `/exams/analytics`, `/financial/analytics`
- Page centrale `/analytics` existe mais routes individuelles persistent
- Incohérence dans l'accès aux analytics

**Solution:**
- ✅ Garder page centrale `/analytics` avec tabs
- ✅ Créer redirects des anciennes routes vers `/analytics?tab=X`
- ✅ Maintenir compatibilité avec liens existants

**Routes à rediriger:**
```typescript
/instructors/analytics → /analytics?tab=instructors
/vehicles/analytics → /analytics?tab=vehicles
/exams/analytics → /analytics?tab=exams
/financial/analytics → /analytics?tab=financial
/reviews/dashboard → /analytics?tab=reviews
```

#### 2. Pages Cours Théoriques Manquantes

**Fonctionnalités requises:**

**A. Liste Cours Théoriques** (`/theory-courses`)
- Stats KPIs: Total cours, Participants, Taux remplissage, Prochains cours
- Filtres: Catégorie, Statut, Date, Salle, Moniteur
- Table/Cards toggle avec:
  - Titre cours, Date/heure, Durée
  - Catégorie, Salle, Moniteur
  - Participants (X/Y), Statut
  - Actions: Voir détail, Inscrire élève, Modifier, Annuler
- Bouton "Créer cours théorique"

**B. Détail Cours Théorique** (`/theory-courses/:id`)
- Header: Titre, Date, Statut, Actions
- Tabs:
  - **Informations**: Détails cours, programme, matériel
  - **Participants**: Liste inscrits avec statut présence
  - **Waiting List**: Liste d'attente si complet
  - **Documents**: Support de cours, présentations
  - **Historique**: Modifications, communications

**C. Inscription Cours Théorique** (`/theory-courses/book`)
- Wizard 3 steps:
  1. **Sélection cours**: Liste cours disponibles avec filtres
  2. **Sélection élève(s)**: Multi-select élèves à inscrire
  3. **Confirmation**: Récapitulatif et validation

#### 3. Complétion Gestion Examens

**Fonctionnalités manquantes:**

**A. Résultats Examens** (`/exams/results`)
- Stats globales: Taux réussite, Moyenne tentatives, Évolution
- Filtres: Type examen, Période, Catégorie, Moniteur, Élève
- Table résultats avec:
  - Élève, Date examen, Type, Catégorie
  - Résultat (Réussi/Échoué), Score, Tentative #
  - Moniteur accompagnateur, Expert
  - Actions: Voir détail, Télécharger certificat
- Graphiques: Évolution taux réussite, Répartition par catégorie

**B. Calendrier Examens** (`/exams/calendar`)
- Vue calendrier mensuelle avec:
  - Examens théoriques (couleur bleue)
  - Examens pratiques (couleur verte)
  - Examens blancs (couleur orange)
- Filtres: Type, Catégorie, Statut
- Sidebar: Prochains examens, Disponibilités
- Actions: Réserver examen, Voir détail, Modifier

#### 4. Unification Nommage

**Conventions à appliquer:**

**A. Noms de pages:**
```typescript
// ✅ Bon pattern
viamentor-[entity]-[action]-page
viamentor-students-page
viamentor-student-detail-page
viamentor-theory-courses-list-page

// ❌ Mauvais pattern (à éviter)
StudentsPage
TheoryCoursesPage
```

**B. Noms de routes:**
```typescript
// ✅ Bon pattern - Pluriel pour listes
/students
/theory-courses
/exams

// ✅ Bon pattern - Singulier pour détails
/students/:id
/theory-courses/:id
/exams/:id

// ✅ Bon pattern - Actions
/theory-courses/book
/exams/book
```

**C. Noms de composants:**
```typescript
// ✅ Bon pattern
viamentor-[entity]-[type]
viamentor-students-table
viamentor-theory-course-card
viamentor-exam-calendar
```

### 📋 Structure Pages à Créer

#### Page Liste Cours Théoriques
```typescript
interface TheoryCoursesListPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// Sections:
// - Header avec breadcrumb + bouton "Créer cours"
// - Stats KPIs (4 cards)
// - Filtres (catégorie, statut, date, salle, moniteur)
// - Toggle Table/Cards view
// - DataTable ou Grid avec cours
// - Pagination
```

#### Page Détail Cours Théorique
```typescript
interface TheoryCourseDetailPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// Sections:
// - Header avec titre, date, statut, actions
// - Tabs navigation (5 tabs)
// - Tab Informations: Détails + Programme
// - Tab Participants: Table inscrits
// - Tab Waiting List: Table attente
// - Tab Documents: Liste documents
// - Tab Historique: Timeline
```

#### Page Inscription Cours Théorique
```typescript
interface TheoryCourseBookPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// Wizard 3 steps:
// - Step 1: Sélection cours (cards avec filtres)
// - Step 2: Sélection élèves (multi-select)
// - Step 3: Confirmation (récapitulatif)
```

#### Page Résultats Examens
```typescript
interface ExamsResultsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// Sections:
// - Header avec breadcrumb
// - Stats KPIs (4 cards)
// - Filtres avancés
// - Graphiques (line chart + bar chart)
// - DataTable résultats
// - Export Excel/PDF
```

#### Page Calendrier Examens
```typescript
interface ExamsCalendarPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// Sections:
// - Header avec breadcrumb + boutons actions
// - Filtres (type, catégorie, statut)
// - Calendrier mensuel (react-big-calendar style)
// - Sidebar: Prochains examens + Disponibilités
// - Dialog détail examen au clic
```

### 🎨 Design System Compliance

**Toutes les pages doivent respecter:**
- ✅ Responsive: Mobile-first avec breakpoints sm/lg
- ✅ Hero UI: Cards, Tables, Badges, Buttons conformes
- ✅ i18n ready: Structure traductions FR/DE/IT/EN
- ✅ Touch-friendly: Hauteurs min 44px, gaps cohérents
- ✅ Semantic colors: bg-primary/10, text-muted-foreground
- ✅ Consistent spacing: p-4 sm:p-6 lg:p-8, gap-6
- ✅ Search & Filters: Input avec SearchIcon, Selects
- ✅ Stats & KPIs: Cards avec icônes et trends
- ✅ Tables: Headers, sorting, actions

### 🔄 Ordre d'Implémentation

**Phase 2 - Pages Cours Théoriques (3 pages)**
1. Liste cours théoriques (priorité haute)
2. Détail cours théorique (priorité haute)
3. Inscription cours théorique (priorité moyenne)

**Phase 3 - Complétion Examens (2 pages)**
1. Résultats examens (priorité haute)
2. Calendrier examens (priorité haute)

**Phase 4 - Unification Nommage**
1. Documenter conventions
2. Appliquer progressivement

## Plan Information
*Created at iteration 254*

  
## Plan Information
*This plan is created when the project is at iteration 254, and date 2025-10-19T23:19:03.995Z*
