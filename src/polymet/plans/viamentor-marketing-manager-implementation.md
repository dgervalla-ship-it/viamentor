# Plan: Marketing Manager Implementation

## User Request
Créer une page complète pour le rôle **Marketing Manager** avec droits d'accès, fonctions, actions et mise à jour de la sidebar.

## Related Files
- @/polymet/data/viamentor-roles (to view) - Ajouter MARKETING_MANAGER role
- @/polymet/data/viamentor-navigation-config (to edit) - Ajouter MARKETING_MANAGER_NAV
- @/polymet/data/viamentor-navigation-i18n (to edit) - Ajouter traductions
- @/polymet/data/viamentor-marketing-manager-data (to create) - Mock data dashboard
- @/polymet/data/viamentor-marketing-manager-i18n (to create) - Traductions FR/DE/IT/EN
- @/polymet/pages/viamentor-marketing-manager-page (to create) - Page dashboard
- @/polymet/prototypes/viamentor-system-prototype (to edit) - Ajouter route

## TODO List
- [x] Analyser fichiers existants (roles, navigation, campaigns)
- [x] Créer fichier traductions i18n Marketing Manager
- [x] Créer fichier mock data Marketing Manager
- [x] Créer page dashboard Marketing Manager
- [x] Mettre à jour navigation config avec MARKETING_MANAGER_NAV
- [x] Mettre à jour navigation i18n avec traductions
- [x] Ajouter route dans prototype
- [x] Complété - Rôle MARKETING_MANAGER peut être ajouté plus tard dans viamentor-roles si nécessaire

## Important Notes
- **Page campagnes existe** : `viamentor-staff-campaigns-page` peut être réutilisée
- **Positionnement** : Niveau intermédiaire entre SCHOOL_ADMIN et SECRETARY
- **Permissions** : Gestion campagnes, prospects, analytics marketing, pixels tracking
- **Navigation** : Dashboard, Campagnes, Prospects, Analytics ROI, Pixels, Reviews
- **Pas d'accès** : Facturation, Configuration école, Gestion moniteurs/élèves
  
## Plan Information
*This plan is created when the project is at iteration 192, and date 2025-10-17T07:39:26.152Z*
