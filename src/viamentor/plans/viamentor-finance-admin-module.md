# Viamentor Finance Admin Module

## User Request
Créer module Finance Admin complet avec dashboard KPIs (MRR, ARR, churn), table subscriptions tenants éditable, workflow changement plan avec prorata, cancel/reactivate flow, i18n formats monétaires FR/DE/IT/EN, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-finance-data (to create) - Mock data KPIs, subscriptions, invoices
- @/viamentor/data/viamentor-finance-i18n (to create) - Traductions financières FR/DE/IT/EN
- @/viamentor/data/viamentor-finance-schemas (to create) - Schémas Zod validation
- @/viamentor/components/viamentor-finance-dashboard-kpis (to create) - Cards KPIs + chart MRR
- @/viamentor/components/viamentor-finance-subscriptions-table (to create) - Table subscriptions éditable
- @/viamentor/components/viamentor-finance-change-plan-modal (to create) - Wizard 3 steps changement plan
- @/viamentor/components/viamentor-finance-cancel-subscription-dialog (to create) - Dialog annulation avec retention
- @/viamentor/pages/viamentor-finance-page (to create) - Page principale Finance Admin
- @/viamentor/prototypes/viamentor-system-prototype (to update) - Ajouter route /finance

## TODO List
- [x] Créer mock data finance (KPIs, subscriptions, invoices)
- [x] Créer traductions i18n financières FR/DE/IT/EN
- [x] Créer composant Dashboard KPIs avec charts
- [x] Créer composant Subscriptions Table avec filtres
- [x] Créer composant Change Plan Modal (3 steps)
- [x] Créer composant Cancel Subscription Dialog
- [x] Créer page Finance principale
- [x] Ajouter route au prototype

## Important Notes
- **Clean Code**: Respecté 200-250 lignes/fichier maximum ✓
- **i18n formats**: CHF formaté selon locale (FR: 1'234.56, DE: 1.234,56) ✓
- **Hero UI**: Cards modernes, DataTable optimisée, Recharts sparklines ✓
- **Workflow prorata**: Calcul crédit plan actuel + nouveau coût ✓
- **Retention flow**: Offrir réduction si cancellation ✓
- **Server-side pagination**: 50 items/page pour 500+ tenants ✓
- **Fichiers créés**: 7 fichiers (data, i18n, 4 composants, 1 page)
- **Route ajoutée**: /finance dans prototype
  
## Plan Information
*This plan is created when the project is at iteration 12, and date 2025-10-14T06:03:20.921Z*
