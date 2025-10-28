# Financial Analytics Enhancements

## User Request
Ajouter 3 sections optionnelles au module Financial Analytics ViaMenutor:
1. Pricing Analysis avec ScatterPlot
2. Payment Methods avec breakdown détaillé
3. Budget Tracking avec Progress bars

## Related Files
- @/polymet/data/viamentor-financial-analytics-data (to update) - Ajouter mock data pour les 3 nouvelles sections
- @/polymet/data/viamentor-financial-analytics-i18n (to update) - Ajouter traductions FR/DE/IT/EN
- @/polymet/components/viamentor-pricing-analysis-section (to create) - ScatterPlot + table comparaison concurrents
- @/polymet/components/viamentor-payment-methods-breakdown-section (to create) - PieChart + table méthodes
- @/polymet/components/viamentor-budget-tracking-section (to create) - Progress bars + alertes
- @/polymet/pages/viamentor-financial-analytics-page (to update) - Intégrer les 3 nouveaux composants

## TODO List
- [x] Mettre à jour data avec mock data pour pricing, payment methods, budget tracking
- [x] Mettre à jour i18n avec traductions pour les 3 sections
- [x] Créer composant Pricing Analysis (ScatterPlot + table)
- [x] Créer composant Payment Methods Breakdown (PieChart + table)
- [x] Créer composant Budget Tracking (Progress bars + alertes)
- [x] Intégrer les 3 composants dans la page principale

## Important Notes
- Utiliser Hero UI + Recharts pour cohérence visuelle
- ScatterPlot pour pricing avec tooltips détaillés
- PieChart pour payment methods avec légende interactive
- Progress bars avec couleurs conditionnelles (vert/orange/rouge selon utilisation)
- Alertes visuelles quand budget >95%
- Tous les textes en i18n FR/DE/IT/EN
- Mock data réalistes pour auto-école suisse
  
## Plan Information
*This plan is created when the project is at iteration 65, and date 2025-10-14T22:06:41.331Z*
