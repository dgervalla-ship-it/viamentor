# Module RGPD et Consentements ViaMenutor

## User Request
Développer un module complet de gestion RGPD pour Security Officer avec:
- Dashboard DPO avec KPIs et quick actions
- Table data subject requests avec filtres avancés et workflow traitement
- Wizard process request 4 types (Access/Delete/Export/Rectify)
- Consent management avec table types et user tracking
- i18n juridique strict FR/DE/IT/EN
- Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-gdpr-data (to create) - Mock data requests, consents, users
- @/polymet/data/viamentor-gdpr-i18n (to create) - Traductions juridiques FR/DE/IT/EN
- @/polymet/data/viamentor-gdpr-schemas (to create) - Validation Zod pour formulaires RGPD
- @/polymet/components/viamentor-gdpr-dashboard-kpis (to create) - Cards KPIs dashboard DPO
- @/polymet/components/viamentor-gdpr-requests-table (to create) - Table requests avec filtres
- @/polymet/components/viamentor-gdpr-process-wizard (to create) - Wizard traitement requests
- @/polymet/components/viamentor-gdpr-consent-management (to create) - Gestion consentements
- @/polymet/components/viamentor-gdpr-consent-detail-drawer (to create) - Détail consent users
- @/polymet/pages/viamentor-gdpr-compliance-page (to create) - Page principale RGPD
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route /compliance/gdpr

## TODO List
- [x] Créer mock data RGPD (requests, consents, users, audit logs)
- [x] Créer traductions i18n juridiques FR/DE/IT/EN
- [x] Créer schémas validation Zod
- [x] Créer composant Dashboard KPIs
- [x] Créer composant Requests Table avec filtres
- [x] Créer composant Process Wizard (4 types requests)
- [x] Créer composant Consent Management
- [x] Créer composant Consent Detail Drawer
- [x] Créer page principale GDPR Compliance
- [x] Ajouter route au prototype

## Important Notes
- Clean Code: 200-250 lignes maximum par fichier
- i18n juridique strict avec terminologie précise
- Workflow traitement requests avec 4 steps validation
- Types requests: Access/Delete/Export/Rectify
- Hero UI components (Cards, DataTable, Dialog, Drawer)
- Server-side pagination 50/page
- Filtres avancés avec presets sauvegardables
- Export Excel avec traduction headers
- Consent management avec tracking users détaillé

  
## Plan Information
*This plan is created when the project is at iteration 11, and date 2025-10-13T17:07:17.834Z*
