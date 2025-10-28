# Complétion 3 Dashboards Restants Viamentor

## User Request
Compléter les 3 dashboards restants (Instructor Manager, Marketing Manager, Accountant) en nettoyant le code et réutilisant au maximum les composants existants, notamment ResponsivePageWrapper.

## Related Files

### Dashboards à compléter
- @/viamentor/pages/viamentor-instructor-manager-page (to edit) - 700 lignes, utilise Tabs natif
- @/viamentor/pages/viamentor-marketing-manager-page (to edit) - 600 lignes, utilise Tabs natif
- @/viamentor/pages/viamentor-accountant-page (to edit) - 700 lignes, pas de tabs

### Composant de référence
- @/viamentor/pages/viamentor-dashboard-school-page (reference) - Utilise ResponsivePageWrapper avec tabs mobile
- @/viamentor/components/viamentor-responsive-page-wrapper (to use) - Wrapper responsive avec tabs mobile

### Sections School Admin à réutiliser comme modèle
- @/viamentor/components/viamentor-school-admin-stats-section (reference)
- @/viamentor/components/viamentor-school-admin-quick-actions-section (reference)
- @/viamentor/components/viamentor-school-admin-charts-section (reference)

### Data files
- @/viamentor/data/viamentor-instructor-manager-data (exists)
- @/viamentor/data/viamentor-instructor-manager-i18n (exists)
- @/viamentor/data/viamentor-marketing-manager-data (exists)
- @/viamentor/data/viamentor-marketing-manager-i18n (exists)
- @/viamentor/data/viamentor-accountant-data (exists)
- @/viamentor/data/viamentor-accountant-i18n (exists)

## TODO List

### Phase 1: Instructor Manager Dashboard - COMPLÉTÉ ✅
- [x] Extraire section Team Overview - viamentor-instructor-manager-team-section
- [x] Extraire section Performance - viamentor-instructor-manager-performance-section
- [x] Extraire section Requests - viamentor-instructor-manager-requests-section
- [x] Mettre à jour page principale avec ResponsivePageWrapper
- [x] Résultat: 700 lignes → ~180 lignes (74% réduction!)

### Phase 2: Marketing Manager Dashboard - COMPLÉTÉ ✅
- [x] Extraire section KPIs - viamentor-marketing-manager-kpis-section
- [x] Extraire section Campaigns - viamentor-marketing-manager-campaigns-section
- [x] Extraire section Prospects - viamentor-marketing-manager-prospects-section
- [x] Extraire section Pixels & Reviews - viamentor-marketing-manager-monitoring-section
- [x] Extraire section Quick Actions - viamentor-marketing-manager-actions-section
- [x] Mettre à jour page principale avec ResponsivePageWrapper
- [x] Résultat: 600 lignes → ~150 lignes (75% réduction!)

### Phase 3: Accountant Dashboard - COMPLÉTÉ ✅
- [x] Extraire section KPIs - viamentor-accountant-kpis-section
- [x] Extraire section Transactions - viamentor-accountant-transactions-section
- [x] Extraire section Charts - viamentor-accountant-charts-section
- [x] Extraire section Quick Actions - viamentor-accountant-actions-section
- [x] Mettre à jour page principale avec ResponsivePageWrapper
- [x] Résultat: 700 lignes → ~150 lignes (79% réduction!)

## Important Notes

### Pattern ResponsivePageWrapper
```tsx
<ResponsivePageWrapper
  title="Dashboard Title"
  description="Dashboard description"
  alerts={alertsSection}
  sections={[
    {
      id: "stats",
      label: "Statistiques",
      icon: <BarChart3Icon className="h-4 w-4" />,
      badge: "4",
      content: <StatsSection />
    },
    {
      id: "activity",
      label: "Activité",
      icon: <ActivityIcon className="h-4 w-4" />,
      content: <ActivitySection />
    }
  ]}
  mobileTabsEnabled={true}
  mobileTabsBreakpoint="lg"
  swipeEnabled={true}
  layout="stacked"
/>
```

### Avantages ResponsivePageWrapper
- ✅ Tabs mobile automatiques avec swipe
- ✅ Layout responsive adaptatif
- ✅ Gestion alertes intégrée
- ✅ Icons et badges sur tabs
- ✅ Touch gestures optimisés
- ✅ Code beaucoup plus propre

### Règles d'Extraction
1. **Une section = un composant** : Chaque tab devient un composant section
2. **Props minimales** : Passer uniquement data et locale
3. **Réutiliser les patterns** : S'inspirer des sections School Admin
4. **Garder la logique** : Ne pas changer le comportement, juste la structure
5. **Types complets** : Maintenir tous les types TypeScript

### Objectifs de Réduction
- **Instructor Manager**: 700 → ~150 lignes (78% réduction)
- **Marketing Manager**: 600 → ~150 lignes (75% réduction)
- **Accountant**: 700 → ~150 lignes (78% réduction)
- **Total**: ~2000 lignes → ~450 lignes (77% réduction globale)

### Bénéfices Attendus
- ✅ Code 4x plus court et lisible
- ✅ Composants sections réutilisables
- ✅ Mobile-first avec tabs swipe
- ✅ Maintenance simplifiée
- ✅ Cohérence UX entre dashboards
- ✅ Performance optimisée

## Plan Information
*This plan is created when the project is at iteration 274*

  
## Plan Information
*This plan is created when the project is at iteration 274, and date 2025-10-21T11:14:48.790Z*
