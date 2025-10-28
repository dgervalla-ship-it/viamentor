# Book Lesson Wizard Plan

## User Request
Créer wizard réservation leçon pratique multi-steps avec sélection élève/moniteur/véhicule/datetime, validation disponibilités temps réel, Hero UI Dialog, i18n FR/DE/IT/EN, Clean Code 200-250 lignes/fichier.

## Related Files
- @/viamentor/data/viamentor-booking-schemas (to create) - Schémas validation Zod
- @/viamentor/data/viamentor-booking-i18n (to create) - Traductions i18n
- @/viamentor/data/viamentor-booking-availability-service (to create) - Service API disponibilités
- @/viamentor/components/viamentor-book-lesson-wizard (to create) - Wizard principal Dialog
- @/viamentor/components/viamentor-wizard-step-select-student (to create) - Step 1 sélection élève
- @/viamentor/components/viamentor-wizard-step-select-instructor-vehicle (to create) - Step 2 moniteur/véhicule
- @/viamentor/components/viamentor-wizard-step-select-datetime (to create) - Step 3 date/horaire
- @/viamentor/components/viamentor-wizard-step-booking-summary (to create) - Step 4 récapitulatif
- @/viamentor/data/viamentor-students-data (to view) - Types élèves existants
- @/viamentor/data/viamentor-instructors-data (to view) - Types moniteurs existants
- @/viamentor/data/viamentor-vehicles-data (to view) - Types véhicules existants
- @/viamentor/data/viamentor-lessons-data (to view) - Types leçons existants

## TODO List
- [x] Créer schémas validation Zod booking
- [x] Créer traductions i18n booking wizard
- [x] Créer service API availability check
- [x] Créer wizard principal avec Dialog et Stepper
- [x] Créer Step 1 - Sélection élève avec Autocomplete
- [x] Créer Step 2 - Sélection moniteur & véhicule
- [x] Créer Step 3 - Date & horaire avec slots
- [x] Créer Step 4 - Récapitulatif et confirmation

✅ **TOUS LES FICHIERS CRÉÉS AVEC SUCCÈS**

## Important Notes
- **Architecture**: 8 fichiers séparés pour respecter SRP et limite 200-250 lignes
- **Validation**: Zod schemas avec règles métier (solde leçons, habilitations, disponibilités)
- **Real-time**: WebSocket simulation pour status moniteurs, API check conflicts
- **Hero UI**: Dialog fullscreen mobile, Card 800px desktop, Stepper horizontal
- **i18n**: FR/DE/IT/EN pour tous labels, validation messages, emails templates
- **Clean Code**: Chaque step composant indépendant, service availability séparé
- **Formats**: Dates/heures/prix formatés selon locale élève

  
## Plan Information
*This plan is created when the project is at iteration 45, and date 2025-10-14T19:13:56.031Z*
