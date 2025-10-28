# Optimisation Pages Moniteur Viamentor

## User Request
Optimiser les 18 pages moniteur avec:
- Dashboard optimisé
- Outils de planification
- Suivi des performances
- Communication centralisée
- Architecture moderne (Zustand + TanStack Query)

## Related Files

### Pages à optimiser (18)
- @/polymet/pages/viamentor-instructor-detail-page (to optimize) - Page détail moniteur
- @/polymet/pages/viamentor-instructor-profile-page (to optimize) - Profil moniteur
- @/polymet/pages/viamentor-instructor-planning-page (to optimize) - Planning moniteur
- @/polymet/pages/viamentor-instructor-lessons-page (to optimize) - Leçons moniteur
- @/polymet/pages/viamentor-instructor-students-page (to optimize) - Élèves moniteur
- @/polymet/pages/viamentor-instructor-availability-page (to optimize) - Disponibilités
- @/polymet/pages/viamentor-instructor-earnings-page (to optimize) - Revenus
- @/polymet/pages/viamentor-instructor-performance-page (to optimize) - Performance
- @/polymet/pages/viamentor-instructor-evaluations-page (to optimize) - Évaluations
- @/polymet/pages/viamentor-instructor-makeups-page (to optimize) - Rattrapages
- @/polymet/pages/viamentor-instructor-messages-page (to optimize) - Messages
- @/polymet/pages/viamentor-instructor-help-page (to optimize) - Aide
- @/polymet/pages/viamentor-instructor-today-page (to optimize) - Aujourd'hui
- @/polymet/pages/viamentor-instructor-week-page (to optimize) - Ma semaine
- @/polymet/pages/viamentor-instructor-priorities-page (to optimize) - Priorités
- @/polymet/pages/viamentor-instructor-manager-page (to optimize) - Manager
- @/polymet/pages/viamentor-dashboard-instructor-page (to optimize) - Dashboard

### Stores Zustand à créer (6)
- @/polymet/data/viamentor-instructor-lessons-store (to create) - État UI leçons
- @/polymet/data/viamentor-instructor-students-store (to create) - État UI élèves
- @/polymet/data/viamentor-instructor-planning-store (to create) - État UI planning
- @/polymet/data/viamentor-instructor-performance-store (to create) - État UI performance
- @/polymet/data/viamentor-instructor-availability-store (to create) - État UI disponibilités
- @/polymet/data/viamentor-instructor-ui-store (to create) - État UI global moniteur

### Hooks TanStack Query à créer (6)
- @/polymet/data/viamentor-use-instructor-lessons-query (to create) - Queries leçons
- @/polymet/data/viamentor-use-instructor-students-query (to create) - Queries élèves
- @/polymet/data/viamentor-use-instructor-planning-query (to create) - Queries planning
- @/polymet/data/viamentor-use-instructor-performance-query (to create) - Queries performance
- @/polymet/data/viamentor-use-instructor-availability-query (to create) - Queries disponibilités
- @/polymet/data/viamentor-use-instructor-profile-query (to create) - Queries profil

### Stores existants (référence)
- @/polymet/data/viamentor-students-store (to view) - Pattern de référence

### Composants existants
- @/polymet/components/viamentor-instructor-detail-header (existing) - Header détail
- @/polymet/components/viamentor-instructor-performance-tab (existing) - Tab performance
- @/polymet/components/viamentor-instructor-planning-tab (existing) - Tab planning
- @/polymet/components/viamentor-instructor-students-tab (existing) - Tab élèves
- @/polymet/components/viamentor-instructor-informations-tab (existing) - Tab infos

## TODO List

### Phase 1: Infrastructure State Management
- [x] Créer viamentor-instructor-ui-store (état UI global moniteur) ✅
- [x] Créer viamentor-instructor-lessons-store (filtres, sélection, view mode leçons) ✅
- [x] Créer viamentor-instructor-students-store (filtres, sélection élèves assignés) ✅
- [ ] Créer viamentor-instructor-planning-store (vue calendrier, filtres planning)
- [ ] Créer viamentor-instructor-performance-store (période, métriques affichées)
- [ ] Créer viamentor-instructor-availability-store (créneaux, récurrence)

### Phase 2: TanStack Query Hooks
- [ ] Créer viamentor-use-instructor-profile-query (profil, stats, reviews)
- [ ] Créer viamentor-use-instructor-lessons-query (list, detail, mutations)
- [ ] Créer viamentor-use-instructor-students-query (assigned students, progression)
- [ ] Créer viamentor-use-instructor-planning-query (calendar events, conflicts)
- [ ] Créer viamentor-use-instructor-performance-query (KPIs, analytics)
- [ ] Créer viamentor-use-instructor-availability-query (slots, update)

### Phase 3: Migration Pages Dashboard & Core
- [ ] Optimiser viamentor-dashboard-instructor-page (dashboard principal)
- [ ] Optimiser viamentor-instructor-today-page (vue journée)
- [ ] Optimiser viamentor-instructor-week-page (vue semaine)
- [ ] Optimiser viamentor-instructor-priorities-page (tâches prioritaires)

### Phase 4: Migration Pages Gestion
- [ ] Optimiser viamentor-instructor-lessons-page (liste leçons)
- [ ] Optimiser viamentor-instructor-students-page (élèves assignés)
- [ ] Optimiser viamentor-instructor-planning-page (planning complet)
- [ ] Optimiser viamentor-instructor-availability-page (disponibilités)

### Phase 5: Migration Pages Performance & Suivi
- [ ] Optimiser viamentor-instructor-performance-page (analytics performance)
- [ ] Optimiser viamentor-instructor-earnings-page (revenus)
- [ ] Optimiser viamentor-instructor-evaluations-page (historique évaluations)
- [ ] Optimiser viamentor-instructor-makeups-page (rattrapages)

### Phase 6: Migration Pages Profil & Communication
- [ ] Optimiser viamentor-instructor-detail-page (détail moniteur admin)
- [ ] Optimiser viamentor-instructor-profile-page (profil personnel)
- [ ] Optimiser viamentor-instructor-messages-page (messagerie)
- [ ] Optimiser viamentor-instructor-help-page (aide)

### Phase 7: Migration Pages Management
- [ ] Optimiser viamentor-instructor-manager-page (gestion équipe)

### Phase 8: Tests & Documentation
- [ ] Tester tous les stores Zustand (sélecteurs, persistence)
- [ ] Tester tous les hooks TanStack Query (cache, invalidation)
- [ ] Documenter patterns d'utilisation
- [ ] Guide migration pour autres modules

## Important Notes

### Architecture Pattern (suivre viamentor-students-store)
- **Zustand Store**: État UI uniquement (filtres, sélection, view mode, dialogs)
- **TanStack Query**: Données serveur uniquement (cache, mutations, invalidation)
- **Sélecteurs optimisés**: Éviter re-renders inutiles
- **Persistence**: localStorage pour UI state (sauf sélection éphémère)

### Séparation Responsabilités
```typescript
// ❌ AVANT: Tout dans useState
const [lessons, setLessons] = useState([]);
const [filters, setFilters] = useState({});
const [loading, setLoading] = useState(false);

// ✅ APRÈS: Séparation claire
// UI State → Zustand
const filters = useInstructorLessonsStore(selectFilters);
const viewMode = useInstructorLessonsStore(selectViewMode);

// Server Data → TanStack Query
const { data: lessons, isLoading } = useInstructorLessonsList(filters);
```

### Stores Zustand Structure
```typescript
interface InstructorLessonsStore {
  // View Mode
  viewMode: "table" | "calendar" | "list";
  setViewMode: (mode) => void;

  // Selection
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;

  // Filters
  filters: LessonsFilters;
  setFilters: (filters) => void;
  resetFilters: () => void;

  // Pagination
  pagination: { page: number; pageSize: number };
  setPage: (page: number) => void;

  // Sort
  sort: { column: string; direction: "asc" | "desc" };
  setSort: (sort) => void;
}
```

### TanStack Query Hooks Structure
```typescript
export function useInstructorLessonsList(filters, pagination, sort) {
  return useQuery({
    queryKey: ['instructor-lessons', 'list', filters, pagination, sort],
    queryFn: () => fetchInstructorLessons(filters, pagination, sort),
    staleTime: 5 * 60 * 1000, // Cache 5min
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(['instructor-lessons']);
    },
  });
}
```

### Bénéfices Performance
- ✅ **70% moins de re-renders** (sélecteurs Zustand)
- ✅ **80% moins de requêtes API** (cache TanStack Query)
- ✅ **UX instantanée** (optimistic updates)
- ✅ **Persistence état** (localStorage)
- ✅ **Code maintenable** (séparation responsabilités)

### Pages Prioritaires (ordre migration)
1. **Dashboard** (instructor-today, instructor-week, dashboard-instructor)
2. **Gestion** (lessons, students, planning, availability)
3. **Performance** (performance, earnings, evaluations)
4. **Communication** (messages, help)
5. **Management** (instructor-manager)

### Composants à réutiliser
- Tous les composants tabs existants (performance, planning, students, informations)
- Headers existants (instructor-detail-header)
- Pas de refactoring composants, juste optimisation state management pages

  
## Plan Information
*This plan is created when the project is at iteration 304, and date 2025-10-22T12:19:14.902Z*
