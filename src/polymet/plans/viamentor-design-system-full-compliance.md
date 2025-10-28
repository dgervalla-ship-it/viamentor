# Correction complète Design System Viamentor

## User Request
Corriger tous les composants et pages du projet Viamentor pour conformité complète avec le Design System fourni (couleurs, typographie, spacing, composants, UX patterns, accessibilité, mobile-first).

## Related Files

### Pages prioritaires à corriger
- @/polymet/pages/viamentor-dashboard-school-page (to update) - Dashboard école visible
- @/polymet/pages/viamentor-students-page (to update) - Page élèves
- @/polymet/pages/viamentor-instructors-page (to update) - Page moniteurs
- @/polymet/pages/viamentor-planning-page (to update) - Page planning
- @/polymet/pages/viamentor-vehicles-page (to update) - Page véhicules
- @/polymet/pages/viamentor-invoices-list-page (to update) - Page factures
- @/polymet/pages/viamentor-student-detail-page (to update) - Détail élève
- @/polymet/pages/viamentor-instructor-detail-page (to update) - Détail moniteur

### Composants globaux critiques
- @/polymet/components/viamentor-header (to update) - Header global
- @/polymet/components/viamentor-sidebar (to update) - Sidebar navigation
- @/polymet/components/viamentor-quick-actions-bar (to update) - Actions rapides mobile

### Composants réutilisables
- @/polymet/components/viamentor-stats-card (to update) - Cards statistiques
- @/polymet/components/viamentor-students-table (to update) - Tables élèves
- @/polymet/components/viamentor-instructors-table (to update) - Tables moniteurs
- @/polymet/components/viamentor-create-student-wizard (to update) - Wizards
- @/polymet/components/viamentor-create-instructor-wizard (to update) - Wizards

### Layout
- @/polymet/layouts/viamentor-main-layout (to update) - Layout principal

## TODO List

### Phase 1: Composants globaux critiques ✅ TERMINÉE
- [x] Corriger Header (breadcrumbs, search, notifications) - FAIT: touch targets 44x44px, couleurs, focus states
- [x] Corriger Sidebar (navigation, spacing, colors) - FAIT: semantic tokens, hover states, spacing optimisé
- [x] Corriger Sidebar Header (avatar, status, tooltip) - FAIT: rounded-lg, semantic colors, positioning
- [x] Corriger Quick Actions Bar (mobile, touch targets 44x44px) - FAIT: badges, buttons, overflow menu
- [x] Corriger Layout principal (responsive, spacing) - FAIT: backdrop, spacing, responsive

### Phase 2: Pages dashboards ✅ TERMINÉE
- [x] Corriger Dashboard École (cards, alerts, spacing) - FAIT: couleurs, typographie, spacing, buttons
- [x] Corriger Page Payments (erreur runtime) - FAIT: fix variable naming conflict locale/t
- [x] Corriger Dashboard Élève - FAIT: couleurs sémantiques, dark mode support
- [x] Corriger Dashboard Moniteur - FAIT: couleurs sémantiques, dark mode support
- [ ] Corriger Dashboard Super Admin

### Phase 3: Pages gestion principales ✅ TERMINÉE
- [x] Corriger Page Élèves (table, filtres, actions) - FAIT: responsive, touch targets, spacing, borders
- [x] Corriger Page Moniteurs (table, filtres, actions) - FAIT: responsive, touch targets, pagination
- [x] Corriger Page Véhicules (table, filtres, actions) - FAIT: responsive, touch targets, alerts colors
- [x] Corriger Page Planning (calendar, events) - FAIT: responsive header, view toggle, filters, stats cards, legend
- [x] Corriger Page Factures (table, filtres, actions) - FAIT: responsive header, search, view toggle, quick filters, pagination

### Phase 4: Pages détails
- [ ] Corriger Détail Élève (tabs, forms, actions)
- [ ] Corriger Détail Moniteur (tabs, forms, actions)
- [ ] Corriger Détail Véhicule (tabs, forms, actions)

### Phase 5: Composants réutilisables
- [ ] Corriger Stats Cards (colors, spacing, icons)
- [ ] Corriger Tables (responsive, actions, selection)
- [ ] Corriger Forms (validation, spacing, labels)
- [ ] Corriger Modals (animations, accessibility)
- [ ] Corriger Wizards (steps, validation, mobile)

### Phase 6: Composants spécifiques
- [ ] Corriger Calendrier Planning
- [ ] Corriger Event Cards (leçons, cours)
- [ ] Corriger Filtres (sidebar, drawer mobile)
- [ ] Corriger Bulk Actions

### Phase 7: Accessibilité & Mobile
- [ ] Vérifier touch targets 44x44px partout
- [ ] Vérifier focus visible (ring-2 ring-primary)
- [ ] Vérifier ARIA labels
- [ ] Vérifier keyboard navigation
- [ ] Vérifier responsive mobile-first

## Important Notes

### Règles Design System à appliquer

**Couleurs:**
- Primary: #3B82F6 (blue-500) - Actions principales
- Secondary: #8B5CF6 (purple-500) - Highlights
- Success: #10B981 (green-500) - Validations
- Warning: #F59E0B (amber-500) - Alertes
- Danger: #EF4444 (red-500) - Erreurs
- Gray: #6B7280 (gray-500) - Texte secondaire
- Background: #F9FAFB (gray-50)
- Surface: #FFFFFF

**Typographie:**
- H1: text-4xl font-bold tracking-tight
- H2: text-3xl font-semibold
- H3: text-2xl font-semibold
- H4: text-xl font-medium
- Body: text-base leading-relaxed
- Small: text-sm leading-relaxed
- Tiny: text-xs font-medium

**Spacing:**
- Base unit: 4px
- Scale: 1, 2, 3, 4, 6, 8, 12, 16, 24
- Cards: p-6 (24px)
- Forms: space-y-4 (16px)
- Lists: gap-3 (12px)

**Buttons:**
- Primary: bg-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90
- Secondary: border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10
- Ghost: text-gray-600 hover:bg-gray-100
- Touch target: min-h-[44px] min-w-[44px]

**Accessibility:**
- Focus: focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
- ARIA: Tous les composants interactifs
- Keyboard: Tab, Enter, ESC
- Contrast: WCAG AAA (7:1)

**Mobile-First:**
- Touch targets: 44x44px minimum
- Bottom sheet préféré aux modals
- Swipe gestures sur listes
- Pull to refresh
- Thumb zones pour actions fréquentes

### Priorités
1. **Critique**: Header, Sidebar, Dashboard École (visible actuellement)
2. **Haute**: Pages principales (élèves, moniteurs, planning)
3. **Moyenne**: Pages détails, wizards
4. **Basse**: Pages analytics, settings
  
## Plan Information
*This plan is created when the project is at iteration 246, and date 2025-10-19T13:30:06.423Z*
