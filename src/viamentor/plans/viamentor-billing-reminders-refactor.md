# Refactorisation Billing Reminders Page

## User Request
Refactoriser la page `viamentor-billing-reminders-page` qui fait 1278 lignes (dépasse limite 1000) en extrayant les composants et données dans des fichiers séparés.

## Related Files
- @/viamentor/pages/viamentor-billing-reminders-page (to edit) - Page principale à refactoriser (1278 lignes)
- @/viamentor/data/viamentor-billing-reminders-data (to create) - Mock data et types
- @/viamentor/data/viamentor-billing-reminders-i18n (to create) - Traductions i18n
- @/viamentor/components/viamentor-reminders-table (to create) - Table rappels actifs
- @/viamentor/components/viamentor-reminders-templates-tab (to create) - Tab templates
- @/viamentor/components/viamentor-reminders-settings-tab (to create) - Tab paramètres
- @/viamentor/components/viamentor-reminders-stats-cards (to create) - Stats cards

## TODO List
- [x] Créer fichier data avec mock data et types TypeScript
- [x] Créer fichier i18n avec traductions FR/DE/IT/EN
- [x] Créer composant Stats Cards
- [x] Créer composant Table Rappels
- [x] Créer composant Tab Templates
- [x] Créer composant Tab Settings
- [x] Refactoriser page principale en important les nouveaux composants
- [x] Tester que tout fonctionne correctement

## Important Notes
- **Problème identifié**: Page fait 1278 lignes (dépasse limite 1000)
- **Stratégie**: Extraire mock data, i18n, et composants sections
- **Sections identifiées**:
  - Stats Cards (4 cards)
  - Table Rappels actifs (avec filtres)
  - Tab Templates (table templates)
  - Tab Settings (switches configuration)
- **Préserver**: Toute la logique existante, types, fonctions helper
- **Objectif**: Réduire page principale à ~400-500 lignes

## Plan Information
*This plan is created when the project is at iteration 265*
  
## Plan Information
*This plan is created when the project is at iteration 265, and date 2025-10-20T13:03:27.819Z*
