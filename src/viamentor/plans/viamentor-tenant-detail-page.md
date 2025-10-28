# Tenant Detail Page - Platform Admin

## User Request
Créer une page de détail complète pour un tenant avec header Hero UI, breadcrumb, avatar école, badges, actions, et 6 onglets de navigation avec fonctionnalités complètes.

## Related Files
- @/viamentor/pages/viamentor-tenant-detail-page (to create) - Page principale avec routing
- @/viamentor/components/viamentor-tenant-detail-header (to create) - Header avec breadcrumb, avatar, badges, actions
- @/viamentor/components/viamentor-tenant-detail-tabs (to create) - Tabs navigation container
- @/viamentor/components/viamentor-tenant-overview-tab (to create) - Tab Overview avec infos + stats + timeline
- @/viamentor/components/viamentor-tenant-users-tab (to create) - Tab Users avec table et invite dialog
- @/viamentor/components/viamentor-tenant-students-tab (to create) - Tab Students readonly avec export
- @/viamentor/components/viamentor-tenant-billing-tab (to create) - Tab Billing avec subscription + invoices + usage
- @/viamentor/components/viamentor-tenant-settings-tab (to create) - Tab Settings avec accordion sections
- @/viamentor/components/viamentor-tenant-logs-tab (to create) - Tab Logs avec audit trail
- @/viamentor/data/viamentor-tenant-detail-data (to create) - Mock data pour tenant detail
- @/viamentor/prototypes/viamentor-system-prototype (to update) - Ajouter route /tenants/:id

## TODO List
- [x] Créer mock data tenant detail avec toutes les données nécessaires
- [x] Créer composant header avec breadcrumb, avatar, badges, actions
- [x] Créer composant tabs navigation container
- [x] Créer tab Overview (infos éditables inline + stats + timeline)
- [x] Créer tab Users (table + invite dialog + filtres)
- [x] Créer tab Students (table readonly + export)
- [x] Créer tab Billing (subscription + invoices + usage)
- [x] Créer tab Settings (accordion avec branding/modules/API/notifications/danger)
- [x] Créer tab Logs (audit trail avec filtres puissants)
- [x] Créer page principale tenant detail
- [x] Ajouter route au prototype
- [x] Ajouter lien de navigation depuis page tenants (à faire manuellement)

## Important Notes
- Header avec breadcrumb "Tenants / {Nom école}"
- Avatar logo école 80x80
- Actions: Edit (drawer), Impersonate, Refresh, Delete
- Tabs avec counts badges (Users 12, Students 145, Logs ∞)
- Tab Overview: édition inline, quick stats, activity timeline
- Tab Users: table avec role éditable, invite dialog
- Tab Students: readonly, export Excel
- Tab Billing: subscription management, invoices, usage stats
- Tab Settings: accordion avec sections (branding, modules, API keys, notifications, danger zone)
- Tab Logs: audit trail complet avec filtres puissants
- i18n: tous labels traduits selon locale
- Format dates/montants selon locale

  
## Plan Information
*This plan is created when the project is at iteration 7, and date 2025-10-13T15:49:33.011Z*
