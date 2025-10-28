# Page Détail Véhicule Viamentor

## User Request
Créer page détail véhicule complète avec tabs: Historique audit trail, GPS tracking optionnel avec maps, Gestion coûts et carburant, Analytics utilisation, exports PDF, Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier.

## Related Files
- @/polymet/data/viamentor-vehicles-data (to view) - Mock data véhicules existant
- @/polymet/data/viamentor-vehicles-i18n (to view) - Traductions véhicules
- @/polymet/data/viamentor-vehicle-detail-data (to create) - Mock data détail véhicule
- @/polymet/data/viamentor-vehicle-detail-i18n (to create) - Traductions détail véhicule
- @/polymet/components/viamentor-vehicle-detail-header (to create) - Header Hero UI
- @/polymet/components/viamentor-vehicle-history-tab (to create) - Tab Historique audit
- @/polymet/components/viamentor-vehicle-gps-tracking (to create) - GPS tracking & maps
- @/polymet/components/viamentor-vehicle-costs-management (to create) - Gestion coûts
- @/polymet/components/viamentor-vehicle-fuel-tracking (to create) - Suivi carburant
- @/polymet/components/viamentor-vehicle-utilization-analytics (to create) - Analytics utilisation
- @/polymet/pages/viamentor-vehicle-detail-page (to create) - Page principale
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Créer mock data détail véhicule avec historique, GPS, coûts, carburant
- [x] Créer traductions i18n complètes FR/DE/IT/EN
- [x] Créer header Hero UI avec photo, specs, badges, actions
- [x] Créer tab Historique avec timeline audit trail et JSON diff
- [x] Créer composant GPS tracking avec maps et trajets
- [x] Créer gestion coûts avec stats, table, charts
- [x] Créer suivi carburant avec consommation L/100km - Ajout quittance et mode de paiement
- [x] Créer analytics utilisation avec heatmap et recommandations
- [x] Créer page principale avec tabs navigation
- [x] Ajouter route dans prototype

## Important Notes
- **Tab Historique**: Timeline audit trail avec expand JSON diff, filters date/user/action, export CSV
- **GPS Tracking**: Mapbox/Google Maps, real-time WebSocket, trajets historique avec polyline, stats trajet, privacy RGPD 90j
- **Costs Management**: Stats cards période, DataTable dépenses, Charts Recharts (Line/Pie/Bar), export Excel/PDF
- **Fuel Tracking**: Form quick add plein, calcul L/100km automatique, history table, stats consommation
- **Utilization Analytics**: Heatmap jours×heures, top moniteurs/élèves, jours inactivité Alert, recommandations
- **Export PDF**: Dossier complet véhicule avec cover, specs, documents, conformité, maintenance, coûts, utilisation
- **i18n**: Actions templates traduits, GPS labels, catégories coûts nomenclature, charts axes, reports multilangues
- **Clean Code**: 200-250 lignes par fichier, separation of concerns, Hero UI components

  
## Plan Information
*This plan is created when the project is at iteration 50, and date 2025-10-14T20:15:00.000Z*

  
## Plan Information
*This plan is created when the project is at iteration 51, and date 2025-10-14T20:11:41.745Z*
