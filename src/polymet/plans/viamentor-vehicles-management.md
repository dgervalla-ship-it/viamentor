# Plan: Module Gestion Véhicules ViaMenutor

## User Request
Créer le module complet de gestion des véhicules pour School Admin avec:
- DataTable optimisée avec colonnes triables et pagination 25/page
- Filtres avancés (catégorie, marque, statut, conformité OAC, kilométrage, révision)
- Stats cards (Total, Disponibles, En leçon, Maintenance)
- Bulk actions (maintenance, export, changement statut, désactivation)
- Statistiques d'utilisation avec charts Recharts
- Conformité OAC Art. 65-68 (révision, assurance, expertise)
- Toggle view Table/Cards
- i18n FR/DE/IT/EN
- Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-vehicles-data (to create) - Mock data véhicules avec types complets
- @/polymet/data/viamentor-vehicles-i18n (to create) - Traductions FR/DE/IT/EN
- @/polymet/components/viamentor-vehicles-stats-cards (to create) - Stats cards KPIs
- @/polymet/components/viamentor-vehicles-filters (to create) - Filtres avancés panel
- @/polymet/components/viamentor-vehicles-table (to create) - DataTable véhicules
- @/polymet/components/viamentor-vehicles-grid-view (to create) - Cards view alternative
- @/polymet/components/viamentor-vehicles-bulk-actions (to create) - Bulk actions bar
- @/polymet/components/viamentor-vehicles-utilization-stats (to create) - Stats utilisation + charts
- @/polymet/pages/viamentor-vehicles-page (to create) - Page principale assemblage
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route /vehicles

## TODO List
- [x] Créer data/viamentor-vehicles-data avec types et mock data
- [x] Créer data/viamentor-vehicles-i18n avec traductions complètes
- [x] Créer components/viamentor-vehicles-stats-cards
- [x] Créer components/viamentor-vehicles-filters
- [x] Créer components/viamentor-vehicles-table
- [x] Créer components/viamentor-vehicles-grid-view
- [x] Créer components/viamentor-vehicles-bulk-actions
- [x] Créer components/viamentor-vehicles-utilization-stats
- [x] Créer pages/viamentor-vehicles-page
- [x] Mettre à jour prototype avec route /vehicles

### Phase 2 - Améliorations et nouvelles fonctionnalités
- [x] **Tester la page** → Vérifier navigation /vehicles, fonctionnalités, responsive, i18n
- [x] **Wizard création véhicule** → Dialog multi-steps (Infos/Équipements/Assurances/Récapitulatif), validation OAC Art. 65-68, upload photos
- [x] **Page détail véhicule** → Header Hero UI, tabs (Historique/GPS/Coûts/Carburant/Analytics), édition inline
- [x] **Planning véhicule** → Calendar view leçons assignées, disponibilités, conflits horaires ✅
- [ ] **Gestion maintenance** → Historique interventions, planification, coûts tracking, rappels automatiques
- [x] **Documents véhicule** → File manager (Carte grise/Assurance/Expertise/Factures), upload, preview, expiration alerts ✅
- [x] **Améliorations UI** → Ajustements design, animations, micro-interactions, accessibility ✅

## Important Notes
- **Phase 1 COMPLETED** ✅: Module base fonctionnel avec DataTable, filtres, stats, bulk actions, charts
- **Route active**: /vehicles accessible dans prototype
- **Conformité OAC Art. 65-68**: révision périodique, assurance valide, expertise technique
- **Countdown badges**: >30j vert, 15-30j orange, <15j rouge, expiré rouge foncé
- **Alert critical**: assurance/expertise expirée = usage interdit
- **Kilométrage >200'000 km**: alerte contrôle recommandé
- **Bulk actions**: cascade cancel future lessons si désactivation véhicule
- **Stats utilisation**: heures, km/jour, coût maintenance, taux disponibilité
- **Charts Recharts**: BarChart top véhicules, LineChart km évolution, PieChart types leçons
- **Clean Code**: 200-250 lignes max par fichier

### Phase 2 - Nouvelles fonctionnalités à implémenter
- **Wizard création**: Multi-steps avec validation OAC, upload photos, documents obligatoires
- **Page détail**: Architecture similaire student-detail/instructor-detail avec tabs et édition inline
- **Planning intégré**: Sync avec module Planning, affichage leçons assignées, gestion conflits
- **Maintenance tracking**: Historique complet, coûts, rappels automatiques, KPIs maintenance
- **Documents management**: File manager avec preview, expiration tracking, notifications
- **Audit trail**: Historique modifications, incidents, changements statut avec timeline

  
## Plan Information
*This plan is created when the project is at iteration 42, and date 2025-10-14T18:39:07.791Z*
