# Correction Globale Design System ViaMenutor

## User Request
Corriger tous les composants et pages du projet ViaMenutor pour assurer la conformité totale avec le Design System fourni (couleurs, typographie, spacing, composants, UX patterns, accessibilité, mobile-first).

## Related Files
- @/polymet/layouts/viamentor-main-layout (to view / update)
- @/polymet/components/viamentor-header (to view / update)
- @/polymet/components/viamentor-sidebar (to view / update)
- @/polymet/pages/viamentor-dashboard-school-page (to view / update)
- @/polymet/pages/viamentor-students-page (to view / update)
- @/polymet/pages/viamentor-instructors-page (to view / update)
- @/polymet/pages/viamentor-vehicles-page (to view / update)
- @/polymet/pages/viamentor-planning-page (to view / update)
- @/polymet/components/viamentor-login-form (to view / update)
- Tous les autres composants et pages du projet

## TODO List
- [x] Analyser les fichiers principaux (layout, header, sidebar)
- [x] Identifier les non-conformités avec le Design System
- [x] Créer document de référence des corrections
- [x] Corriger la page dashboard-school (couleurs, typo, spacing, touch targets, focus)
- [ ] Corriger les couleurs dans tous les composants
- [ ] Corriger la typographie dans toutes les pages
- [ ] Corriger les espacements (base 4px, padding 24px cards, etc.)
- [ ] Corriger les composants (boutons, forms, modals, tables)
- [ ] Corriger les états (loading, empty, error, success)
- [ ] Corriger l'accessibilité (ARIA, focus, keyboard nav)
- [ ] Corriger le mobile-first (touch targets 44x44px, swipe gestures)
- [ ] Vérifier toutes les pages principales
- [ ] Vérifier tous les composants réutilisables

## Important Notes
- **Design System Key Points:**
  - Primary: #3B82F6 (blue-500) - Actions principales
  - Secondary: #8B5CF6 (purple-500) - Highlights
  - Success: #10B981 (green-500)
  - Warning: #F59E0B (amber-500)
  - Danger: #EF4444 (red-500)
  - Font: Inter, H1: 36px/bold, H2: 30px/semibold, Body: 16px/normal
  - Spacing: base 4px, cards padding 24px
  - Border radius: lg (8px) pour cards
  - Touch targets: minimum 44x44px
  - Accessibilité: WCAG AAA, focus visible, keyboard nav
  
- **Priorités:**
  1. Layout principal et navigation (sidebar, header)
  2. Pages principales (dashboards, students, instructors)
  3. Composants réutilisables (forms, buttons, cards)
  4. Pages secondaires et modals

- **Corrections appliquées:**
  - ✅ Document de référence créé (@/polymet/data/viamentor-design-system-corrections)
  - ✅ Dashboard École corrigé:
    - Couleurs: orange → amber (warning), green-600 → green-500 (success)
    - Typographie: text-2xl → text-3xl pour stats, text-xs → text-sm pour descriptions
    - Spacing: gap-1 → gap-2, p-4 → p-6 pour alerts
    - Touch targets: min-h-[44px] min-w-[44px] sur tous les boutons
    - Focus visible: ring-2 ring-primary ring-offset-2 sur boutons
    - Icons: h-3 w-3 → h-4 w-4 pour meilleure visibilité
    - Actions rapides: h-20 → min-h-[88px] pour touch targets doubles
  
## Plan Information
*This plan is created when the project is at iteration 246, and date 2025-10-19T13:29:21.527Z*
