# Optimisation Gestion d'État Viamentor

## User Request
Optimiser la gestion d'état de 18 pages critiques avec:
- Zustand pour l'état global (UI, filtres, sélections)
- TanStack Query pour les données serveur (cache, invalidation)
- Optimisation des re-renders (memoization)
- Normalisation des données (éviter duplication)

## Related Files

### Pages à optimiser (18)
- @/polymet/pages/viamentor-students-page (to optimize) - Liste élèves
- @/polymet/pages/viamentor-instructors-page (to optimize) - Liste moniteurs
- @/polymet/pages/viamentor-vehicles-page (to optimize) - Liste véhicules
- @/polymet/pages/viamentor-lessons-list-page (to optimize) - Liste leçons
- @/polymet/pages/viamentor-exams-list-page (to optimize) - Liste examens
- @/polymet/pages/viamentor-theory-courses-list-page (to optimize) - Liste cours théoriques
- @/polymet/pages/viamentor-invoices-list-page (to optimize) - Liste factures
- @/polymet/pages/viamentor-group-lessons-page (to optimize) - Cours collectifs
- @/polymet/pages/viamentor-rooms-management-page (to optimize) - Gestion salles
- @/polymet/pages/viamentor-global-users-page (to optimize) - Utilisateurs globaux
- @/polymet/pages/viamentor-tenants-page (to optimize) - Liste tenants
- @/polymet/pages/viamentor-tenant-detail-page (to optimize) - Détail tenant
- @/polymet/pages/viamentor-admin-roles-page (to optimize) - Gestion rôles
- @/polymet/pages/viamentor-feature-flags-page (to optimize) - Feature flags
- @/polymet/pages/viamentor-staff-management-page (to optimize) - Gestion staff
- @/polymet/pages/viamentor-instructor-manager-page (to optimize) - Dashboard instructor manager
- @/polymet/pages/viamentor-school-admin-page (to optimize) - Dashboard school admin
- @/polymet/pages/viamentor-platform-admin-page (to optimize) - Dashboard platform admin

### Stores Zustand à créer
- @/polymet/data/viamentor-students-store (to create) - État UI élèves
- @/polymet/data/viamentor-instructors-store (to create) - État UI moniteurs
- @/polymet/data/viamentor-vehicles-store (to create) - État UI véhicules
- @/polymet/data/viamentor-lessons-store (to create) - État UI leçons
- @/polymet/data/viamentor-invoices-store (to create) - État UI factures
- @/polymet/data/viamentor-tenants-store (to create) - État UI tenants
- @/polymet/data/viamentor-admin-store (to create) - État UI admin global

### Hooks TanStack Query à créer
- @/polymet/data/viamentor-use-students-query (to create) - Queries élèves
- @/polymet/data/viamentor-use-instructors-query (to create) - Queries moniteurs
- @/polymet/data/viamentor-use-vehicles-query (to create) - Queries véhicules
- @/polymet/data/viamentor-use-lessons-query (to create) - Queries leçons
- @/polymet/data/viamentor-use-invoices-query (to create) - Queries factures
- @/polymet/data/viamentor-use-tenants-query (to create) - Queries tenants

### Fichiers existants
- @/polymet/data/viamentor-query-provider (exists) - Provider TanStack Query
- @/polymet/data/viamentor-performance-optimization-guide (to update) - Ajouter section state management

## TODO List

### Phase 1: Stores Zustand (État UI)
- [x] Créer viamentor-students-store (filtres, sélection, view mode) ✅
- [x] Créer viamentor-instructors-store (filtres, sélection, view mode) ✅
- [ ] Créer viamentor-vehicles-store (filtres, sélection, view mode)
- [x] Créer viamentor-instructor-lessons-store (filtres, sélection, view mode) ✅
- [x] Créer viamentor-instructor-students-store (filtres, sélection, view mode) ✅
- [ ] Créer viamentor-invoices-store (filtres, sélection, view mode)
- [x] Créer viamentor-tenants-store (filtres, sélection, view mode) ✅
- [x] Créer viamentor-settings-store (navigation sections, dirty state) ✅
- [x] Créer viamentor-admin-analytics-store (filtres analytics) ✅
- [x] Créer use-analytics-query (KPIs, métriques, rapports) ✅

### Phase 2: Hooks TanStack Query (Données serveur)
- [x] Créer use-students-query (list, detail, mutations) ✅
- [x] Créer use-instructors-query (list, detail, mutations) ✅
- [ ] Créer use-vehicles-query (list, detail, mutations)
- [x] Créer use-lessons-query (list, detail, mutations) ✅
- [x] Créer use-instructor-students-query (list, detail, mutations) ✅
- [ ] Créer use-invoices-query (list, detail, mutations)
- [x] Créer use-tenants-query (list, detail, mutations) ✅
- [x] Créer use-settings-query (school, pricing, notifications) ✅

### Phase 3: Migration Pages (18 pages)
- [x] Migrer students-page (Zustand + TanStack Query) ✅ Déjà fait
- [x] Migrer instructors-page (Zustand + TanStack Query) ✅
- [ ] Migrer vehicles-page (Zustand + TanStack Query) 🔄 EN COURS
- [ ] Migrer lessons-list-page (Zustand + TanStack Query)
- [ ] Migrer exams-list-page (Zustand + TanStack Query)
- [ ] Migrer theory-courses-list-page (Zustand + TanStack Query)
- [ ] Migrer invoices-list-page (Zustand + TanStack Query)
- [ ] Migrer group-lessons-page (Zustand + TanStack Query)
- [ ] Migrer rooms-management-page (Zustand + TanStack Query)
- [ ] Migrer global-users-page (Zustand + TanStack Query)
- [ ] Migrer tenants-page (Zustand + TanStack Query)
- [ ] Migrer tenant-detail-page (Zustand + TanStack Query)
- [ ] Migrer admin-roles-page (Zustand + TanStack Query)
- [ ] Migrer feature-flags-page (Zustand + TanStack Query)
- [ ] Migrer staff-management-page (Zustand + TanStack Query)
- [ ] Migrer instructor-manager-page (Zustand + TanStack Query)
- [ ] Migrer school-admin-page (Zustand + TanStack Query)
- [ ] Migrer platform-admin-page (Zustand + TanStack Query)

### Phase 4: Documentation
- [ ] Mettre à jour performance-optimization-guide avec patterns state management
- [ ] Créer viamentor-state-management-guide complet
- [ ] Documenter patterns Zustand + TanStack Query

## Important Notes

### Architecture State Management
**Séparation claire des responsabilités**:
- **Zustand**: État UI éphémère (filtres, sélections, view mode, dialogs)
- **TanStack Query**: Données serveur (cache, invalidation, optimistic updates)
- **Ne pas dupliquer**: Les données serveur restent dans TanStack Query cache

### Patterns Zustand Store
```typescript
// Structure type d'un store Zustand
interface StudentsStore {
  // UI State
  viewMode: 'table' | 'grid';
  selectedIds: string[];
  filters: StudentsFilters;
  
  // Actions
  setViewMode: (mode: 'table' | 'grid') => void;
  toggleSelection: (id: string) => void;
  setFilters: (filters: Partial<StudentsFilters>) => void;
  resetFilters: () => void;
}
```

### Patterns TanStack Query Hook
```typescript
// Structure type d'un hook TanStack Query
export function useStudentsQuery() {
  // List query avec cache
  const list = useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
    staleTime: 5 * 60 * 1000, // 5min
  });
  
  // Mutations avec invalidation
  const create = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
  });
  
  return { list, create, update, delete };
}
```

### Optimisation Re-renders
- Utiliser `React.memo` pour composants purs
- Utiliser `useMemo` pour calculs coûteux
- Utiliser `useCallback` pour event handlers
- Sélecteurs Zustand pour éviter re-renders inutiles

### Normalisation Données
- Éviter duplication données entre stores
- Utiliser TanStack Query comme source de vérité
- Normaliser relations (IDs au lieu d'objets complets)

  
## Plan Information
*This plan is created when the project is at iteration 303, and date 2025-10-22T12:11:35.862Z*
