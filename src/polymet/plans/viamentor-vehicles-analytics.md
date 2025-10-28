# Module Vehicles Analytics Viamentor

## User Request
Créer le module complet d'analytics véhicules avec:
- Header stats cards (Total véhicules, Km parcourus, Heures utilisation, Coûts maintenance)
- Fleet Utilization: DataTable + BarChart horizontal + Heatmap
- Costs Analysis: PieChart breakdown + Table détail + LineChart évolution + Top 5 coûteux
- Maintenance Tracking: Table interventions + BarChart par type + Alertes échéances
- Fuel Consumption: Consommation moyenne + Table véhicules + LineChart trends
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-vehicles-analytics-data (to create) - Mock data et types
- @/polymet/data/viamentor-vehicles-analytics-i18n (to create) - Traductions i18n
- @/polymet/components/viamentor-vehicles-analytics-header (to create) - Header stats cards
- @/polymet/components/viamentor-fleet-utilization-section (to create) - Utilisation flotte
- @/polymet/components/viamentor-costs-analysis-section (to create) - Analyse coûts
- @/polymet/components/viamentor-maintenance-tracking-section (to create) - Suivi maintenance
- @/polymet/components/viamentor-fuel-consumption-section (to create) - Consommation carburant
- @/polymet/pages/viamentor-vehicles-analytics-page (to create) - Page principale
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Créer data/viamentor-vehicles-analytics-data avec types complets
- [x] Créer data/viamentor-vehicles-analytics-i18n avec traductions FR/DE/IT/EN
- [x] Créer components/viamentor-vehicles-analytics-header avec stats cards
- [x] Créer components/viamentor-fleet-utilization-section avec DataTable + Charts
- [x] Créer components/viamentor-costs-analysis-section avec PieChart + LineChart
- [x] Créer components/viamentor-maintenance-tracking-section avec Table + Alertes
- [x] Créer components/viamentor-fuel-consumption-section avec consommation
- [x] Créer pages/viamentor-vehicles-analytics-page avec Tabs navigation
- [x] Ajouter route /vehicles/analytics au prototype

## Important Notes
- Clean Code: 200-250 lignes max par fichier
- Hero UI: Cards, Badges, Progress bars, Recharts
- i18n: FR/DE/IT/EN complet
- Recharts: BarChart horizontal, PieChart, LineChart, Heatmap
- Alertes: Véhicules inactifs >7j, maintenance due <30j
- ROI: (revenue-costs)/costs avec badges color
- Taux occupation: Target 70% avec Progress bar

  
## Plan Information
*This plan is created when the project is at iteration 63, and date 2025-10-14T21:45:57.110Z*
