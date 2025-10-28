# Migration State Management Viamentor

## User Request
Commencer Phase 1 & 2 du plan de migration state management:
- **CRITICAL (1 semaine)**: Setup infrastructure TanStack Query + Zustand + Migration server data
- **HIGH (après migration)**: Implémenter Optimistic Updates et Undo/Redo
- **MEDIUM**: Créer documentation et formation équipe

## Related Files

### Phase 1 - Setup Infrastructure (2 jours)
- @/viamentor/data/viamentor-query-provider (to update) - Provider TanStack Query existant
- @/viamentor/data/viamentor-user-store (to view) - Store Zustand existant pour user
- @/viamentor/data/viamentor-theme-store (to view) - Store Zustand existant pour theme
- @/viamentor/data/viamentor-locale-store (to view) - Store Zustand existant pour locale
- @/viamentor/data/viamentor-query-hooks (to update) - Hooks TanStack Query existants
- @/viamentor/stores/auth-store (to create) - Nouveau store Zustand centralisé auth
- @/viamentor/stores/ui-store (to create) - Nouveau store Zustand centralisé UI
- @/viamentor/hooks/use-students (to create) - Hooks TanStack Query students
- @/viamentor/hooks/use-instructors (to create) - Hooks TanStack Query instructors
- @/viamentor/hooks/use-lessons (to create) - Hooks TanStack Query lessons
- @/viamentor/hooks/use-invoices (to create) - Hooks TanStack Query invoices

### Phase 2 - Migration Server Data (1 semaine)
- @/viamentor/pages/viamentor-students-page (to edit) - Migrer useState vers useStudents
- @/viamentor/pages/viamentor-instructors-page (to edit) - Migrer useState vers useInstructors
- @/viamentor/pages/viamentor-invoices-list-page (to edit) - Migrer useState vers useInvoices
- @/viamentor/pages/viamentor-planning-page (to edit) - Migrer useState vers useLessons
- @/viamentor/pages/viamentor-student-detail-page (to edit) - Migrer useState vers useStudent
- @/viamentor/pages/viamentor-instructor-detail-page (to edit) - Migrer useState vers useInstructor

### Documentation
- @/viamentor/data/viamentor-state-management-audit (to view) - Plan complet migration
- @/viamentor/data/viamentor-architecture-06-best-practices (to update) - Ajouter section migration
- @/viamentor/docs/state-management-guide (to create) - Guide développeurs

## TODO List

### Phase 1 - Setup Infrastructure (2 jours)
- [x] **1.1** Configurer TanStack Query globalement avec DevTools
- [x] **1.2** Créer stores Zustand centralisés (auth-store, ui-store)
- [x] **1.3** Créer hooks TanStack Query réutilisables (students, instructors, lessons, invoices)
- [ ] **1.4** Créer API client centralisé avec error handling
- [ ] **1.5** Tester infrastructure avec page exemple

### Phase 2 - Migration Server Data (1 semaine)
- [ ] **2.1** Identifier tous les useState avec server data (grep search)
- [ ] **2.2** Migrer pages principales (students, instructors, invoices, planning)
- [ ] **2.3** Migrer pages détails (student-detail, instructor-detail)
- [ ] **2.4** Migrer mutations (create, update, delete)
- [ ] **2.5** Tester toutes les pages migrées
- [ ] **2.6** Supprimer code obsolète (useState server data)

### Phase 3 - Optimistic Updates & Undo/Redo (HIGH - après migration)
- [ ] **3.1** Implémenter optimistic updates pour mutations
- [ ] **3.2** Implémenter Undo/Redo avec toast 5s
- [ ] **3.3** Tester UX instantané

### Documentation (MEDIUM)
- [x] **4.1** Créer guide state management développeurs
- [x] **4.2** Créer exemples code pour chaque cas d'usage
- [ ] **4.3** Formation équipe développement
- [ ] **4.4** Code review guidelines
- [ ] **4.5** ESLint rules pour state management

## Important Notes

### ⚠️ PLAN ARCHIVÉ - Migration Annulée
**Date**: 2025-10-18
**Raison**: L'utilisateur a décidé de ne pas procéder à la migration du state management.

**Fichiers créés conservés comme référence**:
- `@/viamentor/data/viamentor-auth-store-unified` - Exemple store Zustand auth
- `@/viamentor/data/viamentor-ui-store-unified` - Exemple store Zustand UI
- `@/viamentor/data/viamentor-use-students-query` - Exemple hooks TanStack Query
- `@/viamentor/data/viamentor-state-management-migration-guide` - Guide migration

Ces fichiers restent disponibles pour consultation future mais ne seront pas intégrés au projet.

### Stratégie Unifiée
- **Server State** → TanStack Query UNIQUEMENT (students, lessons, invoices, etc.)
- **Global Client State** → Zustand UNIQUEMENT (user, theme, locale, sidebar)
- **Local UI State** → useState UNIQUEMENT (modal open, hover, form temporaire)
- **URL State** → Query Params (filters, pagination, sorting)
- **Form State** → React Hook Form + Zod
- **Providers** → Context API (QueryClientProvider, TooltipProvider)

### Problème Actuel
- **Fragmentation**: 4 systèmes coexistent (useState 80%, TanStack Query 5%, Zustand 10%, Context API 5%)
- **Impact**: Confusion, duplication, bugs synchronisation, complexité accrue
- **Score**: 6.5/10 (SEVERITY: HIGH)

### Bénéfices Attendus
- Cohérence totale dans le code
- Onboarding développeurs plus rapide
- Moins de bugs de synchronisation
- Performance améliorée (cache, optimistic updates)
- Code plus maintenable
- Tests plus faciles

### Métriques de Succès
| Métrique | Actuel | Cible | Amélioration |
|----------|--------|-------|--------------|
| TanStack Query usage | 5% | 100% (server data) | 20x |
| Zustand usage | 10% | 100% (global state) | 10x |
| Context API usage | 5% | 0% (providers only) | -100% |
| Consistency | 3/10 | 10/10 | +233% |
| Maintainability | 4/10 | 9/10 | +125% |
| Performance | 6/10 | 9/10 | +50% |

### Priorités
1. **CRITICAL (1 semaine)**: Phase 1 & 2 - Setup + Migration server data
2. **HIGH (après migration)**: Phase 3 - Optimistic Updates + Undo/Redo
3. **MEDIUM (2 jours)**: Phase 4 - Documentation + Formation

  
## Plan Information
*This plan is created when the project is at iteration 220, and date 2025-10-18T12:24:36.471Z*
