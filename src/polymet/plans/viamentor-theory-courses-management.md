# Gestion Cours Théoriques Viamentor

## User Request
Créer le système complet d'affichage et gestion des cours théoriques avec:
- Event cards 1vsN avec progress bar inscrits/capacité
- Popover détails avec sections (Détails/Participants/Actions)
- Participants management avec DataTable, inscriptions/désinscriptions
- Attendance tracking avec émargement digital
- Waiting list si cours complet
- Hero UI, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier

## Related Files
- @/polymet/data/viamentor-theory-courses-data (to create) - Mock data cours théoriques
- @/polymet/data/viamentor-theory-courses-i18n (to create) - Traductions i18n
- @/polymet/components/viamentor-theory-course-card (to create) - Card event calendar
- @/polymet/components/viamentor-theory-course-popover (to create) - Popover détails complet
- @/polymet/components/viamentor-participants-management (to create) - Gestion participants
- @/polymet/components/viamentor-attendance-tracking (to create) - Émargement présence

## TODO List
- [x] Créer data mock cours théoriques avec types complets
- [x] Créer traductions i18n FR/DE/IT/EN
- [x] Créer TheoryCourseCard avec progress bar et status
- [x] Créer TheoryCoursePopover avec sections détails/participants/actions
- [x] Créer ParticipantsManagement avec DataTable et inscriptions
- [x] Créer AttendanceTracking avec checkboxes et signature

## Important Notes
- Event cards 1vsN (1 cours, N participants)
- Progress bar color selon taux remplissage (>90% red, 70-90% orange, <70% green)
- Status: Scheduled/En cours/Completed/Canceled
- Attendance tracking si cours En cours
- Waiting list si complet
- Tous fichiers 200-250 lignes max

  
## Plan Information
*This plan is created when the project is at iteration 46, and date 2025-10-14T19:24:01.941Z*
