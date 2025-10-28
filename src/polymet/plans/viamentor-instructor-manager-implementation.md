# Instructor Manager Implementation

## User Request
Créer une page complète pour le rôle "Instructor Manager" (Responsable des Moniteurs) avec droits d'accès, fonctions et actions appropriées. Mettre à jour la navigation sidebar.

## Related Files
- @/polymet/data/viamentor-roles (to view) - Vérifier si le rôle existe
- @/polymet/data/viamentor-navigation-config (to update) - Ajouter navigation Instructor Manager
- @/polymet/data/viamentor-navigation-i18n (to update) - Ajouter traductions
- @/polymet/pages/viamentor-instructor-manager-page (to create) - Page dashboard principale
- @/polymet/data/viamentor-instructor-manager-data (to create) - Mock data et types
- @/polymet/data/viamentor-instructor-manager-i18n (to create) - Traductions FR/DE/IT/EN
- @/polymet/prototypes/viamentor-system-prototype (to update) - Ajouter route

## TODO List
- [x] Analyser le rôle INSTRUCTOR_MANAGER dans viamentor-roles - Rôle n'existe pas, ajouté à la navigation
- [x] Créer fichier i18n pour Instructor Manager - viamentor-instructor-manager-i18n créé
- [x] Créer fichier data avec mock data et types - viamentor-instructor-manager-data créé
- [x] Créer page dashboard Instructor Manager - viamentor-instructor-manager-page créée
- [x] Mettre à jour navigation-config avec section Instructor Manager - INSTRUCTOR_MANAGER_NAV ajouté
- [x] Mettre à jour navigation-i18n avec traductions - Traductions FR/DE/IT/EN ajoutées
- [x] Ajouter route dans prototype - Route /instructor-manager ajoutée
- [x] Vérifier cohérence et éviter doublons - Tout vérifié

## Important Notes
- Le rôle "Instructor Manager" n'existe pas encore dans viamentor-roles - besoin de l'ajouter
- Fonctionnalités attendues: gestion équipe moniteurs, planning, performance, affectations
- Droits: entre SCHOOL_ADMIN et INSTRUCTOR (niveau 2.5)
- Navigation: section dédiée avec dashboard, équipe, planning, analytics

  
## Plan Information
*This plan is created when the project is at iteration 191, and date 2025-10-17T07:10:37.007Z*
