# Page Détail Moniteur Viamentor

## User Request
Créer page détail moniteur complète avec header Hero UI, tabs navigation (Informations/Planning/Élèves assignés/Performance), édition inline, charts performance, Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-instructors-data (to view) - Mock data moniteurs existant
- @/viamentor/data/viamentor-instructors-i18n (to update) - Ajouter traductions détail
- @/viamentor/data/viamentor-instructor-detail-data (to create) - Mock data détail moniteur
- @/viamentor/data/viamentor-instructor-detail-i18n (to create) - Traductions détail
- @/viamentor/components/viamentor-instructor-detail-header (to create) - Header Hero UI
- @/viamentor/components/viamentor-instructor-informations-tab (to create) - Tab Informations
- @/viamentor/components/viamentor-instructor-planning-tab (to create) - Tab Planning
- @/viamentor/components/viamentor-instructor-students-tab (to create) - Tab Élèves
- @/viamentor/components/viamentor-instructor-performance-tab (to create) - Tab Performance
- @/viamentor/pages/viamentor-instructor-detail-page (to create) - Page principale
- @/viamentor/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Créer mock data détail moniteur avec types complets
- [x] Créer traductions i18n détail moniteur
- [x] Créer composant Header avec avatar, badges, actions
- [x] Créer Tab Informations avec édition inline
- [x] Créer Tab Planning avec calendar et charts
- [x] Créer Tab Élèves assignés avec table et stats
- [x] Créer Tab Performance avec KPIs et charts
- [x] Créer page principale avec tabs navigation
- [x] Ajouter route dans prototype

## Important Notes
- **Hero UI**: Avatar 120x120, badges habilitations, status WebSocket temps réel
- **Édition inline**: Click-to-edit fields avec validation
- **Charts**: Recharts LineChart/BarChart/PieChart pour performance
- **Calendar**: React Big Calendar Month/Week/Day views
- **i18n**: FR/DE/IT/EN avec formats dates/montants
- **Clean Code**: 200-250 lignes max par fichier
- **WebSocket**: Status disponibilité temps réel avec badge pulse
- **Validation**: Inline errors + success toasts

  
## Plan Information
*This plan is created when the project is at iteration 27, and date 2025-10-14T11:23:19.272Z*
