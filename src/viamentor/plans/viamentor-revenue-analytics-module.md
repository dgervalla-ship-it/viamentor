# Module Revenue Analytics Viamentor

## User Request
Développer le module complet d'analytics revenus et rapports financiers Finance Admin avec:
- Charts MRR/cohorts/forecasting/churn analysis avec Recharts
- Rapports TVA suisse et comptables générés
- Scheduled reports automation avec cron
- Export data complet multi-formats
- i18n formats FR/DE/IT/EN
- Clean Code SOLID 200-250 lignes/fichier

## Related Files
- @/viamentor/data/viamentor-analytics-data (to create) - Mock data KPIs, cohorts, forecasts, churn
- @/viamentor/data/viamentor-analytics-i18n (to create) - Traductions termes analytics
- @/viamentor/components/viamentor-revenue-overview-tab (to create) - Tab Overview avec KPIs et charts
- @/viamentor/components/viamentor-cohorts-analysis-tab (to create) - Tab Cohorts avec heatmap retention
- @/viamentor/components/viamentor-forecasting-tab (to create) - Tab Forecasting avec prédictions ML
- @/viamentor/components/viamentor-churn-analysis-tab (to create) - Tab Churn avec tenants canceled
- @/viamentor/components/viamentor-financial-reports (to create) - Section rapports templates
- @/viamentor/components/viamentor-generate-report-wizard (to create) - Wizard génération rapports
- @/viamentor/components/viamentor-scheduled-reports (to create) - Gestion scheduled reports
- @/viamentor/pages/viamentor-revenue-analytics-page (to create) - Page principale analytics
- @/viamentor/prototypes/viamentor-system-prototype (to update) - Ajouter route /finance/analytics

## TODO List
- [x] Créer mock data analytics avec types complets
- [x] Créer i18n termes analytics FR/DE/IT/EN
- [x] Créer composant RevenueOverviewTab avec KPIs et charts
- [x] Créer composant CohortsAnalysisTab avec heatmap
- [x] Créer composant ForecastingTab avec prédictions
- [x] Créer composant ChurnAnalysisTab avec win-back
- [x] Créer composant FinancialReports templates
- [ ] Créer composant GenerateReportWizard (intégré dans FinancialReports)
- [ ] Créer composant ScheduledReports automation (intégré dans FinancialReports)
- [x] Créer page principale RevenueAnalyticsPage
- [x] Ajouter route au prototype

## Important Notes
- Charts Recharts: BarChart stacked plans, PieChart revenue split, LineChart dual y-axis MRR+Churn
- Cohorts heatmap: Gradient 0% rouge → 100% vert, retention rate % cells
- Forecasting: Historical 24 mois + Predicted 12 mois, confidence interval ±10%
- Churn analysis: Win-back campaigns tracking, cancellation reasons survey
- Rapports TVA: Format Swiss tax 8.1%, aging report buckets 0-30j/31-60j/61-90j/>90j
- Scheduled reports: Cron automation weekly/monthly/quarterly, email attachments
- Export data: Multi-entities ZIP Excel multi-sheets
- i18n formats: CHF séparateurs locaux, axes/tooltips/légendes traduits
- Clean Code: 200-250 lignes max par fichier, separation of concerns

  
## Plan Information
*This plan is created when the project is at iteration 15, and date 2025-10-14T06:26:09.691Z*
