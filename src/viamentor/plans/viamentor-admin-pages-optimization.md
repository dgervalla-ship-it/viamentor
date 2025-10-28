# Optimisation Pages Admin Viamentor

## User Request
Optimiser les 20 pages admin avec architecture moderne utilisant Zustand stores et TanStack Query hooks pour améliorer les performances, la maintenabilité et l'UX.

## Related Files
- @/viamentor/data/viamentor-instructor-students-store (to view) - Pattern de référence
- @/viamentor/pages/viamentor-school-admin-page (to update)
- @/viamentor/pages/viamentor-school-settings-page (to update)
- @/viamentor/pages/viamentor-settings-central-page (to update)
- @/viamentor/pages/viamentor-pricing-settings-page (to update)
- @/viamentor/pages/viamentor-pricing-management-page (to update)
- @/viamentor/pages/viamentor-categories-settings-page (to update)
- @/viamentor/pages/viamentor-course-types-settings-page (to update)
- @/viamentor/pages/viamentor-business-hours-settings-page (to update)
- @/viamentor/pages/viamentor-makeups-settings-page (to update)
- @/viamentor/pages/viamentor-notifications-settings-page (to update)
- @/viamentor/pages/viamentor-reviews-settings-page (to update)
- @/viamentor/pages/viamentor-reviews-verification-page (to update)
- @/viamentor/pages/viamentor-staff-management-page (to update)
- @/viamentor/pages/viamentor-staff-campaigns-page (to update)
- @/viamentor/pages/viamentor-staff-messages-page (to update)
- @/viamentor/pages/viamentor-staff-planning-page (to update)
- @/viamentor/pages/viamentor-staff-prospects-page (to update)
- @/viamentor/pages/viamentor-staff-tasks-page (to update)
- @/viamentor/pages/viamentor-secretary-dashboard-page (to update)
- @/viamentor/pages/viamentor-secretary-calendar-page (to update)

## TODO List

### Phase 1: Infrastructure State Management (Stores Zustand) ✅ COMPLÉTÉ
- [x] Créer `viamentor-admin-ui-store` - État UI global admin (sidebar, preferences, theme) ✅
- [x] Créer `viamentor-settings-store` - État settings (tabs actifs, modifications non sauvegardées) ✅
- [x] Créer `viamentor-admin-analytics-store` - État analytics admin (filtres, charts, exports, cache) ✅
- [x] Créer `viamentor-tenants-store` - État tenants Platform Admin (filtres, tri, sélection, modals) ✅
- [x] Créer `viamentor-system-monitoring-store` - État monitoring Super Admin (health, alertes, logs, métriques) ✅

### Phase 2: Data Fetching (TanStack Query Hooks)
- [ ] Créer `viamentor-use-school-settings-query` - Settings école (GET/PUT)
- [ ] Créer `viamentor-use-pricing-query` - Tarification (GET/PUT/POST/DELETE)
- [ ] Créer `viamentor-use-categories-query` - Catégories permis (GET/PUT)
- [ ] Créer `viamentor-use-course-types-query` - Types cours (GET/POST/PUT/DELETE)
- [ ] Créer `viamentor-use-business-hours-query` - Horaires (GET/PUT)
- [ ] Créer `viamentor-use-makeups-config-query` - Config rattrapages (GET/PUT)
- [ ] Créer `viamentor-use-notifications-query` - Notifications (GET/PUT)
- [ ] Créer `viamentor-use-reviews-query` - Avis Google (GET/PUT/POST)
- [ ] Créer `viamentor-use-staff-query` - Staff management (GET/POST/PUT/DELETE)
- [ ] Créer `viamentor-use-campaigns-query` - Campagnes marketing (GET/POST/PUT/DELETE)

### Phase 3: Migration Pages Settings (7 pages)
- [ ] Migrer `viamentor-school-settings-page` - Utiliser settings-store + query hooks
- [ ] Migrer `viamentor-settings-central-page` - Navigation centralisée settings
- [ ] Migrer `viamentor-pricing-settings-page` - Utiliser pricing-query
- [ ] Migrer `viamentor-categories-settings-page` - Utiliser categories-query
- [ ] Migrer `viamentor-course-types-settings-page` - Utiliser course-types-query
- [ ] Migrer `viamentor-business-hours-settings-page` - Utiliser business-hours-query
- [ ] Migrer `viamentor-notifications-settings-page` - Utiliser notifications-query

### Phase 4: Migration Pages Management (6 pages)
- [ ] Migrer `viamentor-pricing-management-page` - Utiliser pricing-query + store
- [ ] Migrer `viamentor-makeups-settings-page` - Utiliser makeups-config-query
- [ ] Migrer `viamentor-reviews-settings-page` - Utiliser reviews-query + store
- [ ] Migrer `viamentor-reviews-verification-page` - Utiliser reviews-query + store
- [ ] Migrer `viamentor-staff-management-page` - Utiliser staff-query + ui-store
- [ ] Migrer `viamentor-staff-campaigns-page` - Utiliser campaigns-query + store

### Phase 5: Migration Pages Staff (4 pages)
- [ ] Migrer `viamentor-staff-messages-page` - Utiliser staff-ui-store
- [ ] Migrer `viamentor-staff-planning-page` - Utiliser staff-ui-store + planning-query
- [ ] Migrer `viamentor-staff-prospects-page` - Utiliser staff-ui-store + prospects-query
- [ ] Migrer `viamentor-staff-tasks-page` - Utiliser staff-ui-store + tasks-query

### Phase 6: Migration Pages Dashboard (3 pages)
- [ ] Migrer `viamentor-school-admin-page` - Utiliser admin-ui-store + dashboard-query
- [ ] Migrer `viamentor-secretary-dashboard-page` - Utiliser admin-ui-store
- [ ] Migrer `viamentor-secretary-calendar-page` - Utiliser planning-query

### Phase 7: Optimisations Finales
- [ ] Ajouter lazy loading pour composants lourds (charts, tables)
- [ ] Implémenter cache strategies TanStack Query (staleTime, cacheTime)
- [ ] Ajouter optimistic updates pour mutations fréquentes
- [ ] Créer guide d'optimisation admin pages

## Important Notes

### Pattern Architecture (Référence: instructor-students-store)
```typescript
// ✅ Séparation claire des responsabilités
// UI State → Zustand Store (filtres, view mode, sélections)
// Server Data → TanStack Query (fetch, mutations, cache)
// Persistence → localStorage via Zustand persist

// Store Zustand - UI State uniquement
export const useAdminUIStore = create(
  persist(
    (set, get) => ({
      // View preferences
      sidebarCollapsed: false,
      activeSection: "general",
      
      // Filters (non-persisted)
      filters: {},
      
      // Actions
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
      setActiveSection: (section) => set({ activeSection: section }),
    }),
    {
      name: "viamentor-admin-ui-store",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeSection: state.activeSection,
      }),
    }
  )
);

// TanStack Query Hook - Server Data
export const useSchoolSettingsQuery = () => {
  return useQuery({
    queryKey: ["school-settings"],
    queryFn: fetchSchoolSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Bénéfices Attendus
- **70% moins de re-renders** (sélecteurs optimisés Zustand)
- **Cache intelligent** (TanStack Query automatic caching)
- **Persistence état** (filtres, preferences sauvegardés)
- **Code maintenable** (séparation UI state vs server data)
- **UX cohérente** (état partagé entre pages admin)

### Priorités Migration
1. **Settings pages** (haute fréquence utilisation)
2. **Management pages** (logique complexe)
3. **Staff pages** (filtres et sélections multiples)
4. **Dashboard pages** (données temps réel)

  
## Plan Information
*This plan is created when the project is at iteration 305, and date 2025-10-22T12:25:00.620Z*
